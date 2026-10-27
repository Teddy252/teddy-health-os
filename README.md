# ⚡ Teddy Health & Fitness OS

> **High-Performance Athletic Operating System**  
> Custom Sports Science, Golden Era Hypertrophy, Apple Watch / HealthKit Integration, Kitchen & Nutrition Automation, and Clinical Physiotherapy.

---

## 🏛️ Visão Geral

O **Teddy Health & Fitness OS** é uma plataforma médica e esportiva personalizada desenvolvida para alta performance física e cognitiva. Ele une:
1. **Treinos Olympus (Golden Era Bodybuilding):** Periodização A/B/C com sobrecarga progressiva, cadência controlada, repetições na reserva e biblioteca multimídia de execução 3D.
2. **Nutrição de Precisão & Guia da Cozinha:** Aporte de 2.680 kcal calibrado para ganho de massa magra sem acúmulo de gordura, triplo anel de macronutrientes, hidratação de 3L/dia e lista de compras mensal de atacado com medidas caseiras para a cozinheira.
3. **Fisioterapia, Mobilidade & Ergonomia Mac:** 16 protocolos clínicos com sistema de mídia tripla (Render 3D de atleta, vídeo em loop na gaveta deslizante e diagramas vetoriais de ângulos), cronômetro inteligente com troca de lados e triagem rápida de dor.
4. **Apple Watch HealthKit Hub:** Sincronização em tempo real de passos, calorias ativas, frequência cardíaca em repouso e variabilidade da frequência cardíaca (VFC/HRV), com atalhos no iOS para fechar os anéis automaticamente.

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────┐         ┌─────────────────────────┐
│       Apple Watch       │         │      Mac Workstation    │
│  Passos • FC • VFC •    │         │  Ergonomia • Pausas     │
│  Calorias • Sono        │         │  stretch_reminder.sh    │
└────────────┬────────────┘         └────────────┬────────────┘
             │                                   │
             ▼                                   ▼
┌─────────────────────────┐         ┌─────────────────────────┐
│     App Atalhos (iOS)   │         │    Teddy Health Server  │
│  Automação pós-treino / │ ──────> │    Python 3 HTTP +      │
│  POST /api/healthkit    │         │    HealthKit Webhook    │
└─────────────────────────┘         └────────────┬────────────┘
                                                 │
                                                 ▼
                                    ┌─────────────────────────┐
                                    │     Live Dashboard      │
                                    │  HTML5 + CSS Moderno +  │
                                    │  SVG Vector Charts      │
                                    └─────────────────────────┘
```

---

## 🚀 Como Executar

### 1. Execução Local Completa (com Webhook Apple Watch)
```bash
# Clone ou acesse o diretório do projeto
cd Internos_Teddy/Teddy_Health_OS

# Inicie o servidor integrado
python3 server.py
```
Acesse no navegador:
* **Dashboard do Atleta:** [http://localhost:8080](http://localhost:8080)
* **Status da API:** [http://localhost:8080/api/status](http://localhost:8080/api/status)

### 2. Execução Estática (GitHub Pages / Standalone)
O frontend foi desenvolvido com tecnologia web moderna nativa (zero dependências pesadas de build). Você pode abrir diretamente o arquivo `dashboard/index.html` em qualquer navegador ou hospedar gratuitamente no **GitHub Pages**.

---

## 📱 Integração Apple Watch & HealthKit

Para enviar métricas automaticamente do iPhone/Watch para o painel:
1. Abra o app **Atalhos** no iPhone.
2. Crie uma nova automação pessoal disparada ao **"Terminar um Treino"** ou às **"22:00"**.
3. Adicione a ação **"Obter Conteúdo de URL"**:
   - **URL:** `http://<SEU_IP_LOCAL>:8080/api/healthkit-sync`
   - **Método:** `POST`
   - **Cabeçalho:** `Content-Type: application/json`
   - **Corpo da Requisição (JSON):**
     ```json
     {
       "steps": 14200,
       "active_calories": 480,
       "resting_heart_rate": 58,
       "hrv": 54,
       "sleep_hours": 7.8,
       "source": "Apple Watch Ultra"
     }
     ```
4. Ao receber a requisição, o servidor emite uma notificação nativa com som no macOS e atualiza o dashboard instantaneamente.

---

## 📁 Estrutura do Repositório

```
Teddy_Health_OS/
├── dashboard/                     # Interface do Dashboard
│   ├── index.html                 # Página principal esportiva
│   ├── css/style.css              # Design system dark atlético
│   ├── js/app.js                  # Engine reativa (Timer, Anéis, Mídia)
│   ├── assets/                    # Assets gráficos e de mídia
│   │   ├── exercises/             # 25+ vídeos MP4 e renders WebP de musculação
│   │   ├── physio/                # 48 arquivos: WebP 3D, vídeos MP4 e diagramas SVG
│   │   └── *.svg                  # Mapas anatômicos musculares
│   └── guia_cozinha_print.html    # Layout A4 pronto para impressão
├── data/                          # Base de dados JSON desacoplada
│   ├── athlete_profile.json       # Perfil biométrico e metas
│   ├── workouts.json              # Periodização dos Treinos A, B e C
│   ├── meal_plan.json             # Cardápios das 4 semanas e lista de compras
│   ├── health_summary.json        # Métricas sincronizadas do Apple Watch
│   └── physio_protocols.json      # 16 protocolos clínicos de reabilitação
├── docs/                          # Manuais e documentações
│   ├── manual_do_atleta.md        # Manual de treino, sobrecarga e suplementação
│   ├── guia_da_cozinha_mensal.md  # Manual da cozinheira e medidas caseiras
│   ├── guia_da_cozinha_mensal.pdf # PDF vetorial pronto para geladeira
│   └── guia_integracao_apple.md   # Passo a passo de configuração do iOS
├── scripts/                       # Utilitários e automações
│   ├── stretch_reminder.sh        # Daemon de pausas de 90 min no Mac
│   └── generate_kitchen_pdf.py    # Gerador de PDF em alta resolução (PyMuPDF)
├── server.py                      # Servidor HTTP + Webhook HealthKit
└── index.html                     # Redirecionamento raiz
```

---

## 📄 Licença & Autoria
Desenvolvido sob medida por **Antigravity AI** para **Teddy Tchogninou**.  
Projeto de uso pessoal e alta performance.
