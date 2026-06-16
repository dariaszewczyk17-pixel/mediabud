# ✅ Checklista wdrożenia Cloudflare Pages

Dokument powstał na podstawie rzeczywistych problemów napotkanych podczas rozwoju projektu Media Bud.

---

## 1. Routing i Functions (`_routes.json`)

### ❌ Częsty błąd
```json
{
  "exclude": [
    "/api/*"  // ← BŁĄD! Blokuje Cloudflare Functions
  ]
}
```

### ✅ Poprawna konfiguracja
```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": [
    "/assets/*",
    "/images/*",
    "/*.js",
    "/*.css",
    "/*.ico",
    "/*.png",
    "/*.jpg",
    "/*.svg",
    "/*.xml",
    "/*.txt"
  ]
}
```

### Checklist:
- [ ] `/api/*` **NIE JEST** w sekcji `exclude`
- [ ] `/*.json` **NIE JEST** w `exclude` (blokuje odpowiedzi JSON z API)
- [ ] Statyczne assety (images, css, js) **SĄ** w `exclude` (optymalizacja)

---

## 2. Zmienne środowiskowe (Environment Variables)

### Checklist przed wdrożeniem:
- [ ] `RESEND_API_KEY` — klucz API do wysyłki maili
- [ ] `SANITY_TOKEN` — token z uprawnieniami Editor (nie Viewer!)
- [ ] Wszystkie zmienne ustawione w **Cloudflare Dashboard → Pages → Settings → Environment Variables**
- [ ] Zmienne ustawione dla **Production** i **Preview** (jeśli potrzebne)

### Po dodaniu/zmianie zmiennych:
- [ ] Wykonaj **nowy deploy** (zmienne nie działają retroaktywnie)
- [ ] Sprawdź logi Functions w Cloudflare Dashboard

---

## 3. Cloudflare Functions (`/functions/api/`)

### Struktura plików:
```
functions/
└── api/
    ├── contact.js          → POST /api/contact
    ├── products.js         → GET /api/products
    └── product/
        └── [id].js         → PATCH /api/product/:id
```

### Checklist:
- [ ] Eksportowane funkcje: `onRequestPost`, `onRequestGet`, `onRequestPatch`, `onRequestOptions`
- [ ] CORS headers dla `OPTIONS` (preflight requests)
- [ ] Obsługa błędów z logowaniem: `console.error()` → widoczne w Cloudflare Logs
- [ ] Walidacja `context.env.ZMIENNA` przed użyciem

### Przykład poprawnej funkcji:
```javascript
export async function onRequestOptions() {
  return new Response(null, { 
    status: 204, 
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export async function onRequestPost(context) {
  const API_KEY = context.env.API_KEY;
  if (!API_KEY) {
    console.error("Brak API_KEY w env");
    return json({ ok: false, error: "Błąd konfiguracji" }, 500);
  }
  // ...
}
```

---

## 4. SPA Fallback (React Router)

### Problem:
Odświeżenie strony `/kategoria/izolacje` → 404

### Rozwiązanie w `_routes.json`:
```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/assets/*", "/images/*", "..."]
}
```

### Checklist:
- [ ] `include: ["/*"]` przekierowuje nieznane ścieżki do `index.html`
- [ ] Statyczne pliki w `exclude` są serwowane bezpośrednio
- [ ] Testuj deep links po deploy: `/kategoria/xyz`, `/produkt/123`

---

## 5. Cache i CDN

### Objawy problemów z cache:
- Zmiany w kodzie nie widoczne po deploy
- Stare wersje JS/CSS
- Stare obrazki/assety

### Rozwiązania:
- [ ] Vite automatycznie dodaje hash do nazw plików (`index-abc123.js`)
- [ ] Dla obrazków: zmień nazwę pliku lub dodaj query string `?v=2`
- [ ] Cloudflare Dashboard → Caching → Purge Cache (ostateczność)

### Wymuszenie nowego buildu:
```bash
# Dodaj pusty commit jeśli trzeba wymusić redeploy
git commit --allow-empty -m "chore: force redeploy"
git push origin main
```

