import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Email Templates based on Brevo configuration
// Each email includes relevant links based on customer state

const emailSequences = [
  // ============================================
  // WELCOME SEQUENCE - For New Subscribers
  // ============================================
  {
    name: 'Welcome To Tamkinly',
    trigger: 'NEW_SUBSCRIBER',
    description: 'Welcome email for new subscribers who haven\'t purchased yet. Contains only free resources.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Welcome to Tamkinly - Start Your Transformation Journey',
        preheader: 'Your path to identity transformation begins here',
        content: `# Welcome to Tamkinly! 🌟

Hello {{name}},

Thank you for joining the Tamkinly community! You've just taken the first step toward becoming who you were meant to be.

## Your Free Resources

As a member of our community, you have access to these **free transformation tools**:

### 1. Identity Gap Assessment
Discover the gap between who you are and who you want to become in just 3 minutes.
[Start Free Assessment]({{free_apps_link}}/identity-gap-quiz)

### 2. Values Clarification Tool
Identify your top 5 core values and understand what drives your decisions.
[Clarify Your Values]({{free_apps_link}}/values-clarification)

### 3. Daily Reflection Prompt
Build self-awareness with daily identity-focused reflection prompts.
[Get Daily Prompts]({{free_apps_link}}/daily-reflection)

---

## What's Next?

- **Complete your free assessment** to get personalized recommendations
- **Explore our products** to accelerate your transformation
- **Join our community** for ongoing support and motivation

We believe everyone deserves to become the best version of themselves. You're not alone on this journey.

**With warmth,**
The Tamkinly Team

---

*P.S. If you're ready to go deeper, check out our [Transformation Products]({{products_link}}).*
`,
        primaryCta: 'Start Free Assessment',
        primaryUrl: '{{free_apps_link}}/identity-gap-quiz'
      }]
    }
  },

  // ============================================
  // TRIAL SEQUENCE - 7-Day Trial Users
  // ============================================
  {
    name: '7 Days Identity System Trial',
    trigger: 'TRIAL_PURCHASE',
    description: 'Activation email for trial users with 7-day access.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Your 7-Day Trial Has Started! 🚀',
        preheader: 'Full access to the Identity Recode System',
        content: `# Welcome to Your 7-Day Trial! 🎉

Hello {{name}},

Congratulations on taking action! Your **7-day trial** of the Identity Recode System is now active.

## Your Access Code

\`\`\`
{{access_code}}
\`\`\`

## What You Have Access To

During your trial, you can explore:

- **7-Day Trial Planner** - Guided daily prompts
- **Identity Gap Assessment** - Discover your growth areas
- **Values Clarification** - Find your core values
- **Daily Reflection** - Build self-awareness

[Access Your Apps]({{apps_link}})

---

## Make the Most of Your Trial

Here's how to maximize your 7 days:

1. **Day 1-2**: Complete the Identity Gap Assessment
2. **Day 3-4**: Clarify your values and set intentions
3. **Day 5-7**: Use the Daily Planner and track your progress

⚠️ **Your trial expires in 7 days**. If you love the system, consider upgrading to keep your progress.

[View Upgrade Options]({{products_link}})

**Ready to transform?**
The Tamkinly Team
`,
        primaryCta: 'Access Your Apps',
        primaryUrl: '{{apps_link}}'
      }]
    }
  },

  // ============================================
  // PLANNER PURCHASE SEQUENCE
  // ============================================
  {
    name: 'Planner Purchase',
    trigger: 'PLANNER_PURCHASE',
    description: 'Confirmation and onboarding for Identity Recode Planner ($17) purchasers.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Your Identity Recode Planner is Ready! 📓',
        preheader: 'Your transformation toolkit awaits',
        content: `# Thank You for Your Purchase! 🎉

Hello {{name}},

Your **Identity Recode Planner** purchase is complete. You now have lifetime access to your transformation toolkit.

## Your Access Code

\`\`\`
{{access_code}}
\`\`\`

## What You Now Have Access To

### Core Apps & Tools:
- **30-Day Identity Planner** - Interactive daily planning
- **Executive Manual** - 6 core protocols for transformation
- **Identity Baseline Worksheet** - 8-dimension assessment
- **Environmental Audit** - Optimize your surroundings

### Free Apps Included:
- Identity Gap Assessment
- Values Clarification Tool
- Daily Reflection Prompt

[Access Your Planner]({{apps_link}})

---

## Your Transformation Journey

**Phase 1 (Days 1-7):** Awareness & Foundation
- Complete your Identity Baseline
- Set your transformation intentions

**Phase 2 (Days 8-21):** Active Recoding
- Daily identity prompts
- Build new behavioral evidence

**Phase 3 (Days 22-30):** Integration
- Lock in your new identity
- Plan for continued growth

---

## Need Help?

If you have any questions, reply to this email or visit our [Support Center]({{support_link}}).

**Let's transform together,**
The Tamkinly Team
`,
        primaryCta: 'Access Your Planner',
        primaryUrl: '{{apps_link}}'
      }]
    }
  },

  // ============================================
  // PREMIUM PURCHASE SEQUENCE
  // ============================================
  {
    name: 'Premium Purchase',
    trigger: 'PREMIUM_PURCHASE',
    description: 'Confirmation and onboarding for Premium Transformation ($27) purchasers.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Welcome to Premium Transformation! ⭐',
        preheader: 'Unlock advanced analytics and tracking',
        content: `# You're Now a Premium Member! 🌟

Hello {{name}},

Thank you for investing in your transformation with the **Premium Transformation Package**. You've made a powerful commitment to yourself.

## Your Access Code

\`\`\`
{{access_code}}
\`\`\`

## What's Included in Your Premium Access

### Core Apps:
- 30-Day Identity Planner
- Executive Manual
- Identity Baseline Worksheet
- Environmental Audit

### Premium Analytics:
- **Decision Pattern Analysis** - Track and improve your decisions
- **Evidence Tracking System** - Log transformation evidence
- **Progress Dashboard** - Advanced metrics and milestones

### Free Apps:
- Identity Gap Assessment
- Values Clarification Tool
- Daily Reflection Prompt

[Access Your Premium Apps]({{apps_link}})

---

## Your Premium Advantage

With Premium, you get:

✅ **All Planner features** ($17 value)
✅ **Decision tracking** - Identify patterns and biases
✅ **Evidence logging** - Track your transformation proof
✅ **Advanced analytics** - Measure your progress
✅ **Priority support** - Faster response times

---

## Getting Started

1. **Set up your dashboard** - [View Progress Dashboard]({{apps_link}}/progress-dashboard)
2. **Log your first decision** - [Start Tracking]({{apps_link}}/decision-analysis)
3. **Begin your 30-day journey** - [Open Planner]({{apps_link}}/daily-planner)

**You're already ahead of 90% of people.**
The Tamkinly Team
`,
        primaryCta: 'Access Premium Apps',
        primaryUrl: '{{apps_link}}'
      }]
    }
  },

  // ============================================
  // BUNDLE PURCHASE SEQUENCE (VIP)
  // ============================================
  {
    name: 'Bundle Purchase (VIP)',
    trigger: 'BUNDLE_PURCHASE',
    description: 'VIP welcome for Complete Bundle ($47) purchasers - full access.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Welcome to the VIP Family! 💎',
        preheader: 'You have unlocked everything',
        content: `# You're Now a VIP Member! 💎

Hello {{name}},

Welcome to the **Complete Bundle** family! You've invested in the ultimate transformation experience, and we're honored to be part of your journey.

## Your VIP Access Code

\`\`\`
{{access_code}}
\`\`\`

## You Have Access to EVERYTHING

### All Core Apps (Planner + Premium):
- 30-Day Identity Planner
- Executive Manual
- Identity Baseline Worksheet
- Environmental Audit
- Decision Pattern Analysis
- Evidence Tracking System
- Progress Dashboard

### VIP-Exclusive Features:
- **AI Identity Coach** - Your 24/7 transformation companion
- **Emotion Regulation (ERQ)** - Advanced emotional assessment
- **Transformation Community** - Connect with like-minded people
- **Priority Support** - 24-hour response guarantee

[Access Your VIP Dashboard]({{apps_link}})

---

## Your VIP Benefits

💎 **Everything in Premium** ($27 value)
💎 **AI Coaching** - Personalized insights anytime
💎 **Community Access** - Share wins, get support
💎 **Monthly Live Q&A** - Direct founder access
💎 **Priority Tickets** - Guaranteed 24hr response
💎 **Exclusive Workshops** - Advanced training sessions

---

## Start Here

1. **Meet your AI Coach** - [Start Coaching Session]({{apps_link}}/ai-identity-coach)
2. **Join the Community** - [Connect with Others]({{apps_link}}/community-access)
3. **Set up your dashboard** - [View All Apps]({{apps_link}})

---

## VIP Support

As a VIP member, you have direct access to our team:
- Email: vip@tamkinly.com
- Response time: Within 24 hours guaranteed

**Welcome to the inner circle,**
The Tamkinly Team

*P.S. Keep an eye out for your exclusive VIP invites to monthly live sessions!*
`,
        primaryCta: 'Access VIP Dashboard',
        primaryUrl: '{{apps_link}}'
      }]
    }
  },

  // ============================================
  // TRIAL FOLLOW-UP SEQUENCE
  // ============================================
  {
    name: 'Trial Follow-up Day 3',
    trigger: 'TRIAL_DAY_3',
    description: 'Follow-up for trial users on day 3.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'How\'s Your Trial Going? 🔍',
        preheader: '4 days left in your trial',
        content: `# Day 3 Check-In 👋

Hello {{name}},

You're 3 days into your **7-day trial**. How's it going?

## Quick Progress Check

Have you:
- [ ] Completed the Identity Gap Assessment?
- [ ] Identified your top 5 values?
- [ ] Tried the Daily Reflection prompts?

[Continue Your Trial]({{apps_link}})

---

## What to Do Next

With 4 days remaining, focus on:

1. **Use the Trial Planner** for daily prompts
2. **Track your evidence** - Notice small wins
3. **Consider your upgrade options**

⚠️ **Your trial ends in 4 days**

If you're seeing value, don't lose your progress! Upgrade to continue your journey.

[View Upgrade Options]({{products_link}})

**Keep going,**
The Tamkinly Team
`,
        primaryCta: 'Continue Trial',
        primaryUrl: '{{apps_link}}'
      }]
    }
  },
  {
    name: 'Trial Follow-up Day 7',
    trigger: 'TRIAL_DAY_7',
    description: 'Final day of trial - upgrade reminder.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Your Trial Ends Today! ⏰',
        preheader: 'Don\'t lose your progress',
        content: `# Last Chance to Keep Your Progress 🚨

Hello {{name}},

Your **7-day trial ends today**. Don't let your transformation momentum slip away!

## You've Made Progress

During your trial, you:
- Started your identity transformation journey
- Gained insights about yourself
- Took action toward your goals

Don't let this fade away.

---

## Continue Your Journey

**Option 1: Identity Recode Planner ($17)**
- Keep your core apps
- 30-day transformation system
- Lifetime access

**Option 2: Premium Transformation ($27)**
- Everything in Planner
- Advanced analytics
- Decision tracking

**Option 3: Complete Bundle ($47)**
- Everything + AI Coach
- Community access
- VIP support

[Upgrade Now]({{products_link}})

---

⚠️ **Act now** - Your trial access will expire at midnight.

**Your future self will thank you,**
The Tamkinly Team
`,
        primaryCta: 'Upgrade Now',
        primaryUrl: '{{products_link}}'
      }]
    }
  },

  // ============================================
  // PLANNER FOLLOW-UP SEQUENCE
  // ============================================
  {
    name: 'Planner Follow-up Day 3',
    trigger: 'PLANNER_DAY_3',
    description: 'Follow-up for Planner purchasers on day 3.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'You\'re 3 Days In! 🌱',
        preheader: 'Tips for maximum transformation',
        content: `# Day 3: Building Momentum 🌱

Hello {{name}},

You're 3 days into your **30-day transformation journey**. This is when it starts getting real!

## How Are You Feeling?

- Excited about the changes ahead?
- Challenged by new perspectives?
- Ready for more?

[Continue Your Journey]({{apps_link}}/daily-planner)

---

## Tip for Day 3

**Focus on small wins.**

Transformation doesn't happen overnight. It happens through consistent small actions:

- ✅ Complete today's prompt
- ✅ Log one piece of evidence
- ✅ Celebrate showing up

## Resources

- [Identity Baseline Worksheet]({{apps_link}}/identity-baseline)
- [Environmental Audit]({{apps_link}}/environmental-audit)
- [Executive Manual]({{apps_link}}/executive-manual)

**Keep showing up,**
The Tamkinly Team
`,
        primaryCta: 'Open Today\'s Prompt',
        primaryUrl: '{{apps_link}}/daily-planner'
      }]
    }
  },
  {
    name: 'Planner Follow-up Day 7',
    trigger: 'PLANNER_DAY_7',
    description: 'Week 1 milestone for Planner purchasers.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Week 1 Complete! 🎯',
        preheader: 'You\'ve finished the awareness phase',
        content: `# One Week Down! 🎯

Hello {{name}},

Congratulations! You've completed **7 days** of your transformation journey. That puts you ahead of most people who never take action.

## Your Week 1 Wins

You've:
- Started building self-awareness
- Identified key identity gaps
- Created new daily habits

[See Your Progress]({{apps_link}})

---

## What's Next: Active Recoding

**Days 8-21** are about active transformation:

1. **Intensify your identity work** - Go deeper with prompts
2. **Gather evidence** - Collect proof of your new identity
3. **Challenge old patterns** - Recognize and shift limiting beliefs

## Upgrade Opportunity

Want deeper analytics and decision tracking?

[Upgrade to Premium]({{products_link}}) - Get advanced tools for the next phase.

**You're doing amazing,**
The Tamkinly Team
`,
        primaryCta: 'Start Week 2',
        primaryUrl: '{{apps_link}}/daily-planner'
      }]
    }
  },
  {
    name: 'Planner Follow-up Day 14',
    trigger: 'PLANNER_DAY_14',
    description: 'Mid-journey check-in and upgrade offer.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Halfway There! 🚀',
        preheader: '15 days of transformation',
        content: `# You're Halfway There! 🚀

Hello {{name}},

**Day 15** of your 30-day journey. Take a moment to acknowledge how far you've come.

## Reflection Questions

- What's changed in the last 2 weeks?
- What new behaviors have become natural?
- What obstacles have you overcome?

[Log Your Progress]({{apps_link}}/daily-planner)

---

## The Second Half

**Days 15-30** focus on:

- **Integration** - Making changes stick
- **Lock protocols** - Cementing new identity
- **Future planning** - What's next after day 30?

## Special Offer

You're committed to transformation. Take it to the next level:

**Upgrade to Premium ($27)** and get:
- Decision Pattern Analysis
- Evidence Tracking System
- Progress Dashboard
- Advanced analytics

[Upgrade Now - Save $10]({{products_link}})

---

**Keep pushing forward,**
The Tamkinly Team
`,
        primaryCta: 'Continue Journey',
        primaryUrl: '{{apps_link}}/daily-planner'
      }]
    }
  },

  // ============================================
  // PREMIUM FOLLOW-UP SEQUENCE
  // ============================================
  {
    name: 'Premium Follow-up Day 3',
    trigger: 'PREMIUM_DAY_3',
    description: 'Early check-in for Premium members.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Getting Started with Premium 🔎',
        preheader: 'Tips for using advanced features',
        content: `# Day 3: Unlock Your Premium Features 🔎

Hello {{name}},

You're 3 days into your **Premium Transformation**. Let's make sure you're using all your powerful tools.

## Premium Features to Try

### 1. Decision Pattern Analysis
Track your decisions to identify patterns and biases.
[Start Tracking]({{apps_link}}/decision-analysis)

### 2. Evidence Tracking System
Log behavioral evidence that proves your transformation.
[Log Evidence]({{apps_link}}/evidence-tracking)

### 3. Progress Dashboard
View your transformation metrics and milestones.
[View Dashboard]({{apps_link}}/progress-dashboard)

---

## Pro Tip

Use the **Decision Analysis** tool before making any important decision. Log:
- The decision
- Your reasoning
- Expected outcome
- Actual result (check back later)

This builds powerful self-awareness over time.

**You have the tools. Use them.**
The Tamkinly Team
`,
        primaryCta: 'Access Premium Tools',
        primaryUrl: '{{apps_link}}'
      }]
    }
  },
  {
    name: 'Premium Follow-up Day 7',
    trigger: 'PREMIUM_DAY_7',
    description: 'Week 1 check-in for Premium members.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Week 1: Premium Progress 📊',
        preheader: 'Check your analytics',
        content: `# Week 1 Analytics Review 📊

Hello {{name}},

You've completed **7 days** with Premium access. Let's look at your data.

## Your Week 1 Metrics

[View Full Dashboard]({{apps_link}}/progress-dashboard)

### Key Questions:
- How many decisions did you track?
- What patterns emerged?
- What evidence did you collect?

---

## Premium Advantage

With Premium analytics, you can:
- Spot decision-making patterns
- Track transformation evidence
- Measure consistency
- Identify growth areas

## Need Help?

If you have questions about using any Premium features, reply to this email.

**Data-driven transformation,**
The Tamkinly Team
`,
        primaryCta: 'View Dashboard',
        primaryUrl: '{{apps_link}}/progress-dashboard'
      }]
    }
  },
  {
    name: 'Premium Follow-up Day 14',
    trigger: 'PREMIUM_DAY_14',
    description: 'Two-week check-in and Bundle upgrade offer.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: '2 Weeks In: Ready for AI Coaching? 🤖',
        preheader: 'Upgrade to Bundle for AI + Community',
        content: `# 2 Weeks of Premium Transformation 🎯

Hello {{name}},

**14 days** of using advanced tools and tracking. You're building powerful self-awareness!

## Your Premium Journey

By now, you've:
- Tracked multiple decisions
- Collected evidence of change
- Built consistency habits

What's missing? **AI-powered insights and community support.**

---

## Upgrade to Complete Bundle ($47)

Get everything you have PLUS:

### 🤖 AI Identity Coach
- 24/7 personalized coaching
- Pattern recognition
- Motivation on demand

### 👥 Transformation Community
- Connect with like-minded people
- Share wins and get support
- Accountability partners

### 🎧 Priority Support
- 24-hour response guarantee
- Monthly live Q&A sessions
- Direct founder access

[Upgrade to Bundle]({{products_link}})

**Take it to the next level,**
The Tamkinly Team
`,
        primaryCta: 'Unlock AI Coach',
        primaryUrl: '{{products_link}}'
      }]
    }
  },

  // ============================================
  // BUNDLE FOLLOW-UP SEQUENCE
  // ============================================
  {
    name: 'Bundle Follow-up Day 3',
    trigger: 'BUNDLE_DAY_3',
    description: 'VIP onboarding check-in.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'VIP Day 3: Meet Your AI Coach 🤖',
        preheader: 'Your personal transformation companion',
        content: `# Day 3: Have You Met Your AI Coach? 🤖

Hello {{name}},

As a **VIP member**, you have exclusive access to the AI Identity Coach. Have you tried it yet?

## AI Identity Coach Features

- **24/7 Availability** - Get insights anytime
- **Personalized Responses** - Tailored to your journey
- **Pattern Recognition** - Spots trends in your thinking
- **Motivation Boost** - When you need encouragement

[Talk to Your AI Coach]({{apps_link}}/ai-identity-coach)

---

## VIP Quick Links

- [Transformation Community]({{apps_link}}/community-access)
- [Progress Dashboard]({{apps_link}}/progress-dashboard)
- [Priority Support]({{support_link}})

## VIP Perk

Don't forget - you have **guaranteed 24-hour response time** on all support requests.

**Your VIP experience matters,**
The Tamkinly Team
`,
        primaryCta: 'Chat with AI Coach',
        primaryUrl: '{{apps_link}}/ai-identity-coach'
      }]
    }
  },
  {
    name: 'Bundle Follow-up Day 7',
    trigger: 'BUNDLE_DAY_7',
    description: 'Week 1 VIP check-in.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'VIP Week 1: How\'s Your Experience? 💎',
        preheader: 'Community and coaching check-in',
        content: `# One Week as a VIP 💎

Hello {{name}},

**7 days** into your VIP experience. We want to make sure you're getting maximum value.

## VIP Features Checklist

- [ ] Used the AI Identity Coach?
- [ ] Joined the Transformation Community?
- [ ] Tried the Emotion Regulation assessment?
- [ ] Logged into your Progress Dashboard?

[Access VIP Dashboard]({{apps_link}})

---

## Community Spotlight

Have you introduced yourself in the community yet?

- Share your transformation goals
- Find accountability partners
- Celebrate wins together

[Join the Conversation]({{apps_link}}/community-access)

---

## Need Anything?

As a VIP, you have:
- **Direct email**: vip@tamkinly.com
- **Priority support**: 24-hour response guarantee
- **Monthly live sessions**: Coming soon!

**We're here for you,**
The Tamkinly Team
`,
        primaryCta: 'Access Community',
        primaryUrl: '{{apps_link}}/community-access'
      }]
    }
  },
  {
    name: 'Bundle Follow-up Day 14',
    trigger: 'BUNDLE_DAY_14',
    description: 'Two-week VIP milestone.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'VIP Milestone: 2 Weeks Complete! 🎉',
        preheader: 'Your transformation is in motion',
        content: `# 2 Weeks of VIP Transformation 🎉

Hello {{name}},

**14 days** of full access to everything Tamkinly offers. You're in the top tier of transformation commitment.

## Your VIP Journey So Far

By now, you should have:
- Integrated AI coaching into your routine
- Connected with the community
- Tracked meaningful progress
- Used advanced assessments

[View Complete Dashboard]({{apps_link}})

---

## What's Working?

We'd love to hear what features are most valuable to you.

**Quick question:** Which VIP feature has been most impactful?
- AI Identity Coach
- Community Connection
- Priority Support
- Advanced Assessments

Just reply to this email with your answer!

---

## Coming Up

- **Monthly Live Q&A** - Look out for your invite
- **New features** - We're always improving
- **VIP exclusive content** - Special workshops

**Thank you for being VIP,**
The Tamkinly Team
`,
        primaryCta: 'Continue VIP Journey',
        primaryUrl: '{{apps_link}}'
      }]
    }
  },

  // ============================================
  // ABANDONED CART SEQUENCE
  // ============================================
  {
    name: 'Abandoned Cart 1 Hour',
    trigger: 'CART_ABANDONED_1H',
    description: 'First abandoned cart reminder.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Did You Forget Something? 🛒',
        preheader: 'Your transformation awaits',
        content: `# Your Cart is Waiting 🛒

Hello {{name}},

You were so close to starting your transformation journey!

## Items in Your Cart

{{cart_items}}

[Complete Your Purchase]({{checkout_link}})

---

## Why Transform with Tamkinly?

- **Science-backed methodology** - Based on identity psychology
- **Practical tools** - Not just theory, real action
- **Supportive community** - You're not alone
- **Money-back guarantee** - 30-day risk-free trial

Your transformation is one click away.

[Return to Checkout]({{checkout_link}})

**The Tamkinly Team**
`,
        primaryCta: 'Complete Purchase',
        primaryUrl: '{{checkout_link}}'
      }]
    }
  },
  {
    name: 'Abandoned Cart 24',
    trigger: 'CART_ABANDONED_24H',
    description: 'Second abandoned cart reminder.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Still Thinking About It? 💭',
        preheader: 'Special offer inside',
        content: `# We Saved Your Cart 💭

Hello {{name}},

Your cart is still waiting. We know transformation is a big decision.

## Special Offer Just For You

Use code **TRANSFORM10** for **10% off** your purchase!

[Apply Discount & Checkout]({{checkout_link}}?code=TRANSFORM10)

---

## Your Transformation Toolkit

Don't miss out on:
- Interactive transformation apps
- Proven methodology
- Lifetime access
- 30-day money-back guarantee

This discount expires in **24 hours**.

[Claim Your 10% Off]({{checkout_link}}?code=TRANSFORM10)

**Your future self will thank you,**
The Tamkinly Team
`,
        primaryCta: 'Get 10% Off',
        primaryUrl: '{{checkout_link}}?code=TRANSFORM10'
      }]
    }
  },

  // ============================================
  // ACCOUNT & AUTH SEQUENCE
  // ============================================
  {
    name: 'Account Created',
    trigger: 'ACCOUNT_CREATED',
    description: 'Confirmation when account is created.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Welcome to Tamkinly! 👋',
        preheader: 'Your account is ready',
        content: `# Your Account is Ready! 👋

Hello {{name}},

Your Tamkinly account has been created. Here are your login details:

## Your Account

**Email:** {{email}}
**Login:** [Access Your Account]({{login_link}})

---

## What You Can Do Now

### Free Apps (No Purchase Required)
- [Identity Gap Assessment]({{free_apps_link}}/identity-gap-quiz)
- [Values Clarification]({{free_apps_link}}/values-clarification)
- [Daily Reflection]({{free_apps_link}}/daily-reflection)

### Ready to Go Deeper?
[View Our Products]({{products_link}})

---

## Next Steps

1. Verify your email (check your inbox)
2. Complete your profile
3. Start with a free assessment

**Welcome aboard,**
The Tamkinly Team
`,
        primaryCta: 'Access Your Account',
        primaryUrl: '{{login_link}}'
      }]
    }
  },
  {
    name: 'Password Reset',
    trigger: 'PASSWORD_RESET',
    description: 'Password reset email.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Reset Your Password 🔐',
        preheader: 'Password reset link inside',
        content: `# Reset Your Password 🔐

Hello {{name}},

We received a request to reset your password.

## Reset Link

Click the button below to create a new password:

[Reset Password]({{reset_link}})

---

**This link expires in 1 hour.**

If you didn't request a password reset, you can safely ignore this email.

**The Tamkinly Team**
`,
        primaryCta: 'Reset Password',
        primaryUrl: '{{reset_link}}'
      }]
    }
  },
  {
    name: 'Email Verification',
    trigger: 'EMAIL_VERIFICATION',
    description: 'Email verification request.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Verify Your Email ✉️',
        preheader: 'Confirm your email address',
        content: `# Verify Your Email ✉️

Hello {{name}},

Please verify your email address to complete your account setup.

## Verification Link

[Verify Email]({{verify_link}})

---

**This link expires in 24 hours.**

If you didn't create an account, you can safely ignore this email.

**The Tamkinly Team**
`,
        primaryCta: 'Verify Email',
        primaryUrl: '{{verify_link}}'
      }]
    }
  },

  // ============================================
  // SUPPORT SEQUENCE
  // ============================================
  {
    name: 'Support Ticket Received',
    trigger: 'SUPPORT_TICKET',
    description: 'Confirmation when support ticket is submitted.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'We Received Your Message 📩',
        preheader: 'Ticket #{{ticket_id}}',
        content: `# Support Ticket Received 📩

Hello {{name}},

Thank you for reaching out! We've received your message.

## Ticket Details

**Ticket ID:** #{{ticket_id}}
**Subject:** {{ticket_subject}}
**Submitted:** {{ticket_date}}

---

## What Happens Next

1. Our team will review your message
2. You'll receive a response within {{response_time}}
3. We'll work to resolve your issue

**VIP Members:** You have priority handling with 24-hour response guarantee.

---

If you have additional information to add, reply to this email.

**The Tamkinly Support Team**
`,
        primaryCta: 'View Ticket Status',
        primaryUrl: '{{ticket_link}}'
      }]
    }
  },
  {
    name: 'Support Resolved',
    trigger: 'SUPPORT_RESOLVED',
    description: 'Notification when support ticket is resolved.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: 'Your Ticket is Resolved ✅',
        preheader: 'Ticket #{{ticket_id}}',
        content: `# Ticket Resolved ✅

Hello {{name}},

Great news! Your support ticket has been resolved.

## Resolution Details

**Ticket ID:** #{{ticket_id}}
**Subject:** {{ticket_subject}}
**Resolution:** {{resolution_summary}}

---

## Need More Help?

If you're not satisfied with the resolution or have additional questions, simply reply to this email.

**Rate Your Experience**

How was our support? [Give Feedback]({{feedback_link}})

**The Tamkinly Support Team**
`,
        primaryCta: 'Give Feedback',
        primaryUrl: '{{feedback_link}}'
      }]
    }
  },

  // ============================================
  // SPECIAL OFFERS
  // ============================================
  {
    name: 'Special Offer',
    trigger: 'SPECIAL_OFFER',
    description: 'Special promotional offers.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: '🎉 Special Offer Just For You!',
        preheader: 'Limited time offer inside',
        content: `# Exclusive Offer 🎉

Hello {{name}},

As a valued member of the Tamkinly community, we have a special offer just for you!

## {{offer_name}}

**{{offer_description}}**

### Use Code: **{{offer_code}}**

[Claim Your Offer]({{offer_link}})

---

## Offer Details

- **Discount:** {{discount_amount}}
- **Valid until:** {{expiry_date}}
- **Applies to:** {{applicable_products}}

⚠️ **This offer expires soon. Don't miss out!**

[Shop Now]({{offer_link}})

**With gratitude,**
The Tamkinly Team
`,
        primaryCta: 'Claim Offer',
        primaryUrl: '{{offer_link}}'
      }]
    }
  },
  {
    name: 'Birthday Offer',
    trigger: 'BIRTHDAY',
    description: 'Birthday celebration offer.',
    isActive: true,
    steps: {
      create: [{
        stepNumber: 1,
        delayHours: 0,
        subject: '🎂 Happy Birthday from Tamkinly!',
        preheader: 'A special gift for your special day',
        content: `# Happy Birthday! 🎂

Hello {{name}},

**Happy Birthday from all of us at Tamkinly!** 🎉

We hope your special day is filled with joy, reflection, and excitement for the year ahead.

## Your Birthday Gift

As a token of our appreciation, enjoy **20% off** any purchase!

### Use Code: **BIRTHDAY20**

[Redeem Your Gift]({{birthday_link}})

---

## This Year, Transform

There's no better time than a new year of life to commit to becoming who you were meant to be.

- Start your 30-day transformation
- Unlock advanced tools
- Join our community

**Your birthday gift expires in 7 days.**

[Start Your New Year Right]({{birthday_link}})

**With warm wishes,**
The Tamkinly Team
`,
        primaryCta: 'Redeem Birthday Gift',
        primaryUrl: '{{birthday_link}}'
      }]
    }
  }
];

