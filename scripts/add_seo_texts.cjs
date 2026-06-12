const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/pages/CategoryPage.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const newTexts = `  "dachy": {
    title: "Pokrycia dachowe i akcesoria Lublin — papy, blachodachówki",
    content: (
      <>
        <p className="mb-3">Solidny dach to bezpieczeństwo na lata. W hurtowni <strong>Media Bud Lublin</strong> oferujemy kompleksowe rozwiązania dla dachów płaskich i skośnych. Znajdziesz u nas najwyższej jakości <strong>papy termozgrzewalne, gonty bitumiczne, blachodachówki oraz dachówki ceramiczne i betonowe</strong>. Dostarczamy również membrany dachowe, rynny i okna połaciowe.</p>
        <p>Współpracujemy z renomowanymi producentami, takimi jak <strong>Icopal, Swisspor, Fakro czy Pruszyński</strong>. Nasi eksperci pomogą w wyliczeniu zapotrzebowania na materiał i dobiorą optymalny system izolacji dachu. Zapewniamy transport HDS bezpośrednio na plac budowy w całym województwie lubelskim.</p>
      </>
    )
  },
  "narzedzia-i-mocowania": {
    title: "Narzędzia budowlane i zamocowania Lublin — profesjonalny sprzęt",
    content: (
      <>
        <p className="mb-3">Niezawodny sprzęt to podstawa szybkiej i precyzyjnej pracy. W <strong>Media Bud</strong> zaopatrzysz się w profesjonalne <strong>narzędzia ręczne, elektronarzędzia, tarcze tnące, wiertła oraz systemy zamocowań</strong>. Oferujemy kołki rozporowe, kotwy chemiczne, wkręty do drewna i metalu oraz gwoździe niezbędne na każdym etapie budowy i remontu.</p>
        <p>Stawiamy na sprawdzony asortyment od liderów branży, takich jak <strong>Wkręt-met, Koelner, Rawlplug czy Stanley</strong>. Niezależnie czy jesteś profesjonalnym wykonawcą, czy majsterkowiczem, w naszym składzie w Lublinie znajdziesz narzędzia i mocowania, które sprostają najtrudniejszym zadaniom.</p>
      </>
    )
  },
  "stropy-i-sciany": {
    title: "Materiały ścienne i stropy Lublin — pustaki, gazobeton, cegły",
    content: (
      <>
        <p className="mb-3">Budowa solidnych ścian i stropów wymaga materiałów najwyższej klasy. W ofercie <strong>Media Bud Lublin</strong> posiadamy szeroki wybór materiałów ściennych: <strong>beton komórkowy (gazobeton), pustaki ceramiczne, silikaty, cegły klinkierowe oraz systemy stropowe (np. Teriva)</strong>. Zapewniamy materiały do wznoszenia ścian nośnych, działowych i fundamentowych.</p>
        <p>Dostarczamy produkty od uznanych producentów: <strong>H+H, Solbet, Wienerberger, Porotherm czy Ytong</strong>. Gwarantujemy konkurencyjne ceny hurtowe, fachowe doradztwo techniczne przy wyborze technologii murowania oraz sprawną logistykę z rozładunkiem HDS na terenie Lublina i okolic.</p>
      </>
    )
  },
  "sufity-podwieszane": {
    title: "Sufity podwieszane i kasetonowe Lublin — profile, płyty, systemy",
    content: (
      <>
        <p className="mb-3">Nowoczesne sufity podwieszane to idealne rozwiązanie do ukrycia instalacji, poprawy akustyki i estetyki wnętrz. W hurtowni <strong>Media Bud</strong> oferujemy kompletne systemy sufitowe: <strong>sufity kasetonowe (mineralne, metalowe), sufity z płyt G-K, profile nośne, wieszaki oraz wełnę akustyczną</strong>.</p>
        <p>W naszym asortymencie znajdziesz rozwiązania wiodących marek, takich jak <strong>Rockfon, AMF, Armstrong czy Rigips</strong>. Oferujemy systemy dedykowane do biur, szkół, szpitali oraz domów prywatnych. Nasi doradcy w Lublinie pomogą skompletować cały zestaw montażowy, zapewniając szybką realizację zamówienia.</p>
      </>
    )
  },`;

// Szukamy końca obiektu CATEGORY_SEO_TEXTS
const targetString = `  "plytki": {
    title: "Płytki ceramiczne, gres i chemia do glazury",
    content: (
      <>
        <p className="mb-3">Oferujemy szeroki wybór płytek ceramicznych, gresu technicznego i szkliwionego, idealnych do łazienek, kuchni, na tarasy i do obiektów komercyjnych. W Media Bud znajdziesz płytki w różnych formatach, od klasycznych po wielkoformatowe slaby, imitujące drewno, beton czy marmur.</p>
        <p>Pamiętaj, że trwałość posadzki zależy od chemii. Dlatego do płytek od razu dobierzesz u nas <strong>elastyczne kleje (C2TE S1), fugi (cementowe i epoksydowe), hydroizolacje podpłytkowe (folie w płynie) oraz listwy wykończeniowe</strong>. Skorzystaj z <a href="/kalkulator/plytki-ceramiczne" className="text-[#f81828] hover:underline">kalkulatora płytek</a> i <a href="/kalkulator/klej-do-plytek" className="text-[#f81828] hover:underline">kalkulatora kleju</a>, aby zoptymalizować zakupy.</p>
      </>
    )
  }`;

if (content.includes(targetString)) {
  content = content.replace(targetString, targetString + ',\n' + newTexts);
  fs.writeFileSync(filePath, content);
  console.log('Dodano nowe teksty SEO do CategoryPage.tsx');
} else {
  console.log('Nie znaleziono miejsca do wstawienia tekstów.');
}
