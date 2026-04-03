const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        PageNumber, LevelFormat, ShadingType, VerticalAlign } = require('docx');
const fs = require('fs');

// Color palette - Tamkinly brand
const colors = {
  primary: "#0F1C2E",
  accent: "#3DD4B0",
  body: "#0F172A",
  light: "#F1F5F9"
};

// Common border style
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Create Executive Manual
async function createExecutiveManual() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 24 } } },
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
          children: [new TextRun({ text: "Tamkinly Executive Manual", color: colors.accent, size: 20 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // Title
        new Paragraph({ heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Executive Manual", bold: true, size: 56, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 },
          children: [new TextRun({ text: "Your Guide to Identity Transformation", size: 28, color: colors.accent })] }),
        
        // Section 1
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Introduction to Identity Transformation")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("This Executive Manual serves as your comprehensive guide to understanding and implementing the Tamkinly identity transformation methodology. Based on evidence-based psychological principles, this system helps you bridge the gap between who you are and who you want to become.")] }),
        
        // Section 2
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. The Identity Gap Framework")] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Understanding Your Identity Gap")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("The identity gap represents the distance between your current self-concept and your desired identity. Research shows that this gap, when properly understood and addressed, becomes the primary driver of meaningful personal transformation.")] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 The Four Pillars of Identity")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("Your identity is built on four interconnected pillars:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "1. Values: ", bold: true }), new TextRun("Your core beliefs and principles that guide decision-making")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "2. Beliefs: ", bold: true }), new TextRun("The assumptions you hold about yourself and the world")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "3. Behaviors: ", bold: true }), new TextRun("The actions and habits that reflect your identity")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "4. Environment: ", bold: true }), new TextRun("The physical and social contexts that shape your choices")] }),
        
        // Section 3
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. The 30-Day Transformation Process")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Our methodology is structured into four weekly phases, each building upon the previous:")] }),
        
        // Week 1
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Week 1: Awareness & Assessment")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("The first week focuses on developing deep self-awareness. You will complete the Identity Gap Assessment, clarify your core values, and identify the specific gaps in your current identity. This foundation is crucial for meaningful change.")] }),
        
        // Week 2
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Week 2: Planning & Preparation")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("In the second week, you will design your transformation roadmap. This includes setting identity-based goals, creating environmental supports, and preparing for the behavioral changes ahead.")] }),
        
        // Week 3
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Week 3: Action & Implementation")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Week three is about taking consistent action. You will implement new behaviors, track your progress, and make evidence-based adjustments. This is where transformation begins to take visible shape.")] }),
        
        // Week 4
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Week 4: Integration & Sustainability")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("The final week focuses on cementing your new identity. You will review your progress, celebrate wins, learn from challenges, and create systems for long-term sustainability.")] }),
        
        // Section 4
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Using the Interactive Tools")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Your Tamkinly subscription includes access to powerful interactive tools designed to support your transformation journey:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Identity Gap Quiz: ", bold: true }), new TextRun("A comprehensive assessment that measures your current identity across multiple dimensions")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Values Clarification Tool: ", bold: true }), new TextRun("An interactive exercise to identify and prioritize your core values")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Daily Reflection: ", bold: true }), new TextRun("Guided prompts for daily introspection and growth tracking")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Progress Dashboard: ", bold: true }), new TextRun("Visual representation of your transformation journey")] }),
        
        // Section 5
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Best Practices for Success")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("To maximize your transformation results, follow these evidence-based practices:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Consistency over intensity: ", bold: true }), new TextRun("Small daily actions compound into significant change")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Environment design: ", bold: true }), new TextRun("Shape your surroundings to support your desired identity")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Evidence tracking: ", bold: true }), new TextRun("Document proof of your new identity through concrete actions")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun({ text: "Community support: ", bold: true }), new TextRun("Connect with others on similar transformation journeys")] }),
        
        // Closing
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. Support & Resources")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("If you have questions or need assistance, our support team is available at support@tamkinly.com. You can also access additional resources in the Tamkinly community forum.")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 },
          children: [new TextRun({ text: "\"Return to who you already are.\"", italics: true, color: colors.accent, size: 24 })]
        })
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Executive-Manual.pdf", buffer);
  console.log("Executive-Manual.pdf created");
}

