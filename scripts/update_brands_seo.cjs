const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/brands.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const brandDescriptions = {
  "Weber": "Weber to światowy lider w produkcji innowacyjnych materiałów budowlanych, specjalizujący się w systemach ociepleń (ETICS), tynkach elewacyjnych, zaprawach technicznych oraz hydroizolacjach. W hurtowni Media Bud w Lublinie oferujemy szeroki asortyment produktów Weber, w tym popularne tynki silikonowe i akrylowe, które mieszamy na miejscu w naszej mieszalni. Wybierając chemię budowlaną Weber, inwestujesz w trwałość, odporność na warunki atmosferyczne i najwyższą jakość wykończenia. Zapewniamy fachowe doradztwo techniczne oraz szybką dostawę materiałów na terenie całego województwa lubelskiego.",
  "Knauf": "Knauf to synonim najwyższej jakości w dziedzinie suchej zabudowy i tynków maszynowych. Jako autoryzowany dystrybutor w Lublinie, Media Bud dostarcza kompletne systemy Knauf: od płyt gipsowo-kartonowych, przez profile konstrukcyjne, aż po niezawodne gładzie (np. Multifinish) i tynki gipsowe (Goldband, MP 75). Produkty Knauf gwarantują doskonałą akustykę, ochronę przeciwpożarową i idealnie gładkie powierzchnie. Niezależnie od tego, czy planujesz remont mieszkania, czy dużą inwestycję komercyjną, systemy Knauf zapewnią szybkość montażu i trwałość na lata.",
  "Atlas": "Atlas to najpopularniejsza polska marka chemii budowlanej, ciesząca się zaufaniem milionów wykonawców. W ofercie Media Bud Lublin znajdziesz pełną gamę produktów Atlas: od niezawodnych klejów do płytek (np. Atlas Plus, Geoflex), przez fugi epoksydowe i cementowe, aż po systemy ociepleń i wylewki samopoziomujące. Produkty Atlas to gwarancja innowacyjności, łatwości aplikacji i trwałości. Zapewniamy stałą dostępność asortymentu w naszym magazynie oraz konkurencyjne ceny dla stałych klientów i firm wykonawczych.",
  "Ceresit": "Ceresit, marka należąca do grupy Henkel, to ekspert w dziedzinie profesjonalnej chemii budowlanej. W Media Bud oferujemy zaawansowane rozwiązania Ceresit, w tym elastyczne kleje do płytek (CM 11, CM 16, CM 17), niezawodne systemy hydroizolacji (CR 65, CR 166) oraz wysokiej jakości tynki i farby elewacyjne. Produkty Ceresit są projektowane z myślą o najtrudniejszych warunkach eksploatacyjnych, zapewniając bezpieczeństwo i trwałość na tarasach, balkonach, w łazienkach oraz na elewacjach. Skontaktuj się z nami, aby dobrać odpowiedni system Ceresit dla Twojego projektu.",
  "Mapei": "Mapei to globalny lider w produkcji klejów, uszczelniaczy i produktów chemicznych dla budownictwa. W hurtowni Media Bud w Lublinie znajdziesz szeroki wybór rozwiązań Mapei, idealnych do montażu ceramiki, gresu i kamienia naturalnego. Oferujemy m.in. elastyczne kleje Adesilex i Keraflex, szybkowiążące fugi Ultracolor Plus oraz profesjonalne systemy hydroizolacji Mapelastic. Wybierając Mapei, stawiasz na zaawansowaną technologię, która gwarantuje trwałość i estetykę wykończenia nawet w najbardziej wymagających warunkach.",
  "Swisspor": "Swisspor to renomowany producent materiałów termoizolacyjnych, znany przede wszystkim z wysokiej jakości styropianu (EPS) oraz polistyrenu ekstrudowanego (XPS). W Media Bud dostarczamy kompleksowe rozwiązania izolacyjne Swisspor dla fundamentów, podłóg, fasad i dachów. Styropian Swisspor (np. Lambda White, EPS 100) charakteryzuje się doskonałymi parametrami cieplnymi i stabilnością wymiarową. Zapewniamy transport bezpośrednio na plac budowy w regionie lubelskim. Oblicz zapotrzebowanie w naszym kalkulatorze i zainwestuj w energooszczędność swojego domu.",
  "Rockwool": "Rockwool to światowy lider w produkcji izolacji z wełny skalnej. W ofercie Media Bud Lublin znajdziesz niepalną wełnę fasadową (np. Frontrock MAX E), wełnę do poddaszy (Toprock) oraz izolacje akustyczne ścian działowych. Wełna skalna Rockwool to nie tylko doskonała izolacja termiczna, ale przede wszystkim najwyższe bezpieczeństwo pożarowe (klasa A1) i komfort akustyczny. Produkty te są paroprzepuszczalne, co pozwala budynkom \"oddychać\" i zapobiega powstawaniu pleśni. Wybierz Rockwool dla trwałego i bezpiecznego ocieplenia.",
  "Isover": "Isover, marka grupy Saint-Gobain, to ekspert w dziedzinie izolacji z wełny szklanej i skalnej. W Media Bud oferujemy innowacyjne rozwiązania Isover do ocieplania dachów skośnych, poddaszy, ścian działowych i fasad. Wełna szklana Isover (np. Super-Mata, Profit-Mata) wyróżnia się doskonałym współczynnikiem przewodzenia ciepła (lambda), sprężystością i łatwością montażu. Zapewniamy fachowe doradztwo w doborze odpowiedniej grubości i rodzaju izolacji, aby Twój dom spełniał najwyższe standardy energooszczędności.",
  "Rigips": "Rigips to pionier i lider w dziedzinie systemów suchej zabudowy wnętrz. W hurtowni Media Bud w Lublinie dostarczamy kompletne rozwiązania Rigips: płyty gipsowo-kartonowe (standardowe, ogniochronne, wodoodporne), profile konstrukcyjne, masy szpachlowe oraz akcesoria montażowe. Systemy Rigips pozwalają na szybkie i czyste wznoszenie ścian działowych, sufitów podwieszanych i zabudowy poddaszy, gwarantując przy tym doskonałą izolacyjność akustyczną i bezpieczeństwo pożarowe. Zbuduj swoje wnętrze z profesjonalistami.",
  "Siniat": "Siniat to uznany producent innowacyjnych systemów suchej zabudowy, oferujący płyty gipsowo-kartonowe, profile i masy szpachlowe najwyższej jakości. W Media Bud znajdziesz rozwiązania Siniat dedykowane zarówno do standardowych wykończeń, jak i do pomieszczeń o podwyższonych wymaganiach (np. płyty Nida Woda, Nida Ogień). Produkty Siniat charakteryzują się łatwością obróbki i trwałością. Zapewniamy kompleksową obsługę inwestycji budowlanych w Lublinie i okolicach, dostarczając pełne systemy Siniat prosto na budowę."
};

// Szukamy definicji marek w pliku
// Format: { name: "Weber", ... }
for (const [brandName, description] of Object.entries(brandDescriptions)) {
  const regex = new RegExp(`(\\{\\s*name:\\s*"${brandName}"[\\s\\S]*?\\})`, 'g');
  
  content = content.replace(regex, (match) => {
    // Jeśli już ma description, podmieniamy
    if (match.includes('description:')) {
      return match.replace(/description:\s*".*?"/, `description: ${JSON.stringify(description)}`);
    } else {
      // Jeśli nie ma, dodajemy przed zamykającą klamrą
      const insertPos = match.lastIndexOf('}');
      return match.substring(0, insertPos) + `  description: ${JSON.stringify(description)},\n  ` + match.substring(insertPos);
    }
  });
}

fs.writeFileSync(filePath, content);
console.log("Zaktualizowano opisy dla TOP 10 marek w brands.ts");
