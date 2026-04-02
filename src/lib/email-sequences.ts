// ============================================
// EMAIL SEQUENCES - Customer Journey Automation
// Tamkinly Identity Transformation Platform
// ============================================

export interface EmailSequenceStep {
  stepNumber: number;
  delayHours: number;
  subject: string;
  preheader?: string;
  content: string;
  primaryCta?: string;
  primaryUrl?: string;
}

export interface EmailSequenceConfig {
  name: string;
  trigger: string;
  description?: string;
  steps: EmailSequenceStep[];
}

// ============================================
// SEQUENCE 1: NEW VISITOR -> LEAD
// Trigger: Takes free quiz/assessment
// ============================================
export const freeAssessmentFollowUp: EmailSequenceConfig = {
  name: 'Free Assessment Follow-up',
  trigger: 'quiz_completed',
  description: 'Convert free assessment takers to leads and eventually customers',
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Your Identity Gap Results Are Ready',
      preheader: 'Here is what we discovered about your identity...',
      content: `Hi {{name}},

Thank you for completing the Identity Gap Assessment. Your results reveal important insights about where you are on your transformation journey.

**Your Key Insights:**
- Identity Clarity Score: {{clarityScore}}/100
- Environmental Alignment: {{alignmentScore}}/100
- Progress Momentum: {{momentumScore}}/100

**What This Means:**
{{personalizedInsight}}

**Your Next Step:**
The assessment is just the beginning. To truly transform, you need structured guidance. Our free Values Clarification Tool can help you discover what matters most.

Remember: Awareness is the first step. Action is what creates change.

— The Tamkinly Team`,
      primaryCta: 'Clarify Your Values',
      primaryUrl: '/apps/values-clarification'
    },
    {
      stepNumber: 2,
      delayHours: 24,
      subject: 'The Gap Between Who You Are and Who You Want to Be',
      preheader: 'Understanding your identity gap changes everything...',
      content: `Hi {{name}},

Yesterday, you discovered your Identity Gap. Today, let us explore what it actually means.

**The Identity Gap Explained:**

Research from Frontiers in Psychology shows that the gap between who you believe you are and who you express yourself to be directly impacts your mental health and life satisfaction.

Your gap is not a flaw—it is information. It tells you exactly where transformation is possible.

**Three Types of Gaps:**

1. **Personal-Enacted Gap** — The difference between your inner self and how you show up in the world
2. **Personal-Relational Gap** — The difference between who you are and how others see you
3. **Personal-Communal Gap** — The difference between your values and your community values

**Closing Your Gap:**

The Identity Recode System is designed specifically to help you close these gaps systematically over 30 days.

You are not broken. You are just in transition.

— The Tamkinly Team`,
      primaryCta: 'Explore the Identity Recode System',
      primaryUrl: '/products'
    },
    {
      stepNumber: 3,
      delayHours: 72,
      subject: 'What is Blocking Your Transformation?',
      preheader: 'The obstacle is not what you think...',
      content: `Hi {{name}},

Three days ago, you took the Identity Gap Assessment. 

Since then, have you noticed any patterns? Any moments where you felt the gap between who you are and who you want to be?

**The Truth About Transformation Blocks:**

Most people think the problem is:
- Not enough motivation
- Not enough discipline
- Not enough time

But the real problem is almost always:
- **Identity misalignment**

You are trying to DO differently while still BEING the same person inside.

**The Shift:**

When you change who you believe you are, the right actions become automatic. You do not need willpower to act like yourself.

**Your Opportunity:**

The Identity Recode System helps you become the person who naturally does the things you have been forcing yourself to do.

Or try our free Daily Reflection Practice to begin rewiring your identity one day at a time.

The person you want to become is already inside you.

— The Tamkinly Team`,
      primaryCta: 'Start Your Transformation',
      primaryUrl: '/products'
    }
  ]
};

