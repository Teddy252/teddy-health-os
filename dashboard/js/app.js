/* ==========================================================================
   ATHLETE HEALTH & FITNESS OS — REACTIVE CORE ENGINE
   openGym Media Integration • Circular SVG Timer • Slide-Over • LocalStorage
   ========================================================================== */

// Embedded fallback data for offline / file:// protocol
const FALLBACK_WORKOUTS = {
  "gym_origin": "Olympus Academia",
  "athlete": "Atleta",
  "style": "Old School Classic Bodybuilding (Golden Era)",
  "periodization": "Hipertrofia & Densidade Muscular",
  "weekly_splits": [
    {
      "id": "treino_a",
      "name": "Treino A",
      "subtitle": "Peito, Bíceps & Antebraço",
      "focus": "Peitoral Maior (Clavicular e Esternal) e Flexores de Cotovelo",
      "muscle_group_tags": ["chest", "biceps", "forearms"],
      "warmup": {
        "duration_min": 8,
        "modalities": ["Esteira Leve", "Bicicleta"],
        "mobility_protocol": "4 min de ativação de manguito rotador externo no elástico + mobilidade torácica no banco"
      },
      "exercises": [
        {
          "id": "supino_reto",
          "name": "Supino Reto com Barra ou Halteres",
          "target_muscle": "Peitoral Maior (Porção Média/Esternal)",
          "secondary_muscles": ["Tríceps Braquial", "Deltoide Anterior"],
          "sets": 4,
          "reps": "10-8",
          "intensity": "Pirâmide Crescente de Cargas",
          "rest_sec": 90,
          "notes": "Escápulas aduzidas e travadas no banco. Descer a barra controlando em 2 segundos até o terço inferior do peito.",
          "asset_key": "chest_bench_press"
        },
        {
          "id": "supino_inclinado",
          "name": "Supino Inclinado com Halteres ou Barra",
          "target_muscle": "Peitoral Superior (Porção Clavicular)",
          "secondary_muscles": ["Deltoide Anterior", "Tríceps"],
          "sets": 4,
          "reps": "10-8",
          "intensity": "Sobrecarga Progressiva",
          "rest_sec": 90,
          "notes": "Banco inclinado a 30º ou 45º. Foco total em contrair a porção superior do peitoral no topo do movimento.",
          "asset_key": "chest_incline_press"
        },
        {
          "id": "voador_peck_deck",
          "name": "Voador / Peck Deck Máquina",
          "target_muscle": "Peitoral (Isolamento e Densidade Esternal)",
          "secondary_muscles": ["Deltoide Anterior"],
          "sets": 4,
          "reps": "10",
          "intensity": "Pico de Contração de 1 segundo",
          "rest_sec": 60,
          "notes": "Cotovelos levemente flexionados e alinhados com o peito. Aperte o centro do peitoral no ponto de encontro.",
          "asset_key": "chest_fly"
        },
        {
          "id": "crucifixo_crossover",
          "name": "Crucifixo Reto / Cross Over na Polia",
          "target_muscle": "Peitoral Maior (Alongamento & Fechamento)",
          "secondary_muscles": ["Deltoide Anterior"],
          "sets": 4,
          "reps": "12-8",
          "intensity": "Controle Excêntrico",
          "rest_sec": 60,
          "notes": "Sinta o estiramento das fibras peitorais na descida sem hiperestender os ombros.",
          "asset_key": "chest_crossover"
        },
        {
          "id": "rosca_scott",
          "name": "Rosca Scott com Barra W",
          "target_muscle": "Bíceps Braquial (Cabeça Curta & Pico)",
          "secondary_muscles": ["Braquial", "Braquiorradial"],
          "sets": 4,
          "reps": "10",
          "intensity": "Isolamento Estrito",
          "rest_sec": 60,
          "notes": "Braços totalmente apoiados no estofado. Não deixe os ombros avançarem na subida.",
          "asset_key": "arms_preacher_curl"
        },
        {
          "id": "rosca_direta_barra",
          "name": "Rosca Direta com Barra",
          "target_muscle": "Bíceps Braquial (Volume Geral)",
          "secondary_muscles": ["Antebraços"],
          "sets": 4,
          "reps": "10-8",
          "intensity": "Carga Máxima Controlada",
          "rest_sec": 75,
          "notes": "Cotovelos colados ao tronco. Evite usar impulso lombar (balanço).",
          "asset_key": "arms_barbell_curl"
        },
        {
          "id": "rosca_alternada",
          "name": "Rosca Alternada com Halteres",
          "target_muscle": "Bíceps Braquial & Braquiorradial",
          "secondary_muscles": ["Supinador"],
          "sets": 3,
          "reps": "10",
          "intensity": "Supinação Completa no Topo",
          "rest_sec": 60,
          "notes": "Inicie com pegada neutra e supine o punho rodando para fora durante a subida.",
          "asset_key": "arms_alternate_curl"
        },
        {
          "id": "rosca_concentrada_martelo",
          "name": "Rosca Concentrada ou Martelo",
          "target_muscle": "Braquial Anterior & Pico de Bíceps",
          "secondary_muscles": ["Braquiorradial"],
          "sets": 3,
          "reps": "10",
          "intensity": "Pico de Tensão Máxima",
          "rest_sec": 60,
          "notes": "Na rosca martelo: pegada neutra para empurrar o bíceps para cima alargando o braço.",
          "asset_key": "arms_hammer_curl"
        }
      ],
      "post_workout_cooldown": {
        "duration_min": 5,
        "physio_stretches": [
          "Alongamento de peitoral no batente da porta (30s cada lado)",
          "Alongamento de bíceps com braço estendido e palma na parede (30s cada lado)",
          "Descompressão de antebraço e punhos"
        ]
      }
    },
    {
      "id": "treino_b",
      "name": "Treino B",
      "subtitle": "Ombros, Trapézio & Tríceps",
      "focus": "Deltoides (Lateral, Anterior, Posterior), Trapézio e Tríceps Braquial",
      "muscle_group_tags": ["shoulders", "traps", "triceps"],
      "warmup": {
        "duration_min": 8,
        "modalities": ["Elíptico", "Bicicleta"],
        "mobility_protocol": "Mobilidade de escápulas e elevações em Y no banco inclinado"
      },
      "exercises": [
        {
          "id": "desenvolvimento_halteres",
          "name": "Desenvolvimento com Halteres Sentado",
          "target_muscle": "Deltoide Anterior & Médio",
          "secondary_muscles": ["Tríceps", "Trapézio Superior"],
          "sets": 4,
          "reps": "10",
          "intensity": "Sobrecarga de Força",
          "rest_sec": 90,
          "notes": "Suba os halteres em arco controlado sem bater no topo. Desça até a altura das orelhas.",
          "asset_key": "shoulders_dumbbell_press"
        },
        {
          "id": "desenvolvimento_frontal_maq",
          "name": "Desenvolvimento Frontal na Máquina / Barra",
          "target_muscle": "Deltoide Anterior",
          "secondary_muscles": ["Tríceps", "Peitoral Superior"],
          "sets": 4,
          "reps": "12-8",
          "intensity": "Pirâmide Crescente",
          "rest_sec": 75,
          "notes": "Trajetória contínua mantendo a tensão muscular sem descansar no ponto baixo.",
          "asset_key": "shoulders_machine_press"
        },
        {
          "id": "elevacao_lateral",
          "name": "Elevação Lateral com Halteres",
          "target_muscle": "Deltoide Lateral (Ombro em V / Efeito Esculpido)",
          "secondary_muscles": ["Trapézio"],
          "sets": 4,
          "reps": "12-10",
          "intensity": "Cadência Lenta na Descida (3s)",
          "rest_sec": 60,
          "notes": "Cotovelos ligeiramente flexionados e liderando o movimento até a linha paralela ao chão.",
          "asset_key": "shoulders_lateral_raise"
        },
        {
          "id": "remada_alta",
          "name": "Remada Alta na Barra ou Polia",
          "target_muscle": "Deltoide Lateral & Trapézio",
          "secondary_muscles": ["Bíceps", "Braquial"],
          "sets": 3,
          "reps": "12",
          "intensity": "Tração Estrita",
          "rest_sec": 60,
          "notes": "Pegada ligeiramente mais larga que os ombros para poupar a articulação glenoumeral.",
          "asset_key": "shoulders_upright_row"
        },
        {
          "id": "encolhimento_trapezio",
          "name": "Encolhimento de Ombros com Halteres",
          "target_muscle": "Trapézio Superior",
          "secondary_muscles": ["Elevador da Escápula"],
          "sets": 4,
          "reps": "15",
          "intensity": "Pausa de 2s no Topo",
          "rest_sec": 60,
          "notes": "Eleve os ombros reto em direção às orelhas. Não rode os ombros em círculos.",
          "asset_key": "shoulders_shrug"
        },
        {
          "id": "triceps_pulley_reto",
          "name": "Tríceps Pulley (Barra Reta)",
          "target_muscle": "Tríceps Braquial (Cabeça Lateral & Medial)",
          "secondary_muscles": ["Antebraço"],
          "sets": 4,
          "reps": "10",
          "intensity": "Contração Total no Fundo",
          "rest_sec": 60,
          "notes": "Cotovelos travados ao lado do corpo; apenas o antebraço se movimenta.",
          "asset_key": "arms_triceps_pushdown"
        },
        {
          "id": "triceps_corda",
          "name": "Tríceps Polia com Corda",
          "target_muscle": "Tríceps Braquial (Pico Lateral)",
          "secondary_muscles": ["Estabilizadores de Punho"],
          "sets": 4,
          "reps": "12-10",
          "intensity": "Abertura Lateral no Final",
          "rest_sec": 60,
          "notes": "Afaste as pontas da corda na parte mais baixa para contração máxima da cabeça lateral.",
          "asset_key": "arms_triceps_rope"
        },
        {
          "id": "triceps_testa_frances",
          "name": "Tríceps Testa ou Rosca Francesa",
          "target_muscle": "Tríceps Braquial (Cabeça Longa / Volume Posterior)",
          "secondary_muscles": ["Ombro"],
          "sets": 3,
          "reps": "10-RM",
          "intensity": "Até a Falha Concêntrica",
          "rest_sec": 75,
          "notes": "Trabalha a cabeça longa do tríceps responsável pelo volume do braço de lado.",
          "asset_key": "arms_skull_crusher"
        }
      ],
      "post_workout_cooldown": {
        "duration_min": 5,
        "physio_stretches": [
          "Alongamento de tríceps acima da cabeça puxando o cotovelo (30s cada)",
          "Alongamento de deltoide posterior cruzando o braço na frente do peito (30s)",
          "Relaxamento e descompressão cervical"
        ]
      }
    },
    {
      "id": "treino_c",
      "name": "Treino C",
      "subtitle": "Pernas Completas & Costas",
      "focus": "Quadríceps, Isquiotibiais, Panturrilhas, Grande Dorsal e Romboides",
      "muscle_group_tags": ["legs", "back", "calves"],
      "warmup": {
        "duration_min": 8,
        "modalities": ["Bicicleta com Carga Leve", "Esteira"],
        "mobility_protocol": "5 min de mobilidade de tornozelos na parede + alongamento dinâmico de flexores de quadril"
      },
      "exercises": [
        {
          "id": "leg_press_45",
          "name": "Leg Press 45º",
          "target_muscle": "Quadríceps & Glúteos",
          "secondary_muscles": ["Isquiotibiais", "Panturrilhas"],
          "sets": 4,
          "reps": "12",
          "intensity": "Sobrecarga de Carga com Amplitude Profunda",
          "rest_sec": 90,
          "notes": "Pés na largura dos ombros. Desça até 90º sem desgrudar a lombar do encosto.",
          "asset_key": "legs_leg_press"
        },
        {
          "id": "extensor_pernas",
          "name": "Cadeira Extensora",
          "target_muscle": "Quadríceps (Reto Femoral & Vasto Medial/Lateral)",
          "secondary_muscles": ["Ligamento Patelar"],
          "sets": 4,
          "reps": "12-10",
          "intensity": "Pausa de 1s na Extensão",
          "rest_sec": 60,
          "notes": "Controle a volta em 3 segundos sentindo o corte frontal da coxa.",
          "asset_key": "legs_extension"
        },
        {
          "id": "flexor_pernas",
          "name": "Mesa ou Cadeira Flexora",
          "target_muscle": "Posteriores de Coxa (Isquiotibiais)",
          "secondary_muscles": ["Glúteos", "Gastrocnêmio"],
          "sets": 4,
          "reps": "12-RM",
          "intensity": "Repetições Máximas até a Falha",
          "rest_sec": 60,
          "notes": "Quadril colado no banco para não sobrecarregar a coluna lombar.",
          "asset_key": "legs_curl"
        },
        {
          "id": "hack_squat_agacham",
          "name": "Hack Squat ou Agachamento Livre",
          "target_muscle": "Coxas Completas & Cadeia Posterior",
          "secondary_muscles": ["Glúteos", "Core / Eretores da Espinha"],
          "sets": 4,
          "reps": "10-RM",
          "intensity": "Poder e Densidade Global",
          "rest_sec": 90,
          "notes": "Peito aberto, olhar para frente, empurre o chão pelos calcanhares.",
          "asset_key": "legs_hack_squat"
        },
        {
          "id": "adutor_abdutor",
          "name": "Cadeira Adutora & Abdutora",
          "target_muscle": "Adutores & Glúteo Médio",
          "secondary_muscles": ["Estabilizadores da Bacia"],
          "sets": 4,
          "reps": "12",
          "intensity": "Bi-set ou Séries Alternadas",
          "rest_sec": 60,
          "notes": "Fortalece a bacia e previne dores lombares e de joelho ao caminhar e agachar.",
          "asset_key": "legs_adductor"
        },
        {
          "id": "panturrilha",
          "name": "Panturrilha em Pé ou Sentado",
          "target_muscle": "Gastrocnêmio & Sóleo",
          "secondary_muscles": ["Tendão de Aquiles"],
          "sets": 4,
          "reps": "20 ou Drop-set",
          "intensity": "Amplitude Máxima (alongar no fundo e contrair no topo)",
          "rest_sec": 45,
          "notes": "Faça a pausa de 1 segundo no pico alto em ponta de pé antes de descer.",
          "asset_key": "legs_calf_raise"
        },
        {
          "id": "pulley_frontal_costas",
          "name": "Pulley Frontal / Puxada Alta",
          "target_muscle": "Grande Dorsal (Asas das Costas / V-Taper)",
          "secondary_muscles": ["Bíceps", "Braquial", "Redondo Maior"],
          "sets": 4,
          "reps": "12-10",
          "intensity": "Pegada Aberta Pronada",
          "rest_sec": 75,
          "notes": "Puxe a barra em direção à clavícula projetando o peito para cima.",
          "asset_key": "back_lat_pulldown"
        },
        {
          "id": "remada_sentado_triangulo",
          "name": "Remada Baixa Sentado com Triângulo",
          "target_muscle": "Miolo das Costas & Romboides (Espessura)",
          "secondary_muscles": ["Bíceps", "Latíssimo"],
          "sets": 4,
          "reps": "10",
          "intensity": "Aperto Escapular no Final",
          "rest_sec": 75,
          "notes": "Puxe o triângulo contra o abdômen sem inclinar o tronco excessivamente para trás.",
          "asset_key": "back_seated_cable_row"
        },
        {
          "id": "remada_curvada_serrote",
          "name": "Remada Curvada ou Serrote Unilateral",
          "target_muscle": "Dorsal & Trapézio Médio/Inferior",
          "secondary_muscles": ["Eretores da Espinha", "Antebraços"],
          "sets": 3,
          "reps": "12-10",
          "intensity": "Amplitude Profunda de Tração",
          "rest_sec": 60,
          "notes": "No serrote: apoie no banco e puxe o halter rente ao quadril sentindo a dorsal engatar.",
          "asset_key": "back_dumbbell_row"
        }
      ],
      "post_workout_cooldown": {
        "duration_min": 6,
        "physio_stretches": [
          "Postura da Criança (Child's Pose) para descompressão lombar (45s)",
          "Alongamento de glúteos e piriforme em 4 no colchonete (30s cada)",
          "Alongamento de panturrilhas e cadeia posterior encostado na parede"
        ]
      }
    }
  ]
}
;
const FALLBACK_PROFILE = {
  "athlete": {
    "name": "Atleta",
    "birth_date": "1994-06-03",
    "age": 32,
    "gender": "male",
    "height_cm": 173,
    "current_weight_kg": 72.5,
    "target_weight_kg": 74.0,
    "bmr_kcal": 1715,
    "tdee_kcal": 2450,
    "target_calories_kcal": 2680,
    "fitness_goal": "Hipertrofia Limpa com Densidade Muscular Máxima",
    "progress_percent": 98.0
  },
  "nutrition_targets": {
    "daily_calories": 2680,
    "protein_g": 155,
    "protein_kcal": 620,
    "carbs_g": 350,
    "carbs_kcal": 1400,
    "fats_g": 72,
    "fats_kcal": 648,
    "water_target_liters": 3.0,
    "creatine_protocol": "5g diariamente (todos os dias, sem interrupção)"
  },
  "apple_watch_official_goals": {
    "daily_steps": 8000,
    "daily_active_calories": 300,
    "daily_exercise_minutes": 30,
    "daily_stand_hours": 12,
    "daily_sleep_hours": 8,
    "target_weight_kg": 74
  },
  "favorite_foods": [
    "Arroz (branco, basmati, jasmim)",
    "Banana da terra (grelhada, cozida, assada)",
    "Feijão de todo tipo (preto, carioca, fradinho, manteiga)",
    "Peito de frango e sobrecoxa desossada",
    "Carne bovina magra (patinho, alcatra, filé mignon)",
    "Batata inglesa, batata doce e mandioquinha",
    "Ovos (mexidos cremosos, cozidos, omeletes)",
    "Frutas frescas (banana, morango, maçã, abacaxi)",
    "Aveia, mel puro e canela"
  ],
  "domestic_setup": {
    "cook_type": "Empregada doméstica / cozinheira",
    "shopping_frequency": "Compras mensais de atacado + feira/açougue para reposição",
    "kitchen_guidance": "Guia da Cozinha com medidas caseiras em PDF A4 impresso para geladeira"
  }
}
;
const FALLBACK_MEAL_PLAN = {
  "client": "Atleta",
  "daily_target_calories": 2680,
  "daily_macros": {
    "protein_g": 155,
    "carbs_g": 350,
    "fats_g": 72,
    "water_liters": 3.0,
    "creatine_protocol": "5g diariamente (todos os dias, sem parar, pela manhã com a banana ou pós-treino)"
  },
  "kitchen_measurement_guide": {
    "arroz": "2 escumadeiras médias rasas (ou 2 conchas rasas) = aprox. 180-200g cozido",
    "feijao": "1 concha cheia de feijão com caldo espesso e grãos = aprox. 130-150g",
    "carnes_e_frango": "1 bife ou filé médio do tamanho da palma da sua mão aberta = aprox. 140-150g pronto",
    "carne_moida": "3 a 4 colheres de sopa bem cheias",
    "banana_da_terra": "1 unidade média inteira (grelhada na frigideira, cozida ou assada)",
    "ovos": "3 unidades inteiras por café da manhã",
    "batatas": "2 batatas médias cozidas ou assadas (ou 3 fatias grossas de batata doce)"
  },
  "flavor_secrets_chef": [
    "Marinada de Frango Suculento: suco de 1 limão, 2 dentes de alho picados, 1 colher de sobremesa de azeite, páprica defumada, sal moderado e alecrim ou orégano. Deixar 15 min antes de grelhar.",
    "Feijão Encorpado da Casa: refogar bastante alho, cebola e folha de louro no azeite. Amassar uma concha de grãos no final e devolver à panela para engrossar o caldo naturalmente.",
    "Banana da Terra Perfeita: cortar no comprimento, grelhar na frigideira antiaderente com um pingo de manteiga ou azeite até dourar e salpicar canela em pó com um fio de mel."
  ],
  "monthly_bulk_shopping_list": {
    "description": "Itens de despensa e estoque para compra mensal de supermercado/atacado",
    "items": [
      { "item": "Arroz branco ou basmati", "quantity": "2 pacotes de 5kg (10kg total)" },
      { "item": "Feijão Preto", "quantity": "3 pacotes de 1kg" },
      { "item": "Feijão Carioca", "quantity": "3 pacotes de 1kg" },
      { "item": "Feijão Fradinho / Manteiga", "quantity": "2 pacotes de 1kg" },
      { "item": "Azeite de Oliva Extravirgem", "quantity": "2 garrafas de 500ml" },
      { "item": "Aveia em flocos finos", "quantity": "4 pacotes de 500g (2kg total)" },
      { "item": "Mel puro de abelha", "quantity": "1 pote de 500g" },
      { "item": "Canela em pó e Páprica Defumada", "quantity": "2 potes de cada" },
      { "item": "Folhas de Louro e Orégano", "quantity": "2 pacotinhos de cada" },
      { "item": "Café de boa qualidade", "quantity": "4 pacotes de 500g" },
      { "item": "Chás calmantes (Camomila, Erva-doce, Melissa)", "quantity": "4 caixas de sachês" },
      { "item": "Castanhas de caju ou do Pará", "quantity": "500g a 1kg" }
    ]
  },
  "weekly_fresh_shopping_list": {
    "description": "Itens frescos para comprar toda semana ou quinzenalmente no açougue e feira",
    "items": [
      { "item": "Ovos brancos ou caipiras", "quantity": "2 bandejas de 30 ovos (60 ovos por quinzena)" },
      { "item": "Peito de frango em filés", "quantity": "2,5 kg por semana (cortar e congelar em porções individuais)" },
      { "item": "Carne bovina magra (patinho moído / alcatra)", "quantity": "2,0 kg por semana" },
      { "item": "Banana da terra", "quantity": "8 a 10 unidades por semana" },
      { "item": "Bananas prata ou nanica", "quantity": "2 dúzias por semana" },
      { "item": "Batata inglesa e batata doce", "quantity": "3 kg de cada por semana" },
      { "item": "Tomate, Cebola, Alho e Limão", "quantity": "Quantidade semanal de feira" },
      { "item": "Cheiro-verde fresco e hortaliças (Alface, Rúcula)", "quantity": "Semanal" },
      { "item": "Iogurte natural integral", "quantity": "6 a 8 potes por semana" }
    ]
  },
  "four_weeks_meal_matrix": [
    {
      "week_number": 1,
      "theme": "Clássicos da Casa & Força Total",
      "cafe_da_manha": "3 ovos mexidos cremosos + 1 banana da terra grelhada com canela e 1 colher de chá de mel + café preto + 5g de creatina",
      "almoco": "Peito de frango grelhado marinado com limão e alho (1 filé grande da palma da mão) + 2 escumadeiras de arroz branco + 1 concha de feijão preto encorpado + salada verde com azeite",
      "lanche_tarde": "1 pote de iogurte natural com 3 colheres de aveia em flocos finos, 1 banana fatiada e punhado de castanhas",
      "jantar": "Bife de alcatra grelhado macio + 2 escumadeiras de arroz + 1 concha de feijão preto + abobrinha e cenoura salteadas no azeite",
      "ceia_opcional": "Xícara de chá de camomila + 2 castanhas ou 1 quadradinho de chocolate 70%"
    },
    {
      "week_number": 2,
      "theme": "Tradição Brasileira & Energia Pura",
      "cafe_da_manha": "Omelete de 3 ovos com cheiro-verde e tomate picadinho + 1 banana da terra cozida com fio de mel e canela + café + 5g de creatina",
      "almoco": "Patinho moído refogado com cebola e cenoura ralada (4 colheres de sopa cheias) + 2 escumadeiras de arroz + 1 concha de feijão carioca cremoso + 2 fatias grossas de batata doce assada",
      "lanche_tarde": "Vitamina de banana com 250ml de leite ou água, 3 colheres de aveia, canela e 1 colher de mel",
      "jantar": "Peito de frango desfiado ensopado com molho de tomate fresco + 2 escumadeiras de arroz + 1 concha de feijão carioca + purê de batata inglesa",
      "ceia_opcional": "Chá de hortelã ou erva-doce morno"
    },
    {
      "week_number": 3,
      "theme": "Alta Gastronomia Rápida & Variedade",
      "cafe_da_manha": "3 ovos mexidos com toque de azeite extravirgem + 1 banana da terra assada na frigideira com chia e canela + café preto + 5g de creatina",
      "almoco": "Iscas de carne bovina acebolada na frigideira quente + 2 escumadeiras de arroz branco com toque de cúrcuma + 1 concha de feijão fradinho ou manteiga temperado com alho e louro + vinagrete fresco",
      "lanche_tarde": "Mingau de aveia morno (3 colheres de aveia cozida com banana amassada, canela e mel)",
      "jantar": "Sobrecoxa desossada grelhada com alecrim e alho + 2 escumadeiras de arroz + 1 concha de feijão + batatas rústicas douradas na frigideira",
      "ceia_opcional": "Chá de melissa com 2 quadradinhos de chocolate amargo 70%"
    },
    {
      "week_number": 4,
      "theme": "Performance & Densidade Máxima (Consolidação 74kg)",
      "cafe_da_manha": "3 ovos pochê ou mexidos cremosos + 1 banana da terra fatiada e grelhada com canela e mel + café preto + 5g de creatina",
      "almoco": "Filé de peixe grelhado (tilápia ou salmão) ou bife de alcatra magro + purê de batatas inglesas com azeite e noz-moscada + 1 concha de feijão de sua escolha + salada de folhas crocantes",
      "lanche_tarde": "Iogurte natural com aveia, banana em rodelas, morangos ou uvas e castanhas",
      "jantar": "Carne de panela macia desmanchando com cenoura, cebola e batata + 2 escumadeiras de arroz branco regado com o molho da carne + 1 concha de feijão",
      "ceia_opcional": "Chá de camomila morno com sementes de abóbora"
    }
  ]
}
;
const FALLBACK_HEALTH_SUMMARY = {
  "updated_at": "2026-10-27T10:00:00.000000",
  "source_archive": "template_sample.zip",
  "athlete": {
    "name": "Atleta",
    "age": 32,
    "current_weight_kg": 72.5,
    "target_weight_kg": 74.0
  },
  "metrics": {
    "resting_heart_rate_bpm": {
      "recent_average": 65,
      "interpretation": "Excelente saúde cardiovascular e tonus parassimpático"
    },
    "vo2_max_ml_kg_min": {
      "recent_average": 41.9,
      "interpretation": "Aptidão cardiorrespiratória classificada como Boa a Excelente"
    },
    "hrv_sdnn_ms": {
      "recent_average": 42.5,
      "readiness_score": 68,
      "interpretation": "Prontidão física e recuperação muscular em níveis saudáveis"
    },
    "daily_steps": {
      "average_active_days": 21907,
      "goal": 8000,
      "status": "Meta superada consistentemente (estilo de vida altamente ativo)"
    },
    "active_energy_kcal": {
      "average_daily": 337,
      "goal": 300,
      "status": "Gasto calórico ativo elevado decorrente de alta movimentação"
    },
    "basal_energy_kcal": {
      "measured_average": 1422,
      "calculated_bmr": 1715
    },
    "total_tdee_kcal": {
      "recent_average": 1759,
      "target_intake": 2680
    },
    "sleep_hours": {
      "measured_average": 8.4,
      "target": 8.0
    }
  },
  "workouts_recorded_count": 109,
  "recent_workouts": [
    {
      "type": "HKWorkoutActivityTypeRunning",
      "startDate": "2026-05-30 14:13:52 +0100",
      "duration_min": 119.0,
      "calories": 0
    },
    {
      "type": "HKWorkoutActivityTypeWalking",
      "startDate": "2026-06-27 16:28:47 +0100",
      "duration_min": 305.6,
      "calories": 0
    },
    {
      "type": "HKWorkoutActivityTypeRunning",
      "startDate": "2026-08-01 11:59:32 +0100",
      "duration_min": 113.6,
      "calories": 0
    },
    {
      "type": "HKWorkoutActivityTypeRunning",
      "startDate": "2026-08-08 12:23:00 +0100",
      "duration_min": 78.8,
      "calories": 0
    },
    {
      "type": "HKWorkoutActivityTypeRunning",
      "startDate": "2026-08-15 15:29:22 +0100",
      "duration_min": 100.3,
      "calories": 0
    }
  ]
};

