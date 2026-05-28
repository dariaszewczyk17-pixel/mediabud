---
name: optymalizator-tresci-ecommerce-seo-ai
description: Twórz, rozbudowuj i porządkuj treści e-commerce dla stron produktów oraz kategorii zawsze wtedy, gdy użytkownik chce przygotować lub ulepszyć content sklepu internetowego pod SEO i wyszukiwarki AI, szczególnie dla kart produktowych, listingów, stron kategorii, opisów asortymentu, sekcji informacyjnych, danych technicznych, przewag zakupowych i ostrzeżeń. Używaj tego skilla także wtedy, gdy trzeba zweryfikować dane na stronach producentów i konkurencji, ujednolicić strukturę treści, przygotować content dla wdrożenia na stronie lub dopilnować, by każda strona produktu albo kategorii zawierała komplet wymaganych sekcji.
metadata:
  display_name: Optymalizator Treści E-commerce SEO/AI
compatibility: Claude Code
---

# Optymalizator Treści E-commerce SEO/AI

Ten skill służy do przygotowywania i porządkowania treści dla e-commerce tak, aby były jednocześnie użyteczne dla klientów, czytelne dla zespołu wdrożeniowego, zgodne z realnymi danymi rynkowymi i mocne pod SEO oraz wyszukiwarki AI.

## Kiedy używać

Uruchamiaj ten skill, gdy użytkownik prosi o:
- tworzenie lub rozbudowę opisów produktów,
- tworzenie lub rozbudowę opisów kategorii,
- porządkowanie architektury treści na stronie sklepu,
- przygotowanie contentu wdrożeniowego dla kart produktowych i kategorii,
- analizę konkurencji dla struktury i zakresu informacji,
- optymalizację treści pod SEO, AEO, GEO lub wyszukiwarki AI,
- weryfikację parametrów, zastosowań, korzyści i ostrzeżeń na podstawie źródeł producentów oraz konkurencji.

## Cel

Dostarczaj treści, które:
- są zgodne z danymi możliwymi do potwierdzenia w źródłach,
- mają spójną, wdrożeniową strukturę,
- odpowiadają na intencje informacyjne i zakupowe użytkownika,
- wzmacniają widoczność organiczną strony produktu lub kategorii,
- pomagają wyszukiwarkom AI zrozumieć, czym jest produkt, dla kogo jest przeznaczony, jakie ma parametry, zastosowania, zalety i ograniczenia.

## Workflow

### Krok 1: Deleguj do wbudowanego skilla (BLOCKING — wykonaj najpierw)

Zanim zrobisz cokolwiek innego, wywołaj `load_skill(skill_name="website")` jako samodzielny krok, aby załadować wbudowany skill odpowiedzialny za pracę z treściami przeznaczonymi do wdrożenia w doświadczeniu przeglądarkowym.

Po zwróceniu wyniku przez `load_skill`, potwierdź, że dostępne są aktualne narzędzia i zasady workflow tego skilla, a następnie stosuj jego bieżące instrukcje przy dalszej organizacji contentu. Nie organizuj sekcji, nie projektuj układu treści i nie przygotowuj wdrożeniowej struktury strony przed wykonaniem tego kroku.

### Krok 2: Ustal typ strony i zakres pracy

Najpierw rozstrzygnij, czy pracujesz nad:
- stroną produktu,
- stroną kategorii,
- zestawem wielu produktów,
- zestawem wielu kategorii,
- mieszanym zakresem produkt + kategoria.

Jeżeli użytkownik podał pliki, URL-e, zrzuty ekranu, komponenty lub istniejący kod strony, najpierw przeczytaj je i potraktuj jako źródło bazowe. Nie wymyślaj brakujących danych produktowych ani parametrów.

### Krok 3: Zweryfikuj dane w źródłach

Każdą treść opieraj na danych, które można sprawdzić w zewnętrznych źródłach. Obowiązkowo:
- sprawdź stronę producenta dla parametrów, zastosowań, składu/specyfikacji, zaleceń i ograniczeń,
- sprawdź strony konkurencji pod kątem sposobu prezentacji informacji, zakresu sekcji, częstych pytań i luk treściowych,
- gdy to pasuje do branży lub kontekstu użytkownika, uwzględnij konkurentów takich jak `bechcicki.pl` oraz inne istotne sklepy i hurtownie.

Nigdy nie przedstawiaj niezweryfikowanych cech jako faktów. Jeśli jakiejś informacji nie da się potwierdzić, oznacz ją jako brakującą lub wymagającą potwierdzenia.

### Krok 4: Zbuduj obowiązkową strukturę treści

Każda strona produktu lub kategorii musi zawierać wszystkie poniższe sekcje. Nie pomijaj żadnej z nich, chyba że użytkownik wyraźnie nakaże inaczej i zaakceptuje odstępstwo.

