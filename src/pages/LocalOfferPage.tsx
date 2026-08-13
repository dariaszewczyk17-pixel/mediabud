import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, MapPin, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

type Offer = {
  title: string;
  lead: string;
  description: string;
  benefits: string[];
  categories: { label: string; href: string; description: string }[];
  steps: string[];
  faq: { question: string; answer: string }[];
};

const OFFERS: Record<string, Offer> = {
  "/materialy-budowlane-lublin": {
    title: "Materiały budowlane w Lublinie",
    lead: "Dobierz, wyceń i zamów materiały do całej inwestycji w jednym miejscu.",
    description: "Obsługujemy klientów indywidualnych, wykonawców i firmy. Pomożemy uporządkować listę materiałów, dobrać kompatybilne systemy oraz ustalić odbiór osobisty lub dostawę na budowę.",
    benefits: ["Pomoc doradcy w doborze materiałów", "Jedna wycena dla wielu grup produktowych", "Odbiór przy ul. Chemicznej 8d lub dostawa", "Obsługa inwestycji prywatnych i B2B"],
    categories: [
      { label: "Materiały konstrukcyjne", href: "/kategoria/materialy-konstrukcyjne", description: "Pustaki, bloczki, nadproża i zaprawy." },
      { label: "Izolacje", href: "/kategoria/izolacje", description: "Styropian, wełna i materiały uzupełniające." },
      { label: "Sucha zabudowa", href: "/kategoria/sucha-zabudowa", description: "Płyty, profile, masy, wkręty i akcesoria." },
      { label: "Chemia budowlana", href: "/kategoria/chemia-budowlana", description: "Kleje, grunty, hydroizolacje i uszczelniacze." },
    ],
    steps: ["Dodaj produkty do wspólnej wyceny lub przygotuj listę.", "Podaj ilości, adres inwestycji i sposób odbioru.", "Doradca zweryfikuje zestaw i skontaktuje się z Tobą."],
    faq: [
      { question: "Gdzie kupić materiały budowlane w Lublinie?", answer: "Media Bud znajduje się przy ul. Chemicznej 8d w Lublinie. Materiały możesz odebrać na miejscu lub poprosić o wycenę dostawy na budowę." },
      { question: "Czy mogę przesłać całą listę materiałów do wyceny?", answer: "Tak. Możesz dodać wiele produktów do wspólnej wyceny oraz dołączyć projekt, zdjęcie lub zestawienie materiałów." },
      { question: "Czy pomagacie dobrać kompatybilne produkty?", answer: "Tak. Doradca może sprawdzić zastosowanie, parametry i zgodność elementów kompletnego systemu." },
    ],
  },
  "/styropian-lublin": {
    title: "Styropian w Lublinie",
    lead: "Dobierz właściwy styropian do elewacji, podłogi, fundamentu lub dachu.",
    description: "Nie wybieraj izolacji wyłącznie po grubości. Pomożemy porównać współczynnik lambda, wytrzymałość, zastosowanie oraz elementy kompletnego systemu ocieplenia.",
    benefits: ["Dobór według zastosowania i parametrów", "Obliczenie potrzebnej ilości", "Kompletny system ocieplenia w jednej wycenie", "Odbiór w Lublinie lub dostawa na inwestycję"],
    categories: [
      { label: "Styropian fasadowy", href: "/kategoria/izolacje/styropiany/styropiany-fasadowe-eps", description: "Płyty EPS do ocieplenia ścian zewnętrznych." },
      { label: "Styropian podłogowy", href: "/kategoria/izolacje/styropiany/styropian-dach-podloga-eps", description: "Izolacja podłóg, stropów i dachów." },
      { label: "Styropian fundamentowy", href: "/kategoria/izolacje/styropiany/styropiany-do-fundamentow", description: "Płyty do stref narażonych na wilgoć." },
      { label: "Akcesoria do izolacji", href: "/kategoria/izolacje/akcesoria-do-izolacji", description: "Kleje, siatki, łączniki i materiały uzupełniające." },
    ],
    steps: ["Podaj powierzchnię, grubość i miejsce zastosowania.", "Dodaj wybrane płyty i akcesoria do wyceny.", "Doradca sprawdzi ilość i kompletność systemu."],
    faq: [
      { question: "Jaki styropian wybrać na elewację?", answer: "Wybór zależy m.in. od wymaganej izolacyjności, grubości warstwy i projektu budynku. Doradca pomoże porównać parametry odpowiednich płyt fasadowych." },
      { question: "Czy Media Bud dowozi styropian w Lublinie?", answer: "Możemy przygotować indywidualną wycenę dostawy w Lublinie i województwie lubelskim. Koszt i termin zależą od wielkości zamówienia oraz adresu." },
      { question: "Czy obliczycie potrzebną liczbę paczek?", answer: "Tak. Przekaż powierzchnię oraz wybrany wariant produktu, a podczas wyceny zweryfikujemy potrzebną ilość." },
    ],
  },
  "/welna-mineralna-lublin": {
    title: "Wełna mineralna w Lublinie",
    lead: "Izolacja cieplna, akustyczna i ogniowa dobrana do miejsca zastosowania.",
    description: "Pomożemy wybrać wełnę do poddasza, elewacji, ścian działowych, stropu lub dachu płaskiego. Porównamy lambdę, grubość, gęstość i format produktu.",
    benefits: ["Dobór do konkretnej przegrody", "Porównanie parametrów cieplnych i akustycznych", "Obliczenie ilości z uwzględnieniem powierzchni", "Wycena odbioru lub dostawy"],
    categories: [
      { label: "Wełna do poddaszy", href: "/kategoria/izolacje/welny/welny-do-poddaszy", description: "Izolacja skosów dachowych i stropów." },
      { label: "Wełna fasadowa", href: "/kategoria/izolacje/welny/welny-fasadowe", description: "Płyty do systemów ociepleń elewacji." },
      { label: "Ściany działowe", href: "/kategoria/izolacje/welny/welny-do-suchej-zabudowy-i-scian-dzialowych", description: "Izolacja akustyczna konstrukcji GK." },
      { label: "Dachy płaskie", href: "/kategoria/izolacje/welny/welny-do-dachow-plaskich", description: "Płyty przeznaczone do dachów płaskich." },
    ],
    steps: ["Określ przegrodę, powierzchnię i oczekiwaną grubość.", "Wybierz produkty lub poproś doradcę o dobór.", "Otrzymasz sprawdzoną listę do wspólnej wyceny."],
    faq: [
      { question: "Jaka wełna mineralna będzie dobra na poddasze?", answer: "Znaczenie mają m.in. współczynnik lambda, dostępne miejsce, układ warstw i wymagania projektu. Dobór warto oprzeć na całej przegrodzie, nie tylko na grubości produktu." },
      { question: "Czy pomagacie obliczyć ilość wełny?", answer: "Tak. Podaj powierzchnię, planowaną grubość i miejsce zastosowania, a doradca zweryfikuje ilość podczas wyceny." },
      { question: "Czy można zamówić wełnę z dostawą?", answer: "Tak, możliwość i warunki dostawy ustalamy indywidualnie na podstawie adresu oraz wielkości zamówienia." },
    ],
  },
  "/chemia-budowlana-lublin": {
    title: "Chemia budowlana w Lublinie",
    lead: "Kleje, zaprawy, grunty, hydroizolacje i uszczelniacze dobrane jako jeden system.",
    description: "Właściwe przygotowanie podłoża i zgodność kolejnych warstw decydują o trwałości prac. Pomożemy skompletować materiały według zastosowania i zaleceń producenta.",
    benefits: ["Dobór produktów do podłoża i warunków", "Kompatybilne warstwy jednego systemu", "Pomoc w obliczeniu zużycia", "Wspólna wycena całego zakresu prac"],
    categories: [
      { label: "Kleje", href: "/kategoria/chemia-budowlana/kleje", description: "Kleje do płytek, izolacji i zastosowań specjalnych." },
      { label: "Grunty", href: "/kategoria/chemia-budowlana/grunty", description: "Przygotowanie i wzmocnienie podłoża." },
      { label: "Hydroizolacje", href: "/kategoria/chemia-budowlana/hydroizolacje", description: "Materiały do łazienek, tarasów i fundamentów." },
      { label: "Zaprawy", href: "/kategoria/zaprawy", description: "Zaprawy murarskie, naprawcze i specjalistyczne." },
    ],
    steps: ["Opisz podłoże, miejsce pracy i planowane wykończenie.", "Dodaj wybrane produkty lub cały zakres do wyceny.", "Doradca sprawdzi zgodność warstw i potrzebne ilości."],
    faq: [
      { question: "Jak dobrać chemię budowlaną do podłoża?", answer: "Trzeba uwzględnić rodzaj i stan podłoża, wilgotność, warunki użytkowania oraz kolejne warstwy. Przekaż te informacje doradcy przed zakupem." },
      { question: "Czy można skompletować cały system hydroizolacji?", answer: "Tak. Do jednej wyceny możesz dodać grunt, hydroizolację, taśmy, narożniki, klej i pozostałe elementy systemu." },
      { question: "Czy pomagacie obliczyć zużycie kleju lub zaprawy?", answer: "Tak. Zużycie zależy od produktu, podłoża i sposobu aplikacji; zweryfikujemy je na podstawie danych inwestycji i informacji producenta." },
    ],
  },
  "/dostawa-materialow-budowlanych-lublin": {
    title: "Dostawa materiałów budowlanych w Lublinie",
    lead: "Przygotuj jedną listę materiałów i ustal transport bezpośrednio na inwestycję.",
    description: "Organizujemy dostawy dla zamówień uzgodnionych z działem sprzedaży. Warunki transportu, koszt, termin i sposób rozładunku potwierdzamy indywidualnie — bez obiecywania niezweryfikowanej dostępności.",
    benefits: ["Dostawa na wskazany adres inwestycji", "Wspólne ustalenie terminu i rozładunku", "Jedno zgłoszenie dla wielu produktów", "Obsługa Lublina i województwa lubelskiego"],
    categories: [
      { label: "Wszystkie kategorie", href: "/kategoria", description: "Zbuduj kompletną listę materiałów." },
      { label: "Materiały konstrukcyjne", href: "/kategoria/materialy-konstrukcyjne", description: "Ciężkie materiały do budowy ścian i konstrukcji." },
      { label: "Izolacje", href: "/kategoria/izolacje", description: "Styropian, wełna i kompletne systemy." },
      { label: "Dachy", href: "/kategoria/dachy", description: "Pokrycia, membrany, rynny i akcesoria." },
    ],
    steps: ["Dodaj produkty i ilości do wspólnej wyceny.", "Wybierz dostawę i podaj dokładny adres budowy.", "Doradca potwierdzi warunki, koszt i możliwy termin."],
    faq: [
      { question: "Na jakim obszarze realizujecie dostawy?", answer: "Dostawy ustalamy indywidualnie dla Lublina i miejscowości w województwie lubelskim. Możliwość transportu potwierdzamy po otrzymaniu adresu i listy materiałów." },
      { question: "Ile kosztuje dostawa materiałów budowlanych?", answer: "Koszt zależy m.in. od adresu, gabarytów, masy zamówienia i sposobu rozładunku. Otrzymasz go w indywidualnej wycenie." },
      { question: "Jak zamówić dostawę na budowę?", answer: "Dodaj produkty do wyceny, wybierz dostawę, podaj adres oraz informacje o dojeździe i rozładunku. Dział sprzedaży skontaktuje się w celu potwierdzenia." },
    ],
  },
};

