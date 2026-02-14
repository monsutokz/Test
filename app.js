
/* ================= RUNTIME ERROR OVERLAY =================
   If something breaks at runtime, show it on-screen (helps debugging without console).
=========================================================== */
(function(){
  function show(msg){
    try{
      let el = document.getElementById("runtimeErrorOverlay");
      if(!el){
        el = document.createElement("div");
        el.id = "runtimeErrorOverlay";
        el.style.position = "fixed";
        el.style.left = "12px";
        el.style.right = "12px";
        el.style.bottom = "12px";
        el.style.zIndex = "999999";
        el.style.background = "rgba(150,0,0,.92)";
        el.style.color = "#fff";
        el.style.padding = "12px 14px";
        el.style.borderRadius = "12px";
        el.style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        el.style.fontSize = "12px";
        el.style.whiteSpace = "pre-wrap";
        el.style.boxShadow = "0 10px 24px rgba(0,0,0,.35)";
        el.addEventListener("click", ()=> el.remove());
        document.body.appendChild(el);
      }
      el.textContent = msg + "\n(クリックで閉じる)";
    }catch(e){}
  }
  window.addEventListener("error", (e)=>{
    show("RuntimeError: " + (e.message || "unknown") + "\n" + (e.filename||"") + ":" + (e.lineno||"") );
  });
  window.addEventListener("unhandledrejection", (e)=>{
    show("UnhandledPromiseRejection: " + (e.reason && (e.reason.stack || e.reason.message) ? (e.reason.stack||e.reason.message) : String(e.reason)));
  });
})();

const STORAGE_KEY = "my_bookshelf_state_v5_images_paths";

const els = {
  q: document.getElementById("q"),
  btnModeAll: document.getElementById("btnModeAll"),
  btnModeSeries: document.getElementById("btnModeSeries"),
  btnViewSpine: document.getElementById("btnViewSpine"),
  btnViewCover: document.getElementById("btnViewCover"),
  modeHint: document.getElementById("modeHint"),

  btnOpenSeriesModal: document.getElementById("btnOpenSeriesModal"),
  btnRecolorSeriesRandom: document.getElementById("btnRecolorSeriesRandom"),
  seriesList: document.getElementById("seriesList"),
  shelfTitle: document.getElementById("shelfTitle"),
  shelfMeta: document.getElementById("shelfMeta"),
  shelf: document.getElementById("shelf"),

  btnAddSpine: document.getElementById("btnAddSpine"),
  btnToggleSelectMode: document.getElementById("btnToggleSelectMode"),
  btnSeriesDelete: document.getElementById("btnSeriesDelete"),

  btnAllOwned: document.getElementById("btnAllOwned"),
  btnAllUnowned: document.getElementById("btnAllUnowned"),
  rangeFrom: document.getElementById("rangeFrom"),
  rangeTo: document.getElementById("rangeTo"),
  btnRangeOwned: document.getElementById("btnRangeOwned"),
  btnRangeUnowned: document.getElementById("btnRangeUnowned"),

  selectBar: document.getElementById("selectBar"),
  selectedCount: document.getElementById("selectedCount"),
  btnSelOwned: document.getElementById("btnSelOwned"),
  btnSelUnowned: document.getElementById("btnSelUnowned"),
  btnSelDelete: document.getElementById("btnSelDelete"),
  btnSelClear: document.getElementById("btnSelClear"),
  btnSelExit: document.getElementById("btnSelExit"),

  modal: document.getElementById("modal"),
  cover: document.getElementById("cover"),
  btnCloseModal: document.getElementById("btnCloseModal"),
  mTitle: document.getElementById("mTitle"),
  mMeta: document.getElementById("mMeta"),
  // book-like detail view
  tabView: document.getElementById("tabView"),
  tabEdit: document.getElementById("tabEdit"),
  paneView: document.getElementById("paneView"),
  paneEdit: document.getElementById("paneEdit"),
  detailCoverLarge: document.getElementById("detailCoverLarge"),
  spineTitleFixed: document.getElementById("spineTitleFixed"),
  vSeries: document.getElementById("vSeries"),
  vVolNo: document.getElementById("vVolNo"),
  vPublisher: document.getElementById("vPublisher"),
  vIsbn: document.getElementById("vIsbn"),
  vLink: document.getElementById("vLink"),
  vDisplayTitle: document.getElementById("vDisplayTitle"),
  vSite: document.getElementById("vSite"),
  vUrl: document.getElementById("vUrl"),
  vSpineText: document.getElementById("vSpineText"),
  vSpineColor: document.getElementById("vSpineColor"),
  mSeries: document.getElementById("mSeries"),
  mVolNo: document.getElementById("mVolNo"),
  mPublisher: document.getElementById("mPublisher"),
  mIsbn: document.getElementById("mIsbn"),
  mLink: document.getElementById("mLink"),
  btnToggleOwned: document.getElementById("btnToggleOwned"),
  btnDeleteVolume: document.getElementById("btnDeleteVolume"),

  // per-volume editor (paths)
  mCoverPrev: document.getElementById("mCoverPrev"),
  mCoverPath: document.getElementById("mCoverPath"),
  mCoverPick: document.getElementById("mCoverPick"),
  btnUseCoverFilename: document.getElementById("btnUseCoverFilename"),
  btnTrimCover: document.getElementById("btnTrimCover"),
  btnDlTrimCover: document.getElementById("btnDlTrimCover"),

  mSpinePrev: document.getElementById("mSpinePrev"),
  mSpinePath: document.getElementById("mSpinePath"),
  mSpinePick: document.getElementById("mSpinePick"),
  btnUseSpineFilename: document.getElementById("btnUseSpineFilename"),
  btnTrimSpine: document.getElementById("btnTrimSpine"),
  btnDlTrimSpine: document.getElementById("btnDlTrimSpine"),

  mDisplayTitle: document.getElementById("mDisplayTitle"),
  mSite: document.getElementById("mSite"),
  mUrl: document.getElementById("mUrl"),
  mSpineText: document.getElementById("mSpineText"),
  mSpineColor: document.getElementById("mSpineColor"),
  mStoragePath: document.getElementById("mStoragePath"),
  btnOpenLink: document.getElementById("btnOpenLink"),
  btnToEdit: document.getElementById("btnToEdit"),
  btnToView: document.getElementById("btnToView"),
  btnToggleOwned2: document.getElementById("btnToggleOwned2"),
  btnCloseModal2: document.getElementById("btnCloseModal2"),
  vStoragePath: document.getElementById("vStoragePath"),
  btnSaveMeta: document.getElementById("btnSaveMeta"),

  // series modal
  seriesModal: document.getElementById("seriesModal"),
  btnCloseSeriesModal: document.getElementById("btnCloseSeriesModal"),
  smName: document.getElementById("smName"),
  smSlug: document.getElementById("smSlug"),
  smColor: document.getElementById("smColor"),
  smMeta: document.getElementById("smMeta"),
  btnSaveSeries: document.getElementById("btnSaveSeries"),
  btnCancelSeries: document.getElementById("btnCancelSeries"),

  // add modal
  addModal: document.getElementById("addModal"),
  btnCloseAdd: document.getElementById("btnCloseAdd"),
  addSeriesSelect: document.getElementById("addSeriesSelect"),
  addTitle: document.getElementById("addTitle"),
  addVolNo: document.getElementById("addVolNo"),
  addOwned: document.getElementById("addOwned"),
  addSite: document.getElementById("addSite"),
  addUrl: document.getElementById("addUrl"),
  addCoverPath: document.getElementById("addCoverPath"),
  addSpinePath: document.getElementById("addSpinePath"),
  addColor: document.getElementById("addColor"),
  btnAddSubmit: document.getElementById("btnAddSubmit"),
  addRangeFrom: document.getElementById("addRangeFrom"),
  addRangeTo: document.getElementById("addRangeTo"),
  addRangeBase: document.getElementById("addRangeBase"),
  addRangeOwned: document.getElementById("addRangeOwned"),
  addRangeSite: document.getElementById("addRangeSite"),
  addRangeUrlPrefix: document.getElementById("addRangeUrlPrefix"),
  addRangeCoverPrefix: document.getElementById("addRangeCoverPrefix"),
  addRangeSpinePrefix: document.getElementById("addRangeSpinePrefix"),
  btnAddRangeSubmit: document.getElementById("btnAddRangeSubmit"),
  missingHint: document.getElementById("missingHint"),
};

const state = loadState();
try{ saveState(); }catch(e){}

/* -----------------------------
   State
------------------------------ */
function defaultState(){
  return {
    series: [],
    volumes: {}, // seriesId -> [volume...]
    currentSeriesId: null,
    ui: {
      selectionMode: false,
      selectedIds: [],
      lastClickedIndex: null,
      openVolumeId: null,
      displayMode: "series", // series | all
      viewMode: "spine",     // spine | cover
    }
  };
}

function ensureCacheBuster(){
  if(!state.ui) state.ui = {};
  if(state.ui.cacheBuster == null) state.ui.cacheBuster = 0;
}
function withCacheBuster(url){
  const u = (url || "").trim();
  if(!u) return "";
  ensureCacheBuster();
  const cb = state.ui.cacheBuster || 0;
  if(!cb) return u;
  if(u.includes("cb=")) return u;
  return u + (u.includes("?") ? "&" : "?") + "cb=" + encodeURIComponent(String(cb));
}
function bumpCacheBuster(){
  ensureCacheBuster();
  state.ui.cacheBuster = Date.now();
  try{ saveState(); }catch(e){}
  try{ renderAll(); }catch(e){}
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const obj = JSON.parse(raw);
    const d = defaultState();
    obj.ui = Object.assign(d.ui, obj.ui || {});
    const merged = Object.assign(d, obj);
    try{ normalizeState(merged); }catch(e){}
    return merged;
  }catch{
    return defaultState();
  }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); queueRemoteSave(); }
/* ================= REMOTE BOOKS.JSON SYNC =================
   Share the same data across PC/phone by using server-side books.json
=========================================================== */
const BOOKS_API = "/api/books";
function replaceStateWith(obj){
  // mutate in-place (state is const)
  try{
    for(const k of Object.keys(state)) delete state[k];
    Object.assign(state, obj || {});
  }catch(e){}
  try{ normalizeState(state); }catch(e){}
}
async function loadRemoteBooks(){
  try{
    const res = await fetch(BOOKS_API, {cache:"no-store"});
    if(!res.ok) return null;
    const data = await res.json();
    return data;
  }catch(e){
    return null;
  }
}
async function saveRemoteBooks(){
  try{
    normalizeState(state);
    await fetch(BOOKS_API, {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(state)
    });
    return true;
  }catch(e){
    return false;
  }
}
// Debounced remote save (avoid spamming)
let _remoteSaveT = null;
function queueRemoteSave(){
  clearTimeout(_remoteSaveT);
  _remoteSaveT = setTimeout(()=>{ saveRemoteBooks(); }, 250);
}

