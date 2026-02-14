
MyBookshelf V8 FULL MOBILE UI MODE
Build: errorfix_v8_full_mobile_ui_tapfix_2026-02-09

What this adds (patch-only):
- Mobile UI mode (toggle in sidebar settings; default ON on mobile)
- Tap fix: quick tap reliably triggers click (reduces 'needs long-press' issue)
- Server root badge is now hidden by default; toggle in settings to show/hide
- Still keeps instant row-cap reflection (v7 behavior)

INSTALL:
1) Stop server
2) Copy compat.js into server root
3) Ensure index.html loads compat.js BEFORE app.js
4) Restart server
5) Ctrl+F5 hard refresh

NOTES:
- If your sidebar isn't found by auto-injection, tell me its HTML snippet and I'll adapt selectors.
