const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        PageNumber, LevelFormat, ShadingType, VerticalAlign, PageBreak } = require('docx');
const fs = require('fs');

// Color palette - Tamkinly brand
const colors = {
  primary: "#0F1C2E",
  accent: "#3DD4B0",
  body: "#0F172A",
  light: "#F1F5F9",
  green: "#1F6F78"
};

// Common border style
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Rating box helper
function ratingBox(label) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: `${label}: [     ]`, size: 22 })]
  });
}

// Section header helper
function sectionHeader(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 28, color: colors.primary })]
  });
}

// Subsection helper
function subSection(text) {
  return new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 24, color: colors.green })]
  });
}

// Prompt helper
function prompt(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text, bold: true, size: 22 })]
  });
}

// Field helper
function field() {
  return new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: "________________________________________________________________________", size: 20 })]
  });
}

// ========================================
// EXECUTIVE MANUAL
// ========================================
async function createExecutiveManual() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 400, after: 200 } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 28, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 300, after: 150 } } }
      ]
    },
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Identity Recode Planner - Executive Manual", color: colors.accent, size: 18 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // COVER PAGE
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 },
          children: [new TextRun({ text: "Identity Recode Planner", bold: true, size: 56, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
          children: [new TextRun({ text: "Executive Manual", bold: true, size: 40, color: colors.accent })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "A 30-Day Guided Journey for Identity Alignment,", size: 24, color: colors.body })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 },
          children: [new TextRun({ text: "Behavioral Recalibration, and Self-Authored Change", size: 24, color: colors.body })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "A practical system for assessing your current identity, identifying misalignment, redesigning your environment, tracking evidence, and installing a more coherent self-concept through daily action.", size: 20, italics: true, color: colors.green })] }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // PAGE 2 - PURPOSE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Purpose of the System")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("This planner is designed to help a person move from passive reaction to intentional self-direction. The core assumption is simple: lasting change becomes more stable when it is rooted in identity, supported by environment, and reinforced through repeated evidence.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What this system does:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Clarifies the current identity baseline.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Identifies the gap between present behavior and desired identity.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Audits the environment for support and friction.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Analyzes decision patterns.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Tracks evidence of change daily.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("• Measures progress over 30 days.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What this system does not do:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• It does not rely on motivation alone.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• It does not assume one insight will create transformation.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("• It does not measure progress only by emotion or intention.")] }),
        
        // PAGE 3 - HOW TO USE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("How to Use This Manual")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Use this manual as the operating logic behind the worksheets and dashboard. Each page in the planner should connect to one of six functions: assess, observe, design, decide, evidence, and review.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Recommended Rhythm:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Day 1: Complete baseline assessments.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Days 2–7: Observe patterns and environment.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Days 8–14: Modify cues, routines, and decisions.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Days 15–21: Track evidence and consistency.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("• Days 22–30: Review progress, refine identity, and lock in maintenance.")] }),
        
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "User Rule: ", bold: true }), new TextRun("Do not aim for perfection. Aim for repeated observation and correction.")] }),
        
        // PAGE 4 - CORE THEORY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Core Theory")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Identity change is not only about adding habits. It is about changing what the person repeatedly proves to themselves is true. Research on self-monitoring and goal progress shows that physically recorded progress and frequent monitoring improve goal attainment.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Core Principles:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("1. Repeated behavior creates evidence.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("2. Evidence shapes self-concept.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("3. Environment shapes repetition.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("4. Decisions reveal identity.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("5. Emotional regulation protects consistency.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("6. Progress becomes visible when it is recorded.")] }),
        
        // PAGE 5 - THE 6-SYSTEM MODEL
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("The 6-System Model")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("This planner works through six linked systems:")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "1. Baseline: ", bold: true }), new TextRun("Where am I now?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "2. Environment: ", bold: true }), new TextRun("What supports or blocks the new identity?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "3. Decisions: ", bold: true }), new TextRun("What patterns drive my choices?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "4. Evidence: ", bold: true }), new TextRun("What proof shows that change is happening?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "5. Progress: ", bold: true }), new TextRun("How do I measure growth over time?")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun({ text: "6. Integration: ", bold: true }), new TextRun("What must become stable, repeatable, and automatic?")] }),
        
        // PAGE 6 - HOW IDENTITY CHANGE WORKS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("How Identity Change Works")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("A person does not simply \"become\" a new identity by thinking positively. Identity is strengthened when behavior, self-description, and context begin to match.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("The Mechanism:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("1. A new identity is chosen.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("2. Small actions are repeated.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("3. The actions produce evidence.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("4. The evidence reduces self-doubt.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("5. The self-concept updates.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("6. The behavior becomes more natural.")] }),
        
        // PAGE 7 - WHAT COUNTS AS PROGRESS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("What Counts as Progress")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Progress is not only emotional relief or a good day. Progress is any observable sign that the system is producing alignment.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Examples of Valid Progress:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Completing planned actions.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Making cleaner decisions.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Recovering faster after lapses.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Reducing friction in the environment.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Keeping a consistent log.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Acting according to values under stress.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("• Seeing fewer identity conflicts.")] }),
        
        // PAGE 8 - USING THE WORKSHEETS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Using the Worksheets Together")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Each worksheet has a role in the system:")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Executive Manual: ", bold: true }), new TextRun("Defines the logic and structure.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Identity Baseline Worksheet: ", bold: true }), new TextRun("Measures current identity status.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Environmental Audit: ", bold: true }), new TextRun("Finds support and resistance in context.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Decision Pattern Analysis: ", bold: true }), new TextRun("Tracks how choices are actually made.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Evidence Tracking System: ", bold: true }), new TextRun("Records proof of behavioral change.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun({ text: "Progress Dashboard Guide: ", bold: true }), new TextRun("Displays change over time in a simple visual form.")] }),
        
        // PAGE 9 - RULES
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Rules of the Planner")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("1. Write honestly, not ideally.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("2. Measure what happened, not what you hoped would happen.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("3. Use evidence before interpretation.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("4. Treat repeated resistance as information, not failure.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("5. Focus on consistency over intensity.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("6. Review the system weekly.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("7. Update the plan based on data.")] }),
        
        // PAGE 10 - THE 30-DAY PATH
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("The 30-Day Path")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Phase 1: Observe (Days 1–7)", bold: true })] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("Capture baseline, values, habits, triggers, and environment.")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Phase 2: Intervene (Days 8–14)", bold: true })] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("Adjust cues, reduce friction, and improve decision structure.")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Phase 3: Evidence (Days 15–21)", bold: true })] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("Track repeated actions and emerging identity proof.")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun({ text: "Phase 4: Stabilize (Days 22–30)", bold: true })] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("Review results, reinforce wins, and refine the next cycle.")] }),
        
        // PAGE 11 - IMPLEMENTATION LOGIC
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Implementation Logic")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("For each target identity, ask four questions:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("1. What does this identity do repeatedly?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("2. What makes that behavior easier or harder?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("3. What decisions support or block it?")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("4. What evidence would prove it is becoming real?")] }),
        
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("This keeps the system grounded in measurable behavior rather than vague aspiration.")] }),
        
        // PAGE 12 - READING THE DASHBOARD
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Reading the Dashboard")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("A good dashboard should be simple, visible, and repeated often.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Dashboard Should Show:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Daily completion.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Weekly consistency.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Identity alignment score.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Decision quality score.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Environmental support score.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Evidence count.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("• Milestones reached.")] }),
        
        // PAGE 13 - SETBACKS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("How to Interpret Setbacks")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Setbacks do not mean the identity failed. They indicate one of four things:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("1. The environment is too resistant.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("2. The cue is too weak.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("3. The decision rule is unclear.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("4. The evidence system is too passive.")] }),
        
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("This interpretation keeps the user in problem-solving mode instead of self-judgment mode.")] }),
        
        // PAGE 14 - MAINTENANCE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Maintenance Principle")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("The final goal is not to \"finish\" change, but to create a repeatable identity system. When change is maintained through evidence, environment, and self-monitoring, it becomes less dependent on temporary motivation.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Maintenance Means:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Actions are easier to repeat.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Identity feels more coherent.")] }),
        new Paragraph({ spacing: { after: 100, line: 360 }, children: [new TextRun("• Decisions require less effort.")] }),
        new Paragraph({ spacing: { after: 200, line: 360 }, children: [new TextRun("• Recovery from misses becomes faster.")] }),
        
        // PAGE 15 - FINAL INSTRUCTION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Final Instruction")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Use this manual as the standard for every worksheet inside the planner. Each page should help the user answer one question:")] }),
        
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 400 },
          children: [new TextRun({ text: "\"What am I repeatedly proving to myself about who I am becoming?\"", italics: true, bold: true, size: 26, color: colors.accent })] })
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Executive-Manual.pdf", buffer);
  console.log("Executive-Manual.pdf created (15 pages)");
}