function uid(prefix="id"){ return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`; }
function norm(s){ return (s||"").toLowerCase().replace(/\s+/g," ").replace(/[‐-–—―]/g,"-").trim(); }
function jpTrimTitle(t){
  return (t || "")
    .replace(/（.*?）/g,"")
    .replace(/\(.*?\)/g,"")
    .replace(/[―ー\-–—]\s*.*$/g,"")
    .trim();
}
function escapeHtml(s){
  return String(s ?? "")
    .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
    .replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

/* -----------------------------
   Auto Trim (余白自動トリミング)
   - ブラウザ内で画像を解析し、外周の「同一色っぽい余白」を削る
   - 生成したトリム画像は "ダウンロード" して images/ 配下に置く運用
------------------------------ */
const _trimCache = {
  cover: new Map(), // volumeId -> {blob, url, filename}
  spine: new Map(),
};

function avgCornerColor(imgData, w, h, sample=6){
  // 4 corners average
  const pts = [
    [0,0],[w-1,0],[0,h-1],[w-1,h-1],
    [sample, sample],[w-1-sample, sample],[sample, h-1-sample],[w-1-sample, h-1-sample]
  ];
  let r=0,g=0,b=0,c=0;
  for(const [x,y] of pts){
    const i = (y*w + x)*4;
    r += imgData[i]; g += imgData[i+1]; b += imgData[i+2]; c++;
  }
  return {r:r/c, g:g/c, b:b/c};
}
function colorDist(p, bg){
  const dr = p.r - bg.r, dg = p.g - bg.g, db = p.b - bg.b;
  return Math.sqrt(dr*dr + dg*dg + db*db);
}
function pxAt(data, w, x, y){
  const i = (y*w + x)*4;
  return {r:data[i], g:data[i+1], b:data[i+2], a:data[i+3]};
}
function isBgPixel(p, bg, thr=18, alphaThr=8){
  if(p.a <= alphaThr) return true;
  return colorDist(p, bg) <= thr;
}

async function fileToImageBitmap(file){
  const url = URL.createObjectURL(file);
  try{
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    // don't revoke here, we still may use it? image decoded already OK
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  }
}

async function trimImageFile(file, {bgThr=18, alphaThr=8, margin=0} = {}){
  const img = await fileToImageBitmap(file);
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;

  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", {willReadFrequently:true});
  ctx.drawImage(img, 0, 0);

  const {data} = ctx.getImageData(0,0,w,h);
  const bg = avgCornerColor(data, w, h);

  // scan bounds
  let top=0, bottom=h-1, left=0, right=w-1;

  // top
  outer: for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const p = pxAt(data,w,x,y);
      if(!isBgPixel(p,bg,bgThr,alphaThr)){ top=y; break outer; }
    }
  }
  // bottom
  outer: for(let y=h-1;y>=0;y--){
    for(let x=0;x<w;x++){
      const p = pxAt(data,w,x,y);
      if(!isBgPixel(p,bg,bgThr,alphaThr)){ bottom=y; break outer; }
    }
  }
  // left
  outer: for(let x=0;x<w;x++){
    for(let y=0;y<h;y++){
      const p = pxAt(data,w,x,y);
      if(!isBgPixel(p,bg,bgThr,alphaThr)){ left=x; break outer; }
    }
  }
  // right
  outer: for(let x=w-1;x>=0;x--){
    for(let y=0;y<h;y++){
      const p = pxAt(data,w,x,y);
      if(!isBgPixel(p,bg,bgThr,alphaThr)){ right=x; break outer; }
    }
  }

  // fallback: if detection failed (all bg), keep original
  if(right <= left || bottom <= top){
    return {blob:file, objectUrl: URL.createObjectURL(file), rect:{x:0,y:0,w,h}, unchanged:true};
  }

  // add margin
  left = Math.max(0, left - margin);
  top = Math.max(0, top - margin);
  right = Math.min(w-1, right + margin);
  bottom = Math.min(h-1, bottom + margin);

  const tw = right-left+1;
  const th = bottom-top+1;

  const out = document.createElement("canvas");
  out.width = tw; out.height = th;
  const octx = out.getContext("2d");
  octx.drawImage(canvas, left, top, tw, th, 0, 0, tw, th);

  const blob = await new Promise((resolve)=> out.toBlob(resolve, "image/png", 0.92));
  const objectUrl = URL.createObjectURL(blob);
  return {blob, objectUrl, rect:{x:left,y:top,w:tw,h:th}, unchanged:false};
}

function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 1500);
}

function currentOpenSeriesAndVolume(){
  const vid = state.ui.openVolumeId;
  if(!vid) return null;
  const hit = findVolumeById(vid);
  return hit ? hit : null;
}
function editionHint(title){
  const t = title || "";
  const rules = [
    ["kanzenban", /(完全版|完全|パーフェクト|PERFECT)/i],
    ["shinsoban", /(新装版|新装)/i],
    ["aizouban", /(愛蔵版|豪華版|特装版)/i],
    ["bunko", /(文庫)/i],
    ["english", /(english|英語版)/i],
    ["digital", /(電子|kindle|kobo)/i],
  ];
  for(const [k, re] of rules){ if(re.test(t)) return k; }
  return "normal";
}
function editionLabel(k){
  const map = {
    normal:"通常版", kanzenban:"完全版", shinsoban:"新装版", aizouban:"愛蔵版",
    bunko:"文庫", english:"英語版", digital:"電子/デジタル", manual:"手動",
  };
  return map[k] || k;
}
function pickSeriesColor(seedStr){
  const s = norm(seedStr);
  let h = 0;
  for(let i=0;i<s.length;i++){ h = (h * 31 + s.charCodeAt(i)) >>> 0; }
  return `hsl(${h % 360} 70% 45%)`;

}
function suggestSlug(name, fallbackId=""){
  // フォルダ名向けに安全なslugを生成（英数/_/-）
  let s = (name || "");
  s = s.replace(/（.*?）/g,"").replace(/\(.*?\)/g,"");
  s = s.replace(/[^\w\s\-]/g, " ");         // non-word -> space
  s = s.trim().replace(/\s+/g, "_");
  s = s.replace(/_+/g,"_").replace(/^_+|_+$/g,"");
  if(!s){
    const tail = (fallbackId || "").slice(-6) || Math.random().toString(16).slice(2,8);
    s = `SERIES_${tail.toUpperCase()}`;
  }
  return s;
}
function pad2(n){
  const x = String(n);
  return x.length >= 2 ? x : ("0" + x);
}
function defaultCoverPath(series, volNo){
  if(!series || !series.slug || volNo == null) return "";
  return `images/covers/${series.slug}/${pad2(volNo)}.png`;
}
function defaultSpinePath(series, volNo){
  if(!series || !series.slug || volNo == null) return "";
  return `images/spines/${series.slug}/${pad2(volNo)}.png`;
}
function coverPathFromFilename(series, filename){
  if(!series || !series.slug) return `images/covers/${filename}`;
  return `images/covers/${series.slug}/${filename}`;
}
function spinePathFromFilename(series, filename){
  if(!series || !series.slug) return `images/spines/${filename}`;
  return `images/spines/${series.slug}/${filename}`;
}

function extractIsbn13(item){
  const ids = item?.volumeInfo?.industryIdentifiers || [];
  return ids.find(x => x.type === "ISBN_13")?.identifier || "";
}
function extractThumb(item){
  const img = item?.volumeInfo?.imageLinks;
  const t = img?.thumbnail || img?.smallThumbnail || "";
  return t ? t.replace(/^http:\/\//, "https://") : "";
}
function extractAuthors(item){ return (item?.volumeInfo?.authors || []).join(", "); }
function extractPublisher(item){ return item?.volumeInfo?.publisher || ""; }
function extractLang(item){ return item?.volumeInfo?.language || ""; }
function extractInfoLink(item){ return item?.volumeInfo?.infoLink || ""; }
function extractVolumeNo(title){
  const t = (title || "").trim();
  let m = t.match(/第\s*(\d{1,4})\s*巻/); if(m) return parseInt(m[1],10);
  m = t.match(/(\d{1,4})\s*巻\b/); if(m) return parseInt(m[1],10);
  m = t.match(/\bvol\.?\s*(\d{1,4})\b/i); if(m) return parseInt(m[1],10);
  m = t.match(/(?:\s|^)(\d{1,4})\s*$/); if(m) return parseInt(m[1],10);
  return null;
}

function parseNumFromPath(path){
  const p = (path || "").trim();
  if(!p) return null;
  // match .../01.png or 01.jpg etc
  const m = p.match(/(?:^|\/)(\d{1,4})\.(png|jpe?g|webp)$/i);
  if(!m) return null;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) ? n : null;
}
function getVolNum(v){
  if(!v) return null;
  if(Number.isFinite(v.volume_no)) return v.volume_no;
  if(Number.isFinite(v.vol)) return v.vol;
  // try paths or title
  const n = parseNumFromPath(v.spinePath) ?? parseNumFromPath(v.coverPath) ?? extractVolumeNo(v.displayTitle) ?? extractVolumeNo(v.title);
  return Number.isFinite(n) ? n : null;
}
function normalizeVolume(v){
  if(!v || typeof v !== "object") return v;
  const n = getVolNum(v);
  if(v.volume_no == null && Number.isFinite(n)) v.volume_no = n;
  if(v.vol == null && Number.isFinite(n)) v.vol = n; // backward compatibility
  return v;
}
function normalizeState(st){
  if(!st || typeof st !== "object") return;
  if(!Array.isArray(st.series)) st.series = [];
  if(!st.volumes || typeof st.volumes !== "object") st.volumes = {};
  if(!st.ui || typeof st.ui !== "object") st.ui = {};
  if(!st.settings || typeof st.settings !== "object") st.settings = {};
  // ui defaults
  if(st.ui.selectionMode == null) st.ui.selectionMode = false;
  if(!Array.isArray(st.ui.selectedIds)) st.ui.selectedIds = [];
  if(st.ui.lastClickedIndex === undefined) st.ui.lastClickedIndex = null;
  if(st.ui.openVolumeId === undefined) st.ui.openVolumeId = null;
  if(st.ui.searchText == null) st.ui.searchText = "";
  // 端末別 rowCap（古いrowCapSpine/rowCapCoverはPC側へ）
  if(st.ui.rowCapSpine_pc == null) st.ui.rowCapSpine_pc = (st.ui.rowCapSpine ?? 20);
  if(st.ui.rowCapCover_pc == null) st.ui.rowCapCover_pc = (st.ui.rowCapCover ?? 10);
  if(st.ui.rowCapSpine_mobile == null) st.ui.rowCapSpine_mobile = 12;
  if(st.ui.rowCapCover_mobile == null) st.ui.rowCapCover_mobile = 6;

  // settings defaults (used in topbar)
  if(st.settings.viewMode == null) st.settings.viewMode = "spine";
  if(st.settings.displayMode == null) st.settings.displayMode = "series";
  if(st.settings.rowCapSpine == null) st.settings.rowCapSpine = 20;
  if(st.settings.rowCapCover == null) st.settings.rowCapCover = 10;

  // normalize volumes
  Object.keys(st.volumes).forEach(sid=>{
    const arr = st.volumes[sid];
    if(!Array.isArray(arr)){ st.volumes[sid] = []; return; }
    arr.forEach(v=>{
      if(v && typeof v === "object"){
        if(!v.seriesId) v.seriesId = sid;
        normalizeVolume(v);
      }
    });
  });
}

function shortTitle(t){
  const s = (t || "").trim();
  return s.length > 18 ? s.slice(0,18) + "…" : s;
}
function autoBaseFromSeriesName(name){
  return (name || "").replace(/（.*?）/g,"").trim();
}

/* -----------------------------
   Paths / preview helpers
------------------------------ */
function safeImageUrl(path){
  const p = (path || "").trim();
  if(!p) return "";
  // 表示優先：存在チェックや欠損キャッシュで隠さない
  return withCacheBuster(p);
}

function guessImagesPathFromFileInput(fileInput){
  const f = fileInput.files?.[0];
  if(!f) return "";
  // Recommend images/<filename>
  return `images/${f.name}`;
}
function objectUrlFromFileInput(fileInput){
  const f = fileInput.files?.[0];
  if(!f) return "";
  try{ return URL.createObjectURL(f); }catch{ return ""; }
}

/* -----------------------------
   Current helpers
------------------------------ */
function currentSeries(){ return state.series.find(s => s.id === state.currentSeriesId) || null; }
function getSeriesById(id){ return state.series.find(s => s.id === id) || null; }
function seriesVolumes(seriesId){ return (state.volumes[seriesId] || []).filter(v => !v.deleted); }

function volumesOfSeries(s){
  // This project stores volumes in state.volumes[seriesId]
  try{
    if(!s) return [];
    if(Array.isArray(s.volumes)) return s.volumes; // backward compat
    if(state && state.volumes && s.id && Array.isArray(state.volumes[s.id])) return state.volumes[s.id];
  }catch(e){}
  return [];
}


function findVolumeById(volumeId){
  for(const s of state.series){
    const list = state.volumes[s.id] || [];
    const v = list.find(x => x.id === volumeId);
    if(v) return {seriesId: s.id, volume: v, series: s};
  }
  return null;
}

/* -----------------------------
   Display list (flat)
------------------------------ */
function displayedItems(){
  const needle = (state.ui && state.ui.searchText) ? String(state.ui.searchText).trim().toLowerCase() : "";
  if(state.ui.displayMode === "all"){
    const out = [];
    for(const s of state.series){
      for(const v of seriesVolumes(s.id)){
        if(itemMatchesFilter(s, v, needle)) out.push({series:s, seriesId:s.id, volume:v});
      }
    }
    out.sort((a,b)=>{
      const sn = a.series.name.localeCompare(b.series.name,"ja");
      if(sn !== 0) return sn;
      const av = a.volume.volume_no ?? 999999;
      const bv = b.volume.volume_no ?? 999999;
      if(av !== bv) return av - bv;
      return (a.volume.displayTitle || a.volume.title).localeCompare((b.volume.displayTitle || b.volume.title), "ja");
    });
    return out;
  }
  const s = currentSeries();
  if(!s) return [];
  // シリーズ名ヒットなら全部表示、そうでなければ巻ごとに絞り込み
  if(!needle || String(s.name||"").toLowerCase().includes(needle)){
    return seriesVolumes(s.id).map(v=>({series:s, seriesId:s.id, volume:v}));
  }
  return seriesVolumes(s.id).filter(v=> itemMatchesFilter(s, v, needle)).map(v=>({series:s, seriesId:s.id, volume:v}));
}


function isMobileLayout(){
  try{ return window.matchMedia && window.matchMedia('(max-width: 768px)').matches; }
  catch(e){ return false; }
}

// 端末（PC/スマホ）ごとに「1段あたりの冊数」を保存する
function ensureDeviceRowCaps(){
  if(!state.ui) state.ui = {};
  // 既存互換：昔の rowCapSpine/rowCapCover を PC 側に取り込む
  if(state.ui.rowCapSpine_pc == null) state.ui.rowCapSpine_pc = (state.ui.rowCapSpine ?? 20);
  if(state.ui.rowCapCover_pc == null) state.ui.rowCapCover_pc = (state.ui.rowCapCover ?? 10);

  // モバイル初期値（好みで後から変更できます）
  if(state.ui.rowCapSpine_mobile == null) state.ui.rowCapSpine_mobile = 12;
  if(state.ui.rowCapCover_mobile == null) state.ui.rowCapCover_mobile = 6;

  // legacy mirror（現在端末の値を入れておく）
  // ※ getActiveRowCap() は ensureDeviceRowCaps() を呼ぶため、ここで呼ぶと再帰してスタックオーバーフローになります。
  const mobile = isMobileLayout();
  state.ui.rowCapSpine = mobile ? (state.ui.rowCapSpine_mobile ?? 0) : (state.ui.rowCapSpine_pc ?? 0);
  state.ui.rowCapCover = mobile ? (state.ui.rowCapCover_mobile ?? 0) : (state.ui.rowCapCover_pc ?? 0);
}

function getActiveRowCap(mode){
  ensureDeviceRowCaps();
  const mobile = isMobileLayout();
  if(mode === "cover"){
    return mobile ? (state.ui.rowCapCover_mobile ?? 0) : (state.ui.rowCapCover_pc ?? 0);
  }
  return mobile ? (state.ui.rowCapSpine_mobile ?? 0) : (state.ui.rowCapSpine_pc ?? 0);
}

function setActiveRowCap(mode, value){
  ensureDeviceRowCaps();
  const mobile = isMobileLayout();
  const v = parseInt(value || 0, 10) || 0;
  if(mode === "cover"){
    if(mobile) state.ui.rowCapCover_mobile = v;
    else state.ui.rowCapCover_pc = v;
  }else{
    if(mobile) state.ui.rowCapSpine_mobile = v;
    else state.ui.rowCapSpine_pc = v;
  }
  // legacy mirror
  state.ui.rowCapSpine = getActiveRowCap("spine");
  state.ui.rowCapCover = getActiveRowCap("cover");
}



/* -----------------------------
   Shelf row chunking
------------------------------ */

function syncRowCapsFromInputs(){
  // side/top どちらの入力も読む（表示中のほうを優先）
  const s1 = document.getElementById("rowCapSpine");
  const c1 = document.getElementById("rowCapCover");
  const s2 = document.getElementById("rowCapSpineTop");
  const c2 = document.getElementById("rowCapCoverTop");

  const capS = (s2 && s2.offsetParent!==null) ? (parseInt(s2.value||"0",10)||0)
            : (s1 ? (parseInt(s1.value||"0",10)||0) : 0);
  const capC = (c2 && c2.offsetParent!==null) ? (parseInt(c2.value||"0",10)||0)
            : (c1 ? (parseInt(c1.value||"0",10)||0) : 0);

  if(state.ui){
    setActiveRowCap("spine", capS);
    setActiveRowCap("cover", capC);
  }

  // mirror values to both sets (現在端末の値を表示)
  const curS = getActiveRowCap("spine");
  const curC = getActiveRowCap("cover");
  if(s1) s1.value = String(curS);
  if(c1) c1.value = String(curC);
  if(s2) s2.value = String(curS);
  if(c2) c2.value = String(curC);
}

function updateQuickStatus(){
  const status = document.getElementById("qcStatus");
  const seriesName = document.getElementById("qcSeriesName");
  const dm = state.ui.displayMode || "series";
  const vm = state.ui.viewMode || "spine";
  if(seriesName){
    if(dm === "all") seriesName.textContent = "ALL（すべて表示）";
    else {
      const s = currentSeries();
      seriesName.textContent = s ? (s.name || s.id) : "-";
    }
  }
  if(status){
    const pr = calcPerRow();
    status.textContent = `view:${vm} / 背:${getActiveRowCap("spine")} / 表:${getActiveRowCap("cover")} / ${isMobileLayout()?"mobile":"pc"}`;
  }
}


function applySizeVars(){
  const ui = state.ui || (state.ui = {});
  // Defaults
  if(ui.spineW == null) ui.spineW = 90;
  if(ui.spineH == null) ui.spineH = 900;
  if(ui.coverW == null) ui.coverW = 160;
  if(ui.coverH == null) ui.coverH = 240;

  document.documentElement.style.setProperty("--spineW", `${ui.spineW}px`);
  document.documentElement.style.setProperty("--spineH", `${ui.spineH}px`);
  document.documentElement.style.setProperty("--coverW", `${ui.coverW}px`);
  document.documentElement.style.setProperty("--coverH", `${ui.coverH}px`);
}

function syncSizeInputs(){
  const ui = state.ui || {};
  const map = [
    ["spineWTop","spineW",90],
    ["spineHTop","spineH",900],
    ["coverWTop","coverW",160],
    ["coverHTop","coverH",240],
  ];
  for(const [id,key,defv] of map){
    const el = document.getElementById(id);
    if(el) el.value = String(ui[key] ?? defv);
  }
}

function readSizeInputsToState(){
  const ui = state.ui || (state.ui = {});
  const read = (id, defv, minv, maxv)=>{
    const el = document.getElementById(id);
    if(!el) return defv;
    let v = parseInt(el.value||String(defv),10);
    if(Number.isNaN(v)) v = defv;
    v = Math.max(minv, Math.min(maxv, v));
    el.value = String(v);
    return v;
  };
  ui.spineW = read("spineWTop", 90, 40, 200);
  ui.spineH = read("spineHTop", 900, 200, 1200);
  ui.coverW = read("coverWTop", 160, 80, 400);
  ui.coverH = read("coverHTop", 240, 120, 800);
}

function calcPerRow(){
  // 固定冊数（背表紙/表紙）を優先（端末別）
  const vm = (state.ui && state.ui.viewMode) ? state.ui.viewMode : "spine";
  const cap = getActiveRowCap(vm);
  const n = parseInt(cap || 0, 10);
  if(!Number.isNaN(n) && n > 0) return n;

  // 0 のときは自動計算
  const w = els.shelf.clientWidth || 800;
  const usable = Math.max(200, w - 40);
  const gap = 10;

  if(vm === "cover"){
    const tileW = 122;
    return Math.max(1, Math.floor((usable + gap) / (tileW + gap)));
  }
  const spineW = 90; // 表示幅に合わせる（v20）
  return Math.max(1, Math.floor((usable + gap) / (spineW + gap)));
}
function chunkItems(items, perRow){
  const rows = [];
  for(let i=0;i<items.length;i+=perRow){
    rows.push(items.slice(i, i+perRow));
  }
  return rows;
}

/* -----------------------------
   外部検索（Google等）は完全除去（ローカル運用）
------------------------------ */

/* -----------------------------
   Missing calc
------------------------------ */
function computeMissing(seriesId){
  const vols = seriesVolumes(seriesId).filter(v=>Number.isFinite(v.volume_no));
  if(vols.length === 0) return {next:null, missing:[]};

  const nums = vols.map(v=>v.volume_no).sort((a,b)=>a-b);
  const min = nums[0];
  const max = nums[nums.length-1];

  const set = new Set(nums);
  const missing = [];
  for(let n=min;n<=max;n++){
    if(!set.has(n)) missing.push(n);
  }
  const next = missing.length ? missing[0] : (max+1);
  return {next, missing};
}

function sortSeriesVolumes(seriesId){
  const s = getSeriesById(seriesId);
  if(s && s.orderMode === "manual") return;
  state.volumes[seriesId].sort((a,b)=>{
    const av = a.volume_no ?? 999999;
    const bv = b.volume_no ?? 999999;
    if(av !== bv) return av - bv;
    return (a.displayTitle || a.title || "").localeCompare((b.displayTitle || b.title || ""), "ja");
  });
}

/* -----------------------------
   Rendering
------------------------------ */
function renderAll(){
  try{ normalizeState(state); }catch(e){}
  try{ if(els.q && els.q.value !== (state.ui.searchText||"")) els.q.value = state.ui.searchText||""; }catch(e){}
  renderModeButtons();
  renderSeriesList();
  renderShelf();
  updateRowCapStatus();
  renderSelectionBar();

  try{ updateQuickStatus(); }catch(e){}
}

function renderModeButtons(){
  const dm = state.ui.displayMode;
  const vm = state.ui.viewMode;

  els.btnModeAll.classList.toggle("primary", dm === "all");
  els.btnModeSeries.classList.toggle("primary", dm === "series");
  els.btnViewSpine.classList.toggle("primary", vm === "spine");
  els.btnViewCover.classList.toggle("primary", vm === "cover");

  els.modeHint.textContent = `現在：${dm === "all" ? "全て表示" : "シリーズ別"} / ${vm === "cover" ? "表紙" : "背表紙"}`;

  const seriesMode = (dm === "series");
  const hasSeries = !!currentSeries();
  const enable = seriesMode && hasSeries;
  for(const x of [els.btnAllOwned, els.btnAllUnowned, els.btnRangeOwned, els.btnRangeUnowned, els.rangeFrom, els.rangeTo]){
    x.disabled = !enable;
  }
  els.btnSeriesDelete.disabled = !hasSeries;
  els.shelf.classList.toggle("showAll", dm === "all");
  els.shelf.classList.toggle("selectMode", !!state.ui.selectionMode);
}

function renderSeriesList(){
  els.seriesList.innerHTML = "";
  const needle = (state.ui && state.ui.searchText) ? String(state.ui.searchText).trim().toLowerCase() : "";
  for(const s of state.series){
    if(needle && !String(s.name||"").toLowerCase().includes(needle)) continue;
    const div = document.createElement("div");
    div.className = "seriesItem" + (s.id === state.currentSeriesId ? " active" : "");
    div.innerHTML = `
      <div class="seriesName">${escapeHtml(s.name)}</div>
      <div class="seriesMeta">${escapeHtml(s.meta || "")}</div>
    `;
    div.addEventListener("click", ()=>{
      state.currentSeriesId = s.id;
      state.ui.selectedIds = [];
      state.ui.lastClickedIndex = null;
      state.ui.openVolumeId = null;
      saveState();
      renderAll();
    });
    els.seriesList.appendChild(div);
  }
}


function fitRowInner(rowInner, perRow){
  // 指定冊数(perRow)が画面幅に収まるように、行を縮小して右の切れを防ぐ
  try{
    if(!rowInner || !perRow || perRow<=0) return;
    const vm = (state.ui && state.ui.viewMode) ? state.ui.viewMode : "spine";
    const style = getComputedStyle(rowInner);
    const gap = parseFloat(style.gap || "0") || 0;

    // 1冊の想定幅：背表紙は90、表紙はCSSに合わせて概算(122)
    const ui = state.ui || {};
    const itemW = (vm === "cover") ? (ui.coverW ?? 160) : (ui.spineW ?? 90);

    const required = perRow*itemW + Math.max(0, perRow-1)*gap;
    const avail = rowInner.clientWidth || required;
    const scale = Math.min(1, avail / required);

    rowInner.classList.add("fitRow");
    rowInner.style.transform = `scale(${scale})`;
  }catch(e){}
}


// ---- Image path apply (current series) ----
function getAssetStatusMap(){
  if(!state.ui) state.ui = {};
  if(!state.ui.assetStatus) state.ui.assetStatus = {}; // {url: true/false}
  return state.ui.assetStatus;
}

function probeImage(url){
  return new Promise((resolve)=>{
    try{
      const img = new Image();
      img.onload = ()=> resolve(true);
      img.onerror = ()=> resolve(false);
      const bust = (url.includes("?") ? "&" : "?") + "t=" + Date.now();
      img.src = url + bust;
    }catch(e){
      resolve(false);
    }
  });
}

function applyExistingImagePathsForCurrentSeries(){
  // 表示優先：現在シリーズの「入っているパス」をそのまま表示できるように、欠損キャッシュを解除して再描画
  try{
    const s = currentSeries();
    if(s && state && state.ui && state.ui.assetStatus){
      for(const v of volumesOfSeries(s)){
        if(v && v.spinePath){
          const k = String(v.spinePath).trim();
          if(k) delete state.ui.assetStatus[k];
        }
        if(v && v.coverPath){
          const k = String(v.coverPath).trim();
          if(k) delete state.ui.assetStatus[k];
        }
        if(v && v.thumbnail){
          const k = String(v.thumbnail).trim();
          if(k) delete state.ui.assetStatus[k];
        }
      }
    }
  }catch(e){}
  try{ saveState(); }catch(e){}
  try{ renderAll(); }catch(e){}
}




function isRenderableImage(url){
  return !!url;
}



function renderShelf(){
  const items = displayedItems();
  const s = currentSeries();
  const dm = state.ui.displayMode;

  if(state.series.length === 0){
    els.shelfTitle.textContent = "本棚";
    els.shelfMeta.textContent = "シリーズを追加してください。";
    els.shelf.innerHTML = "";
    els.btnToggleSelectMode.disabled = true;
    return;
  }
  els.btnToggleSelectMode.disabled = false;

  if(dm === "all"){
    els.shelfTitle.textContent = "全ての本";
    const total = items.length;
    const owned = items.filter(x=>x.volume.owned).length;
    els.shelfMeta.textContent = `合計: ${total} / 所持: ${owned} / 未所持: ${total - owned}`;
  }else{
    if(!s){
      els.shelfTitle.textContent = "本棚";
      els.shelfMeta.textContent = "左のシリーズを選んでください。";
      els.shelf.innerHTML = "";
      return;
    }
    const vols = seriesVolumes(s.id);
    const owned = vols.filter(v=>v.owned).length;
    els.shelfTitle.textContent = s.name;
    els.shelfMeta.textContent = `巻数: ${vols.length} / 所持: ${owned} / 未所持: ${vols.length - owned}`;
  }

  const perRow = calcPerRow();
  const rows = chunkItems(items, perRow);

  els.shelf.innerHTML = "";
  rows.forEach((rowItems, rowIdx)=>{
    const row = document.createElement("div");
    row.className = "shelfRow";
    const inner = document.createElement("div");
    inner.className = "rowInner";

    rowItems.forEach((it, i)=>{
      const v = it.volume;
      const series = it.series;
      const globalIndex = rowIdx * perRow + i;

      if(state.ui.viewMode === "cover"){
        inner.appendChild(makeCoverTile(it, globalIndex));
      }else{
        inner.appendChild(makeSpine(it, globalIndex));
      }
    });

    row.appendChild(inner);
    els.shelf.appendChild(row);
  });
}

function makeSpine(it, index){
  const v = it.volume;
  const series = it.series;

  const btn = document.createElement("button");
  btn.className = "spine";
  btn.dataset.vid = v.id;
  btn.dataset.index = String(index);
  if(canReorderNow()) btn.draggable = true;
  attachDnD(btn);

  const spineImg = safeImageUrl(v.spinePath);
  if(spineImg){
    btn.style.backgroundImage = `url("${spineImg}")`;
    btn.classList.add("hasSpineImage");
    btn.classList.add("spineImage");
    btn.style.backgroundColor = "transparent";
  }else{
    btn.style.backgroundImage = "";
    btn.classList.remove("hasSpineImage");
    btn.classList.remove("spineImage");
    btn.style.backgroundColor = (v.spineColor && v.spineColor.trim()) ? v.spineColor : series.color;
  }

  if(!v.owned) btn.classList.add("unowned");
  if(!state.ui.selectionMode && state.ui.openVolumeId === v.id) btn.classList.add("pulled");
  if(state.ui.selectedIds.includes(v.id)) btn.classList.add("selected");

  const baseName = shortTitle(series.name);
  const fallback = v.volume_no ? `${baseName} ${v.volume_no}` : baseName;
  const text = (v.spineText && v.spineText.trim()) ? v.spineText
             : (v.displayTitle && v.displayTitle.trim()) ? v.displayTitle
             : fallback;
  btn.textContent = text;

  const chk = document.createElement("div");
  chk.className = "chk";
  chk.textContent = state.ui.selectedIds.includes(v.id) ? "✓" : "";
  btn.appendChild(chk);

  const badge = document.createElement("div");
  badge.className = "seriesBadge";
  badge.textContent = shortTitle(series.name).slice(0,6);
  btn.appendChild(badge);

  attachItemEvents(btn, index);
  return btn;
}

function makeCoverTile(it, index){
  const v = it.volume;
  const series = it.series;

  const btn = document.createElement("button");
  btn.className = "coverTile";
  btn.dataset.vid = v.id;
  btn.dataset.index = String(index);
  if(canReorderNow()) btn.draggable = true;
  attachDnD(btn);

  const coverImg = safeImageUrl(v.coverPath) || safeImageUrl(v.thumbnail);
  if(coverImg){
    const imgDiv = document.createElement("div");
    imgDiv.className = "img";
    imgDiv.style.backgroundImage = `url("${coverImg}")`;
    btn.appendChild(imgDiv);
  }else{
    const fb = document.createElement("div");
    fb.className = "fallback";
    fb.textContent = (v.displayTitle || v.title || "").slice(0,30);
    btn.appendChild(fb);
  }

  if(!v.owned) btn.classList.add("unowned");
  if(!state.ui.selectionMode && state.ui.openVolumeId === v.id) btn.classList.add("pulled");
  if(state.ui.selectedIds.includes(v.id)) btn.classList.add("coverSelected");

  const tag = document.createElement("div");
  tag.className = "topTag";
  const _n = getVolNum(v);
  tag.textContent = _n != null ? `#${_n}` : "#";
  btn.appendChild(tag);

  const chk = document.createElement("div");
  chk.className = "chk";
  chk.textContent = state.ui.selectedIds.includes(v.id) ? "✓" : "";
  btn.appendChild(chk);

  const badge = document.createElement("div");
  badge.className = "seriesBadge";
  badge.textContent = shortTitle(series.name).slice(0,6);
  btn.appendChild(badge);

  attachItemEvents(btn, index);
  return btn;
}

