# Storyboard — Media Bud · Futurystyczny Video Loop (Tło Sekcji)

---

## Podsumowanie projektu

- **Cel wideo:** Ambientowy loop wideo 8s jako tło sekcji „Dlaczego Media Bud?" na stronie głównej. Widz nie ogląda go aktywnie — wideo tworzy atmosferę: nowoczesność, precyzja technologiczna, siła przemysłowa. Karty sekcji leżą nad nim (glassmorphism overlay).
- **Styl wizualny:** Industrial noir z holograficznym nadrukiem — absolutnie czarne tło (#050505), pulsujące czerwone akcenty (#f81828), zimne stalowo-niebieskie refleksy, holograficzne siatki cyfrowe. Slow motion materiałów budowlanych w futurystycznym oświetleniu. Styl: dark tech / sci-fi industrial.
- **Tempo:** Powolne, hipnotyczne, bezkończone — pierwsze 4s budują nastrój, kolejne 4s wyciszają do punktu startowego. Końcowa klatka = klatka startowa (bezszwowa pętla dla CSS `loop`).

> **Uwaga stylistyczna:** Elementy holograficzne, cyfrowe nakładki i siatki to artystyczna interpretacja — nie realistyczna demonstracja. Chodzi o nastrój „futurystyczne centrum dowodzenia budową", nie o dosłowność.

---

## Parametry techniczne

| Parametr | Wartość |
|---|---|
| generation_unit_count | 1 |
| workflow_level | lightweight |
| action | t2v |
| model | seedance-2.0-fast |
| total_duration | 8s |
| aspect_ratio | 16:9 |
| audio_switch | true |
| asset_strategy | Generacja czysto tekstowa — brak obrazów wejściowych od użytkownika (scena futurystyczna bez twarzy) |

---

## Tabela zasobów

Generacja czysto tekstowa (t2v) — brak zasobów do wygenerowania ani obrazów wejściowych od użytkownika.

---

## Jednostki generacji

### Jednostka generacji 01 — „Industrial Noir Loop · Media Bud BG"

#### Szczegóły ujęć

| Ujęcie | Zakres czasu | Skala | Ruch kamery (akcja + intencja) | Treść wizualna |
|---|---|---|---|---|
| 01 | 0–3s | Szerokie / aerial macro | Bardzo powolny forward dolly (wciąganie, immersja) | Ciemny magazyn przemysłowy shot z góry pod kątem 45°. Rzędy stalowych regałów z materiałami budowlanymi (styropian, płyty gipsowe, wełna mineralna) w głębokiej czerni. Czerwone linie LED wzdłuż regałów pulsują miarowo. Holograficzne siatki cyfrowe (cienkie, niebieskie, półprzezroczyste) unoszą się 30cm nad paletami — cyfry, wykresy słupkowe, wektory 3D. Slow-motion unoszący się pył cementowy złapany w bocznym czerwonym świetle. |
| 02 | 3–6s | Medium / detail | Bardzo powolny orbit wokół centrum (płynność, hipnoza) | Extreme close-up przekroju warstw: beton → izolacja termiczna → tynk zewnętrzny, każda warstwa podświetlona cienką czerwoną linią świetlną przy krawędzi. Holograficzne dane materiałowe unoszą się obok: współczynniki cieplne, klasy ognioodporności — jako czysto dekoracyjne cyfry. Kamera bardzo powoli okrąża detal. Zimne metaliczne refleksy na stali zbrojeniowej. |
| 03 | 6–8s | Szerokie (powrót) | Bardzo powolny pull-back (płynne zamknięcie pętli) | Pull-back do kompozycji identycznej z ujęciem 01 — magazyn z góry, te same regały, te same pulsujące LED. Kamera cofa się do dokładnie tego samego kadru co start. Ostatnia klatka = pierwsza klatka (bezszwowe połączenie pętli). Intensywność hologramów stopniowo opada do poziomu startowego. |

#### Parametry generacji wideo

| Parametr | Wartość |
|---|---|
| action | t2v |
| title | Media Bud — Futurystyczny Industrial Loop 8s |
| model | seedance-2.0-fast |
| duration | 8 |
| aspect_ratio | 16:9 |
| audio_switch | true |
| first_frame_image_url | - |
| end_frame_image_url | - |
| image_urls | - |

#### Prompt

```
Seamlessly looping ambient background video, 8 seconds, 16:9 cinematic. Industrial noir aesthetic. Ultra-dark background (#050505 near-black), deep shadow crush throughout. Color palette: primary deep black, accent crimson red (#f81828), secondary steel blue holographic overlays, tertiary cold silver metallic highlights.

SHOT 1 (0-3s): Aerial 45-degree overhead slow forward dolly into a vast dark industrial warehouse. Long rows of steel metal shelving stacked with building materials — thick white expanded polystyrene insulation boards, pale grey mineral wool rolls, stacked plasterboard sheets, cement bags. Deep red LED light strips pulse rhythmically along every shelf row, casting sharp crimson line-light across the floor. Semi-transparent holographic cyan grid overlays float 30cm above the pallets — thin wireframe data lines, abstract bar graphs, glowing fractional numbers, 3D vector arrows. Slow-motion cement dust particles drift through a shaft of red side-light. No human faces. Camera drifts slowly forward as if entering a secret high-tech facility. Atmosphere: cold, monumental, technological, deeply shadowed.

SHOT 2 (3-6s): Very slow 360-degree orbital camera movement around a macro cross-section detail. Extreme close-up of layered construction materials in cross-section: raw concrete slab on the bottom, thick thermal insulation foam board in the middle, smooth white exterior render on top. Each layer is edge-lit with a precise thin crimson red light line at every boundary. Holographic decorative data floats beside each layer — abstract thermal coefficient numbers, fire resistance class symbols, purely decorative glowing digits. Cold metallic blue reflections on steel rebar embedded in the concrete. Slow orbital camera reveals the layers from all angles, hypnotic rhythm. Black void background outside the detail. No text readable.

SHOT 3 (6-8s): Identical composition to Shot 1 — very slow pull-back returning exactly to the starting overhead warehouse framing. Warehouse rows, crimson LED strips, holographic overlays — all elements return to their starting position and intensity. Final frame is visually identical to the first frame for seamless CSS loop. Holographic overlay intensity gradually settles to baseline level as the camera reaches its starting position. Closing atmosphere: calm pulse, eternal cycle.

Throughout: anamorphic lens micro-flares on every hard red light source, subtle 4K film grain texture, deep blacks with no lifted shadows. No humans, no faces, no hands. No readable text, no legible numbers. Slow deliberate motion only — no handheld shake, no fast cuts. The feel is: a living, breathing technological infrastructure, dormant but powerful.

No spoken dialogue or voiceover in this shot. Only ambient sound and action SFX: deep warehouse electrical hum, subtle red LED electronic pulse tone, slow-motion distant concrete rumble, minimal atmospheric industrial drone — all at very low volume suitable for background use.
```

#### Oś czasu dźwięku (opcjonalna — video użyte jako tło, audio wyciszone w CSS)

| Czas | Warstwa dźwiękowa | Opis |
|---|---|---|
| 0–8s | Ambience | Głęboki przemysłowy hum elektryczny, niski drone elektroniczny, subtelny puls LED |

> **Uwaga implementacyjna:** Wideo użyte jako `<video autoplay loop muted playsinline>` w CSS — audio będzie wyciszone przez atrybut `muted`. Dźwięk generowany przez model nie ma znaczenia dla finalnego efektu. `audio_switch=true` pozostaje ustawiony zgodnie z zasadami.

---

## Post-produkcja

| Zakres | Element | Pozycja | Treść / Zasób |
|---|---|---|---|
| Cały film 0–8s | Nie nakładać żadnego tekstu ani logo | — | Loop używany wyłącznie jako tło CSS — cała warstwa treści (karty, nagłówki) nakładana przez JSX Tailwind powyżej |

> **Uwaga dot. implementacji w React:** Po wygenerowaniu, video osadzić jako:
> ```tsx
> <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" src="URL_WIDEO" />
> ```
> Opacity ~0.25–0.35 (regulowane), z `pointer-events-none` by karty pozostały klikalne. Ciemna nakładka `bg-black/60` na video, karty glassmorphism powyżej.

---

## Wskazówki dot. wdrożenia w Home.tsx

1. **Sekcja `<section>` dostaje `position: relative` + `overflow: hidden`**
2. **`<video>` jako pierwsze dziecko** z `position: absolute, inset-0, opacity-30`
3. **Nakładka ciemna** `<div className="absolute inset-0 bg-black/60" />`
4. **Zawartość (nagłówek + karty)** — relative z-index > 0, bez zmian w treści
5. **Karty features** — update stylu na glassmorphism: `bg-white/5 backdrop-blur-md border border-white/10`
6. **Czerwone akcenty neonowe** na kartach: `box-shadow: 0 0 24px rgba(248,24,40,0.3)` on hover
