# ⚡ Health & Fitness Athlete OS

> **Open-Source Athletic, Wellness & Physiotherapy Operating System**  
> Um sistema completo e personalizável de alta performance que une musculação estruturada, nutrição equilibrada, protocolos clínicos de fisioterapia, ergonomia e sincronização com Apple Watch / Apple Health.

---

## 🏛️ Visão Geral

O **Health & Fitness Athlete OS** é uma plataforma desenvolvida para quem busca consistência física, biomecânica sem lesões e controle diário de bem-estar.

O sistema integra 4 pilares fundamentais:
1. **Musculação Estruturada (Treinos A, B, C):** Divisões inteligentes com sobrecarga progressiva, cadência controlada, repetições na reserva e uma biblioteca completa de execuções com vídeos e renders 3D.
2. **Nutrição & Guia da Cozinha:** Metas diárias de calorias e macronutrientes, acompanhamento de hidratação copo a copo, matriz de refeições para as 4 semanas do mês e lista de compras com medidas caseiras práticas (sem necessidade de balança).
3. **Fisioterapia, Mobilidade & Ergonomia:** 16 protocolos clínicos organizados por categoria (Pré-treino, Pós-treino, Anti-Desk Work e Blindagem Articular), triagem interativa de sintomas com alívio imediato e cronômetro multifásico com áudio para troca de lados.
4. **Hub Apple Watch & Apple Health:** Acompanhamento de passos diários, calorias ativas, frequência cardíaca em repouso e variabilidade da FC (HRV), com suporte a atalhos do iOS para registrar treinos e fechar os anéis automaticamente.

---

## ⚙️ Como Personalizar para Você (Plug & Play)

O projeto é **100% orientado a dados desacoplados (JSON)**. Para personalizar todo o sistema com os seus próprios dados, você só precisa alterar os arquivos dentro da pasta `data/`:

1. **Seu Perfil e Metas (`data/athlete_profile.json`):**
   - Altere seu `name`, `age`, `height_cm`, `current_weight_kg` e `target_weight_kg`.
   - Configure suas metas de calorias, proteínas, carboidratos, gorduras e água diária.
   - O cabeçalho do painel e os indicadores se atualizam automaticamente!

2. **Seus Treinos (`data/workouts.json`):**
   - Personalize a divisão dos treinos (Treino A, B, C ou crie novas divisões).
   - Ajuste exercícios, séries, repetições e intervalos de descanso.

3. **Seu Cardápio (`data/meal_plan.json`):**
   - Defina as refeições que você mais gosta para cada semana do mês.
   - Configure a lista de compras do supermercado e da feira.

---

## 🚀 Como Executar

### 1. Execução Estática Rápida (Zero Configuração)
Você não precisa compilar nada nem instalar dependências pesadas:
- Basta abrir o arquivo `dashboard/index.html` (ou o `index.html` da raiz) diretamente em qualquer navegador (Chrome, Safari, Edge, Firefox).

### 2. Execução com Servidor Local & Webhook Apple Health
Para aproveitar as notificações sonoras e o endpoint para sincronização com o iPhone:
```bash
# Inicie o servidor Python nativo
python3 server.py
```
Acesse no seu navegador:
- **Painel:** [http://localhost:8080](http://localhost:8080)
- **Status da API:** [http://localhost:8080/api/status](http://localhost:8080/api/status)

### 3. Deploy Gratuito no GitHub Pages
Para acessar o painel de qualquer lugar (no celular, tablet ou computador):
1. No seu repositório no GitHub, vá em **Settings** ➔ **Pages**.
2. Em **Branch**, selecione `main` e a pasta `/ (root)`.
3. Clique em **Save**.
4. Em instantes, o seu dashboard estará online e acessível publicamente!

---

## 📱 Sincronização com Apple Watch & Atalhos do iPhone

O sistema inclui guias detalhados para conectar o seu relógio:
- **Envio Automático de Métricas:** Crie uma automação no app **Atalhos (Shortcuts)** do iOS para enviar passos, calorias e FC ao término de treinos ou às 22h via webhook POST ou arquivo no iCloud.
- **Fechamento de Anéis:** O botão no dashboard dispara a URL scheme nativa `shortcuts://` para registrar o treino finalizado diretamente no Apple Fitness.
- Consulte o passo a passo completo no arquivo [`docs/guia_integracao_apple_health.md`](docs/guia_integracao_apple_health.md).

---

## 📁 Estrutura do Projeto

```
├── dashboard/                     # Interface Web Completa
│   ├── index.html                 # Hub central esportivo
│   ├── css/style.css              # Design system dark atlético
│   ├── js/app.js                  # Engine reativa (Timer, Anéis, Mídia)
│   ├── assets/                    # Vídeos MP4, WebP 3D e SVGs anatômicos
│   │   ├── exercises/             # Execuções de musculação
│   │   └── physio/                # Protocolos clínicos de fisioterapia
│   └── guia_cozinha_print.html    # Layout A4 para impressão/geladeira
├── data/                          # Dados em JSON puro (fácil personalização)
│   ├── athlete_profile.json       # Perfil do atleta e metas
│   ├── workouts.json              # Periodização dos treinos
│   ├── meal_plan.json             # Cardápios semanais e listas de compras
│   ├── health_summary.json        # Métricas agregadas de saúde
│   └── physio_protocols.json      # Protocolos clínicos de fisioterapia
├── docs/                          # Manuais e documentações
│   ├── manual_do_atleta.md        # Princípios de treino e recuperação
│   ├── guia_da_cozinha_mensal.md  # Guia operacional de refeições
│   └── guia_integracao_apple.md   # Passo a passo de atalhos no iOS
├── scripts/                       # Scripts auxiliares e automações
│   ├── server.py                  # Servidor HTTP + Webhook HealthKit
│   └── stretch_reminder.sh        # Lembrete de pausas ergonômicas
└── index.html                     # Redirecionador automático
```

---

## 📄 Licença
Distribuído sob a licença MIT. Sinta-se livre para clonar, adaptar, compartilhar com amigos e utilizar em sua própria rotina de bem-estar.
