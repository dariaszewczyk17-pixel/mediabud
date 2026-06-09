# Storyboard: Media Bud — Hero Video (Nowe ujęcie 2.0)

> **Plik roboczy:** `storyboard_design.md`
> **Projekt:** mediabud — nowe hero video, całkowicie nowe ujęcia
> **Styl:** Editorial Luxury / Industrial Pulse

---

## Design Summary
- **Cel wideo**: Kinowe, ciemne tło pod sekcję hero strony głównej — buduje aurę premium marki Media Bud (skład budowlany + usługi wykonawcze, Lublin) bez tekstu w obrazie. Widzowie mają poczuć: siłę, precyzję, prestiż.
- **Styl wizualny**: Editorial luxury / industrial pulse — surowe materiały budowlane w dramatycznym, reżyserowanym oświetleniu; głęboka czerń, chłodne szaro-stalowe tony z wąskim akcentem czerwieni (#f81828); kinowy kadr anamorficzny wewnątrz 16:9.
- **Tempo**: Hipnotyzujący slow-motion montaż — każde ujęcie „oddycha"; łagodne przejścia, płynna pętla. Bez fabuły, bez twarzy — czysty nastrój i skala.
- **Uwaga stylistyczna**: Dramatyczne oświetlenie i slow-motion to celowa stylizacja artystyczna, nie realistyczna dokumentacja produktów.

---

## Technical Parameters

| Parametr | Wartość |
|---|---|
| generation_unit_count | 1 |
| workflow_level | lightweight |
| action | t2v |
| model | seedance-2.0-fast |
| total_duration | 15 s |
| aspect_ratio | 16:9 |
| audio_switch | true |
| asset_strategy | Brak assetów — czyste t2v, całkowicie nowe ujęcia |

---

## Asset Table

Czyste text-to-video — brak assetów do wygenerowania. Żadne pliki użytkownika nie są używane.

---

## Generation Units

### Generation Unit 01 — Media Bud Hero: Editorial Luxury

#### Shot Details

| Ujęcie | Zakres czasowy | Skala kadru | Ruch kamery (akcja + intencja) | Treść wizualna |
|---|---|---|---|---|
| 01 | 0–5 s | Ekstremalny zbliżenie → powolne odsunięcie | Ultra-slow pull-back (ujawnienie skali) | Mokra faktura stalowego zbrojenia — krople wody na pręcie, ostre boczne światło. Kamera cofa się od abstrakcji do rozpoznawalnego materiału budowlanego na czarnym tle |
| 02 | 5–10 s | Szeroki, nocny | Powolny dolly forward (wciąganie w przestrzeń) | Nocna fasada budynku w budowie — rusztowanie, stalowe belki. Wąski pas czerwonego światła (#f81828) przesuwa się poziomo po belce. Czarne niebo, industrialna mgła przy ziemi |
| 03 | 10–15 s | Średni, magazynowy | Powolny 180° orbit (monumentalizacja produktu) | Geometrycznie ułożone palety płyt / worków cementu w hali o wysokim suficie — punktowe halogeny, dramatyczne cienie. Końcowy kadr echuje teksturę ujęcia 01, gotowy do pętli |

#### video_generation Parameters

| Parametr | Wartość |
|---|---|
| action | t2v |
| title | Media Bud Hero — Editorial Luxury |
| model | seedance-2.0-fast |
| duration | 15 |
| aspect_ratio | 16:9 |
| audio_switch | true |
| first_frame_image_url | - |
| end_frame_image_url | - |
| image_urls | - |

#### Prompt

```
Cinematic brand atmosphere video, 16:9, 15 seconds. Ultra-premium editorial luxury aesthetic, industrial pulse visual style. Designed as a seamlessly looping hero background — no text, no people, no faces, no hands. Dark moody palette: pure black background, cold steel-grey midtones, single vivid crimson-red (#f81828) accent light. Anamorphic lens simulation, 24fps, heavy cinematic grain (ISO 1600 equivalent), deep lifted blacks, crushed shadows, razor micro-contrast.

SHOT 01 (0–5s): Extreme macro close-up of raw steel reinforcement rods. Glistening water droplets cling to iron surfaces, lit by a single hard side light from the left casting long razor-sharp shadows. Camera executes an ultra-slow pull-back with imperceptible counter-clockwise rotation — transitioning from pure abstract industrial texture to a recognizable stack of construction rebar. Shallow depth of field, circular bokeh background fading to absolute black. Fine construction dust particles drift slowly through the beam of light. The mood: cold precision, material power, industrial poetry.

SHOT 02 (5–10s): Wide cinematic shot of a multi-story building under construction at night. Deep black sky. Steel scaffolding silhouetted against dark navy. A single narrow beam of vivid crimson-red (#f81828) light slides slowly along a horizontal steel beam — the only saturated color in the entire frame, acting as a brand color signal. Low-angle dolly push forward at imperceptible speed, creating a sense of slowly entering a massive structure. Construction cranes visible in the far background, out of focus. Ground-level industrial mist adds atmospheric depth. Anamorphic lens flare blooms gently on the red light beam. The atmosphere: monumental, aspirational, silent power.

SHOT 03 (10–15s): Medium shot inside a high-ceiling industrial warehouse. Precision-stacked pallets of white plasterboard panels or grey cement bags arranged in perfect geometric rows — the geometry is the visual subject. Overhead industrial spotlights cast dramatic hard-edged directional shadows across the polished concrete floor. Camera performs a slow 180-degree orbital move starting from a low side angle and ending facing the stacks front-on. The final frame echoes the abstract material geometry of Shot 01, enabling a seamless visual loop. Color temperature shifts 200K warmer in the final 2 seconds — a subtle exhale before the loop restarts.

AUDIO: Subtle ambient industrial soundscape only — distant wind through steel structures, faint low-frequency metallic resonance, barely audible warehouse echo. No background music track (BGM to be added uniformly in post-production as a continuous separate audio layer). Gradually fades in from near-silence to full ambient by second 3.

No spoken dialogue or voiceover in this shot. Only ambient sound and action SFX.
```

#### Dialogue Timeline

Brak dialogów — wideo jest niemym, ambientowym tłem. Jedyne dźwięki: industrialny ambient (wiatr, metaliczny rezonans, pogłos hali). BGM dodawany w post-produkcji jako osobna ciągła ścieżka.

---

## Post-Production

| Zakres czasowy | Element | Pozycja | Treść / Asset |
|---|---|---|---|
| Cały czas | Overlay HTML hero (tekst + CTA) | Centralnie nad wideo | Nakładany przez warstwę React — POZA wideo, z-index wyższy |
| Cały czas | Ciemny gradient CSS | Nad wideo, pod tekstem | `linear-gradient` / `radial-gradient` z `Home.tsx` — chroni czytelność tytułu |
| Pętla | Seamless loop | — | `<video autoPlay muted loop playsInline>` w HTML5; Shot 01↔03 zaprojektowane z myślą o płynnej pętli |
| Opcjonalnie | BGM — dark industrial ambient | Tło audio | Ciągła ścieżka muzyczna: low-BPM (~70–85), ciężki bas, metaliczne akcenty; głośność: −18 dB pod ambientem wideo |
