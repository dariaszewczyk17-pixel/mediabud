/**
 * Google Ads and GA4 conversion tracking.
 *
 * Google Ads conversion actions:
 * 1. Successful quote/contact form submission
 * 2. Click on a public telephone link (tel:)
 * 3. Click on a public email link (mailto:)
 *
 * The Google tag itself is configured in index.html and is activated only
 * after the visitor grants the relevant consent.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const AW_ID = 'AW-18206359267';
const CONV_FORM_SUBMIT = `${AW_ID}/fcMjCPrWx78cEOP9u-lD`;
const CONV_PHONE_CLICK = `${AW_ID}/1k3iCNL0yL8cEOP9u-lD`;
const CONV_EMAIL_CLICK = `${AW_ID}/NV7WCI6Nyb8cEOP9u-lD`;

type ConversionKind = 'form' | 'phone' | 'email';

const lastTrackedAt: Partial<Record<ConversionKind, number>> = {};
const DUPLICATE_WINDOW_MS = 1000;

function hasConsent(type: 'analytics' | 'marketing') {
  if (typeof window === 'undefined') return false;
  try {
    const consent = JSON.parse(localStorage.getItem('mb_cookie_consent') || 'null');
    return consent?.[type] === true;
  } catch {
    return false;
  }
}

/**
 * React handlers and the global link listener can observe the same click.
 * Keep a short per-conversion guard so one user action is counted once.
 */
function isDuplicate(kind: ConversionKind) {
  const now = Date.now();
  const previous = lastTrackedAt[kind] ?? 0;
  lastTrackedAt[kind] = now;
  return now - previous < DUPLICATE_WINDOW_MS;
}

function sendConversion(conversionLabel: string, extraParams?: Record<string, unknown>) {
  if (!hasConsent('marketing') || !window.gtag) return;

  window.gtag('event', 'conversion', {
    send_to: conversionLabel,
    ...extraParams,
  });
}

/** Track only a successfully completed lead form submission. */
export function trackFormSubmit(
  params: { source?: string; itemCount?: number; transactionId?: string } = {},
) {
  if (isDuplicate('form')) return;

  sendConversion(CONV_FORM_SUBMIT, {
    value: 1.0,
    currency: 'PLN',
    transaction_id: params.transactionId,
  });

  if (hasConsent('analytics')) {
    window.gtag?.('event', 'generate_lead', {
      event_category: 'conversion',
      event_label: 'formularz_wyceny',
      form_source: params.source || 'unknown',
      item_count: params.itemCount,
    });
  }
}

/** First quote-funnel step: a product is added to the quote. */
export function trackQuoteAdd(
  product: { id: string; name: string; brand?: string },
  quantity = 1,
) {
  if (hasConsent('analytics')) {
    window.gtag?.('event', 'add_to_quote', {
      event_category: 'quote_funnel',
      product_id: product.id,
      item_name: product.name,
      item_brand: product.brand || undefined,
      quantity,
    });
  }
}

/** Second quote-funnel step: the visitor opens the quote form. */
export function trackQuoteStart(itemCount: number) {
  if (hasConsent('analytics')) {
    window.gtag?.('event', 'begin_quote', {
      event_category: 'quote_funnel',
      item_count: itemCount,
    });
  }
}

/** Track a click on a public telephone link. */
export function trackPhoneClick() {
  if (isDuplicate('phone')) return;

  sendConversion(CONV_PHONE_CLICK, { value: 1.0, currency: 'PLN' });

  if (hasConsent('analytics')) {
    window.gtag?.('event', 'contact_phone', {
      event_category: 'conversion',
      event_label: 'klikniecie_telefon',
    });
  }
}

/** Track a click on a public email link. */
export function trackEmailClick() {
  if (isDuplicate('email')) return;

  sendConversion(CONV_EMAIL_CLICK, { value: 1.0, currency: 'PLN' });

  if (hasConsent('analytics')) {
    window.gtag?.('event', 'contact_email', {
      event_category: 'conversion',
      event_label: 'klikniecie_email',
    });
  }
}

/**
 * Cover every current and future tel:/mailto: link, including links rendered
 * dynamically. Explicit component handlers may remain; the duplicate guard
 * ensures that the same click is never counted twice.
 */
export function installGlobalContactTracking() {
  if (typeof document === 'undefined') return () => undefined;

  const handleClick = (event: MouseEvent) => {
    if (window.location.pathname.startsWith('/admin')) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest<HTMLAnchorElement>('a[href]');
    if (!link || link.closest('[data-conversion-tracking="off"]')) return;

    const href = link.getAttribute('href')?.trim().toLowerCase() || '';
    if (href.startsWith('tel:')) trackPhoneClick();
    if (href.startsWith('mailto:')) trackEmailClick();
  };

  document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
}
