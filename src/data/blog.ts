export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  faq?: { q: string; a: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "b001",
    slug: "jak-wybrac-styropian-do-elewacji-2026",
    title: "Jak wybrać odpowiedni styropian do elewacji? Przewodnik 2026",
    excerpt: "Styropian fasadowy EPS to jeden z najpopularniejszych materiałów izolacyjnych w Polsce. Podpowiadamy, jak dobrać właściwy produkt do swojego projektu.",
    category: "Izolacje",
    author: "Zespół Media Bud",
    date: "2026-04-15",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tags: ["styropian", "elewacja", "izolacja", "etics", "eps"],
    content: `## Dlaczego wybór styropianu ma kluczowe znaczenie?

Ocieplenie budynku styropianem to inwestycja na dziesięciolecia. Właściwie dobrany materiał nie tylko obniży rachunki za ogrzewanie, ale też zapewni trwałość systemu i estetyczny wygląd elewacji przez wiele lat. Błędy przy wyborze mogą skutkować problemami z wilgocią, pęknięciami tynku, a nawet koniecznością kosztownego remontu.

## Parametry techniczne, na które należy zwrócić uwagę

### Współczynnik przewodzenia ciepła (λ)
To najważniejszy parametr izolacyjny. Im niższa wartość λ, tym lepsza izolacyjność. Standardowy styropian fasadowy EPS 100 ma λ = 0,036–0,040 W/(m·K). Produkty grafitowe (szare) osiągają nawet λ = 0,031 W/(m·K).

### Wytrzymałość na ściskanie (CS)
Dla zastosowań fasadowych wymagana jest klasa CS(10)100 – styropian musi wytrzymać 100 kPa przy 10% ściskaniu. To zapewnia, że płyty nie odkształcą się pod wpływem kleju i tynku.

### Nasiąkliwość
Styropian EPS ma bardzo niską nasiąkliwość (WL(T)5 – max 5% objętości). Ważne szczególnie przy fundamentach i cokole.

## Grubość izolacji – jak obliczyć?

Dla budynków nowo budowanych (wymagania po 2021 roku) minimalna grubość przy λ=0,040 wynosi:
- **Ściany zewnętrzne**: 15–20 cm (U ≤ 0,20 W/m²K)
- **Domy pasywne**: 25–30 cm (U ≤ 0,10 W/m²K)

### Kalkulator uproszczony:
Grubość (cm) = (λ_styropianu × 100) / U_wymagane

## Styropian biały vs grafitowy

| Parametr | EPS biały | EPS grafitowy |
|----------|-----------|---------------|
| λ | 0,038–0,040 | 0,031–0,033 |
| Cena | niższa | o 20–30% wyższa |
| Przy tej samej grubości | standardowa izolacja | lepsza o ok. 15–20% |

## Rekomendacje Media Bud

W naszej hurtowni oferujemy pełną gamę styropianów fasadowych EPS od producentów Swisspor, Styropmin i Termo Organika. Nasi doradcy techniczni pomogą dobrać optymalne parametry dla Twojego projektu – skontaktuj się z nami!`
  },
  {
    id: "b002",
    slug: "systemy-ociepleń-etics-porownanie",
    title: "Systemy ociepleń ETICS – porównanie technologii i producentów",
    excerpt: "ETICS (External Thermal Insulation Composite System) to najbardziej popularna metoda ocieplania budynków. Porównujemy wiodące systemy dostępne na polskim rynku.",
    category: "Systemy ociepleń",
    author: "Zespół Media Bud",
    date: "2026-03-20",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    tags: ["etics", "ocieplenie", "system", "weber", "ceresit", "atlas"],
    content: `## Co to jest system ETICS?

ETICS (External Thermal Insulation Composite System) to złożony wielowarstwowy system ocieplenia elewacji zewnętrznej. Składa się z warstwy izolacji termicznej (styropian lub wełna mineralna), warstwy zbrojącej z siatką oraz wyprawy elewacyjnej.

## Komponenty systemu ETICS

1. **Klej do izolacji** – przyklejanie płyt styropianu/wełny
2. **Płyty izolacyjne** – styropian EPS lub wełna skalna
3. **Łączniki mechaniczne** – kołki do dodatkowego mocowania
4. **Masa klejąca + siatka** – warstwa zbrojąca
5. **Grunt pod tynk** – wyrównanie chłonności
6. **Tynk elewacyjny** – warstwa wykończeniowa
7. **Farba elewacyjna** – kolor i ochrona (opcjonalnie)

## Porównanie systemów czołowych producentów

### Weber (Saint-Gobain)
System webertherm to jeden z najbardziej zaawansowanych na rynku. Oferuje pełną dokumentację techniczną i Aprobaty Techniczne.

### Ceresit (Henkel)
System Ceresit CP wyróżnia się szeroką gamą wybarwień tynków i doskonałą integracją komponentów.

### Atlas
Polsko-szwajcarski producent oferuje bardzo dobrą relację jakości do ceny, z kompleksowym wsparciem technicznym.

## Jak dobrać system dla swojego projektu?

Skontaktuj się z naszymi doradcami w Media Bud – przeprowadzimy bezpłatną analizę i dobierzemy optymalny system do Twojego budynku, uwzględniając budżet i wymagania techniczne.`
  },
  {
    id: "b003",
    slug: "10-bledow-przy-ocieplaniu-budynkow",
    title: "10 najczęstszych błędów przy ocieplaniu budynków – jak ich unikać",
    excerpt: "Nieprawidłowy montaż systemu ociepleniowego może skutkować poważnymi problemami przez wiele lat. Oto najczęstsze błędy, które kosztują właścicieli budynków fortunę.",
    category: "Poradniki",
    author: "Zespół Media Bud",
    date: "2026-02-28",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
    tags: ["błędy", "ocieplenie", "montaż", "etics", "poradnik"],
    content: `## Dlaczego poprawny montaż jest tak ważny?

Inwestycja w ocieplenie to często 15.000–50.000 zł. Błędy wykonawcze mogą skrócić żywotność systemu z 30 do 5–10 lat i prowadzić do kosztownych napraw. Oto 10 błędów, które widzimy najczęściej.

## Błąd 1: Zbyt mała grubość izolacji
Oszczędzanie na grubości styropianu to fałszywa ekonomia. Każdy centymetr mniej to wyższe rachunki za ogrzewanie przez kolejne dekady.

## Błąd 2: Niewłaściwe przygotowanie podłoża
Podłoże musi być stabilne, suche, czyste i nośne. Pominięcie tego kroku to najczęstszy powód odpadania izolacji.

## Błąd 3: Błędne przyklejanie płyt
Klej należy nanosić metodą obwodowo-placową (min. 40% powierzchni) lub pełną. Przyklejanie tylko paskiem na obwodzie to błąd krytyczny.

## Błąd 4: Brak dylatacji i profili startowych
Systemy ETICS muszą mieć prawidłowe dylatacje przy oknach, narożnikach i cokoliku.

## Błąd 5: Praca w nieodpowiednich warunkach pogodowych
Nie nakładaj tynków i klejów przy temperaturze poniżej +5°C lub powyżej +25°C, przy silnym słońcu ani deszczu.

## Błąd 6: Zbyt krótki czas schnięcia między warstwami
Każda warstwa potrzebuje odpowiedniego czasu schnięcia. Pośpiech to przepis na katastrofę.

## Błąd 7: Mieszanie komponentów różnych systemów
Klej jednej marki z tynkiem innej może być niekompatybilny. Stosuj tylko sprawdzone, certyfikowane systemy.

## Błąd 8: Brak siatki w narożnikach i przy otworach
Narożniki okienne i drzwiowe są najbardziej narażone na spękania. Zawsze wzmacniaj je dodatkowymi pasami siatki.

## Błąd 9: Nieprawidłowe kołkowanie
Zbyt mało kołków lub złe ich rozmieszczenie to ryzyko oderwania izolacji przy silnym wietrze.

## Błąd 10: Pominięcie gruntowania
Grunt wyrównuje chłonność podłoża i zapewnia lepszą przyczepność tynku. Jego pominięcie to oszczędność pozorna.

## Skonsultuj projekt z ekspertami Media Bud

Przed przystąpieniem do prac zapraszamy na bezpłatną konsultację techniczną. Nasi specjaliści ocenią stan Twojego budynku i pomogą uniknąć kosztownych błędów.`
  },
  {
    id: "b004",
    slug: "nowe-trendy-materialow-budowlanych-2026",
    title: "Nowe trendy w materiałach budowlanych 2026 – co warto wiedzieć",
    excerpt: "Rynek materiałów budowlanych w 2026 roku przynosi nowe rozwiązania w zakresie efektywności energetycznej, ekologii i inteligentnych systemów budowlanych.",
    category: "Aktualności",
    author: "Zespół Media Bud",
    date: "2026-01-10",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    tags: ["trendy 2026", "materiały budowlane", "innowacje", "energooszczędność"],
    content: `## Kierunki rozwoju branży budowlanej w 2026

Rok 2026 przynosi wiele istotnych zmian na rynku materiałów budowlanych. Wymogi unijne dotyczące efektywności energetycznej, rosnące ceny energii i świadomość ekologiczna klientów napędzają innowacje w całym sektorze.

## 1. Styropian grafitowy EPS jako standard
Szary styropian z grafitem (λ = 0,031–0,033 W/m·K) staje się nowym standardem dla budynków energooszczędnych. Różnica w cenie względem białego maleje, a korzyści izolacyjne są znaczące.

## 2. Systemy ociepleniowe z certyfikatem środowiskowym
Coraz więcej producentów oferuje produkty z EPD (Environmental Product Declaration). Zamawiający – szczególnie deweloperzy realizujący projekty z dofinansowaniem – coraz częściej wymagają takich certyfikatów.

## 3. Tynki samooczyszczające
Nowoczesne tynki silikonowe i silikatowo-silikonowe z nanotechnologią wykazują właściwości hydrofobowe i fotokatalityczne, co znacznie wydłuża czas między renowacjami elewacji.

## 4. Materiały z recyklingu
Wełna mineralna produkowana w coraz większym stopniu z materiałów z odzysku. Nowe linie produktów Atlas i Weber zawierają certyfikowane składniki z recyklingu.

## 5. Systemy szalunek tracony
Coraz popularniejsze w budownictwie jednorodzinnym. Łączą funkcję szalunku i izolacji, przyspieszając prace budowlane.

## Dostępność w Media Bud

Wszystkie nowoczesne produkty z trendów 2026 są dostępne w naszej hurtowni. Zapraszamy do kontaktu – nasi doradcy przedstawią aktualne promocje i pomogą dobrać produkty zgodne z Twoim projektem.`
  },
  {
    id: "b005",
    slug: "tynki-mineralne-vs-akrylowe",
    title: "Tynki mineralne vs akrylowe – który wybrać do elewacji?",
    excerpt: "Wybór odpowiedniego tynku elewacyjnego to decyzja na lata. Porównujemy tynki mineralne i akrylowe pod kątem właściwości, trwałości i kosztów.",
    category: "Chemia budowlana",
    author: "Zespół Media Bud",
    date: "2025-12-05",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
    tags: ["tynk mineralny", "tynk akrylowy", "elewacja", "porównanie"],
    content: `## Wprowadzenie

Tynk elewacyjny to ostatnia warstwa systemu ociepleniowego – widoczna przez wszystkich, eksponowana na warunki atmosferyczne przez dekady. Wybór między tynkiem mineralnym a akrylowym zależy od kilku kluczowych czynników.

## Tynki mineralne

**Zalety:**
- Doskonała paroprzepuszczalność (sd < 0,14 m)
- Odporność na ogień (klasa A1 lub A2)
- Naturalna kompozycja – bez szkodliwych plastyfikatorów
- Dobra odporność na algi i grzyby (zasadowe pH)
- Niższa cena bazowa

**Wady:**
- Ograniczona paleta kolorów (malowanie farbą elewacyjną)
- Praca dwuetapowa (tynk + farba)
- Mniejsza elastyczność (risk mikrospękań na bardzo ruchliwych podłożach)

## Tynki akrylowe

**Zalety:**
- Gotowe do użycia w pełnym kolorze
- Wysoka elastyczność – odporność na mikropęknięcia
- Duża gama kolorów (z mieszalnika)
- Łatwa aplikacja, jeden etap

**Wady:**
- Niska paroprzepuszczalność – ryzyko gromadzenia wilgoci
- Klasa reakcji na ogień E (łatwopalne)
- Wyższa podatność na zabrudzenia i algi

## Rekomendacja Media Bud

Dla większości realizacji polecamy **tynki silikonowe** – łączą zalety obu rodzajów: elastyczność akrylowych z paroprzepuszczalnością i odpornością biologiczną mineralnych. Są nieco droższe, ale zapewniają najdłuższą trwałość bez renowacji (15–20 lat).

Skontaktuj się z naszym doradcą, który dobierze tynk optymalny dla Twojego projektu.`
  },
  {
    id: "b006",
    slug: "materialy-budowlane-dla-deweloperow-optymalizacja-kosztow",
    title: "Materiały budowlane dla deweloperów – jak zoptymalizować koszty projektu",
    excerpt: "Deweloperzy realizujący wiele inwestycji jednocześnie mogą znacząco obniżyć koszty materiałowe. Oto sprawdzone strategie i korzyści współpracy z hurtownią Media Bud.",
    category: "Dla deweloperów",
    author: "Zespół Media Bud",
    date: "2025-11-18",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1565071559227-20ab25b7685e?w=800&q=80",
    tags: ["deweloper", "optymalizacja kosztów", "hurtownia", "materiały budowlane"],
    content: `## Specyfika zakupów deweloperskich

Deweloperzy mają inne potrzeby niż klienci indywidualni. Kluczowe czynniki to: cena przy dużych wolumenach, terminowość dostaw, stała jakość i kompleksowa obsługa logistyczna.

## Jak Media Bud wspiera deweloperów?

### 1. Indywidualne cenniki i kontrakty
Dla deweloperów realizujących stałe zamówienia przygotowujemy indywidualne warunki cenowe uwzględniające wolumen roczny.

### 2. Planowanie dostaw na harmonogram budowy
Dostarczamy materiały dokładnie wtedy, kiedy są potrzebne – bez konieczności magazynowania na placu budowy.

### 3. Jeden punkt kontaktu
Dedykowany opiekun handlowy, który zna Twoje projekty i koordynuje wszystkie zamówienia.

### 4. Dokumentacja techniczna i atesty
Zapewniamy pełną dokumentację dla inwestorów i instytucji finansujących: atesty, certyfikaty, deklaracje właściwości użytkowych.

### 5. Doradztwo przy projektowaniu
Nasi technicy uczestniczą już na etapie projektowania, pomagając zoptymalizować specyfikację materiałową bez kompromisu w jakości.

## Przykładowa optymalizacja kosztów

Przy budynku 10-mieszkaniowym o powierzchni 800 m²:
- Oszczędność przez właściwy dobór grubości izolacji: 8–12%
- Rabat wolumenowy: 5–15%
- Optymalizacja logistyki: 3–5%
- Łączna potencjalna oszczędność: do 25% vs zakup detaliczny

## Zacznij współpracę z Media Bud

Zapraszamy deweloperów do kontaktu. Przygotujemy indywidualną ofertę dla Twojego projektu w ciągu 24 godzin.`
  },
  {
    id: "b007",
    slug: "welna-mineralna-czy-styropian-ocieplenie",
    title: "Wełna mineralna czy styropian — co wybrać do ocieplenia ścian?",
    excerpt: "Styropian i wełna mineralna to dwa najpopularniejsze materiały do ociepleń. Różnią się właściwościami, ceną i zastosowaniem. Podpowiadamy, który wybrać.",
    category: "Izolacje",
    author: "Zespół Media Bud",
    date: "2026-05-10",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80",
    tags: ["wełna mineralna", "styropian", "ocieplenie", "etics", "izolacja termiczna"],
    content: `## Wełna mineralna i styropian — podstawowe różnice

Wybór między wełną mineralną a styropianem to jedna z pierwszych decyzji przy planowaniu ocieplenia. Oba materiały działają w systemach ETICS, ale mają odmienne właściwości, które powinny wpłynąć na Twoją decyzję.

## Parametry techniczne — porównanie

| Cecha | Styropian EPS | Wełna mineralna |
|-------|--------------|-----------------|
| Współczynnik λ | 0,031–0,040 W/(m·K) | 0,033–0,040 W/(m·K) |
| Klasa reakcji na ogień | E (trudno zapalna) | A1/A2 (niepalna) |
| Chłonność wody | bardzo niska | umiarkowana |
| Izolacja akustyczna | niska | dobra |
| Cena orientacyjna | niższa | o 20–40% wyższa |

## Kiedy wybrać styropian?

Styropian EPS (biały lub grafitowy) sprawdza się, gdy:

- Ważna jest cena — styropian jest tańszy w zakupie i montażu
- Ocieplasz ściany poniżej gruntu lub cokoły (niska nasiąkliwość)
- Zależy Ci na szybkości prac — lżejszy, łatwiejszy w cięciu
- Budynek nie ma wymagań klasy A1/A2

Grafitowy EPS 100 to najlepszy stosunek ceny do izolacyjności dla większości domów jednorodzinnych.

## Kiedy wybrać wełnę mineralną?

Wełna mineralna (skalna lub szklana) to lepsza opcja, gdy:

- Budynek wymaga klasy reakcji na ogień A1 lub A2 (budynki wielorodzinne, obiekty publiczne)
- Zależy Ci na izolacji akustycznej (wełna tłumi dźwięki 2–3× lepiej niż styropian)
- Ocieplasz budynek drewniany lub o konstrukcji szkieletowej

## Grubość izolacji 2026

Dla ścian zewnętrznych U ≤ 0,20 W/(m²·K). Przy λ = 0,036 oznacza to min. 18 cm izolacji.

## Media Bud poleca

W naszym składzie w Lublinie dostępne są styropiany Swisspor, Styropmin, Termo Organika oraz wełny Rockwool, Isover i Ursa. Doradcy pomogą dobrać odpowiedni materiał — zapraszamy do kontaktu.`
  },
  {
    id: "b008",
    slug: "czyste-powietrze-2026-dofinansowanie-ocieplenie",
    title: "Czyste Powietrze 2026 — co dofinansują i jak skorzystać?",
    excerpt: "Program Czyste Powietrze to jedno z największych źródeł dofinansowania do termomodernizacji. Sprawdź aktualne progi i jak skorzystać z dotacji w Lublinie.",
    category: "Aktualności",
    author: "Zespół Media Bud",
    date: "2026-05-20",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    tags: ["Czyste Powietrze", "dofinansowanie", "termomodernizacja", "ocieplenie", "Lublin"],
    content: `## Czyste Powietrze — czym jest program?

Program Czyste Powietrze to rządowe dofinansowanie dla właścicieli domów jednorodzinnych na wymianę kotłów i termomodernizację. Dotacja może sięgać do ponad 135 000 zł — zależnie od dochodu i zakresu prac.

**Uwaga:** Warunki programu są aktualizowane. Zawsze sprawdzaj aktualne zasady na czystepowietrze.gov.pl przed złożeniem wniosku.

## Jakie prace mogą być dofinansowane?

- Ocieplenie ścian, dachu, podłogi na gruncie
- Wymiana okien, drzwi zewnętrznych
- Wymiana źródła ciepła (pompa ciepła, kocioł kondensacyjny)
- Wentylacja mechaniczna z odzyskiem ciepła
- Mikroinstalacja fotowoltaiczna (wybrane ścieżki)

## Orientacyjne progi dofinansowania

| Ścieżka | Roczny dochód | Poziom dotacji |
|---------|--------------|---------------|
| Podstawowy | do 135 tys. zł | do 66 900 zł |
| Podwyższony | do 1 894 zł/os/m-c | do 99 000 zł |
| Najwyższy | do 1 090 zł/os/m-c | do 135 000 zł |

*Kwoty orientacyjne — sprawdź aktualne progi na czystepowietrze.gov.pl*

## Jak złożyć wniosek?

1. Załóż konto w portalu gov.pl lub odwiedź WFOŚiGW w Lublinie
2. Wybierz zakres prac i wykonawcę
3. Złóż wniosek online lub w oddziale funduszu
4. Zrealizuj inwestycję z zachowaniem pełnej dokumentacji

## Media Bud a Czyste Powietrze

Pomagamy inwestorom z Lublina przygotować inwestycję pod wymagania programu — dobieramy materiały spełniające parametry techniczne i wspieramy w przygotowaniu zestawienia kosztów. MediaBud nie gwarantuje przyznania dotacji — decyzja zależy od programu i sytuacji beneficjenta.`
  },
  {
    id: "b009",
    slug: "farby-elewacyjne-rodzaje-jak-wybrac",
    title: "Farby elewacyjne — rodzaje, właściwości i jak wybrać odpowiednią",
    excerpt: "Silikonowa, silikatowa, akrylowa? Wybór farby elewacyjnej ma duże znaczenie dla trwałości budynku. Omawiamy różnice i wskazujemy, kiedy stosować każdy rodzaj.",
    category: "Chemia budowlana",
    author: "Zespół Media Bud",
    date: "2026-04-28",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800&q=80",
    tags: ["farby elewacyjne", "farba silikonowa", "farba silikatowa", "elewacja", "malowanie"],
    content: `## Dlaczego farba elewacyjna ma znaczenie?

Farba elewacyjna to ostatnia warstwa ochronna ściany zewnętrznej. Dobra farba na odpowiednim tynku przetrwa 10–15 lat. Zła — peeling po 3 latach i remont elewacji.

## Rodzaje farb elewacyjnych

### Farba akrylowa
Najtańsza opcja, dobra elastyczność, szeroka paleta kolorów. Słabsza paroprzepuszczalność — nie polecana do elewacji ze styropianu.

### Farba silikonowa
Najlepsza odporność na zabrudzenia i wodoodporność przy dobrej paroprzepuszczalności. Droższa, ale trwalsza. Idealna do tynków silikonowych systemów ETICS.

### Farba silikatowa
Wysoka paroprzepuszczalność, odporność na grzyby — idealna do starych budynków z cegły lub tynku mineralnego. Ograniczona paleta kolorów.

### Farba mineralna
Tradycyjna, paroprzepuszczalna, antybakteryjna. Do budynków zabytkowych i renowacji. Wymaga regularnego odnawiania.

## Jak dobrać farbę do systemu?

| System ETICS | Zalecana farba |
|-------------|----------------|
| Styropian + tynk silikonowy | Silikonowa (Weber, Ceresit, Bolix) |
| Wełna + tynk mineralny | Silikatowa lub silikonowa |
| Stara elewacja bez ocieplenia | Silikatowa lub akrylowa po gruntowaniu |
| Budynek zabytkowy | Mineralna lub wapienno-silikatowa |

## Media Bud — farby elewacyjne

Oferujemy farby Weber, Ceresit, Atlas, Caparol i Bolix. Doradcy pomogą dobrać kolor i rodzaj do projektu — zapraszamy do składu przy ul. Chemicznej 8d w Lublinie.`
  },
  {
    id: "b010",
    slug: "sucha-zabudowa-knauf-rigips-poradnik",
    title: "Sucha zabudowa Knauf i Rigips — praktyczny poradnik dla inwestorów",
    excerpt: "Płyty gipsowo-kartonowe to podstawa wykończenia wnętrz. Jakie GK wybrać do różnych pomieszczeń, jak zaplanować zabudowę i czego unikać — kompletny poradnik.",
    category: "Poradniki",
    author: "Zespół Media Bud",
    date: "2026-04-05",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    tags: ["sucha zabudowa", "płyty GK", "Knauf", "Rigips", "gipsowo-kartonowe", "wykończenie"],
    content: `## Czym jest sucha zabudowa?

Sucha zabudowa to wykończenie wnętrz płytami GK na stalowej konstrukcji — bez mokrych tynków i długiego schnięcia. Stosuje się ją do sufitów, ścianek działowych, obudów instalacji i zabudowy skosów poddasza.

## Rodzaje płyt GK i zastosowanie

| Typ płyty | Kolor kartonu | Gdzie stosować |
|-----------|--------------|----------------|
| Standardowa (GKB) | szary/kremowy | salony, sypialnie, suche pomieszczenia |
| Impregnowana (GKBI) | zielony | łazienki, kuchnie, pralnie |
| Ognioodporna (GKF) | różowy | klatki schodowe, strefy pożarowe |
| Kombinowana (GKFI) | zielono-różowy | wilgotne strefy pożarowe |

## Profile — podstawowe typy

- **CD 60** — profile nośne sufitu (co 50 cm)
- **UD 28** — profile obwodowe sufitu i podłogi
- **CW 50/75/100** — słupki ścianek działowych
- **UW 50/75/100** — profile obwodowe ścianek

## Izolacja akustyczna w suchej zabudowie

Sama płyta GK nie izoluje dobrze. Żeby osiągnąć Rw ≥ 45 dB wymagany między mieszkaniami, należy zastosować wełnę mineralną w przestrzeni (Rockwool Acoustic lub Ursa TP 3) i podwójne opłytowanie.

## Najczęstsze błędy

- Zbyt duże rozstawy profili — ugięcie płyt
- Brak dylatacji przy ścianach — pęknięcia złączy
- Pominięcie zbrojenia siatką w narożnikach

W Media Bud oferujemy systemy Knauf, Rigips, wełnę Rockwool i Ursa. Skład przy ul. Chemicznej 8d, Lublin.`
  },
  {
    id: "b011",
    slug: "sklad-budowlany-lublin-jak-kupowac-materialy",
    title: "Skład budowlany w Lublinie — jak mądrze kupować materiały budowlane?",
    excerpt: "Gdzie kupować materiały budowlane w Lublinie? Jak porównywać oferty, na co zwracać uwagę i dlaczego lokalny skład budowlany to często lepsza opcja niż market.",
    category: "Poradniki",
    author: "Zespół Media Bud",
    date: "2026-05-05",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=800&q=80",
    tags: ["skład budowlany Lublin", "materiały budowlane Lublin", "hurtownia budowlana"],
    content: `## Skład budowlany a market — kluczowe różnice

Przy zakupie materiałów budowlanych większość inwestorów wybiera między marketem a lokalnym składem. Dla większości projektów w Lublinie skład budowlany to lepsza opcja.

### Co oferuje lokalny skład budowlany?

- **Doradztwo techniczne** — specjaliści znający systemy materiałowe
- **Dostawy na budowę** — na terenie Lublina i województwa lubelskiego
- **Systemy, nie produkty** — klej, siatka, grunt, tynk i farba od jednego producenta
- **Ceny hurtowe** dla wykonawców i firm B2B
- **Zamówienia na zamówienie** — produkty niedostępne stałe

## Na co zwracać uwagę przy zakupie?

### Spójność systemu
Nie mieszaj produktów różnych producentów w obrębie jednego systemu (np. klej Ceresit + tynk Atlas). Producenci nie gwarantują kompatybilności.

### Ilości i bufor
Zamawiaj z buforem: +5–10% dla tynków i farb, +10–15% dla płytek. Zbyt małe partie oznaczają wyższy koszt jednostkowy i ryzyko różnic partii.

### Dostawy etapowe
Przy większych zamówieniach uzgodnij dostawy zgodnie z harmonogramem robót — nie gromadź zbędnie materiałów na budowie.

## Media Bud — skład budowlany Lublin

Przy ul. Chemicznej 8d (Lublin, Pon–Pt 7:00–16:00) oferujemy ponad 15 000 produktów: Weber, Ceresit, Atlas, Knauf, Rigips, Rockwool, Swisspor, Bolix, Baumit i wiele innych. Doradztwo techniczne gratis — zadzwoń +48 509 567 213.`
  },
  {
    id: "b012",
    slug: "tynk-silikonowy-vs-akrylowy-jaki-wybrac",
    title: "Tynk silikonowy vs akrylowy — który wybrać na elewację? [2026]",
    excerpt: "Tynk silikonowy czy akrylowy? Porównujemy paroprzepuszczalność, trwałość, cenę i łatwość aplikacji. Praktyczny przewodnik dla inwestorów budujących lub remontujących elewację.",
    category: "Tynki i elewacje",
    author: "Zespół Media Bud",
    date: "2026-06-01",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=80",
    tags: ["tynk silikonowy", "tynk akrylowy", "elewacja", "weber", "ceresit", "baumit"],
    content: `## Tynk silikonowy vs akrylowy — podstawowe różnice

Wybór tynku elewacyjnego to decyzja na 15–20 lat. Tynk silikonowy i akrylowy to dwa najpopularniejsze rodzaje — różnią się właściwościami, ceną i przeznaczeniem.

## Czym jest tynk silikonowy?

Tynk silikonowy (polisiloksanowy) zawiera polimery silikonowe. Łączy elastyczność akrylu z paroprzepuszczalnością tynku silikatowego. To tynk premium.

**Przykłady:** Weber.ton Sil, Ceresit CT 174, Baumit SilikonTop, Atlas Silkon-T

## Czym jest tynk akrylowy?

Tynk akrylowy używa dyspersji akrylowej jako spoiwa. Jest elastyczny, odporny na uderzenia i łatwy w aplikacji. Najchętniej wybierany ze względu na cenę.

**Przykłady:** Weber.pas Akryl, Ceresit CT 60, Atlas Cermit A, Bolix AC

## Porównanie parametrów

| Parametr | Silikonowy | Akrylowy |
|---|---|---|
| Paroprzepuszczalność (sd) | bardzo wysoka (< 0,01 m) | niska (0,1–0,5 m) |
| Odporność na glony i grzyby | bardzo dobra (efekt lotosu) | dobra |
| Elastyczność | bardzo dobra | dobra |
| Odporność na UV | bardzo dobra | dobra |
| Łatwość aplikacji | dobra | bardzo dobra |
| Cena (25 kg) | 150–220 zł | 80–140 zł |
| Trwałość koloru | 15–20 lat+ | 10–15 lat |

## Kiedy wybrać silikonowy?

- Nowy dom — chcesz elewację bez remontów przez 20 lat
- Budynek w miejscu narażonym na wilgoć
- Ocieplenie ze styropianem — konieczne odprowadzanie pary
- Zależy Ci na samooczyszczaniu (efekt lotosu)

## Kiedy wybrać akrylowy?

- Ograniczony budżet (różnica na dom 150 m²: ok. 2 000–5 000 zł)
- Remont budynku w suchej lokalizacji
- Krótki czas realizacji — szybsze schnięcie
- Budynek w suchym klimacie

## UWAGA: Akryl na styropianie (ETICS)

Na systemie ETICS ze styropianem EPS tynk akrylowy może powodować zawilgocenie, odspajanie i glony. Na EPS zalecamy wyłącznie tynk silikonowy lub silikatowy.

## Koszty dla domu 150 m² (elewacja ~350 m²)

| | Silikonowy | Akrylowy |
|---|---|---|
| Materiał | ok. 4 900–7 700 zł | ok. 2 800–4 900 zł |
| Różnica | +2 100–2 800 zł | — |

Przy 20-letniej perspektywie jeden remont elewacji akrylowej kosztuje 8 000–15 000 zł — tynk silikonowy zwraca się po ok. 8–10 latach.

Wyliczymy ilości materiału — zadzwoń: **+48 533 553 344** lub odwiedź skład przy ul. Chemicznej 8d, Lublin.`
  },
  {
    id: "b013",
    slug: "koszt-ocieplenia-domu-150m2-2026",
    title: "Ile kosztuje ocieplenie domu 150 m² w 2026 roku? Kalkulator i zestawienie",
    excerpt: "Kompleksowa kalkulacja kosztów ocieplenia domu jednorodzinnego 150 m² metodą ETICS. Ceny materiałów, robocizna, dofinansowanie Czyste Powietrze — sprawdź ile zapłacisz.",
    category: "Izolacje",
    author: "Zespół Media Bud",
    date: "2026-06-03",
    readTime: 11,
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80",
    tags: ["koszt ocieplenia domu", "ocieplenie 150m2", "ETICS", "czyste powietrze", "termomodernizacja", "ceny 2026"],
    content: `## Koszt ocieplenia domu 150 m² — co wchodzi w cenę?

Ocieplenie domu to inwestycja obniżająca rachunki za ogrzewanie o 30–60% rocznie. Ile kosztuje termomodernizacja domu 150 m² w 2026 roku?

## Założenia kalkulacji

- Dom jednorodzinny 150 m² użytkowej
- Powierzchnia elewacji: ~350 m²
- Metoda: ETICS (styropian EPS grafitowy 15 cm + tynk silikonowy)
- System Weber lub Ceresit (jedna marka = jedna gwarancja)

## Koszty materiałów (350 m²)

| Materiał | Ilość | Cena jedn. | Koszt |
|---|---|---|---|
| Styropian EPS grafitowy λ0,031 gr. 15 cm | 360 m² | 32–40 zł/m² | 11 500–14 400 zł |
| Klej do styropianu (5 kg/m²) | 1 800 kg | 1,40–1,80 zł/kg | 2 520–3 240 zł |
| Kołki teleskopowe (6 szt./m²) | 2 160 szt. | 0,45–0,65 zł/szt. | 970–1 400 zł |
| Masa zbrojąca + siatka | — | — | 4 550–6 620 zł |
| Grunt + tynk silikonowy (2,5 kg/m²) | 875 kg | 5,80–7,50 zł/kg | 6 200–8 360 zł |
| Profile, narożniki, akcesoria | — | — | 800–1 400 zł |
| **RAZEM materiały** | | | **26 540–35 420 zł** |

## Koszty robocizny

| Etap | Stawka | Koszt 350 m² |
|---|---|---|
| Klejenie styropianu + kołkowanie | 20–30 zł/m² | 7 000–10 500 zł |
| Zbrojenie siatką | 12–18 zł/m² | 4 200–6 300 zł |
| Tynkowanie | 25–40 zł/m² | 8 750–14 000 zł |
| Przygotowanie podłoża + rusztowanie | — | 5 300–9 750 zł |
| **RAZEM robocizna** | | **25 250–40 550 zł** |

## Całkowity koszt — trzy warianty

| Wariant | Materiały | Robocizna | RAZEM |
|---|---|---|---|
| Ekonomiczny (EPS biały, tynk akrylowy) | 22 000–26 000 zł | 22 000–28 000 zł | **44 000–54 000 zł** |
| Standard (EPS grafitowy, tynk silikonowy) | 27 000–35 000 zł | 25 000–40 000 zł | **52 000–75 000 zł** |
| Premium (wełna mineralna, tynk silikatowy) | 38 000–52 000 zł | 28 000–44 000 zł | **66 000–96 000 zł** |

## Dofinansowanie Czyste Powietrze 2026

- **Podstawowe**: do 66 000 zł (dochód do 135 000 zł/rok)
- **Podwyższone**: do 99 000 zł (dochód poniżej 1 894 zł/os.)
- **Najwyższe**: do 135 000 zł (skrajnie niska dochodowość)

Faktura VAT od dostawcy materiałów (np. Media Bud) jest niezbędna do wniosku.

## Zwrot z inwestycji

Dom 150 m² z ogrzewaniem gazowym, przejście z klasy F do C:
- Oszczędność gazu: ok. 1 200–2 000 m³/rok
- Oszczędność finansowa: ok. 3 600–6 000 zł/rok
- Okres zwrotu: **3–8 lat** (z dofinansowaniem CP)

Wyliczymy dokładne zestawienie materiałów po podaniu rzutu budynku — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b014",
    slug: "knauf-vs-rigips-porownanie-plyt-gk-2026",
    title: "Knauf vs Rigips — która płyta GK lepsza? Porównanie 2026",
    excerpt: "Knauf czy Rigips — dwie największe marki płyt gipsowo-kartonowych w Polsce. Porównujemy jakość, asortyment, ceny i profile. Które systemy wybrać do suchej zabudowy?",
    category: "Sucha zabudowa",
    author: "Zespół Media Bud",
    date: "2026-06-05",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    tags: ["knauf", "rigips", "płyta GK", "sucha zabudowa", "gipsowo-kartonowe", "ścianka działowa"],
    content: `## Knauf vs Rigips — dwie marki, jeden standard EN 520

Na polskim rynku suchej zabudowy dominują Knauf i Rigips (Saint-Gobain). Obie marki produkują płyty zgodnie z normą EN 520 i mają porównywalną jakość. Która wybrać?

## Porównanie asortymentu płyt

| Typ płyty | Knauf | Rigips | Zastosowanie |
|---|---|---|---|
| Standardowa 12,5 mm | GKB (biała) | Standard (biała) | Ściany i sufity suche |
| Impregnowana (łazienka) | GKBi (zielona) | Blue (zielona) | Mokre pomieszczenia |
| Ognioodporna | GKF (różowa) | RF (różowa) | Odporność ogniowa EI |
| Akustyczna | Silentboard | Phonique | Wyciszenie pomieszczeń |
| Udaroodporna | Aquapanel | Glasroc Impact | Garaże, klatki schodowe |

Knauf oferuje bogatszy asortyment specjalnych płyt. Rigips przewodzi w standardowych segmentach biurowych i komercyjnych.

## Porównanie cen (Lublin, 2026)

| Produkt | Knauf | Rigips | Różnica |
|---|---|---|---|
| Płyta GKB 12,5 mm / m² | 14–16 zł | 14–17 zł | do 1 zł/m² |
| Płyta GKBi (zielona) / m² | 17–20 zł | 18–21 zł | do 2 zł/m² |
| Profil CW 75/0,5 mm / mb | 5,50–6,50 zł | 5,80–7,00 zł | do 0,80 zł/mb |
| Profil CD 60/0,5 mm / mb | 4,50–5,50 zł | 4,80–5,80 zł | do 0,60 zł/mb |

Ceny są zbliżone — Knauf często bywa nieznacznie tańszy. Na dużym zleceniu różnica może wynosić kilkaset złotych.

## Kiedy wybrać Knauf?

- Potrzebujesz specjalnych płyt: Aquapanel, Cleaneo, grubości 15/18 mm
- Budujesz dom jednorodzinny — dobra dostępność w Polsce
- Chcesz kompletny system jednej marki (kleje, masy, grunty)
- Projekt wymaga certyfikowanego systemu ognioodpornego EI

## Kiedy wybrać Rigips?

- Projekt komercyjny, biurowy lub deweloperski — standard w tej branży
- Ekipa przyzwyczajona do systemów Rigips
- Budujesz w systemach Habito lub DuraBase (premium)
- Potrzebujesz dużych ilości — dystrybucja Saint-Gobain sprawna

## Najważniejsza zasada

**Nie mieszaj systemów!** Używaj kleju, taśmy, masy i profili jednej marki. Producenci gwarantują parametry (akustyczne, ogniowe) tylko dla kompletnych systemów certyfikowanych.

W Media Bud dostępne są płyty i profile Knauf oraz Rigips. Wyliczymy materiały i doradzimy system — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b015",
    slug: "jaki-klej-do-styropianu-wybrac-2026",
    title: "Jaki klej do styropianu wybrać? Porównanie 2026",
    excerpt: "Klej cementowy, poliuretanowy czy gotowy klej systemowy? Porównujemy rodzaje kleju do styropianu EPS i XPS, wydajność i koszt na m².",
    category: "Ocieplenia",
    author: "Zespół Media Bud",
    date: "2026-06-06",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
    tags: ["klej do styropianu", "ocieplenie", "EPS", "XPS", "ETICS"],
    content: `## Rodzaje kleju do styropianu

Dobór kleju to kluczowa decyzja w systemie ETICS.

### 1. Klej cementowy (worki 25 kg)

Najczęściej stosowany. Miesza się z wodą na placu budowy. Zużycie 4–5 kg/m², czas otwarty 20–30 min.

**Przykłady**: Weber.therm Klasik, Ceresit CT 83, Atlas Stopter K-20. Koszt: 6–9 zł/m²

### 2. Klej poliuretanowy (piana)

1 kartusz ≈ 6–8 m². Koszt: 4–7 zł/m². Stosowany do XPS i poddaszy.

## Ile kleju na 350 m²?

Przy 4,5 kg/m²: 350 × 4,5 = 1 575 kg ≈ 63 worki 25 kg → koszt ≈ 2 200 zł

## Metody aplikacji

| Metoda | Pokrycie |
|---|---|
| Obwodowo-placowa | ok. 40% |
| Grzebieniowa | 100% |

W Media Bud mamy kompletne systemy Weber, Ceresit, Atlas — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b016",
    slug: "gladz-szpachlowa-vs-wyrownujaca-roznice",
    title: "Gładź szpachlowa vs wyrównująca — różnice i zastosowanie",
    excerpt: "Gładź szpachlowa czy wyrównująca — czym się różnią i kiedy którą stosować.",
    category: "Sucha zabudowa",
    author: "Zespół Media Bud",
    date: "2026-06-06",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1534237886190-bbe17184f66d?w=800&q=80",
    tags: ["gładź szpachlowa", "gładź wyrównująca", "szpachlowanie", "wykończenie ścian"],
    content: `## Gładź wyrównująca (grubowarstwowa)

Do wyrównywania ubytków do 30 mm. Grubość warstwy 2–30 mm, schnięcie 24–48 h.

**Przykłady**: Knauf Goldband Uni, Ceresit CT 29, Atlas Uni Plus. Cena: 25–40 zł/25 kg

## Gładź szpachlowa (finiszowa)

Finalne wyrównanie pod malowanie — 0,5–3 mm. Schnięcie 4–8 h.

**Przykłady**: Knauf Finish, Semin CE 78, Atlas Gipsar Finisz. Cena: 30–55 zł/20 kg

## Kolejność prac

1. Beton/mur → grunt → wyrównująca → finiszowa → malowanie
2. Płyta GK → taśmowanie → finiszowa → szlifowanie → malowanie

## Najczęstsze błędy

| Błąd | Skutek |
|---|---|
| Finiszowa na surowy beton | Brak przyczepności |
| Za gruba warstwa finiszowej (>3 mm) | Pęknięcia przy schnięciu |

Kalkulacja materiałów bezpłatnie — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b017",
    slug: "ile-tynku-na-elewacje-kalkulator-2026",
    title: "Ile tynku potrzeba na elewację? Kalkulator 2026",
    excerpt: "Wzory i tabele zużycia tynku silikonowego, akrylowego i mineralnego — kalkulator krok po kroku.",
    category: "Tynki i elewacje",
    author: "Zespół Media Bud",
    date: "2026-06-06",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80",
    tags: ["tynk elewacyjny", "kalkulator tynku", "ile tynku", "elewacja 2026"],
    content: `## Jak obliczyć ilość tynku?

**Wzór**: Pow. netto = (obwód × wys.) − Σ otworów

**Przykład** — dom 10×12 m, 2 kond. × 2,8 m, 12 okien 1,2×1,4 m → Netto ≈ 224 m²

## Zużycie wg ziarna

| Typ tynku | Ziarno | Zużycie |
|---|---|---|
| Tynk silikonowy baranek | 1,5 mm | 2,5–3,0 kg/m² |
| Tynk silikonowy baranek | 2,0 mm | 3,0–3,5 kg/m² |
| Tynk akrylowy baranek | 1,5 mm | 2,0–2,5 kg/m² |

**Wzór na opakowania**: (pow. × zużycie ÷ waga_opak.) × 1,05

Dla 224 m², tynk sil. 1,5 mm, wiaderka 25 kg → **26 wiader**

## Tabela gotowa

| Powierzchnia | Tynk 1,5 mm | Tynk 2,0 mm |
|---|---|---|
| 150 m² | 17 wiader | 21 wiader |
| 200 m² | 23 wiader | 28 wiader |
| 350 m² | 40 wiader | 49 wiader |

Wyliczymy dla Twojego budynku — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b018",
    slug: "plyty-osb-vs-sklejka-co-wybrac",
    title: "Płyty OSB vs sklejka — co wybrać do konstrukcji?",
    excerpt: "OSB czy sklejka? Porównujemy właściwości, zastosowania i ceny OSB 3, OSB 4 i sklejki budowlanej.",
    category: "Drewno i materiały drewnopochodne",
    author: "Zespół Media Bud",
    date: "2026-06-06",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1521477716071-a4105c9a8669?w=800&q=80",
    tags: ["OSB", "sklejka", "płyty OSB", "deskowanie"],
    content: `## Porównanie: OSB vs sklejka

| Cecha | OSB 3 | OSB 4 | Sklejka |
|---|---|---|---|
| Wytrzymałość | ★★★ | ★★★★ | ★★★★ |
| Odporność na wilgoć | ★★★ | ★★★★ | ★★★ |
| Równość powierzchni | ★★ | ★★★ | ★★★★ |
| Cena 18 mm/m² | 38–48 zł | 55–70 zł | 55–90 zł |

## Zastosowania

**OSB 3**: Poszycie dachów, ścianki szkieletowe, posadzki na legarach

**OSB 4**: Poszycie dachów bez szalunku, garaże, ściany zewnętrzne

**Sklejka**: Stolarka, podłogi wykończeniowe, szalunki krzywoliniowe, łazienki (WBP)

## Ceny (Lublin 2026)

| Produkt | 18 mm | Cena/szt |
|---|---|---|
| OSB 3 Kronospan | 2500×1250 | 78–95 zł |
| Sklejka WBP | 2500×1250 | 140–185 zł |

**Uwaga**: Zawsze zostaw 2–3 mm dylatacji między płytami OSB!

Sprawdź dostępność — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b019",
    slug: "cennik-izolacji-termicznej-2026",
    title: "Cennik izolacji termicznej 2026 — styropian, wełna, XPS",
    excerpt: "Aktualne ceny EPS, wełny mineralnej Rockwool, Isover i XPS — porównanie kosztów na m² i m³.",
    category: "Izolacje",
    author: "Zespół Media Bud",
    date: "2026-06-06",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=800&q=80",
    tags: ["ceny izolacji 2026", "styropian cena", "wełna mineralna cena", "XPS cena", "termomodernizacja"],
    content: `## Cennik materiałów izolacyjnych — Lublin 2026

### Styropian EPS elewacyjny

| Produkt | λ | Grubość | Cena m² |
|---|---|---|---|
| EPS biały | 0,040 | 10 cm | 17–22 zł |
| EPS biały | 0,040 | 15 cm | 25–33 zł |
| EPS grafitowy | 0,031 | 10 cm | 28–36 zł |
| EPS grafitowy | 0,031 | 15 cm | 38–50 zł |
| EPS grafitowy | 0,031 | 20 cm | 52–68 zł |

### XPS — fundamenty, dachy odwrócone

| Produkt | λ | Grubość | Cena m² |
|---|---|---|---|
| XPS standard | 0,034 | 5 cm | 28–38 zł |
| XPS standard | 0,034 | 10 cm | 52–70 zł |

### Wełna kamienna Rockwool

| Produkt | λ | Grubość | Cena m² |
|---|---|---|---|
| Frontrock MAX E | 0,036 | 10 cm | 48–65 zł |
| Frontrock MAX E | 0,036 | 15 cm | 72–95 zł |

### Koszt na 100 m² elewacji

| Materiał | 15 cm | Koszt |
|---|---|---|
| Styropian biały | 15 cm | 2 500–3 300 zł |
| Styropian grafitowy | 15 cm | 3 800–5 000 zł |
| Wełna Rockwool | 15 cm | 7 200–9 500 zł |

### Kiedy co wybrać?

- Dom jednorodzinny → EPS grafitowy 15 cm
- Budynek użyteczności publicznej → wełna kamienna (klasa A1)
- Dach odwrócony / garaż → XPS
- Podłoga na gruncie → EPS 100/200

Zamów z dostawą do Lublina — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b020",
    slug: "zaprawa-murarska-tradycyjna-vs-cienkowarstwowa",
    title: "Zaprawa murarska tradycyjna vs cienkowarstwowa — kiedy co stosować?",
    excerpt: "Zaprawa tradycyjna (1 cm) czy cienkowarstwowa (1–3 mm)? Porównujemy klasy zapraw, zużycie i koszt. Przewodnik 2026.",
    category: "Chemia budowlana",
    author: "Zespół Media Bud",
    date: "2026-06-07",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&q=80",
    tags: ["zaprawa murarska", "cienkowarstwowa", "bloczki", "beton komórkowy"],
    content: `## Zaprawa tradycyjna vs cienkowarstwowa

### Zaprawa tradycyjna (spoina 1–1,5 cm)

Do cegły ceramicznej, pustaków i silikatów klasycznych.

| Parametr | Wartość |
|---|---|
| Grubość spoiny | 10–15 mm |
| Zużycie | 25–35 kg/m² |
| Cena | 16–22 zł/25 kg |

**Przykłady**: Atlas ZM, Ceresit CM 11, Solbet Universal

### Zaprawa cienkowarstwowa (spoina 1–3 mm)

Wymagana przy betonie komórkowym (ytong, xella) i blokach FORMAT.

| Parametr | Wartość |
|---|---|
| Grubość spoiny | 1–3 mm |
| Zużycie | 2–4 kg/m² |
| Cena | 28–40 zł/25 kg |

### Oszczędność

Ściana 100 m² silikat FORMAT:
- Tradycyjna: 120 worków × 18 zł = **2 160 zł**
- Cienkowarstwowa: 12 worków × 34 zł = **408 zł**

Oszczędność: 1 752 zł + 2× szybszy murarz.

Dobór zaprawy do Twojego muru — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b021",
    slug: "porownanie-systemow-docieple-etics-2026",
    title: "Porównanie systemów ociepleń ETICS 2026 — Weber, Atlas, Ceresit, Baumit",
    excerpt: "Który system ETICS wybrać? Porównujemy parametry, ceny i gwarancje Webera, Atlasa, Ceresita i Baumitu.",
    category: "Ocieplenia",
    author: "Zespół Media Bud",
    date: "2026-06-07",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=800&q=80",
    tags: ["ETICS", "system ociepleń", "Weber", "Atlas", "Ceresit", "Baumit"],
    content: `## Porównanie systemów ETICS 2026

| System | Klej | Tynk | Gwarancja | Cena mat. 100 m² |
|---|---|---|---|---|
| Weber.therm | CT85 | Weber.pas Sil | 10 lat | 14 000–18 000 zł |
| Atlas Stopter | K-20 | Atlas Silco | 7 lat | 12 500–16 000 zł |
| Ceresit CT 85 | CT 85 | CT 75 Sil | 10 lat | 14 500–18 500 zł |
| Baumit StarTop | StarContact | SilikonTop | 10 lat | 15 000–19 500 zł |

### Rekomendacja

- **Cena**: Atlas Stopter + Silco
- **Gwarancja + jakość**: Weber.therm lub Ceresit
- **Minimalne brudzenie elewacji**: Baumit GranoporTop (efekt lotosowy)

Dobierzemy system do Twojego budynku — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b022",
    slug: "kleje-do-plytek-c1-c2-c2te-roznice",
    title: "Kleje do płytek C1, C2, C2TE — czym się różnią i kiedy co stosować?",
    excerpt: "Klasy klejów ceramicznych C1, C2, C2TE, S1, S2 — rozszyfruj oznaczenia i dobierz klej do łazienki lub tarasu.",
    category: "Kleje i fugi",
    author: "Zespół Media Bud",
    date: "2026-06-07",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    tags: ["klej do płytek", "C2TE", "ogrzewanie podłogowe", "taras"],
    content: `## Klasy klejów do płytek — EN 12004

| Klasa | Przyczepność | Zastosowanie |
|---|---|---|
| C1 | ≥ 0,5 N/mm² | Ściany wewnętrzne, suche |
| C2 | ≥ 1,0 N/mm² | Podłogi, łazienki, balkony |

### Modyfikatory

| Symbol | Znaczenie |
|---|---|
| T | Thixotropic — nie opada ze ścian |
| E | Extended open time ≥30 min |
| S1 | Odkształcalny 2,5–5 mm |
| S2 | Wysokoodkształcalny ≥5 mm |

### Praktyczny dobór

| Miejsce | Klej |
|---|---|
| Ściana łazienki | C1 T (Ceresit CM 11) |
| Podłoga łazienki | C2 T (Atlas Plus) |
| Ogrzewanie podłogowe | C2 TE S1 (Mapei Keraquick) |
| Taras/balkon | C2 TE S1 min. |
| Format >60×120 cm | C2 TE S2 (CM 17) |

Dobierzemy klej i fugę — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b023",
    slug: "papa-termozgrzewalna-rodzaje-zastosowania-2026",
    title: "Papa termozgrzewalna — rodzaje, parametry i zastosowania 2026",
    excerpt: "Papa SBS vs APP, podkładowa vs wierzchnia, grubość 4 vs 5,2 mm — przewodnik dla inwestorów i dekarzy.",
    category: "Dachy",
    author: "Zespół Media Bud",
    date: "2026-06-07",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    tags: ["papa termozgrzewalna", "SBS", "APP", "dach płaski"],
    content: `## SBS vs APP

| Cecha | SBS | APP |
|---|---|---|
| Elastyczność zimno | ★★★★ (do -25°C) | ★★ (do -15°C) |
| Odporność UV | ★★★ | ★★★★ |
| Odporność ciepło | ★★ | ★★★★ |
| Zastosowanie | Klimat zmienny, dachy skośne | Dachy płaskie, dużo słońca |

### Podkładowa vs wierzchnia

- **Podkładowa**: 3,0–4,2 mm, drobna posypka, warstwa 1
- **Wierzchnia**: 4,0–5,2 mm, gruby łupek, warstwa eksponowana

### Ceny (rolka 10 m²)

| Produkt | Grubość | Cena/rolka |
|---|---|---|
| Papa podkładowa SBS | 3,5 mm | 95–130 zł |
| Papa wierzchnia SBS łupek | 4,5 mm | 140–180 zł |
| Papa wierzchnia APP | 5,2 mm | 165–210 zł |

Dobierzemy system do Twojego dachu — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b024",
    slug: "styropian-podloga-na-gruncie-jakosc-grubosc",
    title: "Styropian pod podłogę na gruncie — jaką grubość wybrać w 2026?",
    excerpt: "EPS 100 czy EPS 200? Jaką grubość izolacji na podłogę na gruncie wybrać, żeby spełnić WT 2021?",
    category: "Izolacje",
    author: "Zespół Media Bud",
    date: "2026-06-07",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    tags: ["styropian podłogowy", "EPS 100", "EPS 200", "WT 2021"],
    content: `## Wymagania WT 2021

Minimalna izolacyjność podłogi na gruncie: **U ≤ 0,30 W/(m²K)**

Dla EPS λ=0,040 → minimalna grubość = 13 cm. Zalecana projektowa: **15–20 cm**.

### EPS 100 vs EPS 200

| Cecha | EPS 100 | EPS 200 |
|---|---|---|
| CS(10) | 100 kPa | 200 kPa |
| Przeznaczenie | Podłogi mieszkaniowe | Garaże, posadzki przemysłowe |
| Cena (10 cm) | 22–28 zł/m² | 30–40 zł/m² |

### Koszt dla domu 100 m²

| Wariant | Grubość | Koszt |
|---|---|---|
| Minimalny (EPS 100) | 12 cm | 2 640–3 360 zł |
| Standardowy (EPS 100) | 15 cm | 3 300–4 200 zł |
| Energooszczędny (EPS 100) | 20 cm | 4 400–5 600 zł |
| Pasywny (EPS 200) | 20 cm | 6 000–8 000 zł |

Wyliczymy ilości materiałów — **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b025",
    slug: "hurtownia-materialow-budowlanych-lublin-2026",
    title: "Hurtownia materiałów budowlanych Lublin — skład budowlany Media Bud",
    excerpt: "Gdzie kupić materiały budowlane hurtowo w Lublinie? Dlaczego lokalny skład budowlany jest lepszy niż market?",
    category: "Poradniki",
    author: "Zespół Media Bud",
    date: "2026-06-07",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?w=800&q=80",
    tags: ["hurtownia Lublin", "materiały budowlane Lublin", "skład budowlany", "ceny hurtowe"],
    content: `## Skład budowlany vs market

| Typ | Zalety | Wady |
|---|---|---|
| Markety (Leroy, OBI) | Długie godziny, zwroty | Ceny detaliczne, brak doradztwa tech. |
| Hurtownie B2B | Ceny netto, palety | Tylko firmy, minimum zamówienia |
| **Skład Media Bud** | Ceny hurtowe dla każdego, doradztwo, dostawa | — |

## Dlaczego Media Bud?

1. **Ceny hurtowe** bez NIP-u — każdy klient płaci jak firma
2. **Doradztwo techniczne** — znamy produkty z własnych realizacji
3. **Dostawa** na teren budowy — palety, big-bagi, ciężarówki
4. **Faktura VAT** — niezbędna do programu Czyste Powietrze

## Godziny otwarcia

| Dzień | Godziny |
|---|---|
| Pon–Pt | 7:00–16:00 |
| Sobota | 7:00–13:00 |

**Adres**: ul. Chemiczna 8d, 20-329 Lublin

Zadzwoń — **+48 533 553 344** | sprzedaz@mediabud.pl`
  },

  {
    id: 'b026',
    slug: 'budowa-szkieletowa-drewniana-poradnik-2026',
    title: 'Budownictwo szkieletowe drewniane — kompletny przewodnik 2026',
    excerpt: 'Dom szkieletowy można postawić w 3 miesiące. Wyjaśniamy technologię, materiały i koszty budowy szkieletowej w Polsce w 2026 roku.',
    category: 'Poradniki',
    author: 'Zespół Media Bud',
    date: '2026-05-10',
    readTime: 11,
    image: 'https://images.unsplash.com/photo-1558002038-1055e2dae1d7?w=800&q=80',
    tags: ['szkielet', 'dom drewniany', 'CLS', 'OSB', 'budowa szkieletowa', 'płyty'],
    faq: [
      { q: 'Ile kosztuje budowa domu szkieletowego 100 m² w 2026?', a: 'Koszt stanu surowego zamkniętego domu szkieletowego 100 m² to 150 000–220 000 zł (stan surowy zamknięty, bez wykończenia). Stan deweloperski to 280 000–380 000 zł. Technologia jest o 15–25% tańsza od murowanej przy porównywalnym standardzie energetycznym.' },
      { q: 'Czy dom szkieletowy jest trwały i ciepły?', a: 'Prawidłowo wykonany dom szkieletowy służy ponad 100 lat (domy w USA i Skandynawii mają 70–120 lat). Przy grubości ściany 20 cm (CLS 145 mm + wełna między słupami + docieplenie zewnętrzne) uzyskuje się U ≤ 0,15 W/(m²K), czyli lepiej niż standardowa ściana murowana 20 cm.' },
      { q: 'Jakie płyty OSB stosuje się w konstrukcji szkieletowej?', a: 'Do poszycia ścian i dachów stosuje się OSB/3 (wilgociochronna, klasa E1) o grubości 12–18 mm. Jako poszycie nośne ściany szkieletowej wystarcza OSB/3 12 mm. Do podłóg rekomendowane jest OSB/4 (podwyższona wytrzymałość) 18–22 mm z klejem na złączach.' },
      { q: 'Co to jest CLS i jakie wymiary się stosuje?', a: 'CLS (Canadian Lumber Standard) to strunobetonowe drewno konstrukcyjne o zaokrąglonych krawędziach. Standardowe wymiary słupów: 38×89 mm (ściana 89 mm), 38×140 mm (ściana 140 mm), 38×184 mm (ściana 184 mm). W Polsce dostępne w klasach C16 i C24 (C24 polecana do ścian nośnych).' },
      { q: 'Czy budowa szkieletowa wymaga pozwolenia na budowę?', a: 'Domy do 70 m² PZP mogą być budowane na zgłoszenie (bez pozwolenia) od 2022 roku. Domy powyżej 70 m² wymagają pozwolenia na budowę niezależnie od technologii. Technologia szkieletowa nie zmienia procedur administracyjnych — decyduje powierzchnia i przeznaczenie.' },
    ],
    content: `## Dlaczego budownictwo szkieletowe zyskuje popularność w Polsce?

W Polsce co roku przybywa kilka tysięcy domów szkieletowych. Technologia znana od dekad w Skandynawii i Ameryce Północnej przekonuje coraz więcej polskich inwestorów przede wszystkim szybkością budowy i doskonałą izolacyjnością cieplną.

## Technologia szkieletowa — jak to działa?

Konstrukcja nośna budynku opiera się na słupach drewnianych (CLS) rozmieszczonych co 40 lub 60 cm. Przestrzeń między słupami wypełnia wełna mineralna lub celuloza. Całość pokryta jest poszyciem z płyt OSB, które usztywnia konstrukcję i stanowi warstwę nośną pod wykończenie.

### Warstwy ściany zewnętrznej od środka:

1. Płyta GK lub OSB wewnętrzna
2. Folia paroizolacyjna
3. Wełna mineralna między słupami CLS (89–184 mm)
4. Poszycie OSB/3
5. Folia wiatroizolacyjna (memrana)
6. Szczelina wentylacyjna (opcjonalnie)
7. Docieplenie zewnętrzne XPS/EPS lub fasada wentylowana

## Materiały do budowy domu szkieletowego

### Drewno konstrukcyjne CLS

Drewno CLS musi być klasyfikowane wytrzymałościowo — minimalna klasa C16 dla elementów nienośnych, C24 dla słupów nośnych. Wilgotność drewna w momencie wbudowania: max 18–20%.

### Płyty OSB

| Typ | Zastosowanie | Grubość |
|-----|-------------|---------|
| OSB/3 | Poszycie ścian, dachy | 12–15 mm |
| OSB/3 | Podłogi (jedno piętro) | 18 mm |
| OSB/4 | Podłogi nośne | 22–25 mm |

### Wełna mineralna i celuloza

Wełna skalna (Rockwool Flexi, Knauf Insulation) lub szklana (Isover KnaufInsulation) o gęstości 35–50 kg/m³ do wypełnienia słupów. Celuloza wtryskiwana — możliwość wypełnienia istniejących ścian bez rozkucia.

## Koszty i harmonogram budowy

Budowa stanu surowego zamkniętego 100 m² trwa 8–14 tygodni (3–4 miesiące z przerwami technologicznymi). Dla porównania, murowany stan surowy to 12–18 miesięcy.

## Dlaczego warto kupować materiały w Media Bud?

W naszym składzie znajdziesz pełen asortyment do budowy szkieletowej: CLS, płyty OSB, wełna Rockwool i Knauf Insulation, membrany dachowe Nexler, folie paroizolacyjne, wkręty i łączniki. Nasi doradcy pomogą zaplanować zestawienie materiałów dla Twojego projektu.

Zadzwoń: **+48 533 553 344** | ul. Chemiczna 8d, 20-329 Lublin`
  },
  {
    id: 'b027',
    slug: 'gres-porcelanowy-rodzaje-dobor-montaz-2026',
    title: 'Gres porcelanowy — rodzaje, dobór i montaż. Przewodnik 2026',
    excerpt: 'Gres porcelanowy to standard w nowoczesnym budownictwie. Porównujemy typy, parametry techniczne i polecane marki na 2026 rok.',
    category: 'Wykończenia',
    author: 'Zespół Media Bud',
    date: '2026-05-15',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1523413307857-ef24c53571ae?w=800&q=80',
    tags: ['gres', 'płytki', 'gres porcelanowy', 'podłogi', 'łazienka', 'montaż płytek'],
    faq: [
      { q: 'Czym różni się gres porcelanowy od zwykłej glazury?', a: 'Gres porcelanowy jest spiekany w temperaturze 1250°C, co daje nasiąkliwość < 0,5% (norma BIa). Glazura (kafelki ceramiczne) ma nasiąkliwość 3–6%, jest mniej odporna na ścieranie i temperaturę. Gres nadaje się na zewnątrz i pod ogrzewanie podłogowe, glazura — wyłącznie wewnątrz.' },
      { q: 'Jaki gres wybrać na taras zewnętrzny?', a: 'Na taras zewnętrzny stosuje się gres mrozoodporny BIa (nasiąkliwość < 0,5%) z klasą antypoślizgowości minimum R10 (pochylnie R11). Polecane: Cerrad Granit, Cersanit Marengo, Paradyż — grubość min. 20 mm (2 cm) dla tarasów pieszych. Konieczne jest użycie kleju mrozoodpornego (C2TE) i elastycznej fugi.' },
      { q: 'Jak kleić gres wielkoformatowy 120x60 i większy?', a: 'Gres wielkoformatowy wymaga kleju odkształcalnego C2S1 lub C2S2 (np. Ceresit CM 17, Weber.set speed). Metoda back-buttering: nakłada się klej zarówno na podłoże, jak i na tylną stronę płytki (min. 95% pokrycia). Podłoże musi być równe (odchyłka max 2mm/2m) i stabilne.' },
      { q: 'Ile płytek wielkoformatowych potrzebuję na pokój 25 m²?', a: 'Na 25 m² podłogi zamawiaj 27–28 m² płytek (10–12% zapas na docinki). Przy formatach 120x60 i układaniu pod kątem 45° — zapas zwiększ do 15%. Zawsze zamawiaj całą partię z jednej serii (ten sam numer barwny na opakowaniu = jednolity odcień kolorystyczny).' },
      { q: 'Czy gres można układać na ogrzewanie podłogowe?', a: 'Tak — gres porcelanowy ma doskonałą przewodność cieplną (λ > 1,0 W/m·K) i jest idealny pod ogrzewanie podłogowe. Warunek: klej do ogrzewania podłogowego (C2TE — odkształcalny, szybkowiążący). Temperatura podłogi nie może przekraczać 28°C przy grubości płytki < 10 mm.' },
    ],
    content: `## Co to jest gres porcelanowy?

Gres porcelanowy to ceramika spiekana w bardzo wysokiej temperaturze (1200–1280°C) z mieszaniny kaolinu, skalenia i kwarcu. Rezultatem jest materiał o nasiąkliwości < 0,5% i wytrzymałości na ściskanie przekraczającej 1200 kN/m².

## Rodzaje gresu porcelanowego

### Gres polerowany (lapato)
Powierzchnia szlifowana i polerowana — efekt lustrzany. Wadą jest niska klasa antypoślizgowości (R9). Stosuj tylko w suchych pomieszczeniach wewnętrznych (salon, korytarz).

### Gres matowy i satynowy
Najczęściej stosowany. Klasa antypoślizgowości R10–R11. Idealne do łazienek, kuchni, przedpokoi i tarasów.

### Gres rektyfikowany vs nierektyfikowany

| Parametr | Rektyfikowany | Nierektyfikowany |
|----------|--------------|-----------------|
| Tolerancja wymiaru | ±0,3 mm | ±1,5 mm |
| Minimalna spoina | 1,5–2 mm | 3–5 mm |
| Wygląd | bardziej elegancki | klasyczny |
| Cena | wyższa | niższa |

### Gres imitujący beton, kamień i drewno
Nowoczesne technologie druku cyfrowego (HD Inkjet) umożliwiają wierne odwzorowanie tekstur. Popularne serie: Cerrad Softcement, Paradyż Authority, Cersanit Urbanwood.

## Parametry techniczne — jak czytać oznaczenia?

- **Klasa ścieralności PEI 0–5**: PEI 3 — pomieszczenia mieszkalne, PEI 4 — kuchnie/korytarze, PEI 5 — garaże i sklepy
- **Klasa antypoślizgowości R9–R13**: R9 — sucho, R10 — mokro, R11 — taras/basen, R12/13 — przemysł
- **Nasiąkliwość BIa (< 0,5%)**: warunek dla zastosowań zewnętrznych i mrozoodpornych

## Polecane marki 2026

Weber (kleje i fugi), Ceresit CM 17 (klej do wielkich formatów), Mapei Ultracolor Plus (fuga premium), Atlas Keramal (klej C2TE) — wszystkie dostępne w Media Bud.

## Montaż krok po kroku

1. Przygotowanie podłoża (wyrównanie, gruntowanie)
2. Wyznaczenie osi układania i próbne ułożenie bez kleju
3. Naniesienie kleju na podłoże i tylną stronę płytki
4. Układanie z krzyżykami/szczelinami 2–3 mm
5. Fugowanie po 24–48h (sprawdź kart produktu kleju)
6. Impregnacja fugi i płytek (opcjonalnie)

Potrzebujesz doradztwa w doborze materiałów? Zadzwoń: **+48 533 553 344** | Media Bud, ul. Chemiczna 8d Lublin`
  },
  {
    id: 'b028',
    slug: 'farby-elewacyjne-silikonowe-silikatowe-akrylowe-porownanie-2026',
    title: 'Farby elewacyjne: silikonowe vs silikatowe vs akrylowe — porównanie 2026',
    excerpt: 'Wybór farby elewacyjnej ma wpływ na trwałość i wygląd budynku przez 10–15 lat. Porównujemy trzy główne typy pod względem właściwości i ceny.',
    category: 'Farby i tynki',
    author: 'Zespół Media Bud',
    date: '2026-05-20',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&q=80',
    tags: ['farba elewacyjna', 'silikonowa', 'silikatowa', 'akrylowa', 'elewacja', 'malowanie'],
    faq: [
      { q: 'Jaka farba elewacyjna jest najlepsza na styropian (system ETICS)?', a: 'Na styropian w systemie ETICS stosuje się wyłącznie farby silikonowe (np. Baumit SilikonTop, Weber.ton Sil, Ceresit CT 48) lub silikatowe. Farby akrylowe bez grafitu są dopuszczalne, ale mają wyższy współczynnik absorpcji ciepła (ciemne kolory). Nigdy nie stosuj farb z agresywnymi rozpuszczalnikami — niszczą styropian.' },
      { q: 'Ile kosztuje malowanie elewacji farbą silikonową na 200 m²?', a: 'Wydajność farby silikonowej to 5–8 m²/l. Na 200 m² przy 2 warstwach potrzebujesz ok. 50–80 litrów = 3 000–6 000 zł (farba). Koszt robocizny to 15–25 zł/m², czyli 3 000–5 000 zł. Łącznie: 6 000–11 000 zł za kompletne malowanie elewacji 200 m².' },
      { q: 'Czym różni się farba silikatowa od silikonowej?', a: 'Farba silikatowa (krzemianowa) ma spoiwo mineralne — szkło wodne potasowe. Jest idealnie paroprzepuszczalna (sd < 0,01 m) i zasadowa (pH 11–13), co hamuje wzrost glonów. Wadą jest ograniczona paleta kolorów i konieczność zastosowania specjalnych gruntów. Farba silikonowa jest bardziej elastyczna, dostępna w szerokim zakresie kolorów.' },
      { q: 'Jak prawidłowo malować elewację — kiedy i w jakiej temperaturze?', a: 'Malowanie elewacji: temperatura powietrza i podłoża 5–35°C. Unikaj pracy w pełnym słońcu (szybkie suszenie = pęknięcia) i przed zapowiedzianym deszczem (min. 24h bez opadów po nałożeniu). Wilgotność podłoża maks. 4%. Pierwsza warstwa rozcieńczona 10% wodą, druga bez rozcieńczania.' },
      { q: 'Czy przed malowaniem elewacji trzeba używać gruntu?', a: 'Tak — grunt jest obowiązkowy. Wyrównuje chłonność podłoża, poprawia przyczepność farby i zmniejsza jej zużycie o 20–30%. Do tynków mineralnych: grunt akrylowy (np. Ceresit CT 17, Weber.prim). Do tynków silikatowych: grunt silikatowy o tym samym kolorze co tynk. Czas suszenia gruntu: 2–4h przed nałożeniem farby.' },
    ],
    content: `## Dlaczego wybór farby elewacyjnej jest tak ważny?

Farba elewacyjna to ostatnia linia ochrony budynku przed warunkami atmosferycznymi. Prawidłowo dobrana chroni tynk i izolację przez 10–15 lat. Błędny wybór może prowadzić do powstawania glonów, odpadania powłoki i konieczności kosztownego przemalowania już po 3–5 latach.

## Trzy główne typy farb elewacyjnych

### Farba silikonowa (polisiloksanowa)

Spoiwo: żywica silikonowa. Najwyższa kategoria środków do malowania elewacji.

**Zalety:**
- Paroprzepuszczalność: sd = 0,01–0,10 m (doskonała)
- Hydrofobowość — woda spływa, nie wnika
- Elastyczność — nie pęka przy osiadaniu budynku
- Odporność na UV i temperatury -40°C do +80°C
- Łatwy do czyszczenia efekt samoczyszczenia (Lotus)
- Szeroka paleta kolorów (NCS, RAL)

**Wady:** cena wyższa o 30–50% od akrylowej

**Przykłady:** Baumit SilikonTop, Weber.ton Sil, Ceresit CT 48, Mapei Elastocolor

### Farba silikatowa (krzemianowa)

Spoiwo: szkło wodne potasowe. Farba mineralna.

| Parametr | Farba silikatowa | Farba silikonowa |
|----------|-----------------|-----------------|
| Paroprzepuszczalność | Najwyższa (sd<0.01m) | Bardzo wysoka (sd<0.1m) |
| Paleta kolorów | Ograniczona (jasne) | Pełna (NCS/RAL) |
| Odporność na algi | Bardzo wysoka (pH 12) | Wysoka |
| Zastosowanie na ETICS | Wełna mineralna | Styropian i wełna |

### Farba akrylowa

Spoiwo: dyspersja akrylowa. Standardowy wybór dla budżetowych zastosowań.

**Zastosowania:** remonty starych elewacji mineralnych, budynki niekrytyczne, wewnętrzne powierzchnie zewnętrzne osłonięte.
**Unikaj:** na nowych systemach ETICS ze styropianem (ciemne kolory mogą nagrzewać styropian).

## Tabela porównawcza

| Właściwość | Akrylowa | Silikonowa | Silikatowa |
|------------|---------|-----------|-----------|
| Cena (l) | 15–25 zł | 35–60 zł | 30–55 zł |
| Trwałość | 5–8 lat | 12–20 lat | 15–25 lat |
| Paroprzepuszczalność | Średnia | Bardzo wysoka | Najwyższa |
| Elastyczność | Dobra | Bardzo dobra | Słaba |
| Paleta kolorów | Pełna | Pełna | Ograniczona |

## Rekomendacja Media Bud

Do systemów ETICS: **farba silikonowa** (Baumit, Weber, Ceresit).
Na stare elewacje mineralne bez ETICS: silikatowa lub akrylowa.
Na fundamenty i cokół: farba gruntująca + farba odporność na kapilarne podciąganie wilgoci.

Potrzebujesz doboru farby do konkretnej elewacji? Zadzwoń: **+48 533 553 344** | Media Bud Lublin`
  },
  {
    id: 'b029',
    slug: 'kleje-do-plytek-c1-c2-c2te-kiedy-ktory-stosowac',
    title: 'Kleje do płytek C1, C2, C2TE — kiedy i który stosować? Przewodnik',
    excerpt: 'Norma EN 12004 dzieli kleje do płytek na klasy C1, C2, S1, S2, E, T. Tłumaczymy co oznaczają i jak dobrać klej do konkretnego zastosowania.',
    category: 'Chemia budowlana',
    author: 'Zespół Media Bud',
    date: '2026-05-25',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
    tags: ['klej do płytek', 'C1', 'C2', 'C2TE', 'norma EN 12004', 'płytki', 'gres'],
    faq: [
      { q: 'Co oznacza klasa C1 i C2 przy kleju do płytek?', a: 'C1 i C2 to klasy wytrzymałości na rozciąganie wg normy EN 12004. C1 — wytrzymałość ≥ 0,5 N/mm² (klej podstawowy do ceramiki wewnątrz). C2 — wytrzymałość ≥ 1,0 N/mm² (klej ulepszony do gresu, formatów > 30x30, podłoży trudnych). Różnica: C2 ma dwukrotnie wyższą przyczepność.' },
      { q: 'Kiedy obowiązkowo trzeba stosować klej C2TE?', a: 'Klej C2TE (odkształcalny S1, szybkowiążący T) jest obowiązkowy przy: ogrzewaniu podłogowym, tarasach zewnętrznych i balkonach, płytkach wielkoformatowych > 60x60 cm, okładzinach basenowych, gresu mrozoodpornego na zewnątrz. Klasy S1/S2 (odkształcalność) chronią przed pęknięciami przy ruchach termicznych podłoża.' },
      { q: 'Ile kleju do płytek potrzebuję na 30 m² łazienki?', a: 'Przy metodzie standard (podłoże tylko): 4–6 kg/m² = 120–180 kg kleju. Przy metodzie back-buttering (podłoże + płytka): 6–9 kg/m² = 180–270 kg kleju. Na podłogi wymagające back-buttering (gres > 60x60) zamów przynajmniej 200 kg kleju C2 na 30 m².' },
      { q: 'Czym różni się klej szybkowiążący (T) od standardowego?', a: 'Klej szybkowiążący (oznaczenie T, np. Ceresit CM 11 Fast, Weber.set speed) osiąga pełną wytrzymałość w 3–6h zamiast 24h. Umożliwia fugowanie i użytkowanie podłogi już po kilku godzinach. Stosuj przy ograniczonym czasie pracy i ogrzewaniu podłogowym (skrócony czas postoju ogrzewania).' },
      { q: 'Czy klej cementowy C2TE nadaje się do ogrzewania podłogowego?', a: 'Tak — klej C2TE jest przeznaczony m.in. do ogrzewania podłogowego. Odkształcalność klasy S1 (> 2,5 mm) lub S2 (> 5 mm) absorbuje naprężenia termiczne powstające przy rozgrzewaniu/studzeniu podłogi. Przed układaniem płytek przy ogrzewaniu podłogowym wymagane jest przeprowadzenie cyklu grzewczego podłogi (zazwyczaj 7–14 dni).' },
    ],
    content: `## Norma EN 12004 — jak klasyfikowane są kleje do płytek?

Europejska norma PN-EN 12004:2017 wprowadza jednolity system klasyfikacji klejów cementowych (C), dyspersyjnych (D) i żywicznych (R). W Polsce najczęściej stosowane są kleje cementowe: C1 i C2.

## Klasyfikacja klejów cementowych C

### Klasa wytrzymałości
- **C1** — wytrzymałość na rozciąganie ≥ 0,5 N/mm² (po 28 dniach)
- **C2** — wytrzymałość na rozciąganie ≥ 1,0 N/mm² — klej ulepszony

### Dodatkowe oznaczenia
- **F (Fast)** — szybkowiążący: pełna wytrzymałość w 6h
- **T (Thixotropic)** — przeciwspływny: nie spływa na ścianie (uwaga: w EN 12004 T to slow-slip, ale praktycznie oznacza zarówno antyspływność jak i szybkość)
- **E (Extended open time)** — wydłużony czas otwarcia (> 30 minut)
- **S1** — odkształcalny: > 2,5 mm ugięcia
- **S2** — wysoko odkształcalny: > 5,0 mm ugięcia

## Tabela doboru kleju do zastosowania

| Zastosowanie | Minimalny klej | Przykłady produktów |
|-------------|---------------|-------------------|
| Płytki ceramiczne wnętrze, podłoga | C1 | Ceresit CM 11, Atlas Keramax |
| Gres wewnętrzny do 60x60 | C1E lub C2 | Ceresit CM 14, Weber.set comfort |
| Ogrzewanie podłogowe | C2TE S1 | Ceresit CM 17, Mapei Ultraflex 2 |
| Gres > 60x60 (wielkoformatowy) | C2S1 lub C2S2 | Ceresit CM 17, Weber.set speed |
| Taras i balkon zewnętrzny | C2TE S1 mrozoodporny | Ceresit CM 16, Atlas Stopter K-2 |
| Basen kryty | C2TE S1 + EP fuga | Mapei Kerabond T, Laticrete 317 |
| Elewacja (płytki fasadowe) | C2E S1 | Ceresit CM 16, Weber.set facade |

## Jak czytać oznaczenie na opakowaniu?

Przykład: **Ceresit CM 17 — C2TE S1**
- C2 = ulepszony, wytrzymałość ≥ 1,0 N/mm²
- T = szybkowiążący / przeciwspływny
- E = wydłużony czas otwarcia (≥ 30 min)
- S1 = odkształcalny (> 2,5 mm)

## Metoda aplikacji — standard vs back-buttering

**Metoda standardowa** (podłoże): klej na podłoże, płytka wciśnięta.
Wymagane pokrycie: 65% (wewnątrz suche), 80% (wilgotne), 95% (mokre + zewnętrz + wielkoformatowe).

**Back-buttering** (obie strony): klej na podłoże + warstwa na tył płytki.
Obowiązkowy przy: formatach > 60x60, gresu gęstym (nasiąkliwość < 0,5%), tarasach zewnętrznych.

W Media Bud oferujemy pełen asortyment klejów Ceresit, Weber, Atlas, Mapei i Sika. Pomożemy dobrać optymalny klej do Twojego zastosowania — zadzwoń: **+48 533 553 344**`
  },
  {
    id: 'b030',
    slug: 'styropian-xps-vs-eps-roznice-zastosowania-2026',
    title: 'Styropian XPS vs EPS — różnice, zastosowania i grubości 2026',
    excerpt: 'EPS i XPS to dwa różne materiały izolacyjne mimo podobnej nazwy. Wyjaśniamy kiedy stosować każdy z nich i dlaczego mylenie ich to kosztowny błąd.',
    category: 'Izolacje',
    author: 'Zespół Media Bud',
    date: '2026-06-01',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1625577815636-d7a61b583799?w=800&q=80',
    tags: ['XPS', 'EPS', 'styropian', 'izolacja', 'fundamenty', 'ocieplenie'],
    faq: [
      { q: 'Czym różni się XPS od EPS i skąd wziąć pewność, że kupuję odpowiedni?', a: 'EPS (biały lub szary styropian) ma strukturę spienioną — kulki widoczne na przekroju. XPS (np. Ravatherm, Nexler, Styrodur) ma strukturę wytłaczaną — przekrój jest jednorodny, gładki. XPS jest zawsze kolorowy (różowy, niebieski, zielony) i twardszy w dotyku. Na opakowaniu musi być oznaczenie XPS i norma EN 13164.' },
      { q: 'Czy XPS można stosować na ściany zewnętrzne zamiast EPS?', a: 'XPS na ściany zewnętrzne ETICS jest niezalecany — ma gładką powierzchnię o niskiej przyczepności kleju. Wymaga gruntowania i frezowania. EPS fasadowy (np. Swisspor EPS 70, Yetico Lambda) jest znacznie tańszy i w pełni spełnia wymagania systemów ociepleń. XPS do ścian stosuje się wyłącznie poniżej terenu (ściana fundamentowa) lub na dachu odwróconym.' },
      { q: 'Jaka grubość XPS na ławie fundamentowej?', a: 'Izolacja ławy fundamentowej XPS (pionowo) powinna mieć grubość min. 5 cm, a izolacja pozioma pod posadzką na gruncie min. 10–12 cm (XPS) lub 15 cm (EPS 100). Przy domach pasywnych: 20–25 cm. XPS klasy CS(10)300 lub wyżej pod posadzką przemysłową (magazyn, garaż).' },
      { q: 'Czy EPS nasiąka wodą i czy to wada przy fundamentach?', a: 'EPS nasiąka wodą do 4–6% objętości po długim kontakcie — to zbyt dużo jak na zastosowania poniżej terenu. XPS ma nasiąkliwość < 0,3% (zamknięte komórki) — stąd do fundamentów, dachów odwróconych i tarasów zawsze wybieramy XPS. Powyżej terenu, przy prawidłowej hydroizolacji, EPS jest w pełni wystarczający.' },
      { q: 'Ile kosztuje XPS vs EPS na ocieplenie 100 m² fundamentów?', a: 'XPS 10 cm klasy CS(10)200 to ok. 50–65 zł/m², czyli 5 000–6 500 zł na 100 m². EPS 100 15 cm na podłogę to ok. 22–30 zł/m², czyli 2 200–3 000 zł. Różnica ceny jest uzasadniona wymaganiami technicznymi: XPS pod posadzką garażu, EPS pod podłogą mieszkalną to prawidłowy wybór.' },
    ],
    content: `## EPS vs XPS — skąd to zamieszanie?

Obie nazwy zawierają słowo polistyren — stąd powszechne mylenie. EPS to polistyren ekspandowany (spieniony), XPS to polistyren ekstrudowany (wytłaczany). Inna technologia produkcji = całkowicie inne właściwości użytkowe.

## Czym jest EPS (Expanded Polystyrene)?

EPS produkowany jest przez spienienie granulatu polistyrenowego za pomocą pary wodnej. W przekroju widoczne są drobne kulki spieczone razem. Barwa: biała lub szara (grafitowa), strukturę porów otwartych.

**Typowe oznaczenia:**
- EPS 70 — fasada, ściany zewnętrzne ETICS
- EPS 80 — fasada, grubości 15–25 cm
- EPS 100 — podłogi, stropodachy (lepsza odporność na ściskanie)
- EPS 200 — podłogi przemysłowe, obciążone

## Czym jest XPS (Extruded Polystyrene)?

XPS produkowany jest przez wytłaczanie (ekstruzję) stopionego polistyrenu z czynnikiem spieniającym. Powstaje material jednorodny, z zamkniętymi porami. Barwa: różowa, niebieska, zielona, żółta (zależnie od producenta).

| Właściwość | EPS | XPS |
|-----------|-----|-----|
| Nasiąkliwość | 4–6% | < 0,3% |
| λ typowe | 0,033–0,040 W/(m·K) | 0,030–0,035 W/(m·K) |
| Odporność na ściskanie | 70–200 kPa | 200–700 kPa |
| Cena (m²/10cm) | 15–22 zł | 40–65 zł |
| Kolor | biały / szary | różowy / niebieski |

## Gdzie stosować każdy materiał?

### Stosuj EPS:
- Ocieplenie ścian zewnętrznych ETICS (EPS 70/80)
- Stropy między kondygnacjami
- Dach skośny (między krokwiami nie; pod krokwiami tak)
- Podłoga na gruncie w pomieszczeniach mieszkalnych (EPS 100)

### Stosuj XPS:
- Ocieplenie fundamentów (pionowo i poziomo poniżej terenu)
- Dach odwrócony (XPS nad papą) ← kluczowe zastosowanie
- Tarasy i balkony z drenażem
- Podłogi garażu, magazynu, podjazdów (duże obciążenia)
- Cokoły budynków przy gruncie

## Najczęstszy błąd: EPS poniżej terenu

EPS przy fundamentach i poniżej terenu nasiąka wodą w ciągu 10–15 lat, tracąc 30–40% właściwości izolacyjnych. Zawsze stosuj XPS w strefach kontaktu z gruntem!

W Media Bud oferujemy kompletny asortyment EPS i XPS: Swisspor, Styropmin, Ravatherm XPS, Nexler XPS. Nasi doradcy dobiorą właściwy produkt dla Twojego zastosowania — zadzwoń: **+48 533 553 344**`
  },
  {
    id: 'b031',
    slug: 'fundamenty-obliczenia-wylewka-izolacja-poradnik',
    title: 'Fundamenty — obliczenia, wylewka i izolacja. Kompletny poradnik budowlany',
    excerpt: 'Fundamenty to najważniejszy element budynku. Błędy przy ich wykonaniu kosztują dziesiątki tysięcy złotych napraw. Sprawdź jak prawidłowo zaplanować, wykonać i zaizolować fundamenty.',
    category: 'Poradniki',
    author: 'Zespół Media Bud',
    date: '2026-06-05',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80',
    tags: ['fundamenty', 'ława fundamentowa', 'izolacja fundamentów', 'hydroizolacja', 'wylewka', 'zbrojenie'],
    faq: [
      { q: 'Ile kosztują fundamenty domu 100 m² w 2026?', a: 'Koszt fundamentów (ławy fundamentowe + ściany fundamentowe + izolacja + wylewka) dla domu 100 m² to 20 000–45 000 zł w zależności od gruntu i standardu. Sam beton i zbrojenie to 8 000–15 000 zł, izolacja (XPS + papa + grunt) 4 000–8 000 zł, wylewka posadzki 5 000–12 000 zł. Robocizna: 15 000–25 000 zł.' },
      { q: 'Jaka izolacja na ławy fundamentowe i ściany piwnic?', a: 'Ławy fundamentowe i ściany piwnic izoluje się od zewnątrz: primer bitumiczny (np. Ceresit BT 11) + folia kubełkowa lub 2 warstwy papy samoprzylepnej + XPS 10–15 cm. Od wewnątrz — grunt mineralny + tynk renowacyjny przy istniejących budynkach. Drenarz (drenaż opaskowy) obowiązkowy przy poziomie wody gruntowej poniżej 1,5 m od posadzki.' },
      { q: 'Jak obliczyć głębokość posadowienia fundamentów?', a: 'Głębokość posadowienia musi być poniżej strefy przemarzania gruntu. W Polsce: Lublin, Warszawa — 1,0 m, Białystok, Suwałki — 1,4 m, Zakopane — 1,6 m. Do tego dodaj 10–15 cm (beton podkładowy). Przy gruntach słabonośnych (torfy, namuły) — fundamenty głębsze lub pale/studnie.' },
      { q: 'Czy wylewka betonowa na gruncie musi być zbrojona?', a: 'Wylewka podposadzkowa (podkład betonowy) grubości 10–15 cm na gruncie zazwyczaj nie wymaga zbrojenia stalowego przy obciążeniach mieszkalnych. Przy garażach, magazynach lub słabym gruncie stosuje się siatkę stalową fi 6 co 15x15 cm lub siatkę zgrzewaną. Zbrojenie obowiązkowe przy ogrzewaniu podłogowym (rura w betonie).' },
      { q: 'Jaki beton do fundamentów — C16/20 czy C20/25?', a: 'Ławy fundamentowe: minimum C16/20 (dawniej B20). Dla agresywnych gruntów (siarczany, wysoka wilgotność) — C20/25 lub C25/30 z cementem CEM III. Do betonu podkładowego pod ławami: C8/10 (chudy beton, 15 cm). Beton napowietrzony do fundamentów narażonych na zamrażanie-rozmrażanie.' },
    ],
    content: `## Dlaczego fundamenty są krytyczne?

Fundamenty przenoszą ciężar całego budynku na grunt. Osiadanie, pęknięcia i wilgoć wynikające z błędów fundamentowych to najdroższe naprawy w budownictwie — kosztują 30 000–150 000 zł i często wymagają tymczasowego opuszczenia budynku.

## Rodzaje fundamentów

### Ławy fundamentowe (najczęstsze)
Stosowane dla gruntów nośnych (piasek, żwir, glina zwarta). Szerokość ławy = 2x grubość ściany + 20 cm (min. 60 cm). Głębokość: poniżej strefy przemarzania (Lublin: min. 1,0 m).

### Płyta fundamentowa
Stosowana przy gruntach o niskiej nośności lub gdy poziom wody gruntowej jest wysoki. Całkowita płyta żelbetowa 25–35 cm grubości z izolacją termiczną. Koszt wyższy, ale eliminuje problem nierównomiernego osiadania.

### Pale i studnie (specjalne)
Przy bardzo słabych gruntach (namuły, torfy, grunty nasypowe) — pale wiercone do warstw nośnych.

## Materiały do izolacji fundamentów

### Hydroizolacja (ochrona przeciwwilgociowa)

**Izolacja lekka** (bez parcia wody):
- Primer bitumiczny (Ceresit BT 11, Izobud) — gruntowanie betonu
- Masa bitumiczna (1–2 warstwy) lub papa samoprzylepna

**Izolacja ciężka** (parcie wody, poziom WG < 0,5m):
- 2 warstwy papy termozgrzewalnej P4/P5 + folia kubełkowa

### Izolacja termiczna

Na ścianach fundamentowych od zewnątrz: XPS 5–12 cm (Ravatherm, Nexler XPS).
Pod posadzką na gruncie: XPS 10–15 cm lub EPS 100 15–20 cm.

| Materiał | λ [W/m·K] | Odporność na wodę | Odporność na ściskanie |
|---------|----------|-------------------|----------------------|
| XPS 10 cm | 0,033 | Bardzo wysoka | 200–500 kPa |
| EPS 100 15 cm | 0,040 | Niska (niezalecane) | 100 kPa |

## Kolejność robót fundamentowych

1. Wykopy i niwelacja
2. Beton podkładowy C8/10 (10–15 cm) + folia PE 0,2 mm
3. Zbrojenie ław (stal A-III fi12–16, strzemiona fi8)
4. Betonowanie ław (C16/20 lub C20/25)
5. Murowanie lub betonowanie ścian fundamentowych
6. Primer bitumiczny + izolacja przeciwwilgociowa
7. XPS pionowo na ścianie od zewnątrz
8. Drenaż opaskowy (rura drenarsa Ø100–160 mm) + otulina żwirowa
9. Zasypanie wykopów z zagęszczeniem warstwami 20 cm
10. XPS poziomo pod posadzką + folia PE
11. Zbrojenie siatką + wylewka betonowa C16/20 (10–15 cm)

## Kontrola jakości — co sprawdzić przed zasypaniem?

Przed zasypaniem wykopów koniecznie: sprawdź szczelność hydroizolacji (brak uszkodzeń mechanicznych), sfotografuj wszystkie warstwy, sprawdź grubości XPS i prawidłowość połączeń.

W Media Bud oferujemy wszystkie materiały do izolacji fundamentów: primer bitumiczny, masy bitumiczne, papy samoprzylepne, XPS Ravatherm i Nexler, folie kubełkowe. Zadzwoń: **+48 533 553 344** | ul. Chemiczna 8d, Lublin`
  },
  {
    id: "b032",
    slug: "ogrzewanie-podlogowe-rodzaje-koszty-materialy-2026",
    title: "Ogrzewanie podłogowe — rodzaje, koszty i materiały 2026",
    excerpt: "Ogrzewanie podłogowe to komfort cieplny i oszczędność energii. Porównujemy systemy wodne i elektryczne, koszty i dobór materiałów.",
    category: "Instalacje",
    author: "Zespół Media Bud",
    date: "2026-06-10",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800&q=80",
    tags: ["ogrzewanie podłogowe", "UFH", "wodne", "elektryczne", "jastrich", "wylewka"],
    faq: [
      { q: "Czy ogrzewanie podłogowe nadaje się do remontu bez zrywania podłogi?", a: "Tak — systemy suche (maty grzewcze elektryczne lub maty wodne slim 12–20 mm) instaluje się bez wylewki. Mata elektryczna pod płytki: grubość 3–4 mm. System wodny suchy ok. 20 mm. Idealny do renowacji bez podnoszenia poziomu podłogi o więcej niż 2 cm." },
      { q: "Ile kosztuje ogrzewanie podłogowe wodne na 50 m²?", a: "Materiały: rury PEX/PERT 16 mm (150–200 mb) 400–600 zł, izolacja EPS 100 5 cm 500–700 zł, rozdzielacz 400–800 zł, jastrich 1 500–2 500 zł. Razem materiały: 3 000–5 000 zł. Robocizna 30–50 zł/m². Łącznie: 4 500–7 500 zł." },
      { q: "Jaki klej stosować do płytek nad ogrzewaniem podłogowym?", a: "Obowiązkowo klej odkształcalny C2TE (Ceresit CM 17, Weber.set speed, Mapei Ultraflex 2). Klasa S1 absorbuje naprężenia termiczne. Wylewkę nagrzewamy cyklicznie 7–14 dni przed układaniem płytek." },
      { q: "Ile czasu po zalaniu wylewki można włączyć ogrzewanie podłogowe?", a: "Wylewka cementowa: pierwsze nagrzewanie po min. 28 dniach. Wylewka anhydrytowa: po 7–10 dniach. Pierwsze uruchomienie stopniowo: 25°C przez 3 dni, 35°C przez 3 dni, 45°C przez 3 dni." },
      { q: "Ogrzewanie podłogowe wodne czy elektryczne — co wybrać?", a: "Elektryczne: niski koszt instalacji, wysoki eksploatacji. Idealne do łazienki lub jako wspomagające. Wodne: wysoki koszt instalacji, niski eksploatacji przy pompie ciepła. Opłaca się w całym domu." }
    ],
    content: `## Dlaczego ogrzewanie podłogowe zyskuje popularność?

Ogrzewanie podłogowe (UFH) rozprowadza ciepło na całej powierzchni przy niskiej temperaturze zasilania 35–45°C vs 70–90°C dla grzejników. Efekt: równomierne ciepło, brak przeciągów, niewidoczna instalacja.

## Systemy wodne (hydronic UFH)

Rury PEX-A lub PERT 16x2 mm układane w odstępach 10–20 cm zalewane wylewką. Zasilane z rozdzielacza podłączonego do kotła lub pompy ciepła.

### Wylewka — anhydryt czy beton?

| Parametr | Anhydryt (CA) | Beton cementowy (CT) |
|----------|--------------|---------------------|
| Grubość nad rurą | 30–35 mm | 45–65 mm |
| Czas schnięcia | 7–10 dni | 28 dni |
| Samopoziomowanie | Tak | Nie |
| Odporność na wilgoć | Niska | Wysoka |
| Cena (m²) | 30–45 zł | 25–40 zł |

### Izolacja termiczna pod podłogówkę
EPS 100 min. 5 cm pod ogrzewaniem na gruncie. Panele systemowe z frezowanymi kanałami ułatwiają układanie rur w równych odstępach.

## Systemy elektryczne

- **Maty grzewcze**: grubość 3–4 mm, wbudowane w klej pod płytki. Idealne do łazienki.
- **Folie grzewcze**: pod podłogi pływające (panele, drewno), bez wylewki.
- **Przewody grzewcze**: zalewane wylewką, elastyczność rozmieszczenia.

## Krok po kroku — instalacja podłogówki wodnej

1. Izolacja termiczna EPS 100 (5–10 cm) z folią PE
2. Taśma dylatacyjna wzdłuż ścian — obowiązkowa
3. Siatka zbrojąca lub panele systemowe
4. Układanie rur w rozstawie 10–15 cm (łazienka) lub 15–20 cm (salon)
5. Próba ciśnieniowa rur (6 bar przez 24h)
6. Zalanie wylewką anhydrytową lub cementową
7. Schnięcie + cykl nagrzewający
8. Układanie płytek na kleju C2TE

Pełny asortyment: rury Rehau RAUTHERM, panele systemowe, izolacja EPS 100, anhydryt, kleje C2TE — Media Bud Lublin. Zadzwoń: **+48 533 553 344**`,
  },
  {
    id: "b033",
    slug: "lazienka-pod-klucz-materialy-ile-kosztuje-2026",
    title: "Łazienka pod klucz — jakie materiały i ile to kosztuje? Poradnik 2026",
    excerpt: "Remont łazienki 6 m² to koszt 15 000–45 000 zł. Sprawdzamy skąd biorą się te kwoty i jak zaplanować zakup materiałów.",
    category: "Wykończenia",
    author: "Zespół Media Bud",
    date: "2026-06-12",
    readTime: 11,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    tags: ["łazienka", "remont łazienki", "płytki", "hydroizolacja", "wykończenia", "materiały"],
    faq: [
      { q: "Ile kosztuje remont łazienki 6 m² w 2026 roku?", a: "Remont łazienki 6 m² (standard): materiały 8 000–18 000 zł + robocizna 8 000–15 000 zł = 16 000–33 000 zł. Premium: do 50 000 zł. Ekonomiczny: 10 000–16 000 zł." },
      { q: "Co to jest hydroizolacja i czy jest obowiązkowa w łazience?", a: "Hydroizolacja jest obowiązkowa w strefach mokrych (prysznic, wanna, podłoga). Stosuje się masy uszczelniające np. Ceresit CR 65, Weber.tec 933 nakładane w 2 warstwach z taśmą uszczelniającą. Pominięcie = ryzyko zawilgocenia stropu u sąsiadów." },
      { q: "Ile płytek potrzebuję na łazienkę 6 m²?", a: "Podłoga 7 m², ściany ok. 28 m² = 35 m² okładzin z 15% zapasem = ok. 40 m² płytek. Przy dużych formatach i wielu docinaniach zamów 45 m²." },
      { q: "Jaka kolejność robót przy remoncie łazienki?", a: "Prawidłowa kolejność: 1. Wyburzenia i instalacje, 2. Tynkowanie, 3. Hydroizolacja, 4. Płytki (podłoga → ściany), 5. Fugowanie, 6. Biały montaż, 7. Malowanie sufitu, 8. Drzwi i listwy." },
      { q: "Czy można remontować łazienkę bez zrywania starych płytek?", a: "Tak — przy użyciu klejów do aplikacji na stare płytki (Ceresit CM 16). Warunek: stare płytki stabilnie przyklejone, bez pustek. Zwiększa grubość okładziny o ok. 10–12 mm." }
    ],
    content: `## Planowanie remontu łazienki krok po kroku

Łazienka to jedno z najdroższych do remontu pomieszczeń przeliczając na m². Wysoka wilgotność i skomplikowane instalacje sprawiają, że błędy kosztują szczególnie dużo.

## Zestawienie materiałów do łazienki 6 m²

### Hydroizolacja — obowiązkowa w strefach mokrych

| Produkt | Zastosowanie | Zużycie |
|---------|-------------|---------|
| Ceresit CR 65 | Ściany prysznica i wanny | 1,5–2 kg/m² × 2 warstwy |
| Mapei Mapelastic | Podłoga łazienki | 1,5 kg/m² |
| Taśma narożna | Każdy narożnik | mb |

### Kleje i fugi
- Klej do ścian: C1E lub C2 (Ceresit CM 11)
- Klej do podłogi: C2TE (Ceresit CM 17) — odkształcalny
- Fuga cementowa: Ceresit CE 33, Mapei Ultracolor Plus
- Fuga epoksydowa: do prysznica i wanny — wodoszczelna
- Silikon sanitarny: połączenie podłogi ze ścianą, wokół wanny

## Szacunkowe zestawienie materiałów (łazienka 6 m², standard)

| Pozycja | Ilość | Cena orientacyjna |
|---------|-------|-----------------|
| Płytki ściany (32 m²) | 32 m² | 1 500–5 000 zł |
| Płytki podłoga (8 m²) | 8 m² | 400–2 000 zł |
| Klej C2TE do podłogi | 4 worki 25 kg | 200–320 zł |
| Klej C1/C2 do ścian | 6 worków | 240–480 zł |
| Fuga (5 kg) | 2 opak. | 80–200 zł |
| Hydroizolacja CR 65 | 2 opak. 7 kg | 200–400 zł |
| Grunt + szpachlówka | zestaw | 200–400 zł |
| Silikon sanitarny | 3 kartridże | 60–120 zł |
| **Suma materiały** | — | **2 880–8 920 zł** |

W Media Bud: hydroizolacje, kleje, fugi, płytki — kompletne zestawienie do łazienki. Zadzwoń: **+48 533 553 344** | ul. Chemiczna 8d, Lublin`,
  },
  {
    id: "b034",
    slug: "tynk-maszynowy-vs-reczny-kiedy-ktory-wybrac",
    title: "Tynk maszynowy vs ręczny — kiedy i który wybrać? Porównanie",
    excerpt: "Tynk maszynowy jest 3–4x szybszy od ręcznego. Wyjaśniamy różnice, rodzaje tynków i kiedy każdy z nich jest właściwym wyborem.",
    category: "Tynki i gładzie",
    author: "Zespół Media Bud",
    date: "2026-06-14",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80",
    tags: ["tynk maszynowy", "tynk ręczny", "gipsowy", "cementowo-wapienny", "tynkowanie"],
    faq: [
      { q: "Czym różni się tynk maszynowy od ręcznego?", a: "To ten sam materiał, ale aplikowany agregatem tynkarskim. Wydajność: 100–200 m²/dzień maszynowo vs 20–40 m²/dzień ręcznie. Jakość powierzchni identyczna lub lepsza." },
      { q: "Jaki tynk wybrać: gipsowy czy cementowo-wapienny?", a: "Gipsowy (Knauf MP 75, Atlas Neoterm): wewnątrz, suche pomieszczenia. Cementowo-wapienny (Knauf Rotband, Atlas Ceram): wewnątrz i zewnątrz, łazienki, piwnice, wszędzie z wilgocią." },
      { q: "Ile tynku gipsowego na 100 m² ścian?", a: "Zużycie przy grubości 1,5 cm: ok. 12–15 kg/m². Na 100 m²: 1 200–1 500 kg (24–30 worków 50 kg). Dodaj 10% zapas." },
      { q: "Czy tynk gipsowy można nakładać na beton?", a: "Tak, ale wymagane gruntowanie preparatem sczepnym (Knauf Betokontakt, Atlas Uni-Grunt). Bez gruntu tynk gipsowy na betonie odpada." },
      { q: "Kiedy nie stosować tynku gipsowego?", a: "NIE stosuj w łazienkach i kuchniach, piwnicach, garażach, na ściany zewnętrzne. W strefach mokrych: tynk cementowy lub cementowo-wapienny + hydroizolacja." }
    ],
    content: `## Tynk — podstawowy etap wykończenia ścian

Właściwy wybór tynku i metody nakładania decyduje o jakości ścian na kolejne dziesięciolecia.

## Rodzaje tynków wewnętrznych

### Tynk gipsowy
Spoiwo: gips budowlany. Wyłącznie wewnątrz, pomieszczenia suche.
Zalety: szybkie wysychanie (2–4h robocze), powierzchnia gotowa pod malowanie bez gładzi.
Przykłady: Knauf MP 75 (maszynowy), Atlas Neoterm, Baumit Gipsputz.

### Tynk cementowo-wapienny
Spoiwo: cement + wapno. Wewnątrz i zewnątrz, pomieszczenia wilgotne.
Przykłady: Atlas Ceram, Knauf Unterputz, Baumit MPI 25.

## Maszynowy vs ręczny — tabela

| Kryterium | Maszynowy | Ręczny |
|-----------|-----------|--------|
| Wydajność | 100–200 m²/dzień | 20–40 m²/dzień |
| Koszt robocizny (100 m²) | 1 000–1 800 zł | 2 500–4 500 zł |
| Min. powierzchnia opłacalna | 200–300 m² | bez minimum |
| Jednorodność | Bardzo wysoka | Zależna od wykonawcy |

## Przygotowanie podłoża

1. Podłoże suche, nośne, oczyszczone
2. Gruntowanie: Atlas Uni-Grunt (standard), Knauf Betokontakt (na beton)
3. Siatka zbrojąca na złączach różnych materiałów
4. Listwy tynkarskie aluminiowe (prawidłowa grubość i pion)

W Media Bud: Knauf MP 75, Atlas Neoterm, Atlas Ceram, Baumit. Zadzwoń: **+48 533 553 344**`,
  },
  {
    id: "b035",
    slug: "pokrycia-dachowe-porownanie-rodzajow-ceny-2026",
    title: "Pokrycia dachowe — porównanie rodzajów i ceny 2026",
    excerpt: "Dachówka ceramiczna, blachodachówka czy gont? Porównujemy najpopularniejsze pokrycia dachowe pod względem trwałości, wagi i kosztów w 2026.",
    category: "Dachy",
    author: "Zespół Media Bud",
    date: "2026-06-16",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    tags: ["dach", "blachodachówka", "dachówka ceramiczna", "pokrycie dachowe", "papa", "dach skośny"],
    faq: [
      { q: "Co jest trwalsze — dachówka ceramiczna czy blachodachówka?", a: "Dachówka ceramiczna: trwałość 80–120 lat, odporna na UV, mróz. Blachodachówka stalowa: 30–50 lat (Purex/PurMat). Ceramika trwalsza, ale cięższa (40–55 kg/m²) i droższa. Blachodachówka: 6–9 kg/m², szybszy montaż." },
      { q: "Ile kosztuje pokrycie dachu blachodachówką na 150 m²?", a: "Materiały (blachodachówka, membrana, łaty, rynny): 12 000–22 000 zł. Robocizna 50–100 zł/m² = 7 500–15 000 zł. Łącznie: 20 000–37 000 zł." },
      { q: "Jaka membrana dachowa pod blachodachówkę?", a: "Wysokodyfuzyjna membrana dachowa (Sd < 0,02 m) — leży bezpośrednio na krokwiach bez szczeliny. Lub folia MSD — wymaga szczeliny wentylacyjnej poniżej. Polecane: Fakro Pro, Dorken Delta, Marma." },
      { q: "Jaki kąt nachylenia wymagany dla różnych pokryć?", a: "Blachodachówka: min. 12–15°. Dachówka ceramiczna: min. 22–25°. Papa termozgrzewalna: od 3°. Blacha na rąbek stojący: min. 3°. Zawsze sprawdź wymagania producenta." },
      { q: "Czy można układać nowe pokrycie na stare?", a: "Technicznie możliwe, ale niezalecane — wyższe obciążenie więźby, ryzyko wilgoci między warstwami. Konieczna ekspertyza statyczna. Wyjątek: blacha na rąbek przy spełnieniu warunków technicznych." }
    ],
    content: `## Dach skośny — jakie masz możliwości?

Wybór pokrycia dachowego to decyzja na kilkadziesiąt lat. Wpływa na wygląd, koszty eksploatacji i wymagania dla więźby.

## Przegląd najpopularniejszych pokryć

### Blachodachówka stalowa
Najczęstsze pokrycie w Polsce (ok. 60% rynku). Arkuszowa lub modułowa z powłoką Purex, PurMat lub PVDF.
Zalety: niska waga (6–9 kg/m²), szeroka gama kolorów, niska cena.

### Dachówka ceramiczna i betonowa

| Parametr | Ceramiczna | Betonowa |
|----------|-----------|---------|
| Trwałość | 80–120 lat | 30–50 lat |
| Waga (m²) | 40–55 kg | 40–50 kg |
| Cena (m²) | 60–200 zł | 25–60 zł |
| Wymagany kąt | min. 22° | min. 17° |

### Papa termozgrzewalna
Do dachów płaskich. Papa SBS lepsza od APP w polskim klimacie. System dwuwarstwowy: podkładowa + nawierzchniowa.

### Blacha na rąbek stojący
Profil premium. Min. kąt 3°, trwałość 50–100 lat. Materiały: tytan-cynk, miedź, aluminium, stal powlekana.

## Struktura dachu skośnego (od środka)

1. Krokwie i więźba
2. Wełna mineralna między krokwiami
3. Paroizolacja lub membrana paroprzepuszczalna
4. Łaty i kontrłaty (szczelina wentylacyjna)
5. Membrana dachowa wysokodyfuzyjna
6. Pokrycie (blachodachówka, dachówka)
7. Obróbki blacharskie: gąsiory, okapniki, kosze

W Media Bud: papy (Icopal, Sopro, Sika), membrany (Fakro, Dorken), folie paroizolacyjne. Zadzwoń: **+48 533 553 344**`,
  },
  {
    id: "b036",
    slug: "plyty-gipsowo-kartonowe-rodzaje-montaz-knauf-rigips",
    title: "Płyty gipsowo-kartonowe — rodzaje, montaż i porównanie Knauf vs Rigips",
    excerpt: "Sucha zabudowa z płyt GK to szybki i ekonomiczny sposób na ściany działowe i sufity. Tłumaczymy rodzaje, dobór i montaż.",
    category: "Sucha zabudowa",
    author: "Zespół Media Bud",
    date: "2026-06-18",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
    tags: ["płyty GK", "gipsowo-kartonowe", "Knauf", "Rigips", "sucha zabudowa", "ścianki działowe"],
    faq: [
      { q: "Jaka płyta GK do łazienki i kuchni?", a: "Stosuj płyty GKBI impregnowane (zielone — Knauf Grünband, Rigips RBI). Odporne na wilgoć, ale nie wodoodporne — w strefach mokrych obowiązkowa dodatkowa hydroizolacja." },
      { q: "Ile warstw GK dla dobrej izolacji akustycznej?", a: "1 warstwa GK 12,5 mm + wełna: ok. 40 dB. 2 warstwy + wełna: 45–50 dB. Podwójna konstrukcja: 55–62 dB. Norma: min. 38 dB dla ścian między mieszkaniami." },
      { q: "Czym różni się płyta GK 12,5 mm od 15 mm?", a: "Płyta 15 mm: większa sztywność, lepsza izolacja akustyczna o 2–3 dB, wyższa ognioodporność (EI 30 vs EI 15). Stosuj 15 mm na korytarzach ewakuacyjnych lub gdzie wymagana wyższa odporność." },
      { q: "Jaki raster profili do sufitów GK?", a: "Raster 50×50 cm dla płyt 12,5 mm. Wieszaki bezpośrednie lub noniusze co 50 cm wzdłuż profilu CD 60. Rozstaw profili głównych UD/CD co 50 lub 100 cm." },
      { q: "Knauf czy Rigips — która lepsza?", a: "Obie marki reprezentują porównywalną jakość. Rigips należy do Saint-Gobain, Knauf to marka własna. Zbliżona cena i certyfikaty CE. Wybór zależy od dostępności regionalnej i preferencji wykonawcy." }
    ],
    content: `## Dlaczego sucha zabudowa zdominowała budownictwo?

Płyty GK umożliwiają tworzenie ścian działowych i sufitów bez mokrych procesów. Szybkość montażu i elastyczność sprawiły, że sucha zabudowa jest standardem.

## Rodzaje płyt GK

### GKB — Standardowe (białe)
Zastosowanie: ściany działowe, sufity w suchych pomieszczeniach.
Knauf Standard, Rigips RB.

### GKBI — Impregnowane (zielone)
Do pomieszczeń wilgotnych. Knauf Grünband, Rigips RBI.

### GKF — Ogniochronne (różowe)
Rdzeń z włóknami szklanymi. Wyższa odporność ogniowa.
Knauf Fireboard, Rigips RF.

### Akustyczne
Podwyższona masa (ponad 11 kg/m²). Lepsza izolacja o 3–5 dB.

## Porównanie Knauf vs Rigips

| Parametr | Knauf Standard | Rigips RB |
|----------|--------------|----------|
| Grubość | 12,5 mm | 12,5 mm |
| Masa (m²) | ok. 10 kg | ok. 10 kg |
| Cena (m²) | 12–16 zł | 12–16 zł |
| Certyfikat | CE, ETA | CE, ETA |

## Profile stalowe

Profile UW (poziome: posadzka/sufit), CW (pionowe: ściany), UD i CD (sufity).
Rozstaw CW: co 60 cm (standard) lub co 40 cm (wymagania akustyczne/ogniowe).

W Media Bud: płyty Knauf i Rigips (GKB, GKBI, GKF), profile UW/CW/UD/CD, wkręty, masy szpachlowe. Zadzwoń: **+48 533 553 344**`,
  },
  {
    id: "b037",
    slug: "remont-starego-budynku-od-czego-zaczac-materialy",
    title: "Remont starego budynku — od czego zacząć i jakie materiały wybrać?",
    excerpt: "Remont kamienicy lub domu z lat 60–80 rządzi się innymi prawami. Podpowiadamy kolejność prac i dobór materiałów do starych substancji budowlanych.",
    category: "Remont",
    author: "Zespół Media Bud",
    date: "2026-06-20",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    tags: ["remont", "stary budynek", "kamienica", "termomodernizacja", "tynk renowacyjny", "wilgoć"],
    faq: [
      { q: "Od czego zacząć remont starej kamienicy?", a: "Kolejność: 1. Ekspertyza budowlana, 2. Izolacja fundamentów i osuszenie, 3. Naprawa więźby i wymiana pokrycia, 4. Wymiana instalacji (przed tynkowaniem), 5. Tynkowanie, 6. ETICS, 7. Wykończenia wnętrz." },
      { q: "Jaki tynk na stare ściany z wilgocią kapilarną?", a: "Tynki renowacyjne WTA — np. Remmers WTA, Baumit Sanova. Porowata struktura zatrzymuje sole krystalizujące poza warstwą malarską. Przed tynkiem: iniekcja chemiczna lub przepona mechaniczna." },
      { q: "Jak ocieplić stary budynek bez pozwolenia?", a: "ETICS do 25 cm grubości nie wymaga pozwolenia — wystarcza zgłoszenie. Wyjątek: budynki w strefie ochrony konserwatorskiej — konieczne uzgodnienie z konserwatorem." },
      { q: "Ile kosztuje termomodernizacja domu 150 m² w 2026?", a: "ETICS 200 m²: 15 000–30 000 zł, okna PVC 20 000–35 000 zł, ocieplenie dachu 5 000–12 000 zł. Łącznie materiały + robocizna: 60 000–120 000 zł. Dofinansowanie Czyste Powietrze: do 66 000 zł." },
      { q: "Czy stary strop z pustaków można obciążyć nową wylewką?", a: "Stropy ceramiczne Kleina: nośność 150–250 kg/m². Wylewka 5 cm = ok. 115 kg/m². Może przekroczyć nośność — konieczna ekspertyza konstruktora. Alternatywa: sucha wylewka (Knauf Brio)." }
    ],
    content: `## Stary budynek — zupełnie inne reguły

Remont budynku z PRL lub kamienicy sprzed 1945 roku wymaga innego podejścia. Starsze materiały (wapno, cegła pełna, drewno) reagują inaczej na nowoczesne produkty.

## Diagnoza przed remontem

### Wilgoć — najczęstszy problem
- **Kapilarna** (z gruntu): iniekcja chemiczna, tynki renowacyjne WTA
- **Kondensacyjna** (para wodna): poprawa wentylacji, usunięcie szczelnych powłok
- **Z nieszczelności**: naprawa dachu i obróbek blacharskich

## Dobór materiałów — zasada kompatybilności

Stosuj materiały o podobnej lub wyższej paroprzepuszczalności co mur.
- Stara cegła pełna: tynki wapienne lub wapienno-cementowe (NIE gipsowe)
- Stary mur kamienny: wyłącznie materiały mineralne o wysokim sd
- Betonowe elementy PRL: standardowe produkty współczesne

## Termomodernizacja starych budynków

Przed ETICS na starym budynku sprawdź: czy stary tynk jest nośny (test odrywający > 0,08 N/mm²), czy mur jest suchy (wilgotność < 6%), czy nie ma azbestu.

## Kolejność robót remontowych

| Etap | Zakres | Przykłady produktów |
|------|--------|---------------------|
| 1 | Fundamenty i izolacja | XPS, masa bitumiczna, iniekcja |
| 2 | Dach i więźba | Papa SBS, impregnaty drewna |
| 3 | Instalacje | Miedziane rury, przewody YDY |
| 4 | Tynki wnętrza | Atlas Ceram, tynki wapienne |
| 5 | ETICS elewacja | Ceresit, Weber, Knauf systemy |
| 6 | Wykończenia | Płytki, gładzie, malowanie |

Media Bud: tynki renowacyjne WTA, systemy iniekcji, ETICS, materiały wykończeniowe. Zadzwoń: **+48 533 553 344** | ul. Chemiczna 8d, Lublin`,
  }
  ,{
    id: "b032",
    slug: "materialy-budowlane-lublin-gdzie-kupic-taniej",
    title: "Materiały budowlane w Lublinie — gdzie kupić i ile kosztują w 2026 r.?",
    excerpt: "Planujesz budowę lub remont w Lublinie? Sprawdź, gdzie kupić styropian, tynk, klej i inne materiały budowlane w najlepszej cenie. Praktyczny przewodnik po lubelskim rynku.",
    category: "Poradniki",
    author: "Zespół Media Bud",
    date: "2026-06-07",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1503152915413-2c6e5c4c7451?w=800&q=80",
    tags: ["materiały budowlane Lublin", "skład budowlany Lublin", "hurtownia Lublin", "styropian Lublin", "tynk elewacyjny Lublin"],
    content: `## Gdzie kupić materiały budowlane w Lublinie?

Lublin i okolice to dynamicznie rozwijający się rynek budowlany — rocznie powstają tu setki nowych domów jednorodzinnych, bloków wielorodzinnych i obiektów komercyjnych. Jeśli planujesz budowę lub remont, wiesz już, że ceny i dostępność materiałów potrafią się znacznie różnić między dostawcami. Ten przewodnik pomoże Ci świadomie wybrać miejsce zakupu i zaoszczędzić na materiałach bez kompromisów jakościowych.

## Skład budowlany vs. markety budowlane — co wybrać?

W Lublinie masz do wyboru kilka opcji: duże markety budowlane (Leroy Merlin, OBI, Castorama), regionalne hurtownie i składy budowlane oraz sklepy internetowe z odbiorem osobistym.

### Zalety składu budowlanego (takiego jak Media Bud):

- **Ceny hurtowe** — przy większych zamówieniach (paleta styropianu, wór tynku × 50 szt.) składy oferują ceny nawet 15–25% niższe niż markety detaliczne
- **Doradztwo techniczne** — handlowiec z doświadczeniem dobrze dobierze parametry produktu do konkretnego projektu
- **Dostawa na plac budowy** — transport ciężkim HDS bezpośrednio na budowę w Lublinie i woj. lubelskim
- **Pełne systemy od jednego dostawcy** — np. kompletny system ETICS (Knauf, Atlas, Weber) z jednego miejsca, bez łączenia niekompatybilnych produktów

### Kiedy market budowlany jest OK:

- Małe ilości (remont łazienki, 2–3 worki gładzi)
- Zakup w niedzielę lub poza godzinami pracy składu
- Odbiór natychmiastowy bez czekania na awizowanie dostawy

## Najpopularniejsze materiały budowlane w Lublinie — ceny i marki

### Styropian fasadowy EPS 100 (Lublin, 2026)

Styropian to jeden z najczęściej kupowanych materiałów budowlanych w regionie lubelskim. Standardowe systemy ociepleń w Lublinie wymagają grubości 15–20 cm przy λ = 0,040 W/(m·K).

**Orientacyjne ceny za m³ (hurtowo, pełna paleta):**
- Styropian biały EPS 100 15 cm: 85–105 zł/m²
- Styropian grafitowy EPS 100 15 cm: 100–125 zł/m²
- Styropian EPS 150 (podłogi): 75–95 zł/m²

> Przy zamówieniu przez Media Bud możesz skonfigurować dostawę na konkretny termin — ważne, gdy budujesz etapami.

### Tynki elewacyjne — co dominuje w Lublinie?

Lubelski klimat (duże skoki temperatur, wilgotne jesienie) sprawia, że tynki silikonowe i silikatowe zyskują przewagę nad akrylowymi. Odporność na glony i łatwe czyszczenie to tutaj kluczowe kryteria.

**Bestsellery w regionie:**
- **Weber.pas DR1** — tynk silikonowy, dostępny w 580 kolorach NCS
- **Atlas Silkon** — dobry stosunek ceny do jakości, popularny wśród lubelskich firm budowlanych
- **Ceresit CT 174** — tynk silikatowy, szczególnie polecany przy remontach starszych budynków

### Kleje do styropianu

Przy systemach ETICS z atestem dobór kleju ma znaczenie zarówno techniczne, jak i gwarancyjne. Mieszanie klejów różnych producentów może unieważnić certyfikat systemu.

**Rekomendowane kleje do styropianu w Lublinie:**
- **Atlas Stopter K-20** — cement, do przyklejania i zatapiania siatki, szeroka dostępność
- **Knauf Goldband Grunt** — do systemów Knauf, gotowy do użycia po dodaniu wody
- **Weber therm** — dedykowany do systemów weber.therm

## Dostawa materiałów budowlanych na terenie Lublina

Duże zamówienia (palety styropianu, pełne dostawy tynków) wymagają transportu specjalistycznym samochodem HDS. Media Bud realizuje dostawy na terenie:

- **Lublina** — w ciągu 24 h od złożenia zamówienia
- **Powiatu lubelskiego** — Świdnik, Niemce, Głusk, Jabłonna, Wólka, Konopnica
- **Woj. lubelskiego** — Zamość, Chełm, Biała Podlaska, Puławy (termin do uzgodnienia)

> Przy zamówieniu powyżej określonej wartości — dostawa bezpłatna. Zadzwoń i zapytaj o warunki: **+48 533 553 344**

## Bezpłatna wycena projektu — jak to działa?

Jeśli budujesz dom lub planujesz większy remont, możemy wycenić całe zamówienie na podstawie projektu budowlanego lub przedmiaru robót. Wyślij nam:

1. Projekt budowlany (PDF lub DWG) **lub** przedmiar robót
2. Preferowany termin realizacji
3. Adres budowy na terenie Lublina lub woj. lubelskiego

Nasz handlowiec przygotuje zestawienie materiałów z cenami hurtowymi w ciągu 24 godzin roboczych.

## FAQ — materiały budowlane w Lublinie

**Czy sprzedajecie na faktury VAT dla firm?**
Tak — obsługujemy zarówno klientów B2C (osoby prywatne), jak i B2B (firmy budowlane, deweloperzy, spółdzielnie). Wystawiamy faktury VAT, przyjmujemy przelewy i płatności gotówkowe.

**Czy można zamówić i odebrać tego samego dnia?**
Przy towarach dostępnych na stanie — tak. Nasz magazyn przy ul. Chemicznej 8d jest otwarty Pon–Pt 7:00–16:00, Sob 7:00–13:00.

**Czy dowoziecie materiały na rusztowanie?**
Transport HDS umożliwia rozładunek na placu budowy, jednak wnoszenie materiałów na rusztowania wyceniamy indywidualnie. Zapytaj przed zamówieniem.

**Jakie marki styropianu macie w ofercie?**
W ofercie Media Bud znajdziesz produkty Swisspor, Synthos, Austrotherm, Ravatherm — w różnych grubościach i klasach lambda. Doradzamy przy wyborze pod konkretny projekt.`,
    faq: [
      { q: "Gdzie kupić materiały budowlane w Lublinie?", a: "Media Bud — skład budowlany przy ul. Chemicznej 8d w Lublinie. Oferujemy ponad 15 000 produktów z dostawą na teren całego woj. lubelskiego." },
      { q: "Czy Media Bud dostarcza materiały na plac budowy?", a: "Tak, realizujemy dostawy transportem HDS na terenie Lublina (24h) i całego województwa lubelskiego." },
      { q: "Czy można uzyskać bezpłatną wycenę projektu?", a: "Tak — wyślij projekt lub przedmiar, a nasz handlowiec przygotuje zestawienie materiałów z cenami hurtowymi w ciągu 24 h." },
      { q: "Jakie godziny otwarcia ma skład budowlany Media Bud?", a: "Pon–Pt 7:00–16:00, Sob 7:00–13:00. Adres: ul. Chemiczna 8d, 20-329 Lublin." },
    ],
  }
];


export const getBlogPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug) || null;
export const getBlogPostsByCategory = (cat: string) => blogPosts.filter(p => p.category === cat);
export const getRecentBlogPosts = (n = 3) => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, n);
