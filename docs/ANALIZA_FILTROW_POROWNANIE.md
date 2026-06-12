# Analiza porównawcza: Filtrowanie i sortowanie produktów

## Media Bud vs wiodące sklepy budowlane (Castorama, Leroy Merlin, OBI)

**Data analizy:** Czerwiec 2026  
**Źródła:** Baymard Institute, BTNG.studio, Mobee Dick, dokumentacja Castorama

---

## 📊 Podsumowanie wykonawcze

| Funkcja | Media Bud | Castorama | Leroy Merlin | OBI |
|---------|-----------|-----------|--------------|-----|
| **Filtry facetowe** | ✅ Tak | ✅ Tak | ✅ Tak | ✅ Tak |
| **Sortowanie** | ✅ 4 opcje | ✅ 5 opcji | ✅ Tak | ✅ Tak |
| **Filtr ceny (slider)** | ✅ Tak | ✅ Tak | ✅ Tak | ✅ Tak |
| **Filtr marki** | ✅ Tak + logo | ✅ Tak | ✅ Tak | ✅ Tak |
| **Liczniki produktów** | ✅ Tak | ✅ Tak | ✅ Tak | ✅ Tak |
| **Active filter chips** | ✅ Tak | ✅ Tak | ✅ Tak | ✅ Tak |
| **Mobile drawer** | ✅ Tak | ✅ Tak | ✅ Tak | ✅ Tak |
| **Glassmorphism UI** | ✅ Tak | ❌ Nie | ❌ Nie | ❌ Nie |
| **Animacje/mikrointerakcje** | ✅ Zaawansowane | ⚠️ Podstawowe | ⚠️ Podstawowe | ⚠️ Podstawowe |
| **Futurystyczny design** | ✅ Industrial Pulse | ❌ Korporacyjny | ❌ Korporacyjny | ❌ Korporacyjny |

---

## 🏆 Przewagi Media Bud