// ========================================
// IDENTITY BASELINE WORKSHEET
// ========================================
async function createIdentityBaselineWorksheet() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 32, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 300, after: 150 } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 250, after: 100 } } }
      ]
    },
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Identity Baseline Worksheet", color: colors.accent, size: 18 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // TITLE
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
          children: [new TextRun({ text: "Identity Baseline Worksheet", bold: true, size: 40, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
          children: [new TextRun({ text: "Identity Recode Planner", size: 24, color: colors.accent })] }),
        
        // PURPOSE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Purpose")] }),
        new Paragraph({ spacing: { after: 200, line: 340 },
          children: [new TextRun("To establish a clear, honest snapshot of your current identity before any transformation work begins. This worksheet measures identity alignment across key dimensions so that progress can be tracked with evidence rather than assumption.")] }),
        
        // INSTRUCTIONS
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Instructions")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("1. Complete this worksheet on Day 1 before starting any other part of the planner.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("2. Answer honestly, not aspirationally.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("3. Use the same version again at the end of the 30-day journey.")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("4. Do not edit your answers to make them sound better.")] }),
        
        // SCORING
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scoring Method (1-10)")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("1-3 = Very low / not true")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("4-6 = Neutral / mixed")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("7-8 = Strong")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("9-10 = Fully true / highly stable")] }),
        
        // SECTION 1: IDENTITY SNAPSHOT
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Current Identity Summary")] }),
        
        prompt("1. How would I describe the identity I am currently living from?"),
        field(),
        
        prompt("2. What kind of person do my current habits, choices, and reactions suggest I am?"),
        field(),
        
        prompt("3. If someone observed my daily behavior for 30 days, what identity would they conclude I am practicing?"),
        field(),
        
        prompt("4. What identity do I want to move toward during this journey?"),
        field(),
        
        // SECTION 2: SELF-CONCEPT
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Self-Concept Score")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("Rate each statement from 1 to 10:")] }),
        
        ratingBox("1. I have a clear sense of who I am"),
        ratingBox("2. My behavior usually reflects the person I want to be"),
        ratingBox("3. I feel internally consistent across different situations"),
        ratingBox("4. I know what matters to me most"),
        ratingBox("5. I trust my own judgment more than I used to"),
        ratingBox("6. I feel like my life reflects my values"),
        ratingBox("7. I can describe myself without confusion or contradiction"),
        ratingBox("8. I feel a strong connection between my identity and daily actions"),
        
        new Paragraph({ spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "Self-Concept Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        // SECTION 3: VALUES CONGRUENCE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Value Alignment")] }),
        
        prompt("What are my top 5 values right now?"),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("1. ________________  2. ________________  3. ________________")] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("4. ________________  5. ________________")] }),
        
        prompt("Which of these values are actually visible in my behavior?"),
        field(),
        
        prompt("Which values do I claim to have but do not consistently live?"),
        field(),
        
        prompt("Where is there a gap between what I say matters and what my actions prove?"),
        field(),
        
        new Paragraph({ spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "Value Congruence Score (1-10): [     ]", bold: true, size: 24 })]
        }),
        
        // SECTION 4: SELF-TRUST
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Self-Trust Index")] }),
        
        ratingBox("1. I keep promises I make to myself"),
        ratingBox("2. I follow through on commitments even when I do not feel like it"),
        ratingBox("3. I can rely on myself under pressure"),
        ratingBox("4. I do not abandon myself when things get difficult"),
        ratingBox("5. I trust my decisions after I make them"),
        ratingBox("6. I learn from mistakes without collapsing into self-doubt"),
        ratingBox("7. I act in ways that strengthen my confidence in myself"),
        ratingBox("8. I am becoming a person I can trust"),
        
        new Paragraph({ spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "Self-Trust Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        // SECTION 5: COMMITMENT CONSISTENCY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 5: Commitment Consistency")] }),
        
        ratingBox("1. I usually complete what I start"),
        ratingBox("2. I do not break my own commitments easily"),
        ratingBox("3. My intentions are usually matched by action"),
        ratingBox("4. I can stay consistent over time, not just for a few days"),
        ratingBox("5. I know how to recover after inconsistency"),
        ratingBox("6. I return to my commitments after disruption"),
        ratingBox("7. I am building a reputation with myself for consistency"),
        ratingBox("8. My daily actions support my long-term direction"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Commitment Consistency Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("What is the most common reason I fail to stay consistent?"),
        field(),
        
        // SECTION 6: DECISION QUALITY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 6: Decision Quality")] }),
        
        ratingBox("1. I make decisions that are aligned with my values"),
        ratingBox("2. I do not make important decisions purely from emotion"),
        ratingBox("3. I think clearly before I commit to action"),
        ratingBox("4. I can distinguish between impulse and alignment"),
        ratingBox("5. I usually know why I chose what I chose"),
        ratingBox("6. My decisions usually support my future self"),
        ratingBox("7. I rarely sabotage myself through avoidable choices"),
        ratingBox("8. I am becoming more intentional in how I choose"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Decision Quality Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("What type of decision causes the most damage to my progress?"),
        field(),
        
        // SECTION 7: EMOTIONAL REGULATION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 7: Emotional Regulation")] }),
        
        ratingBox("1. I can stay grounded when I feel overwhelmed"),
        ratingBox("2. I can notice my emotions without being controlled by them"),
        ratingBox("3. I recover from disappointment without staying stuck"),
        ratingBox("4. I can keep moving even when I feel uncomfortable"),
        ratingBox("5. I know what triggers emotional reactivity in me"),
        ratingBox("6. I can regulate myself without relying on avoidance"),
        ratingBox("7. My emotional state does not completely determine my behavior"),
        ratingBox("8. I can return to clarity after emotional disruption"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Emotional Regulation Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("What emotional state most often weakens my identity alignment?"),
        field(),
        
        // SECTION 8: ENVIRONMENTAL ALIGNMENT
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 8: Environmental Alignment")] }),
        
        ratingBox("1. My environment makes good behavior easy"),
        ratingBox("2. My space supports the identity I want to build"),
        ratingBox("3. My digital environment is not overly distracting"),
        ratingBox("4. The people around me support my direction"),
        ratingBox("5. I have access to the resources I need"),
        ratingBox("6. My routines are designed to reduce friction"),
        ratingBox("7. My surroundings contain useful reminders of who I am becoming"),
        ratingBox("8. My environment does not constantly pull me away from my goals"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Environmental Alignment Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("What is the biggest environmental obstacle to my transformation?"),
        field(),
        
        // SECTION 9: AGENCY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 9: Personal Agency")] }),
        
        ratingBox("1. I believe my actions matter"),
        ratingBox("2. I see myself as responsible for my life direction"),
        ratingBox("3. I believe change is something I can participate in"),
        ratingBox("4. I focus on what I can control"),
        ratingBox("5. I do not blame external conditions for everything"),
        ratingBox("6. I can influence my results through disciplined action"),
        ratingBox("7. I believe I am an active participant in my transformation"),
        ratingBox("8. I feel ownership over my progress"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Agency Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("Where do I still give away my power?"),
        field(),
        
        // SECTION 10: IDENTITY GAP
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 10: Identity Gap Analysis")] }),
        
        prompt("What is the biggest gap between my current identity and the identity I want to build?"),
        field(),
        
        prompt("What behaviors currently protect the old identity?"),
        field(),
        
        prompt("What behaviors would prove the new identity is real?"),
        field(),
        
        prompt("What must stop, start, or stabilize?"),
        field(),
        
        new Paragraph({ spacing: { before: 200 },
          children: [new TextRun({ text: "Identity Gap Summary (one sentence):", bold: true, size: 22 })] }),
        field(),
        
        // FINAL SUMMARY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Baseline Summary")] }),
        
        new Paragraph({ spacing: { after: 100 },
          children: [new TextRun({ text: "Self-Concept: [     ]   Value Congruence: [     ]   Self-Trust: [     ]", size: 20 })] }),
        new Paragraph({ spacing: { after: 100 },
          children: [new TextRun({ text: "Commitment: [     ]   Decision Quality: [     ]   Emotional Regulation: [     ]", size: 20 })] }),
        new Paragraph({ spacing: { after: 200 },
          children: [new TextRun({ text: "Environmental Alignment: [     ]   Agency: [     ]", size: 20 })] }),
        
        new Paragraph({ spacing: { after: 200 },
          children: [new TextRun({ text: "Overall Baseline Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("What is the strongest area right now?"),
        field(),
        
        prompt("What is the weakest area right now?"),
        field(),
        
        prompt("What pattern appears across multiple scores?"),
        field(),
        
        prompt("What do I need most in the next 30 days?"),
        field(),
        
        new Paragraph({ spacing: { before: 300 },
          children: [new TextRun({ text: "Final Baseline Statement: I am starting from a place where...", bold: true, size: 22 })] }),
        field()
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Identity-Baseline-Worksheet.pdf", buffer);
  console.log("Identity-Baseline-Worksheet.pdf created");
}

// ========================================
// ENVIRONMENTAL AUDIT
// ========================================
async function createEnvironmentalAudit() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 32, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 300, after: 150 } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 250, after: 100 } } }
      ]
    },
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Environmental Audit", color: colors.accent, size: 18 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // TITLE
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
          children: [new TextRun({ text: "Environmental Audit", bold: true, size: 40, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
          children: [new TextRun({ text: "Identity Recode Planner", size: 24, color: colors.accent })] }),
        
        // PURPOSE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Purpose")] }),
        new Paragraph({ spacing: { after: 200, line: 340 },
          children: [new TextRun("To identify the environmental conditions that support or interfere with identity installation, daily consistency, and behavior change.")] }),
        
        // INSTRUCTIONS
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Instructions")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("1. Complete this audit honestly.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("2. Evaluate the environment you live in, not the environment you wish you had.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("3. Focus on what is easy, what is difficult, what is visible, and what repeatedly pulls you away.")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("4. Repeat this audit after major changes to your routine, space, or social context.")] }),
        
        // SCORING
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scoring (1-10)")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("1 = Strongly blocking | 5 = Neutral | 10 = Strongly supportive")] }),
        
        // SECTION 1: PHYSICAL SPACE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Physical Environment")] }),
        
        ratingBox("1. My physical space makes good behavior easy"),
        ratingBox("2. My workspace or home setup supports focus"),
        ratingBox("3. Important tools are easy to reach"),
        ratingBox("4. Unhelpful objects are out of sight or removed"),
        ratingBox("5. My space reminds me of the person I am becoming"),
        ratingBox("6. My space reduces distraction instead of increasing it"),
        ratingBox("7. My physical layout supports my daily routines"),
        ratingBox("8. My environment lowers friction for the behaviors I want"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Physical Space Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("What is the biggest physical obstacle to my transformation?"),
        field(),
        
        // SECTION 2: DIGITAL ENVIRONMENT
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Digital Environment")] }),
        
        ratingBox("1. My phone and digital devices support my goals"),
        ratingBox("2. I am not overexposed to distracting content"),
        ratingBox("3. My digital notifications are under control"),
        ratingBox("4. My social media use does not undermine my identity goals"),
        ratingBox("5. My digital environment contains useful reminders, not only noise"),
        ratingBox("6. I can access useful materials without getting lost in distraction"),
        ratingBox("7. My digital habits are intentional rather than automatic"),
        ratingBox("8. I have reduced unnecessary digital friction and clutter"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Digital Environment Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("What digital trigger most often weakens my focus?"),
        field(),
        
        // SECTION 3: SOCIAL CIRCLE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: People and Influence")] }),
        
        ratingBox("1. The people around me support the identity I am building"),
        ratingBox("2. I spend enough time with people who model the behavior I want"),
        ratingBox("3. My social circle does not normalize the habits I am trying to leave behind"),
        ratingBox("4. I feel understood by at least some of the people around me"),
        ratingBox("5. I can maintain my direction even when others do not share it"),
        ratingBox("6. My relationships increase my discipline rather than weaken it"),
        ratingBox("7. I know which relationships strengthen or weaken my progress"),
        ratingBox("8. My social environment supports long-term change"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Social Circle Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("Which relationship most strongly affects my consistency?"),
        field(),
        
        // SECTION 4: RESOURCE ACCESS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Tools and Resources")] }),
        
        ratingBox("1. I have access to the tools I need to follow through"),
        ratingBox("2. My routines are realistic for my current life situation"),
        ratingBox("3. Time is allocated for the behaviors I want to build"),
        ratingBox("4. I have enough structure to avoid unnecessary confusion"),
        ratingBox("5. I know where to begin when I want to act"),
        ratingBox("6. My resources reduce hesitation instead of creating it"),
        ratingBox("7. I have support systems when motivation is low"),
        ratingBox("8. I do not rely on willpower alone"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Resource Access Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("What resource is missing or underused?"),
        field(),
        
        // SECTION 5: FRICTION POINTS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 5: Friction Point Identification")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("Mark each item as: Low friction / Moderate friction / High friction")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Morning routine: [                    ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Starting focused work: [                    ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Making healthy choices: [                    ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Saying no to distraction: [                    ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Returning after a lapse: [                    ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Keeping commitments: [                    ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Logging progress: [                    ]")] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Ending the day intentionally: [                    ]")] }),
        
        prompt("Where does my environment create the most resistance?"),
        field(),
        
        // SECTION 6: CUE IMPLEMENTATION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 6: Trigger Design")] }),
        
        ratingBox("1. My environment contains cues that prompt the right actions"),
        ratingBox("2. I have placed reminders where they will be seen"),
        ratingBox("3. My cues are tied to specific behaviors, not vague intentions"),
        ratingBox("4. My environment makes the next step obvious"),
        ratingBox("5. I can tell what to do when I enter a specific space"),
        ratingBox("6. My cues reduce decision fatigue"),
        ratingBox("7. I am using prompts intentionally, not randomly"),
        ratingBox("8. My cues support repetition"),
        
        new Paragraph({ spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Cue Quality Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        prompt("Which cue should I add, remove, or strengthen?"),
        field(),
        
        // SUMMARY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Environmental Summary")] }),
        
        new Paragraph({ spacing: { after: 200 },
          children: [new TextRun({ text: "Physical Space: [     ]   Digital: [     ]   Social: [     ]   Resources: [     ]   Cues: [     ]", size: 20 })] }),
        
        prompt("What is the strongest supportive factor in my environment?"),
        field(),
        
        prompt("What is the strongest blocking factor in my environment?"),
        field(),
        
        prompt("What single environmental change would create the biggest improvement?"),
        field(),
        
        new Paragraph({ spacing: { before: 300 },
          children: [new TextRun({ text: "Final Environmental Statement: My environment currently makes it easier to...", bold: true, size: 22 })] }),
        field()
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Environmental-Audit.pdf", buffer);
  console.log("Environmental-Audit.pdf created");
}

// ========================================
// DECISION PATTERN ANALYSIS
// ========================================
async function createDecisionPatternAnalysis() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 32, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 300, after: 150 } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 250, after: 100 } } }
      ]
    },
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Decision Pattern Analysis", color: colors.accent, size: 18 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // TITLE
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
          children: [new TextRun({ text: "Decision Pattern Analysis", bold: true, size: 40, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
          children: [new TextRun({ text: "Identity Recode Planner", size: 24, color: colors.accent })] }),
        
        // PURPOSE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Purpose")] }),
        new Paragraph({ spacing: { after: 200, line: 340 },
          children: [new TextRun("To analyze recurring decision habits and identify whether choices are made from identity, impulse, avoidance, or alignment.")] }),
        
        // INSTRUCTIONS
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Instructions")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("1. Log one meaningful decision per day.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("2. Focus on decisions that affected behavior, time, energy, or consistency.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("3. Do not record trivial choices.")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("4. The purpose is pattern recognition, not self-judgment.")] }),
        
        // SECTION 1: DECISION JOURNAL
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Decision Journal Entry")] }),
        
        prompt("Date and Time:"),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("[                    ]")] }),
        
        prompt("Decision made:"),
        field(),
        
        prompt("Situation/context:"),
        field(),
        
        prompt("What options were available?"),
        field(),
        
        prompt("What did I choose?"),
        field(),
        
        prompt("What happened next?"),
        field(),
        
        // SECTION 2: TRIGGER ANALYSIS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Trigger and State Analysis")] }),
        
        ratingBox("1. I was clear-headed when I made this decision"),
        ratingBox("2. I was emotionally stable when I made this decision"),
        ratingBox("3. I had enough time to think"),
        ratingBox("4. I felt pressure or urgency"),
        ratingBox("5. I was acting from values rather than impulse"),
        ratingBox("6. I felt internally conflicted"),
        ratingBox("7. I knew what I was doing and why"),
        ratingBox("8. I could have chosen differently if I had paused"),
        
        prompt("What emotional or mental state most influenced this decision?"),
        field(),
        
        // SECTION 3: QUALITY EVALUATION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Decision Quality Matrix")] }),
        
        ratingBox("1. Value alignment"),
        ratingBox("2. Future usefulness"),
        ratingBox("3. Clarity of reasoning"),
        ratingBox("4. Emotional regulation at the moment"),
        ratingBox("5. Resistance to impulse"),
        ratingBox("6. Consistency with identity goal"),
        ratingBox("7. Consequence awareness"),
        ratingBox("8. Overall decision quality"),
        
        new Paragraph({ spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "Decision Quality Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        // SECTION 4: PATTERN RECOGNITION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Pattern Recognition")] }),
        
        prompt("What pattern appears across this decision and previous decisions?"),
        field(),
        
        prompt("What type of situations most often produce weak decisions?"),
        field(),
        
        prompt("What type of situations most often produce strong decisions?"),
        field(),
        
        prompt("What recurring excuse, assumption, or shortcut appears?"),
        field(),
        
        prompt("Pattern Name (give this pattern a name):"),
        field(),
        
        // SECTION 5: UPGRADE PROTOCOL
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 5: Upgrade Protocol")] }),
        
        prompt("What should I do differently next time?"),
        field(),
        
        prompt("If the same situation happens again, my rule is:"),
        field(),
        
        prompt("One pause I should insert before acting is:"),
        field(),
        
        prompt("One question I should ask before deciding is:"),
        field(),
        
        prompt("One boundary I should use to protect future decisions is:"),
        field(),
        
        // SUMMARY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Decision Pattern Summary")] }),
        
        new Paragraph({ spacing: { after: 200 },
          children: [new TextRun({ text: "Clarity: [     ]   Emotional Stability: [     ]   Value Alignment: [     ]", size: 20 })] }),
        new Paragraph({ spacing: { after: 200 },
          children: [new TextRun({ text: "Future Alignment: [     ]   Self-Control: [     ]   Overall: [     ]", size: 20 })] }),
        
        prompt("What decision pattern is becoming visible?"),
        field(),
        
        prompt("What is one decision habit I need to stop reinforcing?"),
        field(),
        
        prompt("What is one decision habit I need to strengthen?"),
        field(),
        
        new Paragraph({ spacing: { before: 300 },
          children: [new TextRun({ text: "Final Decision Statement: My decisions are currently teaching me that...", bold: true, size: 22 })] }),
        field()
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Decision-Pattern-Analysis.pdf", buffer);
  console.log("Decision-Pattern-Analysis.pdf created");
}

