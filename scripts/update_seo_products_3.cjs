const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const seoData = {
  "p006": {
    shortDescription: "Gładź gipsowa Knauf Multifinish do cienkowarstwowego szpachlowania powierzchni wewnątrz budynków.",
    description: "Knauf Multifinish to uniwersalna, sypka gładź gipsowa wzbogacona polimerami, przeznaczona do cienkowarstwowego szpachlowania powierzchni wewnątrz budynków. Idealnie nadaje się do wygładzania nierówności na tynkach cementowo-wapiennych, gipsowych, a także na podłożach betonowych i płytach gipsowo-kartonowych. Dzięki specjalnej formule, gładź charakteryzuje się wysoką przyczepnością, elastycznością i łatwością obróbki. Pozwala na uzyskanie idealnie gładkich powierzchni (standard Q4), gotowych do malowania lub tapetowania. Może być nakładana ręcznie lub maszynowo.",
    seoDescription: "Szukasz idealnie gładkich ścian? Gładź gipsowa Knauf Multifinish to produkt, który spełni oczekiwania nawet najbardziej wymagających wykonawców. W Media Bud oferujemy ten produkt z szybką dostawą w Lublinie. Multifinish to gwarancja doskonałego wykończenia i łatwej pracy. Sprawdź również inne produkty z kategorii [Sucha zabudowa](/kategoria/sucha-zabudowa) oraz pełną ofertę marki [Knauf](/marki/knauf). Z nami wykończenie wnętrz staje się prostsze i bardziej efektywne.",
    application: "Cienkowarstwowe szpachlowanie (wygładzanie) powierzchni ścian i sufitów wewnątrz pomieszczeń. Stosowana na tynkach gipsowych, cementowo-wapiennych, betonie oraz płytach g-k. Służy również do wypełniania drobnych ubytków i rys. Grubość warstwy od 0 do 5 mm.",
    advantages: [
      "Możliwość uzyskania powierzchni o standardzie Q4 (najwyższa gładkość)",
      "Wysoka elastyczność i przyczepność dzięki dodatkom polimerowym",
      "Łatwa w nakładaniu i szlifowaniu",
      "Możliwość nakładania warstw od 0 mm (szpachlowanie \"na zero\")",
      "Uniwersalne zastosowanie na różnych podłożach mineralnych"
    ],
    warnings: [
      "Tylko do stosowania wewnątrz budynków w suchych pomieszczeniach",
      "Podłoże musi być suche, nośne i wolne od pyłu",
      "Silnie chłonne podłoża należy wcześniej zagruntować",
      "Nie stosować w temperaturach poniżej +5°C"
    ],
    faq: [
      { q: "Czy Knauf Multifinish można nakładać na stare powłoki malarskie?", a: "Zaleca się usunięcie starych, łuszczących się powłok malarskich. Stabilne powłoki należy zmatowić i zagruntować przed nałożeniem gładzi." },
      { q: "Jaką maksymalną grubość warstwy można nałożyć jednorazowo?", a: "Maksymalna grubość jednej warstwy to 5 mm. W przypadku większych nierówności zaleca się nałożenie kilku cieńszych warstw." },
      { q: "Czy gładź Multifinish trzeba szlifować?", a: "Tak, po wyschnięciu gładź należy przeszlifować drobnym papierem ściernym lub siatką, aby uzyskać idealnie gładką powierzchnię przed malowaniem." }
    ]
  },
  "p012": {
    shortDescription: "Mineralny tynk elewacyjny weber.pas MA o strukturze baranka/kornika, wysoce paroprzepuszczalny.",
    description: "Weber.pas MA to sucha mieszanka mineralna przeznaczona do wykonywania cienkowarstwowych wypraw tynkarskich na zewnątrz i wewnątrz budynków. Tynk ten charakteryzuje się bardzo wysoką paroprzepuszczalnością, co czyni go idealnym rozwiązaniem do systemów ociepleń opartych na wełnie mineralnej, a także do renowacji starych, zabytkowych elewacji. Po zarobieniu z wodą tworzy plastyczną masę, łatwą w aplikacji i fakturowaniu. Dostępny w kolorze białym, przeznaczony do późniejszego malowania farbami elewacyjnymi (np. silikonowymi lub silikatowymi).",
    seoDescription: "Tynk mineralny weber.pas MA to klasyczne, sprawdzone i ekonomiczne rozwiązanie do wykończenia elewacji. W hurtowni Media Bud Lublin znajdziesz ten produkt w stałej ofercie. Dzięki wysokiej paroprzepuszczalności, tynk ten jest idealny na ocieplenia z wełny mineralnej. Pamiętaj, że tynk mineralny wymaga pomalowania farbą elewacyjną – sprawdź naszą ofertę w kategorii [Farby i rozpuszczalniki](/kategoria/farby-i-rozpuszczalniki). Oblicz zapotrzebowanie za pomocą [kalkulatora tynku](/kalkulator/tynk-elewacyjny) i zamów z dostawą na budowę.",
    application: "Wykonywanie cienkowarstwowych wypraw tynkarskich w systemach ociepleń ETICS (na styropianie i wełnie mineralnej) oraz na tradycyjnych tynkach podkładowych. Do stosowania na zewnątrz i wewnątrz budynków. Wymaga pomalowania farbą elewacyjną w celu zabezpieczenia przed wilgocią i nadania ostatecznego koloru.",
    advantages: [
      "Bardzo wysoka paroprzepuszczalność (idealny na wełnę mineralną)",
      "Naturalna odporność na rozwój grzybów i pleśni (wysokie pH)",
      "Materiał niepalny (klasa A1)",
      "Wysoka trwałość i odporność na warunki atmosferyczne",
      "Ekonomiczne rozwiązanie w porównaniu do tynków gotowych"
    ],
    warnings: [
      "Wymaga dokładnego wymieszania z wodą w odpowiednich proporcjach",
      "Tynk mineralny jest nasiąkliwy – bezwzględnie wymaga pomalowania farbą elewacyjną (np. silikonową, silikatową)",
      "Chronić przed szybkim wysychaniem (słońce, wiatr) podczas wiązania",
      "Aplikować w temperaturach od +5°C do +25°C"
    ],
    faq: [
      { q: "Czy tynk mineralny weber.pas MA jest barwiony w masie?", a: "Nie, tynk ten jest produkowany w kolorze białym lub szarym. Ostateczny kolor elewacji uzyskuje się poprzez pomalowanie tynku odpowiednią farbą elewacyjną." },
      { q: "Jaką farbą pomalować tynk mineralny?", a: "Aby zachować wysoką paroprzepuszczalność tynku, zaleca się stosowanie farb silikonowych, silikatowych lub silikonowo-silikatowych." },
      { q: "Czy tynk mineralny można stosować na styropian?", a: "Tak, tynk mineralny weber.pas MA może być stosowany w systemach ociepleń opartych zarówno na wełnie mineralnej, jak i na styropianie." }
    ]
  }
};

