#!/usr/bin/env python3
"""
fast_black_bg.py  -  4 wątki równolegle, reads products_to_fix.json
~30 minut dla 11 000 produktów
"""
import json, io, time, os, sys, requests, threading
import numpy as np
from PIL import Image
from queue import Queue
from threading import Lock

TOKEN    = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
SAN_BASE = "https://nzcwegq7.api.sanity.io/v2021-06-07/data"
SAN_HDR  = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
WEB_HDR  = {"User-Agent": "Mozilla/5.0 Chrome/120.0"}
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(BASE_DIR, "fast_black_bg_log.json")
WORKERS  = int(sys.argv[1]) if len(sys.argv) > 1 else 4
WHITE_THR = 218
IMG_SIZE, PAD = (1200, 1200), 80

# Shared state
log_lock   = Lock()
count_lock = Lock()
results    = []
counters   = {"updated": 0, "skip_white": 0, "skip_img": 0, "error": 0, "done": 0}

def has_white_bg(raw: bytes) -> bool:
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        arr = np.array(img, dtype=np.uint8)
        h, w = arr.shape[:2]
        es = max(4, h // 20)
        edge = np.concatenate([arr[:es,:,:3].reshape(-1,3), arr[-es:,:,:3].reshape(-1,3),
                                arr[:,:es,:3].reshape(-1,3), arr[:,-es:,:3].reshape(-1,3)])
        wc = ((edge[:,0]>=WHITE_THR)&(edge[:,1]>=WHITE_THR)&(edge[:,2]>=WHITE_THR)).sum()
        return wc / len(edge) > 0.55
    except:
        return False

def make_black_bg(raw: bytes):
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        arr = np.array(img, dtype=np.uint8).copy()
        m = (arr[:,:,3]>0)&(arr[:,:,0]>=WHITE_THR)&(arr[:,:,1]>=WHITE_THR)&(arr[:,:,2]>=WHITE_THR)
        arr[m,3] = 0
        fg = Image.fromarray(arr,"RGBA")
        if (arr[:,:,3]>0).sum() < 200: return None
        c = Image.new("RGB", IMG_SIZE, (0,0,0))
        mw,mh = IMG_SIZE[0]-PAD*2, IMG_SIZE[1]-PAD*2
        r = fg.width/fg.height
        nw = mw if r>=1 else max(1,int(mh*r))
        nh = max(1,int(nw/r)) if r>=1 else mh
        fgr = fg.resize((nw,nh), Image.LANCZOS)
        c.paste(fgr,((IMG_SIZE[0]-nw)//2,(IMG_SIZE[1]-nh)//2), fgr.split()[3])
        buf = io.BytesIO(); c.save(buf,"JPEG",quality=92); return buf.getvalue()
    except:
        return None

def upload_jpg(data: bytes):
    try:
        r = requests.post(f"https://nzcwegq7.api.sanity.io/v2021-06-07/assets/images/production",
            headers={"Authorization":f"Bearer {TOKEN}","Content-Type":"image/jpeg"},
            data=data, timeout=60)
        return r.json().get("document",{}).get("_id")
    except:
        return None

def patch_product(pid: str, asset_id: str):
    key = asset_id.split("-")[1][:8] if "-" in asset_id else "i0"
    img = {"_type":"image","asset":{"_type":"reference","_ref":asset_id}}
    r = requests.post(f"{SAN_BASE}/mutate/production",
        json={"mutations":[{"patch":{"id":pid,"set":{"images":[{"_key":key,"_type":"image","asset":{"_type":"reference","_ref":asset_id}}],"mainImage":img}}}]},
        headers=SAN_HDR, timeout=30)
    return bool(r.json().get("results"))

def worker(q: Queue, total: int):
    while True:
        item = q.get()
        if item is None:
            q.task_done(); break
        pid, url = item["_id"], item.get("url","")
        status = "skip_img"
        try:
            if url:
                r = requests.get(url, headers=WEB_HDR, timeout=15)
                if r.status_code == 200:
                    raw = r.content
                    if has_white_bg(raw):
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
                        status = "skip_white"
        except Exception as e:
            status = f"error:{str(e)[:40]}"

        with count_lock:
            counters["done"] += 1
            if "updated" in status:   counters["updated"] += 1
            elif "skip_white" in status: counters["skip_white"] += 1
            elif "skip_img" in status:   counters["skip_img"] += 1
            else:                        counters["error"] += 1
            done = counters["done"]

        with log_lock:
            results.append({"_id": pid, "status": status})

        if done % 200 == 0:
            pct = done * 100 // total
            print(f"[{done}/{total}] {pct}% ✅{counters['updated']} ⏭{counters['skip_white']} ❌{counters['error']}", flush=True)

        q.task_done()

def main():
    with open(os.path.join(BASE_DIR, "products_to_fix.json")) as f:
        products = json.load(f)

    total = len(products)
    print(f"Produkty: {total}, wątki: {WORKERS}", flush=True)

    q = Queue(maxsize=WORKERS * 8)
    threads = [threading.Thread(target=worker, args=(q, total), daemon=True) for _ in range(WORKERS)]
    for t in threads: t.start()

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
    print(f"⏭  Już OK (ciemne): {counters['skip_white']}")
    print(f"⚠  Brak img:        {counters['skip_img']}")
    print(f"❌ Błędy:            {counters['error']}")
    print(f"⏱  Czas: {elapsed}s ({elapsed//60}m)")
    print(f"📄 Log: {LOG_FILE}")
    print(f"{'='*55}")

if __name__ == "__main__":
    main()
