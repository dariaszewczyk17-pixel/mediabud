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
const DEFAULT_OG_IMAGE = "/og-image.jpg";
const SITE_NAME = "Media Bud – Skład Budowlany Lublin";

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

    // Open Graph
    if (title) {
      setMeta("og:title", title, true);
      setMeta("twitter:title", title);
    }
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);

    // Canonical
    if (canonical) setLink("canonical", canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`);

    // Robots
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");

    // Schema.org JSON-LD
    if (schema) setSchema(schema);
  }, [title, description, canonical, ogImage, ogType, noIndex, schema]);
}
