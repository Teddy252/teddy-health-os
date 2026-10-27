# Health & Fitness Athlete OS — Arquitetura do Sistema

## Visão Geral
Plataforma personalizável de saúde, performance, musculação, ergonomia e nutrição esportiva integrada. 
Combina a precisão biomecânica de treinos estruturados (com ilustrações anatômicas, animações e heatmaps musculares) com a elegância de um **Fitness OS Dark Mode OLED**, integração com métricas reais do **Apple Watch / Apple Health** e o **Guia da Cozinha das 4 Semanas** em medidas caseiras práticas.

---

## Estrutura de Diretórios
```
athlete-health-os/
├── architecture.md                     # Resumo técnico e contratos
├── README.md                           # Guia completo de uso e deploy
├── server.py                           # Servidor Python com Webhooks Apple Health
├── data/
│   ├── athlete_profile.json            # Biometria, metas do relógio e preferências
│   ├── health_summary.json             # Métricas agregadas do Apple Watch
│   ├── workouts.json                   # Treinos estruturados com tags anatômicas
│   ├── meal_plan.json                  # Matriz nutricional das 4 semanas e compras
│   └── physio_protocols.json           # Protocolos clínicos de fisioterapia & ergonomia
├── docs/
│   ├── guia_da_cozinha_mensal.md       # Manual prático de medidas caseiras
│   ├── guia_integracao_apple_health.md # Automações e atalhos iOS
│   └── manual_do_atleta.md             # Guia de periodização e hábitos saudáveis
├── scripts/
│   ├── apple_health_parser.py          # Parser streaming do export.xml da Apple
│   ├── healthkit_live_watcher.py       # Observador de sync do iCloud
│   └── stretch_reminder.sh             # Daemon de notificações de pausas ergonômicas
└── dashboard/                          # Aplicação Web (PWA / GitHub Pages / Local)
    ├── index.html                      # Hub Central do Fitness OS
    ├── guia_cozinha_print.html         # Template editorial para impressão A4
    ├── css/style.css                   # Design tokens, glassmorphism e neon accents
    ├── js/app.js                       # Reatividade, timer, localStorage e gráficos
    └── assets/                         # Vídeos MP4, WebP 3D e SVGs anatômicos
```

---

## Contratos de Dados (Data Schemas)

### 1. `athlete_profile.json`
```json
{
  "athlete": {
    "name": "Seu Nome",
    "age": 28,
    "gender": "female",
    "height_cm": 165,
    "current_weight_kg": 62.0,
    "target_weight_kg": 60.0,
    "target_calories_kcal": 2100,
    "fitness_goal": "Condicionamento Físico & Definição"
  },
  "nutrition_targets": {
    "daily_calories": 2100,
    "protein_g": 130,
    "carbs_g": 260,
    "fats_g": 55,
    "water_target_liters": 2.5
  },
  "apple_watch_official_goals": {
    "daily_steps": 8000,
    "daily_active_calories": 350,
    "daily_exercise_minutes": 30,
    "daily_stand_hours": 12,
    "daily_sleep_hours": 8
  }
}
```

### 2. `workouts.json`
Divisões de treino completas (Treinos A, B, C), cada um com lista de exercícios, séries alvo, repetições, descanso (segundos), grupo muscular primário, notas técnicas e mídias associadas.

### 3. `meal_plan.json`
Matriz das 4 semanas com Café da Manhã, Almoço, Lanche da Tarde, Jantar e Ceia Opcional, conversão em medidas caseiras e lista inteligente de compras.
