import json
import os
import sys
import urllib.parse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler


def _safe_write(handler, b: bytes):
    try:
        handler.wfile.write(b)
    except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
        pass


class Handler(SimpleHTTPRequestHandler):
    # cache off (prevents old app.js staying)
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        # Normalize root to index.html
        if self.path == "/":
            self.path = "/index.html"

        # GET /api/books  -> read books.json
        if self.path == "/api/books":
            data_file = os.path.join(os.path.dirname(__file__), "books.json")
            if not os.path.exists(data_file):
                with open(data_file, "w", encoding="utf-8") as f:
                    json.dump({"series": [], "volumes": {}, "ui": {}, "settings": {}},
                              f, ensure_ascii=False, indent=2)
            with open(data_file, "r", encoding="utf-8") as f:
                data = f.read()

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            _safe_write(self, data.encode("utf-8"))
            return

        # GET /api/root -> debug
        if self.path == "/api/root":
            info = {
                "cwd": os.getcwd(),
                "script_dir": os.path.dirname(os.path.abspath(__file__)),
                "python": sys.executable,
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            _safe_write(self, json.dumps(info, ensure_ascii=False, indent=2).encode("utf-8"))
            return

        # GET /api/list_images?kind=covers|spines&series=...
        if self.path.startswith("/api/list_images"):
            parsed = urllib.parse.urlparse(self.path)
            qs = urllib.parse.parse_qs(parsed.query)
            kind = (qs.get("kind", [""])[0] or "").strip()  # spines|covers
            series = (qs.get("series", [""])[0] or "").strip()

            if kind not in ("spines", "covers") or not series:
                self.send_error(400, "Bad Request")
                return

            series = series.replace("..", "").replace("\\", "/").strip("/")
            base_dir = os.path.join(os.getcwd(), "images", kind, series)

            files = []
            if os.path.isdir(base_dir):
                for fn in os.listdir(base_dir):
                    low = fn.lower()
                    if low.endswith((".png", ".jpg", ".jpeg", ".webp")):
                        files.append(fn)
                files.sort()

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            _safe_write(self, json.dumps({"ok": True, "files": files}, ensure_ascii=False).encode("utf-8"))
            return

        # fallback: static
        try:
            return super().do_GET()
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
            return

    def do_POST(self):
        # POST /api/books -> save books.json (prevents 501)
        if self.path == "/api/books":
            try:
                length = int(self.headers.get("Content-Length", "0") or "0")
            except Exception:
                length = 0
            raw = self.rfile.read(length) if length > 0 else b"{}"
            try:
                obj = json.loads(raw.decode("utf-8"))
            except Exception:
                self.send_error(400, "Invalid JSON")
                return

            data_file = os.path.join(os.path.dirname(__file__), "books.json")
            try:
                with open(data_file, "w", encoding="utf-8") as f:
                    json.dump(obj, f, ensure_ascii=False, indent=2)
            except Exception as e:
                self.send_error(500, f"Failed to write books.json: {e}")
                return

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            _safe_write(self, b'{"ok":true}')
            return

        # POST /log (optional: ignore if app sends logs)
        if self.path == "/log":
            self.send_response(204)
            self.end_headers()
            return

        # everything else -> 404
        self.send_error(404, "Not Found")


def main():
    port = 8000
    if len(sys.argv) >= 2:
        try:
            port = int(sys.argv[1])
        except Exception:
            pass

    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"Serving on http://localhost:{port}/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
