#!/usr/bin/env bash
# stretch_reminder.sh — Daemon de Lembretes do Fisioterapeuta (Athlete OS)
# Dispara notificações nativas no macOS com exercícios rotativos de postura, mobilidade e hidratação.

EXERCISES=(
  "Hora de hidratar e soltar a cervical! 10 Chin Tucks (retração horizontal de queixo) e beba 250ml de água."
  "Abertura Torácica: entrelace as mãos atrás das costas e abra o peito por 30s para compensar o teclado."
  "Destravar a Lombar & Psoas: levante da cadeira por 2 min, contraia o glúteo e projete o quadril à frente."
  "Cuidado com os Punhos: estenda o braço e puxe suavemente os dedos para trás por 20s em cada mão."
  "Respiração Diafragmática (4-4-8): puxe o ar pelo nariz em 4s, segure 4s, solte em 8s para baixar o cortisol."
  "Mobilidade Escapular: gire os ombros para trás 10 vezes e aperte as escápulas uma contra a outra."
  "Postura de Tartaruga: alinhe o topo do monitor com a linha dos seus olhos e descanse a vista por 20s."
)

# Escolher exercício baseado no minuto atual
INDEX=$(( $(date +%-M) % ${#EXERCISES[@]} ))
MESSAGE="${EXERCISES[$INDEX]}"

# Disparar notificação nativa macOS
osascript -e "display notification \"$MESSAGE\" with title \"🧘 Fisioterapeuta Athlete OS\" subtitle \"Pausa Ativa Ergonômica (2 Minutos)\" sound name \"Glass\""

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Lembrete disparado: $MESSAGE"
