const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/blog.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Bardziej elastyczne regexy do podmiany
const replacements = [
  {
    id: "b012",
    regex: /(Wybór odpowiedniego tynku elewacyjnego to jedna z najważniejszych decyzji[^.]*\.)/,
    replace: "$1 Zanim zaczniesz, sprawdź nasz [kalkulator tynku elewacyjnego](/kalkulator/tynk-elewacyjny), aby dokładnie oszacować potrzebną ilość materiału."
  },
  {
    id: "b013",
    regex: /(Ocieplenie domu to inwestycja, która zwraca się w postaci niższych rachunków[^.]*\.)/,
    replace: "$1 Aby precyzyjnie wyliczyć zapotrzebowanie na materiał, skorzystaj z naszego [kalkulatora styropianu i wełny](/kalkulator/styropian-welna)."
  },
  {
    id: "b014",
    regex: /(Wybór odpowiedniego systemu suchej zabudowy to klucz do sukcesu[^.]*\.)/,
    replace: "$1 Zobacz pełną ofertę w kategorii [Sucha zabudowa](/kategoria/sucha-zabudowa)."
  },
  {
    id: "b015",
    regex: /(Wybór odpowiedniego kleju do styropianu to fundament trwałego ocieplenia[^.]*\.)/,
    replace: "$1 Sprawdź dostępne produkty w kategorii [Kleje do styropianu](/kategoria/kleje-styropian)."
  },
  {
    id: "b017",
    regex: /(Obliczenie odpowiedniej ilości tynku elewacyjnego to kluczowy krok[^.]*\.)/,
    replace: "$1 Najszybszym sposobem jest użycie naszego [kalkulatora tynku elewacyjnego](/kalkulator/tynk-elewacyjny), który uwzględnia normy zużycia dla różnych granulacji."
  },
  {
    id: "b019",
    regex: /(Rok 2026 przyniósł stabilizację cen na rynku materiałów izolacyjnych[^.]*\.)/,
    replace: "$1 Aby sprawdzić aktualne ceny i dostępność, odwiedź kategorię [Izolacje](/kategoria/izolacje) lub skorzystaj z [kalkulatora izolacji](/kalkulator/styropian-welna)."
  }
];

let updatedCount = 0;

for (const rep of replacements) {
  const postRegex = new RegExp(`(id:\\s*"${rep.id}"[\\s\\S]*?)(?=id:\\s*"b\\d+"|$)`);
  const match = content.match(postRegex);
  
  if (match) {
    let postBlock = match[1];
    if (rep.regex.test(postBlock) && !postBlock.includes("[kalkulator") && !postBlock.includes("[Sucha zabudowa") && !postBlock.includes("[Kleje do styropianu") && !postBlock.includes("[Izolacje")) {
      postBlock = postBlock.replace(rep.regex, rep.replace);
      content = content.replace(match[1], postBlock);
      updatedCount++;
      console.log(`Zaktualizowano link w poście ${rep.id}`);
    }
  }
}

fs.writeFileSync(filePath, content);
console.log(`Zakończono. Wprowadzono ${updatedCount} linków wewnętrznych.`);