// Create Identity Baseline Worksheet
async function createIdentityBaselineWorksheet() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 24 } } },
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
          children: [new TextRun({ text: "Identity Baseline Worksheet", color: colors.accent, size: 20 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // Title
        new Paragraph({ heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Identity Baseline Worksheet", bold: true, size: 56, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Establish Your Starting Point", size: 28, color: colors.accent })] }),
        
        // Instructions
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Instructions")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("This worksheet helps you establish a clear baseline of your current identity. Complete each section honestly and thoroughly. Your baseline will serve as a reference point for measuring your transformation progress.")] }),
        
        // Section 1: Current Self-Description
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Current Self-Description")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "In 3-5 sentences, describe who you are today:", italics: true })] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        
        // Section 2: Core Values Assessment
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Core Values Assessment")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Rate how well each value is currently expressed in your life (1-10):")] }),
        
        new Table({
          columnWidths: [4680, 2340, 2340],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Value", bold: true })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Rating (1-10)", bold: true })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Importance", bold: true })] })] })
              ]
            }),
            ...["Growth", "Authenticity", "Connection", "Achievement", "Wellness", "Creativity", "Freedom", "Security"].map(value => 
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun(value)] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("____")] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("____")] })] })
                ]
              })
            )
          ]
        }),
        
        new Paragraph({ spacing: { before: 400 }, heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Behavioral Inventory")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("List your top 5 daily habits (positive or negative):")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("1. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("2. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("3. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("4. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("5. ________________________________________________")] }),
        
        // Section 4: Gap Analysis
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Identity Gap Analysis")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Who do you want to become? Describe your ideal self:", italics: true })] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "What is the biggest gap between your current and desired identity?", italics: true })] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        
        // Section 5: Commitment
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 5: Commitment Statement")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Write a personal commitment statement for your transformation journey:")] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun("_".repeat(80))] }),
        
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 },
          children: [new TextRun({ text: "Date: ________________    Signature: ________________", size: 22 })] })
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Identity-Baseline-Worksheet.pdf", buffer);
  console.log("Identity-Baseline-Worksheet.pdf created");
}

// Create Environmental Audit
async function createEnvironmentalAudit() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 24 } } },
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
          children: [new TextRun({ text: "Environmental Audit", color: colors.accent, size: 20 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // Title
        new Paragraph({ heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Environmental Audit", bold: true, size: 56, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Design Your Surroundings for Success", size: 28, color: colors.accent })] }),
        
        // Introduction
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Understanding Environmental Design")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("Your environment shapes your behavior more than willpower ever could. This audit helps you identify environmental factors that support or hinder your desired identity transformation. Research shows that people who design their environment for success are 2-3 times more likely to achieve lasting change.")] }),
        
        // Section 1: Physical Environment
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Physical Environment Assessment")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Evaluate your physical spaces (home, work, etc.):")] }),
        
        new Table({
          columnWidths: [4680, 2340, 2340],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Area", bold: true })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Supports Goals", bold: true })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Needs Change", bold: true })] })] })
              ]
            }),
            ...["Bedroom", "Kitchen", "Work Area", "Living Space", "Digital Environment"].map(area => 
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun(area)] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Yes / No")] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("____")] })] })
                ]
              })
            )
          ]
        }),
        
        new Paragraph({ spacing: { before: 400 }, heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Social Environment")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Assess your social influences:")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Who are the 5 people you spend the most time with?", bold: true })] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("1. ____________________ Influence: Positive / Negative / Neutral")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("2. ____________________ Influence: Positive / Negative / Neutral")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("3. ____________________ Influence: Positive / Negative / Neutral")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("4. ____________________ Influence: Positive / Negative / Neutral")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("5. ____________________ Influence: Positive / Negative / Neutral")] }),
        
        // Section 3: Digital Environment
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Digital Environment Audit")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Evaluate your digital habits and influences:")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Average daily screen time: ", bold: true }), new TextRun("______ hours")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Most used apps: ", bold: true }), new TextRun("____________________")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun({ text: "Content consumed mostly: ", bold: true }), new TextRun("Educational / Entertainment / Mixed")] }),
        
        // Section 4: Action Plan
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Environmental Action Plan")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("List 3 specific environmental changes you will make:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("1. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("2. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("3. ________________________________________________")] }),
        
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 },
          children: [new TextRun({ text: "\"Design your environment, and your environment will design you.\"", italics: true, color: colors.accent, size: 22 })] })
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Environmental-Audit.pdf", buffer);
  console.log("Environmental-Audit.pdf created");
}

