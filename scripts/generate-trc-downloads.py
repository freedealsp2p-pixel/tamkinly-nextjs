#!/usr/bin/env python3
"""Generate 12 bilingual PDF companion files for TRC tools."""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black, Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import Paragraph, Frame, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

# ── Colors ──
TEAL = HexColor('#1F6F78')
TEAL_LIGHT = HexColor('#E8F4F5')
TEAL_MID = HexColor('#B8DDE1')
WARN_BG = HexColor('#FFF3E0')
WARN_BORDER = HexColor('#E65100')
CRISIS_BG = HexColor('#FFEBEE')
CRISIS_BORDER = HexColor('#C62828')
GRAY = HexColor('#666666')
LIGHT_GRAY = HexColor('#F5F5F5')
DARK = HexColor('#2D2D2D')

# ── Fonts ──
pdfmetrics.registerFont(TTFont('Arabic', '/usr/share/fonts/google-droid/DroidSansArabic.ttf'))
pdfmetrics.registerFont(TTFont('Fallback', '/usr/share/fonts/google-droid/DroidSansFallback.ttf'))
pdfmetrics.registerFont(TTFont('Sans', '/usr/share/fonts/open-sans/OpenSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('SansBold', '/usr/share/fonts/open-sans/OpenSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('SansSemi', '/usr/share/fonts/open-sans/OpenSans-Semibold.ttf'))
pdfmetrics.registerFont(TTFont('SansLight', '/usr/share/fonts/open-sans/OpenSans-Light.ttf'))

OUTPUT_DIR = '/var/www/tamkinly/public/downloads/trc'
PAGE_W, PAGE_H = A4

class PDFBuilder:
    def __init__(self, filename, title_en, title_ar):
        self.path = os.path.join(OUTPUT_DIR, filename)
        self.c = canvas.Canvas(self.path, pagesize=A4)
        self.c.setTitle(title_en)
        self.y = PAGE_H - 20*mm
        self.page = 1
        self.title_en = title_en
        self.title_ar = title_ar

    def _draw_header(self):
        c = self.c
        # Teal bar at top
        c.setFillColor(TEAL)
        c.rect(0, PAGE_H - 14*mm, PAGE_W, 14*mm, fill=1, stroke=0)
        # Brand
        c.setFillColor(white)
        c.setFont('SansBold', 14)
        c.drawString(15*mm, PAGE_H - 10*mm, 'Tamkinly')
        c.setFont('SansLight', 10)
        c.drawString(15*mm + 65, PAGE_H - 10*mm, '— TRC Recovery Tools')
        # Page number
        c.setFont('Sans', 8)
        c.drawRightString(PAGE_W - 15*mm, PAGE_H - 10*mm, f'Page {self.page}')
        self.y = PAGE_H - 22*mm

    def _draw_footer(self):
        c = self.c
        c.setFillColor(TEAL)
        c.rect(0, 0, PAGE_W, 10*mm, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont('Sans', 7)
        c.drawCentredString(PAGE_W/2, 4*mm, 'Companion to interactive tool at tamkinly.com  |  تمكينلي - أدوات التعافي من الصدمة')

    def new_page(self):
        if self.page > 1:
            self._draw_footer()
            self.c.showPage()
        self.page += 1
        self._draw_header()

    def start(self):
        self._draw_header()

    def title(self):
        c = self.c
        # Arabic title (right-aligned)
        c.setFont('Arabic', 16)
        c.setFillColor(TEAL)
        c.drawRightString(PAGE_W - 15*mm, self.y, self.title_ar)
        self.y -= 8*mm
        # English title
        c.setFont('SansBold', 14)
        c.setFillColor(DARK)
        c.drawString(15*mm, self.y, self.title_en)
        self.y -= 3*mm
        # Divider
        c.setStrokeColor(TEAL)
        c.setLineWidth(1.5)
        c.line(15*mm, self.y, PAGE_W - 15*mm, self.y)
        self.y -= 6*mm

    def section(self, title_ar, title_en):
        if self.y < 40*mm:
            self.new_page()
        c = self.c
        c.setFont('Arabic', 11)
        c.setFillColor(TEAL)
        c.drawRightString(PAGE_W - 15*mm, self.y, title_ar)
        self.y -= 5*mm
        c.setFont('SansBold', 11)
        c.setFillColor(TEAL)
        c.drawString(15*mm, self.y, title_en)
        self.y -= 2*mm
        c.setStrokeColor(TEAL_MID)
        c.setLineWidth(0.5)
        c.line(15*mm, self.y, PAGE_W - 15*mm, self.y)
        self.y -= 4*mm

    def ar_text(self, text, size=10, color=DARK):
        if self.y < 30*mm:
            self.new_page()
        c = self.c
        c.setFont('Arabic', size)
        c.setFillColor(color)
        # Split long text
        lines = text.split('\n')
        for line in lines:
            c.drawRightString(PAGE_W - 15*mm, self.y, line)
            self.y -= size + 3

    def en_text(self, text, size=9, color=DARK, indent=0):
        if self.y < 30*mm:
            self.new_page()
        c = self.c
        c.setFont('Sans', size)
        c.setFillColor(color)
        x = 15*mm + indent
        # Simple word wrap
        max_width = PAGE_W - 30*mm - indent
        lines = text.split('\n')
        for line in lines:
            words = line.split(' ')
            current = ''
            for word in words:
                test = current + (' ' if current else '') + word
                if c.stringWidth(test, 'Sans', size) > max_width:
                    if current:
                        c.drawString(x, self.y, current)
                        self.y -= size + 3
                    current = word
                else:
                    current = test
            if current:
                c.drawString(x, self.y, current)
                self.y -= size + 3

    def bold_en_text(self, text, size=9, color=DARK, indent=0):
        if self.y < 30*mm:
            self.new_page()
        c = self.c
        c.setFont('SansBold', size)
        c.setFillColor(color)
        x = 15*mm + indent
        max_width = PAGE_W - 30*mm - indent
        words = text.split(' ')
        current = ''
        for word in words:
            test = current + (' ' if current else '') + word
            if c.stringWidth(test, 'SansBold', size) > max_width:
                if current:
                    c.drawString(x, self.y, current)
                    self.y -= size + 3
                current = word
            else:
                current = test
        if current:
            c.drawString(x, self.y, current)
            self.y -= size + 3

    def bullet(self, text, indent=5, size=9):
        if self.y < 30*mm:
            self.new_page()
        c = self.c
        x = 15*mm + indent
        c.setFont('Sans', size)
        c.setFillColor(TEAL)
        c.drawString(x, self.y, '•')
        c.setFillColor(DARK)
        # wrap
        max_w = PAGE_W - 30*mm - indent - 10
        words = text.split(' ')
        current = ''
        first = True
        for word in words:
            test = current + (' ' if current else '') + word
            if c.stringWidth(test, 'Sans', size) > max_w:
                if current:
                    c.drawString(x + 10, self.y, current)
                    self.y -= size + 3
                current = word
                first = False
            else:
                current = test
        if current:
            c.drawString(x + 10, self.y, current)
            self.y -= size + 3

    def ar_bullet(self, text, indent=5, size=10):
        if self.y < 30*mm:
            self.new_page()
        c = self.c
        x_right = PAGE_W - 15*mm - indent
        c.setFont('Arabic', size)
        c.setFillColor(DARK)
        c.drawRightString(x_right, self.y, '• ' + text)
        self.y -= size + 3

    def numbered(self, num, text, indent=5, size=9):
        if self.y < 30*mm:
            self.new_page()
        c = self.c
        x = 15*mm + indent
        c.setFont('SansBold', size)
        c.setFillColor(TEAL)
        num_str = f'{num}.'
        c.drawString(x, self.y, num_str)
        c.setFont('Sans', size)
        c.setFillColor(DARK)
        max_w = PAGE_W - 30*mm - indent - 20
        words = text.split(' ')
        current = ''
        for word in words:
            test = current + (' ' if current else '') + word
            if c.stringWidth(test, 'Sans', size) > max_w:
                if current:
                    c.drawString(x + 20, self.y, current)
                    self.y -= size + 3
                current = word
            else:
                current = test
        if current:
            c.drawString(x + 20, self.y, current)
            self.y -= size + 3

    def warning_box(self, ar_text, en_text):
        if self.y < 55*mm:
            self.new_page()
        c = self.c
        box_h = 22*mm
        box_y = self.y - box_h
        # Background
        c.setFillColor(WARN_BG)
        c.roundRect(15*mm, box_y, PAGE_W - 30*mm, box_h, 3, fill=1, stroke=0)
        # Left border
        c.setFillColor(WARN_BORDER)
        c.rect(15*mm, box_y, 3, box_h, fill=1, stroke=0)
        # Warning icon
        c.setFont('SansBold', 10)
        c.setFillColor(WARN_BORDER)
        c.drawString(20*mm, self.y - 6*mm, '⚠ Trauma Warning / تحذير من الصدمة')
        # Text
        c.setFont('Arabic', 9)
        c.setFillColor(DARK)
        c.drawRightString(PAGE_W - 20*mm, self.y - 13*mm, ar_text)
        c.setFont('Sans', 8)
        c.drawString(20*mm, self.y - 13*mm, en_text)
        self.y = box_y - 4*mm

    def crisis_box(self):
        if self.y < 50*mm:
            self.new_page()
        c = self.c
        box_h = 18*mm
        box_y = self.y - box_h
        c.setFillColor(CRISIS_BG)
        c.roundRect(15*mm, box_y, PAGE_W - 30*mm, box_h, 3, fill=1, stroke=0)
        c.setFillColor(CRISIS_BORDER)
        c.rect(15*mm, box_y, 3, box_h, fill=1, stroke=0)
        c.setFont('SansBold', 10)
        c.setFillColor(CRISIS_BORDER)
        c.drawString(20*mm, self.y - 6*mm, 'If you\'re in crisis / إذا كنت في أزمة:')
        c.setFont('Sans', 9)
        c.drawString(20*mm, self.y - 12*mm, 'Call 911 or your local crisis hotline  |  اتصل بالطوارئ 911 أو خط الأزمات المحلي')
        c.setFont('Arabic', 9)
        c.drawRightString(PAGE_W - 20*mm, self.y - 12*mm, '')
        self.y = box_y - 4*mm

    def draw_table(self, headers, rows, col_widths=None):
        if self.y < 50*mm:
            self.new_page()
        c = self.c
        x = 15*mm
        if col_widths is None:
            total = PAGE_W - 30*mm
            col_widths = [total / len(headers)] * len(headers)
        row_h = 7*mm
        # Header
        c.setFillColor(TEAL)
        c.rect(x, self.y - row_h, sum(col_widths), row_h, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont('SansBold', 8)
        cx = x
        for i, h in enumerate(headers):
            c.drawString(cx + 2, self.y - row_h + 2.5*mm, h)
            cx += col_widths[i]
        self.y -= row_h
        # Rows
        for ri, row in enumerate(rows):
            if self.y < 30*mm:
                self.new_page()
            bg = LIGHT_GRAY if ri % 2 == 0 else white
            c.setFillColor(bg)
            c.rect(x, self.y - row_h, sum(col_widths), row_h, fill=1, stroke=0)
            c.setFillColor(DARK)
            c.setFont('Sans', 7.5)
            cx = x
            for i, cell in enumerate(row):
                c.drawString(cx + 2, self.y - row_h + 2.5*mm, str(cell)[:40])
                cx += col_widths[i]
            self.y -= row_h
        self.y -= 3*mm

    def space(self, mm_val=5):
        self.y -= mm_val * mm

    def draw_lines(self, count, label=""):
        if label:
            c = self.c
            c.setFont('Sans', 7)
            c.setFillColor(GRAY)
            c.drawString(15*mm, self.y, label)
            self.y -= 4*mm
        for _ in range(count):
            if self.y < 25*mm:
                self.new_page()
            c = self.c
            c.setStrokeColor(HexColor('#DDDDDD'))
            c.setLineWidth(0.5)
            c.line(15*mm, self.y, PAGE_W - 15*mm, self.y)
            self.y -= 8*mm

    def finish(self):
        self._draw_footer()
        self.c.save()
        return self.path


# ══════════════════════════════════════════════════════════
# PDF 1: Grounding Pocket Card
# ══════════════════════════════════════════════════════════
def pdf_01():
    pdf = PDFBuilder('trc-01-grounding-pocket-card.pdf',
                     '5-4-3-2-1 Grounding Technique',
                     'تقنية التأريض 5-4-3-2-1')
    pdf.start()
    pdf.title()

    pdf.section('تعرفة: تقنية التأريض', 'The 5-4-3-2-1 Grounding Technique')
    pdf.ar_text('تقنية التأريض تساعدك على العودة إلى اللحظة الحاضرة عندما تشعر بالانفصال أو الإرهاق.')
    pdf.en_text('This technique helps you return to the present moment when you feel disconnected or overwhelmed. Use your senses to ground yourself.')
    pdf.space(3)

    pdf.section('الخطوات الخمس', 'The Five Steps')
    steps = [
        ('5 things you can SEE', '5 أشياء يمكنك رؤيتها'),
        ('4 things you can TOUCH', '4 أشياء يمكنك لمسها'),
        ('3 things you can HEAR', '3 أشياء يمكنك سماعها'),
        ('2 things you can SMELL', '2 أشياء يمكنك شمها'),
        ('1 thing you can TASTE', '1 شيء يمكنك تذوقه'),
    ]
    for i, (en, ar) in enumerate(steps, 1):
        pdf.numbered(i, en)
        pdf.ar_text(ar, size=9)
        pdf.space(1)

    pdf.section('متى تستخدم', 'When to Use')
    pdf.bullet('When you feel dissociated or "spaced out"')
    pdf.bullet('During flashbacks or intrusive memories')
    pdf.bullet('When anxiety escalates quickly')
    pdf.bullet('In any overwhelming situation')
    pdf.space(2)

    pdf.ar_bullet('عندما تشعر بالانفصال عن الواقع')
    pdf.ar_bullet('أثناء الذكريات المفاجئة')
    pdf.ar_bullet('عند تصاعد القلق بسرعة')
    pdf.space(3)

    pdf.section('متى لا تستخدم', 'When NOT to Use')
    pdf.bullet('If it increases your distress (stop and try something else)')
    pdf.bullet('If you are in immediate physical danger (prioritize safety)')
    pdf.bullet('If sensory input is itself triggering (e.g., loud environments)')

    pdf.warning_box(
        'إذا زادت هذه التقنية من ضيقك، توقف فوراً واطلب الدعم',
        'If this technique increases distress, stop immediately and seek support.'
    )
    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 2: Breathing Technique Card
# ══════════════════════════════════════════════════════════
def pdf_02():
    pdf = PDFBuilder('trc-02-breathing-technique-card.pdf',
                     'A52 Breathing Technique (5-2 Pattern)',
                     'تقنية التنفس A52 (نمط 5-2)')
    pdf.start()
    pdf.title()

    pdf.section('تعرفة التقنية', 'What is A52 Breathing?')
    pdf.ar_text('تقنية التنفس A52 هي نمط تنفس منظّم يساعد على تنظيم الجهاز العصبي.')
    pdf.en_text('The A52 (5-2) breathing pattern is a structured breathing technique that helps regulate your nervous system by extending the exhale, which activates the parasympathetic (calming) response.')
    pdf.space(3)

    pdf.section('النمط', 'The Pattern')
    pdf.numbered(1, 'INHALE slowly through the nose for 5 counts')
    pdf.numbered(2, 'HOLD gently for 2 counts')
    pdf.numbered(3, 'EXHALE slowly through the mouth for 7 counts')
    pdf.numbered(4, 'HOLD empty for 2 counts')
    pdf.numbered(5, 'Repeat for 3-5 cycles')
    pdf.space(2)

    pdf.section('التوقيت', 'Timing Guide')
    pdf.draw_table(
        ['Phase', 'Duration', 'Action'],
        [
            ['Inhale', '5 counts', 'Slow nose breath in'],
            ['Hold', '2 counts', 'Gentle pause'],
            ['Exhale', '7 counts', 'Slow mouth breath out'],
            ['Hold', '2 counts', 'Pause before next cycle'],
            ['Cycles', '3-5 total', 'Build up gradually'],
        ],
        [40*mm, 30*mm, 80*mm]
    )

    pdf.section('موانع الاستعمال', 'Contraindications')
    pdf.bullet('Do NOT use if you have severe asthma without medical clearance')
    pdf.bullet('Stop if you feel dizzy, lightheaded, or more anxious')
    pdf.bullet('Not recommended during acute panic if breath-holding worsens symptoms')
    pdf.bullet('Modify counts if 5-2-7-2 is too long (try 3-1-5-1)')
    pdf.space(2)

    pdf.ar_bullet('لا تستخدم إذا كنت تعاني من ربو شديد بدون موافقة طبية')
    pdf.ar_bullet('توقف إذا شعرت بدوخة أو زيادة القلق')

    pdf.warning_box(
        'إذا شعرت بدوخة أو ضيق، قلل المدة أو توقف',
        'If you feel dizzy or distressed, reduce counts or stop.'
    )
    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 3: Safe Place Journal
# ══════════════════════════════════════════════════════════
def pdf_03():
    pdf = PDFBuilder('trc-03-safe-place-journal.pdf',
                     'Safe Place Journal',
                     'دفتر المكان الآمن')
    pdf.start()
    pdf.title()

    pdf.section('تعرفة', 'About This Journal')
    pdf.ar_text('يساعدك دفتر المكان الآمن على بناء وتعزيز مكان آمن داخلي يمكنك اللجوء إليه.')
    pdf.en_text('This journal helps you build and reinforce an internal safe place you can retreat to when overwhelmed. Use all five senses to make it vivid and real.')
    pdf.space(3)

    pdf.section('المحفزات الحسية الخمس', 'Five Sense Prompts')
    pdf.bold_en_text('SIGHT — What do you see in your safe place?')
    pdf.ar_text(':بصر — ماذا ترى في مكانك الآمن؟', size=9)
    pdf.space(1)
    pdf.bold_en_text('SOUND — What sounds surround you?')
    pdf.ar_text(':سمع — ما الأصوات من حولك؟', size=9)
    pdf.space(1)
    pdf.bold_en_text('TOUCH — What can you feel against your skin?')
    pdf.ar_text(':لمس — ماذا تشعر على بشرتك؟', size=9)
    pdf.space(1)
    pdf.bold_en_text('SMELL — What scents are present?')
    pdf.ar_text(':شم — ما الروائح الموجودة؟', size=9)
    pdf.space(1)
    pdf.bold_en_text('TASTE — Is there a taste associated with this place?')
    pdf.ar_text(':تذوق — هل هناك طعم مرتبط بهذا المكان؟', size=9)
    pdf.space(3)

    pdf.section('مساحة للكتابة', 'Writing Space')
    pdf.en_text('Describe your safe place in detail below:')
    pdf.draw_lines(8, "My safe place... / مكاني الآمن...")
    pdf.new_page()

    pdf.section('متى تعود لزيارة المكان الآمن', 'When to Revisit Your Safe Place')
    pdf.bullet('Before and after trauma processing work')
    pdf.bullet('When you notice your "window of tolerance" narrowing')
    pdf.bullet('At the start and end of each therapy session')
    pdf.bullet('When transitioning between daily tasks and rest')
    pdf.bullet('Any time you feel the need for a moment of calm')
    pdf.space(2)

    pdf.ar_bullet('قبل وبعد عمل معالجة الصدمة')
    pdf.ar_bullet('عندما تلاحظ ضيق نافذة التحمل')
    pdf.ar_bullet('في بداية ونهاية كل جلسة علاجية')

    pdf.warning_box(
        'المكان الآمن ليس بديلاً عن المساعدة المهنية في الأزمات',
        'Your safe place is not a substitute for professional help in crisis.'
    )
    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 4: Body Scan Guide
# ══════════════════════════════════════════════════════════
def pdf_04():
    pdf = PDFBuilder('trc-04-body-scan-guide.pdf',
                     'Body Scan Guide',
                     'دليل مسح الجسد')
    pdf.start()
    pdf.title()

    pdf.section('تعرفة', 'About Body Scanning')
    pdf.ar_text('مسح الجسد هو تقنية انتباهية تساعدك على ملاحظة الإحساسات في جسدك من الرأس إلى القدمين.')
    pdf.en_text('A body scan is a mindfulness technique that helps you notice sensations in your body from head to feet. It builds body awareness and helps identify where you hold tension.')
    pdf.space(3)

    pdf.section('تسلسل المسح', 'Scan Sequence (Head → Feet)')
    areas = [
        ('Crown of head — notice pressure, temperature', 'قمة الرأس — لاحظ الضغط والحرارة'),
        ('Forehead and temples — tension, tightness', 'الجبهة والصدغين — التوتر والشد'),
        ('Jaw and mouth — clenching, relaxation', 'الفم والفك — الضغط والاسترخاء'),
        ('Neck and shoulders — weight, stiffness', 'الرقبة والكتفين — الثقل والتيب'),
        ('Chest and upper back — breathing quality', 'الصدر وأعلى الظهر — جودة التنفس'),
        ('Arms and hands — temperature, tingling', 'الذراعان واليدان — الحرارة والوخز'),
        ('Abdomen — tightness, butterflies, calm', 'البطن — الشد والفراشات والهدوء'),
        ('Hips and pelvis — holding, grounding', 'الوركان والحوض — الإمساك والتأريض'),
        ('Legs and knees — stability, weight', 'الساقان والركبتان — الثبات والثقل'),
        ('Feet and toes — connection to ground', ' القدمان وأصابع القدمين — الاتصال بالأرض'),
    ]
    for i, (en, ar) in enumerate(areas, 1):
        pdf.numbered(i, en)
        pdf.ar_text(ar, size=8)
        pdf.space(1)

    pdf.section('خريطة الجسد', 'Body Map Placeholder')
    pdf.en_text('Use the space below to mark areas of tension (T), numbness (N), or pain (P):')
    pdf.draw_lines(4)

    pdf.warning_box(
        'إذا شعرت بالانفصال أثناء المسح، افتح عينيك وحرّك جسدك',
        'If you feel dissociated during the scan, open your eyes and move your body. You can skip any body region that feels too triggering.'
    )
    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 5: Trigger Map Worksheet
# ══════════════════════════════════════════════════════════
def pdf_05():
    pdf = PDFBuilder('trc-05-trigger-map-worksheet.pdf',
                     'Trigger Map Worksheet',
                     'ورقة خريطة المحفزات')
    pdf.start()
    pdf.title()

    pdf.section('تعرفة', 'About This Worksheet')
    pdf.ar_text('تساعدك خريطة المحفزات على تحديد أنماط استجابتك للمحفزات وتطوير استراتيجيات التعامل.')
    pdf.en_text('This worksheet helps you identify patterns in how you respond to triggers and develop coping strategies. Fill in each row when you notice a triggered response.')
    pdf.space(3)

    pdf.section('قالب فارغ', 'Blank Template')
    pdf.draw_table(
        ['Trigger', 'Body Response', 'Emotion', 'Impulse', 'What Helped'],
        [
            ['e.g., loud noise', 'tension, heartbeat', 'fear, anger', 'run, hide', 'grounding'],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
        ],
        [35*mm, 32*mm, 28*mm, 28*mm, 32*mm]
    )

    pdf.section('تعليمات', 'Instructions')
    pdf.numbered(1, 'Notice when something triggers a strong reaction')
    pdf.numbered(2, 'Write what happened (the trigger)')
    pdf.numbered(3, 'Notice where in your body you feel the response')
    pdf.numbered(4, 'Name the emotion(s) that arise')
    pdf.numbered(5, 'Notice any impulse to act (fight, flight, freeze, fawn)')
    pdf.numbered(6, 'Afterward, note what helped you regulate')
    pdf.space(2)

    pdf.ar_bullet('لاحظ متى يثير شيء ما رد فعل قوي')
    pdf.ar_bullet('اكتب ما حدث (المحفز)')
    pdf.ar_bullet('لاحظ أين في جسدك تشعر بالاستجابة')

    pdf.warning_box(
        'لا تدفع نفسك لملء هذه الورقة إذا كانت تسبب ضيقاً شديداً',
        'Do not push yourself to fill this out if it causes severe distress.'
    )
    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 6: Safety Plan Card
# ══════════════════════════════════════════════════════════
def pdf_06():
    pdf = PDFBuilder('trc-06-safety-plan-card.pdf',
                     'Safety Plan Card',
                     'بطاقة خطة السلامة')
    pdf.start()
    pdf.title()

    pdf.section('خطوات خطة السلامة', 'Safety Plan Steps')
    pdf.space(2)

    pdf.bold_en_text('Step 1: Warning Signs / علامات التحذير')
    pdf.en_text('What thoughts, feelings, or situations tell me a crisis may be developing?')
    pdf.draw_lines(3)
    pdf.space(2)

    pdf.bold_en_text('Step 2: Internal Coping / التعامل الداخلي')
    pdf.en_text('Things I can do on my own to take my mind off problems (without contacting someone):')
    pdf.draw_lines(3)
    pdf.space(2)

    pdf.bold_en_text('Step 3: People & Places for Distraction / أشخاص وأماكن للإلهاء')
    pdf.en_text('People and social settings that provide distraction:')
    pdf.draw_lines(3)
    pdf.new_page()

    pdf.bold_en_text('Step 4: People I Can Ask for Help / أشخاص يمكنني طلب المساعدة منهم')
    pdf.en_text('Names and phone numbers:')
    pdf.draw_lines(3)
    pdf.space(2)

    pdf.bold_en_text('Step 5: Professionals & Agencies / محترفون ووكالات')
    pdf.en_text('Therapist, doctor, crisis line, other:')
    pdf.draw_lines(3)
    pdf.space(2)

    pdf.bold_en_text('Step 6: Making the Environment Safe / جعل البيئة آمنة')
    pdf.en_text('Steps to reduce danger (remove means, go to a safe place):')
    pdf.draw_lines(3)
    pdf.space(2)

    pdf.bold_en_text('My Reason for Living / سببي للعيش')
    pdf.en_text('What matters most to me:')
    pdf.draw_lines(2)

    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 7: Regulation Quick Reference
# ══════════════════════════════════════════════════════════
def pdf_07():
    pdf = PDFBuilder('trc-07-regulation-quick-reference.pdf',
                     'Regulation Quick Reference',
                     'مرجع سريع للتنظيم')
    pdf.start()
    pdf.title()

    pdf.section('خريطة الحالة إلى الأداة', 'State → Tool Mapping')
    pdf.en_text('Match your current arousal state to the most effective regulation tool:')
    pdf.space(2)

    pdf.draw_table(
        ['State', 'Signs', 'Best Tool', 'Why'],
        [
            ['OVERWHELMED', 'Can\'t think, dissociated', '5-4-3-2-1 Grounding', 'Senses anchor to present'],
            ['HYPER-aroused', 'Racing heart, anxious', 'A52 Breathing', 'Ext. exhale calms system'],
            ['HYPO-aroused', 'Numb, shut down', 'Orienting + Movement', 'Activates body response'],
            ['ACTIVATED', 'Irritable, on edge', 'A52 + Body Scan', 'Combo regulation'],
            ['FRONTLOAD', 'Before hard work', 'Safe Place Imagery', 'Widens tolerance window'],
            ['AFTERLOAD', 'After hard work', 'Self-compassion ritual', 'Closes processing'],
            ['MIXED', 'Fluctuating states', 'Pattern first, then tool', 'Identify dominant state'],
        ],
        [28*mm, 38*mm, 38*mm, 48*mm]
    )

    pdf.section('قاعدة الأهمية', 'Priority Rule')
    pdf.numbered(1, 'SAFETY FIRST — Always ensure physical safety before regulation')
    pdf.numbered(2, 'GROUND before you PROCESS — Don\'t try to process when overwhelmed')
    pdf.numbered(3, 'Start LOW, go SLOW — Begin with the least intensive intervention')
    pdf.numbered(4, 'TRACK your state — Notice shifts in your window of tolerance')
    pdf.space(2)

    pdf.ar_bullet('السلامة أولاً — تأكد من السلامة الجسدية دائماً')
    pdf.ar_bullet('أرّض قبل أن تعالج — لا تحاول المعالجة وأنت مُرهَق')
    pdf.ar_bullet('ابدأ بالخفيف — ابدأ بالتدخل الأخف')

    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 8: Response Patterns Reference
# ══════════════════════════════════════════════════════════
def pdf_08():
    pdf = PDFBuilder('trc-08-response-patterns-reference.pdf',
                     'Trauma Response Patterns',
                     'أنماط الاستجابة للصدمة')
    pdf.start()
    pdf.title()

    pdf.section('الاستجابات الأربع', 'The Four Trauma Responses')
    pdf.en_text('When faced with threat, the nervous system automatically selects a survival response. None is "wrong" — they all serve survival.')
    pdf.space(3)

    # FIGHT
    pdf.bold_en_text('FIGHT / قتال', size=11)
    pdf.bullet('Body: clenched jaw/fists, hot face, raised voice, urge to attack')
    pdf.bullet('Emotions: anger, rage, irritability, defensiveness')
    pdf.bullet('Thoughts: "I need to dominate/control this situation"')
    pdf.bullet('Healing: Physical outlets (boxing, running), assertiveness training')
    pdf.space(2)

    # FLIGHT
    pdf.bold_en_text('FLIGHT / هرب', size=11)
    pdf.bullet('Body: restless legs, shallow breathing, urge to leave, hyper-vigilance')
    pdf.bullet('Emotions: anxiety, fear, panic, urgency')
    pdf.bullet('Thoughts: "I need to get out of here immediately"')
    pdf.bullet('Healing: Safe movement (walking, stretching), gradual exposure')
    pdf.space(2)

    # FREEZE
    pdf.bold_en_text('FREEZE / تجميد', size=11)
    pdf.bullet('Body: stillness, numbness, slow/hold breath, dissociation')
    pdf.bullet('Emotions: numb, blank, detached, hopeless')
    pdf.bullet('Thoughts: "I can\'t move or do anything"')
    pdf.bullet('Healing: Orienting, gentle movement, sensory reconnection')
    pdf.space(2)

    # FAWN
    pdf.bold_en_text('FAWN / تملق', size=11)
    pdf.bullet('Body: compliant posture, smiling despite distress, people-pleasing')
    pdf.bullet('Emotions: guilt, shame, anxiety about others\' reactions')
    pdf.bullet('Thoughts: "If I make them happy, I\'ll be safe"')
    pdf.bullet('Healing: Boundary practice, self-advocacy, recognizing own needs')
    pdf.space(2)

    pdf.section('تذكير مهم', 'Important Reminder')
    pdf.en_text('All four responses are ADAPTATIONS — your nervous system did what it needed to survive. None is a weakness. Recovery means expanding your choices beyond automatic responses.')
    pdf.space(2)
    pdf.ar_text('جميع الاستجابات الأربع هي تكيفات — جهازك العصبي فعل ما يحتاجه للنجاة. لا ضعف في أي منها.')

    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 9: Thought Reframing Worksheet
# ══════════════════════════════════════════════════════════
def pdf_09():
    pdf = PDFBuilder('trc-09-thought-reframing-worksheet.pdf',
                     'Thought Reframing Worksheet',
                     'ورقة إعادة صياغة الأفكار')
    pdf.start()
    pdf.title()

    pdf.section('المثلث المعرفي', 'The Cognitive Triangle')
    pdf.en_text('Thoughts, feelings, and behaviors are interconnected. Changing one can change the others.')
    pdf.space(2)
    pdf.en_text('THOUGHT → FEELING → BEHAVIOR → (reinforces THOUGHT)')
    pdf.space(2)
    pdf.ar_text('فكرة → شعور → سلوك → (يعزز الفكرة)')
    pdf.space(3)

    pdf.section('خطوات إعادة الصياغة', 'Reframing Steps')
    pdf.numbered(1, 'IDENTIFY the automatic thought (What went through your mind?)')
    pdf.numbered(2, 'NAME the emotion it creates and rate intensity (0-10)')
    pdf.numbered(3, 'EXAMINE the evidence (For and against this thought)')
    pdf.numbered(4, 'GENERATE an alternative thought (What would you tell a friend?)')
    pdf.numbered(5, 'RE-RATE the emotion intensity with the new thought')
    pdf.space(3)

    pdf.section('ورقة عمل', 'Practice Worksheet')
    pdf.bold_en_text('Situation / الموقف:')
    pdf.draw_lines(2)
    pdf.bold_en_text('Automatic Thought / الفكرة التلقائية:')
    pdf.draw_lines(2)
    pdf.bold_en_text('Emotion & Intensity (0-10) / الشعور والشدة:')
    pdf.draw_lines(1)
    pdf.bold_en_text('Evidence FOR the thought / أدلة مع الفكرة:')
    pdf.draw_lines(2)
    pdf.bold_en_text('Evidence AGAINST the thought / أدلة ضد الفكرة:')
    pdf.draw_lines(2)
    pdf.bold_en_text('Alternative/Balanced Thought / فكرة بديلة متوازنة:')
    pdf.draw_lines(2)
    pdf.bold_en_text('Re-rated Emotion Intensity / شدة الشعور المعدلة:')
    pdf.draw_lines(1)

    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 10: Shame Recovery Worksheet
# ══════════════════════════════════════════════════════════
def pdf_10():
    pdf = PDFBuilder('trc-10-shame-recovery-worksheet.pdf',
                     'Shame Recovery Worksheet',
                     'ورقة التعافي من العار')
    pdf.start()
    pdf.title()

    pdf.section('العرف عن العار', 'Understanding Shame')
    pdf.ar_text('العار هو شعور بأنك معيب في جوهرك، وليس أنك فعلت شيئاً خاطئاً.')
    pdf.en_text('Shame is the feeling that you are fundamentally flawed — not that you did something wrong (that\'s guilt), but that you ARE wrong. Shame thrives in secrecy, silence, and judgment.')
    pdf.space(3)

    pdf.section('رسالة العار', 'Identify the Shame Message')
    pdf.en_text('What does the shame voice say? (e.g., "I\'m unlovable," "I\'m broken," "I deserve this")')
    pdf.draw_lines(2)
    pdf.space(2)

    pdf.section('مصدر العار', 'Trace the Origin')
    pdf.en_text('Where did this message come from? (Family, culture, trauma, relationship)')
    pdf.draw_lines(2)
    pdf.space(2)

    pdf.section('التحقق من الواقع', 'Reality Check')
    pdf.bullet('Is this shame message a FACT or a FEELING?')
    pdf.bullet('Would I say this to a friend in the same situation?')
    pdf.bullet('Whose voice is this really? (Often it\'s an internalized abuser/critic)')
    pdf.space(2)

    pdf.section('استجابة الرحمة الذاتية', 'Self-Compassion Response')
    pdf.en_text('Write a compassionate response to yourself as you would to a dear friend:')
    pdf.draw_lines(4)
    pdf.space(2)

    pdf.en_text('Key self-compassion phrases:')
    pdf.bullet('"This is a moment of suffering. Suffering is part of life."')
    pdf.bullet('"May I be kind to myself in this moment."')
    pdf.bullet('"May I give myself the compassion I need."')
    pdf.space(2)

    pdf.ar_bullet('هذه لحظة معاناة. المعاناة جزء من الحياة.')
    pdf.ar_bullet('لأكن لطيفاً مع نفسي في هذه اللحظة.')

    pdf.warning_box(
        'العار يزدهر في السرية — التحدث عنه مع شخص موثوق يقلل قوته',
        'Shame thrives in secrecy — speaking it to a trusted person reduces its power.'
    )
    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 11: Trauma Journal Guide
# ══════════════════════════════════════════════════════════
def pdf_11():
    pdf = PDFBuilder('trc-11-trauma-journal-guide.pdf',
                     'Trauma Journal Guide',
                     'دليل كتابة يوميات الصدمة')
    pdf.start()
    pdf.title()

    pdf.section('إرشادات الكتابة', 'Journaling Guidelines')
    pdf.numbered(1, 'Write when you feel stable — never when overwhelmed')
    pdf.numbered(2, 'Set a time limit (10-20 min) to prevent flooding')
    pdf.numbered(3, 'You don\'t have to write about the trauma itself')
    pdf.numbered(4, 'Focus on present experience, feelings, and observations')
    pdf.numbered(5, 'There is no "right" way to journal')
    pdf.space(2)

    pdf.section('قواعد السلامة', 'Safety Rules')
    pdf.bullet('STOP if you feel dissociated — ground first, then return')
    pdf.bullet('Never force yourself to write about details you\'re not ready for')
    pdf.bullet('Always close with a calming ritual (see below)')
    pdf.bullet('Keep your journal in a safe, private place')
    pdf.bullet('Consider sharing only with a trusted therapist')
    pdf.space(2)

    pdf.ar_bullet('توقف إذا شعرت بالانفصال — أرّض أولاً ثم عد')
    pdf.ar_bullet('لا تجبر نفسك على الكتابة عن تفاصيل لست مستعداً لها')
    pdf.space(3)

    pdf.section('أنواع المحفزات الستة', 'Six Prompt Types')
    prompts = [
        ('Body Check', 'What am I feeling in my body right now? Where?'),
        ('Emotion Naming', 'Can I name 3 emotions I\'m feeling? Without judgment?'),
        ('Trigger Log', 'What triggered me today? What helped?'),
        ('Safe Place', 'Describe my safe place in vivid sensory detail.'),
        ('Strengths', 'What did I survive today? What am I proud of?'),
        ('Future Self', 'What would my healed self say to me right now?'),
    ]
    for i, (name, desc) in enumerate(prompts, 1):
        pdf.numbered(i, f'{name}: {desc}')
    pdf.space(3)

    pdf.section('طقوس الإغلاق', 'Closing Ritual')
    pdf.en_text('After each journaling session, complete these steps to transition out:')
    pdf.numbered(1, 'Put down the pen and take 3 slow breaths')
    pdf.numbered(2, 'Look around and name 3 things you can see (orient)')
    pdf.numbered(3, 'Place both feet on the ground and feel the support')
    pdf.numbered(4, 'Say: "I am safe now. I am in the present."')
    pdf.numbered(5, 'Do something nurturing (tea, walk, music)')

    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# PDF 12: EFT Self-Help Worksheet
# ══════════════════════════════════════════════════════════
def pdf_12():
    pdf = PDFBuilder('trc-12-eft-self-help-worksheet.pdf',
                     'EFT (Tapping) Self-Help Worksheet',
                     'ورقة المساعدة الذاتية لتقنية الت tapping')
    pdf.start()
    pdf.title()

    pdf.section('تعرفة', 'What is EFT?')
    pdf.ar_text('تقنية التحرر العاطفي (EFT) تجمع بين تحفيز نقاط الوخز الإبرية والكلام عن المشاعر.')
    pdf.en_text('Emotional Freedom Techniques (EFT) combines tapping on acupuncture points while voicing distress. It can reduce the intensity of difficult emotions.')
    pdf.space(3)

    pdf.section('نقاط النق التسعة', 'The 9 Tapping Points')
    points = [
        ('KC', 'Karate Chop', 'Side of hand, below little finger'),
        ('TH', 'Top of Head', 'Crown of head'),
        ('EB', 'Eyebrow', 'Inner edge of eyebrow'),
        ('SE', 'Side of Eye', 'Outer edge of eye bone'),
        ('UE', 'Under Eye', 'Below eye on cheekbone'),
        ('UN', 'Under Nose', 'Between nose and upper lip'),
        ('CH', 'Chin', 'Midpoint between lower lip and chin'),
        ('CB', 'Collarbone', 'Below collarbone, beside sternum'),
        ('UA', 'Under Arm', '4" below armpit on ribcage'),
    ]
    pdf.draw_table(
        ['Abbr', 'Point', 'Location'],
        [[p[0], p[1], p[2]] for p in points],
        [18*mm, 35*mm, 97*mm]
    )

    pdf.section('عبارة الإعداد', 'Setup Phrase')
    pdf.en_text('Tap KC point 3x while saying: "Even though I have this [problem], I deeply and completely accept myself."')
    pdf.space(2)
    pdf.ar_text('"على الرغم من أن لدي هذه [المشكلة]، فإنني أقبل نفسي بعمق وشمول."')
    pdf.space(3)

    pdf.section('مقياس SUDS', 'SUDS Scale (Subjective Units of Distress)')
    pdf.draw_table(
        ['SUDS', 'Level', 'Description'],
        [
            ['0', 'No distress', 'Completely calm'],
            ['1-2', 'Minimal', 'Slight discomfort'],
            ['3-4', 'Mild', 'Noticeable but manageable'],
            ['5-6', 'Moderate', 'Halfway — clearly distressed'],
            ['7-8', 'Severe', 'Strong distress, hard to function'],
            ['9-10', 'Extreme', 'Overwhelming, can\'t think clearly'],
        ],
        [18*mm, 28*mm, 104*mm]
    )

    pdf.section('جدول التتبع', 'Tapping Tracking Table')
    pdf.draw_table(
        ['Before SUDS', 'Issue/Setup', 'After SUDS', 'Shift?'],
        [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
        ],
        [28*mm, 55*mm, 28*mm, 40*mm]
    )

    pdf.warning_box(
        'EFT ليس بديلاً عن العلاج المهني. استخدمه كأداة مساعدة فقط',
        'EFT is not a substitute for professional therapy. Use as a complementary tool only.'
    )
    pdf.crisis_box()
    return pdf.finish()


# ══════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════
if __name__ == '__main__':
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    generators = [
        pdf_01, pdf_02, pdf_03, pdf_04, pdf_05, pdf_06,
        pdf_07, pdf_08, pdf_09, pdf_10, pdf_11, pdf_12,
    ]
    print(f'Generating {len(generators)} TRC PDF companions...')
    for gen in generators:
        try:
            path = gen()
            size = os.path.getsize(path)
            print(f'  ✓ {os.path.basename(path)} ({size:,} bytes)')
        except Exception as e:
            print(f'  ✗ {gen.__name__} FAILED: {e}')
    total = sum(os.path.getsize(f) for f in [os.path.join(OUTPUT_DIR, f) for f in os.listdir(OUTPUT_DIR)] if os.path.isfile(f))
    count = len([f for f in os.listdir(OUTPUT_DIR) if f.endswith('.pdf')])
    print(f'\nDone: {count} PDFs, {total:,} total bytes')
