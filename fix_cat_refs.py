#!/usr/bin/env python3
"""
Fix category references: remap products from wrong-slug categories to correct-slug categories.
Also fixes slugs for categories that have no correct counterpart.
"""
import json, urllib.request, urllib.parse, time, sys

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT  = "nzcwegq7"
DATASET  = "production"
BASE_Q   = f"https://{PROJECT}.api.sanity.io/v2023-08-01/data/query/{DATASET}"
BASE_M   = f"https://{PROJECT}.api.sanity.io/v2023-08-01/data/mutate/{DATASET}"
REMAP_F  = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud/cat_remap.json"
LOG_F    = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud/fix_cat_log.json"

PATCH_BATCH = 100  # produktów na jeden request


def sanity_query(groq):
    url = BASE_Q + "?query=" + urllib.parse.quote(groq)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {TOKEN}"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())["result"]


def sanity_mutate(mutations):
    data = json.dumps({"mutations": mutations}).encode()
    req = urllib.request.Request(BASE_M, data=data, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
    })
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())


def main():
    with open(REMAP_F) as f:
        remap_data = json.load(f)

    remap   = remap_data["remap"]      # old_id → {new_id, ...}
    no_match = remap_data["no_match"]  # kategorie bez odpowiednika

    log = {"remapped_products": 0, "fixed_slugs": 0, "errors": [], "details": []}

    # ── Krok 1: przepnij referencje produktów (old_cat_id → new_cat_id) ─────────
    print(f"\n[1/2] Przepinanie produktów dla {len(remap)} kategorii...")

    for old_id, info in remap.items():
        new_id    = info["new_id"]
        old_slug  = info["old_slug"]
        new_slug  = info["new_slug"]
        name      = info["name"]

        # Pobierz _id wszystkich produktów w tej starej kategorii
        prods = sanity_query(
            f'*[_type=="product" && category._ref == "{old_id}"]._id'
        )
        if not prods:
            print(f"  {name}: brak produktów (skip)")
            continue

        print(f"  {name} ({old_slug} → {new_slug}): {len(prods)} produktów...")

        # Patchuj w batch'ach
        patched = 0
        for i in range(0, len(prods), PATCH_BATCH):
            chunk = prods[i:i+PATCH_BATCH]
            mutations = [
                {"patch": {"id": pid, "set": {"category": {"_type": "reference", "_ref": new_id}}}}
                for pid in chunk
            ]
            try:
                resp = sanity_mutate(mutations)
                patched += len(resp.get("results", []))
            except Exception as e:
                err = f"mutate error for {old_id}: {e}"
                print(f"  ❌ {err}")
                log["errors"].append(err)
            time.sleep(0.2)

        log["remapped_products"] += patched
        log["details"].append({"name": name, "old_slug": old_slug, "new_slug": new_slug,
                                "total": len(prods), "patched": patched})
        print(f"    ✓ {patched}/{len(prods)} patchowane")

    # ── Krok 2: napraw slug dla kategorii bez odpowiednika ───────────────────────
    print(f"\n[2/2] Naprawa slugów dla {len(no_match)} kategorii bez odpowiednika...")

    for m in no_match:
        old_id   = m["old_id"]
        old_slug = m["old_slug"]
        new_slug = m["expected_slug"]
        name     = m["name"]

        # Zaktualizuj slug kategorii
        mutations = [{"patch": {"id": old_id, "set": {"slug": {"_type": "slug", "current": new_slug}}}}]
        try:
            sanity_mutate(mutations)
            log["fixed_slugs"] += 1
            print(f"  ✓ {name}: {old_slug} → {new_slug}")
        except Exception as e:
            err = f"slug fix error for {old_id}: {e}"
            print(f"  ❌ {err}")
            log["errors"].append(err)
        time.sleep(0.1)

    # ── Podsumowanie ─────────────────────────────────────────────────────────────
    with open(LOG_F, "w") as f:
        json.dump(log, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*50}")
    print(f"✅ Przepięte produkty: {log['remapped_products']}")
    print(f"✅ Naprawione slugi:   {log['fixed_slugs']}")
    print(f"❌ Błędy:             {len(log['errors'])}")
    print(f"Log: {LOG_F}")


if __name__ == "__main__":
    main()