async function main() {
  console.log('🌱 Seeding email sequences...');

  // Clear existing sequences
  await prisma.emailSequenceStep.deleteMany({});
  await prisma.emailSequence.deleteMany({});

  // Create sequences
  for (const sequence of emailSequences) {
    const { steps, ...sequenceData } = sequence;
    
    const created = await prisma.emailSequence.create({
      data: {
        ...sequenceData,
        steps: steps
      },
      include: { steps: true }
    });

    console.log(`✅ Created sequence: ${created.name} (${created.steps.length} step(s))`);
  }

  console.log(`\n🎉 Successfully seeded ${emailSequences.length} email sequences!`);

  // Summary
  console.log('\n📊 Sequence Summary:');
  console.log('━'.repeat(50));
  
  const categories = {
    'Welcome': emailSequences.filter(s => s.trigger.includes('WELCOME') || s.trigger.includes('SUBSCRIBER')).length,
    'Purchase': emailSequences.filter(s => s.trigger.includes('PURCHASE')).length,
    'Follow-up': emailSequences.filter(s => s.trigger.includes('DAY')).length,
    'Cart': emailSequences.filter(s => s.trigger.includes('CART')).length,
    'Account': emailSequences.filter(s => s.trigger.includes('ACCOUNT') || s.trigger.includes('PASSWORD') || s.trigger.includes('EMAIL')).length,
    'Support': emailSequences.filter(s => s.trigger.includes('SUPPORT')).length,
    'Offers': emailSequences.filter(s => s.trigger.includes('OFFER') || s.trigger.includes('BIRTHDAY')).length,
  };
  
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`📧 ${cat}: ${count} sequence(s)`);
  });
  
  console.log('━'.repeat(50));
  console.log(`   TOTAL: ${emailSequences.length} sequences`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding email sequences:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
