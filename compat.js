
console.log("[MyBookshelf] errorfix_v8_full_mobile_ui_tapfix_2026-02-09 compat loaded");

/*
 V8 FULL MOBILE UI MODE + TAP FIX + SERVER ROOT BADGE TOGGLE (default OFF)
 - Mobile UI mode: bigger touch targets, sidebar as overlay, tighter layout
 - Tap fix: convert quick taps into reliable clicks (prevents 'needs long-press' symptom)
 - Server root badge: hidden by default, toggleable in Settings (auto-injected)
*/

// ---------- helpers ----------
const __mb = {
  isMobile() {
    return window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  },
  qs(sel, root=document) { return root.querySelector(sel); },
  qsa(sel, root=document) { return Array.from(root.querySelectorAll(sel)); },
  lsGetBool(k, def=false) {
    const v = localStorage.getItem(k);
    if (v === null) return def;
    return v === "1" || v === "true";
  },
  lsSetBool(k, v) {
    localStorage.setItem(k, v ? "1" : "0");
  }
};

// ---------- SAFE RENDER ----------
window.__safeRender = function() {
  try {
    if (typeof render === "function") render();
    else if (typeof refreshUI === "function") refreshUI();
    else if (typeof buildShelf === "function") buildShelf();
    else if (typeof renderAll === "function") renderAll();
  } catch(e) {
    console.warn("Render trigger failed:", e);
  }
};

// ---------- INSTANT ROWCAP REFLECT ----------
(function patchRowCapInstantRender() {
  const keys = [
    "rowCapSpine_pc","rowCapSpine_mobile",
    "rowCapCover_pc","rowCapCover_mobile",
    "rowCapSpine","rowCapCover"
  ];
  const originalSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function(k,v){
    originalSetItem(k,v);
    if(keys.includes(k)) setTimeout(()=>window.__safeRender(),0);
  }
})();

// ---------- Mobile UI MODE (CSS injected, body class toggled) ----------
(function mobileUIMode(){
  const KEY = "mobileUIMode";
  // default: ON on mobile, OFF on desktop
  if (localStorage.getItem(KEY) === null) {
    __mb.lsSetBool(KEY, __mb.isMobile());
  }
  function apply(){
    const on = __mb.lsGetBool(KEY, __mb.isMobile());
    document.documentElement.classList.toggle("mb-mobile-ui", on);
  }
  window.__setMobileUIMode = function(on) {
    __mb.lsSetBool(KEY, !!on);
    apply();
    setTimeout(()=>window.__safeRender(),0);
  };
  window.addEventListener("resize", apply);
  window.addEventListener("orientationchange", apply);
  apply();

  // Inject CSS (generic selectors)
  const css = `
  :root{ --mb-touch:44px; --mb-pad:12px; --mb-font:16px; }
  .mb-mobile-ui body{ -webkit-text-size-adjust: 100%; }
  .mb-mobile-ui .topbar{ position: sticky; top:0; z-index: 30; }
  .mb-mobile-ui .appInner{ padding: 8px; }
  .mb-mobile-ui .brandSub{ display:none !important; }
  .mb-mobile-ui .searchArea{ gap: 8px; }
  .mb-mobile-ui input, .mb-mobile-ui select, .mb-mobile-ui button{ min-height: var(--mb-touch); font-size: var(--mb-font); }
  .mb-mobile-ui .iconBtn{ width: var(--mb-touch); height: var(--mb-touch); }
  .mb-mobile-ui .sidebar{ position: fixed; inset: 0 auto 0 0; width: min(92vw, 360px); transform: translateX(-110%); transition: transform .2s ease; z-index: 60; }
  .mb-mobile-ui .sidebar.isOpen{ transform: translateX(0); }
  .mb-mobile-ui .sidebarBackdrop{ display:none; }
  .mb-mobile-ui .sidebarOverlay{ display:none; }
  .mb-mobile-ui .mb-sidebar-backdrop{ position: fixed; inset:0; background: rgba(0,0,0,.35); z-index: 55; }
  .mb-mobile-ui .grid, .mb-mobile-ui .shelfGrid{ gap: 8px !important; }
  .mb-mobile-ui .card, .mb-mobile-ui .tile, .mb-mobile-ui .bookCard, .mb-mobile-ui .seriesCard{ touch-action: manipulation; }
  .mb-mobile-ui a, .mb-mobile-ui button, .mb-mobile-ui [role="button"], .mb-mobile-ui .clickable{ touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  .mb-mobile-ui .mb-server-badge{ font-size: 12px; padding: 8px 10px; border-radius: 10px; }
  `;
  const st = document.createElement("style");
  st.id = "mb-mobile-ui-style";
  st.textContent = css;
  document.head.appendChild(st);
})();