// ========================================
// EVIDENCE TRACKING SYSTEM
// ========================================
async function createEvidenceTrackingSystem() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 32, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 300, after: 150 } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 250, after: 100 } } }
      ]
    },
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Evidence Tracking System", color: colors.accent, size: 18 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // TITLE
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
          children: [new TextRun({ text: "Evidence Tracking System", bold: true, size: 40, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
          children: [new TextRun({ text: "Identity Recode Planner", size: 24, color: colors.accent })] }),
        
        // PURPOSE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Purpose")] }),
        new Paragraph({ spacing: { after: 200, line: 340 },
          children: [new TextRun("To record observable proof that identity-aligned behavior is happening in real life, not only in intention or self-description.")] }),
        
        // INSTRUCTIONS
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Instructions")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("1. Log one meaningful piece of evidence per day.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("2. Use concrete facts only.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("3. Do not write opinions unless they are tied to observable behavior.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("4. Treat this as a record of proof, not a journal of mood.")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("5. Review every 7 days.")] }),
        
        // SECTION 1: DAILY ACTION LOG
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Daily Action Log")] }),
        
        prompt("Date:"),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("[                    ]")] }),
        
        prompt("Planned action:"),
        field(),
        
        prompt("Action completed (Yes/No):"),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("[                    ]")] }),
        
        prompt("If yes, what was done?"),
        field(),
        
        prompt("If no, what prevented it?"),
        field(),
        
        prompt("Time started: ____________   Time finished: ____________"),
        
        prompt("Quality of completion (1-10):"),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("[                    ]")] }),
        
        // SECTION 2: BEHAVIORAL EVIDENCE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Behavioral Evidence Record")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("For each item, write one concrete example:")] }),
        
        prompt("1. Evidence of self-trust:"),
        field(),
        
        prompt("2. Evidence of commitment consistency:"),
        field(),
        
        prompt("3. Evidence of emotional regulation:"),
        field(),
        
        prompt("4. Evidence of decision quality:"),
        field(),
        
        prompt("5. Evidence of environmental discipline:"),
        field(),
        
        prompt("6. Evidence of value congruence:"),
        field(),
        
        prompt("7. Evidence of agency:"),
        field(),
        
        prompt("8. Evidence of identity alignment:"),
        field(),
        
        new Paragraph({ spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "Evidence Strength Score (1-10): [     ]", bold: true, size: 24 })]
        }),
        
        // SECTION 3: CONSISTENCY METRICS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Consistency Analysis")] }),
        
        ratingBox("1. I completed what I planned most days"),
        ratingBox("2. I returned after missed days"),
        ratingBox("3. My actions became more regular over time"),
        ratingBox("4. I needed less effort to stay on track"),
        ratingBox("5. I behaved more like the identity I chose"),
        ratingBox("6. I showed up even when motivation was low"),
        ratingBox("7. I tracked my behavior honestly"),
        ratingBox("8. I can trust my consistency more than before"),
        
        new Paragraph({ spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "Consistency Score (average): [     ]", bold: true, size: 24 })]
        }),
        
        // SECTION 4: MILESTONES
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Transformation Milestones")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("Mark the milestone when it happens:")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First completed action")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First full week of consistency")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First recovery after a lapse")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First visible identity-aligned decision")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First environmental improvement")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First emotional regulation win")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First moment of self-trust")] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("[ ] First week with no major avoidance pattern")] }),
        
        prompt("Which milestone mattered most to me?"),
        field(),
        
        // SECTION 5: IDENTITY IMPLICATION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 5: Identity Implication")] }),
        
        prompt("What is the evidence teaching me about who I am becoming?"),
        field(),
        
        prompt("What identity is being strengthened by these actions?"),
        field(),
        
        prompt("What old identity is losing power?"),
        field(),
        
        prompt("What conclusion can I now make with confidence?"),
        field(),
        
        // SECTION 6: WEEKLY REVIEW
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 6: Weekly Review")] }),
        
        prompt("1. What was the strongest evidence this week?"),
        field(),
        
        prompt("2. What was the weakest area this week?"),
        field(),
        
        prompt("3. What pattern do I see in my follow-through?"),
        field(),
        
        prompt("4. What adjustment should I make next week?"),
        field(),
        
        prompt("5. What evidence would I need to see to feel more confident?"),
        field(),
        
        new Paragraph({ spacing: { before: 300 },
          children: [new TextRun({ text: "Weekly Summary Statement: This week I proved that...", bold: true, size: 22 })] }),
        field()
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Evidence-Tracking-System.pdf", buffer);
  console.log("Evidence-Tracking-System.pdf created");
}

