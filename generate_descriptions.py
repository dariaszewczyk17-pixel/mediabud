#!/usr/bin/env python3
"""
A1 v2: Batch generowanie shortDescription dla produktów Media Bud.

Ulepszenia v2:
  [1] Filtr śmieciowych wartości technicalSpec (N/D, -, brak, itp.)
  [2] Smart spec: do 10 parametrów, filtrowane i deduplikowane
  [3] Pole `description` jako źródło do skrócenia (zamiast generowania od zera)
  [4] Progress z offsetem — resume po restarcie; patch Sanity natychmiast po każdym batchu
"""
import sys, json, asyncio, time, math, os, re
sys.path.insert(0, "/app/skills/common/scripts")
from batch_llm import batch_llm

import urllib.request, urllib.parse

# ── Konfiguracja ─────────────────────────────────────────────────────────────

SANITY_PROJECT = "nzcwegq7"
SANITY_DATASET = "production"
SANITY_TOKEN   = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
SANITY_URL     = f"https://{SANITY_PROJECT}.api.sanity.io/v2023-08-01/data"

BATCH_SIZE  = 300   # produktów na jeden batch_llm (zmniejszone dla stabilności)
PATCH_BATCH = 50    # produktów na jeden mutate request

WORKDIR    = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud"
LOG_FILE   = f"{WORKDIR}/desc_log.jsonl"        # JSONL — append, nie nadpisuje przy restarcie
PROG_FILE  = f"{WORKDIR}/desc_progress.json"

# ── [POPRAWA 1] Filtr śmieciowych wartości spec ───────────────────────────────

# Wartości uważane za "puste" — brak sensu informacyjnego
JUNK_VALUES = {
    "-", "—", "–", "n/d", "nd", "n/a", "na", "brak", "nie dotyczy",
    "bd", "b/d", "bbd", "?", ".", "..", "...", "/", "\\", "0", ""
}

def is_junk_spec(label: str, value: str) -> bool:
    """Zwraca True jeśli parametr nie wnosi informacji."""
    if not label or not value:
        return True
    v = value.strip().lower()
    l = label.strip().lower()
    # Pusta lub śmieciowa wartość
    if v in JUNK_VALUES:
        return True
    # Tylko cyfry bez jednostki w labelach opisowych (np. "Kod": "12345678")
    if re.fullmatch(r'\d+', v) and l in {"kod", "ean", "id", "ref", "indeks", "nr"}:
        return True
    # Wartość = 1 znak
    if len(v) == 1:
        return True
    # Wartość zaczyna się od "http" (link, nie opis)
    if v.startswith("http"):
        return True
    return False

# ── [POPRAWA 2] Smart spec selection (do 10, odfiltrowane) ───────────────────

# Priorytety etykiet — ważniejsze parametry idą pierwsze
PRIORITY_LABELS = {
    "przeznaczenie", "zastosowanie", "typ", "rodzaj", "klasa", "seria",
    "pojemność", "gramatura", "waga", "rozmiar", "wymiary", "długość",
    "grubość", "szerokość", "moc", "wydajność", "zużycie", "wydatek",
    "kolor", "barwa", "odcień", "temperatura stosowania", "czas schnięcia",
    "czas wiązania", "klasa reakcji na ogień", "wodoszczelność", "przyczepność",
}

def select_specs(specs: list, max_specs: int = 10) -> str:
    """
    Filtruje śmieciowe wartości, sortuje wg priorytetu i zwraca
    sformatowany string do promptu (maks. max_specs parametrów).
    """
    seen_labels = set()
    prioritized = []
    rest = []

    for s in specs:
        label = (s.get("label") or "").strip()
        value = (s.get("value") or "").strip()

        if is_junk_spec(label, value):
            continue
        if label.lower() in seen_labels:  # deduplikacja po labelce
            continue
        seen_labels.add(label.lower())

        if label.lower() in PRIORITY_LABELS:
            prioritized.append(f"{label}: {value}")
        else:
            rest.append(f"{label}: {value}")

    selected = (prioritized + rest)[:max_specs]
    return "; ".join(selected)

# ── [POPRAWA 3] Dwa tryby promptu: summarize vs generate ─────────────────────

SYSTEM_PROMPT_GENERATE = (
    "Jesteś copywriterem polskiego składu budowlanego Media Bud w Lublinie. "
    "Na podstawie podanych danych produktu napisz DOKŁADNIE 2-3 zdania krótkiego opisu "
    "sprzedażowego po polsku. "
    "Zasady: (1) opisz przeznaczenie i główną zaletę; (2) bądź konkretny i merytoryczny — "
    "bez ogólników; (3) nie zaczynaj od nazwy produktu ani marki — zacznij od zastosowania "
    "lub cechy; (4) tylko czysty tekst, zero nagłówków i list; "
    "(5) nie wymyślaj parametrów których nie ma w danych — jeśli ich brak, opisz ogólnie kategorię."
)

