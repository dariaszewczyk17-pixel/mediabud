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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
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
];


export const getBlogPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug) || null;
export const getBlogPostsByCategory = (cat: string) => blogPosts.filter(p => p.category === cat);
export const getRecentBlogPosts = (n = 3) => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, n);
