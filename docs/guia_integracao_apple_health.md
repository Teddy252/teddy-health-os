# Guia Completo de Integração: Apple Watch, Apple Health & Apple Fitness

Este guia ensina como conectar o seu **Apple Watch** e o **Apple Health (Saúde)** ao **Teddy Health & Fitness OS** de forma contínua, automática e sem depender de assinaturas ou apps pagos.

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
       │      │  Servidor Python do Teddy OS    │
       ▼      └────────────────┬────────────────┘
┌─────────────────────┐        │
│    iCloud Drive     │        │
│ Teddy_OS/payload    │        │
└──────────┬──────────┘        │
           ▼                   │
┌──────────────────────────────▼────────────────┐
│         Teddy Health & Fitness OS             │
│   Dashboard atualizado ao vivo + Anéis        │
└───────────────────────────────────────────────┘
```

---

## 1. Atalho 1: Enviar Métricas do Apple Watch para o Teddy OS

Este atalho coleta as suas métricas de saúde mais recentes e envia para o sistema.

### Passo a Passo no seu iPhone:

1. Abra o aplicativo **Atalhos (Shortcuts)** no iPhone.
2. Toque no botão **`+`** (canto superior direito) para criar um novo atalho.
3. Dê o nome de: **`SincronizarTeddyOS`**.
4. Adicione as seguintes ações na ordem:

#### Ações do Atalho:

1. **Buscar Amostras de Saúde:**
   - Tipo de Amostra: `Passos`
   - Agrupar por: `Soma`
   - Data de Início: `Hoje`
   - *Definir variável:* `passos`

2. **Buscar Amostras de Saúde:**
   - Tipo de Amostra: `Energia Ativa (kcal)`
   - Agrupar por: `Soma`
   - Data de Início: `Hoje`
   - *Definir variável:* `calorias`

3. **Buscar Amostras de Saúde:**
   - Tipo de Amostra: `Frequência Cardíaca em Repouso`
   - Limite: `1 amostra mais recente`
   - *Definir variável:* `fc_repouso`

4. **Buscar Amostras de Saúde:**
   - Tipo de Amostra: `Variabilidade da Frequência Cardíaca (HRV)`
   - Limite: `1 amostra mais recente`
   - *Definir variável:* `hrv`

5. **Buscar Amostras de Saúde:**
   - Tipo de Amostra: `Sono`
   - Agrupar por: `Tempo Total`
   - Data de Início: `Hoje`
   - *Definir variável:* `sono`

6. **Dicionário (Montar o JSON):**
   - Adicione as chaves:
     - `steps` ➔ `passos`
     - `active_calories` ➔ `calorias`
     - `resting_heart_rate` ➔ `fc_repouso`
     - `hrv` ➔ `hrv`
     - `sleep_hours` ➔ `sono`
     - `source` ➔ `Apple Watch Ultra`

7. **Envio dos Dados (Escolha uma das opções abaixo):**

   - **Opção A (Via iCloud Drive — Mais simples, funciona de qualquer lugar):**
     - Adicione a ação **Salvar Arquivo**.
     - Desmarque *Perguntar Onde Salvar*.
     - Caminho: `Teddy_OS/healthkit_payload.json`.
     - Ative *Substituir se Existir*.

   - **Opção B (Via Wi-Fi Direta — Instantâneo):**
     - Adicione a ação **Obter Conteúdo de URL**.
     - URL: `http://<IP_DO_SEU_MAC>:8080/api/healthkit-sync`
     - Método: `POST`
     - Corpo da Requisição: `JSON`
     - Conteúdo: Dicionário criado no passo 6.

---

## 2. Automação Pessoal no iPhone (100% Automático)

Para não precisar apertar nenhum botão no dia a dia:

1. No app **Atalhos**, toque na aba **Automação** (na barra inferior).
2. Toque em **Nova Automação**.
3. Escolha uma das duas opções:
   - **Opção Treino:** Escolha **Treino** ➔ *"Ao Terminar Qualquer Treino"* ➔ Ative *"Executar Imediatamente"* sem perguntar ➔ Selecione o atalho `SincronizarTeddyOS`.
   - **Opção Horário:** Escolha **Hora do Dia** ➔ `22:00` (Todos os dias) ➔ Executar Imediatamente ➔ Selecione `SincronizarTeddyOS`.

Pronto! Sempre que você terminar um treino ou às 22h, o Apple Watch envia os dados sozinho para o seu Mac.

---

## 3. Atalho 2: Gravar o Treino da Olympus de Volta no Apple Fitness

Este atalho permite que o botão **"Gravar no Apple Fitness"** no dashboard feche os anéis do seu Apple Watch!

1. No app **Atalhos**, crie um atalho com o nome exato: **`RegistrarTreinoOlympus`**.
2. Adicione a ação **Registrar Amostra de Treino**:
   - Tipo de Atividade: `Treino de Força Tradicional` (Musculação)
   - Data de Início: `Data Atual`
   - Duração: `65 minutos`
   - Calorias Ativas: `380 kcal`
3. Adicione uma notificação:
   - *"Treino Olympus Registrado! Anéis do Apple Fitness atualizados."*

Agora, sempre que terminar um treino na plataforma e tocar no botão, o iOS abre o atalho e registra a atividade oficialmente no Apple Fitness.

---

## 4. Como Manter o Servidor e Observador Rodando no Mac

No seu terminal do Mac, você tem duas ferramentas prontas:

1. **Servidor HTTP com Webhook HealthKit (Já em execução):**
   ```bash
   python3 "Internos_Teddy/Teddy_Health_OS/server.py"
   ```
   *Recebe os dados do atalho na rota `/api/healthkit-sync` e serve o dashboard na porta 8080.*

2. **Observador do iCloud Drive (Opcional se usar a Opção A):**
   ```bash
   python3 "Internos_Teddy/Teddy_Health_OS/scripts/healthkit_live_watcher.py"
   ```
   *Fica em segundo plano no Mac aguardando novas gravações na pasta `iCloud Drive/Teddy_OS/`.*
