# Media Bud – Sanity Studio

Panel CMS do zarządzania treścią strony mediabud.pl.

## Uruchomienie

```bash
npm install
npm run dev   # → http://localhost:3333
```

## Konfiguracja

1. Utwórz projekt na https://www.sanity.io/manage
2. Skopiuj **Project ID**
3. W `sanity.config.ts` zamień `SANITY_PROJECT_ID` na swój ID
4. W aplikacji React utwórz plik `.env.local`:
   ```
   VITE_SANITY_PROJECT_ID=twoj_id
   VITE_SANITY_DATASET=production
   ```

## Schematy

| Typ           | Opis                             |
|---------------|----------------------------------|
| `siteSettings`| Globalne ustawienia witryny      |
| `category`    | Kategorie produktowe (hierarchia)|
| `product`     | Produkty ze zdjęciami i specs    |
| `blogPost`    | Artykuły techniczne bloga        |

## Wdrożenie Sanity Studio

```bash
npm run deploy   # Studio dostępne na https://mediabud.sanity.studio
```
