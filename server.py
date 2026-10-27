#!/usr/bin/env python3
"""
TEDDY HEALTH & FITNESS OS — INTEGRATED HTTP & HEALTHKIT SYNC SERVER
Serves dashboard static assets AND provides REST endpoint for Apple Shortcuts & watchOS webhooks.
"""

import os
import json
import subprocess
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
HEALTH_SUMMARY_PATH = os.path.join(DATA_DIR, "health_summary.json")
PROFILE_PATH = os.path.join(DATA_DIR, "athlete_profile.json")

def notify_mac(title, message):
    try:
        script = f'display notification "{message}" with title "{title}" sound name "Glass"'
        subprocess.run(["osascript", "-e", script], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass

def update_healthkit_data(payload):
    summary_data = {}
    if os.path.exists(HEALTH_SUMMARY_PATH):
        with open(HEALTH_SUMMARY_PATH, "r", encoding="utf-8") as f:
            summary_data = json.load(f)

    now_iso = datetime.now().isoformat()
    metrics = summary_data.setdefault("metrics", {})

    if "steps" in payload:
        metrics.setdefault("daily_steps", {})["average_active_days"] = int(payload["steps"])
        metrics["daily_steps"]["last_sync"] = now_iso

    if "active_calories" in payload:
        metrics.setdefault("active_energy_kcal", {})["average_daily"] = int(payload["active_calories"])
        metrics["active_energy_kcal"]["last_sync"] = now_iso

    if "resting_heart_rate" in payload:
        metrics.setdefault("resting_heart_rate_bpm", {})["recent_average"] = float(payload["resting_heart_rate"])

    if "hrv" in payload:
        hrv_val = float(payload["hrv"])
        metrics.setdefault("hrv_sdnn_ms", {})["recent_average"] = hrv_val
        metrics["hrv_sdnn_ms"]["readiness_score"] = min(99, max(50, int(hrv_val * 1.7)))

    if "sleep_hours" in payload:
        metrics.setdefault("sleep", {})["duration_hours"] = float(payload["sleep_hours"])

    if "weight" in payload and os.path.exists(PROFILE_PATH):
        try:
            with open(PROFILE_PATH, "r", encoding="utf-8") as pf:
                prof = json.load(pf)
            prof.setdefault("biometrics", {})["current_weight_kg"] = float(payload["weight"])
            with open(PROFILE_PATH, "w", encoding="utf-8") as pf:
                json.dump(prof, pf, indent=2, ensure_ascii=False)
        except Exception as e:
            print("Erro ao atualizar peso no perfil:", e)

    summary_data["last_sync_timestamp"] = now_iso
    summary_data["sync_source"] = payload.get("source", "Apple Watch / Shortcuts Webhook")

    with open(HEALTH_SUMMARY_PATH, "w", encoding="utf-8") as f:
        json.dump(summary_data, f, indent=2, ensure_ascii=False)

    msg = f"Passos: {payload.get('steps', '-')} | Cal: {payload.get('active_calories', '-')} kcal | HRV: {payload.get('hrv', '-')} ms"
    notify_mac("Apple Watch • Sincronizado", f"Dados atualizados no Teddy OS! {msg}")
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Webhook HealthKit processado com sucesso: {msg}")

class TeddyHealthHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        # Health check endpoint
        if self.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            resp = {
                "status": "online",
                "system": "Teddy Health & Fitness OS",
                "timestamp": datetime.now().isoformat()
            }
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        # Redirect root to dashboard
        if self.path == "/" or self.path == "":
            self.send_response(302)
            self.send_header("Location", "/dashboard/index.html")
            self.end_headers()
            return

        super().do_GET()

    def do_POST(self):
        # Endpoint to receive HealthKit payload from Apple Shortcuts / iOS App
        if self.path == "/api/healthkit-sync":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)

            try:
                payload = json.loads(body.decode("utf-8"))
                update_healthkit_data(payload)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                response = {
                    "success": True,
                    "message": "Dados do Apple Watch sincronizados com sucesso!",
                    "received_at": datetime.now().isoformat()
                }
                self.wfile.write(json.dumps(response).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                err = {"success": False, "error": str(e)}
                self.wfile.write(json.dumps(err).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

def run_server(port=8080):
    server = ThreadingHTTPServer(("0.0.0.0", port), TeddyHealthHandler)
    print("=" * 60)
    print(f"TEDDY HEALTH OS — INTEGRATED HTTP & HEALTHKIT SYNC SERVER")
    print(f"Porta: {port}")
    print(f"Dashboard: http://localhost:{port}/dashboard/index.html")
    print(f"Webhook HealthKit: http://localhost:{port}/api/healthkit-sync (POST)")
    print("=" * 60)
    server.serve_forever()

if __name__ == "__main__":
    run_server()