let workoutsData = null;
let profileData = null;
let mealPlanData = null;
let healthSummaryData = null;
let physioData = null;

let currentTab = 'workouts';
let currentWorkoutId = 'treino_a';
let currentWeek = 1;
let currentPhysioCat = 'all';

// Rest Timer State
let timerInterval = null;
let timerSeconds = 60;
let timerRemaining = 60;
let isTimerRunning = false;
const CIRCUMFERENCE = 2 * Math.PI * 26; // r=26 in svg

// Multi-Phase Stretch Timer State
let stretchInterval = null;
let stretchRemaining = 30;
let isStretchRunning = false;
let isStretchPaused = false;
let stretchCurrentProtocol = null;
let stretchCurrentPhase = 1; // 1 = Side 1, 2 = Switch sides (5s), 3 = Side 2

// Audio Context
let audioCtx = null;

function playChime(freq = 587.33, endFreq = 880) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch (e) {
    console.log("Audio feedback fallback");
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  renderAthleteHeader();
  initTabs();
  initTimer();
  initHydration();
  initGroceryChecklist();
  initMiniTimerScroll();
  initPhysioModule();
  renderCurrentWorkout();
  renderAppleMetrics();
  renderMealPlan();
});

const FALLBACK_PHYSIO = {"system": {"title": "Physio & Sports Medicine Protocol", "athlete": "Atleta", "focus": "Blindagem Articular, Ergonomia de Programação no Mac & Hipertrofia sem Lesões", "daily_mobility_target_min": 15}, "categories": [{"id": "all", "name": "Todos os Protocolos", "icon": "⚡"}, {"id": "pre_workout", "name": "Pré-Treino & Ativação", "icon": "🔥", "tagline": "Aquecimento neural e lubrificação articular antes das cargas pesadas"}, {"id": "post_workout", "name": "Pós-Treino & Descompressão", "icon": "❄️", "tagline": "Alívio miofascial, tração espinhal e retorno parassimpático à calma"}, {"id": "desk_ergonomics", "name": "Rotina Anti-Desk Mac", "icon": "💻", "tagline": "Micro-pausas ativas contra cifose de tela, pescoço projetado e LER/DORT"}, {"id": "joint_shielding", "name": "Blindagem Articular & Força", "icon": "🛡️", "tagline": "Estabilidade escapular, manguito rotador e tendões à prova de bala"}], "protocols": [{"id": "manguito_rotador_externo", "title": "Ativação do Manguito Rotador Externo", "category": "pre_workout", "joint": "Ombros & Escápulas", "joint_key": "shoulder", "duration_sec": 30, "is_bilateral": true, "reps_or_hold": "3 séries × 15 reps suaves", "target_muscles": "Supraespinhal, Infraespinhal e Redondo Menor", "why": "O supino reto e o desenvolvimento empurram a cabeça do úmero contra o acrômio. A rotação externa estabiliza a articulação glenoumeral no centro da cavidade, impedindo tendinites e pinçamento.", "how": "Cotovelo colado a 90° na costela. Gire o antebraço para fora com elástico leve ou polia baixa. Mantenha o movimento limpo sem girar o tronco.", "common_mistake": "Usar carga alta e afastar o cotovelo da cintura, transferindo a força para o deltoide.", "badge": "Essencial Pré-Supino"}, {"id": "dorsiflexao_tornozelo", "title": "Mobilidade de Tornozelo na Parede (Knee-to-Wall)", "category": "pre_workout", "joint": "Tornozelos & Joelhos", "joint_key": "ankle", "duration_sec": 30, "is_bilateral": true, "reps_or_hold": "15 repetições dinâmicas por pé", "target_muscles": "Complexo Gastrocnêmio-Sóleo e Tendão de Aquiles", "why": "Se o tornozelo não dobra para a frente, o corpo compensa inclinando o tronco e arredondando a lombar (butt wink) no agachamento profundo e leg press.", "how": "Pé a 10cm da parede com o calcanhar travado no chão. Projete o joelho para a frente tocando a parede suavemente. Volte e repita.", "common_mistake": "Deixar o calcanhar sair do chão durante a descida ou jogar o joelho para dentro (valgo).", "badge": "Base do Agachamento"}, {"id": "mobilidade_toracica_catcow", "title": "Mobilidade Torácica & Extensão Espinhal", "category": "pre_workout", "joint": "Coluna & Tórax", "joint_key": "spine", "duration_sec": 45, "is_bilateral": false, "reps_or_hold": "10 a 12 ciclos de respiração", "target_muscles": "Paravertebrais Torácicos, Serrátil e Romboides", "why": "Horas em frente ao monitor colapsam a coluna em curvatura cifótica. Destravar a torácica permite encaixar as escápulas e empurrar cargas pesadas com segurança.", "how": "Em 4 apoios: puxe o ar arqueando a coluna suavemente olhando para cima; solte todo o ar arredondando as costas como um gato e olhando para o umbigo.", "common_mistake": "Arredondar apenas a lombar em vez de sentir o movimento nas vértebras médias e superiores.", "badge": "Anti-Cifose"}, {"id": "ativacao_gluteo_medio", "title": "Ativação de Glúteo Médio (Clamshell / Ponte)", "category": "joint_shielding", "joint": "Quadril & Pelve", "joint_key": "hip", "duration_sec": 30, "is_bilateral": true, "reps_or_hold": "12 a 15 reps lentas por perna", "target_muscles": "Glúteo Médio e Mínimo", "why": "O glúteo médio fraco ou 'dorminhoco' faz o joelho colapsar para dentro no Leg Press 45º e agachamento, gerando dor patelar e tensão no menisco.", "how": "Deitado de lado com joelhos a 90° e pés unidos. Abra o joelho superior como uma concha mantendo os pés juntos e a pelve imóvel. Pause 1s no topo.", "common_mistake": "Girar o quadril para trás para roubar o movimento.", "badge": "Proteção de Joelho"}, {"id": "ytwl_escapular", "title": "Protocolo Y-T-W-L de Blindagem Escapular", "category": "joint_shielding", "joint": "Ombros & Escápulas", "joint_key": "shoulder", "duration_sec": 60, "is_bilateral": false, "reps_or_hold": "6 a 8 reps de cada letra (Y, T, W, L)", "target_muscles": "Trapézio Médio/Inferior e Romboides", "why": "O protocolo padrão-ouro da fisioterapia olímpica para construir estabilidade de escápula. Transforma os ombros numa plataforma rígida para supinos e desenvolvimentos pesados.", "how": "De bruços no chão ou inclinado 30° no banco. Forme as letras Y, T, W e L com os braços, apertando as escápulas uma contra a outra a cada repetição.", "common_mistake": "Subir os ombros em direção às orelhas (usar o trapézio superior em excesso).", "badge": "Padrão Ouro Olímpico"}, {"id": "childs_pose_lombar", "title": "Descompressão Lombar em Postura da Criança (Child's Pose)", "category": "post_workout", "joint": "Coluna & Lombar", "joint_key": "spine", "duration_sec": 45, "is_bilateral": false, "reps_or_hold": "Manter sustentação por 45 a 60 segundos", "target_muscles": "Quadrado Lombar, Eretor da Espinha e Fáscia Toracolombar", "why": "Após treinos de costas, agachamento e leg press, a pressão intra-discal em L4-S1 aumenta. Essa postura traciona suavemente o sacro e abre os espaços intervertebrais.", "how": "De joelhos no solo, afaste-os um pouco, sente sobre os calcanhares e deslize as mãos à frente no chão o mais longe possível. Respire fundo pela barriga.", "common_mistake": "Levantar o quadril dos calcanhares ou prender a respiração.", "badge": "Alívio Imediato L4-L5"}, {"id": "alongamento_peitoral_porta", "title": "Alongamento de Peitoral no Batente / Parede 90°", "category": "post_workout", "joint": "Ombros & Tórax", "joint_key": "shoulder", "duration_sec": 30, "is_bilateral": true, "reps_or_hold": "30 segundos por lado", "target_muscles": "Peitoral Maior, Peitoral Menor e Fibras Claviculares", "why": "O encurtamento do peitoral menor puxa a escápula para frente e para baixo, criando ombros caídos e pinçamento no supino.", "how": "Apoie o antebraço a 90° no batente da porta ou pilar. Dê um passo à frente com a mesma perna e gire suavemente o tronco para o lado oposto.", "common_mistake": "Arredondar o ombro para a frente enquanto alonga em vez de manter a escápula encaixada atrás.", "badge": "Pós-Peito Obrigatório"}, {"id": "alongamento_psoas_ajoelhado", "title": "Alongamento dos Flexores de Quadril & Psoas", "category": "post_workout", "joint": "Quadril & Lombar", "joint_key": "hip", "duration_sec": 45, "is_bilateral": true, "reps_or_hold": "45 segundos por lado com respiração profunda", "target_muscles": "Músculo Psoas-Ilíaco e Reto Femoral", "why": "Ficar sentado por horas mantém o psoas encurtado. Ao levantar, o psoas tensionado puxa a coluna lombar para frente causando hiperlordose e dor constante.", "how": "Posição de cavaleiro (um joelho no chão, outro à frente a 90°). Contraia o glúteo da perna de trás e avance o quadril 5cm sem arquear a coluna.", "common_mistake": "Hiperestender a coluna lombar para fingir mais amplitude em vez de mover apenas a bacia.", "badge": "Cura da Lombar Sentada"}, {"id": "alongamento_piriforme_gluteo", "title": "Liberação do Piriforme & Glúteo em '4' no Chão", "category": "post_workout", "joint": "Quadril & Pelve", "joint_key": "hip", "duration_sec": 45, "is_bilateral": true, "reps_or_hold": "45 segundos por lado", "target_muscles": "Músculo Piriforme, Obturador Interno e Fáscia Glútea", "why": "O músculo piriforme rígido pode comprimir o nervo ciático, irradiando dor pela perna e travando a pelve no agachamento profundo.", "how": "Deitado de costas, cruze o tornozelo direito sobre o joelho esquerdo formando o número 4. Abrace a coxa esquerda por trás e puxe em direção ao peito.", "common_mistake": "Tencionar os ombros e o pescoço ao puxar a perna.", "badge": "Prevenção Ciática"}, {"id": "retraçao_cervical_chin_tuck", "title": "Retração Cervical (Chin Tuck) contra Cifose de Tela", "category": "desk_ergonomics", "joint": "Cervical & Postura", "joint_key": "spine", "duration_sec": 30, "is_bilateral": false, "reps_or_hold": "10 reps de 4 segundos de isometria", "target_muscles": "Longo do Pescoço, Longo da Cabeça e Reto Anterior", "why": "A cada centímetro que a cabeça vai à frente olhando para o monitor, o peso aparente suportado pelas vértebras C5-C7 sobe de 5kg para até 27kg, causando dor de cabeça tensional.", "how": "Sentado ereto, puxe o queixo horizontalmente para trás (como se estivesse criando uma papada dupla), crescendo o topo da cabeça em direção ao teto. Segure 4s e relaxe.", "common_mistake": "Olhar para baixo flexionando o pescoço em vez de deslizar a cabeça para trás no plano horizontal.", "badge": "Anti-Pescoço de Tartaruga"}, {"id": "alongamento_trapezio_elevador", "title": "Alongamento de Trapézio Superior & Elevador da Escápula", "category": "desk_ergonomics", "joint": "Cervical & Postura", "joint_key": "spine", "duration_sec": 30, "is_bilateral": true, "reps_or_hold": "30 segundos por lado", "target_muscles": "Trapézio Superior e Músculo Elevador da Escápula", "why": "A digitação rápida e o estresse elevam os ombros involuntariamente, acumulando pontos de gatilho miofasciais dolorosos.", "how": "Sente-se sobre uma mão para ancorar o ombro. Incline a cabeça para o lado oposto em direção à axila. Use a outra mão para aplicar uma pressão suave.", "common_mistake": "Puxar a cabeça com força excessiva ou deixar o ombro do lado alongado subir.", "badge": "Alívio de Tensão no Mac"}, {"id": "descompressao_punhos_teclado", "title": "Mobilidade & Descompressão dos Punhos (Prevenção LER/DORT)", "category": "desk_ergonomics", "joint": "Punhos & Antebraço", "joint_key": "wrist", "duration_sec": 30, "is_bilateral": true, "reps_or_hold": "30 segundos de flexão + 30s de extensão", "target_muscles": "Flexores e Extensores Radiais/Ulnares do Carpo", "why": "Milhares de toques no teclado e mouse geram atrito no túnel do carpo e fadiga dos tendões do antebraço, que também são exigidos nas roscas e puxadas da academia.", "how": "Estenda o braço com cotovelo reto. Com a outra mão, puxe suavemente os dedos para trás (extensão) e depois para baixo (flexão). Sinta o alívio imediato no antebraço.", "common_mistake": "Dobrar o cotovelo ou esquecer de alongar o polegar.", "badge": "Escudo de Programador"}, {"id": "respiracao_diafragmatica_vago", "title": "Pausa Parassimpática & Respiração Diafragmática (4-4-8)", "category": "desk_ergonomics", "joint": "Sistema Nervoso & Tórax", "joint_key": "spine", "duration_sec": 60, "is_bilateral": false, "reps_or_hold": "6 ciclos completos de respiração 4-4-8", "target_muscles": "Diafragma Torácico e Nervo Vago", "why": "O trabalho intelectual contínuo ativa o sistema simpático (luta ou fuga), encurtando a respiração e enrijecendo os músculos acessórios do pescoço. Esse padrão rebaixa o cortisol e restaura a VFC (HRV).", "how": "Uma mão no peito, outra no abdômen. Puxe o ar pelo nariz em 4 segundos estufando a barriga; segure 4 segundos; solte suavemente pela boca em 8 segundos.", "common_mistake": "Movimentar apenas o peito e subir os ombros ao inspirar.", "badge": "Restauração de VFC / HRV"}, {"id": "wall_sit_isometria_patelar", "title": "Agachamento Isométrico na Parede (Wall Sit 60°)", "category": "joint_shielding", "joint": "Tornozelos & Joelhos", "joint_key": "knee", "duration_sec": 45, "is_bilateral": false, "reps_or_hold": "3 a 4 séries de 45 segundos de isometria", "target_muscles": "Tendão Patelar, Vasto Medial Oblíquo e Quadríceps", "why": "Estudos clínicos de medicina esportiva comprovam que contrações isométricas em cadeia fechada geram efeito analgésico imediato no tendão patelar, permitindo treinar pernas sem dor.", "how": "Costas apoiadas na parede, pés afastados na largura dos ombros, desça até os joelhos ficarem a 60°-70° de flexão. Mantenha os joelhos alinhados com o segundo dedo do pé.", "common_mistake": "Descer a 90° se houver dor aguda ou deixar os calcanhares saírem do solo.", "badge": "Analgesia de Tendão"}, {"id": "alongamento_isquiotibiais_toalha", "title": "Alongamento Ativo de Isquiotibiais em Decúbito", "category": "post_workout", "joint": "Quadril & Pelve", "joint_key": "hip", "duration_sec": 30, "is_bilateral": true, "reps_or_hold": "30 segundos cada perna", "target_muscles": "Bíceps Femoral, Semitendinoso e Semimembranoso", "why": "Isquiotibiais encurtados puxam os ísquios para baixo, retificando a lordose lombar natural e tornando a coluna vulnerável a hérnias de disco.", "how": "Deitado de costas, use uma toalha ou fita elástica na sola do pé. Eleve a perna estendida até sentir o alongamento atrás da coxa, mantendo a outra perna relaxada no solo.", "common_mistake": "Dobrar excessivamente o joelho ou tirar a bacia do chão.", "badge": "Proteção Discal Lombar"}, {"id": "alongamento_triceps_dorsal", "title": "Alongamento de Tríceps & Grande Dorsal Alto", "category": "post_workout", "joint": "Ombros & Braços", "joint_key": "shoulder", "duration_sec": 30, "is_bilateral": true, "reps_or_hold": "30 segundos por braço", "target_muscles": "Cabeça Longa do Tríceps e Músculo Grande Dorsal", "why": "A cabeça longa do tríceps se insere no tubérculo infraglenoidal da escápula. Quando tensa, limita a elevação do braço e sobrecarrega a cápsula articular.", "how": "Dobre o braço atrás da cabeça com a mão tocando a escápula. Com a outra mão, puxe suavemente o cotovelo para trás e para o meio, inclinando o tronco levemente.", "common_mistake": "Projetar a cabeça para a frente ou arquear excessivamente a lombar.", "badge": "Pós-Tríceps & Dorsal"}], "pain_evaluator_database": [{"id": "shoulder_anterior", "joint": "Ombro Anterior (Supino / Desenvolvimento)", "trigger": "Pinçamento agudo na frente do ombro ao descer a barra no supino ou empurrar halteres.", "diagnosis": "Impacto Subacromial ou Sobrecarga no Tendão da Cabeça Longa do Bíceps decorrente de anteriorização escapular e falta de retração do manguito.", "immediate_relief_steps": ["1. Interrompa supino reto com barra; substitua temporariamente por halteres com pegada neutra (palmas voltadas uma para a outra).", "2. Execute 3 séries de 15 reps de rotação externa com elástico antes de qualquer esforço.", "3. Faça liberação miofascial na fáscia do peitoral menor contra a parede com uma bolinha de tênis por 60 segundos."], "recommended_protocol_id": "manguito_rotador_externo", "form_cue": "Adicione 'escápulas no bolso de trás da calça' em toda repetição de supino."}, {"id": "lumbar_tightness", "joint": "Coluna Lombar (L4-L5 / Pós-Agachamento ou Cadeira)", "trigger": "Sensação de aperto, queimação ou travamento lombar após agachamento, leg press ou 3h sentado no Mac.", "diagnosis": "Espasmo protetor dos eretores da espinha agravado por encurtamento do iliopsoas e amnésia glútea temporária.", "immediate_relief_steps": ["1. Faça imediatamente 60 segundos na Postura da Criança (Child's Pose) com tração e respiração diafragmática.", "2. Execute 2 séries de 45 segundos de alongamento do psoas meio-ajoelhado contraindo o glúteo.", "3. Evite flexões de tronco com carga até o espasmo regredir totalmente."], "recommended_protocol_id": "childs_pose_lombar", "form_cue": "No Leg Press, nunca tire o cóccix do encosto do banco ao atingir a profundidade máxima."}, {"id": "cervical_trapezius", "joint": "Cervical & Trapézio Superior (Horas de Programação)", "trigger": "Dor em queimação no pescoço, sensação de cabeça pesada e pontadas entre o ombro e a nuca.", "diagnosis": "Síndrome do Pescoço de Texto / Cifose de Tela (Forward Head Posture) com sobrecarga do trapézio descendente e elevador da escápula.", "immediate_relief_steps": ["1. Realize 10 repetições de Retração Cervical (Chin Tucks) empurrando o queixo para trás por 4 segundos cada.", "2. Alongue o trapézio superior suavemente inclinando a cabeça para o lado por 30 segundos cada ombro.", "3. Suba a altura do monitor no suporte para que o topo fique exatamente no nível dos olhos."], "recommended_protocol_id": "retraçao_cervical_chin_tuck", "form_cue": "A cada 90 minutos de código, faça 2 minutos de micro-pausa ergonômica com hidratação."}, {"id": "wrist_forearm", "joint": "Punhos & Antebraço (Digitação & Rosca Bíceps)", "trigger": "Formigamento nos dedos ou fisgada na face interna do punho ao digitar ou segurar a barra reta.", "diagnosis": "Microtrauma cumulativo nos tendões flexores/extensores do carpo ou princípio de compressão no túnel do carpo.", "immediate_relief_steps": ["1. Execute o alongamento ativo de flexores e extensores do punho por 30 segundos cada mão.", "2. No treino de bíceps, prefira a Barra W ou halteres com pegada neutra/martelo em vez da barra reta fixa.", "3. Ajuste a altura do apoio de braço da cadeira para que os punhos fiquem em posição neutra ao digitar."], "recommended_protocol_id": "descompressao_punhos_teclado", "form_cue": "Nunca trabalhe com o punho dobrado para cima contra a quina da mesa."}, {"id": "knee_patellar", "joint": "Joelho Anterior / Tendão Patelar (Agachamento & Escadas)", "trigger": "Fisgada na ponta de baixo da patela ao iniciar o agachamento ou descer escadas rapidamente.", "diagnosis": "Tendinopatia Patelar por sobrecarga excêntrica e dominância de quadríceps com pouca ativação de cadeia posterior.", "immediate_relief_steps": ["1. Realize 3 séries de 45 segundos de Wall Sit (agachamento isométrico na parede a 60°) para anestesiar o tendão.", "2. Mobilize o tornozelo na parede (Knee-to-wall) por 15 repetições para diminuir a pressão na patela.", "3. Aplique gelo local por 12 a 15 minutos se houver calor ou inchaço pós-treino."], "recommended_protocol_id": "wall_sit_isometria_patelar", "form_cue": "Concentre o empurrão no centro e calcanhar dos pés, nunca na ponta dos dedos."}], "ergonomics_checklist": [{"id": "ergo_monitor", "title": "Linha de Visão do Monitor", "desc": "O topo da tela está exatamente na altura dos olhos? Você não deve inclinar o pescoço para baixo.", "weight": 20}, {"id": "ergo_elbows", "title": "Cotovelos & Teclado a 90°", "desc": "Seus cotovelos descansam relaxados junto ao tronco em ângulo de 90° a 100° sem suspender os ombros?", "weight": 20}, {"id": "ergo_lumbar", "title": "Apoio Lombar Ativo", "desc": "A cadeira preenche a curvatura natural da lombar ou você usa uma almofada ergonômica?", "weight": 20}, {"id": "ergo_feet", "title": "Pés 100% Planos no Chão", "desc": "As solas dos pés repousam firmes no chão (ou apoio para pés) com os joelhos a 90° sem garrotear a coxa?", "weight": 20}, {"id": "ergo_pauses", "title": "Regra 90 Min & Alertas Athlete OS", "desc": "O daemon stretch_reminder.sh está ativo para forçar 2 minutos de descompressão a cada hora e meia?", "weight": 20}]};

