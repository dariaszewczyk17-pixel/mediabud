const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/blog.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  {
    id: "b019",
    regex: /(## Cennik materiałów izolacyjnych — Lublin 2026\n\n)/,
    replace: "$1Aby sprawdzić aktualne ceny i dostępność, odwiedź kategorię [Izolacje](/kategoria/izolacje) lub skorzystaj z [kalkulatora izolacji](/kalkulator/styropian-welna).\n\n"
  }
];

let updatedCount = 0;

for (const rep of replacements) {
  const postRegex = new RegExp(`(id:\\s*"${rep.id}"[\\s\\S]*?)(?=id:\\s*"b\\d+"|$)`);
  const match = content.match(postRegex);
  
  if (match) {
    let postBlock = match[1];
    if (rep.regex.test(postBlock) && !postBlock.includes("[kalkulator") && !postBlock.includes("[Izolacje")) {
      postBlock = postBlock.replace(rep.regex, rep.replace);
      content = content.replace(match[1], postBlock);
      updatedCount++;
      console.log(`Zaktualizowano link w poście ${rep.id}`);
    }
  }
}

fs.writeFileSync(filePath, content);
console.log(`Zakończono. Wprowadzono ${updatedCount} linków wewnętrznych.`);
