#!/usr/bin/env python3
"""
TEDDY HEALTH & FITNESS OS — APPLE HEALTHKIT & APPLE WATCH LIVE WATCHER
Syncs real-time metrics (steps, calories, HRV, sleep, workouts) from iCloud Drive or local drop inbox.
"""

import os
import sys
import json
import time
import subprocess
from datetime import datetime

PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(PROJECT_DIR, "data")
HEALTH_SUMMARY_PATH = os.path.join(DATA_DIR, "health_summary.json")
PROFILE_PATH = os.path.join(DATA_DIR, "athlete_profile.json")
LOCAL_INBOX_DIR = os.path.join(DATA_DIR, "healthkit_sync_inbox")
ICLOUD_DIR = os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs/Teddy_OS")

os.makedirs(LOCAL_INBOX_DIR, exist_ok=True)

def notify_mac(title, message):
    """Triggers native macOS notification."""
    try:
        script = f'display notification "{message}" with title "{title}" sound name "Glass"'
        subprocess.run(["osascript", "-e", script], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass

def load_json(path):
    if not os.path.exists(path):
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def process_payload(payload):
    """Merges new Apple HealthKit payload into health_summary.json."""
    summary = load_json(HEALTH_SUMMARY_PATH)
    profile = load_json(PROFILE_PATH)

    now_iso = datetime.now().isoformat()
    metrics = summary.setdefault("metrics", {})

    # Steps
    if "steps" in payload:
        steps_val = int(payload["steps"])
        metrics.setdefault("daily_steps", {})["average_active_days"] = steps_val
        metrics["daily_steps"]["last_sync"] = now_iso

    # Active Calories
    if "active_calories" in payload:
        cal_val = int(payload["active_calories"])
        metrics.setdefault("active_energy_kcal", {})["average_daily"] = cal_val
        metrics["active_energy_kcal"]["last_sync"] = now_iso

    # Resting Heart Rate
    if "resting_heart_rate" in payload:
        rhr_val = float(payload["resting_heart_rate"])
        metrics.setdefault("resting_heart_rate_bpm", {})["recent_average"] = rhr_val

    # HRV (Heart Rate Variability)
    if "hrv" in payload:
        hrv_val = float(payload["hrv"])
        metrics.setdefault("hrv_sdnn_ms", {})["recent_average"] = hrv_val
        # Calculate readiness score (40ms = 70, 50ms = 85, 60ms = 95)
        score = min(99, max(50, int(hrv_val * 1.7)))
        metrics["hrv_sdnn_ms"]["readiness_score"] = score

    # Sleep Hours
    if "sleep_hours" in payload:
        metrics.setdefault("sleep", {})["duration_hours"] = float(payload["sleep_hours"])

    # Weight
    if "weight" in payload:
        w_val = float(payload["weight"])
        if "biometrics" in profile:
            profile["biometrics"]["current_weight_kg"] = w_val
        save_json(PROFILE_PATH, profile)

    # Workout completed
    if "recent_workout" in payload:
        w_obj = payload["recent_workout"]
        recent_workouts = summary.setdefault("recent_sample_workouts", [])
        recent_workouts.insert(0, {
            "type": w_obj.get("name", "Musculação Olympus"),
            "startDate": now_iso,
            "duration_min": w_obj.get("duration_minutes", 60),
            "calories": w_obj.get("active_kcal", 350)
        })
        summary["recent_sample_workouts"] = recent_workouts[:20]

    summary["last_sync_timestamp"] = now_iso
    summary["sync_source"] = payload.get("source", "Apple Watch / Shortcuts")

    save_json(HEALTH_SUMMARY_PATH, summary)

    msg = f"Passos: {payload.get('steps', 'N/A')} | Ativas: {payload.get('active_calories', 'N/A')} kcal | HRV: {payload.get('hrv', 'N/A')} ms"
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Sincronização concluída com sucesso! {msg}")
    notify_mac("Teddy Health OS • Sincronizado", f"Dados do Apple Watch atualizados! {msg}")

def check_and_ingest():
    """Checks both local inbox and iCloud folder for sync payload."""
    sources = [
        os.path.join(LOCAL_INBOX_DIR, "healthkit_payload.json"),
        os.path.join(ICLOUD_DIR, "healthkit_payload.json")
    ]

    synced = False
    for src in sources:
        if os.path.exists(src):
            try:
                payload = load_json(src)
                if payload:
                    process_payload(payload)
                    # Archive or remove payload to avoid re-triggering
                    archive_name = f"synced_{int(time.time())}.json"
                    archive_path = os.path.join(LOCAL_INBOX_DIR, archive_name)
                    os.rename(src, archive_path)
                    synced = True
            except Exception as e:
                print(f"Erro ao processar {src}: {e}")
    return synced

def main():
    print("=" * 60)
    print("TEDDY HEALTH OS — APPLE HEALTHKIT & APPLE WATCH LIVE WATCHER")
    print(f"Monitorando pastas de sincronização:")
    print(f"  1. Inbox Local: {LOCAL_INBOX_DIR}")
    print(f"  2. iCloud Drive: {ICLOUD_DIR}")
    print("=" * 60)

    if "--once" in sys.argv:
        check_and_ingest()
        return

    print("Observador ativo (Ctrl+C para encerrar)...")
    while True:
        try:
            check_and_ingest()
            time.sleep(3)
        except KeyboardInterrupt:
            print("\nObservador encerrado.")
            break
        except Exception as e:
            print(f"Erro no loop de observação: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