// ============================================
// SEQUENCE 2: CUSTOMER ONBOARDING
// Trigger: Purchase completed
// ============================================
export const customerOnboarding: EmailSequenceConfig = {
  name: 'Customer Onboarding',
  trigger: 'purchase_completed',
  description: 'Welcome new customers and guide them to success',
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Welcome to Your Transformation Journey',
      preheader: 'Your access is ready...',
      content: `Hi {{name}},

**Welcome to Tamkinly.**

You have just made a commitment to yourself that most people never make: the commitment to transform.

**Your Access Key:** {{accessKey}}

**What Happens Next:**

1. **Today** — Explore your tools and complete the baseline assessment
2. **Days 1-7** — Awareness phase: Discover where you are
3. **Days 8-21** — Active recoding: Transform your identity
4. **Days 22-30** — Integration: Lock in your new self

**Your First Step:**

Go to the Identity Gap Assessment to establish your baseline. This will help you measure your transformation over the next 30 days.

**We Are Here:**

This journey is personal, but you are not alone. Reply to this email anytime with questions.

Your transformation begins now.

— The Tamkinly Team`,
      primaryCta: 'Start Your Journey',
      primaryUrl: '/apps'
    },
    {
      stepNumber: 2,
      delayHours: 24,
      subject: 'Day 1: The First Step Is Always the Hardest',
      preheader: 'You have already begun...',
      content: `Hi {{name}},

**Day 1 of 30**

Yesterday, you took the leap. Today, we begin.

**The Pattern:**

Every transformation follows the same pattern:
1. Excitement (now)
2. Resistance (soon)
3. Breakthrough (if you persist)
4. Integration (the new normal)

Most people quit at step 2. You will not.

**Your Day 1 Tasks:**

- Complete the Identity Baseline 8D assessment
- Set your intention for the next 30 days
- Choose your daily practice time

**Remember:**

The person who started this journey is already different from the person who will finish it. That is the point.

You do not need to see the whole path. Just take the next step.

— The Tamkinly Team`,
      primaryCta: 'Start Day 1',
      primaryUrl: '/apps/worksheets'
    },
    {
      stepNumber: 3,
      delayHours: 168,
      subject: 'Day 7: One Week In — How is It Going?',
      preheader: 'Your first milestone...',
      content: `Hi {{name}},

**Day 7 of 30**

You have made it through the first week. This matters more than you know.

**The Data:**

- 80% of people who start transformation programs quit in the first week
- You did not
- That means you are already in the top 20%

**What Is Happening Inside:**

Your brain is forming new neural pathways. The habits you are building are becoming less forced and more natural.

**Looking Ahead:**

Days 8-21 are the "active recoding" phase. This is where the real work happens. Expect:
- Deeper self-discovery
- Challenging exercises
- Resistance from your old identity

You are doing this. One day at a time.

— The Tamkinly Team`,
      primaryCta: 'Complete Week 1 Review',
      primaryUrl: '/apps/daily-reflection'
    },
    {
      stepNumber: 4,
      delayHours: 504,
      subject: 'Day 21: The Turning Point',
      preheader: 'You are becoming someone new...',
      content: `Hi {{name}},

**Day 21 of 30**

Twenty-one days. Do you realize what this means?

**The Science:**

Research shows that 21 days is the minimum time required to form a new habit. But you have done more than form habits—you have been recoding your identity.

**Look Back:**

Think about who you were 21 days ago. Now think about who you are today.

What is different?
What feels more natural?
What used to be hard that is now easier?

**Days 22-30: Integration**

The final phase is not about adding more. It is about locking in what you have built:
- Making your new identity permanent
- Creating systems that maintain your growth
- Preparing for life after the program

You are not the same person who started. And that is exactly right.

— The Tamkinly Team`,
      primaryCta: 'Complete Day 21 Review',
      primaryUrl: '/apps/identity-gap-quiz'
    },
    {
      stepNumber: 5,
      delayHours: 696,
      subject: 'Day 30: You Made It',
      preheader: 'Look how far you have come...',
      content: `Hi {{name}},

**Day 30 of 30**

You did it.

In a world of quick fixes and instant gratification, you committed to 30 days of real transformation.

**Your Journey:**
- Day 1: Started with uncertainty
- Day 7: Found your rhythm
- Day 21: Turned the corner
- Day 30: Became someone new

**What Is Different Now:**

Compare your Day 1 Identity Gap results with today. What changed?

Not just scores—perspective. You do not see yourself the same way. You do not act the same way. You have fundamentally shifted.

**What Is Next:**

- Continue using the daily reflection tools
- Revisit worksheets whenever you need a reset
- Consider upgrading to BUNDLE for ongoing AI coaching support

**Thank You:**

For trusting us with your transformation. For committing when it would have been easier to quit. For becoming who you were meant to be.

This is not goodbye—it is the beginning of a new chapter.

— The Tamkinly Team`,
      primaryCta: 'Continue Your Journey',
      primaryUrl: '/products'
    }
  ]
};

