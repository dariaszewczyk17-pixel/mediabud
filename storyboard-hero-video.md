# Storyboard: Hero Background Video — MediaBud

## Design Summary
- **Cel wideo:** Tło sekcji hero strony głównej — ciemny industrialny nastrój składu budowlanego; wzmacnia markę bez rozpraszania uwagi od tekstu CTA
- **Styl wizualny:** Industrial Pulse — głęboka czerń z ciepłymi, przydymionymi akcentami; czerwone poblaski od lamp halogenowych i odblasków od stali; chłodne stalowe blaski na betonowej posadzce; ziarnistość filmowa, wysoki kontrast
- **Tempo:** Płynne, powolne — kamera ciągnie się przez przestrzeń niczym oddech; 0–2 s buduje głębię perspektywy → 2–4 s uwydatnia faktury i skalę materiałów → 4–6 s zamknięcie szerokim przelotem, fade do niemal pełnej czerni
- **Uwaga artystyczna:** Ujęcia są celowo podciemnione (~70% jasności sceny) i rozmazane w ruchu (motion blur), co zapewnia czytelność tekstu hero nakładanego w post-produkcji

---

## Technical Parameters

| Parametr | Wartość |
|---|---|
| generation_unit_count | 1 |
| workflow_level | lightweight |
| action | t2v |
| model | seedance-2.0-fast |
| total_duration | 6 s |
| aspect_ratio | 16:9 |
| audio_switch | true |
| asset_strategy | Brak zasobów graficznych — czyste text-to-video |

---

## Asset Table

Czyste text-to-video — żadne zasoby graficzne nie wymagają generowania.

---

## Generation Units

### Generation Unit 01 — Industrial Pulse: Hala Magazynowa

#### Shot Details

| Ujęcie | Przedział czasu | Wielkość planu | Ruch kamery (akcja + intencja) | Treść wizualna |
|---|---|---|---|---|
| 01 | 0–2 s | Szeroki — long shot | Powolny dolly forward wzdłuż osi centralnej hali (budowanie głębokości, wciąganie widza w przestrzeń) | Wnętrze ciemnej hali magazynowej: perspektywiczne rzędy palet z workami cementu i płytami gipsowymi spiętrzonych do 3 m; żółte lampy halogenowe zawieszone wysoko tworzą wąskie stożki ciepłego światła rozbijające się o posadzkę betonową; między paletami dominuje głęboka czerń; stalowe regały giną w półmroku |
| 02 | 2–4 s | Medium close — detal materiałów | Powolny tilt-up z powierzchni belek drewnianych do ościeżnicy z kątownikami stalowymi (uwypuklenie tekstury i przemysłowej skali) | Zbliżenie na ustawione pionowo belki drewniane i kątowniki stalowe; ziarnista faktura drewna i zimny połysk stali; czerwone odblaski od lamp halogenowych tańczą na krawędziach metalowych profili; motion blur na krawędziach podkreśla ciągły ruch kamery |
| 03 | 4–6 s | Szeroki — aerial crane pull-back | Powolny pull-back i jednoczesny wysoki kąt (crane up) — kamera odsuwa się i unosi, ujawniając pełną skalę hali; scena stopniowo przechodzi w niemal pełną czerń (diegetyczny fade przez wygaszenie lamp) | Rozległa hala w głębokiej perspektywie: palety, belki, zwoje izolacji, worki materiałów sypkich — wszystko spowite w półmroku; sylwetki regałów rysują pionowe linie zanikające w mroku sufitu; ostatnia klatka to ~80% czerni z ledwo widocznym konturem hali |

#### video_generation Parameters

| Parametr | Wartość |
|---|---|
| action | t2v |
| title | MediaBud Hero Background — Industrial Pulse |
| model | seedance-2.0-fast |
| duration | 6 |
| aspect_ratio | 16:9 |
| audio_switch | true |
| first_frame_image_url | - |
| end_frame_image_url | - |
| image_urls | - |

#### Prompt

```
Cinematic industrial atmosphere video, 6 seconds, 16:9, no people, no faces, no text overlays.

[0–2s] Slow dolly-forward through a vast, dark construction materials warehouse. Long shot down the central corridor between towering rows of palletized cement bags, gypsum boards, and stacked timber. Ceiling hangs very high, lost in blackness. Narrow warm amber cones of light from suspended halogen lamps pierce downward onto the concrete floor at intervals, casting dramatic pool-light patterns. Between the lit pools: deep impenetrable shadow. Perspective lines of steel racking converge to a vanishing point in the far darkness. Overall exposure is deliberately underexposed — approximately 70% darker than a naturally lit scene. Film grain, cinematic widescreen ratio, slight motion blur on edges.

[2–4s] Camera continues its slow forward motion and transitions into a tilt-up medium close-up. Focus settles on a cluster of vertically stacked timber beams and galvanized steel angle profiles. Texture-rich surface: rough wood grain, cold metallic sheen of steel. Warm red-amber reflections from distant halogen lamps ripple across the steel edges as the camera tilts, creating subtle flickers of light on metal. Motion blur remains present on the periphery. High-contrast lighting: bright metallic edge lines against near-total darkness behind. Mood: heavy, powerful, industrial.

[4–6s] Slow crane pull-back combined with a rising camera angle — wide overhead perspective gradually reveals the full expanse of the warehouse floor: pallets loaded with cement sacks, rolls of insulation, timber, metal profiles, arranged in dense rows extending far into darkness. Steel racking silhouettes form vertical rhythms rising toward an invisible ceiling. The scene progressively transitions toward near-total darkness over the final 2 seconds — a diegetic fade as the lighting seems to extinguish — until the last frame is approximately 80% black with only the faintest silhouette contours of the warehouse visible.

Style: ultra-cinematic Industrial Pulse aesthetic. Color palette dominated by deep blacks and charcoals with isolated warm amber-orange halogen light pools; cold steel-blue highlights on metal surfaces; no red color grading (red appears only as natural halogen warm reflections). Film grain overlay, anamorphic lens distortion on bokeh, shallow depth of field during tilt. Audio: deep low-frequency warehouse ambience — distant metal structural creaks, subtle ventilation hum, reverberant concrete acoustics. No music, no speech, no background music. No visible people. No readable text, no legible letters.
```

#### Dialogue Timeline

Brak — wideo mute autoplay loop; dźwięk ambient generowany przez model nie jest używany na stronie.

---

## Post-Production (wykonaj jeśli wymagane)

| Przedział czasu | Element | Pozycja | Treść / zasób |
|---|---|---|---|
| Całe 6 s — pętla | Overlay CSS: `background: rgba(0,0,0,0.45)` | Pełny ekran (via CSS) | Dodatkowe przyciemnienie nakładane przez kod HTML/CSS przed wyświetleniem tekstu hero; nie wymaga edycji wideo |
| Całe 6 s | Wideo: `autoplay muted loop playsinline` | Cały element `<video>` | Ustaw jako `background-size: cover; object-fit: cover` |
| Całe 6 s | Lazy-load: `loading="lazy"` + `poster` fallback | Tag `<video>` | Poster: ciemny kadr z pierwszej klatki (pobierz z wygenerowanego wideo) |
| Po zsynchronizowaniu z sekcją hero | BGM (opcjonalnie) | Brak — wideo jest muted | Jeśli strona kiedykolwiek doda BGM, użyć osobnego `<audio>` tagu z `loop` |
```
```

---

*Dokument: storyboard-hero-video.md | Projekt: MediaBud | Wersja: 1.0*
