const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/pages/CategoryPage.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  {
    search: "Zapewniamy dostępność od ręki i szybką dostawę na terenie województwa lubelskiego.</p>",
    replace: "Zapewniamy dostępność od ręki i szybką dostawę na terenie województwa lubelskiego. Przeczytaj również nasz poradnik: <a href=\"/blog/jaki-klej-do-plytek-wielkoformatowych\" className=\"text-[#f81828] hover:underline\">Jaki klej do płytek wielkoformatowych wybrać?</a></p>"
  },
  {
    search: "lub skontaktuj się z naszym działem sprzedaży B2B.</p>",
    replace: "lub skontaktuj się z naszym działem sprzedaży B2B. Dowiedz się więcej z naszego artykułu: <a href=\"/blog/koszt-ocieplenia-domu-150m2\" className=\"text-[#f81828] hover:underline\">Ile kosztuje ocieplenie domu 150m2 w 2026 roku?</a></p>"
  },
  {
    search: "aby dokładnie oszacować potrzebną ilość materiału.</p>",
    replace: "aby dokładnie oszacować potrzebną ilość materiału. Zobacz także: <a href=\"/blog/farba-elewacyjna-silikonowa-czy-akrylowa\" className=\"text-[#f81828] hover:underline\">Farba elewacyjna – silikonowa czy akrylowa?</a></p>"
  },
  {
    search: "bezpośrednio na Twój plac budowy.</p>",
    replace: "bezpośrednio na Twój plac budowy. Sprawdź nasze porównanie: <a href=\"/blog/knauf-czy-rigips\" className=\"text-[#f81828] hover:underline\">Knauf czy Rigips – który system suchej zabudowy wybrać?</a></p>"
  },
  {
    search: "aby zoptymalizować zakupy.</p>",
    replace: "aby zoptymalizować zakupy. Przeczytaj nasz poradnik: <a href=\"/blog/jaki-klej-do-plytek-wielkoformatowych\" className=\"text-[#f81828] hover:underline\">Jaki klej do płytek wielkoformatowych?</a></p>"
  },
  {
    search: "w całym województwie lubelskim.</p>",
    replace: "w całym województwie lubelskim. Zobacz również: <a href=\"/blog/co-jest-trwalsze-dachowka-ceramiczna-czy-blachodachowka\" className=\"text-[#f81828] hover:underline\">Co jest trwalsze: dachówka ceramiczna czy blachodachówka?</a></p>"
  },
  {
    search: "które sprostają najtrudniejszym zadaniom.</p>",
    replace: "które sprostają najtrudniejszym zadaniom. Przeczytaj nasz poradnik: <a href=\"/blog/jak-obliczyc-ilosc-tynku-na-elewacje\" className=\"text-[#f81828] hover:underline\">Jak obliczyć ilość tynku na elewację?</a></p>"
  },
  {
    search: "na terenie Lublina i okolic.</p>",
    replace: "na terenie Lublina i okolic. Dowiedz się więcej: <a href=\"/blog/od-czego-zaczac-remont-starej-kamienicy\" className=\"text-[#f81828] hover:underline\">Od czego zacząć remont starej kamienicy?</a></p>"
  },
  {
    search: "zapewniając szybką realizację zamówienia.</p>",
    replace: "zapewniając szybką realizację zamówienia. Zobacz także: <a href=\"/blog/ile-warstw-gk-dla-dobrej-izolacji-akustycznej\" className=\"text-[#f81828] hover:underline\">Ile warstw płyt G-K dla dobrej izolacji akustycznej?</a></p>"
  }
];

let updatedCount = 0;

for (const rep of replacements) {
  if (content.includes(rep.search) && !content.includes(rep.replace)) {
    content = content.replace(rep.search, rep.replace);
    updatedCount++;
  }
}

fs.writeFileSync(filePath, content);
console.log(`Zaktualizowano ${updatedCount} tekstów SEO o linki do bloga.`);