const LOCAL_OFFER_NAV = [
  { label: "Materiały budowlane", href: "/materialy-budowlane-lublin" },
  { label: "Styropian", href: "/styropian-lublin" },
  { label: "Wełna mineralna", href: "/welna-mineralna-lublin" },
  { label: "Chemia budowlana", href: "/chemia-budowlana-lublin" },
  { label: "Dostawa na budowę", href: "/dostawa-materialow-budowlanych-lublin" },
];

export default function LocalOfferPage() {
  const { pathname } = useLocation();
  const offer = OFFERS[pathname] ?? OFFERS["/materialy-budowlane-lublin"];

  useSEO({
    title: offer.title + " | Media Bud",
    description: offer.description,
    canonical: pathname,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://mediabud.pl/" },
            { "@type": "ListItem", position: 2, name: offer.title, item: "https://mediabud.pl" + pathname },
          ],
        },
        {
          "@type": "Service",
          "@id": `https://mediabud.pl${pathname}#service`,
          name: offer.title,
          description: offer.description,
          url: `https://mediabud.pl${pathname}`,
          provider: { "@type": "LocalBusiness", "@id": "https://mediabud.pl/#organization", name: "Media Bud", address: { "@type": "PostalAddress", streetAddress: "ul. Chemiczna 8d", addressLocality: "Lublin", addressCountry: "PL" } },
          areaServed: [
            { "@type": "City", name: "Lublin" },
            { "@type": "AdministrativeArea", name: "województwo lubelskie" },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: offer.faq.map(item => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
      ],
    },
  });

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-[#121212] via-[#090909] to-[#120507]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#f81828]">Media Bud · Lublin</p>
          <h1 className="max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">{offer.title}</h1>
          <p className="mt-5 max-w-3xl text-xl font-semibold text-gray-200">{offer.lead}</p>
          <p className="mt-4 max-w-3xl leading-7 text-gray-400">{offer.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-[#f81828] font-bold text-white hover:bg-[#d91422]">
              <Link to="/kontakt">Poproś o wycenę <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <a href="tel:+48533553344"><Phone className="mr-2 h-4 w-4" /> 533 553 344</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-5 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {offer.benefits.map(benefit => (
          <div key={benefit} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <CheckCircle2 className="mb-3 h-5 w-5 text-[#f81828]" />
            <p className="font-semibold text-gray-100">{benefit}</p>
          </div>
        ))}
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-7 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f81828]">Oferta</p>
          <h2 className="mt-2 text-3xl font-black">Znajdź właściwą grupę materiałów</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {offer.categories.map(category => (
            <Link key={category.href} to={category.href} className="group rounded-xl border border-white/10 bg-[#101010] p-6 transition hover:border-[#f81828]/60">
              <h3 className="text-xl font-bold group-hover:text-[#f81828]">{category.label}</h3>
              <p className="mt-2 text-gray-400">{category.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-[#f81828]">Zobacz produkty <ArrowRight className="ml-2 h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 border-y border-white/10 bg-white/[0.025]">
        <div className="container mx-auto px-4 py-14">
          <h2 className="text-3xl font-black">Jak przygotować wycenę?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {offer.steps.map((step, index) => (
              <div key={step} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f81828] font-black">{index + 1}</span>
                <p className="pt-2 leading-6 text-gray-300">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-5 text-sm text-gray-300">
            <span className="inline-flex items-center"><MapPin className="mr-2 h-4 w-4 text-[#f81828]" /> ul. Chemiczna 8d, Lublin</span>
            <span className="inline-flex items-center"><Truck className="mr-2 h-4 w-4 text-[#f81828]" /> Odbiór lub indywidualnie ustalana dostawa</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-black">Najczęstsze pytania</h2>
        <div className="mt-7 space-y-4">
          {offer.faq.map(item => (
            <details key={item.question} className="rounded-xl border border-white/10 bg-[#101010] p-5">
              <summary className="cursor-pointer pr-4 font-bold">{item.question}</summary>
              <p className="mt-3 leading-7 text-gray-400">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-[#f81828]/30 bg-[#16090a] p-7 text-center">
          <h2 className="text-2xl font-black">Masz listę materiałów lub projekt?</h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-300">Prześlij dane do wspólnej wyceny. Potwierdzimy dobór, dostępność i warunki odbioru lub dostawy.</p>
          <Button asChild size="lg" className="mt-6 bg-[#f81828] font-bold text-white hover:bg-[#d91422]">
            <Link to="/kontakt">Wyślij zapytanie <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <nav aria-label="Pozostała oferta lokalna Media Bud" className="mt-10 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Sprawdź także w Lublinie</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LOCAL_OFFER_NAV.filter(item => item.href !== pathname).map(item => (
              <Link key={item.href} to={item.href} className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-[#f81828]/50 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </section>
    </main>
  );
}
