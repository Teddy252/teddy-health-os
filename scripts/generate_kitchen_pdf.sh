#!/usr/bin/env bash
# generate_kitchen_pdf.sh — Gera o PDF A4 em alta resolução do Guia da Cozinha
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HTML_FILE="$BASE_DIR/dashboard/guia_cozinha_print.html"
PDF_OUT="$BASE_DIR/docs/Guia_da_Cozinha_Teddy_Mensal.pdf"

if [ -f "$CHROME" ]; then
  "$CHROME" --headless=new --disable-gpu --user-data-dir=/tmp/chrome-pdf-user-data --no-pdf-header-footer --print-to-pdf="$PDF_OUT" "file://$HTML_FILE"
  echo "[+] PDF gerado com sucesso em: $PDF_OUT"
else
  echo "[-] Google Chrome não encontrado em $CHROME"
  exit 1
fi
