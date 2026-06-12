const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const seoData = {
  "p040": {
    shortDescription: "Akumulatorowa szlifierka kątowa Makita DGA 504Z 18V z silnikiem bezszczotkowym (wersja bez akumulatora).",
    description: "Makita DGA 504Z to profesjonalna, akumulatorowa szlifierka kątowa 125 mm zasilana bateriami 18V LXT. Wyposażona w wydajny silnik bezszczotkowy (BLDC), który zapewnia dłuższą pracę na jednym ładowaniu i większą odporność na obciążenia. Szlifierka posiada funkcję anty-restart zabezpieczającą przed przypadkowym uruchomieniem po zamontowaniu akumulatora oraz technologię XPT (podwyższona odporność na pył i wilgoć). Automatyczna kontrola prędkości obrotowej dostosowuje parametry pracy do rodzaju wykonywanego zadania. Wersja 'Z' dostarczana jest bez akumulatorów i ładowarki.",
    seoDescription: "Niezawodna szlifierka kątowa Makita DGA 504Z to niezbędne narzędzie dla każdego profesjonalisty. W Media Bud Lublin oferujemy szeroki wybór elektronarzędzi w atrakcyjnych cenach. Silnik bezszczotkowy i zasilanie akumulatorowe 18V LXT zapewniają mobilność i moc potrzebną do najcięższych prac. Sprawdź naszą ofertę w kategorii [Narzędzia i mocowania](/kategoria/narzedzia-i-mocowania) oraz inne produkty marki [Makita](/marki/makita). Pamiętaj, że wersja Z nie zawiera akumulatora – dobierz odpowiednie baterie z naszej oferty.",
    application: "Cięcie, szlifowanie i szczotkowanie materiałów metalowych i kamiennych bez użycia wody. Idealna do prac budowlanych, instalacyjnych, dekarskich oraz w warsztatach, gdzie wymagana jest mobilność i brak kabla zasilającego.",
    advantages: [
      "Wydajny i bezawaryjny silnik bezszczotkowy (BLDC)",
      "Technologia XPT – podwyższona odporność na pył i wilgoć",
      "Funkcja anty-restart (zabezpieczenie przed przypadkowym uruchomieniem)",
      "Automatyczna kontrola prędkości obrotowej w zależności od obciążenia",
      "Wąska obudowa silnika zapewniająca pewny i wygodny chwyt"
    ],
    warnings: [
      "Wersja Z – dostarczana bez akumulatorów, ładowarki i walizki",
      "Zawsze używaj odpowiednich osłon tarczy i okularów ochronnych",
      "Nie stosować do cięcia materiałów zawierających azbest",
      "Przed wymianą tarczy upewnij się, że akumulator jest odłączony"
    ],
    faq: [
      { q: "Jakie akumulatory pasują do szlifierki Makita DGA 504Z?", a: "Szlifierka jest kompatybilna ze wszystkimi akumulatorami Makita z serii 18V LXT (np. BL1830, BL1840, BL1850, BL1860)." },
      { q: "Co oznacza silnik bezszczotkowy (BLDC)?", a: "Silnik bezszczotkowy nie posiada szczotek węglowych, co eliminuje tarcie i iskrzenie. Dzięki temu silnik jest bardziej wydajny, mniej się nagrzewa i pozwala na dłuższą pracę na jednym ładowaniu akumulatora." },
      { q: "Czy szlifierka ma regulację obrotów?", a: "Model DGA 504 posiada automatyczną kontrolę prędkości obrotowej (Automatic Speed Control), która sama dostosowuje prędkość i moment obrotowy podczas pracy, ale nie posiada ręcznego pokrętła do ustawiania stałych obrotów." }
    ]
  },
  "p047": {
    shortDescription: "Gotowy do użycia tynk akrylowy weber.pas AR3 o strukturze baranka, odporny na uszkodzenia mechaniczne.",
    description: "Weber.pas AR3 to cienkowarstwowy, gotowy do użycia tynk akrylowy w formie pasty. Przeznaczony jest do wykonywania dekoracyjnych wypraw tynkarskich na zewnątrz budynków. Dzięki spoiwu na bazie żywic akrylowych, tynk charakteryzuje się bardzo wysoką elastycznością, odpornością na uszkodzenia mechaniczne oraz intensywnymi, trwałymi kolorami. Jest to doskonały wybór do systemów ociepleń opartych na styropianie (EPS). Produkt zawiera powłokowe zabezpieczenie przed rozwojem mikroorganizmów (alg i grzybów).",
    seoDescription: "Szukasz trwałego tynku w intensywnym kolorze? Tynk akrylowy weber.pas AR3 to doskonały wybór na elewacje ocieplane styropianem. W hurtowni Media Bud w Lublinie oferujemy mieszanie tynków Weber od ręki, w setkach kolorów. Tynk akrylowy to gwarancja wysokiej odporności na uderzenia i zmywanie. Oblicz potrzebną ilość materiału w naszym [kalkulatorze tynku](/kalkulator/tynk-elewacyjny) i sprawdź pełną ofertę w kategorii [Tynki i elewacje](/kategoria/tynki-i-elewacje).",
    application: "Wykonywanie barwnych, cienkowarstwowych wypraw tynkarskich w systemach ociepleń ETICS opartych wyłącznie na styropianie (EPS). Może być również stosowany na tradycyjnych tynkach cementowych i podłożach betonowych. Aplikacja ręczna lub maszynowa.",
    advantages: [
      "Wysoka odporność na uszkodzenia mechaniczne i uderzenia",
      "Bardzo duża elastyczność powłoki",
      "Możliwość uzyskania bardzo intensywnych i ciemnych kolorów",
      "Zabezpieczenie przed rozwojem alg i grzybów",
      "Gotowy do użycia (wystarczy przemieszać)"
    ],
    warnings: [
      "Niska paroprzepuszczalność – NIE STOSOWAĆ na ociepleniach z wełny mineralnej",
      "Nie stosować na zawilgocone podłoża",
      "Chronić przed bezpośrednim nasłonecznieniem i deszczem podczas aplikacji",
      "Przed nałożeniem tynku podłoże musi być zagruntowane płynem weber.prim compact"
    ],
    faq: [
      { q: "Czy tynk akrylowy można położyć na wełnę mineralną?", a: "Nie, tynki akrylowe mają bardzo niską paroprzepuszczalność i zablokowałyby oddychanie wełny mineralnej, co mogłoby prowadzić do kondensacji wilgoci. Na wełnę należy stosować tynki silikonowe, silikatowe lub mineralne." },
      { q: "Czy tynk akrylowy można myć myjką ciśnieniową?", a: "Tak, tynki akrylowe są bardzo odporne na zmywanie i uszkodzenia mechaniczne, dlatego można je ostrożnie myć myjką ciśnieniową (z zachowaniem odpowiedniej odległości i ciśnienia)." },
      { q: "Czym różni się tynk akrylowy od silikonowego?", a: "Tynk akrylowy jest bardziej elastyczny i odporny na uderzenia, pozwala też na uzyskanie ciemniejszych kolorów. Tynk silikonowy jest z kolei paroprzepuszczalny i posiada właściwości samoczyszczące (odporność na brud)." }
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
console.log("Zaktualizowano p040 i p047");