function renderSelectionBar(){
  if(!state.ui.selectionMode){
    els.selectBar.classList.add("hidden");
    return;
  }
  els.selectBar.classList.remove("hidden");
  els.selectedCount.textContent = `選択数: ${state.ui.selectedIds.length}` + (state.ui.displayMode==="all" ? "（並び替えはシリーズ別で可能）" : (currentSeries() && currentSeries().orderMode==="manual" ? "（並び替え中）" : ""));
}

/* -----------------------------
   Item interactions (shared)
------------------------------ */
function attachItemEvents(btn, index){
  let pressTimer = null;
  let pressMoved = false;
  const LONG_PRESS_MS = 450;

  btn.addEventListener("pointerdown", (e)=>{
    btn.setPointerCapture?.(e.pointerId);
    pressMoved = false;

    pressTimer = setTimeout(()=>{
      if(pressMoved) return;
      enterSelectionMode();
      toggleSelectByIndex(index, {range:false, forceOn:true});
      renderAll();
    }, LONG_PRESS_MS);
  });

  btn.addEventListener("pointermove", ()=>{
    pressMoved = true;
    if(pressTimer){ clearTimeout(pressTimer); pressTimer = null; }
  });

  btn.addEventListener("pointerup", (e)=>{
    if(pressTimer){ clearTimeout(pressTimer); pressTimer = null; }
    const items = displayedItems();
    const it = items[index];
    if(!it) return;

    if(state.ui.selectionMode){
      toggleSelectByIndex(index, {range: !!e.shiftKey});
      renderAll();
      return;
    }
    openVolume(it.volume.id);
  });

  btn.addEventListener("contextmenu", (e)=> e.preventDefault());
}

/* -----------------------------
   Reorder (Drag & Drop)
   - 選択モード時（シリーズ別のみ）に、ドラッグで並び替えできます。
   - 複数選択している場合は、そのグループをまとめて移動します。
------------------------------ */
function canReorderNow(){
  return state.ui.selectionMode && state.ui.displayMode === "series" && !!currentSeries();
}

function getCurrentDisplayedSeriesList(){
  const s = currentSeries();
  if(!s) return [];
  // preserve current order (manual or auto sorted)
  return (state.volumes[s.id] || []).filter(v => !v.deleted);
}

function reorderCurrentSeries(dragIds, targetId){
  const s = currentSeries();
  if(!s) return;

  const all = state.volumes[s.id] || [];
  const active = all.filter(v => !v.deleted);
  const deleted = all.filter(v => v.deleted);

  const dragSet = new Set(dragIds);
  const moving = active.filter(v => dragSet.has(v.id));
  if(moving.length === 0) return;

  const rest = active.filter(v => !dragSet.has(v.id));

  const targetIndex = rest.findIndex(v => v.id === targetId);
  const insertAt = (targetIndex === -1) ? rest.length : targetIndex;

  const next = rest.slice(0, insertAt).concat(moving).concat(rest.slice(insertAt));

  // commit + mark manual mode
  state.volumes[s.id] = next.concat(deleted);
  s.orderMode = "manual";

  saveState();
  renderAll();
}

function attachDnD(btn){
  // HTML5 DnD: only enabled when reorder is allowed
  btn.addEventListener("dragstart", (e)=>{
    if(!canReorderNow()){
      e.preventDefault();
      return;
    }
    const vid = btn.dataset.vid;
    if(!vid) return;

    const dragIds = state.ui.selectedIds.includes(vid) ? [...state.ui.selectedIds] : [vid];
    e.dataTransfer.setData("text/plain", JSON.stringify({dragIds, from: "shelf"}));
    e.dataTransfer.effectAllowed = "move";
    btn.classList.add("dragging");
  });

  btn.addEventListener("dragend", ()=> btn.classList.remove("dragging"));

  btn.addEventListener("dragover", (e)=>{
    if(!canReorderNow()) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    btn.classList.add("dragOver");
  });

  btn.addEventListener("dragleave", ()=> btn.classList.remove("dragOver"));

  btn.addEventListener("drop", (e)=>{
    if(!canReorderNow()) return;
    e.preventDefault();
    btn.classList.remove("dragOver");

    const raw = e.dataTransfer.getData("text/plain");
    if(!raw) return;
    let payload = null;
    try{ payload = JSON.parse(raw); }catch{ return; }
    const dragIds = payload?.dragIds || [];
    const targetId = btn.dataset.vid;
    if(!targetId) return;

    // same target within moving group -> ignore
    if(dragIds.includes(targetId)) return;

    reorderCurrentSeries(dragIds, targetId);
  });
}

function enterSelectionMode(){
  if(state.ui.selectionMode) return;
  state.ui.selectionMode = true;
  state.ui.openVolumeId = null;
  saveState();
}
function exitSelectionMode(){
  state.ui.selectionMode = false;
  state.ui.selectedIds = [];
  state.ui.lastClickedIndex = null;
  saveState();
  renderAll();
}
function toggleSelectByIndex(index, {range=false, forceOn=false} = {}){
  const items = displayedItems();
  if(index < 0 || index >= items.length) return;

  if(range && state.ui.lastClickedIndex !== null){
    const a = state.ui.lastClickedIndex;
    const b = index;
    const lo = Math.min(a,b);
    const hi = Math.max(a,b);
    for(let i=lo;i<=hi;i++){
      const vid = items[i].volume.id;
      if(!state.ui.selectedIds.includes(vid)) state.ui.selectedIds.push(vid);
    }
  }else{
    const vid = items[index].volume.id;
    const pos = state.ui.selectedIds.indexOf(vid);
    if(forceOn){
      if(pos === -1) state.ui.selectedIds.push(vid);
    }else{
      if(pos === -1) state.ui.selectedIds.push(vid);
      else state.ui.selectedIds.splice(pos,1);
    }
  }

  state.ui.lastClickedIndex = index;
  saveState();
}