#### Obowiązkowe sekcje
1. **Krótki opis** — zwięzłe wprowadzenie, które szybko identyfikuje produkt lub kategorię, główną funkcję i kontekst użycia.
2. **Długi opis** — rozwinięcie, które porządkuje temat, pokazuje kluczowe cechy, kontekst zakupowy, przewagi i istotne informacje pomocnicze.
3. **Parametry techniczne** — konkretne, możliwie mierzalne dane, specyfikacja, warianty, jednostki, cechy użytkowe i inne parametry potwierdzone źródłowo.
4. **Zastosowanie** — praktyczne scenariusze użycia, typowe zastosowania, rekomendowane konteksty pracy lub montażu.
5. **Zalety** — najważniejsze korzyści dla klienta, przewagi użytkowe, funkcjonalne lub zakupowe.
6. **Ostrzeżenia** — ograniczenia, środki ostrożności, warunki użytkowania, wymagania montażowe lub sytuacje, w których produkt nie powinien być używany bez dodatkowej weryfikacji.

Jeśli tworzysz stronę kategorii, sekcje nadal są obowiązkowe, ale mają opisywać kategorię jako grupę produktów, wybór odpowiednich rozwiązań, typowe różnice między produktami i kryteria zakupu.

### Krok 5: Optymalizuj pod SEO i wyszukiwarki AI

Podczas pisania:
- używaj naturalnego, profesjonalnego języka bez sztucznego upychania fraz,
- pokrywaj intencję informacyjną i transakcyjną,
- wplataj trafne frazy główne, poboczne i long-tail w sposób semantyczny,
- buduj treść tak, aby odpowiadała na pytania użytkownika zanim ten zada je w wyszukiwarce lub asystencie AI,
- jasno nazywaj produkt, kategorię, zastosowanie, parametry, odbiorcę i ograniczenia,
- dbaj o wysoką gęstość informacji użytecznej, a nie pustych ozdobników.

Dla SEO i AI search szczególnie ważne jest, aby treść pomagała modelom i wyszukiwarkom odpowiedzieć na pytania typu:
- co to jest,
- do czego służy,
- dla kogo jest przeznaczone,
- jakie ma parametry,
- czym się wyróżnia,
- kiedy warto wybrać ten produkt lub tę kategorię,
- na co uważać przy wyborze lub stosowaniu.

### Krok 6: Pisz w trybie wdrożeniowym

Twórz treść tak, aby dało się ją łatwo wkleić lub wdrożyć w stronie produktu, kategorii albo komponencie frontendowym. Uporządkuj materiał czytelnymi nagłówkami i zachowaj spójną kolejność sekcji.

Jeśli użytkownik pracuje na istniejącej stronie lub kodzie, dopasuj treść do rzeczywistej struktury komponentów, nie naruszając danych, których użytkownik nie kazał zmieniać.

### Krok 7: Kontrola jakości przed oddaniem

Przed oddaniem rezultatu sprawdź obowiązkowo:
- czy obecne są wszystkie 6 wymaganych sekcji,
- czy dane techniczne i zastosowania wynikają ze źródeł, a nie z domysłu,
- czy ostrzeżenia są konkretne i użyteczne,
- czy treść jest spójna językowo i gotowa do wdrożenia,
- czy content wspiera zarówno SEO, jak i wyszukiwarki AI,
- czy uwzględniono weryfikację na stronach producentów oraz konkurencji.

## Zasady nienegocjowalne

- Nie pomijaj sekcji: krótki opis, długi opis, parametry techniczne, zastosowanie, zalety, ostrzeżenia.
- Nie organizuj treści przed wykonaniem Kroku 1 z `load_skill(skill_name="website")`.
- Nie podmieniaj danych źródłowych na zgadywanie.
- Nie opisuj informacji jako potwierdzonych, jeśli nie zostały sprawdzone u producenta lub na wiarygodnych stronach konkurencji.
- Nie optymalizuj wyłącznie pod frazy; optymalizuj także pod kompletność odpowiedzi dla wyszukiwarek AI.

## Format oddania

Jeśli użytkownik nie poda innego formatu, oddawaj wynik jako:
1. nazwa strony / produktu / kategorii,
2. krótki opis,
3. długi opis,
4. parametry techniczne,
5. zastosowanie,
6. zalety,
7. ostrzeżenia,
8. krótka notatka źródłowa wskazująca, które informacje zostały potwierdzone u producenta i na konkurencji.

## Przykładowe prompty testowe

1. „Przygotuj treść SEO/AI dla kategorii kleje do styropianu na stronę hurtowni budowlanej w Lublinie. Zweryfikuj dane na stronach producentów i konkurencji.”
2. „Rozbuduj kartę produktu pianoklej do płyt XPS tak, aby miała komplet sekcji wdrożeniowych i była gotowa do publikacji w sklepie.”
3. „Porównaj opisy konkurencji dla systemów ETICS i przygotuj lepszą treść kategorii zgodną z SEO oraz AI search.”
