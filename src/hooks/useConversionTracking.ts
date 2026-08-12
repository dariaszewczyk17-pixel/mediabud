/**
 * Google Ads Conversion Tracking
 * 
 * Trzy konwersje:
 * 1. Wysłanie formularza wyceny (Web3Forms)
 * 2. Kliknięcie w numer telefonu (tel:)
 * 3. Kliknięcie w adres email (mailto:)
 * 
 * Wymaga: gtag('config', 'AW-18206359267') w index.html
 * 
 * WAŻNE: Conversion Labels (AW-18206359267/XXXXX) trzeba uzupełnić
 * po utworzeniu konwersji w panelu Google Ads.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ── Conversion IDs ──────────────────────────────────────────────────
// Po utworzeniu konwersji w Google Ads → Narzędzia → Konwersje → Nowa konwersja
// Google da Ci Conversion Label dla każdej akcji. Wklej je tutaj:
const AW_ID = 'AW-18206359267';
const CONV_FORM_SUBMIT = `${AW_ID}/fcMjCPrWx78cEOP9u-lD`;
const CONV_PHONE_CLICK = `${AW_ID}/1k3iCNL0yL8cEOP9u-lD`;
const CONV_EMAIL_CLICK = `${AW_ID}/NV7WCI6Nyb8cEOP9u-lD`;

function hasConsent(type: 'analytics' | 'marketing') {
  if (typeof window === 'undefined') return false;
  try {
    const consent = JSON.parse(localStorage.getItem('mb_cookie_consent') || 'null');
    return consent?.[type] === true;
  } catch {
    return false;
  }
}

function sendConversion(conversionLabel: string, extraParams?: Record<string, unknown>) {
  if (hasConsent('marketing') && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionLabel,
      ...extraParams,
    });
  }
}

// ── Eksportowane funkcje ────────────────────────────────────────────

/** Wywołaj po udanym wysłaniu formularza wyceny */
export function trackFormSubmit(params: { source?: string; itemCount?: number } = {}) {
  sendConversion(CONV_FORM_SUBMIT, { value: 1.0, currency: 'PLN' });
  // GA4 event (do raportów w Analytics)
  if (hasConsent('analytics')) window.gtag?.('event', 'generate_lead', {
    event_category: 'conversion',
    event_label: 'formularz_wyceny',
    form_source: params.source || 'unknown',
    item_count: params.itemCount,
  });
}

/** Pierwszy etap lejka: dodanie produktu do wspólnej wyceny. */
export function trackQuoteAdd(product: { id: string; name: string; brand?: string }, quantity = 1) {
  if (hasConsent('analytics')) window.gtag?.('event', 'add_to_quote', {
    event_category: 'quote_funnel',
    product_id: product.id,
    item_name: product.name,
    item_brand: product.brand || undefined,
    quantity,
  });
}

/** Drugi etap lejka: przejście z koszyka do formularza. */
export function trackQuoteStart(itemCount: number) {
  if (hasConsent('analytics')) window.gtag?.('event', 'begin_quote', {
    event_category: 'quote_funnel',
    item_count: itemCount,
  });
}

/** Wywołaj przy kliknięciu w numer telefonu */
export function trackPhoneClick() {
  sendConversion(CONV_PHONE_CLICK, { value: 1.0, currency: 'PLN' });
  if (hasConsent('analytics')) window.gtag?.('event', 'contact_phone', {
    event_category: 'conversion',
    event_label: 'klikniecie_telefon',
  });
}

/** Wywołaj przy kliknięciu w adres email */
export function trackEmailClick() {
  sendConversion(CONV_EMAIL_CLICK, { value: 1.0, currency: 'PLN' });
  if (hasConsent('analytics')) window.gtag?.('event', 'contact_email', {
    event_category: 'conversion',
    event_label: 'klikniecie_email',
  });
}
