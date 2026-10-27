# Guia Completo de Integração: Apple Watch, Apple Health & Apple Fitness

Este guia ensina como conectar o seu **Apple Watch** e o **Apple Health (Saúde)** ao **Health & Fitness OS** de forma contínua, automática e sem depender de assinaturas ou apps pagos.

---

## Como a Integração Funciona

```
┌─────────────────────────┐
│       Apple Watch       │
│  Passos • FC • Sono •   │
│  Calorias • Treinos     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   App Atalhos (iOS)     │
│ Automação nativa a cada │
│ término de treino / 22h │
└──────┬───────────┬──────┘
       │           │
       │ Opção A   │ Opção B (Direto na Wi-Fi)
       │ (iCloud)  ▼
       │      ┌─────────────────────────────────┐
       │      │  POST /api/healthkit-sync       │
       │      │  Servidor Python do Athlete OS  │
       ▼      └────────────────┬────────────────┘
┌─────────────────────┐        │
│    iCloud Drive     │        │
│ Athlete_OS/payload  │        │
└──────────┬──────────┘        │
           ▼                   │
┌──────────────────────────────▼────────────────┐
│         Health & Fitness Athlete OS           │
│   Dashboard atualizado ao vivo + Anéis        │
└───────────────────────────────────────────────┘
```

---

## 1. Atalho 1: Enviar Métricas do Apple Watch para o Sistema

Este atalho coleta as suas métricas de saúde mais recentes e envia para o sistema.

### Passo a Passo no seu iPhone:

1. Abra o aplicativo **Atalhos (Shortcuts)** no iPhone.
2. Toque no botão **`+`** (canto superior direito) para criar um novo atalho.
3. Dê o nome de: **`SincronizarAthleteOS`**.
4. Adicione as seguintes ações buscando na barra inferior:
   - **Buscar Amostras de Saúde:**
     - Tipo: *Passos*
     - Data: *Hoje*
     - Agrupar por: *Soma*
   - **Buscar Amostras de Saúde:**
     - Tipo: *Calorias Ativas*
     - Data: *Hoje*
     - Agrupar por: *Soma*
   - **Buscar Amostras de Saúde:**
     - Tipo: *Frequência Cardíaca em Repouso*
     - Limite: *1 mais recente*
   - **Buscar Amostras de Saúde:**
     - Tipo: *Variabilidade da FC (HRV / SDNN)*
     - Limite: *1 mais recente*
   - **Buscar Amostras de Saúde:**
     - Tipo: *Sono*
     - Data: *Últimas 24 horas*
   - **Buscar Amostras de Saúde:**
     - Tipo: *Peso Corporal*
     - Limite: *1 mais recente*

5. **Criar Dicionário JSON:**
   - Adicione a ação **Dicionário** e crie os campos:
     - `steps` ➔ Variável *Passos*
     - `active_calories` ➔ Variável *Calorias Ativas*
     - `resting_heart_rate` ➔ Variável *Frequência Cardíaca em Repouso*
     - `hrv` ➔ Variável *Variabilidade da FC*
     - `sleep_hours` ➔ Variável *Sono*
     - `weight` ➔ Variável *Peso Corporal*
     - `source` ➔ `Apple Watch`

6. **Envio dos Dados (Escolha uma das opções abaixo):**

   - **Opção A (Via iCloud Drive — Mais simples, funciona de qualquer lugar):**
     - Adicione a ação **Salvar Arquivo**.
     - Desmarque *Perguntar Onde Salvar*.
     - Caminho: `Athlete_OS/healthkit_payload.json`.
     - Ative *Substituir se Existir*.

   - **Opção B (Via Wi-Fi Direta — Instantâneo):**
     - Adicione a ação **Obter Conteúdo de URL**.
     - URL: `http://<IP_DO_SEU_COMPUTADOR>:8080/api/healthkit-sync`
     - Método: `POST`
     - Corpo da Requisição: `JSON`
     - Conteúdo: Dicionário criado no passo 5.

---

## 2. Automação Pessoal no iPhone (100% Automático)

Para não precisar apertar nenhum botão no dia a dia:

1. No app **Atalhos**, toque na aba **Automação** (na barra inferior).
2. Toque em **Nova Automação**.
3. Escolha uma das duas opções:
   - **Opção Treino:** Escolha **Treino** ➔ *"Ao Terminar Qualquer Treino"* ➔ Ative *"Executar Imediatamente"* sem perguntar ➔ Selecione o atalho `SincronizarAthleteOS`.
   - **Opção Horário:** Escolha **Hora do Dia** ➔ `22:00` (Todos os dias) ➔ Executar Imediatamente ➔ Selecione `SincronizarAthleteOS`.

Pronto! Sempre que você terminar um treino ou às 22h, o Apple Watch envia os dados sozinho.

---

## 3. Atalho 2: Gravar o Treino de Volta no Apple Fitness

Este atalho permite que o botão **"Gravar no Apple Fitness"** no dashboard feche os anéis do seu Apple Watch!

1. No app **Atalhos**, crie um atalho com o nome: **`RegistrarTreinoOlympus`**.
2. Adicione a ação **Registrar Amostra de Treino**:
   - Tipo de Atividade: `Treino de Força Tradicional` (Musculação)
   - Data de Início: `Data Atual`
   - Duração: `60 minutos`
   - Calorias Ativas: `350 kcal`
3. Adicione uma notificação:
   - *"Treino Registrado! Anéis do Apple Fitness atualizados."*

Agora, sempre que terminar um treino na plataforma e tocar no botão, o iOS abre o atalho e registra a atividade oficialmente no Apple Fitness.

---

## 4. Como Manter o Servidor Rodando Localmente

No seu terminal:

1. **Servidor HTTP com Webhook HealthKit:**
   ```bash
   python3 server.py
   ```
   *Recebe os dados do atalho na rota `/api/healthkit-sync` e serve o dashboard na porta 8080.*

2. **Observador do iCloud Drive (Opcional se usar a Opção A):**
   ```bash
   python3 scripts/healthkit_live_watcher.py
   ```