// ---------- Tap fix (quick tap => click) ----------
(function tapFix(){
  // Only on touch-capable devices
  const touchCapable = (navigator.maxTouchPoints || 0) > 0;
  if(!touchCapable) return;

  let downEl = null;
  let downX = 0, downY = 0;
  let downT = 0;
  let moved = false;

  function isCandidate(el){
    if(!el) return false;
    const c = el.closest("button, a, [role='button'], .clickable, .card, .tile, .bookCard, .seriesCard");
    return c;
  }

  window.addEventListener("pointerdown", (e)=>{
    if(e.pointerType !== "touch") return;
    moved = false;
    downT = Date.now();
    downX = e.clientX; downY = e.clientY;
    downEl = isCandidate(e.target);
  }, true);

  window.addEventListener("pointermove", (e)=>{
    if(e.pointerType !== "touch") return;
    if(!downEl) return;
    const dx = Math.abs(e.clientX - downX);
    const dy = Math.abs(e.clientY - downY);
    if(dx > 10 || dy > 10) moved = true;
  }, true);

  window.addEventListener("pointerup", (e)=>{
    if(e.pointerType !== "touch") return;
    if(!downEl) return;
    const dt = Date.now() - downT;
    const el = downEl;
    downEl = null;
    // Quick tap: <= 600ms, not moved
    if(!moved && dt <= 600){
      // Some browsers sometimes don't fire click when touch + scroll container; enforce click.
      try {
        // Prevent long-press context menu feel
        e.preventDefault();
      } catch(_e){}
      setTimeout(()=>{
        try { el.click(); } catch(_e){}
      }, 0);
    }
  }, true);

  // Reduce long-press menus that steal taps
  window.addEventListener("contextmenu", (e)=>{
    if(__mb.isMobile()) e.preventDefault();
  });
})();

// ---------- Server root badge (default hidden) ----------
(function serverRootBadge(){
  const KEY = "showServerRootBadge";
  if(localStorage.getItem(KEY) === null) __mb.lsSetBool(KEY, false);

  const badge = document.createElement("div");
  badge.className = "mb-server-badge";
  badge.style.cssText = "position:fixed;right:10px;bottom:10px;z-index:9999;max-width:92vw;word-break:break-all;background:rgba(0,0,0,.75);color:#fff;";
  badge.hidden = true;
  badge.title = "タップでコピー / ダブルタップで隠す";
  badge.addEventListener("click", async ()=>{
    try {
      await navigator.clipboard.writeText(badge.textContent || "");
    } catch(e) {
      console.log("clipboard failed", e);
    }
  });
  badge.addEventListener("dblclick", ()=>{
    __mb.lsSetBool(KEY, false);
    apply();
  });
  document.addEventListener("DOMContentLoaded", ()=>{ document.body.appendChild(badge); });

  async function fetchRoot(){
    try {
      const r = await fetch("/api/root", {cache:"no-store"});
      if(!r.ok) return null;
      const j = await r.json();
      return j;
    } catch(e) {
      return null;
    }
  }

  async function apply(){
    const show = __mb.lsGetBool(KEY, false);
    if(!show) { badge.hidden = true; return; }
    const j = await fetchRoot();
    if(!j) {
      badge.textContent = "[server root] /api/root unavailable";
      badge.hidden = false;
      return;
    }
    badge.textContent = "server cwd: " + (j.cwd || "") + " | script: " + (j.script_dir || "");
    badge.hidden = false;
  }

  window.__toggleServerRootBadge = function(on){
    __mb.lsSetBool(KEY, !!on);
    apply();
  };

  window.addEventListener("load", ()=>apply());
})();

// ---------- Settings injection (toggle switches) ----------
(function injectSettingsToggles(){
  function makeRow(label, key, onChange){
    const row = document.createElement("label");
    row.style.cssText = "display:flex;align-items:center;gap:10px;padding:8px 6px;cursor:pointer;user-select:none;";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = __mb.lsGetBool(key, false);
    cb.addEventListener("change", ()=>onChange(cb.checked));
    const span = document.createElement("span");
    span.textContent = label;
    row.appendChild(cb);
    row.appendChild(span);
    return row;
  }

  function tryInject(){
    // Try common settings containers
    const sidebar = __mb.qs(".sidebar") || __mb.qs("#sidebar") || __mb.qs("[data-role='sidebar']");
    if(!sidebar) return false;

    // Avoid duplicates
    if(__mb.qs("#mbCompatToggles", sidebar)) return true;

    const box = document.createElement("div");
    box.id = "mbCompatToggles";
    box.style.cssText = "margin-top:12px;border-top:1px solid rgba(127,127,127,.25);padding-top:10px;";
    const title = document.createElement("div");
    title.textContent = "表示設定（端末別）";
    title.style.cssText = "font-weight:700;opacity:.9;padding:6px;";
    box.appendChild(title);

    box.appendChild(makeRow("完全スマホUIモード", "mobileUIMode", (v)=>window.__setMobileUIMode(v)));
    box.appendChild(makeRow("サーバーフォルダ表示", "showServerRootBadge", (v)=>window.__toggleServerRootBadge(v)));

    sidebar.appendChild(box);
    return true;
  }

  const t = setInterval(()=>{
    if(tryInject()) clearInterval(t);
  }, 400);
  setTimeout(()=>clearInterval(t), 10000);
})();

// ---------- Legacy safety ----------
window.openAddModal = window.openAddModal || function(){
  const el = document.getElementById("btnAddSeries") || document.querySelector('[data-action="add-series"]');
  if(el) el.click();
};
