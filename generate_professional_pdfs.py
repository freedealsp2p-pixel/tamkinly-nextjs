#!/usr/bin/env python3
"""
Tamkinly Identity Recode Planner - Professional PDF Generator
Generates 6 professional PDF worksheets with Tamkinly branding
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Image, KeepTogether, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.graphics.shapes import Drawing, Rect, Circle, Line
from reportlab.graphics.charts.barcharts import VerticalBarChart
import os

# Colors - Tamkinly Brand
PRIMARY_DARK = HexColor('#0F1C2E')
PRIMARY_GREEN = HexColor('#3DD4B0')
PRIMARY_TEAL = HexColor('#1F6F78')
LIGHT_GRAY = HexColor('#F6F8FA')
MEDIUM_GRAY = HexColor('#8A94A6')
DARK_TEXT = HexColor('#2B2E34')
RED_ACCENT = HexColor('#E57373')
BLUE_ACCENT = HexColor('#64B5F6')
ORANGE_ACCENT = HexColor('#FFB74D')
PURPLE_ACCENT = HexColor('#BA68C8')

# Register fonts
FONT_PATHS = {
    'Times': '/usr/share/fonts/truetype/english/Times-New-Roman.ttf',
    'SimHei': '/usr/share/fonts/truetype/chinese/SimHei.ttf'
}

try:
    pdfmetrics.registerFont(TTFont('Times', FONT_PATHS['Times']))
    pdfmetrics.registerFont(TTFont('SimHei', FONT_PATHS['SimHei']))
    registerFontFamily('Times', normal='Times', bold='Times')
except:
    pass

# Styles
def get_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName='Times',
        fontSize=36,
        leading=44,
        alignment=TA_CENTER,
        textColor=PRIMARY_DARK,
        spaceAfter=20
    ))
    
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName='Times',
        fontSize=18,
        leading=24,
        alignment=TA_CENTER,
        textColor=PRIMARY_TEAL,
        spaceAfter=30
    ))
    
    styles.add(ParagraphStyle(
        name='SectionTitle',
        fontName='Times',
        fontSize=18,
        leading=24,
        alignment=TA_LEFT,
        textColor=PRIMARY_DARK,
        spaceBefore=20,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='SubsectionTitle',
        fontName='Times',
        fontSize=14,
        leading=18,
        alignment=TA_LEFT,
        textColor=PRIMARY_TEAL,
        spaceBefore=15,
        spaceAfter=8
    ))
    
    # Override existing BodyText style
    styles['BodyText'].fontName = 'Times'
    styles['BodyText'].fontSize = 11
    styles['BodyText'].leading = 16
    styles['BodyText'].alignment = TA_JUSTIFY
    styles['BodyText'].textColor = DARK_TEXT
    styles['BodyText'].spaceAfter = 10
    
    styles.add(ParagraphStyle(
        name='QuestionText',
        fontName='Times',
        fontSize=11,
        leading=15,
        alignment=TA_LEFT,
        textColor=DARK_TEXT,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='PromptText',
        fontName='Times',
        fontSize=10,
        leading=14,
        alignment=TA_LEFT,
        textColor=MEDIUM_GRAY,
        fontStyle='italic'
    ))
    
    styles.add(ParagraphStyle(
        name='FooterText',
        fontName='Times',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=MEDIUM_GRAY
    ))
    
    return styles

def create_header(canvas, doc, title):
    """Create page header with logo and title"""
    canvas.saveState()
    
    # Header background
    canvas.setFillColor(PRIMARY_DARK)
    canvas.rect(0, A4[1] - 2*cm, A4[0], 2*cm, fill=1, stroke=0)
    
    # Green accent line
    canvas.setStrokeColor(PRIMARY_GREEN)
    canvas.setLineWidth(3)
    canvas.line(0, A4[1] - 2*cm, A4[0], A4[1] - 2*cm)
    
    # Title
    canvas.setFillColor(white)
    canvas.setFont('Times', 14)
    canvas.drawString(1.5*cm, A4[1] - 1.3*cm, title)
    
    # Page number
    canvas.setFillColor(MEDIUM_GRAY)
    canvas.setFont('Times', 10)
    canvas.drawRightString(A4[0] - 1.5*cm, 1*cm, f"Page {doc.page}")
    
    canvas.restoreState()

def create_cover_page(story, styles, title, subtitle, description):
    """Create professional cover page"""
    story.append(Spacer(1, 3*cm))
    
    # Logo placeholder (colored rectangle)
    logo_drawing = Drawing(100, 100)
    logo_drawing.add(Rect(0, 0, 100, 100, fillColor=PRIMARY_GREEN, strokeColor=None, rx=15, ry=15))
    logo_drawing.add(Circle(50, 50, 30, fillColor=PRIMARY_DARK, strokeColor=None))
    story.append(logo_drawing)
    story.append(Spacer(1, 1*cm))
    
    # Title
    story.append(Paragraph(title, styles['CoverTitle']))
    story.append(Paragraph(subtitle, styles['CoverSubtitle']))
    
    # Description
    story.append(Spacer(1, 1*cm))
    desc_style = ParagraphStyle(
        'DescStyle',
        fontName='Times',
        fontSize=12,
        leading=18,
        alignment=TA_CENTER,
        textColor=DARK_TEXT
    )
    story.append(Paragraph(description, desc_style))
    
    story.append(Spacer(1, 2*cm))
    
    # Brand info
    brand_style = ParagraphStyle(
        'BrandStyle',
        fontName='Times',
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        textColor=MEDIUM_GRAY
    )
    story.append(Paragraph("Identity Recode Planner", brand_style))
    story.append(Paragraph("A Tamkinly Transformation System", brand_style))
    
    story.append(PageBreak())

def create_section_header(story, styles, title, description=None):
    """Create section header with colored background"""
    # Create a table for the header
    header_data = [[Paragraph(title, ParagraphStyle(
        'HeaderStyle',
        fontName='Times',
        fontSize=16,
        leading=20,
        textColor=white,
        alignment=TA_LEFT
    ))]]
    
    header_table = Table(header_data, colWidths=[17*cm])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PRIMARY_DARK),
        ('LEFTPADDING', (0, 0), (-1, -1), 15),
        ('RIGHTPADDING', (0, 0), (-1, -1), 15),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('ROUNDEDCORNERS', [8, 8, 8, 8]),
    ]))
    
    story.append(header_table)
    story.append(Spacer(1, 0.3*cm))
    
    if description:
        story.append(Paragraph(description, styles['BodyText']))
        story.append(Spacer(1, 0.3*cm))

def create_rating_table(story, styles, questions, title=None):
    """Create a rating table with 1-10 scale"""
    if title:
        story.append(Paragraph(title, styles['SubsectionTitle']))
    
    # Table header
    header = ['Question', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    data = [header]
    
    # Add questions
    for q in questions:
        row = [Paragraph(q, styles['QuestionText'])] + ['☐'] * 10
        data.append(row)
    
    table = Table(data, colWidths=[10*cm] + [0.7*cm] * 10)
    table.setStyle(TableStyle([
        # Header styling
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_TEAL),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Times'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        
        # Body styling
        ('FONTNAME', (0, 1), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('ALIGN', (1, 1), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        
        # Alternating row colors
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        
        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('LINEBELOW', (0, 0), (-1, 0), 2, PRIMARY_GREEN),
        
        # Padding
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    
    story.append(table)
    story.append(Spacer(1, 0.5*cm))

def create_text_field(story, styles, label, lines=3):
    """Create a text field with lines"""
    story.append(Paragraph(label, styles['QuestionText']))
    
    # Create lined area
    line_data = [['_' * 80] for _ in range(lines)]
    line_table = Table(line_data, colWidths=[17*cm])
    line_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('TEXTCOLOR', (0, 0), (-1, -1), MEDIUM_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    
    story.append(line_table)
    story.append(Spacer(1, 0.3*cm))

def create_checklist(story, styles, items, title=None):
    """Create a checklist"""
    if title:
        story.append(Paragraph(title, styles['SubsectionTitle']))
    
    for item in items:
        check_style = ParagraphStyle(
            'CheckStyle',
            fontName='Times',
            fontSize=11,
            leading=16,
            textColor=DARK_TEXT
        )
        story.append(Paragraph(f"☐ {item}", check_style))
        story.append(Spacer(1, 4))

def create_slider_field(story, styles, label, min_label="", max_label=""):
    """Create a visual slider/rating field"""
    story.append(Paragraph(label, styles['QuestionText']))
    
    # Create slider visualization
    slider_data = [[min_label] + ['○'] * 10 + [max_label]]
    slider_table = Table(slider_data, colWidths=[1.5*cm] + [1.2*cm] * 10 + [1.5*cm])
    slider_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (-1, -1), MEDIUM_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    
    story.append(slider_table)
    story.append(Spacer(1, 0.3*cm))

# ============================================
# PDF GENERATORS FOR EACH WORKSHEET
# ============================================

def generate_executive_manual(output_path):
    """Generate Executive Manual PDF"""
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=1.5*cm,
        rightMargin=1.5*cm,
        topMargin=2.5*cm,
        bottomMargin=2*cm,
        title="Executive Manual",
        author="Tamkinly",
        subject="Identity Recode Planner - Executive Manual"
    )
    
    styles = get_styles()
    story = []
    
    # Cover
    create_cover_page(
        story, styles,
        "Executive Manual",
        "Identity Recode Planner",
        "A 30-Day Guided Journey for Identity Alignment,<br/>Behavioral Recalibration, and Self-Authored Change"
    )
    
    # Purpose
    create_section_header(story, styles, "Purpose of the System")
    story.append(Paragraph(
        "This planner is designed to help a person move from passive reaction to intentional self-direction. "
        "The core assumption is simple: lasting change becomes more stable when it is rooted in identity, "
        "supported by environment, and reinforced through repeated evidence.",
        styles['BodyText']
    ))
    story.append(Spacer(1, 0.3*cm))
    
    # What it does
    create_section_header(story, styles, "What This System Does")
    create_checklist(story, styles, [
        "Clarifies the current identity baseline.",
        "Identifies the gap between present behavior and desired identity.",
        "Audits the environment for support and friction.",
        "Analyzes decision patterns.",
        "Tracks evidence of change daily.",
        "Measures progress over 30 days."
    ])
    
    # Core Principles
    create_section_header(story, styles, "Core Principles")
    principles = [
        "Repeated behavior creates evidence.",
        "Evidence shapes self-concept.",
        "Environment shapes repetition.",
        "Decisions reveal identity.",
        "Emotional regulation protects consistency.",
        "Progress becomes visible when it is recorded."
    ]
    for i, p in enumerate(principles, 1):
        story.append(Paragraph(f"<b>{i}.</b> {p}", styles['BodyText']))
    
    story.append(PageBreak())
    
    # 30-Day Path
    create_section_header(story, styles, "The 30-Day Path")
    
    phases = [
        ("Phase 1: Observe", "Days 1-7", "Capture baseline, values, habits, triggers, and environment."),
        ("Phase 2: Intervene", "Days 8-14", "Adjust cues, reduce friction, and improve decision structure."),
        ("Phase 3: Evidence", "Days 15-21", "Track repeated actions and emerging identity proof."),
        ("Phase 4: Stabilize", "Days 22-30", "Review results, reinforce wins, and refine the next cycle.")
    ]
    
    for phase, days, desc in phases:
        story.append(Paragraph(f"<b>{phase}</b> ({days})", styles['SubsectionTitle']))
        story.append(Paragraph(desc, styles['BodyText']))
    
    # Rules
    create_section_header(story, styles, "Rules of the Planner")
    rules = [
        "Write honestly, not ideally.",
        "Measure what happened, not what you hoped would happen.",
        "Use evidence before interpretation.",
        "Treat repeated resistance as information, not failure.",
        "Focus on consistency over intensity.",
        "Review the system weekly.",
        "Update the plan based on data."
    ]
    for i, rule in enumerate(rules, 1):
        story.append(Paragraph(f"<b>{i}.</b> {rule}", styles['BodyText']))
    
    story.append(PageBreak())
    
    # Implementation Logic
    create_section_header(story, styles, "Implementation Logic")
    story.append(Paragraph(
        "For each target identity, ask four questions:",
        styles['BodyText']
    ))
    impl_questions = [
        "What does this identity do repeatedly?",
        "What makes that behavior easier or harder?",
        "What decisions support or block it?",
        "What evidence would prove it is becoming real?"
    ]
    for q in impl_questions:
        story.append(Paragraph(f"• {q}", styles['QuestionText']))
    
    # Final Instruction
    create_section_header(story, styles, "Final Instruction")
    story.append(Paragraph(
        "<i>Use this manual as the standard for every worksheet inside the planner. "
        "Each page should help the user answer one question:</i>",
        styles['BodyText']
    ))
    story.append(Paragraph(
        "<b>\"What am I repeatedly proving to myself about who I am becoming?\"</b>",
        ParagraphStyle('FinalQ', fontName='Times', fontSize=14, alignment=TA_CENTER, 
                       textColor=PRIMARY_TEAL, spaceBefore=20)
    ))
    
    doc.build(story)
    print(f"✓ Created: {output_path}")

def generate_identity_baseline(output_path):
    """Generate Identity Baseline Worksheet PDF"""
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=1.5*cm,
        rightMargin=1.5*cm,
        topMargin=2.5*cm,
        bottomMargin=2*cm,
        title="Identity Baseline Worksheet",
        author="Tamkinly",
        subject="Identity Recode Planner - Identity Baseline Worksheet"
    )
    
    styles = get_styles()
    story = []
    
    # Cover
    create_cover_page(
        story, styles,
        "Identity Baseline Worksheet",
        "Identity Recode Planner",
        "To establish a clear, honest snapshot of your current identity<br/>before any transformation work begins."
    )
    
    # Instructions
    create_section_header(story, styles, "Instructions")
    instructions = [
        "Complete this worksheet on Day 1 before starting any other part of the planner.",
        "Answer honestly, not aspirationally.",
        "Use the same version again at the end of the 30-day journey.",
        "Do not edit your answers to make them sound better.",
        "Your goal is clarity, not perfection."
    ]
    for inst in instructions:
        story.append(Paragraph(f"• {inst}", styles['BodyText']))
    
    # Scoring Method
    create_section_header(story, styles, "Scoring Method")
    story.append(Paragraph(
        "For all scaled items, use the following: <b>1</b> = Very low / not true, "
        "<b>5</b> = Neutral / mixed, <b>10</b> = Fully true / highly stable",
        styles['BodyText']
    ))
    story.append(Paragraph("<b>Baseline Rule:</b> If a score feels uncertain, choose the lower score.", 
                           ParagraphStyle('Rule', fontName='Times', fontSize=11, textColor=RED_ACCENT)))
    
    story.append(PageBreak())
    
    # Identity Snapshot
    create_section_header(story, styles, "Section 1: Identity Snapshot")
    create_text_field(story, styles, "How would I describe the identity I am currently living from?", 3)
    create_text_field(story, styles, "What identity do I want to move toward during this journey?", 3)
    
    # Self-Concept
    create_section_header(story, styles, "Section 2: Self-Concept Score")
    questions = [
        "I have a clear sense of who I am.",
        "My behavior usually reflects the person I want to be.",
        "I feel internally consistent across different situations.",
        "I know what matters to me most.",
        "I trust my own judgment more than I used to.",
        "I feel like my life reflects my values.",
        "I can describe myself without confusion or contradiction.",
        "I feel a strong connection between my identity and my daily actions."
    ]
    create_rating_table(story, styles, questions, "Rate each statement from 1 to 10:")
    create_text_field(story, styles, "Self-Concept Score (average): _____", 1)
    
    story.append(PageBreak())
    
    # Value Congruence
    create_section_header(story, styles, "Section 3: Value Alignment")
    create_text_field(story, styles, "What are my top 5 values right now?", 4)
    create_text_field(story, styles, "Which values do I claim to have but do not consistently live?", 2)
    create_slider_field(story, styles, "Value Congruence Score:", "1 = Low", "10 = High")
    
    # Self-Trust
    create_section_header(story, styles, "Section 4: Self-Trust")
    trust_questions = [
        "I keep promises I make to myself.",
        "I follow through on commitments even when I do not feel like it.",
        "I can rely on myself under pressure.",
        "I do not abandon myself when things get difficult.",
        "I trust my decisions after I make them.",
        "I learn from mistakes without collapsing into self-doubt.",
        "I act in ways that strengthen my confidence in myself.",
        "I am becoming a person I can trust."
    ]
    create_rating_table(story, styles, trust_questions, "Rate each statement from 1 to 10:")
    create_text_field(story, styles, "Self-Trust Score (average): _____", 1)
    
    story.append(PageBreak())
    
    # Commitment Consistency
    create_section_header(story, styles, "Section 5: Commitment Consistency")
    commit_questions = [
        "I usually complete what I start.",
        "I do not break my own commitments easily.",
        "My intentions are usually matched by action.",
        "I can stay consistent over time, not just for a few days.",
        "I know how to recover after inconsistency.",
        "I return to my commitments after disruption.",
        "I am building a reputation with myself for consistency.",
        "My daily actions support my long-term direction."
    ]
    create_rating_table(story, styles, commit_questions, "Rate each statement from 1 to 10:")
    create_text_field(story, styles, "What is the most common reason I fail to stay consistent?", 2)
    
    # Decision Quality
    create_section_header(story, styles, "Section 6: Decision Quality")
    decision_questions = [
        "I make decisions that are aligned with my values.",
        "I do not make important decisions purely from emotion.",
        "I think clearly before I commit to action.",
        "I can distinguish between impulse and alignment.",
        "I usually know why I chose what I chose.",
        "My decisions usually support my future self.",
        "I rarely sabotage myself through avoidable choices.",
        "I am becoming more intentional in how I choose."
    ]
    create_rating_table(story, styles, decision_questions, "Rate each statement from 1 to 10:")
    
    story.append(PageBreak())
    
    # Emotional Regulation
    create_section_header(story, styles, "Section 7: Emotional Regulation")
    emotion_questions = [
        "I can stay grounded when I feel overwhelmed.",
        "I can notice my emotions without being controlled by them.",
        "I recover from disappointment without staying stuck.",
        "I can keep moving even when I feel uncomfortable.",
        "I know what triggers emotional reactivity in me.",
        "I can regulate myself without relying on avoidance.",
        "My emotional state does not completely determine my behavior.",
        "I can return to clarity after emotional disruption."
    ]
    create_rating_table(story, styles, emotion_questions, "Rate each statement from 1 to 10:")
    create_text_field(story, styles, "What emotional state most often weakens my identity alignment?", 2)
    
    # Environmental Alignment
    create_section_header(story, styles, "Section 8: Environmental Alignment")
    env_questions = [
        "My environment makes good behavior easy.",
        "My space supports the identity I want to build.",
        "My digital environment is not overly distracting.",
        "The people around me support my direction.",
        "I have access to the resources I need.",
        "My routines are designed to reduce friction.",
        "My surroundings contain useful reminders of who I am becoming.",
        "My environment does not constantly pull me away from my goals."
    ]
    create_rating_table(story, styles, env_questions, "Rate each statement from 1 to 10:")
    
    story.append(PageBreak())
    
    # Summary
    create_section_header(story, styles, "Section 9: Baseline Summary")
    
    summary_data = [
        ['Dimension', 'Score'],
        ['Self-Concept', '_____'],
        ['Value Congruence', '_____'],
        ['Self-Trust', '_____'],
        ['Commitment Consistency', '_____'],
        ['Decision Quality', '_____'],
        ['Emotional Regulation', '_____'],
        ['Environmental Alignment', '_____'],
        ['Average Baseline Score', '_____']
    ]
    
    summary_table = Table(summary_data, colWidths=[10*cm, 5*cm])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_TEAL),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(summary_table)
    
    story.append(Spacer(1, 0.5*cm))
    create_text_field(story, styles, "What is the strongest area right now?", 2)
    create_text_field(story, styles, "What is the weakest area right now?", 2)
    create_text_field(story, styles, "What pattern appears across multiple scores?", 2)
    create_text_field(story, styles, "What do I need most in the next 30 days?", 2)
    
    story.append(Spacer(1, 0.5*cm))
    create_text_field(story, styles, "Final Baseline Statement: I am starting from a place where...", 3)
    
    doc.build(story)
    print(f"✓ Created: {output_path}")

def generate_environmental_audit(output_path):
    """Generate Environmental Audit PDF"""
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=1.5*cm,
        rightMargin=1.5*cm,
        topMargin=2.5*cm,
        bottomMargin=2*cm,
        title="Environmental Audit",
        author="Tamkinly",
        subject="Identity Recode Planner - Environmental Audit"
    )
    
    styles = get_styles()
    story = []
    
    # Cover
    create_cover_page(
        story, styles,
        "Environmental Audit",
        "Identity Recode Planner",
        "To identify the environmental conditions that support or interfere<br/>with identity installation, daily consistency, and behavior change."
    )
    
    # Instructions
    create_section_header(story, styles, "Instructions")
    story.append(Paragraph(
        "Evaluate the environment you live in, not the environment you wish you had. "
        "Focus on what is easy, what is difficult, what is visible, and what repeatedly "
        "pulls you away from your intended identity.",
        styles['BodyText']
    ))
    
    # Scoring
    story.append(Paragraph(
        "<b>Scoring:</b> 1 = strongly blocking, 5 = neutral, 10 = strongly supportive",
        styles['BodyText']
    ))
    
    story.append(PageBreak())
    
    # Physical Space
    create_section_header(story, styles, "Section 1: Physical Space")
    physical_questions = [
        "My physical space makes good behavior easy.",
        "My workspace or home setup supports focus.",
        "Important tools are easy to reach.",
        "Unhelpful objects are out of sight or removed.",
        "My space reminds me of the person I am becoming.",
        "My space reduces distraction instead of increasing it.",
        "My physical layout supports my daily routines.",
        "My environment lowers friction for the behaviors I want."
    ]
    create_rating_table(story, styles, physical_questions)
    create_text_field(story, styles, "What is the biggest physical obstacle to your transformation?", 2)
    
    # Digital Environment
    create_section_header(story, styles, "Section 2: Digital Environment")
    digital_questions = [
        "My phone and digital devices support my goals.",
        "I am not overexposed to distracting content.",
        "My digital notifications are under control.",
        "My social media use does not undermine my identity goals.",
        "My digital environment contains useful reminders, not only noise.",
        "I can access useful materials without getting lost in distraction.",
        "My digital habits are intentional rather than automatic.",
        "I have reduced unnecessary digital friction and clutter."
    ]
    create_rating_table(story, styles, digital_questions)
    create_text_field(story, styles, "What digital trigger most often weakens your focus?", 2)
    
    story.append(PageBreak())
    
    # Social Circle
    create_section_header(story, styles, "Section 3: Social Circle Alignment")
    social_questions = [
        "The people around me support the identity I am building.",
        "I spend enough time with people who model the behavior I want.",
        "My social circle does not normalize the habits I am trying to leave behind.",
        "I feel understood by at least some of the people around me.",
        "I can maintain my direction even when others do not share it.",
        "My relationships increase my discipline rather than weaken it.",
        "I know which relationships strengthen or weaken my progress.",
        "My social environment supports long-term change."
    ]
    create_rating_table(story, styles, social_questions)
    create_text_field(story, styles, "Which relationship most strongly affects your consistency?", 2)
    
    # Resource Access
    create_section_header(story, styles, "Section 4: Resource Accessibility")
    resource_questions = [
        "I have access to the tools I need to follow through.",
        "My routines are realistic for my current life situation.",
        "Time is allocated for the behaviors I want to build.",
        "I have enough structure to avoid unnecessary confusion.",
        "I know where to begin when I want to act.",
        "My resources reduce hesitation instead of creating it.",
        "I have support systems when motivation is low.",
        "I do not rely on willpower alone."
    ]
    create_rating_table(story, styles, resource_questions)
    create_text_field(story, styles, "What resource is missing or underused?", 2)
    
    story.append(PageBreak())
    
    # Friction Map
    create_section_header(story, styles, "Section 5: Friction Point Identification")
    story.append(Paragraph("Mark each item as: Low friction / Moderate friction / High friction", styles['BodyText']))
    
    friction_items = [
        "Morning routine",
        "Starting focused work",
        "Making healthy choices",
        "Saying no to distraction",
        "Returning after a lapse",
        "Keeping commitments",
        "Logging progress",
        "Ending the day intentionally"
    ]
    
    friction_data = [['Activity', 'Low', 'Moderate', 'High']]
    for item in friction_items:
        friction_data.append([item, '☐', '☐', '☐'])
    
    friction_table = Table(friction_data, colWidths=[8*cm, 2.5*cm, 2.5*cm, 2.5*cm])
    friction_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_TEAL),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(friction_table)
    story.append(Spacer(1, 0.5*cm))
    create_text_field(story, styles, "Where does your environment create the most resistance?", 2)
    
    # Cue Quality
    create_section_header(story, styles, "Section 6: Cue Implementation")
    cue_questions = [
        "My environment contains cues that prompt the right actions.",
        "I have placed reminders where they will be seen.",
        "My cues are tied to specific behaviors, not vague intentions.",
        "My environment makes the next step obvious.",
        "I can tell what to do when I enter a specific space.",
        "My cues reduce decision fatigue.",
        "I am using prompts intentionally, not randomly.",
        "My cues support repetition."
    ]
    create_rating_table(story, styles, cue_questions)
    create_text_field(story, styles, "Which cue should you add, remove, or strengthen?", 2)
    
    story.append(PageBreak())
    
    # Summary
    create_section_header(story, styles, "Section 7: Environmental Summary")
    
    summary_data = [
        ['Section', 'Score'],
        ['Physical Space', '_____'],
        ['Digital Environment', '_____'],
        ['Social Circle', '_____'],
        ['Resource Access', '_____'],
        ['Cue Quality', '_____'],
        ['Overall Environmental Support Score', '_____']
    ]
    
    summary_table = Table(summary_data, colWidths=[10*cm, 5*cm])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_TEAL),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(summary_table)
    
    story.append(Spacer(1, 0.5*cm))
    create_text_field(story, styles, "What is the strongest supportive factor in your environment?", 2)
    create_text_field(story, styles, "What is the strongest blocking factor in your environment?", 2)
    create_text_field(story, styles, "What single environmental change would create the biggest improvement?", 2)
    
    story.append(Spacer(1, 0.5*cm))
    create_text_field(story, styles, "Final Environmental Statement: My environment currently makes it easier to...", 3)
    
    doc.build(story)
    print(f"✓ Created: {output_path}")

def generate_decision_analysis(output_path):
    """Generate Decision Pattern Analysis PDF"""
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=1.5*cm,
        rightMargin=1.5*cm,
        topMargin=2.5*cm,
        bottomMargin=2*cm,
        title="Decision Pattern Analysis",
        author="Tamkinly",
        subject="Identity Recode Planner - Decision Pattern Analysis"
    )
    
    styles = get_styles()
    story = []
    
    # Cover
    create_cover_page(
        story, styles,
        "Decision Pattern Analysis",
        "Identity Recode Planner",
        "To analyze recurring decision habits and identify whether choices<br/>are made from identity, impulse, avoidance, or alignment."
    )
    
    # Instructions
    create_section_header(story, styles, "Instructions")
    instructions = [
        "Log one meaningful decision per day.",
        "Focus on decisions that affected behavior, time, energy, or consistency.",
        "Do not record trivial choices.",
        "The purpose is pattern recognition, not self-judgment."
    ]
    for inst in instructions:
        story.append(Paragraph(f"• {inst}", styles['BodyText']))
    
    story.append(PageBreak())
    
    # Decision Log Template
    create_section_header(story, styles, "Section 1: Decision Log Entry")
    create_text_field(story, styles, "Date and Time:", 1)
    create_text_field(story, styles, "Decision made:", 2)
    create_text_field(story, styles, "Situation/context:", 2)
    create_text_field(story, styles, "What options were available?", 2)
    create_text_field(story, styles, "What did you choose?", 2)
    create_text_field(story, styles, "What happened next?", 2)
    
    story.append(PageBreak())
    
    # Trigger Analysis
    create_section_header(story, styles, "Section 2: Internal Conditions")
    story.append(Paragraph("Rate each statement from 1 to 10:", styles['BodyText']))
    
    trigger_questions = [
        "I was clear-headed when I made this decision.",
        "I was emotionally stable when I made this decision.",
        "I had enough time to think.",
        "I felt pressure or urgency.",
        "I was acting from values rather than impulse.",
        "I felt internally conflicted.",
        "I knew what I was doing and why.",
        "I could have chosen differently if I had paused."
    ]
    create_rating_table(story, styles, trigger_questions)
    create_text_field(story, styles, "What emotional or mental state most influenced this decision?", 2)
    
    # Quality Matrix
    create_section_header(story, styles, "Section 3: Decision Quality Matrix")
    quality_questions = [
        "Value alignment (1-10):",
        "Future usefulness (1-10):",
        "Clarity of reasoning (1-10):",
        "Emotional regulation at the moment (1-10):",
        "Resistance to impulse (1-10):",
        "Consistency with identity goal (1-10):",
        "Consequence awareness (1-10):",
        "Overall decision quality (1-10):"
    ]
    for q in quality_questions:
        create_slider_field(story, styles, q)
    
    story.append(PageBreak())
    
    # Pattern Recognition
    create_section_header(story, styles, "Section 4: Pattern Recognition")
    create_text_field(story, styles, "What pattern appears across this decision and previous decisions?", 3)
    create_text_field(story, styles, "What type of situations most often produce weak decisions?", 2)
    create_text_field(story, styles, "What type of situations most often produce strong decisions?", 2)
    create_text_field(story, styles, "What recurring excuse, assumption, or shortcut appears?", 2)
    create_text_field(story, styles, "Pattern Label (give this pattern a name):", 1)
    
    # Upgrade Protocol
    create_section_header(story, styles, "Section 5: Decision Improvement Rule")
    create_text_field(story, styles, "What should you do differently next time?", 2)
    create_text_field(story, styles, "If the same situation happens again, your rule is:", 2)
    create_text_field(story, styles, "One pause you should insert before acting is:", 2)
    create_text_field(story, styles, "One question you should ask before deciding is:", 2)
    create_text_field(story, styles, "One boundary you should use to protect future decisions is:", 2)
    
    story.append(PageBreak())
    
    # Summary
    create_section_header(story, styles, "Section 6: Decision Summary")
    
    summary_data = [
        ['Metric', 'Score'],
        ['Clarity', '_____'],
        ['Emotional Stability', '_____'],
        ['Value Alignment', '_____'],
        ['Future Alignment', '_____'],
        ['Self-Control', '_____'],
        ['Overall Decision Quality', '_____']
    ]
    
    summary_table = Table(summary_data, colWidths=[10*cm, 5*cm])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_TEAL),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(summary_table)
    
    story.append(Spacer(1, 0.5*cm))
    create_text_field(story, styles, "What decision pattern is becoming visible?", 2)
    create_text_field(story, styles, "What is one decision habit you need to stop reinforcing?", 2)
    create_text_field(story, styles, "What is one decision habit you need to strengthen?", 2)
    
    story.append(Spacer(1, 0.5*cm))
    create_text_field(story, styles, "Final Decision Statement: My decisions are currently teaching me that...", 3)
    
    doc.build(story)
    print(f"✓ Created: {output_path}")

def generate_evidence_tracking(output_path):
    """Generate Evidence Tracking System PDF"""
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=1.5*cm,
        rightMargin=1.5*cm,
        topMargin=2.5*cm,
        bottomMargin=2*cm,
        title="Evidence Tracking System",
        author="Tamkinly",
        subject="Identity Recode Planner - Evidence Tracking System"
    )
    
    styles = get_styles()
    story = []
    
    # Cover
    create_cover_page(
        story, styles,
        "Evidence Tracking System",
        "Identity Recode Planner",
        "To record observable proof that identity-aligned behavior<br/>is happening in real life, not only in intention or self-description."
    )
    
    # Instructions
    create_section_header(story, styles, "Instructions")
    instructions = [
        "Log one meaningful piece of evidence per day.",
        "Use concrete facts only.",
        "Do not write opinions unless they are tied to observable behavior.",
        "Treat this as a record of proof, not a journal of mood.",
        "Review every 7 days."
    ]
    for inst in instructions:
        story.append(Paragraph(f"• {inst}", styles['BodyText']))
    
    story.append(PageBreak())
    
    # Daily Action Log
    create_section_header(story, styles, "Section 1: Daily Action Log")
    create_text_field(story, styles, "Date:", 1)
    create_text_field(story, styles, "Planned action:", 2)
    story.append(Paragraph("Action completed: ☐ Yes  ☐ No", styles['QuestionText']))
    create_text_field(story, styles, "If yes, what was done?", 2)
    create_text_field(story, styles, "If no, what prevented it?", 2)
    create_text_field(story, styles, "Time started: ________ Time finished: ________", 1)
    create_slider_field(story, styles, "Quality of completion (1-10):")
    
    # Behavioral Evidence Record
    create_section_header(story, styles, "Section 2: Behavioral Evidence Record")
    story.append(Paragraph("For each item, write one concrete example:", styles['BodyText']))
    
    evidence_types = [
        "Evidence of self-trust:",
        "Evidence of commitment consistency:",
        "Evidence of emotional regulation:",
        "Evidence of decision quality:",
        "Evidence of environmental discipline:",
        "Evidence of value congruence:",
        "Evidence of agency:",
        "Evidence of identity alignment:"
    ]
    
    for ev in evidence_types:
        create_text_field(story, styles, ev, 2)
    
    create_slider_field(story, styles, "Evidence Strength Score (1-10):")
    
    story.append(PageBreak())
    
    # Progress Timeline
    create_section_header(story, styles, "Section 3: Progress Timeline")
    
    for week in range(1, 5):
        create_text_field(story, styles, f"Week {week} evidence summary:", 3)
    
    create_text_field(story, styles, "What improved over time?", 2)
    create_text_field(story, styles, "What remained unstable?", 2)
    
    # Consistency Metrics
    create_section_header(story, styles, "Section 4: Consistency Analysis")
    consistency_questions = [
        "I completed what I planned most days.",
        "I returned after missed days.",
        "My actions became more regular over time.",
        "I needed less effort to stay on track.",
        "I behaved more like the identity I chose.",
        "I showed up even when motivation was low.",
        "I tracked my behavior honestly.",
        "I can trust my consistency more than before."
    ]
    create_rating_table(story, styles, consistency_questions, "Rate each statement from 1 to 10:")
    
    story.append(PageBreak())
    
    # Milestones
    create_section_header(story, styles, "Section 5: Transformation Milestones")
    story.append(Paragraph("Mark the milestone when it happens:", styles['BodyText']))
    
    milestones = [
        "First completed action",
        "First full week of consistency",
        "First recovery after a lapse",
        "First visible identity-aligned decision",
        "First environmental improvement",
        "First emotional regulation win",
        "First moment of self-trust",
        "First week with no major avoidance pattern"
    ]
    
    for m in milestones:
        story.append(Paragraph(f"☐ {m}", styles['QuestionText']))
        story.append(Spacer(1, 4))
    
    create_text_field(story, styles, "Which milestone mattered most to you?", 2)
    
    # Identity Implication
    create_section_header(story, styles, "Section 6: Identity Implication")
    create_text_field(story, styles, "What is the evidence teaching you about who you are becoming?", 2)
    create_text_field(story, styles, "What identity is being strengthened by these actions?", 2)
    create_text_field(story, styles, "What old identity is losing power?", 2)
    create_text_field(story, styles, "What conclusion can you now make with confidence?", 2)
    
    story.append(PageBreak())
    
    # Weekly Review
    create_section_header(story, styles, "Section 7: Weekly Review")
    create_text_field(story, styles, "What was the strongest evidence this week?", 2)
    create_text_field(story, styles, "What was the weakest area this week?", 2)
    create_text_field(story, styles, "What pattern do you see in your follow-through?", 2)
    create_text_field(story, styles, "What adjustment should you make next week?", 2)
    create_text_field(story, styles, "What evidence would you need to see to feel more confident?", 2)
    
    create_slider_field(story, styles, "Weekly Evidence Score (1-10):")
    create_text_field(story, styles, "Weekly Summary Statement: This week I proved that...", 3)
    
    doc.build(story)
    print(f"✓ Created: {output_path}")

def generate_progress_dashboard(output_path):
    """Generate Progress Dashboard Guide PDF"""
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=1.5*cm,
        rightMargin=1.5*cm,
        topMargin=2.5*cm,
        bottomMargin=2*cm,
        title="Progress Dashboard Guide",
        author="Tamkinly",
        subject="Identity Recode Planner - Progress Dashboard Guide"
    )
    
    styles = get_styles()
    story = []
    
    # Cover
    create_cover_page(
        story, styles,
        "Progress Dashboard Guide",
        "Identity Recode Planner",
        "To visually display progress, consistency, and identity alignment<br/>across the 30-day journey."
    )
    
    # Instructions
    create_section_header(story, styles, "Instructions")
    instructions = [
        "Update the dashboard once per day or once per week.",
        "Use the same scoring system throughout the journey.",
        "Keep the dashboard simple, visible, and easy to review.",
        "Do not use too many metrics."
    ]
    for inst in instructions:
        story.append(Paragraph(f"• {inst}", styles['BodyText']))
    
    story.append(Paragraph(
        "<b>Recommended Dashboard Rule:</b> Track a few meaningful indicators consistently "
        "rather than many indicators inconsistently.",
        styles['BodyText']
    ))
    
    story.append(PageBreak())
    
    # Core Metrics
    create_section_header(story, styles, "Section 1: Core Dashboard Metrics")
    story.append(Paragraph("Track the following scores weekly:", styles['BodyText']))
    
    metrics = [
        "Identity Alignment Score",
        "Self-Trust Score",
        "Commitment Consistency Score",
        "Decision Quality Score",
        "Emotional Regulation Score",
        "Environmental Alignment Score",
        "Evidence Strength Score",
        "Agency Score"
    ]
    
    metrics_data = [['Metric', 'Score']]
    for m in metrics:
        metrics_data.append([m, '_____'])
    
    metrics_table = Table(metrics_data, colWidths=[12*cm, 4*cm])
    metrics_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_TEAL),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(metrics_table)
    
    # Baseline vs Current
    create_section_header(story, styles, "Section 2: Baseline vs Current Comparison")
    story.append(Paragraph("For each metric, record and compare:", styles['BodyText']))
    
    comparison_data = [
        ['Metric', 'Baseline', 'Current', 'Change', 'Direction'],
        ['Self-Trust', '_____', '_____', '_____', '↑ / ↓ / →'],
        ['Commitment Consistency', '_____', '_____', '_____', '↑ / ↓ / →'],
        ['Decision Quality', '_____', '_____', '_____', '↑ / ↓ / →'],
        ['Emotional Regulation', '_____', '_____', '_____', '↑ / ↓ / →'],
        ['Environmental Alignment', '_____', '_____', '_____', '↑ / ↓ / →'],
        ['Evidence Strength', '_____', '_____', '_____', '↑ / ↓ / →'],
        ['Agency', '_____', '_____', '_____', '↑ / ↓ / →']
    ]
    
    comparison_table = Table(comparison_data, colWidths=[5*cm, 2.5*cm, 2.5*cm, 2*cm, 3*cm])
    comparison_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(comparison_table)
    
    story.append(PageBreak())
    
    # Trend Tracking
    create_section_header(story, styles, "Section 3: Trend Tracking")
    story.append(Paragraph("Track movement across time for each area:", styles['BodyText']))
    
    trends = ['Consistency', 'Alignment', 'Evidence', 'Decision Quality', 'Emotional Regulation']
    trend_data = [['Area', 'Improving', 'Stable', 'Declining']]
    for t in trends:
        trend_data.append([t, '☐', '☐', '☐'])
    
    trend_table = Table(trend_data, colWidths=[6*cm, 3*cm, 3*cm, 3*cm])
    trend_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_TEAL),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(trend_table)
    
    create_text_field(story, styles, "What explains the trend?", 2)
    
    # Weekly Reflection
    create_section_header(story, styles, "Section 4: Weekly Reflection")
    create_text_field(story, styles, "What improved this week?", 2)
    create_text_field(story, styles, "What became easier?", 2)
    create_text_field(story, styles, "What became harder?", 2)
    create_text_field(story, styles, "What behavior created the most evidence?", 2)
    create_text_field(story, styles, "What support did you fail to use?", 2)
    create_text_field(story, styles, "What should you focus on next week?", 2)
    
    story.append(PageBreak())
    
    # Milestones
    create_section_header(story, styles, "Section 5: Transformation Milestones")
    story.append(Paragraph("Track these milestones visually:", styles['BodyText']))
    
    milestones_data = [
        ['Milestone', 'Not yet reached', 'Reached', 'Sustained'],
        ['First completed week', '☐', '☐', '☐'],
        ['First identity-aligned decision under stress', '☐', '☐', '☐'],
        ['First repaired lapse', '☐', '☐', '☐'],
        ['First high-consistency streak', '☐', '☐', '☐'],
        ['First major environmental improvement', '☐', '☐', '☐'],
        ['First strong self-trust moment', '☐', '☐', '☐'],
        ['First week of stable emotional regulation', '☐', '☐', '☐']
    ]
    
    milestones_table = Table(milestones_data, colWidths=[7*cm, 3*cm, 2.5*cm, 2.5*cm])
    milestones_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, -1), 'Times'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, MEDIUM_GRAY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(milestones_table)
    
    # Final Summary
    create_section_header(story, styles, "Section 6: Final Dashboard Summary")
    create_text_field(story, styles, "Current strongest area:", 2)
    create_text_field(story, styles, "Current weakest area:", 2)
    create_text_field(story, styles, "Biggest improvement since baseline:", 2)
    create_text_field(story, styles, "Most important remaining gap:", 2)
    
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph("Overall transformation status:", styles['QuestionText']))
    status_options = [
        "☐ Early stage",
        "☐ Emerging",
        "☐ Stabilizing",
        "☐ Strong",
        "☐ Highly integrated"
    ]
    for s in status_options:
        story.append(Paragraph(s, styles['QuestionText']))
    
    story.append(Spacer(1, 0.5*cm))
    create_text_field(story, styles, "Final Statement: The dashboard shows that my identity shift is currently...", 3)
    
    doc.build(story)
    print(f"✓ Created: {output_path}")

# ============================================
# MAIN EXECUTION
# ============================================

if __name__ == "__main__":
    output_dir = "/home/z/my-project/tamkinly-products-professional"
    os.makedirs(output_dir, exist_ok=True)
    
    print("\n" + "="*60)
    print("TAMKINLY IDENTITY RECODE PLANNER - PROFESSIONAL PDF GENERATOR")
    print("="*60 + "\n")
    
    # Generate all PDFs
    generate_executive_manual(f"{output_dir}/Executive-Manual.pdf")
    generate_identity_baseline(f"{output_dir}/Identity-Baseline-Worksheet.pdf")
    generate_environmental_audit(f"{output_dir}/Environmental-Audit.pdf")
    generate_decision_analysis(f"{output_dir}/Decision-Pattern-Analysis.pdf")
    generate_evidence_tracking(f"{output_dir}/Evidence-Tracking-System.pdf")
    generate_progress_dashboard(f"{output_dir}/Progress-Dashboard-Guide.pdf")
    
    print("\n" + "="*60)
    print("✓ ALL PDFs GENERATED SUCCESSFULLY!")
    print(f"Output directory: {output_dir}")
    print("="*60 + "\n")