### 1. Design i UX
- **Styl "Industrial Pulse"** — unikalny, futurystyczny design wyróżniający się na tle korporacyjnych szablonów konkurencji
- **Glassmorphism** — efekt szkła w FilterBarFuturistic (backdrop-blur, przezroczystość)
- **Mikrointerakcje** — animowane dropdowny, hover effects, glow na aktywnych elementach
- **Dark mode** — ciemny motyw (#080808, #0f0f0f) z czerwonymi akcentami (#f81828)

### 2. Filtry marek z logotypami
- **Wizualne chipy marek** — logotypy zamiast samego tekstu
- **Sekcja "Popularne marki w tej kategorii"** — do 12 marek z logotypami
- **Hover effects** — powiększenie logo, zmiana opacity

### 3. Zaawansowane funkcje
- **Two-phase loading** — szybkie wyświetlenie pierwszych produktów, pełne filtry po załadowaniu wszystkich
- **Intersection Observer** — lazy loading kart produktów
- **3D tilt effect** — na kartach produktów (ProductCardFuturistic)
- **Scan-line animation** — efekt skanowania na hover

---

## 📋 Szczegółowe porównanie funkcji

### Sortowanie produktów

| Opcja sortowania | Media Bud | Castorama | OBI |
|------------------|-----------|-----------|-----|
| Trafność/Domyślne | ✅ | ✅ | ✅ |
| Cena rosnąco | ✅ | ✅ | ✅ |
| Cena malejąco | ✅ | ✅ | ✅ |
| Nazwa A-Z | ✅ | ❌ | ✅ |
| Najwyżej oceniane | ❌ | ✅ | ✅ |
| Nowości | ❌ | ✅ | ✅ |
| Popularność | ❌ | ✅ (w trafności) | ✅ |

**Rekomendacja:** Dodać sortowanie po ocenach i nowościach.

### Filtry facetowe

| Typ filtra | Media Bud | Castorama | OBI |
|------------|-----------|-----------|-----|
| Kategoria/Podkategoria | ✅ Drzewo | ✅ Lista | ✅ Lista |
| Marka | ✅ + logo | ✅ | ✅ |
| Cena (zakres) | ✅ Slider | ✅ Slider | ✅ Slider |
| Dostępność | ✅ | ✅ | ✅ |
| Rodzaj produktu | ✅ | ✅ | ✅ |
| Parametry techniczne | ⚠️ Częściowo | ✅ | ✅ |

### Mobile UX

| Element | Media Bud | Konkurencja |
|---------|-----------|-------------|
| Filter drawer | ✅ Full-screen z animacją | ✅ Standard |
| Sticky "Pokaż wyniki" | ✅ | ✅ |
| Tap targets 44px+ | ✅ | ✅ |
| Horizontal filter chips | ✅ | ⚠️ Rzadko |

---

## 🔬 Analiza wg Baymard Institute (8 kluczowych praktyk)

### 1. ✅ Dynamiczne liczniki produktów
**Media Bud:** Implementuje liczniki przy każdej wartości filtra  
**Best practice:** Zapobiega "dead-end" selections (73% porzuceń przy 0 wyników)

### 2. ✅ Active filter chips
**Media Bud:** Chipy nad siatką produktów z możliwością usunięcia  
**Best practice:** 80% użytkowników zapomina zastosowane filtry

### 3. ✅ Przycisk "Wyczyść filtry"
**Media Bud:** Dostępny w FilterBarFuturistic  
**Best practice:** Kluczowy dla recovery z zero-results

### 4. ✅ URL-based filter state
**Media Bud:** Filtry w URL (useSearchParams)  
**Best practice:** Wspiera back button, deep linking, SEO

### 5. ✅ Mobile filter drawer
**Media Bud:** Full-screen drawer z animacją slide  
**Best practice:** Standard dla mobile e-commerce

### 6. ⚠️ Histogram cen (do wdrożenia)
**Media Bud:** Brak histogramu nad sliderem ceny  
**Best practice:** Zwiększa engagement o 20-30%

### 7. ⚠️ Progressive disclosure (częściowo)
**Media Bud:** Collapsed facets, ale brak "Pokaż więcej"  
**Best practice:** Ukryj >8 wartości za "Show all X options"

### 8. ⚠️ Zero-results recovery page
**Media Bud:** Podstawowy empty state  
**Best practice:** Sugestie usunięcia filtrów, bestsellery, search bar

---

## 🎯 Rekomendacje rozwoju

### Priorytet 1 (Wysoki wpływ na konwersję)

1. **Dodać sortowanie po ocenach i nowościach**
   - Castorama oferuje 5 opcji sortowania
   - Użytkownicy oczekują sortowania po popularności

2. **Histogram cen nad sliderem**
   - Pokazuje rozkład produktów w przedziałach cenowych
   - +20-30% engagement wg BTNG.studio

3. **Ulepszyć zero-results page**
   - Sugestie usunięcia pojedynczych filtrów
   - Pokazać bestsellery kategorii
   - Dodać search bar

### Priorytet 2 (Ulepszenia UX)

4. **Progressive disclosure dla długich list**
   - "Pokaż wszystkie X opcji" dla >8 wartości
   - Zmniejsza cognitive load

5. **Filtry specyficzne dla kategorii**
   - Izolacje: lambda, grubość, klasa reakcji na ogień
   - Płytki: format, antypoślizgowość, mrozoodporność
   - Farby: wydajność, rodzaj podłoża

6. **Persystencja filtrów w sesji**
   - Zapamiętywanie preferencji użytkownika
   - Powrót do poprzednich wyborów

### Priorytet 3 (Innowacje)

7. **AI-personalized filter ordering**
   - Dynamiczna kolejność filtrów dla powracających użytkowników
   - Bazując na historii przeglądania

8. **Visual swatches dla kolorów**
   - Dla farb i tynków kolorowych
   - Próbniki kolorów zamiast tekstu

---

## 📈 Metryki do śledzenia

| Metryka | Cel | Benchmark branżowy |
|---------|-----|-------------------|
| Filter usage rate | >20% desktop, >12% mobile | 15-20% / 8-12% |
| Filter-to-purchase conversion | 1.5-2x baseline | 1.5x |
| Zero-result rate | <3% | 5-10% |
| Filter abandonment rate | <40% | 40-50% |

---

## 🏁 Wnioski

**Media Bud wyróżnia się na tle konkurencji:**
- Unikalnym, futurystycznym designem (Industrial Pulse)
- Zaawansowanymi mikrointerakcjami i animacjami
- Wizualnymi filtrami marek z logotypami
- Nowoczesnym dark mode UI

**Obszary do rozwoju:**
- Rozszerzenie opcji sortowania (oceny, nowości)
- Histogram cen dla lepszego UX
- Filtry specyficzne dla kategorii budowlanych
- Ulepszona strona zero-results

**Pozycja konkurencyjna:** Media Bud oferuje najbardziej nowoczesny i wizualnie atrakcyjny system filtrowania wśród polskich sklepów budowlanych, przewyższając korporacyjne szablony Castorama, Leroy Merlin i OBI pod względem designu i UX.

---

*Raport przygotowany na podstawie: Baymard Institute UX Research, BTNG.studio Filter Patterns 2026, Mobee Dick Filter Analysis, dokumentacja Castorama*