async function loadData() {
  try {
    const [wRes, pRes, mRes, hRes, phRes] = await Promise.all([
      fetch('../data/workouts.json'),
      fetch('../data/athlete_profile.json'),
      fetch('../data/meal_plan.json'),
      fetch('../data/health_summary.json'),
      fetch('../data/physio_protocols.json')
    ]);
    workoutsData = await wRes.json();
    profileData = await pRes.json();
    mealPlanData = await mRes.json();
    healthSummaryData = await hRes.json();
    physioData = await phRes.json();
  } catch (err) {
    workoutsData = FALLBACK_WORKOUTS;
    profileData = FALLBACK_PROFILE;
    mealPlanData = FALLBACK_MEAL_PLAN;
    healthSummaryData = FALLBACK_HEALTH_SUMMARY;
    physioData = FALLBACK_PHYSIO;
  }
}

// Render dynamic athlete profile in top header bar
function renderAthleteHeader() {
  if (!profileData || !profileData.athlete) return;
  const a = profileData.athlete;
  const nameEl = document.getElementById("header-athlete-name");
  const metaEl = document.getElementById("header-athlete-meta");
  const badgeEl = document.getElementById("header-avatar-badge");

  if (nameEl && a.name) nameEl.textContent = a.name;
  if (metaEl) {
    const ageStr = a.age ? `${a.age} Anos` : '';
    const heightStr = a.height_cm ? `${(a.height_cm / 100).toFixed(2).replace('.', ',')} m` : '';
    const weightGoal = a.target_weight_kg ? `Meta: ${a.target_weight_kg} kg` : '';
    const parts = [ageStr, heightStr, weightGoal].filter(Boolean);
    metaEl.textContent = `Athlete OS • ${parts.length ? parts.join(' • ') : 'Performance & Saúde Integrada'}`;
  }
  if (badgeEl && a.name) {
    const initials = a.name.split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 3).toUpperCase();
    badgeEl.textContent = initials || "ATL";
  }
}

