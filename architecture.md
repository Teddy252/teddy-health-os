# Teddy Health & Fitness OS — Arquitetura do Sistema

## Visão Geral
Plataforma proprietária de saúde, performance, musculação e nutrição integrada para **Teddy Tchogninou**. 
Combina a precisão biomecânica dos treinos da **Olympus Academia** (estilo Golden Era com ilustrações anatômicas e heatmaps musculares) com a elegância de um **Fitness OS Dark Mode OLED**, parametrização dos dados reais do **Apple Watch** e o **Guia da Cozinha das 4 Semanas** em medidas caseiras para a rotina doméstica.

---

## Estrutura de Diretórios
```
Internos_Teddy/Teddy_Health_OS/
├── architecture.md                     # Resumo técnico e contratos (Token Economy)
├── data/
│   ├── athlete_profile.json            # Biometria, metas do relógio e preferências
│   ├── health_summary.json             # Métricas agregadas do Apple Watch
│   ├── workouts.json                   # Treinos A, B, C estruturados com tags anatômicas
│   └── meal_plan.json                  # Matriz nutricional das 4 semanas e compras
├── docs/
│   ├── guia_da_cozinha_mensal.md       # Manual impresso para a cozinheira
│   └── manual_do_atleta.md             # Guia de periodização e hábitos do Teddy
├── scripts/
│   ├── apple_health_parser.py          # Parser streaming do export.xml da Apple
│   ├── stretch_reminder.sh             # Daemon de notificações macOS para postura
│   └── generate_kitchen_pdf.js         # Gerador Puppeteer do PDF A4 da cozinha
└── dashboard/                          # Aplicação Web PWA / Local
    ├── index.html                      # Hub Central do Fitness OS
    ├── guia_cozinha_print.html         # Template editorial para impressão/geladeira
    ├── css/style.css                   # Design tokens, glassmorphism e neon accents
    ├── js/app.js                       # Reatividade, timer, localStorage e gráficos
    └── assets/                         # SVGs anatômicos, diagramas e ilustrações
```

---

## Contratos de Dados (Data Schemas)

### 1. `athlete_profile.json`
```json
{
  "name": "Teddy Tchogninou",
  "dob": "1994-06-03",
  "age": 32,
  "height_cm": 173,
  "current_weight_kg": 72.5,
  "target_weight_kg": 74.0,
  "tdee_kcal": 2450,
  "target_calories_kcal": 2680,
  "macros": {
    "protein_g": 155,
    "carbs_g": 350,
    "fats_g": 72,
    "water_ml": 3000,
    "creatine_g": 5
  },
  "apple_watch_goals": {
    "daily_steps": 8000,
    "active_calories": 300,
    "exercise_minutes": 30,
    "stand_hours": 12,
    "sleep_hours": 8
  }
}
```

### 2. `workouts.json`
Array com `treino_a` (Peito & Bíceps), `treino_b` (Ombro, Trapézio & Tríceps) e `treino_c` (Pernas & Costas), cada um com lista de exercícios, séries alvo, repetições, descanso (segundos), grupo muscular primário, mapa anatômico associado e notas técnicas.

### 3. `meal_plan.json`
Matriz das 4 semanas com Café da Manhã (Pré-treino), Almoço, Lanche da Tarde, Jantar e Ceia Opcional, conversão em medidas caseiras para a empregada, lista de estoque mensal e lista de reposição semanal.

---

## Squad Multi-Persona e Responsabilidades
1. **O Treinador (Personal Trainer):** Gerencia progressão de sobrecarga, volumes semanais e layout biomecânico.
2. **O Nutricionista:** Assegura o aporte de 2.650–2.700 kcal, 155g de proteína e 3L de água, além do protocolo diário de 5g de creatina.
3. **O Chef de Cozinha:** Traduz os macros na culinária favorita do Teddy (arroz, feijões, banana da terra, carnes, frango, batatas e ovos) em formato de medidas caseiras.
4. **O Fisioterapeuta:** Ativação de mobilidade pré-treino e notificações no Mac de descompressão cervical/lombar.