/* -----------------------------
   Volume Modal
------------------------------ */
function applyEditorToPreview(volume, series){
  const coverSrc = safeImageUrl(volume.coverPath) || safeImageUrl(volume.thumbnail) || "";
  if(coverSrc){
    els.mCoverPrev.src = coverSrc;
    els.mCoverPrev.style.display = "block";
  }else{
    els.mCoverPrev.removeAttribute("src");
    els.mCoverPrev.style.display = "none";
  }

  const spineSrc = safeImageUrl(volume.spinePath);
  const spineText = (volume.spineText || volume.displayTitle || `${autoBaseFromSeriesName(series.name)} ${volume.volume_no ?? ""}`).trim();

  els.mSpinePrev.textContent = spineText;
  if(spineSrc){
    els.mSpinePrev.style.backgroundImage = `url("${spineSrc}")`;
    els.mSpinePrev.style.backgroundColor = "#111";
  }else{
    els.mSpinePrev.style.backgroundImage = "";
    els.mSpinePrev.style.backgroundColor = (volume.spineColor && volume.spineColor.trim()) ? volume.spineColor : series.color;
  }
}


function setDetailTab(mode){
  const isEdit = mode === "edit";
  if(els.tabView) els.tabView.classList.toggle("isActive", !isEdit);
  if(els.tabEdit) els.tabEdit.classList.toggle("isActive", isEdit);
  if(els.paneView) els.paneView.hidden = isEdit;
  if(els.paneEdit) els.paneEdit.hidden = !isEdit;
}

function syncViewFieldsFromInputs(v, series){
  if(els.vSeries) els.vSeries.textContent = series?.name || "-";
  if(els.vVolNo) els.vVolNo.textContent = (getVolNum(v) ?? "-");
  if(els.vPublisher) els.vPublisher.textContent = v.publisher || "-";
  if(els.vIsbn) els.vIsbn.textContent = v.isbn13 || "-";
  if(els.vLink){
    els.vLink.href = v.infoLink || "#";
    els.vLink.textContent = v.infoLink ? "Google Books" : "-";
  }
  if(els.vDisplayTitle) els.vDisplayTitle.textContent = (els.mDisplayTitle?.value || v.displayTitle || v.title || "-") || "-";
  if(els.vSite) els.vSite.textContent = (els.mSite?.value || v.purchaseSite || "-") || "-";
  if(els.vUrl) els.vUrl.textContent = (els.mUrl?.value || v.purchaseUrl || "-") || "-";
  if(els.vSpineText) els.vSpineText.textContent = (els.mSpineText?.value || v.spineText || "-") || "-";
  if(els.vSpineColor) els.vSpineColor.textContent = (els.mSpineColor?.value || v.spineColor || "-") || "-";
  if(els.vStoragePath) els.vStoragePath.textContent = (els.mStoragePath?.value || v.storagePath || "-") || "-";
}

function openVolume(volumeId){
  const hit = findVolumeById(volumeId);
  if(!hit) return;

  const {series, volume: v} = hit;

  state.ui.openVolumeId = volumeId;
  saveState();
  renderShelf();
  updateRowCapStatus();

  els.mTitle.textContent = v.displayTitle || v.title;
  els.mMeta.textContent = [v.authorsText || "-", v.publishedDate || ""].filter(Boolean).join(" / ");

  els.mSeries.textContent = series?.name || "-";
  els.mVolNo.textContent = (getVolNum(v) ?? "-");
  els.mPublisher.textContent = v.publisher || "-";
  els.mIsbn.textContent = v.isbn13 || "-";

  els.mLink.href = v.infoLink || "#";
  els.mLink.textContent = v.infoLink ? "Google Books" : "-";

  // editor fields
  els.mDisplayTitle.value = v.displayTitle || "";
  els.mSite.value = v.purchaseSite || "";
  els.mUrl.value = v.purchaseUrl || "";

  els.mCoverPath.value = v.coverPath || "";
  els.mSpinePath.value = v.spinePath || "";
  // auto-suggest paths if empty
  if(!els.mCoverPath.value && v.volume_no != null) els.mCoverPath.value = defaultCoverPath(series, v.volume_no);
  if(!els.mSpinePath.value && v.volume_no != null) els.mSpinePath.value = defaultSpinePath(series, v.volume_no);

  els.mSpineText.value = v.spineText || "";
  els.mSpineColor.value = v.spineColor || "";
  if(els.mStoragePath) els.mStoragePath.value = v.storagePath || "";

  // reset picks
  els.mCoverPick.value = "";
  els.mSpinePick.value = "";

  els.cover.textContent = series ? series.name : "COVER";
  const coverBg = (v.spineColor && v.spineColor.trim()) ? v.spineColor : (series ? series.color : "#111");
  els.cover.style.background = coverBg;

  els.btnToggleOwned.textContent = v.owned ? "未所持にする" : "所持にする";
  if(els.btnToggleOwned2) els.btnToggleOwned2.textContent = els.btnToggleOwned.textContent;
  const hasOpen = ((v.storagePath && v.storagePath.trim()) || (v.purchaseUrl && v.purchaseUrl.trim()));
  els.btnOpenLink.disabled = !hasOpen;

  applyEditorToPreview(v, series);

  // left page visuals
  if(els.spineTitleFixed) els.spineTitleFixed.textContent = (els.mSpineText.value || v.spineText || els.mDisplayTitle.value || v.displayTitle || v.title || "-");
  if(els.detailCoverLarge){
    const c = (els.mCoverPath.value || v.coverPath || "");
    els.detailCoverLarge.src = withCacheBuster(c);
    els.detailCoverLarge.style.display = c ? "block" : "none";
  }

  // sync view tab fields (no-scroll summary)
  syncViewFieldsFromInputs(v, series);

  // default: show view page
  setDetailTab("view");

  els.modal.classList.remove("hidden");
}

function closeModal(){
  // revoke preview object urls for trimmed images (keep blobs for download)
  const vid = state.ui.openVolumeId;
  if(vid){
    const a = _trimCache.cover.get(vid);
    if(a?.url) try{ URL.revokeObjectURL(a.url); }catch{}
    const b = _trimCache.spine.get(vid);
    if(b?.url) try{ URL.revokeObjectURL(b.url); }catch{}
    // keep entries (blob) but clear url; will be regenerated on download
    if(a) a.url = null;
    if(b) b.url = null;
  }
  els.modal.classList.add("hidden");
  state.ui.openVolumeId = null;
  saveState();
  renderShelf();
  updateRowCapStatus();
}

els.btnCloseModal?.addEventListener("click", closeModal);
els.modal?.addEventListener("click", (e)=>{ if(e.target === els.modal) closeModal(); });

// detail tab switching (view/edit)
if(els.tabView) els.tabView?.addEventListener("click", ()=>setDetailTab("view"));
if(els.tabEdit) els.tabEdit?.addEventListener("click", ()=>setDetailTab("edit"));

// page navigation buttons
if(els.btnToEdit) els.btnToEdit?.addEventListener("click", ()=>setDetailTab("edit"));
if(els.btnToView) els.btnToView?.addEventListener("click", ()=>setDetailTab("view"));
if(els.btnToggleOwned2 && els.btnToggleOwned) els.btnToggleOwned2?.addEventListener("click", ()=>els.btnToggleOwned.click());
if(els.btnCloseModal2 && els.btnCloseModal) els.btnCloseModal2?.addEventListener("click", ()=>els.btnCloseModal.click());

// live preview update (no-scroll view page + left spine title)
const _syncNow = ()=>{
  const vid = state.ui.openVolumeId;
  if(!vid) return;
  const hit = findVolumeById(vid);
  if(!hit) return;
  const {series, volume:v} = hit;
  syncViewFieldsFromInputs(v, series);
  if(els.spineTitleFixed){
    els.spineTitleFixed.textContent = (els.mSpineText?.value || v.spineText || els.mDisplayTitle?.value || v.displayTitle || v.title || "-");
  }
  if(els.detailCoverLarge){
    const c = (els.mCoverPath?.value || v.coverPath || "");
    els.detailCoverLarge.src = withCacheBuster(c);
    els.detailCoverLarge.style.display = c ? "block" : "none";
  }
};
["mDisplayTitle","mSite","mUrl","mSpineText","mSpineColor","mCoverPath"].forEach((key)=>{
  const el = els[key];
  if(el) el.addEventListener("input", _syncNow);
});

els.btnToggleOwned?.addEventListener("click", ()=>{
  const vid = state.ui.openVolumeId;
  if(!vid) return;
  const hit = findVolumeById(vid);
  if(!hit) return;

  hit.volume.owned = !hit.volume.owned;
  saveState();
  els.btnToggleOwned.textContent = hit.volume.owned ? "未所持にする" : "所持にする";
  if(els.btnToggleOwned2) els.btnToggleOwned2.textContent = els.btnToggleOwned.textContent;
  renderShelf();
  updateRowCapStatus();
});

els.btnDeleteVolume?.addEventListener("click", ()=>{
  const vid = state.ui.openVolumeId;
  if(!vid) return;
  const hit = findVolumeById(vid);
  if(!hit) return;

  hit.volume.deleted = true;
  saveState();
  closeModal();
  renderAll();
});

els.btnOpenLink?.addEventListener("click", async ()=>{
  const vid = state.ui.openVolumeId;
  if(!vid) return;
  const hit = findVolumeById(vid);
  if(!hit) return;

  const v = hit.volume;
  const openTarget = (v.storagePath || "").trim() || (v.purchaseUrl || "").trim();
  if(!openTarget) return;

  // future: open EPUB/PDF viewer. for now:
  // - if URL-like => open new tab
  // - otherwise => copy path to clipboard
  if(/^[a-zA-Z]+:\/\//.test(openTarget) || /^https?:\/\//.test(openTarget)){
    window.open(openTarget, "_blank", "noreferrer");
    return;
  }

  try{
    await navigator.clipboard.writeText(openTarget);
    alert("格納パスをコピーしました（今後ここからEPUB/PDFを開けるようにします）\n\n" + openTarget);
  }catch(e){
    alert("格納パス: " + openTarget);
  }
});

els.btnSaveMeta?.addEventListener("click", ()=>{
  const vid = state.ui.openVolumeId;
  if(!vid) return;
  const hit = findVolumeById(vid);
  if(!hit) return;

  const v = hit.volume;

  v.displayTitle = (els.mDisplayTitle.value || "").trim();
  v.purchaseSite = (els.mSite.value || "").trim();
  v.purchaseUrl = (els.mUrl.value || "").trim();

  v.coverPath = (els.mCoverPath.value || "").trim();
  v.spinePath = (els.mSpinePath.value || "").trim();

  v.spineText = (els.mSpineText.value || "").trim();
  v.spineColor = (els.mSpineColor.value || "").trim();
  v.storagePath = (els.mStoragePath?.value || "").trim();

  saveState();
  renderAll();
  const hasOpen = ((v.storagePath && v.storagePath.trim()) || (v.purchaseUrl && v.purchaseUrl.trim()));
  els.btnOpenLink.disabled = !hasOpen;
  applyEditorToPreview(v, hit.series);
});