// Tab Management
function initTabs() {
  document.querySelectorAll(".dock-tab, .dock-item").forEach(btn => {
    if (!btn.dataset.tab) return;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".dock-tab, .dock-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.dataset.tab;
      
      document.querySelectorAll(".tab-pane").forEach(pane => pane.style.display = 'none');
      const activePane = document.getElementById(`pane-${currentTab}`);
      if (activePane) activePane.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Workout Subtabs (A, B, C)
  document.querySelectorAll(".subtab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".subtab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentWorkoutId = btn.dataset.workout;
      renderCurrentWorkout();
    });
  });

  // Nutrition Week Switcher
  document.querySelectorAll(".week-select-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".week-select-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentWeek = parseInt(btn.dataset.week);
      renderMealPlan();
    });
  });
}

// Helper to resolve exercise media asset
function getExerciseMedia(exId) {
  let baseKey = exId;
  if (exId === 'voador_peck_deck') baseKey = 'voador';
  if (exId === 'rosca_alternada') baseKey = 'rosca_direta_barra';
  
  const webpPath = `assets/exercises/${baseKey}.webp`;
  const mp4Path = `assets/exercises/${baseKey}.mp4`;
  return { webp: webpPath, mp4: mp4Path };
}

// Render Current Workout (Olympus Academia)
function renderCurrentWorkout() {
  if (!workoutsData) return;
  const split = workoutsData.weekly_splits.find(s => s.id === currentWorkoutId);
  if (!split) return;

  // Header Elements
  document.getElementById("split-title").innerText = `${split.name} — ${split.subtitle}`;
  document.getElementById("split-focus").innerText = `Foco: ${split.focus}`;
  document.getElementById("split-warmup").innerText = `Aquecimento: ${split.warmup.duration_min} min (${split.warmup.modalities.join(" ou ")})`;

  // Heatmap
  let heatmapSvg = "assets/muscle_chest.svg";
  if (split.id === 'treino_b') heatmapSvg = "assets/muscle_shoulders.svg";
  if (split.id === 'treino_c') heatmapSvg = "assets/muscle_legs.svg";
  document.getElementById("split-heatmap-img").src = heatmapSvg;

  // Render Exercises
  const container = document.getElementById("exercises-container");
  if (!container) return;
  container.innerHTML = "";

  split.exercises.forEach((ex, idx) => {
    const card = document.createElement("div");
    card.className = "exercise-row";

    const media = getExerciseMedia(ex.id);
    const savedLoad = localStorage.getItem(`load_${ex.id}`) || "";

    card.innerHTML = `
      <div class="exercise-media-frame" onclick="openExerciseModal('${ex.id}')">
        <img src="${media.webp}" alt="${ex.name}" loading="lazy" onerror="this.src='assets/exercise_bench_press.svg'">
        <div class="exercise-play-badge">VÍDEO ▶</div>
      </div>
      <div class="exercise-details" onclick="openExerciseModal('${ex.id}')">
        <div class="exercise-header-line">
          <span class="exercise-index mono">${String(idx + 1).padStart(2, '0')}.</span>
          <h3 class="exercise-title">${ex.name}</h3>
        </div>
        <div class="exercise-tags-row">
          <span class="tag-badge target">${ex.target_muscle}</span>
          <span class="tag-badge scheme mono">${ex.sets} Séries × ${ex.reps}</span>
          <span class="tag-badge mono">${ex.rest_sec}s Descanso</span>
        </div>
        <p class="exercise-coach-note">${ex.notes}</p>
      </div>
      <div class="exercise-tracking" onclick="event.stopPropagation();">
        <div class="load-pill">
          <label>KG</label>
          <input type="number" class="mono" placeholder="0" value="${savedLoad}" 
                 onchange="saveLoad('${ex.id}', this.value)">
        </div>
        <div class="sets-row">
          ${Array.from({ length: ex.sets }).map((_, sIdx) => `
            <div class="set-bubble mono ${isSetCompleted(ex.id, sIdx) ? 'done' : ''}" 
                 onclick="toggleSet('${ex.id}', ${sIdx}, ${ex.rest_sec})">
              ${sIdx + 1}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Cooldown
  const cooldownEl = document.getElementById("split-cooldown-list");
  if (cooldownEl && split.post_workout_cooldown) {
    cooldownEl.innerHTML = split.post_workout_cooldown.physio_stretches
      .map(s => `
        <li style="display:flex; justify-content:space-between; align-items:center; background: var(--bg-inner); padding: 10px 14px; border-radius: var(--r-inner);">
          <span style="font-size: 13px; font-weight: 600; color: var(--text-head);">${s}</span>
          <button class="chip-btn" onclick="startStretchTimer('${s.replace(/'/g, "\\'")}')">⏱️ 30s Timer</button>
        </li>
      `).join('');
  }
}

// Open Slide-over Biomechanical Modal
window.openExerciseModal = function(exId) {
  if (!workoutsData) return;
  let exFound = null;
  for (const s of workoutsData.weekly_splits) {
    const f = s.exercises.find(e => e.id === exId);
    if (f) { exFound = f; break; }
  }
  if (!exFound) return;

  const media = getExerciseMedia(exFound.id);
  document.getElementById("modal-title").innerText = exFound.name;
  document.getElementById("modal-muscle").innerText = exFound.target_muscle;
  document.getElementById("modal-reps").innerText = `${exFound.sets} Séries × ${exFound.reps} (Descanso: ${exFound.rest_sec}s)`;
  document.getElementById("modal-notes").innerText = exFound.notes;

  const videoBox = document.getElementById("modal-video-box");
  videoBox.innerHTML = `
    <video autoplay loop muted playsinline poster="${media.webp}">
      <source src="${media.mp4}" type="video/mp4">
      Seu navegador não suporta vídeos MP4.
    </video>
  `;

  document.getElementById("exercise-slideover").classList.add("active");
};

window.closeExerciseModal = function() {
  document.getElementById("exercise-slideover").classList.remove("active");
  const videoBox = document.getElementById("modal-video-box");
  if (videoBox) videoBox.innerHTML = "";
};

// LocalStorage helpers
window.saveLoad = function(exId, val) {
  localStorage.setItem(`load_${exId}`, val);
};

window.isSetCompleted = function(exId, setIndex) {
  return localStorage.getItem(`set_${exId}_${setIndex}`) === 'true';
};

window.toggleSet = function(exId, setIndex, restSec) {
  const current = isSetCompleted(exId, setIndex);
  localStorage.setItem(`set_${exId}_${setIndex}`, !current);
  renderCurrentWorkout();

  if (!current) {
    setTimerPreset(restSec || 60);
    playChime();
  }
};

// Rest Timer Engine
function initTimer() {
  document.getElementById("btn-timer-toggle")?.addEventListener("click", () => {
    if (isTimerRunning) pauseRestTimer();
    else startRestTimer();
  });
  document.getElementById("btn-timer-reset")?.addEventListener("click", () => {
    resetRestTimer();
  });
  updateTimerDisplay();
}

window.setTimerPreset = function(sec) {
  timerSeconds = sec;
  timerRemaining = sec;
  startRestTimer();
};

function startRestTimer() {
  clearInterval(timerInterval);
  isTimerRunning = true;
  updateTimerDisplay();
  
  const toggleBtn = document.getElementById("btn-timer-toggle");
  if (toggleBtn) toggleBtn.innerText = "Pausar";

  timerInterval = setInterval(() => {
    timerRemaining--;
    updateTimerDisplay();
    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      playChime(659.25, 880);
      if (toggleBtn) toggleBtn.innerText = "Iniciar";
      alert("⏱️ Descanso concluído! Hora da próxima série na Olympus.");
    }
  }, 1000);
}

function pauseRestTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  const toggleBtn = document.getElementById("btn-timer-toggle");
  if (toggleBtn) toggleBtn.innerText = "Continuar";
}

function resetRestTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerRemaining = timerSeconds;
  updateTimerDisplay();
  const toggleBtn = document.getElementById("btn-timer-toggle");
  if (toggleBtn) toggleBtn.innerText = "Iniciar";
}

function updateTimerDisplay() {
  const mins = Math.floor(timerRemaining / 60);
  const secs = timerRemaining % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const clockEl = document.getElementById("timer-ring-num");
  if (clockEl) clockEl.innerText = timeStr;

  const miniClockEl = document.getElementById("mini-timer-clock");
  if (miniClockEl) miniClockEl.innerText = timeStr;

  // Progress SVG Ring
  const ringProgress = document.getElementById("timer-ring-path");
  if (ringProgress) {
    const offset = CIRCUMFERENCE - (timerRemaining / timerSeconds) * CIRCUMFERENCE;
    ringProgress.style.strokeDashoffset = offset;
  }
}

// Mini Timer Scroll Observer
function initMiniTimerScroll() {
  const timerCard = document.querySelector(".timer-container");
  const miniTimer = document.getElementById("mini-timer");
  if (!timerCard || !miniTimer) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting && isTimerRunning) {
      miniTimer.classList.add("visible");
    } else {
      miniTimer.classList.remove("visible");
    }
  }, { threshold: 0.1 });

  observer.observe(timerCard);
}