// Create Decision Pattern Analysis
async function createDecisionPatternAnalysis() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 24 } } },
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
          children: [new TextRun({ text: "Decision Pattern Analysis", color: colors.accent, size: 20 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // Title
        new Paragraph({ heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Decision Pattern Analysis", bold: true, size: 56, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Understand and Optimize Your Choices", size: 28, color: colors.accent })] }),
        
        // Introduction
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("The Science of Decision-Making")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("Every decision you make shapes your identity. Research in behavioral psychology shows that we make approximately 35,000 decisions daily - most unconsciously. This analysis helps you identify patterns in your decision-making and align them with your desired identity.")] }),
        
        // Section 1
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Decision Pattern Tracking")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Track your decisions for one week using the log below:")] }),
        
        new Table({
          columnWidths: [2000, 2500, 2000, 2860],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Date/Time", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Decision", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Trigger", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Aligned with Goals?", bold: true, size: 20 })] })] })
              ]
            }),
            ...Array(5).fill().map(() => 
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })] })
                ]
              })
            )
          ]
        }),
        
        // Section 2
        new Paragraph({ spacing: { before: 400 }, heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Pattern Recognition")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("After tracking, identify your common patterns:")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Common Decision Triggers")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Stress: ", bold: true }), new TextRun("What decisions do you make when stressed?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("________________________________________________________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Fatigue: ", bold: true }), new TextRun("What decisions do you make when tired?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("________________________________________________________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Social Pressure: ", bold: true }), new TextRun("How do others influence your decisions?")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("________________________________________________________________")] }),
        
        // Section 3
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Decision Optimization Framework")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("For each important decision, ask yourself:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("1. Does this decision align with my desired identity?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("2. Will this decision matter in 1 year? 5 years?")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("3. What would my ideal self do in this situation?")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("4. Is this decision moving me toward or away from my goals?")] }),
        
        // Section 4
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Implementation Intentions")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Create if-then plans for common decision scenarios:")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "If ", bold: true }), new TextRun("[situation occurs]"), new TextRun({ text: ", then I will ", bold: true }), new TextRun("[desired action]")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("________________________________________________________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("________________________________________________________________")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("________________________________________________________________")] }),
        
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 },
          children: [new TextRun({ text: "\"You are not your decisions. You are what you do repeatedly.\"", italics: true, color: colors.accent, size: 22 })] })
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Decision-Pattern-Analysis.pdf", buffer);
  console.log("Decision-Pattern-Analysis.pdf created");
}

// Create Evidence Tracking System
async function createEvidenceTrackingSystem() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 24 } } },
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
          children: [new TextRun({ text: "Evidence Tracking System", color: colors.accent, size: 20 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // Title
        new Paragraph({ heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Evidence Tracking System", bold: true, size: 56, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Document Your Transformation", size: 28, color: colors.accent })] }),
        
        // Introduction
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("The Power of Evidence")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("Your brain needs proof to accept a new identity. Evidence tracking provides concrete proof that you are becoming the person you want to be. Each piece of evidence you collect serves as a vote for your new identity, gradually reshaping your self-concept.")] }),
        
        // Section 1
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Daily Evidence Log")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Record evidence that supports your desired identity:")] }),
        
        new Table({
          columnWidths: [1500, 3000, 2500, 2360],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Date", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Evidence (What I Did)", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Identity It Proves", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Impact (1-10)", bold: true, size: 20 })] })] })
              ]
            }),
            ...Array(7).fill().map(() => 
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "", size: 20 })] })] })
                ]
              })
            )
          ]
        }),
        
        // Section 2
        new Paragraph({ spacing: { before: 400 }, heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Weekly Evidence Summary")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("At the end of each week, summarize your progress:")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("This Week's Wins")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("1. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("2. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("3. ________________________________________________")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Areas for Growth")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun("1. ________________________________________________")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("2. ________________________________________________")] }),
        
        // Section 3
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Evidence Categories")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Track evidence across different life domains:")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Health & Wellness: ", bold: true }), new TextRun("Exercise, nutrition, sleep, self-care")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Relationships: ", bold: true }), new TextRun("Quality time, communication, boundaries")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Career & Growth: ", bold: true }), new TextRun("Skills, projects, learning, achievements")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Personal Development: ", bold: true }), new TextRun("Habits, mindset, emotional regulation")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun({ text: "Contribution: ", bold: true }), new TextRun("Helping others, community, generosity")] }),
        
        // Section 4
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Monthly Review")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Complete at the end of each month:")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Total evidence points collected: ", bold: true }), new TextRun("______")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Strongest category: ", bold: true }), new TextRun("____________________")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Category to improve: ", bold: true }), new TextRun("____________________")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun({ text: "Key insight from this month: ", bold: true }), new TextRun("____________________")] }),
        
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 },
          children: [new TextRun({ text: "\"Every action you take is a vote for the type of person you wish to become.\"", italics: true, color: colors.accent, size: 22 })] })
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Evidence-Tracking-System.pdf", buffer);
  console.log("Evidence-Tracking-System.pdf created");
}

