const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const seoData = {
  "p022": {
    shortDescription: "Profil główny CD 60/27 Knauf do budowy sufitów podwieszanych i okładzin ściennych z płyt g-k.",
    description: "Profil CD 60/27 Knauf to podstawowy element konstrukcyjny przeznaczony do budowy rusztów pod sufity podwieszane, okładziny ścienne oraz zabudowy poddaszy w systemach suchej zabudowy. Wykonany z wysokiej jakości blachy stalowej ocynkowanej, charakteryzuje się dużą sztywnością i odpornością na korozję. Specjalne ryflowanie powierzchni profilu zwiększa jego wytrzymałość i ułatwia wkręcanie wkrętów. Profil CD współpracuje z profilami przyściennymi UD 27 oraz szeroką gamą akcesoriów montażowych (wieszaki, łączniki).",
    seoDescription: "Solidna konstrukcja to podstawa każdego sufitu podwieszanego. Wybierz oryginalne profile CD 60/27 marki Knauf, dostępne od ręki w hurtowni Media Bud Lublin. Gwarantują one bezpieczeństwo, stabilność i łatwość montażu płyt gipsowo-kartonowych. Skompletuj cały system suchej zabudowy – sprawdź naszą ofertę w kategorii [Sucha zabudowa](/kategoria/sucha-zabudowa) oraz inne produkty [Knauf](/marki/knauf). Zapewniamy transport dłużycowy na terenie całego województwa lubelskiego.",
    application: "Wykonywanie konstrukcji nośnych (rusztów) pod sufity podwieszane, okładziny sufitowe, okładziny ścienne oraz zabudowy poddaszy z płyt gipsowo-kartonowych. Stosowany wewnątrz budynków.",
    advantages: [
      "Wysoka sztywność i nośność konstrukcji",
      "Zabezpieczenie antykorozyjne (powłoka cynkowa)",
      "Ryflowana powierzchnia ułatwiająca montaż wkrętów",
      "Kompatybilność z pełnym systemem akcesoriów Knauf",
      "Gwarancja bezpieczeństwa systemu suchej zabudowy"
    ],
    warnings: [
      "Profile należy ciąć nożycami do blachy (nie używać szlifierek kątowych, które niszczą powłokę cynkową)",
      "Przechowywać w suchych warunkach, chronić przed wilgocią przed zamontowaniem",
      "Rozstaw profili musi być zgodny z wytycznymi systemu suchej zabudowy (zazwyczaj co 40 cm lub 60 cm)"
    ],
    faq: [
      { q: "Czym ciąć profile do suchej zabudowy?", a: "Profile stalowe należy ciąć wyłącznie ręcznymi lub elektrycznymi nożycami do blachy. Użycie szlifierki kątowej (tzw. gumówki) powoduje spalenie warstwy ocynku i prowadzi do korozji." },
      { q: "Jaki jest standardowy rozstaw profili CD na suficie?", a: "W standardowych sufitach podwieszanych jednowarstwowych, profile główne CD rozstawia się co 100-120 cm, a profile nośne (do których kręci się płyty) co 40 cm." },
      { q: "Czy profil CD można stosować na zewnątrz?", a: "Nie, standardowe profile ocynkowane są przeznaczone wyłącznie do stosowania wewnątrz budynków w środowiskach o kategorii korozyjności C1 i C2." }
    ]
  },
  "p013": {
    shortDescription: "Gotowa zaprawa murarska Baumit MG 5 do wznoszenia murów z cegieł, pustaków i bloczków.",
    description: "Baumit MG 5 to fabrycznie przygotowana, sucha mieszanka cementowo-wapienna przeznaczona do tradycyjnego murowania. Charakteryzuje się wytrzymałością na ściskanie klasy M5. Jest to uniwersalna zaprawa, która doskonale sprawdza się przy wznoszeniu ścian nośnych, działowych oraz osłonowych z różnego rodzaju elementów murowych: cegieł pełnych i dziurawek, pustaków ceramicznych, bloczków betonowych i silikatowych. Zapewnia wysoką przyczepność, plastyczność i wygodę pracy.",
    seoDescription: "Trwałe mury wymagają solidnej zaprawy. Baumit MG 5 to uniwersalna zaprawa murarska, która sprawdzi się na każdej budowie. W Media Bud Lublin oferujemy ten produkt w konkurencyjnych cenach z możliwością dostawy HDS. Niezależnie od tego, czy murujesz z ceramiki, czy silikatów, zaprawa Baumit zapewni odpowiednią wytrzymałość. Sprawdź również inne produkty w kategorii [Stropy i ściany](/kategoria/stropy-i-sciany) oraz pełną ofertę marki [Baumit](/marki/baumit).",
    application: "Murowanie ścian nośnych, działowych, osłonowych i fundamentowych z cegieł, pustaków ceramicznych, bloczków betonowych, silikatowych i z betonu komórkowego. Do stosowania wewnątrz i na zewnątrz budynków.",
    advantages: [
      "Wytrzymałość na ściskanie klasy M5",
      "Wysoka plastyczność i łatwość obróbki",
      "Dobra przyczepność do elementów murowych",
      "Uniwersalne zastosowanie (do różnych materiałów)",
      "Mrozoodporna i wodoodporna po związaniu"
    ],
    warnings: [
      "Nie stosować do murowania na cienką spoinę (do tego służą zaprawy cienkowarstwowe)",
      "Elementy murowe przed murowaniem powinny być czyste i wolne od kurzu",
      "Wyschnięte i mocno chłonne elementy (np. beton komórkowy) zaleca się zwilżyć wodą przed murowaniem",
      "Prace prowadzić w temperaturze od +5°C do +30°C"
    ],
    faq: [
      { q: "Jaka jest wydajność zaprawy Baumit MG 5?", a: "Z jednego worka 25 kg uzyskuje się około 16 litrów gotowej zaprawy. Zużycie zależy od grubości muru i rodzaju elementów murowych." },
      { q: "Czy zaprawę MG 5 można stosować do klinkieru?", a: "Do murowania cegieł klinkierowych zaleca się stosowanie specjalnych zapraw do klinkieru (z dodatkiem trasu), które minimalizują ryzyko powstawania wykwitów." },
      { q: "Czy zaprawa nadaje się do tynkowania?", a: "Nie, zaprawa murarska ma inny skład i uziarnienie niż tynk. Do tynkowania należy używać dedykowanych zapraw tynkarskich." }
    ]
  },
  "p024": {
    shortDescription: "Klasyczna, biała płytka ścienna o błyszczącym wykończeniu. Format 25x40 cm, idealna do łazienek i kuchni.",
    description: "Płytka ścienna ceramiczna Biała Połysk to uniwersalne i ponadczasowe rozwiązanie do wykończenia wnętrz. Jej gładka, błyszcząca powierzchnia doskonale odbija światło, optycznie powiększając i rozjaśniając pomieszczenie. Format 25x40 cm jest łatwy w montażu i świetnie sprawdza się zarówno w małych, jak i dużych łazienkach oraz kuchniach. Płytka jest łatwa do utrzymania w czystości i odporna na działanie domowych środków chemicznych. Stanowi doskonałą bazę do łączenia z dekorami, mozaikami lub płytkami drewnopodobnymi.",
    seoDescription: "Białe płytki to klasyka, która nigdy nie wychodzi z mody. Płytka ścienna Biała Połysk 25x40 cm to idealny wybór do jasnej i przestronnej łazienki lub kuchni. W Media Bud Lublin oferujemy szeroki wybór ceramiki w najlepszych cenach. Pamiętaj o dobraniu odpowiedniej chemii – sprawdź nasz [kalkulator kleju do płytek](/kalkulator/klej-do-plytek) oraz ofertę w kategorii [Płytki](/kategoria/plytki). Zapewniamy bezpieczny transport materiałów delikatnych.",
    application: "Wykładanie ścian wewnątrz pomieszczeń: łazienki, toalety, kuchnie, pralnie, pomieszczenia gospodarcze.",
    advantages: [
      "Optycznie powiększa i rozjaśnia wnętrze",
      "Łatwa do utrzymania w czystości (gładka powierzchnia)",
      "Uniwersalny design pasujący do każdego stylu",
      "Odporna na plamy i domowe środki czystości",
      "Łatwa w obróbce i cięciu"
    ],
    warnings: [
      "Płytka przeznaczona wyłącznie na ściany (nie stosować na podłogi)",
      "Tylko do użytku wewnętrznego (nie jest mrozoodporna)",
      "Do montażu używać odpowiednich klejów do płytek ceramicznych (np. klasy C1T lub C2T)"
    ],
    faq: [
      { q: "Czy płytki ścienne można kłaść na podłogę?", a: "Nie, płytki ścienne mają niższą wytrzymałość na ścieranie i obciążenia mechaniczne, a ich szkliwo może być śliskie. Na podłogi należy stosować gres lub terakotę." },
      { q: "Jaką fugę zastosować do białych płytek?", a: "Wybór zależy od efektu: biała fuga stworzy jednolitą powierzchnię, natomiast szara lub czarna podkreśli format płytek i będzie łatwiejsza w utrzymaniu czystości." },
      { q: "Czy płytki błyszczące są trudne w czyszczeniu?", a: "Wręcz przeciwnie, gładkie, błyszczące szkliwo jest bardzo łatwe do umycia, ponieważ brud nie wnika w pory materiału." }
    ]
  },
  "p039": {
    shortDescription: "Bloczek silikatowy Silka E24 o wysokiej wytrzymałości i izolacyjności akustycznej do wznoszenia ścian nośnych.",
    description: "Silka E24 to wapienno-piaskowy bloczek murowy przeznaczony do wznoszenia ścian nośnych, zarówno zewnętrznych (wymagających ocieplenia), jak i wewnętrznych. Silikaty charakteryzują się bardzo dużą gęstością, co przekłada się na ich wyjątkową wytrzymałość na ściskanie oraz doskonałą izolacyjność akustyczną. Ściany z bloków Silka E24 świetnie tłumią hałas i akumulują ciepło, stabilizując temperaturę wewnątrz budynku. Bloczki posiadają profilowanie na pióro i wpust oraz uchwyty montażowe, co przyspiesza prace murarskie.",
    seoDescription: "Budujesz dom i zależy Ci na ciszy oraz solidnej konstrukcji? Bloczki silikatowe Silka E24 to materiał, który spełni Twoje oczekiwania. W hurtowni Media Bud w Lublinie oferujemy pełny system budowlany Silka z dostawą HDS prosto na plac budowy. Silikaty to gwarancja doskonałej akustyki i wytrzymałości. Sprawdź naszą ofertę w kategorii [Stropy i ściany](/kategoria/stropy-i-sciany) oraz inne produkty marki [Xella](/marki/xella).",
    application: "Wznoszenie ścian nośnych zewnętrznych (z ociepleniem) i wewnętrznych, ścian akustycznych oraz ścian oddzielenia pożarowego w budownictwie mieszkaniowym, użyteczności publicznej i przemysłowym.",
    advantages: [
      "Doskonała izolacyjność akustyczna (tłumienie hałasu)",
      "Bardzo wysoka wytrzymałość na ściskanie",
      "Wysoka zdolność akumulacji ciepła (stabilny mikroklimat)",
      "Najwyższa klasa reakcji na ogień (A1) – materiał niepalny",
      "Szybki montaż dzięki profilowaniu pióro-wpust"
    ],
    warnings: [
      "Bloczki są ciężkie – wymagają odpowiedniej organizacji pracy na budowie",
      "Murowanie na cienką spoinę wymaga bardzo równego ułożenia pierwszej warstwy",
      "Ściany zewnętrzne z silikatów bezwzględnie wymagają ocieplenia (np. styropianem lub wełną)"
    ],
    faq: [
      { q: "Czym murować bloczki Silka?", a: "Bloczki Silka E24 z profilowaniem pióro-wpust muruje się na cienką spoinę (1-3 mm) przy użyciu dedykowanej zaprawy klejącej do silikatów. Spoin pionowych zazwyczaj się nie wypełnia." },
      { q: "Czy ściany z silikatów trzeba ocieplać?", a: "Tak, silikaty mają słabą izolacyjność termiczną. Ściany zewnętrzne z bloków Silka E24 muszą być ocieplone warstwą izolacji (np. 15-20 cm styropianu), aby spełnić normy cieplne." },
      { q: "Dlaczego silikaty są dobre pod względem akustyki?", a: "Zgodnie z prawem masy, im cięższa przegroda, tym lepiej tłumi dźwięki. Silikaty mają bardzo dużą gęstość (ok. 1400-1800 kg/m³), co czyni je jednym z najlepszych materiałów akustycznych." }
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
console.log("Zaktualizowano p022, p013, p024, p039");