---

## 6. Testowanie przed/po deploy

### Przed deploy:
```bash
# Lokalny build
npm run build

# Sprawdź błędy TypeScript
npx tsc --noEmit

# Sprawdź _routes.json
cat public/_routes.json
```

### Po deploy (weryfikacja API):
```bash
# Test formularza kontaktowego
curl -X POST "https://mediabud.pages.dev/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.pl","message":"Test"}'

# Oczekiwana odpowiedź: {"ok":true}
# Błąd 405 = problem z _routes.json
# Błąd 500 = problem z env vars lub kodem
```

### Po deploy (weryfikacja SPA):
```bash
# Test deep link
curl -I "https://mediabud.pages.dev/kategoria/izolacje"
# Oczekiwane: HTTP 200 (nie 404)
```

---

## 7. Debugowanie problemów

### Gdzie szukać logów:
1. **Cloudflare Dashboard** → Pages → mediabud → Deployments → View logs
2. **Functions logs** → Pages → mediabud → Functions → Logs

### Typowe błędy i rozwiązania:

| Błąd | Przyczyna | Rozwiązanie |
|------|-----------|-------------|
| `405 Method Not Allowed` | `/api/*` w exclude | Usuń z `_routes.json` |
| `500 Internal Server Error` | Brak env var | Dodaj w Cloudflare Settings |
| `404 Not Found` (deep link) | Brak SPA fallback | Sprawdź `include: ["/*"]` |
| Stary kod po deploy | Cache CDN | Purge cache lub force redeploy |
| `CORS error` w konsoli | Brak `onRequestOptions` | Dodaj handler OPTIONS |

---

## 8. Git workflow

### Przed każdym pushem:
```bash
# 1. Build lokalny
npm run build

# 2. Commit
git add -A
git commit -m "feat/fix: opis zmiany"

# 3. Push na oba remotes
git push github main && git push origin main
```

### Po pushu:
- [ ] Sprawdź status deploy w Cloudflare Dashboard
- [ ] Poczekaj ~60-90 sekund na propagację
- [ ] Przetestuj zmiany na produkcji

---

## 9. Sanity API (specyficzne dla Media Bud)

### Checklist:
- [ ] `SANITY_TOKEN` ma uprawnienia **Editor** (nie Viewer)
- [ ] Token ustawiony w Cloudflare env vars
- [ ] GROQ queries używają dereferencji: `brand->name` (nie `brand`)
- [ ] Mutations używają `set` dla array cleanup (nie `unset` z filtrem)

### Test połączenia:
```bash
curl "https://nzcwegq7.api.sanity.io/v2021-06-07/data/query/production?query=*[_type==\"product\"][0..2]{name}"
```

---

## 10. Szybka diagnostyka

```bash
# 1. Czy API działa?
curl -X POST "https://mediabud.pages.dev/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.pl","message":"x"}'

# 2. Czy SPA fallback działa?
curl -I "https://mediabud.pages.dev/kategoria/test-nieistniejacy"
# Powinno być 200 (SPA), nie 404

# 3. Czy statyczne pliki działają?
curl -I "https://mediabud.pages.dev/images/logo-mediabud-main.png"
# Powinno być 200

# 4. Wersja buildu (sprawdź hash w nazwie pliku)
curl -s "https://mediabud.pages.dev/" | grep -o 'index-[a-z0-9]*\.js'
```

---

## Historia problemów (dla przyszłej referencji)

| Data | Problem | Przyczyna | Rozwiązanie |
|------|---------|-----------|-------------|
| 2026-06-16 | Formularz wyceny 405 | `/api/*` w exclude | Usunięto z `_routes.json` |
| 2026-06-15 | Brak edycji produktów | SANITY_TOKEN Viewer | Zmieniono na Editor |
| 2026-06-14 | 404 na deep links | Brak SPA fallback | Dodano `include: ["/*"]` |

---

*Ostatnia aktualizacja: 2026-06-16*
