const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/blog.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  {
    id: "b012",
    regex: /(## Tynk silikonowy vs akrylowy — podstawowe różnice\n\n)/,
    replace: "$1Wybór odpowiedniego tynku elewacyjnego to jedna z najważniejszych decyzji. Zanim zaczniesz, sprawdź nasz [kalkulator tynku elewacyjnego](/kalkulator/tynk-elewacyjny), aby dokładnie oszacować potrzebną ilość materiału.\n\n"
  },
  {
    id: "b013",
    regex: /(## Koszt ocieplenia domu 150m2 w 2026 roku\n\n)/,
    replace: "$1Ocieplenie domu to inwestycja, która zwraca się w postaci niższych rachunków. Aby precyzyjnie wyliczyć zapotrzebowanie na materiał, skorzystaj z naszego [kalkulatora styropianu i wełny](/kalkulator/styropian-welna).\n\n"
  },
  {
    id: "b014",
    regex: /(## Knauf czy Rigips\? Porównanie systemów suchej zabudowy\n\n)/,
    replace: "$1Wybór odpowiedniego systemu suchej zabudowy to klucz do sukcesu. Zobacz pełną ofertę w kategorii [Sucha zabudowa](/kategoria/sucha-zabudowa).\n\n"
  },
  {
    id: "b015",
    regex: /(## Jaki klej do styropianu wybrać\?\n\n)/,
    replace: "$1Wybór odpowiedniego kleju do styropianu to fundament trwałego ocieplenia. Sprawdź dostępne produkty w kategorii [Kleje do styropianu](/kategoria/kleje-styropian).\n\n"
  },
  {
    id: "b017",
    regex: /(## Jak obliczyć ilość tynku na elewację\?\n\n)/,
    replace: "$1Obliczenie odpowiedniej ilości tynku elewacyjnego to kluczowy krok. Najszybszym sposobem jest użycie naszego [kalkulatora tynku elewacyjnego](/kalkulator/tynk-elewacyjny), który uwzględnia normy zużycia dla różnych granulacji.\n\n"
  },
  {
    id: "b019",
    regex: /(## Cennik materiałów izolacyjnych 2026\n\n)/,
    replace: "$1Rok 2026 przyniósł stabilizację cen na rynku materiałów izolacyjnych. Aby sprawdzić aktualne ceny i dostępność, odwiedź kategorię [Izolacje](/kategoria/izolacje) lub skorzystaj z [kalkulatora izolacji](/kalkulator/styropian-welna).\n\n"
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