// Convenience: use chosen filename as images/<filename> AND preview via objectURL
function applyPickToPath({pickEl, pathEl, setPreviewEl, isSpine}){
  const guess = guessImagesPathFromFileInput(pickEl);
  if(!guess) return;
  const hit = findVolumeById(state.ui.openVolumeId);
  const series = hit?.series || currentSeries();
  const filename = guess.replace(/^images\//, "");
  pathEl.value = isSpine ? spinePathFromFilename(series, filename.replace(/^spines\//,"").replace(/^covers\//,""))
                         : coverPathFromFilename(series, filename.replace(/^covers\//,"").replace(/^spines\//,""));

  const obj = objectUrlFromFileInput(pickEl);
  if(obj){
    if(isSpine){
      setPreviewEl.style.backgroundImage = `url("${obj}")`;
    }else{
      setPreviewEl.src = obj;
    }
  }
}
els.btnUseCoverFilename?.addEventListener("click", ()=>{
  applyPickToPath({pickEl: els.mCoverPick, pathEl: els.mCoverPath, setPreviewEl: els.mCoverPrev, isSpine:false});
});
els.btnUseSpineFilename?.addEventListener("click", ()=>{
  applyPickToPath({pickEl: els.mSpinePick, pathEl: els.mSpinePath, setPreviewEl: els.mSpinePrev, isSpine:true});
});

async function doTrim(kind){
  const hit = currentOpenSeriesAndVolume();
  if(!hit){ alert("先に本を開いてください。"); return; }

  const pickEl = kind === "spine" ? els.mSpinePick : els.mCoverPick;
  const file = pickEl.files?.[0];
  if(!file){ alert("まず画像ファイルを選択してください。"); return; }

  // run trim
  const result = await trimImageFile(file, {bgThr:18, alphaThr:10, margin:0});
  const filenameBase = file.name.replace(/\.[^.]+$/, "");
  const outName = `${filenameBase}_trim.png`;

  // cache
  const map = kind === "spine" ? _trimCache.spine : _trimCache.cover;
  // revoke old url if any
  const old = map.get(hit.volume.id);
  if(old?.url) try{ URL.revokeObjectURL(old.url); }catch{}
  map.set(hit.volume.id, {blob: result.blob, url: result.objectUrl, filename: outName});

  // preview and path set suggestion
  if(kind === "spine"){
    els.mSpinePrev.style.backgroundImage = `url("${result.objectUrl}")`;
    const suggested = spinePathFromFilename(hit.series, outName);
    if(!(els.mSpinePath.value||"").trim()) els.mSpinePath.value = suggested;
  }else{
    els.mCoverPrev.src = result.objectUrl;
    els.mCoverPrev.style.display = "block";
    const suggested = coverPathFromFilename(hit.series, outName);
    if(!(els.mCoverPath.value||"").trim()) els.mCoverPath.value = suggested;
  }

  // hint
  const folder = kind === "spine" ? `images/spines/${hit.series.slug}/` : `images/covers/${hit.series.slug}/`;
  els.mSaveHint.textContent = `トリム済み画像を作成しました。右の「トリム画像DL」で保存し、${folder} に置いてください。`;
}

els.btnTrimCover?.addEventListener("click", ()=> doTrim("cover"));
els.btnTrimSpine?.addEventListener("click", ()=> doTrim("spine"));

els.btnDlTrimCover?.addEventListener("click", ()=>{
  const hit = currentOpenSeriesAndVolume();
  if(!hit) return;
  const cached = _trimCache.cover.get(hit.volume.id);
  if(!cached?.blob){ alert("先に「余白トリム」を実行してください。"); return; }
  downloadBlob(cached.blob, cached.filename);
});

els.btnDlTrimSpine?.addEventListener("click", ()=>{
  const hit = currentOpenSeriesAndVolume();
  if(!hit) return;
  const cached = _trimCache.spine.get(hit.volume.id);
  if(!cached?.blob){ alert("先に「余白トリム」を実行してください。"); return; }
  downloadBlob(cached.blob, cached.filename);
});

/* -----------------------------
   Series Modal
------------------------------ */
function openSeriesModal(){
  const s = currentSeries();
  if(!s){ alert("編集するシリーズを左から選択してください。"); return; }
  els.smName.value = s.name || "";
  els.smSlug.value = s.slug || suggestSlug(s.name, s.id);
  els.smColor.value = s.color || "";
  els.smMeta.value = s.meta || "";
  els.seriesModal.classList.remove("hidden");
}
function closeSeriesModal(){
  els.seriesModal.classList.add("hidden");
}
if(els.btnOpenSeriesModal && els.btnCloseSeriesModal && els.btnCancelSeries && els.seriesModal){
  els.btnOpenSeriesModal?.addEventListener("click", openSeriesModal);
  els.btnCloseSeriesModal?.addEventListener("click", closeSeriesModal);
  els.btnCancelSeries?.addEventListener("click", closeSeriesModal);
  els.seriesModal?.addEventListener("click", (e)=>{ if(e.target === els.seriesModal) closeSeriesModal(); });
}

if(els.btnSaveSeries){
  els.btnSaveSeries?.addEventListener("click", ()=>{
    const s = currentSeries();
    if(!s){ alert("シリーズを選択してください。"); return; }

    const name = (els.smName.value || "").trim();
    if(!name){ alert("シリーズ名は必須です。"); return; }
    s.name = name;
    const slugIn = (els.smSlug.value || "").trim();
    s.slug = slugIn || suggestSlug(name, s.id);
    s.color = (els.smColor.value || "").trim() || s.color;
    s.meta = (els.smMeta.value || "").trim();

    saveState();
    renderAll();
    closeSeriesModal();
  });
}

if(els.btnRecolorSeriesRandom){
  els.btnRecolorSeriesRandom?.addEventListener("click", ()=>{
    const s = currentSeries();
    if(!s){ alert("シリーズを選択してください。"); return; }
    s.color = pickSeriesColor(`${s.name}|${Date.now()}`);
    saveState();
    renderAll();
  });
}

/* ------------------------------ Bulk ops ------------------------------ */
function setOwnedForAllInCurrentSeries(owned){
  const s = currentSeries();
  if(!s) return;
  (state.volumes[s.id]||[]).forEach(v=>{ if(!v.deleted) v.owned = owned; });
  saveState();
  renderAll();
}
function setOwnedForRangeInCurrentSeries(from, to, owned){
  const s = currentSeries();
  if(!s) return;
  const a = parseInt(from,10);
  const b = parseInt(to,10);
  if(Number.isNaN(a) || Number.isNaN(b)) return;

  const lo = Math.min(a,b);
  const hi = Math.max(a,b);

  (state.volumes[s.id]||[]).forEach(v=>{
    if(v.deleted) return;
    if(v.volume_no == null) return;
    if(v.volume_no >= lo && v.volume_no <= hi) v.owned = owned;
  });
  saveState();
  renderAll();
}
function setOwnedForSelected(owned){
  const selected = new Set(state.ui.selectedIds);
  if(selected.size === 0) return;
  for(const s of state.series){
    (state.volumes[s.id]||[]).forEach(v=>{
      if(v.deleted) return;
      if(selected.has(v.id)) v.owned = owned;
    });
  }
  saveState();
  renderAll();
}
function deleteSelected(){
  const selected = new Set(state.ui.selectedIds);
  if(selected.size === 0) return;
  for(const s of state.series){
    (state.volumes[s.id]||[]).forEach(v=>{ if(selected.has(v.id)) v.deleted = true; });
  }
  state.ui.selectedIds = [];
  state.ui.lastClickedIndex = null;
  saveState();
  renderAll();
}
function deleteCurrentSeries(){
  const sid = state.currentSeriesId;
  if(!sid) return;
  state.series = state.series.filter(s=> s.id !== sid);
  delete state.volumes[sid];

  state.currentSeriesId = state.series[0]?.id || null;
  state.ui.selectionMode = false;
  state.ui.selectedIds = [];
  state.ui.lastClickedIndex = null;
  state.ui.openVolumeId = null;

  saveState();
  renderAll();
}

/* -----------------------------
   Local search (本棚内検索)
   - 外部APIは使わず、登録済みデータを絞り込み表示します
------------------------------ */
function setSearchText(text){
  if(!state.ui) state.ui = {};
  state.ui.searchText = (text || "").trim();
  saveState();
  renderAll();
}
function getSearchText(){
  return (state.ui && state.ui.searchText) ? String(state.ui.searchText) : "";
}
function textHit(hay, needle){
  if(!needle) return true;
  return String(hay || "").toLowerCase().includes(needle);
}
function itemMatchesFilter(series, volume, needle){
  if(!needle) return true;
  const n = needle.toLowerCase();
  if(textHit(series?.name, n)) return true;
  if(volume){
    if(textHit(volume.displayTitle, n)) return true;
    if(textHit(volume.title, n)) return true;
    if(textHit(volume.spineText, n)) return true;
    if(textHit(volume.coverText, n)) return true;
    if(volume.volume_no != null && textHit(String(volume.volume_no), n)) return true;
  }
  return false;
}


/* -----------------------------
/* -----------------------------
   Add Modal (manual add) - FIX (compat)
   - openAddModal / closeAddModal / addOneVolumeManual / addRangeVolumesManual
------------------------------ */
function ensureSeriesSelectOptions(){
  if(!els.addSeriesSelect) return;
  els.addSeriesSelect.innerHTML = "";
  for(const s of (state.series||[])){
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name;
    els.addSeriesSelect.appendChild(opt);
  }
}

function openAddModal(){
  if(!els.addModal) return;
  if(!Array.isArray(state.series) || state.series.length===0){
    alert("シリーズがありません。先に「＋シリーズ追加」してください。");
    return;
  }
  ensureSeriesSelectOptions();

  // Prefer current series
  const cur = state.currentSeriesId;
  if(cur && (state.series||[]).some(s=>s.id===cur)){
    els.addSeriesSelect.value = cur;
  }else{
    els.addSeriesSelect.value = state.series[0].id;
  }

  // Prefill folder prefixes if empty
  try{ autofillRangePrefixes(); }catch(e){}
  // Don't override existing user input, but help if volume is already set
  try{ autofillAddPaths(); }catch(e){}

  els.addModal.classList.remove("hidden");
  els.addModal.setAttribute("aria-hidden","false");

  // focus
  setTimeout(()=>{ try{ els.addVolNo?.focus(); }catch(e){} }, 0);
}

function closeAddModal(){
  if(!els.addModal) return;
  els.addModal.classList.add("hidden");
  els.addModal.setAttribute("aria-hidden","true");
}

function ensureVolumesArray(seriesId){
  if(!state.volumes || typeof state.volumes !== "object") state.volumes = {};
  if(!Array.isArray(state.volumes[seriesId])) state.volumes[seriesId] = [];
  return state.volumes[seriesId];
}

function getVolNo(v){
  const n = v?.vol ?? v?.volume ?? v?.no ?? v?.volume_no;
  const num = Number(n);
  return Number.isFinite(num) ? num : null;
}

function addOneVolumeManual(){
  try{
    const sid = (els.addSeriesSelect?.value||"").trim();
    const s = getSeriesById(sid);
    if(!s) throw new Error("シリーズが選択されていません");

    const n = parseInt((els.addVolNo?.value||"").trim(), 10);
    if(Number.isNaN(n) || n<=0) throw new Error("巻番号を正しく入力してください");

    const vols = ensureVolumesArray(sid);

    // prevent duplicates by volume number
    const exists = vols.some(v=> getVolNo(v) === n);
    if(exists){
      alert(`巻 ${n} は既に存在します（重複は追加しません）。`);
      return;
    }

    const title = (els.addTitle?.value||"").trim();
    const it = {
      id: uid("v"),
      seriesId: sid,
      volume: n,
      owned: !!els.addOwned?.checked,
      displayTitle: title || "",
      purchaseSite: (els.addSite?.value||"").trim(),
      purchaseUrl: (els.addUrl?.value||"").trim(),
      coverPath: (els.addCoverPath?.value||"").trim(),
      spinePath: (els.addSpinePath?.value||"").trim(),
      spineText: "",
      spineColor: (els.addColor?.value||"").trim()
    };

    // If user left displayTitle empty, keep empty (render will show series name + vol). 
    vols.push(it);

    // sort by volume
    vols.sort((a,b)=> (getVolNo(a)??0) - (getVolNo(b)??0));

    saveState();
    closeAddModal();
    renderAll();
  }catch(e){
    alert(e?.message || String(e));
  }
}

function addRangeVolumesManual(){
  try{
    const sid = (els.addSeriesSelect?.value||"").trim();
    const s = getSeriesById(sid);
    if(!s) throw new Error("シリーズが選択されていません");

    const from = parseInt((els.addRangeFrom?.value||"").trim(), 10);
    const to   = parseInt((els.addRangeTo?.value||"").trim(), 10);
    if(Number.isNaN(from) || Number.isNaN(to) || from<=0 || to<=0 || from>to){
      throw new Error("範囲（From/To）を正しく入力してください");
    }

    const baseTitle = (els.addRangeBase?.value||"").trim();
    const owned = !!els.addRangeOwned?.checked;
    const site = (els.addRangeSite?.value||"").trim();
    const urlPrefix = (els.addRangeUrlPrefix?.value||"").trim();
    const coverPrefix = (els.addRangeCoverPrefix?.value||"").trim();
    const spinePrefix = (els.addRangeSpinePrefix?.value||"").trim();

    const vols = ensureVolumesArray(sid);
    const existing = new Set(vols.map(v=>getVolNo(v)).filter(v=>v!=null));

    let added=0, skipped=0;
    for(let n=from; n<=to; n++){
      if(existing.has(n)){ skipped++; continue; }
      const it = {
        id: uid("v"),
        seriesId: sid,
        volume: n,
        owned,
        displayTitle: baseTitle ? `${baseTitle} ${n}` : "",
        purchaseSite: site,
        purchaseUrl: urlPrefix ? `${urlPrefix}${n}` : "",
        coverPath: coverPrefix ? `${coverPrefix}${String(n).padStart(2,"0")}.jpg` : "",
        spinePath: spinePrefix ? `${spinePrefix}${String(n).padStart(2,"0")}.jpg` : "",
        spineText: "",
        spineColor: ""
      };
      vols.push(it);
      existing.add(n);
      added++;
    }

    vols.sort((a,b)=> (getVolNo(a)??0) - (getVolNo(b)??0));
    saveState();
    closeAddModal();
    renderAll();
    alert(`追加: ${added} / スキップ(重複): ${skipped}`);
  }catch(e){
    alert(e?.message || String(e));
  }
}

// Backward compatibility: if something still calls these globally
window.openAddModal = openAddModal;
window.closeAddModal = closeAddModal;

/* ------------------------------ Controls wiring ------------------------------ */

els.q?.addEventListener("input", ()=> setSearchText(els.q.value));
els.q?.addEventListener("keydown", (e)=>{ if(e.key==="Escape"){ els.q.value=""; setSearchText(""); } });

els.btnModeAll?.addEventListener("click", ()=>{
  state.ui.displayMode = "all";
  state.ui.selectedIds = [];
  state.ui.lastClickedIndex = null;
  state.ui.openVolumeId = null;
  saveState();
  renderAll();
});
els.btnModeSeries?.addEventListener("click", ()=>{
  state.ui.displayMode = "series";
  state.ui.selectedIds = [];
  state.ui.lastClickedIndex = null;
  state.ui.openVolumeId = null;
  saveState();
  renderAll();
});

els.btnViewSpine?.addEventListener("click", ()=>{
  state.ui.viewMode = "spine";
  saveState();
  renderAll();
});
els.btnViewCover?.addEventListener("click", ()=>{
  state.ui.viewMode = "cover";
  saveState();
  renderAll();
});

els.btnToggleSelectMode?.addEventListener("click", ()=>{
  if(state.series.length === 0) return;
  if(state.ui.selectionMode) exitSelectionMode();
  else{
    enterSelectionMode();
    saveState();
    renderAll();
  }
});

els.btnSeriesDelete?.addEventListener("click", ()=>{
  const s = currentSeries();
  if(!s) return;
  const ok = confirm(`シリーズ「${s.name}」を削除しますか？（巻も消えます）`);
  if(ok) deleteCurrentSeries();
});

els.btnAllOwned?.addEventListener("click", ()=> setOwnedForAllInCurrentSeries(true));
els.btnAllUnowned?.addEventListener("click", ()=> setOwnedForAllInCurrentSeries(false));
els.btnRangeOwned?.addEventListener("click", ()=> setOwnedForRangeInCurrentSeries(els.rangeFrom.value, els.rangeTo.value, true));
els.btnRangeUnowned?.addEventListener("click", ()=> setOwnedForRangeInCurrentSeries(els.rangeFrom.value, els.rangeTo.value, false));

els.btnSelOwned?.addEventListener("click", ()=> setOwnedForSelected(true));
els.btnSelUnowned?.addEventListener("click", ()=> setOwnedForSelected(false));
els.btnSelDelete?.addEventListener("click", ()=>{ if(confirm("選択した巻を削除しますか？")) deleteSelected(); });
els.btnSelClear?.addEventListener("click", ()=>{
  state.ui.selectedIds = [];
  state.ui.lastClickedIndex = null;
  saveState();
  renderAll();
});
els.btnSelExit?.addEventListener("click", exitSelectionMode);

els.btnAddSpine?.addEventListener("click", openAddModal);
els.btnCloseAdd?.addEventListener("click", closeAddModal);
els.addModal?.addEventListener("click", (e)=>{ if(e.target === els.addModal) closeAddModal(); });
els.btnAddSubmit?.addEventListener("click", addOneVolumeManual);
els.btnAddRangeSubmit?.addEventListener("click", addRangeVolumesManual);

// Auto-complete cover/spine paths from series.slug + volume no
function autofillAddPaths(){
  const sid = els.addSeriesSelect.value;
  const s = getSeriesById(sid);
  if(!s) return;
  const n = parseInt((els.addVolNo.value||"").trim(),10);
  if(Number.isNaN(n)) return;

  if(!(els.addCoverPath.value||"").trim()){
    els.addCoverPath.value = defaultCoverPath(s, n);
  }
  if(!(els.addSpinePath.value||"").trim()){
    els.addSpinePath.value = defaultSpinePath(s, n);
  }
}
function autofillRangePrefixes(){
  const sid = els.addSeriesSelect.value;
  const s = getSeriesById(sid);
  if(!s || !s.slug) return;
  if(!(els.addRangeCoverPrefix.value||"").trim()) els.addRangeCoverPrefix.value = `images/covers/${s.slug}/`;
  if(!(els.addRangeSpinePrefix.value||"").trim()) els.addRangeSpinePrefix.value = `images/spines/${s.slug}/`;
}
els.addVolNo?.addEventListener("input", ()=>{
  // only if modal open
  if(!els.addModal.classList.contains("hidden")) autofillAddPaths();
});
els.addSeriesSelect?.addEventListener("change", ()=>{
  if(!els.addModal.classList.contains("hidden")){ autofillAddPaths(); autofillRangePrefixes(); }
});

/* Resize: fit shelves */
let resizeTimer = null;
window.addEventListener("resize", ()=>{
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(()=> renderShelf(), 120);
});

/* -----------------------------
   Init / migration
------------------------------ */
(async function init(){
  // ensure base shape
  try{ normalizeState(state); }catch(e){}
  // try load remote books.json (same data across devices)
  const remote = await loadRemoteBooks();
  if(remote){
    replaceStateWith(remote);
    // keep localStorage in sync too
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
  }
  if(!Array.isArray(state.series)) state.series = [];
  if(!state.volumes || typeof state.volumes !== "object") state.volumes = {};

  // migration: add path fields if missing
  for(const s of state.series){
    if(!s.orderMode) s.orderMode = "auto";
    if(!s.slug) s.slug = suggestSlug(s.name, s.id);


    (state.volumes[s.id] || []).forEach(v=>{
      if(!v.seriesId) v.seriesId = s.id;
      if(v.displayTitle === undefined) v.displayTitle = "";
      if(v.purchaseSite === undefined) v.purchaseSite = "";
      if(v.purchaseUrl === undefined) v.purchaseUrl = "";

      // old storage keys (data urls) are intentionally ignored; user can re-set via path
      if(v.coverPath === undefined) v.coverPath = "";
      if(v.spinePath === undefined) v.spinePath = "";
      if(v.spineText === undefined) v.spineText = "";
      if(v.spineColor === undefined) v.spineColor = "";
    });
  }

  if(state.series.length > 0 && !state.currentSeriesId){
    state.currentSeriesId = state.series[0].id;
  }

  if(!state.currentSeriesId){
    state.ui.selectionMode = false;
    state.ui.selectedIds = [];
    state.ui.lastClickedIndex = null;
    state.ui.openVolumeId = null;
  }

  if(state.ui.displayMode !== "all" && state.ui.displayMode !== "series") state.ui.displayMode = "series";
  if(state.ui.viewMode !== "cover" && state.ui.viewMode !== "spine") state.ui.viewMode = "spine";

  saveState();
  renderAll();
})();



/* ================= SAFE EXTENSION (v20+stable)
   - 背表紙/表紙で「1段あたり冊数」を別設定
   - 自動縮小(autoFit)のみ（手動スケールは削除）
   ※ 既存の検索/表示ロジックは壊さないため、後付け/ガード多め
================= */
(function(){
  try{
    if(!window.state) return;
    if(!state.ui) state.ui = {};
    if(state.ui.rowCapSpine == null) state.ui.rowCapSpine = 20;
    if(state.ui.rowCapCover == null) state.ui.rowCapCover = 10;
    if(state.ui.autoFit == null) state.ui.autoFit = true;

    // calcPerRow を「ビュー別設定」に差し替え（存在する場合のみ）
    if(typeof calcPerRow === "function"){
      const _origCalcPerRow = calcPerRow;
      calcPerRow = function(){
        try{
          const vm = (state.ui && state.ui.viewMode) ? state.ui.viewMode : "spine";
          const cap = (vm === "cover") ? state.ui.rowCapCover : state.ui.rowCapSpine;
          const n = parseInt(cap || 0, 10);
          if(!Number.isNaN(n) && n > 0) return n;
        }catch(e){}
        return _origCalcPerRow();
      };
    }

    // 背表紙画像を contain 表示にするためのクラス付与（存在する場合のみ）
    if(typeof makeSpine === "function"){
      const _origMakeSpine = makeSpine;
      makeSpine = function(series, v, index){
        const el = _origMakeSpine(series, v, index);
        try{
          if(el && el.classList){
            if(el.classList.contains("hasSpineImage")){
              el.classList.add("spineImage");
              el.style.backgroundColor = "transparent";
            }else{
              el.classList.remove("spineImage");
            }
          }
        }catch(e){}
        return el;
      };
    }

    // 自動縮小（100%表示で収める）
    function setShelfScale(s){
      const scale = Math.max(0.35, Math.min(1, s));
      document.documentElement.style.setProperty("--shelfScale", String(scale));
      const wrap = document.getElementById("shelfScale");
      if(wrap) wrap.style.transform = `scale(${scale})`;
    }

    function autoFitScale(){
      // 背表紙高さ900 + 棚余白 を viewport に収める
      const reserve = 180; // header + 余白
      const target = 900 + 140;
      const avail = Math.max(320, window.innerHeight - reserve);
      const s = Math.min(1, Math.max(0.35, avail / target));
      setShelfScale(s);
    }

    function applyScalePolicy(){
      if(state.ui.autoFit) autoFitScale();
      else setShelfScale(1);
    }

    // UI バインド（存在する要素だけ）
    function bindUI(){
    function bindNumberInput(el, getVal, setVal){
      if(!el) return;
      el.value = String(getVal());
      const commit = ()=>{
        const v = parseInt(el.value||"0",10) || 0;
        setVal(v);
        try{ saveState(); }catch(e){}
        try{ renderAll(); }catch(e){}
      };
      el.addEventListener("change", commit);
      el.addEventListener("input", commit);
    }

      const rowCapSpineEl = document.getElementById("rowCapSpine");
      const rowCapCoverEl = document.getElementById("rowCapCover");
      const autoFitEl = document.getElementById("autoFit");

      bindNumberInput(rowCapSpineEl, ()=> getActiveRowCap("spine" )||20, (v)=>{ setActiveRowCap("spine", v); syncRowCapsFromInputs(); });
      bindNumberInput(rowCapCoverEl, ()=> getActiveRowCap("cover")||10, (v)=>{ setActiveRowCap("cover", v); syncRowCapsFromInputs(); });
          
if(autoFitEl){
        autoFitEl.checked = !!state.ui.autoFit;
        autoFitEl.addEventListener("change", ()=>{
          state.ui.autoFit = !!autoFitEl.checked;
          try{ saveState(); }catch(e){}
          applyScalePolicy();
          try{ renderAll(); }catch(e){}
        });
      }

      applyScalePolicy();
    }

    window.addEventListener("resize", ()=>{
      try{ applyScalePolicy(); }catch(e){}
    });

    setTimeout(()=>{ try{ bindUI(); }catch(e){ console.warn(e); } }, 0);

  }catch(e){
    console.warn("SAFE EXTENSION failed:", e);
  }
})();

/* ================= Import / Export (v20+IO) =================
   - localStorage の本棚データを JSON でバックアップ/復元
   - 既存の検索/表示ロジックは一切変更しない
============================================================== */
(function(){
  function downloadBlob(blob, filename){
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 1500);
  }

  function safeClone(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  function exportBookshelf(){
    try{
      const payload = {
        app: "my_bookshelf",
        formatVersion: 1,
        exportedAt: new Date().toISOString(),
        state: safeClone(state),
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
      const stamp = new Date().toISOString().replace(/[:.]/g,"-");
      downloadBlob(blob, `my_bookshelf_${stamp}.json`);
    }catch(e){
      alert("エクスポートに失敗しました: " + (e?.message || e));
    }
  }

  async function importBookshelfFile(file){
    const txt = await file.text();
    const obj = JSON.parse(txt);
    const incoming = obj?.state || obj;

    if(!incoming || typeof incoming !== "object"){
      throw new Error("JSON形式が不正です");
    }
    // Replace in-memory state (and migrate if function exists)
    state = incoming;

    // migrate if available (some versions have migrateState)
    if(typeof migrateState === "function"){
      try{ migrateState(); }catch(e){}
    }

    if(typeof saveState === "function"){
      saveState();
    }else{
      // fallback: store raw (best-effort)
      try{ localStorage.setItem("my_bookshelf_state", JSON.stringify(state)); }catch(e){}
    }

    if(typeof renderAll === "function"){
      renderAll();
    }else{
      location.reload();
    }
  }

  // Wire UI after DOM ready
  setTimeout(()=>{
    const btn = document.getElementById("btnExport");
    if(btn) btn.addEventListener("click", exportBookshelf);

    const fi = document.getElementById("fileImport");
    const importModal = document.getElementById("importModal");
    const btnCancel = document.getElementById("btnImportCancel");
    const btnProceed = document.getElementById("btnImportProceed");
    let pendingFile = null;

    function openModal(){
      if(!importModal) return;
      importModal.classList.remove("hidden");
      importModal.setAttribute("aria-hidden","false");
    }
    function closeModal(){
      if(!importModal) return;
      importModal.classList.add("hidden");
      importModal.setAttribute("aria-hidden","true");
    }
    function getMode(){
      const sel = importModal?.querySelector('input[name="importMode"]:checked');
      return sel ? sel.value : "overwrite";
    }
    function fillMissing(dst, src){
      for(const k of Object.keys(src||{})){
        if(dst[k] == null || dst[k] === "") dst[k] = src[k];
      }
    }
    function mergeState(current, incoming){
      const out = JSON.parse(JSON.stringify(current || {}));
      out.series = out.series || [];
      out.volumes = out.volumes || [];

      const curSeries = new Map(out.series.map(s=>[s.id,s]));
      const curVol = new Map(out.volumes.map(v=>[v.id,v]));

      for(const sIn of (incoming.series || [])){
        if(!sIn?.id) continue;
        if(!curSeries.has(sIn.id)){
          out.series.push(sIn);
          curSeries.set(sIn.id, sIn);
        }else{
          fillMissing(curSeries.get(sIn.id), sIn);
        }
      }
      for(const vIn of (incoming.volumes || [])){
        if(!vIn?.id) continue;
        if(!curVol.has(vIn.id)){
          out.volumes.push(vIn);
          curVol.set(vIn.id, vIn);
        }else{
          fillMissing(curVol.get(vIn.id), vIn);
        }
      }
      // UI: keep current, fill missing
      out.ui = out.ui || {};
      fillMissing(out.ui, incoming.ui || {});
      return out;
    }

    if(fi){
      fi.addEventListener("change", ()=>{
        const f = fi.files && fi.files[0];
        if(!f) return;
        pendingFile = f;
        openModal();
      });
    }

    btnCancel?.addEventListener("click", ()=>{
      pendingFile = null;
      if(fi) fi.value = "";
      closeModal();
    });

    btnProceed?.addEventListener("click", async ()=>{
      try{
        if(!pendingFile) return;
        const txt = await pendingFile.text();
        const obj = JSON.parse(txt);
        const incoming = obj?.state || obj;
        if(!incoming || typeof incoming !== "object") throw new Error("JSON形式が不正です");

        const mode = getMode();
        if(mode === "merge") state = mergeState(state, incoming);
        else state = incoming;

        if(typeof migrateState === "function"){
          try{ migrateState(); }catch(e){}
        }
        if(typeof saveState === "function") saveState();
        if(typeof renderAll === "function") renderAll();
        if(fi) fi.value = "";
        pendingFile = null;
        closeModal();
      }catch(e){
        alert("インポートに失敗しました: " + (e?.message || e));
      }
    });

  }, 0);

})();


/* ================= Sidebar Toggle
   - ≡ で設定パネル(サイドバー)を表示/非表示
   - 状態は localStorage に保存
==================================================== */
(function(){
  const KEY = "my_bookshelf_sidebar_hidden";
  const load = ()=>{ try{ return localStorage.getItem(KEY)==="1"; }catch(e){ return false; } };
  const save = (v)=>{ try{ localStorage.setItem(KEY, v ? "1":"0"); }catch(e){} };
  const apply = (v)=>{ document.body.classList.toggle("sidebarHidden", !!v); };

  setTimeout(()=>{
    const btn = document.getElementById("btnSidebarToggle");
    if(!btn) return;

    let hidden = load();
    apply(hidden);

    btn.addEventListener("click", ()=>{
      hidden = !document.body.classList.contains("sidebarHidden");
      apply(hidden);
      save(hidden);
      try{ renderAll(); }catch(e){}
    });
  }, 0);
})();


/* ================= RowCap Debug ================= */
function updateRowCapStatus(){
  try{
    const el = document.getElementById("rowCapStatus");
    if(!el) return;
    const vm = (state.ui && state.ui.viewMode) ? state.ui.viewMode : "spine";
    const capS = state.ui.rowCapSpine ?? 20;
    const capC = state.ui.rowCapCover ?? 10;
    const per = (typeof calcPerRow === "function") ? calcPerRow() : "?";
    el.textContent = `view:${vm} / rowCapSpine:${capS} / rowCapCover:${capC} / perRow:${per}`;
  }catch(e){}
}


/* ================= RowCap Status Wiring (fix13) ================= */
(function(){
  function updateRowCapStatusFix(){
    try{
      const el = document.getElementById("rowCapStatus");
      if(!el) return;
      const vm = (state.ui && state.ui.viewMode) ? state.ui.viewMode : "spine";
      const capS = state.ui.rowCapSpine ?? 20;
      const capC = state.ui.rowCapCover ?? 10;
      const per = (typeof calcPerRow === "function") ? calcPerRow() : "?";
      el.textContent = `view:${vm} / rowCapSpine:${capS} / rowCapCover:${capC} / perRow:${per}`;
    }catch(e){}
  }

  // Hook renderAll to keep status in sync
  if(typeof renderAll === "function" && !renderAll.__rowcap_hooked){
    const _r = renderAll;
    const wrapped = function(){
      const out = _r.apply(this, arguments);
      updateRowCapStatusFix();
      return out;
    };
    wrapped.__rowcap_hooked = true;
    renderAll = wrapped;
  }

  // Also update on view toggle buttons if present
  setTimeout(()=>{
    try{
      updateRowCapStatusFix();
      // if there are any buttons that switch view, update after click
      const btns = document.querySelectorAll("[data-viewmode], #btnViewSpine, #btnViewCover");
      btns.forEach(b=> b.addEventListener("click", ()=> setTimeout(updateRowCapStatusFix, 0)));
    }catch(e){}
  }, 0);

  // Expose for manual call (optional)
  window.updateRowCapStatusFix = updateRowCapStatusFix;
})();


/* ================= Quick Controls Wiring =================
   - 上部バーで ALL/シリーズ移動、表紙/背表紙切替、段数入力、反映 を操作
   - サイドバー非表示でも操作可能
=========================================================== */
(function(){
  function click(id){ const el = document.getElementById(id); if(el) el.click(); }
  function setActive(btnId, on){
    const el = document.getElementById(btnId);
    if(!el) return;
    el.classList.toggle("primary", !!on);
  }

  function gotoSeries(delta){
    if(!state.series || state.series.length===0) return;
    if(state.ui.displayMode !== "series"){
      state.ui.displayMode = "series";
    }
    let idx = state.series.findIndex(s=>s.id===state.currentSeriesId);
    if(idx<0) idx = 0;
    idx = (idx + delta + state.series.length) % state.series.length;
    state.currentSeriesId = state.series[idx].id;
    state.ui.openVolumeId = null;
    state.ui.selectedIds = [];
    state.ui.lastClickedIndex = null;
    saveState();
    renderAll();
  }

  function toggleAll(){
    state.ui.displayMode = (state.ui.displayMode === "all") ? "series" : "all";
    state.ui.openVolumeId = null;
    state.ui.selectedIds = [];
    state.ui.lastClickedIndex = null;
    saveState();
    renderAll();
  }

  function setView(vm){
    state.ui.viewMode = vm;
    saveState();
    renderAll();
  }

  function applyLayoutFromTop(){
    // top inputs are source of truth（端末別に保存）
    const sTop = document.getElementById("rowCapSpineTop");
    const cTop = document.getElementById("rowCapCoverTop");
    const s = sTop ? (parseInt(sTop.value||"0",10)||0) : (getActiveRowCap("spine")||0);
    const c = cTop ? (parseInt(cTop.value||"0",10)||0) : (getActiveRowCap("cover")||0);

    setActiveRowCap("spine", s);
    setActiveRowCap("cover", c);

    const curS = getActiveRowCap("spine") || 20;
    const curC = getActiveRowCap("cover") || 10;

    // mirror to sidebar inputs too
    const sSide = document.getElementById("rowCapSpine");
    const cSide = document.getElementById("rowCapCover");
    if(sSide) sSide.value = String(curS);
    if(cSide) cSide.value = String(curC);
    if(sTop) sTop.value = String(curS);
    if(cTop) cTop.value = String(curC);

    saveState();
    renderAll();
  }

  function syncTopInputs(){
    const sTop = document.getElementById("rowCapSpineTop");
    const cTop = document.getElementById("rowCapCoverTop");
    if(sTop) sTop.value = String(getActiveRowCap("spine") || 20);
    if(cTop) cTop.value = String(getActiveRowCap("cover") || 10);
  }

  function updateTopButtons(){
    const dm = state.ui.displayMode || "series";
    const vm = state.ui.viewMode || "spine";

    setActive("btnQuickAll", dm==="all");
    setActive("btnQuickSpine", vm==="spine");
    setActive("btnQuickCover", vm==="cover");
  }

  function bind(){
    const btnAll = document.getElementById("btnQuickAll");
    btnAll?.addEventListener("click", ()=>{ toggleAll(); });

    document.getElementById("btnPrevSeries")?.addEventListener("click", ()=> gotoSeries(-1));
    document.getElementById("btnNextSeries")?.addEventListener("click", ()=> gotoSeries(+1));

    document.getElementById("btnQuickSpine")?.addEventListener("click", ()=> setView("spine"));
    document.getElementById("btnQuickCover")?.addEventListener("click", ()=> setView("cover"));

    document.getElementById("btnApplyLayoutTop")?.addEventListener("click", ()=>{ applyLayoutFromTop(); });

    document.getElementById("btnApplySizeTop")?.addEventListener("click", ()=>{
      readSizeInputsToState();
      try{ applySizeVars(); }catch(e){}
      saveState();
      renderAll();
    });

    // keep inputs in sync
    try{ syncSizeInputs(); }catch(e){}


    document.getElementById("btnQuickToggleSidebar")?.addEventListener("click", ()=>{
      click("btnSidebarToggle");
    });

    // Optional: press Enter in inputs to apply
    for(const id of ["rowCapSpineTop","rowCapCoverTop"]){
      const el = document.getElementById(id);
      if(el){
        el.addEventListener("keydown", (e)=>{
          if(e.key==="Enter") applyLayoutFromTop();
        });
      }
    }
  }

  // Hook renderAll to keep top bar in sync without changing core logic
  const _origRenderAll = renderAll;
  renderAll = function(){
    try{ applySizeVars(); }catch(e){}
    _origRenderAll();
    try{ syncTopInputs(); }catch(e){}
    try{ updateTopButtons(); }catch(e){}
    try{ updateQuickStatus(); }catch(e){}
  }

  setTimeout(()=>{
    try{ applySizeVars(); }catch(e){}
    bind();
    syncTopInputs();
    updateTopButtons();
    try{ updateQuickStatus(); }catch(e){}
  }, 0);
})();


/* ===== Apply Images Button Delegation =====
   Ensure the button works even if it is placed outside the quick-controls wiring.
*/
document.addEventListener("click", (e)=>{
  const t = e.target;
  if(!t) return;
  if(t.id === "btnApplyImagesSeries"){
    applyExistingImagePathsForCurrentSeries();
  }
});


/* ================= Apply Images Modal ================= */
function openApplyImagesModal(){
  const modal = document.getElementById("applyImagesModal");
  if(!modal) return;
  modal.style.display = "flex";
  modal.dataset.scope = modal.dataset.scope || "series"; // all | series
  modal.dataset.kind  = modal.dataset.kind  || "both";   // both | cover | spine
  syncApplyImagesModalUI();
}
function closeApplyImagesModal(){
  const modal = document.getElementById("applyImagesModal");
  if(!modal) return;
  modal.style.display = "none";
}
function setModalChoice(key, value){
  const modal = document.getElementById("applyImagesModal");
  if(!modal) return;
  modal.dataset[key] = value;
  syncApplyImagesModalUI();
}
function syncApplyImagesModalUI(){
  const modal = document.getElementById("applyImagesModal");
  if(!modal) return;
  const scope = modal.dataset.scope || "series";
  const kind  = modal.dataset.kind  || "both";

  const setPrimary = (id, on)=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.toggle("primary", !!on);
  };

  setPrimary("applyScopeAll", scope==="all");
  setPrimary("applyScopeSeries", scope==="series");

  setPrimary("applyKindBoth", kind==="both");
  setPrimary("applyKindCover", kind==="cover");
  setPrimary("applyKindSpine", kind==="spine");
}

function clearMissingCacheForVolumes(volumes, kind){
  try{
    if(!state || !state.ui || !state.ui.assetStatus) return 0;
    let cleared = 0;
    for(const v of (volumes||[])){
      if(!v) continue;
      if(kind==="both" || kind==="spine"){
        if(v.spinePath){
          const k = String(v.spinePath).trim();
          if(k && (k in state.ui.assetStatus)){ delete state.ui.assetStatus[k]; cleared++; }
        }
      }
      if(kind==="both" || kind==="cover"){
        if(v.coverPath){
          const k = String(v.coverPath).trim();
          if(k && (k in state.ui.assetStatus)){ delete state.ui.assetStatus[k]; cleared++; }
        }
      }
    }
    return cleared;
  }catch(e){
    return 0;
  }
}

function applyImagesWithOptions(scope, kind){
  // 「適用」＝表示範囲とビュー（表紙/背表紙）を切り替え、再描画する
  try{
    if(!state.ui) state.ui = {};
    // scope: all/series
    state.ui.displayMode = (scope === "all") ? "all" : "series";

    // kind: both/cover/spine
    // both の場合はビューは変えない（現在の表示のまま）
    if(kind === "cover") state.ui.viewMode = "cover";
    if(kind === "spine") state.ui.viewMode = "spine";

    // 以前の欠損キャッシュが残っている場合に備えて解除（あっても無害）
    let cleared = 0;
    const clearForSeries = (s)=>{
      if(!s) return;
      if(!state.ui.assetStatus) return;
      for(const v of volumesOfSeries(s)){
        if(!v) continue;
        if((kind==="both" || kind==="spine") && v.spinePath){
          const k = String(v.spinePath).trim();
          if(k && (k in state.ui.assetStatus)){ delete state.ui.assetStatus[k]; cleared++; }
        }
        if((kind==="both" || kind==="cover") && v.coverPath){
          const k = String(v.coverPath).trim();
          if(k && (k in state.ui.assetStatus)){ delete state.ui.assetStatus[k]; cleared++; }
        }
      }
    };
    if(scope === "all"){
      for(const s of (state.series||[])) clearForSeries(s);
    }else{
      clearForSeries(currentSeries());
    }

    saveState();
    renderAll();

    const out = document.getElementById("applyImagesResult");
    if(out){
      const scopeText = (scope==="all") ? "ALL" : "シリーズ";
      const kindText = (kind==="both") ? "すべて" : (kind==="cover" ? "表紙" : "背表紙");
      out.textContent = `反映しました：範囲=${scopeText} / 表示=${kindText} / 解除=${cleared}件`;
    }
  }catch(e){
    const out = document.getElementById("applyImagesResult");
    if(out) out.textContent = "反映でエラー: " + (e && e.message ? e.message : String(e));
  }
}

function bindApplyImagesModal(){
  const modal = document.getElementById("applyImagesModal");
  if(!modal) return;

  document.getElementById("btnApplyImagesClose")?.addEventListener("click", closeApplyImagesModal);
  document.getElementById("btnApplyImagesCancel")?.addEventListener("click", closeApplyImagesModal);
  modal.addEventListener("click", (e)=>{ if(e.target === modal) closeApplyImagesModal(); });

  document.getElementById("applyScopeAll")?.addEventListener("click", ()=> setModalChoice("scope", "all"));
  document.getElementById("applyScopeSeries")?.addEventListener("click", ()=> setModalChoice("scope", "series"));

  document.getElementById("applyKindBoth")?.addEventListener("click", ()=> setModalChoice("kind", "both"));
  document.getElementById("applyKindCover")?.addEventListener("click", ()=> setModalChoice("kind", "cover"));
  document.getElementById("applyKindSpine")?.addEventListener("click", ()=> setModalChoice("kind", "spine"));

  document.getElementById("btnApplyImagesRun")?.addEventListener("click", ()=>{
    const scope = modal.dataset.scope || "series";
    const kind  = modal.dataset.kind  || "both";
    applyImagesWithOptions(scope, kind);
    try{ bulkUpdateImagePaths(scope, kind); }catch(e){}
  });
}

/* ====================================================== */


/* ================= Apply Images Modal (delegated handlers) ================= */
(function(){
  function modalEl(){ return document.getElementById("applyImagesModal"); }

  function open(){
    const m = modalEl();
    if(!m) return;
    m.style.display = "flex";
    m.dataset.scope = m.dataset.scope || "series";
    m.dataset.kind  = m.dataset.kind  || "both";
    if(typeof syncApplyImagesModalUI === "function") syncApplyImagesModalUI();
  }
  function close(){
    const m = modalEl();
    if(!m) return;
    m.style.display = "none";
  }
  function setChoice(key, value){
    const m = modalEl();
    if(!m) return;
    m.dataset[key] = value;
    if(typeof syncApplyImagesModalUI === "function") syncApplyImagesModalUI();
  }
  function run(){
    const m = modalEl();
    if(!m) return;
    const scope = m.dataset.scope || "series";
    const kind  = m.dataset.kind  || "both";
    if(typeof applyImagesWithOptions === "function"){
      applyImagesWithOptions(scope, kind);
    try{ bulkUpdateImagePaths(scope, kind); }catch(e){}
    }
  }

  document.addEventListener("click", (e)=>{
    const t = e.target;
    if(!t) return;
    const id = t.id || "";

    // open modal
    if(id === "btnApplyImagesSeries" || id === "btnApplyImages"){
      e.preventDefault();
      open();
      return;
    }

    const m = modalEl();
    if(!m || m.style.display === "none") return;

    // close
    if(id === "btnApplyImagesClose" || id === "btnApplyImagesCancel"){
      e.preventDefault();
      close();
      return;
    }

    // click backdrop
    if(t === m){
      close();
      return;
    }

    // scope
    if(id === "applyScopeAll"){ setChoice("scope","all"); return; }
    if(id === "applyScopeSeries"){ setChoice("scope","series"); return; }

    // kind
    if(id === "applyKindBoth"){ setChoice("kind","both"); return; }
    if(id === "applyKindCover"){ setChoice("kind","cover"); return; }
    if(id === "applyKindSpine"){ setChoice("kind","spine"); return; }

    // run
    if(id === "btnApplyImagesRun"){ run(); close(); return; }
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key !== "Escape") return;
    const m = modalEl();
    if(m && m.style.display !== "none"){
      close();
    }
  });
})();
/* ======================================================================== */

document.addEventListener("click", (e)=>{
  const t = e.target;
  if(!t) return;
  if((t.id||"") === "btnCacheRefresh"){
    e.preventDefault();
    bumpCacheBuster();
  }
});


async function postServerLog(payload){
  try{
    await fetch("/log", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload),
      keepalive: true,
    });
  }catch(e){}
}

function normalizeUrlForProbe(u){
  const url = (u||"").trim();
  if(!url) return "";
  return (typeof withCacheBuster === "function") ? withCacheBuster(url) : url;
}


function padLeft(num, width){
  const s = String(num);
  if(s.length >= width) return s;
  return "0".repeat(width - s.length) + s;
}

function slugifySeriesForPath(name){
  let s = String(name || "").trim();
  // drop suffix like (通常版) / （通常版） etc.
  s = s.replace(/\s*[（(].*[）)]\s*$/g, "");
  s = s.replace(/[\\\/:*?"<>|]/g, "");
  s = s.replace(/\s+/g, "_");
  return s;
}

function generatePathCandidates(kind, seriesSlugOrName, volNo){
  const folder = (kind === "spine") ? "spines" : "covers";
  const series = slugifySeriesForPath(seriesSlugOrName);
  const n = String(volNo ?? "").trim();
  const num = Number(n);
  const isNum = Number.isFinite(num) && n !== "";
  const bases = [];
  if(isNum){
    const i = Math.trunc(num);
    bases.push(String(i));
    bases.push(padLeft(i, 2));
    bases.push(padLeft(i, 3));
  }else{
    if(n) bases.push(n);
  }
  const exts = ["png","jpg","jpeg","webp"];
  const out = [];
  for(const b of bases){
    for(const ext of exts){
      out.push(`images/${folder}/${series}/${b}.${ext}`);
    }
  }
  return out;
}

async function pickFirstExisting(urls){
  for(const u of urls){
    const ok = await probeOne((typeof withCacheBuster === "function") ? withCacheBuster(u) : u);
    if(ok) return u;
  }
  return "";
}

function probeOne(url){
  return new Promise((resolve)=>{
    try{
      const img = new Image();
      img.onload = ()=> resolve(true);
      img.onerror = ()=> resolve(false);
      img.src = url;
    }catch(e){
      resolve(false);
    }
  });
}


async function bulkUpdateImagePaths(scope, kind){
  const started = Date.now();

  const targetSeries = [];
  if(scope==="all"){
    for(const s of (state.series||[])) targetSeries.push(s);
  }else{
    const s = currentSeries();
    if(s) targetSeries.push(s);
  }

  let autofilled = 0;
  let attempted = 0;
  let total = 0;
  let success = 0, fail = 0, unchanged = 0;

  // 1) Autofill empty paths by checking candidate files
  for(const s of targetSeries){
    const seriesName = s?.name || s?.seriesName || "";
    const seriesSlug = (s && s.slug) ? s.slug : seriesName;
    for(const v of volumesOfSeries(s)){
      if(!v) continue;
      if(v.deleted) continue;

      const volNo = v.vol ?? v.volume ?? v.no ?? "";
      if((kind==="both" || kind==="spine")){
        total++;
        if(!(v.spinePath||"").trim()){
          attempted++;
          const cand = generatePathCandidates("spine", seriesSlug, volNo);
          const picked = await pickFirstExisting(cand);
          if(picked){
            v.spinePath = picked;
            autofilled++;
          }else{
            unchanged++;
          }
        }
      }
      if((kind==="both" || kind==="cover")){
        total++;
        if(!(v.coverPath||"").trim()){
          attempted++;
          const cand = generatePathCandidates("cover", seriesSlug, volNo);
          const picked = await pickFirstExisting(cand);
          if(picked){
            v.coverPath = picked;
            autofilled++;
          }else{
            unchanged++;
          }
        }
      }
    }
  }

  try{ saveState(); }catch(e){}

  // 2) Cache-bust to force re-fetch after file replacement
  try{ if(typeof bumpCacheBuster === "function") bumpCacheBuster(); }catch(e){}

  // 3) Probe all non-empty paths for success/fail counts (dedup)
  const uniqKeys = new Set();
  const uniq = [];
  for(const s of targetSeries){
    for(const v of volumesOfSeries(s)){
      if(!v) continue;
      if(v.deleted) continue;
      if((kind==="both" || kind==="spine")){
        const p = (v.spinePath||"").trim();
        if(p){
          const k = "spine|" + p;
          if(!uniqKeys.has(k)){ uniqKeys.add(k); uniq.push({type:"spine", path:p}); }
        }
      }
      if((kind==="both" || kind==="cover")){
        const p = (v.coverPath||"").trim();
        if(p){
          const k = "cover|" + p;
          if(!uniqKeys.has(k)){ uniqKeys.add(k); uniq.push({type:"cover", path:p}); }
        }
      }
    }
  }

  const CONC = 8;
  let idx = 0;
  async function worker(){
    while(idx < uniq.length){
      const it = uniq[idx++];
      const u = normalizeUrlForProbe(it.path);
      const ok = await probeOne(u);
      if(ok) success++; else fail++;
    }
  }
  await Promise.all(Array.from({length: Math.min(CONC, uniq.length)}, ()=>worker()));

  try{ syncAllVolFromPaths(); }catch(e){}

  try{ renderAll(); }catch(e){}

  const summary = {
    event: "image_path_update",
    scope, kind,
    total,
    success, fail, unchanged,
    autofill_attempted: attempted,
    autofill_filled: autofilled,
    ms: Date.now() - started,
    at: new Date().toISOString(),
  };

  const out = document.getElementById("applyImagesResult");
  if(out){
    out.textContent = `対象${total}件中：成功${success}件、失敗${fail}件、更新なし${unchanged}件 / 自動付与 ${autofilled}/${attempted}`;
  }

  try{ console.log("[Bookshelf] 画像パス更新", summary); }catch(e){}
  await postServerLog(summary);
  return summary;
}


document.addEventListener("click", (e)=>{
  const t = e.target;
  if(!t) return;
  if((t.id||"") === "btnImagePathUpdate"){
    e.preventDefault();
    bulkUpdateImagePaths("series", "both");
  }
});


async function apiListImages(kindFolder, seriesSlug){
  const url = `/api/list_images?kind=${encodeURIComponent(kindFolder)}&series=${encodeURIComponent(seriesSlug)}`;
  const res = await fetch(url, {cache:"no-store"});
  if(!res.ok) throw new Error("list_images failed: " + res.status);
  const data = await res.json();
  return Array.isArray(data.files) ? data.files : [];
}

function extractVolNumberFromFilename(fn){
  const m = String(fn).match(/(\d{1,4})/);
  if(!m) return null;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) ? n : null;
}

function syncVolFromPathsForVolume(v){
  try{
    const cur = Number(v?.vol ?? v?.volume ?? v?.no ?? "");
    if(Number.isFinite(cur) && cur > 0) return false; // already valid
    const sp = (v?.spinePath||"").trim();
    const cp = (v?.coverPath||"").trim();
    const fn = sp ? sp.split("/").pop() : (cp ? cp.split("/").pop() : "");
    if(!fn) return false;
    const n = extractVolNumberFromFilename(fn);
    if(n==null) return false;
    v.vol = n;
    return true;
  }catch(e){
    return false;
  }
}

function syncAllVolFromPaths(){
  let changed = 0;
  try{
    for(const s of (state.series||[])){
      const vols = volumesOfSeries(s);
      for(const v of vols){
        if(!v || v.deleted) continue;
        if(syncVolFromPathsForVolume(v)) changed++;
      }
    }
  }catch(e){}
  if(changed){
    try{ saveState(); }catch(e){}
  }
  return changed;
}

function buildPath(kind, seriesSlug, filename){
  const folder = (kind === "spine") ? "spines" : "covers";
  return `images/${folder}/${seriesSlug}/${filename}`;
}

async function forceSetPathsFromFolder(scope, kind){
  const started = Date.now();
  const targetSeries = [];
  if(scope==="all"){
    for(const s of (state.series||[])) targetSeries.push(s);
  }else{
    const s = currentSeries();
    if(s) targetSeries.push(s);
  }

  let setCount = 0;
  let totalTargets = 0;

  for(const s of targetSeries){
    const seriesName = s?.name || s?.seriesName || "";
    const seriesSlug = (s && s.slug) ? s.slug : slugifySeriesForPath(seriesName);

    let spineFiles = [], coverFiles = [];
    if(kind==="both" || kind==="spine"){
      spineFiles = await apiListImages("spines", seriesSlug);
    }
    if(kind==="both" || kind==="cover"){
      coverFiles = await apiListImages("covers", seriesSlug);
    }

    const spineMap = new Map();
    for(const fn of spineFiles){
      const n = extractVolNumberFromFilename(fn);
      if(n!=null && !spineMap.has(n)) spineMap.set(n, fn);
    }
    const coverMap = new Map();
    for(const fn of coverFiles){
      const n = extractVolNumberFromFilename(fn);
      if(n!=null && !coverMap.has(n)) coverMap.set(n, fn);
    }

    const spineOrdered = [...spineFiles];
    const coverOrdered = [...coverFiles];
    let spineIdx = 0, coverIdx = 0;

    for(const v of volumesOfSeries(s)){
      if(!v) continue;
      if(v.deleted) continue;
      const volNoRaw = v.vol ?? v.volume ?? v.no ?? "";
      const volNo = Number(volNoRaw);

      if(kind==="both" || kind==="spine"){
        totalTargets++;
        let fn = (Number.isFinite(volNo) ? spineMap.get(Math.trunc(volNo)) : null);
        if(!fn && spineOrdered.length) fn = spineOrdered[Math.min(spineIdx, spineOrdered.length-1)];
        if(fn){
          if(!(v.spinePath||"").trim()){
          v.spinePath = buildPath("spine", seriesSlug, fn);
          const n = extractVolNumberFromFilename(fn);
          if(n!=null) v.vol = n;
          setCount++;
        }
        // 既に設定済みなら上書きしない
          spineIdx++;
        }
      }
      if(kind==="both" || kind==="cover"){
        totalTargets++;
        let fn = (Number.isFinite(volNo) ? coverMap.get(Math.trunc(volNo)) : null);
        if(!fn && coverOrdered.length) fn = coverOrdered[Math.min(coverIdx, coverOrdered.length-1)];
        if(fn){
          if(!(v.coverPath||"").trim()){
          v.coverPath = buildPath("cover", seriesSlug, fn);
          const n = extractVolNumberFromFilename(fn);
          if(n!=null) v.vol = n;
          setCount++;
        }
        // 既に設定済みなら上書きしない
          coverIdx++;
        }
      }
    }
  }

  try{ saveState(); }catch(e){}
  try{ if(typeof bumpCacheBuster==="function") bumpCacheBuster(); }catch(e){}
  try{ syncAllVolFromPaths(); }catch(e){}

  try{ renderAll(); }catch(e){}

  const summary = {
    event: "force_set_from_folder",
    scope, kind,
    targets: totalTargets,
    set: setCount,
    ms: Date.now()-started,
    at: new Date().toISOString(),
  };

  const out = document.getElementById("applyImagesResult");
  if(out){
    const scopeText = (scope==="all") ? "ALL" : "シリーズ";
    const kindText = (kind==="both") ? "すべて" : (kind==="cover" ? "表紙" : "背表紙");
    out.textContent = `フォルダから強制設定：範囲=${scopeText} / 対象=${kindText} / 設定=${setCount}件（対象=${totalTargets}件）`;
  }

  try{ console.log("[Bookshelf] フォルダから強制設定", summary); }catch(e){}
  try{ await postServerLog(summary); }catch(e){}
  return summary;
}

document.addEventListener("click", (e)=>{
  const t = e.target;
  if(!t) return;
  if((t.id||"") === "btnApplyFromFolder"){
    e.preventDefault();
    const modal = document.getElementById("applyImagesModal");
    const scope = (modal && modal.dataset.scope) ? modal.dataset.scope : "series";
    const kind  = (modal && modal.dataset.kind) ? modal.dataset.kind : "both";
    forceSetPathsFromFolder(scope, kind);
  }
});


function ensureSeriesVolumes(series){
  if(!state.volumes) state.volumes = {};
  if(!series || !series.id) return [];
  if(!Array.isArray(state.volumes[series.id])) state.volumes[series.id] = [];
  return state.volumes[series.id];
}

function findVolumeByNumber(vols, n){
  const nn = Number(n);
  for(const v of vols){
    const vn = Number(v?.vol ?? v?.volume ?? v?.no ?? "");
    if(Number.isFinite(vn) && Math.trunc(vn) === Math.trunc(nn)) return v;
  }
  return null;
}



async function generateVolumesFromFolder(scope){
  const started = Date.now();
  const targetSeries = [];
  if(scope==="all"){
    for(const s of (state.series||[])) targetSeries.push(s);
  }else{
    const s = currentSeries();
    if(s) targetSeries.push(s);
  }

  let seriesTouched = 0;
  let added = 0;

  for(const s of targetSeries){
    const seriesName = s?.name || s?.seriesName || "";
    const slug = (s?.slug && String(s.slug).trim()) ? String(s.slug).trim() : slugifySeriesForPath(seriesName);

    // Prefer spines list; if empty, try covers
    let files = await apiListImages("spines", slug);
    if(!files.length) files = await apiListImages("covers", slug);

    // Extract numeric volume numbers from filenames (unique, sorted)
    const nums = files.map(extractVolNumberFromFilename).filter(n=>n!=null);
    const uniq = Array.from(new Set(nums.map(n=>Math.trunc(Number(n))))).filter(n=>Number.isFinite(n)).sort((a,b)=>a-b);
    if(!uniq.length) continue;

    const vols = ensureSeriesVolumes(s);
    seriesTouched++;

    for(const n of uniq){
      if(findVolumeByNumber(vols, n)) continue;
      vols.push({
        id: "v_" + s.id + "_" + String(n),
        vol: n,
        owned: false,
        memo: "",
        coverPath: "",
        spinePath: "",
        purchaseSite: "",
        url: ""
      });
      added++;
    }

    // sort volumes by vol
    vols.sort((a,b)=> (Number(a?.vol ?? a?.volume ?? 0) - Number(b?.vol ?? b?.volume ?? 0)));
  }

  try{ saveState(); }catch(e){}

  const summary = {
    event: "generate_volumes_from_folder",
    scope,
    seriesTouched,
    added,
    ms: Date.now()-started,
    at: new Date().toISOString(),
  };

  try{ console.log("[Bookshelf] フォルダから巻生成", summary); }catch(e){}
  try{ await postServerLog(summary); }catch(e){}

  const out = document.getElementById("applyImagesResult");
  if(out){
    const scopeText = (scope==="all") ? "ALL" : "シリーズ";
    out.textContent = `フォルダから巻生成：範囲=${scopeText} / 追加=${added}巻（対象シリーズ=${seriesTouched}）`;
  }
  return summary;
}


document.addEventListener("click", async (e)=>{
  const t = e.target;
  if(!t) return;
  if((t.id||"") === "btnGenerateFromFolder"){
    e.preventDefault();
    const modal = document.getElementById("applyImagesModal");
    const scope = (modal && modal.dataset.scope) ? modal.dataset.scope : "series";
    const kind  = (modal && modal.dataset.kind) ? modal.dataset.kind : "both";
    // 1) generate missing volumes
    await generateVolumesFromFolder(scope);
    // 2) set paths from folder (overwrite)
    await forceSetPathsFromFolder(scope, kind);
  }
});



/* ===========================================================
   Manual Series Add (Google Books disabled)
   - Add series by name + slug
   - Generate volumes by scanning images/spines/<slug>/NN.png
=========================================================== */
function openManualSeriesAdd(){
  const dlg = document.getElementById("dlgManualAdd");
  const nameEl = document.getElementById("manualSeriesName");
  const slugEl = document.getElementById("manualSeriesSlug");
  if(!dlg || !nameEl || !slugEl) return;
  nameEl.value = "";
  slugEl.value = "";
  dlg.classList.remove("hidden");
  nameEl.focus();
}

function closeManualSeriesAdd(){
  const dlg = document.getElementById("dlgManualAdd");
  if(dlg) dlg.classList.add("hidden");
}

function filenameToVol(fn){
  const m = String(fn||"").match(/(\d+)\.(png|jpg|jpeg|webp)$/i);
  if(!m) return null;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) ? n : null;
}

async function listFolderImages(kind, seriesSlug){
  const url = `/api/list_images?kind=${encodeURIComponent(kind)}&series=${encodeURIComponent(seriesSlug)}`;
  const r = await fetch(url, {cache:"no-store"});
  if(!r.ok) throw new Error(`list_images failed: ${r.status}`);
  const j = await r.json();
  return Array.isArray(j.files) ? j.files : [];
}

function ensureSeriesCaps(seriesId){
  if(!state.settings) state.settings = {};
  if(!state.settings.seriesCaps) state.settings.seriesCaps = {};
  if(!state.settings.seriesCaps[seriesId]){
    state.settings.seriesCaps[seriesId] = { spine: 0, cover: 0 }; // 0 = auto
  }
}

async function generateVolumesForSeriesFromFolders(seriesId){
  const s = state.series.find(x=>x.id===seriesId);
  if(!s) return {added:0, kept:0};
  const slug = (s.slug||"").trim();
  if(!slug) throw new Error("series slug is empty");

  const spineFiles = await listFolderImages("spines", slug);
  const coverFiles = await listFolderImages("covers", slug).catch(()=>[]);

  // map vol -> path
  const spineMap = new Map();
  for(const fn of spineFiles){
    const v = filenameToVol(fn);
    if(v==null) continue;
    // prefer 2-digit paths in output (as-is file name)
    spineMap.set(v, `images/spines/${slug}/${fn}`);
  }
  const coverMap = new Map();
  for(const fn of coverFiles){
    const v = filenameToVol(fn);
    if(v==null) continue;
    coverMap.set(v, `images/covers/${slug}/${fn}`);
  }

  if(!state.volumes || typeof state.volumes!=="object") state.volumes = {};
  if(!Array.isArray(state.volumes[seriesId])) state.volumes[seriesId] = [];
  const vols = state.volumes[seriesId];

  // existing by volume number (or by current path filename vol)
  const existingByVol = new Map();
  for(const item of vols){
    const vNum = (item.volume!=null && item.volume!=="" ? Number(item.volume) : null);
    const derived = vNum || filenameToVol(item.spinePath) || filenameToVol(item.coverPath);
    if(derived!=null) existingByVol.set(derived, item);
  }

  let added = 0, kept = 0;
  const allVols = Array.from(new Set([...spineMap.keys(), ...coverMap.keys()])).sort((a,b)=>a-b);

  for(const v of allVols){
    if(existingByVol.has(v)){
      kept++;
      const it = existingByVol.get(v);
      // Fill only if empty
      if(!it.spinePath && spineMap.get(v)) it.spinePath = spineMap.get(v);
      if(!it.coverPath && coverMap.get(v)) it.coverPath = coverMap.get(v);
      if(it.volume==null || it.volume==="" ) it.volume = v;
      continue;
    }
    const it = {
      id: `${seriesId}_${v}_${Date.now()}`,
      seriesId,
      volume: v,
      owned: false,
      displayTitle: "",
      purchaseSite: "",
      purchaseUrl: "",
      coverPath: coverMap.get(v) || "",
      spinePath: spineMap.get(v) || "",
      spineText: "",
      spineColor: ""
    };
    vols.push(it);
    added++;
  }

  // keep deterministic order by volume
  vols.sort((a,b)=>{
    const av = Number(a.volume ?? filenameToVol(a.spinePath) ?? 0);
    const bv = Number(b.volume ?? filenameToVol(b.spinePath) ?? 0);
    return av - bv;
  });

  return {added, kept};
}

async function generateAllFromFolders(){
  if(!state.series || state.series.length===0){
    alert("シリーズがありません。先に「＋シリーズ追加」してください。");
    return;
  }
  const start = performance.now();
  let totalAdded=0, totalKept=0, failed=0;
  for(const s of state.series){
    try{
      const r = await generateVolumesForSeriesFromFolders(s.id);
      totalAdded += r.added;
      totalKept += r.kept;
    }catch(e){
      failed++;
      console.warn(e);
    }
  }
  saveState();
  renderAll();
  const ms = Math.round(performance.now()-start);
  postLog({event:"generate_from_folders", seriesCount: state.series.length, added: totalAdded, kept: totalKept, failed, ms});
  alert(`フォルダ→巻生成 完了\n追加: ${totalAdded} / 既存: ${totalKept} / 失敗: ${failed} / ${ms}ms`);
}

/* Hook buttons (safe even if elements missing) */
(function hookManualAddButtons(){
  const btn = document.getElementById("btnAddSeriesManual");
  if(btn) btn.addEventListener("click", openManualSeriesAdd);
  const btnGen = document.getElementById("btnGenerateAllFromFolders");
  if(btnGen) btnGen.addEventListener("click", generateAllFromFolders);

  const close = document.getElementById("btnManualAddClose");
  if(close) close.addEventListener("click", closeManualSeriesAdd);

  const cancel = document.getElementById("btnManualAddCancel");
  if(cancel) cancel.addEventListener("click", closeManualSeriesAdd);

  const ok = document.getElementById("btnManualAddOk");
  if(ok) ok.addEventListener("click", ()=>{
    const nameEl = document.getElementById("manualSeriesName");
    const slugEl = document.getElementById("manualSeriesSlug");
    const name = (nameEl?.value || "").trim();
    const slug = (slugEl?.value || "").trim();
    if(!name){ alert("シリーズ名を入力してください"); return; }
    if(!slug){ alert("フォルダ名（slug）を入力してください（例：NARUTO）"); return; }

    const id = "s_" + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
    state.series.push({ id, name, slug, orderMode:"auto" });
    ensureSeriesCaps(id);
    if(!state.currentSeriesId) state.currentSeriesId = id;
    closeManualSeriesAdd();
    saveState();
    renderAll();
  });

  // ESC close
  document.addEventListener("keydown", (e)=>{
    if(e.key==="Escape"){
      const dlg = document.getElementById("dlgManualAdd");
      if(dlg && !dlg.classList.contains("hidden")) closeManualSeriesAdd();
    }
  });
})();




/* ================= SERVER ROOT BADGE =================
   Shows which folder the server is serving from (helps avoid "wrong folder" issues).
====================================================== */
(function serverRootBadge(){
  function ensureBadge(){
    let el = document.getElementById("serverRootBadge");
    if(!el){
      el = document.createElement("div");
      el.id = "serverRootBadge";
      el.className = "serverRootBadge";
      el.innerHTML = `<div class="srvTitle">Server</div>
                      <div class="srvPath" id="srvPath">(loading…)</div>
                      <div class="srvHint">tap to copy / double-tap to hide</div>`;
      document.body.appendChild(el);

      let lastTap = 0;
      el.addEventListener("click", async ()=>{
        const now = Date.now();
        const isDouble = (now - lastTap) < 350;
        lastTap = now;

        if(isDouble){
          el.classList.add("hidden");
          return;
        }

        const txt = (el.getAttribute("data-copy") || "").trim();
        if(!txt) return;

        try{
          await navigator.clipboard.writeText(txt);
          el.classList.add("copied");
          setTimeout(()=> el.classList.remove("copied"), 900);
        }catch(e){
          // fallback
          try{
            const ta = document.createElement("textarea");
            ta.value = txt;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
            el.classList.add("copied");
            setTimeout(()=> el.classList.remove("copied"), 900);
          }catch(_){}
        }
      });
    }
    return el;
  }

  async function load(){
    const el = ensureBadge();
    try{
      const r = await fetch("./api/root", {cache:"no-store"});
      const j = await r.json();
      const info = `cwd: ${j.cwd}\nscript: ${j.script_dir}`;
      el.querySelector("#srvPath").textContent = j.cwd || "(unknown)";
      el.setAttribute("data-copy", info);
    }catch(e){
      el.querySelector("#srvPath").textContent = "(api/root failed)";
      el.setAttribute("data-copy", "");
    }
  }

  function boot(){
    load();
    // show again with keyboard shortcut: Alt+R
    document.addEventListener("keydown", (e)=>{
      if(e.altKey && (e.key==="r" || e.key==="R")){
        const el = ensureBadge();
        el.classList.remove("hidden");
        load();
      }
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  }else{
    boot();
  }
})();


// ===== Series Add Fix (2026-02-15) =====
(function(){
  function tryBind(){
    try{
      var btn = document.getElementById("btnAddSeriesManual");
      if(!btn) return false;
      if(btn.dataset && btn.dataset.boundSeriesAddFix==="1") return true;
      if(btn.dataset) btn.dataset.boundSeriesAddFix="1";
      btn.addEventListener("click", function(ev){
        try{
          if(typeof state!=="object" || !state) return;
          if(!Array.isArray(state.series)) state.series = [];
          var name = window.prompt("追加するシリーズ名を入力してください");
          if(!name) return;
          name = (""+name).trim();
          if(!name) return;

          // 既存シリーズがあればそれを選択
          var exists = state.series.find(function(s){
            return ((s && s.name)||"").trim() === name;
          });
          if(exists){
            state.currentSeriesId = exists.id;
            if(typeof saveState==="function") saveState();
            if(typeof renderAll==="function") renderAll();
            return;
          }

          var id = "s_" + Date.now().toString(36);
          state.series.push({ id:id, name:name, author:"", genre:"" });
          state.currentSeriesId = id;

          if(typeof saveState==="function") saveState();
          if(typeof renderAll==="function") renderAll();
        }catch(e){}
      }, {passive:true});
      return true;
    }catch(e){ return false; }
  }
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", function(){ tryBind(); });
  } else {
    tryBind();
  }
  // もし後からUIが差し替わる構成でも拾えるように数回リトライ
  var tries=0;
  var t=setInterval(function(){
    tries++;
    if(tryBind() || tries>20) clearInterval(t);
  }, 500);
})();