// ============================================
// SEQUENCE 3: ABANDONED CART
// Trigger: Added to cart but did not purchase
// ============================================
export const abandonedCartRecovery: EmailSequenceConfig = {
  name: 'Abandoned Cart Recovery',
  trigger: 'cart_abandoned',
  description: 'Recover lost sales from abandoned carts',
  steps: [
    {
      stepNumber: 1,
      delayHours: 4,
      subject: 'Did Something Hold You Back?',
      preheader: 'Your transformation is waiting...',
      content: `Hi {{name}},

You started something important.

You added {{productName}} to your cart. You were ready to transform. And then... something stopped you.

**We Get It:**

Transformation is scary. It means change. It means facing the gap between who you are and who you want to be.

But here is the thing: you already took the first step. You saw the possibility. You imagined what could be different.

**What Is Holding You Back?**

- Uncertainty if it will work?
- Questions about the process?
- Not sure if you are ready?

Reply to this email. We will answer honestly.

Transformation is not about being ready. It is about choosing to begin anyway.

— The Tamkinly Team`,
      primaryCta: 'Complete Your Order',
      primaryUrl: '/checkout'
    },
    {
      stepNumber: 2,
      delayHours: 24,
      subject: 'The Cost of Waiting',
      preheader: 'Another day in the gap...',
      content: `Hi {{name}},

Yesterday, you were considering transformation. Today, you are still in the same place.

**This Is Not Pressure—It Is Truth:**

Every day you wait:
- The gap stays the same
- The patterns repeat
- The opportunity passes

**The Other Option:**

Today, you could start:
- Day 1 of your transformation
- A new relationship with yourself
- The journey to who you were meant to be

**Your Cart:**

{{productName}} is still waiting.

The only wrong decision is no decision.

— The Tamkinly Team`,
      primaryCta: 'Start Now',
      primaryUrl: '/checkout'
    },
    {
      stepNumber: 3,
      delayHours: 72,
      subject: 'Last Chance for Your Transformation',
      preheader: 'We will keep this brief...',
      content: `Hi {{name}},

Three emails. That is all we will send.

This is the last one.

**The Choice:**

You can close this email and continue as you are.

Or you can click below and start becoming who you were meant to be.

**No Pressure:**

If the timing is not right, we understand. The tools will be here when you are ready.

But if something inside you knows it is time... do not ignore that voice.

— The Tamkinly Team`,
      primaryCta: 'Begin Now',
      primaryUrl: '/checkout'
    }
  ]
};

// ============================================
// SEQUENCE 4: RE-ENGAGEMENT
// Trigger: Inactive user
// ============================================
export const reEngagementSeries: EmailSequenceConfig = {
  name: 'Re-engagement Series',
  trigger: 'user_inactive_7_days',
  description: 'Bring back inactive users to continue their journey',
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'We Miss You',
      preheader: 'Your journey is not finished...',
      content: `Hi {{name}},

It has been a while since we have seen you.

**Life Happens:**

We know transformation is not always linear. Sometimes you need a break. Sometimes other priorities take over.

**But We Wonder:**

Did something block you?
Did you hit a wall?
Did the exercises get hard?

Whatever it was, it is okay. Growth is not a straight line.

**You Are Still Here:**

Your progress is saved. Your worksheets are waiting. Your transformation is still possible.

The gap between who you are and who you want to be has not grown—only your momentum has paused.

**Pick Up Where You Left Off:**

No judgment. No pressure. Just an open door.

— The Tamkinly Team`,
      primaryCta: 'Resume Your Journey',
      primaryUrl: '/apps'
    },
    {
      stepNumber: 2,
      delayHours: 168,
      subject: 'One Simple Step',
      preheader: 'That is all it takes...',
      content: `Hi {{name}},

Transformation does not require grand gestures. It requires one simple step, repeated.

**The Smallest Step:**

You do not need to redo everything. Just do one thing today:

Open the Daily Reflection app
Answer one question
That is it

**Why This Works:**

Small actions break the inertia. They remind your brain that you are still in the game. They build the momentum back.

**No Pressure:**

We are not asking for a marathon. Just one step.

Your future self will thank you.

— The Tamkinly Team`,
      primaryCta: 'Take One Step',
      primaryUrl: '/apps/daily-reflection'
    }
  ]
};

// Export all sequences
export const allEmailSequences: EmailSequenceConfig[] = [
  freeAssessmentFollowUp,
  customerOnboarding,
  abandonedCartRecovery,
  reEngagementSeries
];
