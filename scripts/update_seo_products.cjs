const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const seoData = {
  "p001": {
    shortDescription: "Gotowy tynk elewacyjny silikonowy o strukturze drapany/kornik, odporny na zabrudzenia i warunki atmosferyczne.",
    description: "Weber.pas DR1 to najwyższej jakości, gotowy do użycia tynk silikonowy przeznaczony do wykonywania cienkowarstwowych wypraw tynkarskich. Dzięki zaawansowanej formule opartej na żywicach silikonowych, produkt charakteryzuje się wyjątkową odpornością na zabrudzenia (efekt samoczyszczenia) oraz wysoką elastycznością, która chroni elewację przed mikropęknięciami. Idealnie sprawdza się w systemach ociepleń ETICS, zarówno na styropianie, jak i wełnie mineralnej. Tynk jest wysoce paroprzepuszczalny, co pozwala ścianom \"oddychać\", a zawarte w nim biocydy skutecznie chronią przed rozwojem alg i grzybów.",
    seoDescription: "Szukasz trwałego i estetycznego wykończenia elewacji? Tynk silikonowy Weber.pas DR1 to rozwiązanie, które łączy w sobie odporność na warunki atmosferyczne z łatwością aplikacji. W hurtowni Media Bud w Lublinie oferujemy ten produkt w szerokiej gamie kolorystycznej z mieszalnika. Wybierając tynk silikonowy Weber, inwestujesz w elewację, która przez lata zachowa swój pierwotny wygląd, nie ulegając zabrudzeniom ani blaknięciu. Sprawdź również nasze [kalkulatory materiałowe](/kalkulator/tynk-elewacyjny), aby dokładnie obliczyć zapotrzebowanie na tynk dla Twojego projektu. Oferujemy szybką dostawę na terenie Lublina i okolic.",
    application: "Wykonywanie barwnych, cienkowarstwowych wypraw tynkarskich na systemach ociepleń opartych na styropianie (EPS) oraz wełnie mineralnej. Może być również stosowany na tradycyjnych tynkach cementowych, cementowo-wapiennych oraz na podłożach betonowych. Przeznaczony do aplikacji ręcznej lub maszynowej.",
    advantages: [
      "Efekt samoczyszczenia – wysoka odporność na zabrudzenia",
      "Wysoka elastyczność – odporność na mikropęknięcia i naprężenia termiczne",
      "Doskonała paroprzepuszczalność – pozwala ścianom oddychać",
      "Zabezpieczenie przed algami i grzybami (zawiera biocydy powłokowe)",
      "Trwałość kolorów i odporność na promieniowanie UV"
    ],
    warnings: [
      "Nie stosować w temperaturach poniżej +5°C oraz powyżej +25°C",
      "Chronić przed bezpośrednim nasłonecznieniem, wiatrem i deszczem podczas aplikacji i wiązania",
      "Przed nałożeniem tynku podłoże musi być zagruntowane odpowiednim płynem gruntującym (np. weber.prim compact)",
      "Nie aplikować na mokre lub zmrożone podłoża"
    ],
    faq: [
      { q: "Czy tynk Weber.pas DR1 można nakładać maszynowo?", a: "Tak, tynk ten jest przystosowany zarówno do aplikacji ręcznej (pacą ze stali nierdzewnej), jak i maszynowej przy użyciu odpowiednich agregatów tynkarskich." },
      { q: "Jak przygotować podłoże przed nałożeniem tynku?", a: "Podłoże musi być nośne, suche, czyste i wolne od substancji zmniejszających przyczepność. Należy je bezwzględnie zagruntować płynem gruntującym pod tynki silikonowe, najlepiej w kolorze zbliżonym do koloru tynku." },
      { q: "Ile schnie tynk silikonowy?", a: "Czas schnięcia zależy od warunków atmosferycznych (temperatura, wilgotność). W optymalnych warunkach (+20°C, 65% wilgotności) tynk jest odporny na deszcz po około 24 godzinach, a pełne utwardzenie następuje po kilku dniach." }
    ]
  },
  "p011": {
    shortDescription: "Wysokiej jakości tynk gipsowy Knauf Goldband do ręcznego nakładania wewnątrz pomieszczeń. Zapewnia gładkie powierzchnie.",
    description: "Knauf Goldband to fabrycznie przygotowana, sucha zaprawa gipsowa przeznaczona do ręcznego wykonywania jednowarstwowych tynków wewnątrz budynków. Produkt ten jest idealny do tynkowania wszelkiego rodzaju podłoży szorstkich, takich jak cegła, beton komórkowy, pustaki ceramiczne czy beton. Dzięki specjalnym dodatkom, tynk Goldband charakteryzuje się doskonałą przyczepnością, plastycznością i łatwością obróbki. Pozwala na uzyskanie gładkich, równych powierzchni, gotowych do malowania lub tapetowania. Reguluje mikroklimat w pomieszczeniach, pochłaniając nadmiar wilgoci i oddając ją, gdy powietrze staje się zbyt suche.",
    seoDescription: "Tynk gipsowy Knauf Goldband to sprawdzony wybór dla profesjonalistów i majsterkowiczów. W Media Bud Lublin znajdziesz ten produkt zawsze w najlepszej cenie. Goldband to gwarancja gładkich ścian i zdrowego mikroklimatu w Twoim domu. Idealnie nadaje się do remontów i wykończeń wnętrz. Zobacz pełną ofertę produktów marki [Knauf](/marki/knauf) w naszym sklepie. Zapewniamy fachowe doradztwo i transport materiałów budowlanych prosto na Twoją budowę w regionie lubelskim.",
    application: "Ręczne tynkowanie ścian i sufitów wewnątrz pomieszczeń o standardowej wilgotności powietrza (w tym kuchnie i łazienki domowe). Stosowany na podłożach z cegły, betonu komórkowego, pustaków ceramicznych, silikatów oraz na szorstkim betonie. Grubość warstwy od 8 mm do 50 mm.",
    advantages: [
      "Tworzy gładkie, równe powierzchnie gotowe do wykończenia",
      "Reguluje wilgotność w pomieszczeniu (oddychający)",
      "Wysoka wydajność i łatwość obróbki",
      "Możliwość nakładania grubych warstw (do 50 mm) w jednym cyklu",
      "Odporny na uderzenia i wbijanie gwoździ"
    ],
    warnings: [
      "Tylko do stosowania wewnątrz budynków",
      "Nie stosować w pomieszczeniach o stale podwyższonej wilgotności (np. baseny, łaźnie publiczne)",
      "Podłoża silnie chłonne (np. beton komórkowy) wymagają wcześniejszego zagruntowania środkiem Knauf Grundiermittel",
      "Podłoża betonowe gładkie wymagają gruntu Knauf Betokontakt"
    ],
    faq: [
      { q: "Czy Knauf Goldband można nakładać maszynowo?", a: "Nie, Goldband jest tynkiem przeznaczonym wyłącznie do nakładania ręcznego. Do aplikacji maszynowej polecamy tynk Knauf MP 75." },
      { q: "Jaka jest minimalna grubość warstwy tynku Goldband?", a: "Minimalna grubość warstwy to 8 mm. W przypadku konieczności nałożenia cieńszej warstwy, należy użyć gładzi gipsowej." },
      { q: "Czy na tynk Goldband można kłaść płytki ceramiczne?", a: "Tak, pod warunkiem, że tynk został nałożony jednowarstwowo, ma grubość minimum 10 mm i nie został zatarty na gładko (powierzchnia musi być szorstka). Przed klejeniem płytek tynk należy zagruntować." }
    ]
  }
};