// ==========================================================================
// PHYSIOTHERAPY & SPORTS MEDICINE CORE MODULE
// ==========================================================================

function initPhysioModule() {
  if (!physioData) return;
  renderPhysioStats();
  initPhysioCategoryFilters();
  renderPhysioProtocols("all");
  initPainEvaluator();
  initErgoStation();
}

function renderPhysioStats() {
  const minEl = document.getElementById("physio-daily-min");
  const countEl = document.getElementById("physio-completed-count");
  const ergoEl = document.getElementById("ergo-score-display");

  const dailyMin = parseInt(localStorage.getItem("athlete_physio_minutes") || "6");
  const completedList = JSON.parse(localStorage.getItem("athlete_physio_completed") || "[]");
  const ergoChecks = JSON.parse(localStorage.getItem("athlete_ergo_checks") || "[0,1,2,3]");

  if (minEl) minEl.innerText = dailyMin;
  if (countEl) countEl.innerText = completedList.length;
  if (ergoEl) ergoEl.innerText = ergoChecks.length * 20;

  // Update filter badge counts
  if (physioData && physioData.protocols) {
    const counts = {
      all: physioData.protocols.length,
      pre_workout: physioData.protocols.filter(p => p.category === 'pre_workout').length,
      post_workout: physioData.protocols.filter(p => p.category === 'post_workout').length,
      desk_ergonomics: physioData.protocols.filter(p => p.category === 'desk_ergonomics').length,
      joint_shielding: physioData.protocols.filter(p => p.category === 'joint_shielding').length
    };
    for (const [k, v] of Object.entries(counts)) {
      const el = document.getElementById(`count-${k}`);
      if (el) el.innerText = v;
    }
  }
}

function initPhysioCategoryFilters() {
  const container = document.getElementById("physio-category-filters");
  if (!container) return;

  container.querySelectorAll(".physio-filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".physio-filter-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentPhysioCat = btn.dataset.cat || "all";
      renderPhysioProtocols(currentPhysioCat);
    });
  });
}