// Create Progress Dashboard Guide
async function createProgressDashboardGuide() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Times New Roman", size: 24 } } },
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
          children: [new TextRun({ text: "Progress Dashboard Guide", color: colors.accent, size: 20 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun("Page "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" of "), new TextRun({ children: [PageNumber.TOTAL_PAGES] })]
        })] })
      },
      children: [
        // Title
        new Paragraph({ heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Progress Dashboard Guide", bold: true, size: 56, color: colors.primary })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
          children: [new TextRun({ text: "Visualize Your Transformation Journey", size: 28, color: colors.accent })] }),
        
        // Introduction
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Why Track Progress Visually?")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("Visual progress tracking activates your brain's reward system, making transformation more engaging and sustainable. When you can see your progress, you're more likely to stay motivated and maintain momentum throughout your journey.")] }),
        
        // Section 1
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 1: Dashboard Components")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Your progress dashboard consists of several key elements:")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1. Identity Gap Score")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("A numerical representation of the distance between your current and desired identity. This score is calculated from your quiz responses and updates as you progress.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2. Habit Streaks")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Visual representation of consecutive days you've maintained your key habits. Research shows that streak tracking increases habit persistence by 2.5x.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3. Evidence Counter")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Total count of evidence pieces you've collected that support your desired identity. Each piece of evidence is a vote for who you're becoming.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4. Weekly Progress Chart")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("A visual timeline showing your activity and progress over the past 7 days.")] }),
        
        // Section 2
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 2: Key Metrics to Track")] }),
        
        new Table({
          columnWidths: [3120, 3120, 3120],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Metric", bold: true })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Target", bold: true })] })] }),
                new TableCell({ borders: cellBorders, shading: { fill: colors.light, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Your Current", bold: true })] })] })
              ]
            }),
            ...[
              ["Identity Gap Score", "85+", "____"],
              ["Daily Reflections", "30 days", "____ days"],
              ["Evidence Collected", "100+", "____"],
              ["Apps Used", "All available", "____"],
              ["Weeks Completed", "4", "____"]
            ].map(([metric, target, current]) => 
              new TableRow({
                children: [
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun(metric)] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(target)] })] }),
                  new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(current)] })] })
                ]
              })
            )
          ]
        }),
        
        // Section 3
        new Paragraph({ spacing: { before: 400 }, heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 3: Using the Dashboard Effectively")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Best practices for maximizing your dashboard:")] }),
        
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Check daily: ", bold: true }), new TextRun("Review your dashboard each morning to set intentions")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Update consistently: ", bold: true }), new TextRun("Log your evidence and activities immediately")] }),
        new Paragraph({ spacing: { after: 100, line: 360 },
          children: [new TextRun({ text: "Celebrate milestones: ", bold: true }), new TextRun("Acknowledge when you hit key targets")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun({ text: "Adjust as needed: ", bold: true }), new TextRun("Modify targets based on your progress")] }),
        
        // Section 4
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Section 4: Troubleshooting")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Common issues and solutions:")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Progress seems slow")] }),
        new Paragraph({ spacing: { after: 200, line: 360 },
          children: [new TextRun("Remember: sustainable transformation takes time. Focus on consistency rather than speed. Small, daily progress compounds into significant change.")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Data not updating")] }),
        new Paragraph({ spacing: { after: 300, line: 360 },
          children: [new TextRun("Refresh your browser or log out and back in. If issues persist, contact support@tamkinly.com.")] }),
        
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 },
          children: [new TextRun({ text: "\"What gets measured gets managed. What gets visualized gets achieved.\"", italics: true, color: colors.accent, size: 22 })] })
      ]
    }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/tamkinly-products/Progress-Dashboard-Guide.pdf", buffer);
  console.log("Progress-Dashboard-Guide.pdf created");
}

// Main execution
async function main() {
  console.log("Creating Tamkinly product documents...\n");
  
  await createExecutiveManual();
  await createIdentityBaselineWorksheet();
  await createEnvironmentalAudit();
  await createDecisionPatternAnalysis();
  await createEvidenceTrackingSystem();
  await createProgressDashboardGuide();
  
  console.log("\nAll documents created successfully!");
}

main().catch(console.error);
