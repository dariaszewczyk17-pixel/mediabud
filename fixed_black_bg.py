#!/usr/bin/env python3
"""
fixed_black_bg.py  -  POPRAWIONY algorytm: flood-fill od krawędzi (scipy)
Usuwa TYLKO tło połączone z krawędziami, nie jasne kolory produktu.

Użycie:
  python3 fixed_black_bg.py [workers] [products_file] [--force]
  
  --force  : pomija sprawdzanie has_white_bg (dla naprawy uszkodzonych)
"""
import json, io, time, os, sys, requests, threading
import numpy as np
from PIL import Image
from queue import Queue
from threading import Lock
from scipy.ndimage import label, binary_dilation

TOKEN    = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
SAN_BASE = "https://nzcwegq7.api.sanity.io/v2021-06-07/data"
SAN_HDR  = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
WEB_HDR  = {"User-Agent": "Mozilla/5.0 Chrome/120.0"}
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Parametry z CLI
WORKERS       = 4
PRODUCTS_FILE = os.path.join(BASE_DIR, "repair_list.json")
FORCE_MODE    = False  # True = zawsze przetwarzaj (do naprawy uszkodzonych)

for arg in sys.argv[1:]:
    if arg == "--force":
        FORCE_MODE = True
    elif arg.isdigit():
        WORKERS = int(arg)
    elif arg.endswith(".json"):
        PRODUCTS_FILE = os.path.join(BASE_DIR, arg) if not arg.startswith("/") else arg

LOG_FILE  = os.path.join(BASE_DIR, os.path.basename(PRODUCTS_FILE).replace(".json","_log.json"))
WHITE_THR = 218
IMG_SIZE, PAD = (1200, 1200), 80

# Shared state
log_lock   = Lock()
count_lock = Lock()
results    = []
counters   = {"updated": 0, "skip": 0, "error": 0, "done": 0}