function renderPhysioProtocols(category = "all") {
  const container = document.getElementById("physio-protocols-container");
  if (!container || !physioData || !physioData.protocols) return;

  const completedList = JSON.parse(localStorage.getItem("athlete_physio_completed") || "[]");
  const filtered = category === "all" 
    ? physioData.protocols 
    : physioData.protocols.filter(p => p.category === category);

  container.innerHTML = "";

  filtered.forEach(p => {
    const isDone = completedList.includes(p.id);
    const card = document.createElement("div");
    card.className = `physio-protocol-card ${isDone ? 'completed' : ''}`;
    card.dataset.cat = p.category;
    card.id = `protocol-card-${p.id}`;

    const catBadge = p.category === 'pre_workout' ? '🔥 Pré-Treino'
      : p.category === 'post_workout' ? '❄️ Pós-Treino'
      : p.category === 'desk_ergonomics' ? '💻 Anti-Desk' : '🛡️ Blindagem';

    card.innerHTML = `
      <div>
        <div class="physio-card-header">
          <div class="physio-tags">
            <span class="physio-tag joint">${p.joint}</span>
            <span class="physio-tag badge">${p.badge}</span>
            <span class="physio-tag duration">${p.duration_sec}s</span>
          </div>
          <span style="font-size: 11px; font-weight: 700; color: var(--text-dim);">${catBadge}</span>
        </div>

        <!-- 3D Render & Vector Angle Diagram Frame with Interactive Toggle & Modal Trigger -->
        <div class="physio-card-visual" id="visual-box-${p.id}" onclick="openPhysioModal('${p.id}')" title="Clique para abrir animação 3D ampliada e detalhes">
          <img id="visual-img-${p.id}" src="assets/physio/${p.id}.webp" alt="${p.title}" loading="lazy" onerror="this.src='assets/physio/${p.id}.svg'">
          <div class="physio-play-badge">VÍDEO 3D ▶</div>
          <div class="physio-toggle-switch" onclick="event.stopPropagation();">
            <button class="physio-toggle-btn active" id="btn-3d-${p.id}" onclick="switchPhysioVisual('${p.id}', '3d')">3D Render</button>
            <button class="physio-toggle-btn" id="btn-svg-${p.id}" onclick="switchPhysioVisual('${p.id}', 'svg')">Ângulos</button>
          </div>
        </div>

        <h3 class="physio-card-title" onclick="openPhysioModal('${p.id}')" style="cursor: pointer;" title="Clique para ver animação">${p.title}</h3>
        <div class="physio-target-muscles">🎯 Alvo: ${p.target_muscles}</div>

        <div class="physio-text-block" style="margin-top: 10px;">
          <div class="physio-why-text">
            <strong>Por que fazer:</strong> ${p.why}
          </div>
          <div class="physio-how-text">
            <strong>Como executar:</strong> ${p.how}
          </div>
        </div>

        <div class="physio-mistake-box" style="margin-top: 8px;">
          <span>⚠️</span>
          <div><strong>Evite:</strong> ${p.common_mistake}</div>
        </div>
      </div>

      <div class="physio-card-footer">
        <button class="chip-btn" onclick="startSmartStretchTimer('${p.id}')" style="background: var(--cyan-dim); border-color: var(--cyan); color: var(--text-head); font-weight: 700;">
          ⏱️ Iniciar (${p.duration_sec}s)
        </button>
        <button class="physio-check-btn ${isDone ? 'checked' : ''}" onclick="togglePhysioCompleted('${p.id}')">
          <span>${isDone ? '✓ Concluído Hoje' : '○ Marcar como Feito'}</span>
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Switch between 3D rendered athlete and vector angle diagram
window.switchPhysioVisual = function(id, mode) {
  const img = document.getElementById(`visual-img-${id}`);
  const btn3d = document.getElementById(`btn-3d-${id}`);
  const btnSvg = document.getElementById(`btn-svg-${id}`);
  if (!img) return;

  if (mode === '3d') {
    img.src = `assets/physio/${id}.webp`;
    img.style.objectFit = 'cover';
    if (btn3d) btn3d.classList.add('active');
    if (btnSvg) btnSvg.classList.remove('active');
  } else {
    img.src = `assets/physio/${id}.svg`;
    img.style.objectFit = 'contain';
    if (btn3d) btn3d.classList.remove('active');
    if (btnSvg) btnSvg.classList.add('active');
  }
};

// Open Biomechanical Slide-Over Modal for Physiotherapy
window.openPhysioModal = function(pId) {
  if (!physioData || !physioData.protocols) return;
  const p = physioData.protocols.find(x => x.id === pId);
  if (!p) return;

  document.getElementById("modal-title").innerText = p.title;
  document.getElementById("modal-muscle").innerText = `${p.joint} • 🎯 ${p.target_muscles}`;
  document.getElementById("modal-reps").innerText = `${p.duration_sec}s (${p.reps_or_hold}) • ${p.is_bilateral ? 'Bilateral (Ambos os Lados)' : 'Estático'}`;
  document.getElementById("modal-notes").innerHTML = `
    <strong>Por que fazer (Biomecânica):</strong> ${p.why}<br><br>
    <strong>Como executar com perfeição:</strong> ${p.how}<br><br>
    <div style="background: rgba(255,59,48,0.1); border-left: 3px solid var(--crimson); padding: 8px 12px; border-radius: var(--r-inner); margin-top: 8px; color: #FFA19B;">
      ⚠️ <strong>Evite este erro:</strong> ${p.common_mistake}
    </div>
    <div style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap;">
      <button class="primary-btn" onclick="closeExerciseModal(); startSmartStretchTimer('${p.id}');" style="padding: 10px 18px; font-size: 13px; width: auto;">
        ⏱️ Iniciar Temporizador (${p.duration_sec}s)
      </button>
      <button class="chip-btn" onclick="togglePhysioCompleted('${p.id}'); closeExerciseModal();" style="border-color: var(--mint); color: var(--mint);">
        ✓ Marcar Concluído
      </button>
    </div>
  `;

  const videoBox = document.getElementById("modal-video-box");
  videoBox.innerHTML = `
    <div style="position: relative; width: 100%; border-radius: var(--r-inner); overflow: hidden; background: #000;">
      <video autoplay loop muted playsinline poster="assets/physio/${p.id}.webp" style="width: 100%; display: block; border-radius: var(--r-inner);">
        <source src="assets/physio/${p.id}.mp4" type="video/mp4">
        <img src="assets/physio/${p.id}.webp" alt="${p.title}" style="width: 100%;">
      </video>
      <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); backdrop-filter: blur(6px); color: var(--volt); font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: var(--r-pill);">
        ANIMAÇÃO 3D AO VIVO
      </div>
    </div>
  `;

  const drawer = document.getElementById("exercise-slideover");
  if (drawer) drawer.classList.add("visible");
};

function togglePhysioCompleted(protocolId) {
  let completedList = JSON.parse(localStorage.getItem("athlete_physio_completed") || "[]");
  let minutes = parseInt(localStorage.getItem("athlete_physio_minutes") || "6");

  if (completedList.includes(protocolId)) {
    completedList = completedList.filter(id => id !== protocolId);
    minutes = Math.max(0, minutes - 2);
  } else {
    completedList.push(protocolId);
    minutes += 2;
    playChime(660, 880);
  }

  localStorage.setItem("athlete_physio_completed", JSON.stringify(completedList));
  localStorage.setItem("athlete_physio_minutes", minutes.toString());

  renderPhysioStats();
  renderPhysioProtocols(currentPhysioCat);
}

// Symptom & Pain Evaluator
function initPainEvaluator() {
  const select = document.getElementById("pain-joint-select");
  const container = document.getElementById("pain-diag-container");
  if (!select || !container || !physioData || !physioData.pain_evaluator_database) return;

  select.innerHTML = physioData.pain_evaluator_database.map((item, idx) => `
    <option value="${item.id}" ${idx === 0 ? 'selected' : ''}>${item.joint}</option>
  `).join('');

  function updateDiag(id) {
    const item = physioData.pain_evaluator_database.find(x => x.id === id);
    if (!item) return;

    container.innerHTML = `
      <div style="font-size: 13px; color: var(--text-muted);">
        <strong style="color: var(--text-head);">Gatilho Comum:</strong> ${item.trigger}
      </div>

      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 4px;">
        <div class="pain-diag-visual" style="flex: 1; min-width: 200px; cursor: pointer;" onclick="openPhysioModal('${item.recommended_protocol_id}')" title="Clique para ver animação 3D">
          <img src="assets/physio/${item.recommended_protocol_id}.webp" alt="Postura Corretiva" onerror="this.src='assets/physio/${item.recommended_protocol_id}.svg'">
        </div>
        <div style="flex: 1.5; min-width: 240px; background: rgba(255, 59, 48, 0.08); border-left: 3px solid var(--crimson); padding: 12px 14px; border-radius: var(--r-inner);">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--crimson); letter-spacing: 0.05em;">
            Diagnóstico Biomecânico Provável
          </div>
          <div style="font-size: 13.5px; font-weight: 600; color: var(--text-head); margin-top: 3px; line-height: 1.45;">
            ${item.diagnosis}
          </div>
        </div>
      </div>

      <div>
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--cyan); letter-spacing: 0.05em; margin-bottom: 6px;">
          Plano de Alívio Imediato:
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${item.immediate_relief_steps.map(step => `
            <div class="pain-relief-step">${step}</div>
          `).join('')}
        </div>
      </div>

      <div style="background: var(--bg-canvas); border: var(--hairline); border-left: 3px solid var(--volt); padding: 10px 14px; border-radius: var(--r-inner); font-size: 12.5px; color: var(--text-head);">
        💡 <strong>Dica de Postura:</strong> ${item.form_cue}
      </div>

      <div style="margin-top: 6px;">
        <button class="primary-btn" onclick="startSmartStretchTimer('${item.recommended_protocol_id}')" style="width: auto; padding: 10px 20px; font-size: 13px;">
          ⏱️ Iniciar Protocolo de Alívio (${item.recommended_protocol_id.replace(/_/g, ' ')})
        </button>
      </div>
    `;
  }

  select.addEventListener("change", (e) => updateDiag(e.target.value));
  updateDiag(physioData.pain_evaluator_database[0].id);
}

// Ergonomics Station Checklist
function initErgoStation() {
  const container = document.getElementById("ergo-checklist-container");
  if (!container || !physioData || !physioData.ergonomics_checklist) return;

  const checks = JSON.parse(localStorage.getItem("athlete_ergo_checks") || "[0,1,2,3]");

  container.innerHTML = physioData.ergonomics_checklist.map((item, idx) => {
    const isActive = checks.includes(idx);
    return `
      <div class="ergo-item ${isActive ? 'active' : ''}" onclick="toggleErgoCheck(${idx})">
        <div class="ergo-checkbox"></div>
        <div>
          <div style="font-size: 13.5px; font-weight: 700; color: var(--text-head);">${item.title}</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px; line-height: 1.4;">${item.desc}</div>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleErgoCheck = function(index) {
  let checks = JSON.parse(localStorage.getItem("athlete_ergo_checks") || "[0,1,2,3]");
  if (checks.includes(index)) {
    checks = checks.filter(i => i !== index);
  } else {
    checks.push(index);
    playChime(587.33, 880);
  }
  localStorage.setItem("athlete_ergo_checks", JSON.stringify(checks));
  initErgoStation();
  renderPhysioStats();
};