// ========================================
// PROGRESS DASHBOARD GUIDE
// ========================================
async function createProgressDashboardGuide() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 32, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 300, after: 150 } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, color: colors.primary, font: "Times New Roman" },
          paragraph: { spacing: { before: 250, after: 100 } } }
      ]
    },
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Progress Dashboard Guide", color: colors.accent, size: 18 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // TITLE
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
          children: [new TextRun({ text: "Progress Dashboard Guide", bold: true, size: 40, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
          children: [new TextRun({ text: "Identity Recode Planner", size: 24, color: colors.accent })] }),
        
        // PURPOSE
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Purpose")] }),
        new Paragraph({ spacing: { after: 200, line: 340 },
          children: [new TextRun("To visually display progress, consistency, and identity alignment across the 30-day journey so you can see change over time rather than rely on memory alone.")] }),
        
        // INSTRUCTIONS
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Instructions")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("1. Update the dashboard once per day or once per week.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("2. Use the same scoring system throughout the journey.")] }),
        new Paragraph({ spacing: { after: 100, line: 340 }, children: [new TextRun("3. Keep the dashboard simple, visible, and easy to review.")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("4. Do not use too many metrics.")] }),
        
        // SECTION 1: CORE METRICS
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Core Dashboard Metrics")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("Track the following scores weekly:")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Identity Alignment Score: [     ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Self-Trust Score: [     ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Commitment Consistency Score: [     ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Decision Quality Score: [     ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Emotional Regulation Score: [     ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Environmental Alignment Score: [     ]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Evidence Strength Score: [     ]")] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("• Agency Score: [     ]")] }),
        
        // SECTION 2: BASELINE VS CURRENT
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Baseline vs Current Comparison")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("For each metric, show baseline, current, difference, and direction:")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Self-Trust:", bold: true })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Baseline: [     ]   Current: [     ]   Change: [     ]   Direction: [Up / Down / Stable]")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Commitment:", bold: true })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Baseline: [     ]   Current: [     ]   Change: [     ]   Direction: [Up / Down / Stable]")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Decision Quality:", bold: true })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("Baseline: [     ]   Current: [     ]   Change: [     ]   Direction: [Up / Down / Stable]")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Emotional Regulation:", bold: true })] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Baseline: [     ]   Current: [     ]   Change: [     ]   Direction: [Up / Down / Stable]")] }),
        
        // SECTION 3: TREND TRACKING
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Trend Tracking")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("Track movement across time for:")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Consistency: [Improving / Stable / Declining]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Alignment: [Improving / Stable / Declining]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Evidence: [Improving / Stable / Declining]")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("• Decision Quality: [Improving / Stable / Declining]")] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("• Emotional Regulation: [Improving / Stable / Declining]")] }),
        
        prompt("What explains the trend?"),
        field(),
        
        // SECTION 4: WEEKLY REFLECTION
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Weekly Reflection")] }),
        
        prompt("What improved this week?"),
        field(),
        
        prompt("What became easier?"),
        field(),
        
        prompt("What became harder?"),
        field(),
        
        prompt("What behavior created the most evidence?"),
        field(),
        
        prompt("What support did I fail to use?"),
        field(),
        
        prompt("What should I focus on next week?"),
        field(),
        
        // SECTION 5: MILESTONE DISPLAY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 5: Transformation Milestones")] }),
        new Paragraph({ spacing: { after: 200, line: 340 }, children: [new TextRun("Track these milestones visually:")] }),
        
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First completed week")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First identity-aligned decision under stress")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First repaired lapse")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First high-consistency streak")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First major environmental improvement")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] First strong self-trust moment")] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("[ ] First week of stable emotional regulation")] }),
        
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Milestone Status: [Not yet reached / Reached / Sustained]", bold: true })] }),
        
        // FINAL SUMMARY
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Overall Dashboard Summary")] }),
        
        prompt("Current strongest area:"),
        field(),
        
        prompt("Current weakest area:"),
        field(),
        
        prompt("Biggest improvement since baseline:"),
        field(),
        
        prompt("Most important remaining gap:"),
        field(),
        
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Overall Transformation Status:", bold: true })] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] Early stage")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] Emerging")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] Stabilizing")] }),
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun("[ ] Strong")] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun("[ ] Highly integrated")] }),
        
        new Paragraph({ spacing: { before: 300 },
          children: [new TextRun({ text: "Final Statement: The dashboard shows that my identity shift is currently...", bold: true, size: 22 })] }),
        field()
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Progress-Dashboard-Guide.pdf", buffer);
  console.log("Progress-Dashboard-Guide.pdf created");
}

// Main execution
async function main() {
  console.log("Creating comprehensive Tamkinly product documents...\n");
  
  await createExecutiveManual();
  await createIdentityBaselineWorksheet();
  await createEnvironmentalAudit();
  await createDecisionPatternAnalysis();
  await createEvidenceTrackingSystem();
  await createProgressDashboardGuide();
  
  console.log("\n✅ All 6 documents created successfully!");
}

main().catch(console.error);
