const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const seoData = {
  "p007": {
    shortDescription: "Sztywna powłoka hydroizolacyjna Ceresit CR 65 do uszczelniania budowli przed wilgocią i wodą.",
    description: "Ceresit CR 65 to jednoskładnikowa, mineralna zaprawa uszczelniająca przeznaczona do wykonywania sztywnych powłok hydroizolacyjnych. Skutecznie chroni przed wilgocią gruntową, wodą bez ciśnienia oraz wodą pod ciśnieniem. Produkt jest paroprzepuszczalny i mrozoodporny, co pozwala na jego stosowanie zarówno wewnątrz, jak i na zewnątrz budynków. Idealnie nadaje się do uszczelniania fundamentów, piwnic, cokołów, a także zbiorników na wodę (w tym wodę pitną) i basenów o głębokości do 5 metrów.",
    seoDescription: "Zabezpiecz swoje fundamenty i piwnice przed wodą z niezawodną hydroizolacją Ceresit CR 65. W Media Bud Lublin oferujemy ten sprawdzony produkt w atrakcyjnych cenach. Sztywna powłoka CR 65 to gwarancja suchych murów i ochrony przed wilgocią na lata. Sprawdź również inne rozwiązania w kategorii [Izolacje](/kategoria/izolacje) oraz pełną gamę produktów [Ceresit](/marki/ceresit). Skorzystaj z naszego [kalkulatora izolacji fundamentów](/kalkulator/izolacja-fundamentow), aby zaplanować kompleksowe zabezpieczenie budynku.",
    application: "Wykonywanie powłok przeciwwilgociowych i przeciwwodnych na nieodkształcalnych podłożach mineralnych (beton, mury z cegły pełnej, tynki cementowe). Stosowana do uszczelniania fundamentów, ścian piwnic od wewnątrz i zewnątrz, cokołów, szybów wind, a także zbiorników na wodę pitną i basenów.",
    advantages: [
      "Skuteczna ochrona przed wodą pod ciśnieniem (do 5m słupa wody)",
      "Wysoka paroprzepuszczalność – pozwala na wysychanie wilgotnych murów",
      "Mrozoodporna i odporna na starzenie",
      "Dopuszczona do kontaktu z wodą pitną",
      "Możliwość aplikacji pędzlem, pacą lub natryskiem"
    ],
    warnings: [
      "Tworzy powłokę sztywną – nie stosować na podłożach odkształcalnych i narażonych na pęknięcia (w takich przypadkach użyć elastycznej powłoki np. CR 166)",
      "Podłoże musi być równe, nośne i wolne od substancji antyadhezyjnych",
      "Przed aplikacją podłoże należy obficie zwilżyć wodą (do stanu matowo-wilgotnego)",
      "Chronić świeżą powłokę przed zbyt szybkim wysychaniem, słońcem i mrozem"
    ],
    faq: [
      { q: "Czy na powłokę Ceresit CR 65 można przyklejać płytki?", a: "Tak, po całkowitym wyschnięciu powłoki (zazwyczaj po 3 dniach) można bezpośrednio na nią przyklejać płytki ceramiczne przy użyciu elastycznych klejów (np. Ceresit CM 16, CM 17)." },
      { q: "Ile warstw hydroizolacji należy nałożyć?", a: "Wymagane jest nałożenie minimum dwóch warstw. W przypadku izolacji przeciwwodnej (woda pod ciśnieniem) zaleca się nałożenie trzech warstw." },
      { q: "Czy CR 65 nadaje się na taras?", a: "Nie, na tarasy i balkony, które są narażone na duże odkształcenia termiczne, należy stosować elastyczne powłoki hydroizolacyjne, takie jak Ceresit CR 166." }
    ]
  },
  "p017": {
    shortDescription: "Wysokiej jakości biała farba wewnętrzna Dulux o jedwabistym, matowym wykończeniu. Odporna na zmywanie.",
    description: "Dulux Jedwabisty Matt to najwyższej jakości emulsyjna farba lateksowa do wnętrz, przeznaczona do dekoracyjnego i ochronnego malowania ścian i sufitów. Tworzy trwałe, jedwabisto-matowe powłoki, które charakteryzują się wysoką odpornością na zmywanie i szorowanie na mokro. Dzięki mikroporowatej strukturze, farba pozwala ścianom \"oddychać\". Doskonale kryje i jest łatwa w aplikacji, nie chlapie podczas malowania. Idealna do salonów, sypialni, korytarzy oraz pomieszczeń biurowych.",
    seoDescription: "Odśwież swoje wnętrza z farbą Dulux Jedwabisty Matt. W hurtowni Media Bud w Lublinie znajdziesz tę farbę w dużych, ekonomicznych opakowaniach 10L. Zapewnia ona doskonałe krycie, eleganckie matowe wykończenie i odporność na zabrudzenia. Szukasz innych kolorów lub farb specjalistycznych? Odwiedź kategorię [Farby i rozpuszczalniki](/kategoria/farby-i-rozpuszczalniki) i poznaj pełną ofertę marki [Dulux](/marki/dulux). Z nami malowanie to czysta przyjemność.",
    application: "Malowanie ścian i sufitów wewnątrz pomieszczeń mieszkalnych, biurowych i użyteczności publicznej. Może być stosowana na tynki cementowo-wapienne, gipsowe, płyty gipsowo-kartonowe, tapety papierowe i z włókna szklanego.",
    advantages: [
      "Wysoka odporność na zmywanie i szorowanie",
      "Doskonałe krycie – często wystarcza jedna lub dwie warstwy",
      "Eleganckie, jedwabisto-matowe wykończenie",
      "Mikroporowata struktura pozwalająca ścianom oddychać",
      "Niski poziom zapachu podczas malowania"
    ],
    warnings: [
      "Przed malowaniem podłoże musi być suche, czyste i odpylone",
      "Świeże tynki można malować dopiero po ich całkowitym wysezonowaniu (zwykle 3-4 tygodnie)",
      "Podłoża silnie chłonne lub pyliste należy wcześniej zagruntować odpowiednim preparatem",
      "Nie malować w temperaturach poniżej +10°C"
    ],
    faq: [
      { q: "Czy farbę Dulux Jedwabisty Matt można zmywać na mokro?", a: "Tak, farba ta tworzy powłokę odporną na delikatne zmywanie wodą z dodatkiem łagodnych detergentów, co ułatwia utrzymanie ścian w czystości." },
      { q: "Ile warstw farby należy nałożyć?", a: "Dla uzyskania optymalnego efektu i pełnego krycia zaleca się nałożenie 2 warstw farby." },
      { q: "Czy farbę można rozcieńczać wodą?", a: "Farba jest gotowa do użycia. W przypadku malowania bardzo chłonnych podłoży, pierwszą warstwę można rozcieńczyć dodatkiem maksymalnie 10% czystej wody." }
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
console.log("Zaktualizowano p007 i p017");
