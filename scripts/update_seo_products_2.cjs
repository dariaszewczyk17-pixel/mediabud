const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const seoData = {
  "p015": {
    shortDescription: "Klej do płytek Ceresit CM 11 Plus to elastyczna zaprawa klejąca do gresu i ceramiki, wzbogacona włóknami.",
    description: "Ceresit CM 11 Plus to ulepszona, elastyczna zaprawa klejąca przeznaczona do mocowania płytek gresowych, ceramicznych (glazura, terakota) oraz z kamienia naturalnego (niewrażliwego na przebarwienia). Dzięki formule wzbogaconej specjalnymi włóknami, klej charakteryzuje się zwiększoną przyczepnością i elastycznością (klasa C1TE). Doskonale sprawdza się na podłożach odkształcalnych, takich jak płyty gipsowo-kartonowe, hydroizolacje, a także na ogrzewaniu podłogowym. Zapewnia stabilne mocowanie płytek o formacie do 60x60 cm, zarówno wewnątrz, jak i na zewnątrz budynków.",
    seoDescription: "Wybierz sprawdzony klej do płytek Ceresit CM 11 Plus dostępny w hurtowni Media Bud Lublin. To idealne rozwiązanie do łazienek, kuchni, na balkony i tarasy. Formuła z włóknami gwarantuje trwałość i bezpieczeństwo montażu nawet na trudnych podłożach. Szukasz innych produktów chemii budowlanej? Sprawdź naszą pełną ofertę w kategorii [Chemia budowlana](/kategoria/chemia-budowlana) oraz produkty marki [Ceresit](/marki/ceresit). Skorzystaj z naszego [kalkulatora kleju do płytek](/kalkulator/klej-do-plytek), aby precyzyjnie oszacować potrzebną ilość materiału na Twój remont.",
    application: "Mocowanie płytek ceramicznych (glazura, terakota, gres) oraz kamiennych na podłożach odkształcalnych i nieodkształcalnych. Do stosowania wewnątrz i na zewnątrz budynków. Odpowiedni na ogrzewanie podłogowe, płyty g-k, OSB, powłoki hydroizolacyjne (np. Ceresit CR 65, CL 51). Maksymalny format płytek: 60x60 cm.",
    advantages: [
      "Wzmocniony włóknami – wyższa elastyczność i przyczepność",
      "Klasa C1TE – zmniejszony spływ, wydłużony czas otwarty",
      "Idealny na ogrzewanie podłogowe i płyty g-k",
      "Do gresu i ceramiki (format do 60x60 cm)",
      "Wysoka odporność na wilgoć i mróz"
    ],
    warnings: [
      "Nie stosować do płytek marmurowych wrażliwych na przebarwienia (użyć kleju białego)",
      "Na podłożach krytycznych (np. stare płytki, OSB) zaleca się dodanie emulsji elastycznej Ceresit CC 83",
      "Przed klejeniem podłoże musi być odpowiednio zagruntowane (np. Ceresit CT 17)",
      "Przestrzegać proporcji mieszania z wodą podanych na opakowaniu"
    ],
    faq: [
      { q: "Czy Ceresit CM 11 Plus nadaje się na ogrzewanie podłogowe?", a: "Tak, dzięki elastycznej formule wzmocnionej włóknami, klej ten doskonale sprawdza się na jastrychach z ogrzewaniem podłogowym." },
      { q: "Jaki jest maksymalny format płytek dla tego kleju?", a: "Klej CM 11 Plus jest przeznaczony do mocowania płytek o maksymalnym wymiarze 60x60 cm." },
      { q: "Czy mogę użyć tego kleju na zewnątrz, np. na tarasie?", a: "Tak, klej jest mrozoodporny i wodoodporny, nadaje się do stosowania na zewnątrz, jednak na tarasach i balkonach zaleca się stosowanie metody podwójnego smarowania (klej na podłoże i na płytkę)." }
    ]
  },
  "p004": {
    shortDescription: "Dwugęstościowa wełna fasadowa Rockwool Frontrock MAX E do izolacji termicznej i akustycznej ścian zewnętrznych.",
    description: "Rockwool Frontrock MAX E to innowacyjne, dwugęstościowe płyty z wełny skalnej przeznaczone do izolacji termicznej, akustycznej i przeciwpożarowej ścian zewnętrznych w bezspoinowych systemach ociepleń (ETICS). Unikalna struktura płyty składa się z twardej warstwy wierzchniej, która zapewnia doskonałą bazę pod warstwę zbrojoną i tynk, oraz elastycznej warstwy spodniej, która idealnie dopasowuje się do nierówności muru. Wełna skalna jest materiałem niepalnym (klasa A1), paroprzepuszczalnym i odpornym na wilgoć, co gwarantuje trwałość i bezpieczeństwo ocieplenia na lata.",
    seoDescription: "Zadbaj o ciepło i bezpieczeństwo swojego domu z wełną fasadową Rockwool Frontrock MAX E. W Media Bud oferujemy kompleksowe systemy ociepleń z dostawą w Lublinie i regionie. Wełna skalna to nie tylko doskonała izolacja termiczna, ale też najwyższa ochrona przeciwpożarowa i komfort akustyczny. Oblicz potrzebną ilość materiału za pomocą naszego [kalkulatora izolacji](/kalkulator/styropian-welna) i sprawdź inne produkty w kategorii [Izolacje](/kategoria/izolacje). Wybierając markę [Rockwool](/marki/rockwool), inwestujesz w jakość bez kompromisów.",
    application: "Izolacja termiczna, akustyczna i przeciwpożarowa ścian zewnętrznych murowanych, monolitycznych i prefabrykowanych w systemach ociepleń ETICS (metoda lekka mokra). Stosowana pod tynki mineralne, silikonowe, silikatowe i akrylowe.",
    advantages: [
      "Dwugęstościowa struktura – twarda powierzchnia pod tynk, elastyczny spód",
      "Najwyższa klasa reakcji na ogień (A1) – materiał niepalny",
      "Doskonała izolacyjność termiczna (niski współczynnik lambda)",
      "Wysoka paroprzepuszczalność – zapobiega kondensacji wilgoci w ścianach",
      "Świetna izolacja akustyczna – tłumi hałas z zewnątrz"
    ],
    warnings: [
      "Płyty należy chronić przed zamoczeniem podczas składowania i montażu",
      "Do klejenia i szpachlowania wełny należy używać wyłącznie dedykowanych zapraw klejących do wełny mineralnej",
      "Wymagane jest kołkowanie płyt łącznikami mechanicznymi z trzpieniem stalowym",
      "Podczas cięcia i montażu zaleca się stosowanie odzieży ochronnej, rękawic i maseczek przeciwpyłowych"
    ],
    faq: [
      { q: "Czym różni się wełna dwugęstościowa od zwykłej?", a: "Wełna dwugęstościowa (jak Frontrock MAX E) ma twardszą warstwę zewnętrzną, która jest bardziej odporna na uszkodzenia mechaniczne i ułatwia nakładanie kleju oraz tynku, podczas gdy miększa warstwa wewnętrzna lepiej przylega do nierówności ściany." },
      { q: "Czy wełnę fasadową trzeba kołkować?", a: "Tak, w systemach ETICS płyty z wełny mineralnej zawsze wymagają dodatkowego mocowania mechanicznego (kołkowania) łącznikami z trzpieniem stalowym, niezależnie od wysokości budynku." },
      { q: "Jaki tynk najlepiej zastosować na ocieplenie z wełny?", a: "Na wełnę mineralną należy stosować tynki o wysokiej paroprzepuszczalności, takie jak tynki silikonowe, silikatowe lub mineralne. Należy unikać tynków akrylowych, które mogą blokować dyfuzję pary wodnej." }
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
console.log("Zaktualizowano p015 i p004");
