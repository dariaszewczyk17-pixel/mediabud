const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/blog.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Definiujemy podmiany dla konkretnych postów
const replacements = [
  {
    id: "b012", // Tynk silikonowy czy akrylowy?
    search: "Wybór odpowiedniego tynku elewacyjnego to jedna z najważniejszych decyzji",
    replace: "Wybór odpowiedniego tynku elewacyjnego to jedna z najważniejszych decyzji. Zanim zaczniesz, sprawdź nasz [kalkulator tynku elewacyjnego](/kalkulator/tynk-elewacyjny), aby dokładnie oszacować potrzebną ilość materiału."
  },
  {
    id: "b012",
    search: "Tynki silikonowe to obecnie najbardziej zaawansowane technologicznie rozwiązanie",
    replace: "Tynki silikonowe to obecnie najbardziej zaawansowane technologicznie rozwiązanie. Sprawdź naszą ofertę w kategorii [Tynki silikonowe](/kategoria/tynki-silikonowe)."
  },
  {
    id: "b013", // Koszt ocieplenia domu 150m2
    search: "Ocieplenie domu to inwestycja, która zwraca się w postaci niższych rachunków",
    replace: "Ocieplenie domu to inwestycja, która zwraca się w postaci niższych rachunków. Aby precyzyjnie wyliczyć zapotrzebowanie na materiał, skorzystaj z naszego [kalkulatora styropianu i wełny](/kalkulator/styropian-welna)."
  },
  {
    id: "b013",
    search: "Wybór między styropianem a wełną mineralną zależy od",
    replace: "Wybór między styropianem a wełną mineralną zależy od wielu czynników. Pełny asortyment znajdziesz w dziale [Izolacje](/kategoria/izolacje)."
  },
  {
    id: "b014", // Knauf czy Rigips?
    search: "Wybór odpowiedniego systemu suchej zabudowy to klucz do sukcesu",
    replace: "Wybór odpowiedniego systemu suchej zabudowy to klucz do sukcesu. Zobacz pełną ofertę w kategorii [Sucha zabudowa](/kategoria/sucha-zabudowa)."
  },
  {
    id: "b015", // Jaki klej do styropianu wybrać?
    search: "Wybór odpowiedniego kleju do styropianu to fundament trwałego ocieplenia",
    replace: "Wybór odpowiedniego kleju do styropianu to fundament trwałego ocieplenia. Sprawdź dostępne produkty w kategorii [Kleje do styropianu](/kategoria/kleje-styropian)."
  },
  {
    id: "b017", // Jak obliczyć ilość tynku na elewację?
    search: "Obliczenie odpowiedniej ilości tynku elewacyjnego to kluczowy krok",
    replace: "Obliczenie odpowiedniej ilości tynku elewacyjnego to kluczowy krok. Najszybszym sposobem jest użycie naszego [kalkulatora tynku elewacyjnego](/kalkulator/tynk-elewacyjny), który uwzględnia normy zużycia dla różnych granulacji."
  },
  {
    id: "b019", // Cennik materiałów izolacyjnych 2026
    search: "Rok 2026 przyniósł stabilizację cen na rynku materiałów izolacyjnych",
    replace: "Rok 2026 przyniósł stabilizację cen na rynku materiałów izolacyjnych. Aby sprawdzić aktualne ceny i dostępność, odwiedź kategorię [Izolacje](/kategoria/izolacje) lub skorzystaj z [kalkulatora izolacji](/kalkulator/styropian-welna)."
  },
  {
    id: "b026", // Jak ocieplić fundamenty?
    search: "Ocieplenie fundamentów to kluczowy etap budowy",
    replace: "Ocieplenie fundamentów to kluczowy etap budowy. Zanim kupisz materiał, oblicz dokładne zapotrzebowanie w naszym [kalkulatorze izolacji fundamentów](/kalkulator/izolacja-fundamentow)."
  },
  {
    id: "b027", // Jaki klej do płytek wielkoformatowych?
    search: "Płytki wielkoformatowe cieszą się ogromną popularnością",
    replace: "Płytki wielkoformatowe cieszą się ogromną popularnością. Do ich montażu niezbędna jest odpowiednia chemia – oblicz jej ilość w [kalkulatorze kleju do płytek](/kalkulator/klej-do-plytek) i sprawdź ofertę w dziale [Chemia budowlana](/kategoria/chemia-budowlana)."
  },
  {
    id: "b028", // Farba elewacyjna - silikonowa czy akrylowa?
    search: "Wybór farby elewacyjnej to decyzja na lata",
    replace: "Wybór farby elewacyjnej to decyzja na lata. Zobacz nasz [kalkulator farby elewacyjnej](/kalkulator/farba-elewacyjna), aby sprawdzić, ile litrów potrzebujesz na swój dom."
  }
];

let updatedCount = 0;

for (const rep of replacements) {
  // Szukamy bloku posta
  const postRegex = new RegExp(`(id:\\s*"${rep.id}"[\\s\\S]*?)(?=id:\\s*"b\\d+"|$)`);
  const match = content.match(postRegex);
  
  if (match) {
    let postBlock = match[1];
    if (postBlock.includes(rep.search) && !postBlock.includes(rep.replace)) {
      postBlock = postBlock.replace(rep.search, rep.replace);
      content = content.replace(match[1], postBlock);
      updatedCount++;
      console.log(`Zaktualizowano link w poście ${rep.id}`);
    }
  }
}

fs.writeFileSync(filePath, content);
console.log(`Zakończono. Wprowadzono ${updatedCount} linków wewnętrznych.`);
