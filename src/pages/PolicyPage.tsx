import { useSEO } from "@/hooks/useSEO";

export function PolicyPage() {
  const location = useLocation();
  const isRegulamin = location.pathname.includes("regulamin");
  const isRodo      = location.pathname.includes("rodo");

  useSEO(isRegulamin ? {
    title: "Regulamin – Media Bud | Zasady zakupów i dostaw",
    description: "Regulamin serwisu mediabud.pl — zasady składania zamówień, dostaw na terenie Lublina i województwa lubelskiego, płatności, reklamacji.",
    canonical: "/regulamin",
    noIndex: false,
  } : isRodo ? {
    title: "RODO – Media Bud | Obowiązek informacyjny i prawa osób",
    description: "Informacja o przetwarzaniu danych osobowych przez Media Bud zgodnie z rozporządzeniem RODO — cele, podstawy, prawa osób, retencja danych.",
    canonical: "/rodo",
    noIndex: false,
  } : {
    title: "Polityka prywatności – Media Bud | Ochrona danych osobowych",
    description: "Polityka prywatności Media Bud — zasady zbierania i przetwarzania danych osobowych, pliki cookies, prawa użytkowników.",
    canonical: "/polityka-prywatnosci",
    noIndex: false,
  });

  const docTitle    = isRegulamin ? "Regulamin serwisu" : isRodo ? "RODO — Obowiązek informacyjny" : "Polityka prywatności";
  const docSubtitle = isRegulamin ? "Zasady korzystania z serwisu mediabud.pl i składania zamówień" : isRodo ? "Informacja o przetwarzaniu danych osobowych (art. 13 RODO)" : "Zasady ochrony i przetwarzania danych osobowych";

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" />
        <div className="relative container mx-auto px-4 pl-10 py-10">
          <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-2">Dokumenty prawne</p>
          <h1 className="font-display text-2xl md:text-3xl font-black text-white mb-1">{docTitle}</h1>
          <p className="text-gray-500 text-sm">{docSubtitle}</p>
          {/* nawigacja między dokumentami */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
              { href: "/rodo", label: "RODO" },
              { href: "/regulamin", label: "Regulamin" },
            ].map(item => (
              <Link
                key={item.href}
                to={item.href}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: location.pathname === item.href ? "#f81828" : "rgba(255,255,255,0.05)",
                  color: location.pathname === item.href ? "#fff" : "#888",
                  border: `1px solid ${location.pathname === item.href ? "#f81828" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="rounded-xl p-8 space-y-6" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
          {isRegulamin ? (
            <>
              <Section t="§1 Postanowienia ogólne" c="Regulamin określa zasady korzystania z serwisu internetowego mediabud.pl prowadzonego przez Media Bud z siedzibą przy ul. Chemicznej 8d, 20-329 Lublin. Korzystanie z serwisu oznacza akceptację niniejszego regulaminu w brzmieniu aktualnym na dzień korzystania." />
              <Section t="§2 Zakres działalności" c="Media Bud prowadzi sprzedaż materiałów budowlanych oraz świadczy usługi doradztwa technicznego i koordynacji wykonawczej. Serwis mediabud.pl stanowi platformę informacyjną i ofertową — zamówienia finalizowane są drogą telefoniczną, mailową lub bezpośrednio w hurtowni." />
              <Section t="§3 Składanie zamówień i zapytań ofertowych" c="Zapytania ofertowe i zamówienia przyjmowane są: telefonicznie (+48 533 553 344, Pon–Pt 7:00–16:00), mailowo (sprzedaz@mediabud.pl) oraz przez formularz kontaktowy na stronie. Po złożeniu zapytania klient otrzymuje odpowiedź w ciągu 1 dnia roboczego." />
              <Section t="§4 Ceny i płatności" c="Ceny materiałów podawane są w złotych polskich (PLN) i mogą być cenami netto lub brutto — kwestię tę każdorazowo potwierdzamy w ofercie. Media Bud wystawia faktury VAT. Dostępne formy płatności: przelew bankowy, gotówka przy odbiorze osobistym, płatność kartą na miejscu. Warunki odroczonego terminu płatności dla klientów B2B ustalane są indywidualnie." />
              <Section t="§5 Dostawa i logistyka" c="Dostawy realizowane są na terenie Lublina i województwa lubelskiego. Standardowy czas realizacji: 1–3 dni robocze od potwierdzenia zamówienia. Dostawa tego samego dnia możliwa przy zamówieniach złożonych do 10:00 w promieniu 30 km od Lublina — wymaga oddzielnego potwierdzenia dostępności. Koszty dostawy ustalane indywidualnie w zależności od lokalizacji, wolumenu i rodzaju materiałów." />
              <Section t="§6 Reklamacje i zwroty" c="Reklamacje dotyczące jakości produktów należy zgłaszać do 7 dni od daty zakupu — telefonicznie lub mailowo. Rozpatrujemy reklamacje w ciągu 14 dni roboczych. W przypadku towaru uszkodzonego podczas transportu prosimy o sporządzenie protokołu szkody w obecności dostawcy." />
              <Section t="§7 Odpowiedzialność" c="Media Bud nie ponosi odpowiedzialności za szkody wynikłe z nieprawidłowego zastosowania materiałów niezgodnego z kartami technicznymi producentów. Dobór materiałów do konkretnych warunków wykonawczych pozostaje w gestii wykonawcy lub inwestora." />
              <Section t="§8 Postanowienia końcowe" c="Niniejszy regulamin może ulec zmianie. Aktualna wersja jest zawsze dostępna na stronie mediabud.pl/regulamin. W sprawach nieuregulowanych zastosowanie mają przepisy Kodeksu Cywilnego i obowiązującego prawa polskiego." />
              <Section t="§9 Kontakt" c="Media Bud, ul. Chemiczna 8d, 20-329 Lublin | tel. +48 533 553 344 | e-mail: sprzedaz@mediabud.pl | Pon–Pt: 7:00–16:00." />
            </>
          ) : isRodo ? (
            <>
              <Section t="1. Administrator danych osobowych" c="Administratorem Twoich danych osobowych jest Media Bud z siedzibą przy ul. Chemicznej 8d, 20-329 Lublin. W sprawach związanych z ochroną danych osobowych możesz kontaktować się pod adresem e-mail: sprzedaz@mediabud.pl lub listownie na adres siedziby." />
              <Section t="2. Cele i podstawy prawne przetwarzania" c="Przetwarzamy Twoje dane osobowe w następujących celach: (a) odpowiedź na zapytania kontaktowe i ofertowe — podstawa: art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes); (b) realizacja zamówień i umów — podstawa: art. 6 ust. 1 lit. b RODO (wykonanie umowy); (c) wystawianie faktur i rozliczeń — podstawa: art. 6 ust. 1 lit. c RODO (obowiązek prawny); (d) marketing własnych usług — podstawa: art. 6 ust. 1 lit. f RODO, z możliwością sprzeciwu." />
              <Section t="3. Kategorie przetwarzanych danych" c="W zależności od celu przetwarzamy: imię i nazwisko, adres e-mail, numer telefonu, adres dostawy lub siedziby, NIP (w relacjach B2B), treść korespondencji, dane potrzebne do wystawienia faktury VAT." />
              <Section t="4. Okres przechowywania danych" c="Dane przetwarzane w celu realizacji umowy lub zamówienia przechowujemy przez 5 lat od końca roku kalendarzowego, w którym umowę wykonano (wymóg podatkowy). Dane z zapytań kontaktowych bez zawartej umowy — do 12 miesięcy od ostatniego kontaktu, o ile nie wystąpisz z żądaniem usunięcia wcześniej." />
              <Section t="5. Prawa przysługujące osobom, których dane dotyczą" c="Masz prawo: dostępu do swoich danych (art. 15 RODO), sprostowania nieprawidłowych danych (art. 16), usunięcia danych w określonych przypadkach (art. 17), ograniczenia przetwarzania (art. 18), przenoszenia danych (art. 20), wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie (art. 21). Wnioski kieruj na adres: sprzedaz@mediabud.pl." />
              <Section t="6. Odbiorcy danych" c="Twoje dane mogą być udostępniane: firmom transportowym realizującym dostawy, biurom rachunkowym prowadzącym księgowość Media Bud, dostawcom oprogramowania (hostingu, poczty e-mail, CRM) — wyłącznie w zakresie niezbędnym do świadczenia danej usługi i na podstawie umów powierzenia przetwarzania danych. Nie sprzedajemy Twoich danych osobom trzecim." />
              <Section t="7. Przekazywanie danych poza EOG" c="Co do zasady nie przekazujemy danych poza Europejski Obszar Gospodarczy. W przypadku korzystania z usług dostawców spoza EOG (np. Google Analytics) stosujemy standardowe klauzule umowne zatwierdzone przez Komisję Europejską." />
              <Section t="8. Prawo skargi do organu nadzorczego" c="Masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa, tel. 606 950 000, www.uodo.gov.pl — jeśli uważasz, że przetwarzamy Twoje dane niezgodnie z przepisami." />
            </>
          ) : (
            <>
              <Section t="1. Administrator danych" c="Administratorem danych osobowych przetwarzanych w ramach serwisu mediabud.pl jest Media Bud z siedzibą przy ul. Chemicznej 8d, 20-329 Lublin. Kontakt: sprzedaz@mediabud.pl." />
              <Section t="2. Zakres i cel przetwarzania" c="Przetwarzamy dane podane w formularzach kontaktowych (imię i nazwisko, e-mail, telefon, treść wiadomości) wyłącznie w celu odpowiedzi na zapytania oraz realizacji zamówień. Podstawa prawna: art. 6 ust. 1 lit. b i f RODO." />
              <Section t="3. Okres przechowywania danych" c="Dane osobowe przechowujemy przez okres niezbędny do realizacji celu, nie dłużej niż 5 lat od ostatniego kontaktu lub zakończenia relacji handlowej, chyba że przepisy prawa wymagają dłuższego okresu przechowywania." />
              <Section t="4. Prawa osób" c="Przysługuje Ci prawo: dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz sprzeciwu wobec przetwarzania. Wnioski prosimy kierować na: sprzedaz@mediabud.pl. Odpowiadamy w ciągu 30 dni." />
              <Section t="5. Pliki cookies" c="Serwis używa plików cookies do: prawidłowego działania strony (niezbędne), analizy ruchu (Google Analytics 4 — opcjonalne). Możesz wyłączyć cookies analityczne w ustawieniach przeglądarki lub za pośrednictwem banera zgody. Nie używamy cookies śledzących ani reklamowych podmiotów trzecich." />
              <Section t="6. Formularze kontaktowe" c="Dane podane w formularzu kontaktowym są szyfrowane (HTTPS) i przesyłane bezpośrednio na adres sprzedaz@mediabud.pl. Nie są zapisywane w bazach danych dostępnych publicznie. Checkbox zgody jest obowiązkowy — bez wyrażenia zgody formularz nie zostanie wysłany." />
              <Section t="7. Linki do zewnętrznych serwisów" c="Serwis może zawierać linki do stron zewnętrznych (producenci materiałów, Google Maps). Media Bud nie odpowiada za politykę prywatności tych serwisów. Zalecamy zapoznanie się z ich politykami prywatności." />
              <Section t="8. Zmiany polityki" c="Niniejsza polityka może być aktualizowana. O istotnych zmianach poinformujemy poprzez komunikat na stronie. Aktualna wersja jest zawsze dostępna pod adresem mediabud.pl/polityka-prywatnosci." />
              <Section t="9. Organ nadzorczy" c="Masz prawo wnieść skargę do Prezesa UODO (Urząd Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa), jeśli sądzisz, że przetwarzamy Twoje dane niezgodnie z prawem." />
            </>
          )}
          <div className="pt-4 border-t border-white/5 text-xs text-gray-600 flex items-center justify-between flex-wrap gap-2">
            <span>Ostatnia aktualizacja: styczeń 2026</span>
            <span>Media Bud, ul. Chemiczna 8d, 20-329 Lublin</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link to="/kontakt" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f81828] text-white font-bold text-sm hover:bg-[#c8000f] transition-all">
            Pytania? Napisz do nas
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            ← Strona główna
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ t, c }: { t: string; c: string }) {
  return (
    <div>
      <h2 className="font-display font-bold text-white text-base mb-2 flex items-center gap-2">
        <span className="w-[3px] h-4 bg-[#f81828] rounded-full flex-shrink-0" />{t}
      </h2>
      <p className="text-sm text-gray-400 leading-relaxed pl-3">{c}</p>
    </div>
  );
}