SYSTEM_PROMPT_SUMMARIZE = (
    "Jesteś copywriterem polskiego składu budowlanego Media Bud w Lublinie. "
    "Na podstawie podanego opisu produktu napisz SKRÓCONĄ wersję — DOKŁADNIE 2-3 zdania po polsku. "
    "Zasady: (1) zachowaj najważniejsze informacje o przeznaczeniu i zaletach; "
    "(2) nie zaczynaj od nazwy produktu ani marki — zacznij od zastosowania lub cechy; "
    "(3) tylko czysty tekst, zero nagłówków i list; (4) usuń zbędne powtórzenia i ogólniki."
)

def build_prompt(p: dict) -> tuple[str, str]:
    """
    Zwraca (prompt_text, mode) gdzie mode to 'summarize' lub 'generate'.
    [POPRAWA 3] Jeśli produkt ma pole `description`, używamy go jako źródła do skrócenia.
    """
    name      = (p.get("name") or "").strip()
    brand     = (p.get("brand") or "").strip()
    cat       = (p.get("categoryName") or "").strip()
    specs     = p.get("technicalSpec") or []
    desc_long = (p.get("description") or "").strip()

    spec_str = select_specs(specs, max_specs=10)

    # [POPRAWA 3]: jeśli opis długi istnieje i ma min. 80 znaków — skróć go
    if desc_long and len(desc_long) >= 80:
        prompt = (
            f"Produkt: {name}\n"
            f"Marka: {brand}\n"
            f"Kategoria: {cat}\n"
            f"Pełny opis do skrócenia:\n{desc_long[:1200]}\n"
        )
        return prompt, "summarize"

    # Fallback: generuj z danych technicznych
    prompt = (
        f"Produkt: {name}\n"
        f"Marka: {brand}\n"
        f"Kategoria: {cat}\n"
        f"Parametry techniczne: {spec_str if spec_str else 'brak'}\n"
    )
    return prompt, "generate"

# ── Sanity helpers ────────────────────────────────────────────────────────────

def sanity_query(groq: str) -> list:
    url = f"{SANITY_URL}/query/{SANITY_DATASET}?query=" + urllib.parse.quote(groq)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {SANITY_TOKEN}"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return json.loads(r.read()).get("result", [])

def sanity_mutate(mutations: list) -> dict:
    url  = f"{SANITY_URL}/mutate/{SANITY_DATASET}"
    data = json.dumps({"mutations": mutations}).encode()
    req  = urllib.request.Request(url, data=data, headers={
        "Authorization": f"Bearer {SANITY_TOKEN}",
        "Content-Type": "application/json",
    })
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())

# ── [POPRAWA 4] Progress z offsetem — zapis i odczyt ─────────────────────────

def load_progress() -> dict:
    if os.path.exists(PROG_FILE):
        with open(PROG_FILE) as f:
            return json.load(f)
    return {"next_start": 0, "done": 0, "errors": 0, "batches_done": 0, "mode_stats": {"summarize": 0, "generate": 0}}

def save_progress(prog: dict):
    with open(PROG_FILE, "w") as f:
        json.dump(prog, f, ensure_ascii=False, indent=2)

def append_log(entries: list):
    with open(LOG_FILE, "a") as f:
        for e in entries:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

# ── Główna logika ─────────────────────────────────────────────────────────────

