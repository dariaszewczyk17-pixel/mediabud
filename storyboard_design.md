# Storyboard — Media Bud · Spot Promocyjny 15s

---

## Podsumowanie projektu

- **Cel wideo:** Budowanie rozpoznawalności marki Media Bud w Lublinie — skład budowlany + firma wykonawcza w jednym. Widz po obejrzeniu ma poczuć: „To jest solidna, nowoczesna firma, której mogę zaufać" i zapamiętać CTA: mediabud.pl.
- **Styl wizualny:** Futurystyczny industrial noir — czarne tło, czerwone akcenty (#f81828), metaliczne refleksy. Dynamiczne cięcia rytmiczne z efektem cyfrowego skanowania / hologramu. Ciepłe złote światło w ujęciach efektu końcowego (gotowy dom), kontrast z zimnym niebieskim w ujęciach surowej budowy.
- **Tempo:** Narastające — spokojny start (magazyn produktów) → intensywny środek (budowa w akcji) → efektowne rozwiązanie (gotowe wnętrze) → mocne zatrzymanie (logo + CTA).

---

## Parametry techniczne

| Parametr | Wartość |
|---|---|
| generation_unit_count | 1 |
| workflow_level | lightweight |
| action | t2v |
| model | seedance-2.0-fast |
| total_duration | 15s |
| aspect_ratio | 16:9 |
| audio_switch | true |
| asset_strategy | Brak obrazów wejściowych — generacja czysto tekstowa (t2v) |

> **Uzasadnienie t2v:** Spot brandowy bez prawdziwych twarzy ludzkich — dominują przestrzenie, materiały budowlane, narzędzia i wnętrza w stylu futurystycznym. Brak wgranych obrazów referencyjnych marki. Seedance-2.0-fast idealnie obsługuje dynamiczne cięcia i efekty scifi/industrial bez twarzy, przy 15s limitu.

---

## Tabela zasobów

Generacja czysto tekstowa (t2v) — brak zasobów do wygenerowania ani obrazów wejściowych od użytkownika.

---

## Jednostki generacji

### Jednostka generacji 01 — „Budujesz. Remontuje. Media Bud."

#### Szczegóły ujęć

| Ujęcie | Zakres czasu | Skala | Ruch kamery (akcja + intencja) | Treść wizualna |
|---|---|---|---|---|
| 01 | 0–3s | Szerokie | Powolny forward dolly (wciąganie widza) | Ciemny, futurystyczny magazyn budowlany — rzędy palet z produktami (styropian, wełna, worki z cementem, tynki). Czerwone światło LED pulsuje wzdłuż regałów. Holograficzne dane cyfrowe (liczby, wykresy) unoszą się nad paletami. Atmosfera: zimna, przemysłowa, potężna. |
| 02 | 3–6s | Średnie / dynamiczne cięcie | Szybki pan boczny + zoom-in (rytmiczne uderzenie) | Cegły murowane przez dłonie w rękawicach, metalowe zbrojenie, beton wylewany z miksera — ujęcia budowy w ciemnym kontraście, oświetlenie punktowe. Szybkie cięcia rytmiczne (co 0.5–0.8s), efekt stroboskopowy. Iskry spawalnicze. Klimat: intensywność, siła, precyzja. |
| 03 | 6–10s | Bliskie / medium close-up | Powolny orbit 180° wokół detalu + slow-motion | Gotowe, nowoczesne wnętrze domu — biała elewacja z lewej, glazura łazienkowa z prawą stroną, panel fotowoltaiczny na dachu w słonecznym świetle. Kolory zmieniają się z zimnego błękitu na ciepłe złoto. Efekt: „od budowy do gotowego". Slow-motion pył opadający po szlifowaniu — piękny chaos zamieniający się w porządek. |
| 04 | 10–13s | Szerokie panoramiczne | Majestatyczny pull-back (skala i moc) | Zewnętrzny widok nowoczesnego domu jednorodzinnego w Lublinie nocą — podświetlona elewacja ciepłym amber, ogród z akcentami LED. W tle zarys sylwety Lublina. Holograficzne logo Media Bud pojawia się jako projekcja 3D nad dachem budynku. Czerwona linia świetlna przemierza budynek od fundamentów po dach (symbolika: od podstaw po klucze). |
| 05 | 13–15s | Ekstremalny close-up → freeze | Szybki push-in na logo + zatrzymanie | Czarne tło. Cyfrowy flicker — logo Media Bud materializuje się w centrum kadru. Pod spodem linia: „mediabud.pl · Lublin". Tłumiona czerwona poświata rozchodzi się od logo jak uderzenie fali. Dźwięk: głęboki bas drop + cisza. |

#### Parametry generacji wideo

| Parametr | Wartość |
|---|---|
| action | t2v |
| title | Media Bud — Spot brandowy 15s futurystyczny |
| model | seedance-2.0-fast |
| duration | 15 |
| aspect_ratio | 16:9 |
| audio_switch | true |
| first_frame_image_url | - |
| end_frame_image_url | - |
| image_urls | - |

#### Prompt

```
Futuristic industrial noir brand spot, 16:9 cinematic. Deep black backgrounds, crimson red accent lighting (#f81828), metallic steel and concrete textures throughout. Five seamless montage shots with rhythmic cuts synchronized to a deep electronic pulse.

SHOT 1 (0–3s): Wide forward dolly into a vast, dark industrial warehouse filled with pallets of building materials — white styrofoam boards, mineral wool rolls, cement bags, Weber/Ceresit tinted boxes stacked high on metal shelving. Red LED strips pulse along the shelving rows. Holographic cyan data overlays float above the pallets — unit counts, temperature charts, glowing digits. Atmosphere: cold, powerful, futuristic. Camera moves slowly forward as if entering a secret facility.

SHOT 2 (3–6s): Fast-cut montage of construction action in dramatic high-contrast lighting — gloved hands laying large format bricks with mortar, steel rebar bending, concrete pouring from a mixer, a trowel scraping smooth mortar. Each cut lands on a beat (0.6s per cut). Welder sparks burst in slow-motion arcs against black background. Cold blue lighting, heavy shadows, industrial precision. Energy builds rapidly — the feeling of unstoppable momentum.

SHOT 3 (6–10s): Medium close-up, slow 180° orbital movement around construction details transitioning into finished results — a gleaming white tile bathroom wall with modern fittings, a freshly plastered smooth white room with golden morning light streaming through a new window, solar panels glinting on a roof in warm sunlight. Color temperature shifts dramatically from cold industrial blue to warm amber gold as the orbit completes. Dust motes fall in slow motion through golden light beams. Emotional shift: from raw power to warmth and comfort.

SHOT 4 (10–13s): Majestic slow pull-back reveal — a sleek modern single-family house exterior at dusk, warm amber facade lighting, architectural landscaping with accent LED ground lights. Lublin city skyline silhouette visible in the background, dusk sky with deep purples and oranges. A holographic red wireframe of the Media Bud brand geometry pulses above the roofline. A single glowing red line traces from the foundation up through the walls to the roof peak — symbolizing the full build journey. The house looks complete, proud, premium.

SHOT 5 (13–15s): Black screen. Digital glitch/flicker effect — the Media Bud brand wordmark materializes in crisp white uppercase letters center frame, as if projected by a laser. Below it, the URL "mediabud.pl" appears letter by letter. A deep crimson radial pulse emanates from the logo outward, then contracts to silence. Final freeze frame: logo on pure black, minimal and powerful.

Visual style throughout: cinematic anamorphic lens flares on hard light sources, subtle film grain, deep shadow crush. No human faces. Color palette: primary black #050505, accent crimson #f81828, secondary amber #ff6b35, steel blue highlights. Camera movements are deliberate and purposeful — no handheld shake. Pacing matches a driving electronic bass rhythm: slow build → rapid fire cuts → slow reveal → majestic hold → black and logo.

No spoken dialogue or voiceover in this shot. Only ambient sound and action SFX: deep warehouse hum, rhythmic metallic construction impacts, concrete pour rush, slow-motion welder sparks crackling, ambient wind at the exterior reveal, and a final low sub-bass tone at the logo freeze.
```

#### Oś czasu dźwięku

| Czas | Warstwa dźwiękowa | Opis |
|---|---|---|
| 0–3s | Ambience | Głęboki hum przemysłowego magazynu, pulsujący elektroniczny drone |
| 3–6s | SFX rytmiczne | Metaliczne uderzenia, stukot cegieł, betonowy wylew, iskry spawalnicze (cięcia zsynchronizowane z beatem) |
| 6–10s | Przejście | Dźwięk budowy wycisza się, pojawia się ciepły ambient — szum wiatru przez okno, odgłos szlifowania zanikający |
| 10–13s | Atmosphere | Miękki narastający pad elektroniczny, spokojny wiatr wieczorny, odległy odgłos miasta |
| 13–15s | Kulminacja | Głęboki bas drop → cisza → subtonowy ping na freeze logo |

---

## Post-produkcja

| Zakres | Element | Pozycja | Treść / Zasób |
|---|---|---|---|
| Cały film 0–15s | Logo Media Bud (lewy dolny róg) | Dolny lewy, 20px margines | Plik logo białe SVG/PNG (opacity 60% poza ujęciem 5) |
| 0–3s | Etykieta intro | Dolny środek, mała | `LUBLIN · 15 LAT NA RYNKU` (biały, tracking 0.3em, fade in) |
| 6–10s | Etykieta efektu | Dolny lewy | `MATERIAŁY + EKIPA W JEDNYM` (czerwony, caps, fade in 6.5s) |
| 10–13s | Etykieta CTA soft | Dolny środek | `DOM OD PODSTAW · POD KLUCZ` (biały, fade in 11s) |
| 13–15s | CTA główne | Środek dolny, pod logo | `mediabud.pl` (biały, duże, bold) + `+48 533 553 344` (szary, małe) |
| 0–15s | BGM | Tło | Elektroniczny instrumental w stylu: dark cinematic tech — wolne buildup 0–6s, intensywny mid 6–10s, epicka kulminacja 10–13s, izolowany bas drop 13s, cisza 14–15s. Głośność: -6 dB względem SFX. Dodać w post-produkcji jako jedną ciągłą ścieżkę. |

> **Uwaga dot. narracji:** Brak narratora i dialogów w wideo — całość opiera się na atmosferze, muzyce i napisach post-produkcyjnych. Nie generować TTS. Montaż napisów wyłącznie w edytorze wideo po wygenerowaniu spotu.

---

## Wskazówki dotyczące wdrożenia

1. **Generacja w jednym ujęciu** — cały 15-sekundowy spot generowany jako jedna jednostka `t2v`. Model Seedance-2.0-fast wspiera dynamiczne montaże wewnętrzne w jednym wywołaniu.
2. **Po wygenerowaniu** — dodać logo, napisy i BGM w edytorze (CapCut, Premiere, DaVinci Resolve).
3. **Zastosowanie spotu** — YouTube pre-roll (skipable 15s), Instagram Reel, Facebook Story, landing page hero video.
4. **Wariant przyszły** — gdy dostępne będą zdjęcia referencyjne magazynu Media Bud przy ul. Chemicznej 8, warto wygenerować wersję `ref_i2v` z rzeczywistymi produktami z półek.