for (const [id, data] of Object.entries(seoData)) {
  const productRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?)(?=id:\\s*"p\\d+"|$)`);
  const match = content.match(productRegex);
  
  if (match) {
    let productBlock = match[1];
    
    productBlock = productBlock.replace(/shortDescription:\s*".*?",/, `shortDescription: ${JSON.stringify(data.shortDescription)},`);
    productBlock = productBlock.replace(/description:\s*".*?",/, `description: ${JSON.stringify(data.description)},`);
    productBlock = productBlock.replace(/application:\s*".*?",/, `application: ${JSON.stringify(data.application)},`);
    
    if (!productBlock.includes('seoDescription:')) {
      const insertPos = productBlock.lastIndexOf('},');
      if (insertPos !== -1) {
        const seoFields = `
    seoDescription: ${JSON.stringify(data.seoDescription)},
    advantages: ${JSON.stringify(data.advantages)},
    warnings: ${JSON.stringify(data.warnings)},
    faq: ${JSON.stringify(data.faq)},
  `;
        productBlock = productBlock.substring(0, insertPos) + seoFields + productBlock.substring(insertPos);
      }
    } else {
      productBlock = productBlock.replace(/seoDescription:\s*".*?",/, `seoDescription: ${JSON.stringify(data.seoDescription)},`);
      productBlock = productBlock.replace(/advantages:\s*\[[\s\S]*?\],/, `advantages: ${JSON.stringify(data.advantages)},`);
      productBlock = productBlock.replace(/warnings:\s*\[[\s\S]*?\],/, `warnings: ${JSON.stringify(data.warnings)},`);
      productBlock = productBlock.replace(/faq:\s*\[[\s\S]*?\],/, `faq: ${JSON.stringify(data.faq)},`);
    }
    
    content = content.replace(match[1], productBlock);
  }
}

fs.writeFileSync(filePath, content);
console.log("Zaktualizowano p006 i p012");
