const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/blog.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const faqsToAdd = [
  {
    id: "b012",
    faq: `    faq: [
      { q: 'Jaki tynk jest lepszy: silikonowy czy akrylowy?', a: 'Tynk silikonowy jest znacznie lepszy. Jest paroprzepuszczalny (oddychający), wysoce elastyczny i posiada właściwości samoczyszczące (brud spływa z deszczem). Tynk akrylowy jest tańszy, ale nie oddycha i szybciej się brudzi, dlatego nie nadaje się na ocieplenie z wełny mineralnej.' },
      { q: 'Czy tynk silikonowy można kłaść na styropian?', a: 'Tak, tynk silikonowy jest uniwersalny i doskonale sprawdza się zarówno na systemach ociepleń ze styropianem (EPS), jak i z wełną mineralną. Zapewnia najwyższą trwałość elewacji.' }
    ],`
  },
  {
    id: "b013",
    faq: `    faq: [
      { q: 'Ile kosztuje ocieplenie domu 150 m² w 2026 roku?', a: 'Kompleksowe ocieplenie domu 150 m² (materiały + robocizna) kosztuje średnio od 35 000 zł do 55 000 zł. Sam materiał (styropian grafitowy 20 cm, kleje, siatka, tynk silikonowy) to koszt ok. 15 000 - 22 000 zł. Robocizna wynosi zazwyczaj od 120 do 180 zł za m².' },
      { q: 'Jaka grubość styropianu na elewację w 2026?', a: 'Zgodnie z aktualnymi warunkami technicznymi (WT 2021), aby spełnić normy przenikania ciepła dla ścian zewnętrznych (U ≤ 0,20 W/m²K), zaleca się stosowanie styropianu grafitowego o grubości minimum 15-20 cm lub białego o grubości 20-25 cm.' }
    ],`
  },
  {
    id: "b014",
    faq: `    faq: [
      { q: 'Co jest lepsze: Knauf czy Rigips?', a: 'Obie marki to ścisła czołówka i oferują systemy suchej zabudowy najwyższej jakości. Knauf często wygrywa dostępnością kompletnych systemów i popularnością wśród wykonawców (np. profile, masy szpachlowe Uniflott). Rigips z kolei słynie z innowacyjnych płyt (np. Habito) i świetnych profili Ultrastil. Wybór często zależy od preferencji konkretnego wykonawcy.' },
      { q: 'Czy profile do płyt GK różnych producentów można łączyć?', a: 'Zaleca się stosowanie kompletnych systemów od jednego producenta (płyty, profile, masy, taśmy). Mieszanie elementów różnych marek może skutkować utratą gwarancji systemowej oraz problemami z idealnym dopasowaniem elementów (np. inna grubość blachy w profilach).' }
    ],`
  },
  {
    id: "b015",
    faq: `    faq: [
      { q: 'Jaki klej do styropianu grafitowego?', a: 'Do styropianu grafitowego należy używać wyłącznie dedykowanych klejów o podwyższonej przyczepności (np. z dodatkiem włókien rozproszonych). Styropian grafitowy mocniej nagrzewa się na słońcu, co powoduje naprężenia termiczne, dlatego zwykły klej do białego styropianu może nie utrzymać płyt.' },
      { q: 'Czy klej poliuretanowy (w pianie) jest lepszy od cementowego?', a: 'Klej w pianie (poliuretanowy) znacznie przyspiesza pracę, jest czysty, lekki i ma świetną przyczepność. Wymaga jednak równego podłoża. Klej cementowy jest tańszy i pozwala na niwelowanie większych nierówności ścian (do 1-2 cm). Często stosuje się je zamiennie w zależności od stanu budynku.' }
    ],`
  },
  {
    id: "b017",
    faq: `    faq: [
      { q: 'Ile tynku potrzeba na 1 m² elewacji?', a: 'Zużycie tynku zależy od jego granulacji (grubości ziarna). Dla najpopularniejszego tynku o strukturze "baranka" 1,5 mm zużycie wynosi ok. 2,3 - 2,5 kg/m². Dla ziarna 2,0 mm jest to ok. 2,9 - 3,2 kg/m². Zawsze warto doliczyć ok. 10% zapasu na straty materiałowe.' },
      { q: 'Jak obliczyć powierzchnię elewacji do tynkowania?', a: 'Należy zmierzyć szerokość i wysokość każdej ściany, pomnożyć je przez siebie, a następnie odjąć powierzchnię okien i drzwi. Do uzyskanego wyniku warto dodać powierzchnię glifów (ościeży) okiennych i drzwiowych, które również będą tynkowane.' }
    ],`
  }
];

let updatedCount = 0;

for (const item of faqsToAdd) {
  const postRegex = new RegExp(`(id:\\s*"${item.id}"[\\s\\S]*?)(?=id:\\s*"b\\d+"|$)`);
  const match = content.match(postRegex);
  
  if (match) {
    let postBlock = match[1];
    // Sprawdzamy czy post ma już FAQ
    if (!postBlock.includes('faq: [')) {
      // Szukamy miejsca na wstawienie (przed tags lub na końcu bloku przed przecinkiem)
      if (postBlock.includes('tags: [')) {
        postBlock = postBlock.replace(/(\s+tags:\s*\[.*?\])(,?)/s, `$1,\n${item.faq}`);
      } else {
        // Fallback
        postBlock = postBlock.replace(/(\s*})(,?)\s*$/, `\n${item.faq}\n$1$2`);
      }
      content = content.replace(match[1], postBlock);
      updatedCount++;
      console.log(`Dodano FAQ do posta ${item.id}`);
    } else {
      console.log(`Post ${item.id} ma już FAQ`);
    }
  }
}

fs.writeFileSync(filePath, content);
console.log(`Zakończono. Dodano FAQ do ${updatedCount} artykułów.`);
