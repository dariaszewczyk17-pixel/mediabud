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
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug) || null;
export const getBlogPostsByCategory = (cat: string) => blogPosts.filter(p => p.category === cat);
export const getRecentBlogPosts = (n = 3) => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, n);