window.testMacErgoAlert = function() {
  playChime(523.25, 783.99);
  alert("🧘 Pausa Ativa Athlete OS (90 min)\n\nHora de levantar da cadeira por 2 minutos!\n\n1. Retração Cervical (10 chin tucks para trás)\n2. Abertura torácica com mãos atrás da nuca\n3. Beba 250ml de água da sua meta de hidratação.");
};

// Multi-Phase Smart Stretch Timer
window.startSmartStretchTimer = function(protocolIdOrName) {
  clearInterval(stretchInterval);
  isStretchRunning = true;
  isStretchPaused = false;

  let protocol = null;
  if (physioData && physioData.protocols) {
    protocol = physioData.protocols.find(p => p.id === protocolIdOrName || p.title === protocolIdOrName);
  }

  const name = protocol ? protocol.title : protocolIdOrName;
  const duration = protocol ? protocol.duration_sec : 30;
  const isBilateral = protocol ? protocol.is_bilateral : false;

  stretchCurrentProtocol = protocol;
  stretchCurrentPhase = 1;
  stretchRemaining = duration;

  playChime(440, 660);

  const banner = document.getElementById("stretch-active-banner");
  const nameEl = document.getElementById("stretch-active-name");
  const clockEl = document.getElementById("stretch-active-clock");
  const badgeEl = document.getElementById("stretch-phase-badge");
  const cueEl = document.getElementById("stretch-phase-cue");
  const pauseBtn = document.getElementById("stretch-pause-btn");
  const imgEl = document.getElementById("stretch-active-img");

  if (banner) {
    banner.style.display = 'flex';
    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  if (nameEl) nameEl.innerText = name;
  if (clockEl) clockEl.innerText = `${stretchRemaining}s`;
  if (pauseBtn) pauseBtn.innerText = "Pausar";
  if (imgEl) {
    imgEl.src = protocol ? `assets/physio/${protocol.id}.webp` : 'assets/physio/manguito_rotador_externo.webp';
    imgEl.onerror = () => { imgEl.src = protocol ? `assets/physio/${protocol.id}.svg` : 'assets/physio/manguito_rotador_externo.svg'; };
  }

  if (badgeEl) {
    badgeEl.className = "stretch-phase-badge";
    badgeEl.innerText = isBilateral ? "Lado 1 (Esquerdo)" : "Executando";
  }
  if (cueEl && protocol) {
    cueEl.innerText = protocol.how;
  }

  stretchInterval = setInterval(() => {
    if (isStretchPaused) return;

    stretchRemaining--;
    if (clockEl) clockEl.innerText = `${stretchRemaining}s`;

    if (stretchRemaining <= 0) {
      if (isBilateral && stretchCurrentPhase === 1) {
        // Transition to switch sides (5 seconds)
        stretchCurrentPhase = 2;
        stretchRemaining = 5;
        playChime(660, 440);
        if (badgeEl) {
          badgeEl.className = "stretch-phase-badge switch";
          badgeEl.innerText = "Troque de Lado (5s)";
        }
        if (cueEl) cueEl.innerText = "Prepare o lado direito / oposto...";
      } else if (isBilateral && stretchCurrentPhase === 2) {
        // Start side 2
        stretchCurrentPhase = 3;
        stretchRemaining = duration;
        playChime(587.33, 880);
        if (badgeEl) {
          badgeEl.className = "stretch-phase-badge";
          badgeEl.innerText = "Lado 2 (Direito)";
        }
        if (cueEl && protocol) cueEl.innerText = protocol.how;
      } else {
        // All phases complete!
        clearInterval(stretchInterval);
        isStretchRunning = false;
        playChime(523.25, 783.99);
        setTimeout(() => playChime(659.25, 1046.50), 200);

        if (protocol) {
          togglePhysioCompleted(protocol.id);
        }

        alert(`🏆 Protocolo Concluído!\n\n${name} finalizado com sucesso.\n+2 minutos adicionados à sua meta de mobilidade diária!`);
        if (banner) banner.style.display = 'none';
      }
    }
  }, 1000);
};

window.startStretchTimer = window.startSmartStretchTimer;

window.togglePauseStretchTimer = function() {
  isStretchPaused = !isStretchPaused;
  const pauseBtn = document.getElementById("stretch-pause-btn");
  if (pauseBtn) {
    pauseBtn.innerText = isStretchPaused ? "Continuar" : "Pausar";
    pauseBtn.style.color = isStretchPaused ? "var(--mint)" : "var(--volt)";
  }
  playChime(440, 550);
};

window.cancelStretchTimer = function() {
  clearInterval(stretchInterval);
  isStretchRunning = false;
  isStretchPaused = false;
  const banner = document.getElementById("stretch-active-banner");
  if (banner) banner.style.display = 'none';
};

// Hydration Tracker
function initHydration() {
  const container = document.getElementById("water-cups-container");
  if (!container) return;
  container.innerHTML = "";
  
  const savedCups = parseInt(localStorage.getItem("athlete_water_cups") || "0");
  for (let i = 0; i < 12; i++) {
    const cup = document.createElement("div");
    cup.className = `glass-item mono ${i < savedCups ? 'filled' : ''}`;
    cup.innerHTML = `${(i + 1) * 250}`;
    cup.title = `Copo ${i + 1} (${(i + 1) * 250}ml)`;
    cup.addEventListener("click", () => {
      let newCount = i + 1;
      if (i + 1 === savedCups) newCount = i;
      localStorage.setItem("athlete_water_cups", newCount);
      initHydration();
    });
    container.appendChild(cup);
  }

  const textEl = document.getElementById("water-liters-text");
  if (textEl) {
    const targetLiters = (profileData && profileData.nutrition_targets && profileData.nutrition_targets.water_target_liters) || 2.5;
    const liters = (savedCups * 0.25).toFixed(2);
    textEl.innerText = `${liters}L / ${targetLiters.toFixed(1)}L`;
  }
}

// Grocery Interactive Checklist
function initGroceryChecklist() {
  const listEl = document.getElementById("grocery-checklist-items");
  if (!listEl || !mealPlanData) return;
  listEl.innerHTML = "";

  const items = mealPlanData.weekly_fresh_shopping_list.items;
  let checkedCount = 0;

  items.forEach((it, idx) => {
    const key = `grocery_checked_${idx}`;
    const isChecked = localStorage.getItem(key) === 'true';
    if (isChecked) checkedCount++;

    const row = document.createElement("div");
    row.className = `grocery-check-row ${isChecked ? 'checked' : ''}`;
    row.innerHTML = `
      <div class="grocery-box-indicator mono">${isChecked ? '✓' : ''}</div>
      <span style="font-size: 13.5px;"><strong>${it.item}:</strong> ${it.quantity}</span>
    `;

    row.addEventListener("click", () => {
      localStorage.setItem(key, !isChecked);
      initGroceryChecklist();
    });

    listEl.appendChild(row);
  });

  const progressEl = document.getElementById("grocery-progress-badge");
  if (progressEl) {
    progressEl.innerText = `${checkedCount} de ${items.length} comprados`;
  }
}

// Apple Watch Metrics
function renderAppleMetrics() {
  if (!healthSummaryData) return;
  const m = healthSummaryData.metrics;

  const stepsEl = document.getElementById("val-steps");
  const calEl = document.getElementById("val-active-cal");
  const hrEl = document.getElementById("val-rhr");
  const hrvEl = document.getElementById("val-hrv");

  if (stepsEl) stepsEl.innerHTML = `${m.daily_steps.average_active_days.toLocaleString()} <small>passos</small>`;
  if (calEl) calEl.innerHTML = `${m.active_energy_kcal.average_daily} <small>kcal</small>`;
  if (hrEl) hrEl.innerHTML = `${m.resting_heart_rate_bpm.recent_average} <small>bpm</small>`;
  if (hrvEl) hrvEl.innerHTML = `HRV: ${m.hrv_sdnn_ms.recent_average} ms • Prontidão: ${m.hrv_sdnn_ms.readiness_score}/100`;
}

// Meal Plan Matrix
function renderMealPlan() {
  if (!mealPlanData) return;
  const weekData = mealPlanData.four_weeks_meal_matrix.find(w => w.week_number === currentWeek);
  if (!weekData) return;

  const titleEl = document.getElementById("meal-week-title");
  if (titleEl) titleEl.innerText = `Semana ${weekData.week_number} — ${weekData.theme}`;

  document.getElementById("meal-cafe").innerText = weekData.cafe_da_manha;
  document.getElementById("meal-almoco").innerText = weekData.almoco;
  document.getElementById("meal-lanche").innerText = weekData.lanche_tarde;
  document.getElementById("meal-jantar").innerText = weekData.jantar;
  document.getElementById("meal-ceia").innerText = weekData.ceia_opcional;
}

// Bi-Directional Apple Fitness Sync & Workout Completion
window.finishWorkoutAndSync = function() {
  playChime(523.25, 783.99); // C5 -> G5 Fanfare
  setTimeout(() => playChime(659.25, 1046.50), 200); // E5 -> C6

  const split = workoutsData ? workoutsData.weekly_splits.find(s => s.id === currentWorkoutId) : null;
  const splitName = split ? `${split.name} (${split.subtitle})` : "Treino Olympus";

  // Trigger Apple Shortcuts URL scheme if available
  const shortcutUrl = `shortcuts://run-shortcut?name=RegistrarTreinoOlympus&input=${encodeURIComponent(splitName)}`;
  
  // Local notification alert
  const athleteName = (profileData && profileData.athlete && profileData.athlete.name) ? profileData.athlete.name : "Atleta";
  alert(`🏆 Parabéns, ${athleteName}! ${splitName} concluído com sucesso.\n\nDisparando atalho para computar calorias e fechar os anéis no Apple Watch...`);
  
  try {
    window.location.href = shortcutUrl;
  } catch (e) {
    console.log("Shortcut trigger initiated");
  }
};

// Re-fetch live metrics
window.refreshHealthData = async function() {
  try {
    const res = await fetch(`../data/health_summary.json?t=${Date.now()}`);
    if (res.ok) {
      healthSummaryData = await res.json();
      renderAppleMetrics();
      const timeEl = document.getElementById("apple-sync-time-text");
      if (timeEl) {
        timeEl.innerText = `Atualizado às ${new Date().toLocaleTimeString()} via HealthKit Engine`;
      }
      playChime(660, 880);
    }
  } catch (e) {
    console.log("Erro ao atualizar métricas:", e);
  }
};
