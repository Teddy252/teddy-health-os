#!/usr/bin/env python3
"""
TEDDY HEALTH & FITNESS OS — KITCHEN GUIDE & MEAL PLAN PDF GENERATOR
Swiss Editorial Design • A4 Pixel-Perfect Layout • Household Measures
"""

import os
import fitz  # PyMuPDF

def create_kitchen_guide_pdf(output_path):
    doc = fitz.open()
    W, H = 595.32, 841.92  # A4 Portrait in points
    margin = 36
    content_w = W - 2 * margin

    # Colors
    c_dark = (17/255, 24/255, 39/255)       # #111827
    c_white = (1.0, 1.0, 1.0)
    c_card_bg = (249/255, 250/255, 251/255)  # #F9FAFB
    c_border = (229/255, 231/255, 235/255)   # #E5E7EB
    c_text_head = (17/255, 24/255, 39/255)
    c_text_body = (55/255, 65/255, 81/255)   # #374151
    c_text_muted = (107/255, 114/255, 128/255) # #6B7280
    c_amber_bg = (254/255, 243/255, 199/255)
    c_amber_txt = (146/255, 64/255, 14/255)
    c_red_bg = (254/255, 226/255, 226/255)
    c_red_txt = (153/255, 27/255, 27/255)
    c_green_bg = (220/255, 252/255, 231/255)
    c_green_txt = (22/255, 101/255, 52/255)

    # =========================================================================
    # FOLHA 1: MEDIDAS VISUAIS & MATRIZ DAS 4 SEMANAS
    # =========================================================================
    p1 = doc.new_page(width=W, height=H)
    y = margin

    # Header Row
    p1.insert_text(fitz.Point(margin, y + 16), "GUIA DA COZINHA & CARDÁPIO MENSAL", fontname="helv", fontsize=16, color=c_dark)
    p1.insert_text(fitz.Point(margin, y + 30), "CASA DO TEDDY • REFEIÇÕES DE ALTA PERFORMANCE • MEDIDAS SEM BALANÇA", fontname="helv", fontsize=8.5, color=c_text_muted)
    
    # Target Badge on right
    badge_rect = fitz.Rect(W - margin - 110, y + 4, W - margin, y + 26)
    p1.draw_rect(badge_rect, color=c_dark, fill=c_dark, radius=None)
    p1.insert_text(fitz.Point(badge_rect.x0 + 12, badge_rect.y0 + 15), "META: 74 KG LIMPO", fontname="helv", fontsize=8, color=c_white)

    y += 38
    p1.draw_line(fitz.Point(margin, y), fitz.Point(W - margin, y), color=c_dark, width=1.5)
    y += 10

    # Cook Welcome Box
    welcome_rect = fitz.Rect(margin, y, W - margin, y + 42)
    p1.draw_rect(welcome_rect, color=c_border, fill=c_card_bg, radius=None)
    # amber left stripe
    p1.draw_rect(fitz.Rect(margin, y, margin + 4, y + 42), color=c_amber_txt, fill=c_amber_txt, radius=None)
    p1.insert_text(fitz.Point(margin + 12, y + 15), "Olá! Seja muito bem-vinda ao nosso guia de refeições.", fontname="helv", fontsize=9.5, color=c_dark)
    p1.insert_text(fitz.Point(margin + 12, y + 28), "Não precisa pesar nada nem usar balança: siga as medidas práticas de conchas, escumadeiras e bifes da palma da mão.", fontname="helv", fontsize=8, color=c_text_body)
    p1.insert_text(fitz.Point(margin + 12, y + 37), "Muito obrigado pelo seu carinho na preparação diária das refeições!", fontname="helv", fontsize=8, color=c_text_body)

    y += 50

    # Section 1 Header
    p1.insert_text(fitz.Point(margin, y + 11), "1. MEDIDAS PRÁTICAS DO PRATO (SEM BALANÇA)", fontname="helv", fontsize=10.5, color=c_dark)
    p1.insert_text(fitz.Point(W - margin - 150, y + 11), "Referência fixa para almoço e jantar", fontname="helv", fontsize=8, color=c_text_muted)
    y += 16

    # 6 Portion Cards (3 cols x 2 rows)
    card_w = (content_w - 2 * 8) / 3
    card_h = 48
    portions = [
        ("ARROZ (BRANCO / BASMATI)", "2 Escumadeiras Rasas", "Soltinho, refogado com alho e azeite.", c_amber_bg, c_amber_txt),
        ("FEIJÃO (PRETO / CARIOCA)", "1 Concha Cheia", "Servir grãos e caldo grosso com louro.", c_amber_bg, c_amber_txt),
        ("FRANGO OU CARNE BOVINA", "1 Bife (Palma da Mão)", "Grelhado suculento, marinado no limão.", c_red_bg, c_red_txt),
        ("CARNE MOÍDA REFOGADA", "4 Colheres de Sopa", "Refogada com cenoura e cheiro-verde.", c_red_bg, c_red_txt),
        ("BANANA DA TERRA (CAFÉ)", "1 Banana Média Inteira", "Dourada com manteiga, canela e mel.", c_green_bg, c_green_txt),
        ("OVOS (CAFÉ PRÉ-TREINO)", "3 Ovos Inteiros", "Mexidos cremosos ou cozidos macios.", c_green_bg, c_green_txt),
    ]

    for idx, (food, measure, tip, bg_c, txt_c) in enumerate(portions):
        col = idx % 3
        row = idx // 3
        cx = margin + col * (card_w + 8)
        cy = y + row * (card_h + 6)
        r = fitz.Rect(cx, cy, cx + card_w, cy + card_h)
        p1.draw_rect(r, color=c_border, fill=c_card_bg, radius=None)

        p1.insert_text(fitz.Point(cx + 8, cy + 12), food, fontname="helv", fontsize=7.5, color=c_text_muted)
        
        # measure badge
        mb_r = fitz.Rect(cx + 8, cy + 16, cx + card_w - 8, cy + 30)
        p1.draw_rect(mb_r, color=txt_c, fill=bg_c, radius=None)
        p1.insert_text(fitz.Point(cx + 12, cy + 26), measure, fontname="helv", fontsize=8.5, color=txt_c)

        p1.insert_text(fitz.Point(cx + 8, cy + 41), tip, fontname="helv", fontsize=6.8, color=c_text_body)

    y += 2 * (card_h + 6) + 12

    # Section 2 Header
    p1.insert_text(fitz.Point(margin, y + 11), "2. PROGRAMAÇÃO SEMANAL DAS REFEIÇÕES (4 SEMANAS DO MÊS)", fontname="helv", fontsize=10.5, color=c_dark)
    y += 16

    # 4 Weeks Grid (2 cols x 2 rows)
    wbox_w = (content_w - 10) / 2
    wbox_h = 240

    weeks_data = [
        ("SEMANA 1", "Clássicos da Casa & Energia", [
            ("07:30 Café:", "3 ovos mexidos cremosos + 1 banana da terra grelhada com canela e mel + café preto."),
            ("12:30 Almoço:", "Peito de frango grelhado marinado no limão + 2 escumadeiras de arroz + 1 concha de feijão preto + salada verde."),
            ("16:30 Lanche:", "1 pote de iogurte natural + 3 colheres de aveia + 1 banana fatiada e mix de castanhas."),
            ("20:30 Jantar:", "Bife de alcatra macio grelhado + 2 escumadeiras de arroz + 1 concha de feijão preto + abobrinha salteada."),
        ], (17/255, 24/255, 39/255)),
        ("SEMANA 2", "Tradição Brasileira & Maciez", [
            ("07:30 Café:", "Omelete com 3 ovos, tomate picado e cheiro-verde + banana da terra cozida + café preto."),
            ("12:30 Almoço:", "Patinho moído com cenoura ralada (4 colheres de sopa) + 2 escumadeiras de arroz + feijão carioca + batata doce."),
            ("16:30 Lanche:", "Vitamina de banana batida com 3 colheres de sopa de aveia, leite/iogurte e mel."),
            ("20:30 Jantar:", "Frango desfiado suculento ao molho de tomate fresco + 2 escumadeiras de arroz + feijão carioca + purê de batata."),
        ], (30/255, 58/255, 138/255)),
        ("SEMANA 3", "Sabores Especiais & Toque Gourmet", [
            ("07:30 Café:", "3 ovos mexidos cremosos + banana da terra assada com canela e mel + café preto."),
            ("12:30 Almoço:", "Iscas de carne acebolada na chapa + arroz com cúrcuma + feijão fradinho com louro + vinagrete fresco."),
            ("16:30 Lanche:", "Mingau morno de aveia com banana amassada, canela e castanhas picadas."),
            ("20:30 Jantar:", "Sobrecoxa desossada dourada com alecrim e alho + arroz + feijão + batatas rústicas assadas."),
        ], (120/255, 53/255, 15/255)),
        ("SEMANA 4", "Alta Performance & Densidade", [
            ("07:30 Café:", "3 ovos mexidos cremosos + banana da terra em rodelas grelhadas com mel + café preto."),
            ("12:30 Almoço:", "Filé de tilápia grelhado ou bife magro + purê de batata inglesa aveludado + feijão da casa + salada fresca com azeite."),
            ("16:30 Lanche:", "Iogurte com aveia em flocos finos, banana fatiada e castanhas."),
            ("20:30 Jantar:", "Carne de panela macia desmanchando com cenoura e batata + arroz branco regado com o molho + feijão."),
        ], (6/255, 78/255, 59/255)),
    ]

    for idx, (w_title, w_sub, meals, bar_color) in enumerate(weeks_data):
        w_col = idx % 2
        w_row = idx // 2
        wx = margin + w_col * (wbox_w + 10)
        wy = y + w_row * (wbox_h + 10)

        # Container
        wb_rect = fitz.Rect(wx, wy, wx + wbox_w, wy + wbox_h)
        p1.draw_rect(wb_rect, color=c_border, fill=c_white, radius=None)

        # Header Bar
        hbar_rect = fitz.Rect(wx, wy, wx + wbox_w, wy + 24)
        p1.draw_rect(hbar_rect, color=bar_color, fill=bar_color, radius=None)
        p1.insert_text(fitz.Point(wx + 10, wy + 16), w_title, fontname="helv", fontsize=10, color=c_white)
        p1.insert_text(fitz.Point(wx + wbox_w - 140, wy + 16), w_sub, fontname="helv", fontsize=8, color=(209/255, 213/255, 219/255))

        # Meal entries
        my = wy + 32
        for m_tag, m_desc in meals:
            p1.insert_text(fitz.Point(wx + 8, my + 8), m_tag, fontname="helv", fontsize=8.5, color=c_dark)
            # wrap desc
            text_rect = fitz.Rect(wx + 8, my + 11, wx + wbox_w - 8, my + 44)
            p1.insert_textbox(text_rect, m_desc, fontname="helv", fontsize=7.8, color=c_text_body, lineheight=1.2)
            my += 48
            p1.draw_line(fitz.Point(wx + 8, my - 2), fitz.Point(wx + wbox_w - 8, my - 2), color=(243/255, 244/255, 246/255), width=0.5)

    # Footer Folha 1
    p1.draw_line(fitz.Point(margin, H - 28), fitz.Point(W - margin, H - 28), color=c_border, width=0.8)
    p1.insert_text(fitz.Point(margin, H - 16), "Teddy Health & Fitness OS • Folha 1 de 2 • Fixar na porta da geladeira para consulta rápida", fontname="helv", fontsize=7.5, color=c_text_muted)

    # =========================================================================
    # FOLHA 2: LOGÍSTICA DE COMPRAS & SEGREDOS DO CHEF
    # =========================================================================
    p2 = doc.new_page(width=W, height=H)
    y = margin

    # Header Row
    p2.insert_text(fitz.Point(margin, y + 16), "LOGÍSTICA DE COMPRAS & SEGREDOS DO CHEF", fontname="helv", fontsize=16, color=c_dark)
    p2.insert_text(fitz.Point(margin, y + 30), "PLANEJAMENTO DE ESTOQUE MENSAL DE SUPERMERCADO & REPOSIÇÃO DE FEIRA", fontname="helv", fontsize=8.5, color=c_text_muted)
    
    badge2_rect = fitz.Rect(W - margin - 130, y + 4, W - margin, y + 26)
    p2.draw_rect(badge2_rect, color=c_dark, fill=c_dark, radius=None)
    p2.insert_text(fitz.Point(badge2_rect.x0 + 10, badge2_rect.y0 + 15), "CONTROLE DE DESPENSA", fontname="helv", fontsize=7.5, color=c_white)

    y += 38
    p2.draw_line(fitz.Point(margin, y), fitz.Point(W - margin, y), color=c_dark, width=1.5)
    y += 12

    # Section 3 Header
    p2.insert_text(fitz.Point(margin, y + 11), "3. LISTA DE COMPRAS ORGANIZADA POR FREQUÊNCIA", fontname="helv", fontsize=10.5, color=c_dark)
    p2.insert_text(fitz.Point(W - margin - 160, y + 11), "Marque à mão com caneta os itens comprados", fontname="helv", fontsize=8, color=c_text_muted)
    y += 18

    # 2 Columns for Shopping (Supermercado Mensal vs Feira Semanal)
    scol_w = (content_w - 14) / 2
    scol_h = 360

    # Column 1: Monthly Supermarket
    c1_rect = fitz.Rect(margin, y, margin + scol_w, y + scol_h)
    p2.draw_rect(c1_rect, color=c_border, fill=c_card_bg, radius=None)
    
    p2.insert_text(fitz.Point(margin + 12, y + 18), "ESTOQUE DO MÊS (ATACADO)", fontname="helv", fontsize=8.5, color=c_dark)
    
    # 1x Mes badge
    p2.draw_rect(fitz.Rect(margin + scol_w - 52, y + 8, margin + scol_w - 12, y + 22), color=c_border, fill=c_white, radius=None)
    p2.insert_text(fitz.Point(margin + scol_w - 47, y + 18), "1x / MÊS", fontname="helv", fontsize=7.2, color=c_dark)
    
    p2.draw_line(fitz.Point(margin + 12, y + 28), fitz.Point(margin + scol_w - 12, y + 28), color=c_border, width=0.8)

    mensal_items = [
        ("Arroz branco ou basmati:", "2 fardos de 5 kg (10 kg total)"),
        ("Feijão Preto:", "3 pacotes de 1 kg"),
        ("Feijão Carioca:", "3 pacotes de 1 kg"),
        ("Feijão Fradinho ou Manteiga:", "2 pacotes de 1 kg"),
        ("Azeite de Oliva Extravirgem:", "2 garrafas de 500 ml"),
        ("Aveia em flocos finos:", "4 pacotes de 500 g (2 kg total)"),
        ("Mel puro de abelha:", "1 bisnaga ou pote de 500 g"),
        ("Castanhas de Caju ou Pará:", "1 kg (em pote fechado)"),
        ("Temperos secos:", "Canela em pó, louro, orégano, cúrcuma"),
        ("Café em pó ou cápsula:", "Quantidade mensal habitual"),
        ("Chás calmantes:", "Camomila, erva-doce ou melissa"),
        ("Sal marinho e alho seco:", "Reposição de temperos básicos"),
    ]

    iy = y + 42
    for item_lbl, item_qty in mensal_items:
        # Checkbox square
        box_r = fitz.Rect(margin + 14, iy - 7, margin + 24, iy + 3)
        p2.draw_rect(box_r, color=c_text_muted, fill=c_white, radius=None)
        p2.insert_text(fitz.Point(margin + 30, iy), item_lbl, fontname="helv", fontsize=8.2, color=c_dark)
        p2.insert_text(fitz.Point(margin + 30, iy + 9), item_qty, fontname="helv", fontsize=7.5, color=c_text_muted)
        iy += 26

    # Column 2: Weekly Market & Butcher
    c2_rect = fitz.Rect(margin + scol_w + 14, y, W - margin, y + scol_h)
    p2.draw_rect(c2_rect, color=c_border, fill=c_card_bg, radius=None)

    p2.insert_text(fitz.Point(margin + scol_w + 26, y + 18), "FEIRA & AÇOUGUE (FRESCOS)", fontname="helv", fontsize=8.5, color=c_dark)

    p2.draw_rect(fitz.Rect(W - margin - 58, y + 8, W - margin - 12, y + 22), color=c_border, fill=c_white, radius=None)
    p2.insert_text(fitz.Point(W - margin - 53, y + 18), "SEMANAL", fontname="helv", fontsize=7.2, color=c_dark)

    p2.draw_line(fitz.Point(margin + scol_w + 26, y + 28), fitz.Point(W - margin - 12, y + 28), color=c_border, width=0.8)

    semanal_items = [
        ("Ovos frescos:", "60 ovos por quinzena (2 bandejas de 30)"),
        ("Peito de Frango:", "2,5 kg/semana (cortar bifes e congelar)"),
        ("Carne Bovina (patinho/alcatra):", "2 kg/semana (bifes e moída)"),
        ("Banana da Terra:", "8 a 10 unidades/semana (meio maduras)"),
        ("Banana Prata ou Nanica:", "2 dúzias por semana"),
        ("Batatas (inglesa e doce):", "3 kg de cada por semana"),
        ("Temperos frescos:", "Alho, cebola, limão, tomate, cheiro-verde"),
        ("Hortaliças e folhas:", "Alface fresca, rúcula, cenouras e abobrinha"),
        ("Iogurte natural integral:", "6 a 8 potes por semana"),
        ("Frutas da época:", "Mamão, maçã ou laranja para o dia a dia"),
        ("Manteiga de leite:", "Para grelhar as bananas e ovos"),
        ("Sobrecoxa desossada:", "1 kg para a Semana 3 (grelhada com alecrim)"),
    ]

    iy2 = y + 42
    for item_lbl, item_qty in semanal_items:
        box_r = fitz.Rect(margin + scol_w + 28, iy2 - 7, margin + scol_w + 38, iy2 + 3)
        p2.draw_rect(box_r, color=c_text_muted, fill=c_white, radius=None)
        p2.insert_text(fitz.Point(margin + scol_w + 44, iy2), item_lbl, fontname="helv", fontsize=8.2, color=c_dark)
        p2.insert_text(fitz.Point(margin + scol_w + 44, iy2 + 9), item_qty, fontname="helv", fontsize=7.5, color=c_text_muted)
        iy2 += 26

    y += scol_h + 16

    # Section 4: 3 Chef Secrets
    p2.insert_text(fitz.Point(margin, y + 11), "4. OS 3 SEGREDOS DO CHEF PARA O SUCESSO DO CARDÁPIO", fontname="helv", fontsize=10.5, color=c_dark)
    y += 18

    sec_w = (content_w - 16) / 3
    sec_h = 75
    secrets = [
        ("1. Frango Sempre Suculento", "Frigideira bem quente com fio de azeite. Doure 3 minutos de cada lado sem mexer e sem furar com o garfo. Isso sela os sucos e não deixa a carne ressecar."),
        ("2. Feijão com Caldo Grosso", "Refogue bastante alho e louro. No final do cozimento, amasse 1 concha de grãos com o garfo e devolva à panela; mexa 3 min em fogo baixo para encorpar."),
        ("3. Banana da Terra Perfeita", "Corte no comprimento e coloque na frigideira com pontinha de manteiga em fogo médio. Deixe caramelizar bem os dois lados antes de polvilhar canela e mel."),
    ]

    for idx, (stitle, sdesc) in enumerate(secrets):
        sx = margin + idx * (sec_w + 8)
        sr = fitz.Rect(sx, y, sx + sec_w, y + sec_h)
        p2.draw_rect(sr, color=c_border, fill=c_white, radius=None)
        p2.draw_rect(fitz.Rect(sx, y, sx + sec_w, y + 3), color=c_dark, fill=c_dark, radius=None)

        p2.insert_text(fitz.Point(sx + 8, y + 15), stitle, fontname="helv", fontsize=8.5, color=c_dark)
        p2.insert_textbox(fitz.Rect(sx + 8, y + 20, sx + sec_w - 8, y + sec_h - 4), sdesc, fontname="helv", fontsize=7.2, color=c_text_body, lineheight=1.25)

    y += sec_h + 12

    # Section 5: Golden Rule of Flexibility
    rule_rect = fitz.Rect(margin, y, W - margin, y + 42)
    p2.draw_rect(rule_rect, color=(253/255, 230/255, 138/255), fill=(255/255, 251/255, 235/255), radius=None)
    p2.draw_rect(fitz.Rect(margin, y, margin + 4, y + 42), color=c_amber_txt, fill=c_amber_txt, radius=None)

    p2.insert_text(fitz.Point(margin + 12, y + 14), "Regra de Ouro da Cozinha Sem Estresse:", fontname="helv", fontsize=8.5, color=c_amber_txt)
    p2.insert_text(fitz.Point(margin + 12, y + 26), "Se faltar algum item, substitua sem medo: carne moída no lugar do frango; banana comum aquecida no lugar da banana da terra;", fontname="helv", fontsize=7.5, color=c_amber_txt)
    p2.insert_text(fitz.Point(margin + 12, y + 36), "batata inglesa no lugar da batata doce. O que garante o resultado é manter as medidas da palma da mão e das escumadeiras!", fontname="helv", fontsize=7.5, color=c_amber_txt)

    # Footer Folha 2
    p2.draw_line(fitz.Point(margin, H - 28), fitz.Point(W - margin, H - 28), color=c_border, width=0.8)
    p2.insert_text(fitz.Point(margin, H - 16), "Teddy Health & Fitness OS • Folha 2 de 2 • Guarde junto à lista de compras da despensa", fontname="helv", fontsize=7.5, color=c_text_muted)

    # Save PDF
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    doc.close()
    print(f"PDF generated successfully at: {output_path}")

if __name__ == "__main__":
    out = "Internos_Teddy/Teddy_Health_OS/docs/guia_da_cozinha_mensal.pdf"
    create_kitchen_guide_pdf(out)