for (const [id, data] of Object.entries(seoData)) {
  const productRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?)(?=id:\\s*"p\\d+"|$)`);
  const match = content.match(productRegex);
  
  if (match) {
    let productBlock = match[1];
    
    // Replace shortDescription
    productBlock = productBlock.replace(/shortDescription:\s*".*?",/, `shortDescription: ${JSON.stringify(data.shortDescription)},`);
    
    // Replace description
    productBlock = productBlock.replace(/description:\s*".*?",/, `description: ${JSON.stringify(data.description)},`);
    
    // Replace application
    productBlock = productBlock.replace(/application:\s*".*?",/, `application: ${JSON.stringify(data.application)},`);
    
    // Add SEO fields if they don't exist
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
      // Update existing SEO fields
      productBlock = productBlock.replace(/seoDescription:\s*".*?",/, `seoDescription: ${JSON.stringify(data.seoDescription)},`);
      productBlock = productBlock.replace(/advantages:\s*\[[\s\S]*?\],/, `advantages: ${JSON.stringify(data.advantages)},`);
      productBlock = productBlock.replace(/warnings:\s*\[[\s\S]*?\],/, `warnings: ${JSON.stringify(data.warnings)},`);
      productBlock = productBlock.replace(/faq:\s*\[[\s\S]*?\],/, `faq: ${JSON.stringify(data.faq)},`);
    }
    
    content = content.replace(match[1], productBlock);
  }
}

fs.writeFileSync(filePath, content);
console.log("Zaktualizowano p001 i p011");