async def main():
    prog = load_progress()
    start_from = prog["next_start"]

    print(f"[START] Progress: done={prog['done']}, errors={prog['errors']}, next_start={start_from}")

    # 1. Pobierz produkty bez shortDescription (lub z pustym)
    # [POPRAWA 3] Dodajemy `description` do zapytania
    print("[1/3] Pobieranie produktów bez opisu z Sanity...")
    groq = (
        '*[_type == "product" && '
        '(shortDescription == null || shortDescription == "") && '
        '!(name match "P-*")] | order(_id asc) [0...20000] {'
        '  _id, name,'
        '  "brand": brand->name,'
        '  "categoryName": category->name,'
        '  technicalSpec[]{ label, value },'
        '  description'
        '}'
    )
    products = sanity_query(groq)
    total = len(products)
    print(f"[1/3] Znaleziono {total} produktów bez opisu")

    if not products:
        print("[DONE] Brak produktów do opisania!")
        return

    # [POPRAWA 4] Pomiń już przetworzone (resume po restarcie)
    if start_from > 0:
        products = products[start_from:]
        print(f"[RESUME] Pomijam pierwsze {start_from}, zostało {len(products)}")

    total_batches = math.ceil(len(products) / BATCH_SIZE)
    print(f"[2/3] Generowanie — {total_batches} batchy po max {BATCH_SIZE}")

    for batch_idx in range(total_batches):
        s   = batch_idx * BATCH_SIZE
        e   = min(s + BATCH_SIZE, len(products))
        batch = products[s:e]

        abs_start = start_from + s + 1
        abs_end   = start_from + e
        print(f"\n  Batch {batch_idx+1}/{total_batches} (prod {abs_start}–{abs_end})...")

        # Buduj prompty z podziałem na tryby
        prompts_gen  = []  # (idx_w_batchu, prompt) dla trybu generate
        prompts_sum  = []  # (idx_w_batchu, prompt) dla trybu summarize
        batch_modes  = []  # mode dla każdego produktu
        all_prompts  = []  # 1 lista dla batch_llm

        for p in batch:
            prompt, mode = build_prompt(p)
            batch_modes.append(mode)
            all_prompts.append(prompt)

        mode_counts = {"summarize": batch_modes.count("summarize"),
                       "generate":  batch_modes.count("generate")}
        print(f"    Tryby: generate={mode_counts['generate']}, summarize={mode_counts['summarize']}")

        # Wybierz system_prompt dla większości w batchu
        dominant_mode = "summarize" if mode_counts["summarize"] > mode_counts["generate"] else "generate"
        system = SYSTEM_PROMPT_SUMMARIZE if dominant_mode == "summarize" else SYSTEM_PROMPT_GENERATE

        # batch_llm — retry raz przy błędzie
        descriptions = None
        for attempt in range(2):
            try:
                descriptions = await batch_llm(all_prompts, system=system)
                break
            except Exception as ex:
                print(f"    [WARN] batch_llm attempt {attempt+1} failed: {ex}")
                await asyncio.sleep(5)

        if descriptions is None:
            descriptions = [None] * len(batch)
            print(f"    [ERROR] batch_llm całkowicie nie powiodło się — pominięto batch")

        # Przygotuj wyniki i patch do Sanity natychmiast
        mutations = []
        log_entries = []
        batch_errors = 0
        batch_ok = 0

        for p, desc, mode in zip(batch, descriptions, batch_modes):
            if desc and len(desc.strip()) > 20:
                mutations.append({
                    "patch": {
                        "id": p["_id"],
                        "set": {"shortDescription": desc.strip()}
                    }
                })
                log_entries.append({"id": p["_id"], "status": "ok", "mode": mode,
                                    "len": len(desc)})
                batch_ok += 1
            else:
                log_entries.append({"id": p["_id"], "status": "error",
                                    "mode": mode, "desc": desc})
                batch_errors += 1

        # [POPRAWA 4] Patch Sanity natychmiast po wygenerowaniu batchu
        patched = 0
        if mutations:
            for i in range(0, len(mutations), PATCH_BATCH):
                chunk = mutations[i:i+PATCH_BATCH]
                for attempt in range(2):
                    try:
                        resp = sanity_mutate(chunk)
                        patched += len(resp.get("results", []))
                        break
                    except Exception as ex:
                        print(f"    [WARN] mutate attempt {attempt+1}: {ex}")
                        await asyncio.sleep(3)
                time.sleep(0.2)

        # [POPRAWA 4] Zapis logu i progressu po każdym batchu
        append_log(log_entries)

        prog["done"]         += patched
        prog["errors"]       += batch_errors
        prog["batches_done"] += 1
        prog["next_start"]    = start_from + e      # ← kluczowe dla resume
        prog["mode_stats"]["summarize"] += mode_counts["summarize"]
        prog["mode_stats"]["generate"]  += mode_counts["generate"]
        save_progress(prog)

        print(f"    ✓ Wygenerowano: {batch_ok} | Patchowane: {patched} | Błędy: {batch_errors}")
        print(f"    Progress: {prog['done']} łącznie | next_start={prog['next_start']}")
        await asyncio.sleep(1)

    print(f"\n{'='*55}")
    print(f"[DONE] ✅ Patchowane: {prog['done']}")
    print(f"       ❌ Błędy:     {prog['errors']}")
    print(f"       📋 Tryby:     generate={prog['mode_stats']['generate']} / summarize={prog['mode_stats']['summarize']}")
    print(f"       Log: {LOG_FILE}")

if __name__ == "__main__":
    asyncio.run(main())
