import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
  schema?: object | object[];
}

const BASE_URL = "https://mediabud.pl";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = "Media Bud – Skład Budowlany Lublin";
const TWITTER_HANDLE = "@mediabud_lublin";

function setMeta(name: string, content: string, prop?: boolean) {
  const attr = prop ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setSchema(data: object | object[], id = "seo-schema") {
  let el = document.getElementById(id) as HTMLScriptElement;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : data);
}

/** Rozwiązuje URL do absolutnego z BASE_URL */
function toAbsoluteUrl(url: string): string {
  if (!url) return DEFAULT_OG_IMAGE;
  return url.startsWith("http") ? url : `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  schema,
}: SEOProps) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Basic meta
    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, true);
      setMeta("twitter:description", description);
    }

    // Open Graph — title
    if (title) {
      setMeta("og:title", title, true);
      setMeta("twitter:title", title);
    }

    // Open Graph — type, site_name, locale
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:locale", "pl_PL", true);

    // Open Graph — image (zawsze absolutny URL)
    const absoluteImage = toAbsoluteUrl(ogImage);
    setMeta("og:image", absoluteImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", title ?? SITE_NAME, true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:image", absoluteImage);
    setMeta("twitter:site", TWITTER_HANDLE);

    // Canonical — zawsze absolutny URL
    const canonicalHref = canonical ? toAbsoluteUrl(canonical) : `${BASE_URL}${window.location.pathname}`;
    setLink("canonical", canonicalHref);
    setMeta("og:url", canonicalHref, true);

    // Robots
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // Schema.org JSON-LD
    if (schema) setSchema(schema);
  }, [title, description, canonical, ogImage, ogType, noIndex, schema]);
}