def has_white_bg(raw: bytes) -> bool:
    """Sprawdza czy obraz ma białe tło (>55% jasnych pikseli na krawędziach)."""
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        arr = np.array(img, dtype=np.uint8)
        h, w = arr.shape[:2]
        es = max(4, h // 20)
        edge = np.concatenate([
            arr[:es, :, :3].reshape(-1, 3),
            arr[-es:, :, :3].reshape(-1, 3),
            arr[:, :es, :3].reshape(-1, 3),
            arr[:, -es:, :3].reshape(-1, 3),
        ])
        wc = ((edge[:,0] >= WHITE_THR) & (edge[:,1] >= WHITE_THR) & (edge[:,2] >= WHITE_THR)).sum()
        return wc / len(edge) > 0.55
    except:
        return False


def make_black_bg(raw: bytes):
    """
    POPRAWIONY algorytm: flood-fill od krawędzi.
    Usuwa TYLKO białe/jasne piksele połączone z transparentnymi krawędziami,
    NIE usuwa jasnych kolorów wewnątrz produktu (np. białe napisy na worku).
    """
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        arr = np.array(img, dtype=np.uint8).copy()

        # 1. Piksele transparentne (bechcicki.pl ma alpha=0 na krawędziach)
        transparent = (arr[:,:,3] == 0)

        # 2. Kandydaci na tło: jasne piksele z alpha>0
        white_candidate = (
            (arr[:,:,0] >= WHITE_THR) &
            (arr[:,:,1] >= WHITE_THR) &
            (arr[:,:,2] >= WHITE_THR) &
            (arr[:,:,3] > 0)
        )

        # 3. Labeled connected components jasnych pikseli
        labeled, n = label(white_candidate)

        if n > 0:
            # 4. Rozszerz transparentny obszar o 2px, żeby "dotknął" sąsiednie białe tło
            dilated_transparent = binary_dilation(transparent, iterations=2)

            # 5. Znajdź etykiety komponentów dotykających transparentnego obszaru
            touching = dilated_transparent & white_candidate
            edge_labels = set(labeled[touching].tolist())
            edge_labels.discard(0)

            # 6. Bezpiecznik: komponenty dotykające PIKSELI BRZEGU obrazu (wiersz 0, -1, kol 0, -1)
            h, w = arr.shape[:2]
            border_labels = set()
            border_labels.update(labeled[0, :].tolist())
            border_labels.update(labeled[h-1, :].tolist())
            border_labels.update(labeled[:, 0].tolist())
            border_labels.update(labeled[:, w-1].tolist())
            border_labels.discard(0)

            # 7. Usuń TYLKO komponenty tła (nie produktu)
            bg_labels = edge_labels | border_labels
            if bg_labels:
                bg_mask = np.isin(labeled, list(bg_labels))
                arr[bg_mask, 3] = 0

        # 8. Upewnij się że transparentne krawędzie są nadal przezroczyste
        arr[transparent, 3] = 0

        # 9. Sprawdź czy produkt ma jakiekolwiek piksele
        fg = Image.fromarray(arr, "RGBA")
        if (arr[:,:,3] > 0).sum() < 200:
            return None

        # 10. Kompozyt na czarnym tle 1200×1200
        canvas = Image.new("RGB", IMG_SIZE, (0, 0, 0))
        mw, mh = IMG_SIZE[0] - PAD * 2, IMG_SIZE[1] - PAD * 2
        r = fg.width / fg.height
        nw = mw if r >= 1 else max(1, int(mh * r))
        nh = max(1, int(nw / r)) if r >= 1 else mh
        fgr = fg.resize((nw, nh), Image.LANCZOS)
        canvas.paste(fgr, ((IMG_SIZE[0]-nw)//2, (IMG_SIZE[1]-nh)//2), fgr.split()[3])

        buf = io.BytesIO()
        canvas.save(buf, "JPEG", quality=92)
        return buf.getvalue()

    except Exception as e:
        return None


def upload_jpg(data: bytes):
    try:
        r = requests.post(
            "https://nzcwegq7.api.sanity.io/v2021-06-07/assets/images/production",
            headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "image/jpeg"},
            data=data, timeout=60
        )
        return r.json().get("document", {}).get("_id")
    except:
        return None


def patch_product(pid: str, asset_id: str):
    key = asset_id.split("-")[1][:8] if "-" in asset_id else "i0"
    img = {"_type": "image", "asset": {"_type": "reference", "_ref": asset_id}}
    r = requests.post(
        f"{SAN_BASE}/mutate/production",
        json={"mutations": [{"patch": {"id": pid, "set": {
            "images": [{"_key": key, "_type": "image", "asset": {"_type": "reference", "_ref": asset_id}}],
            "mainImage": img
        }}}]},
        headers=SAN_HDR, timeout=30
    )
    return bool(r.json().get("results"))


def worker(q: Queue, total: int):
    while True:
        item = q.get()
        if item is None:
            q.task_done()
            break

        pid, url = item["_id"], item.get("url", "")
        status = "skip_no_url"

        try:
            if url:
                r = requests.get(url, headers=WEB_HDR, timeout=20)
                if r.status_code == 200:
                    raw = r.content
                    # FORCE_MODE = zawsze przetwarzaj (naprawa uszkodzonych)
                    # normalny tryb = tylko białe tła
                    if FORCE_MODE or has_white_bg(raw):
                        jpg = make_black_bg(raw)
                        if jpg:
                            aid = upload_jpg(jpg)
                            if aid and patch_product(pid, aid):
                                status = f"updated({len(jpg)//1024}KB)"
                            else:
                                status = "error_upload"
                        else:
                            status = "error_bg"
                    else:
                        status = "skip_dark"
                else:
                    status = f"skip_http{r.status_code}"
        except Exception as e:
            status = f"error:{str(e)[:50]}"

        with count_lock:
            counters["done"] += 1
            if "updated" in status:
                counters["updated"] += 1
            elif "skip" in status:
                counters["skip"] += 1
            else:
                counters["error"] += 1
            done = counters["done"]

        with log_lock:
            results.append({"_id": pid, "url": url, "status": status})

        if done % 100 == 0:
            pct = done * 100 // total
            print(f"[{done}/{total}] {pct}% ✅{counters['updated']} ⏭{counters['skip']} ❌{counters['error']}", flush=True)

        q.task_done()


def main():
    print(f"📁 Plik: {PRODUCTS_FILE}")
    print(f"🔧 Tryb: {'FORCE (naprawa)' if FORCE_MODE else 'normalny'}")
    print(f"🧵 Wątki: {WORKERS}")

    with open(PRODUCTS_FILE) as f:
        products = json.load(f)

    total = len(products)
    print(f"📦 Produkty: {total}", flush=True)

    q = Queue(maxsize=WORKERS * 8)
    threads = [threading.Thread(target=worker, args=(q, total), daemon=True) for _ in range(WORKERS)]
    for t in threads:
        t.start()

    t0 = time.time()
    for p in products:
        q.put(p)
    for _ in range(WORKERS):
        q.put(None)
    q.join()

    elapsed = int(time.time() - t0)

    with open(LOG_FILE, "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*55}")
    print(f"✅ Zaktualizowano:  {counters['updated']}")
    print(f"⏭  Pominięto:       {counters['skip']}")
    print(f"❌ Błędy:            {counters['error']}")
    print(f"⏱  Czas: {elapsed}s ({elapsed//60}m {elapsed%60}s)")
    print(f"📄 Log: {LOG_FILE}")
    print(f"{'='*55}")


if __name__ == "__main__":
    main()
