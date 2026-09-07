/**
 * Scientific References for Blog Articles
 * Maps each article slug to 2-3 verified scientific/academic sources.
 * Used by ArticleReferences component (E-E-A-T signal for search engines).
 */

export interface ArticleRef {
  title: string;
  source: string;
  url: string;
}

export const ARTICLE_REFERENCES: Record<string, ArticleRef[]> = {
  'identity-gap-assessment': [
    {
      title: 'Higgins, E. T. (1987). Self-discrepancy: A theory relating self and affect.',
      source: 'Journal of Personality and Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-34444-001',
    },
    {
      title: 'Markus, H., & Nurius, P. (1986). Possible selves.',
      source: 'American Psychologist — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-01154-001',
    },
    {
      title: 'The Effect of Self-Discrepancy on Online Behavior.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9087717',
    },
  ],

  'values-clarification-tool': [
    {
      title: 'Working With Values: An Overview of Approaches and Considerations in Implementing Values-Based Practice.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8854463',
    },
    {
      title: 'Personal Values Card Sort — ACT-based values clarification instrument.',
      source: 'Dr. Jenny Shields (Acceptance & Commitment Therapy tool)',
      url: 'https://drjennyshields.com/values-card-sort',
    },
    {
      title: 'Values Assessment: values clarification exercise (ACT).',
      source: 'Therapist Aid — interactive clinical tool',
      url: 'https://www.therapistaid.com/activity/values-assessment',
    },
  ],

  'daily-reflection-practice': [
    {
      title: 'Frattaroli, J. (2006). Experimental disclosure and its moderators: A meta-analysis of expressive writing studies.',
      source: 'Psychological Bulletin — PMC, National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3830620',
    },
    {
      title: 'Baikie, K. A., & Wilhelm, K. (2005). Emotional and physical health benefits of expressive writing.',
      source: 'Advances in Psychiatric Treatment — Cambridge University Press',
      url: 'https://www.cambridge.org/core/journals/advances-in-psychiatric-treatment/article/emotional-and-physical-health-benefits-of-expressive-writing/ED2976A61F5DE56B46F07A1CE9EA9F9F',
    },
    {
      title: 'Expressive writing can help your mental health.',
      source: 'American Psychological Association (APA)',
      url: 'https://www.apa.org/news/podcasts/speaking-of-psychology/expressive-writing',
    },
  ],

  'identity-recode-system-guide': [
    {
      title: 'Lally, P., van Jaarsveld, C., Potts, H., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
    {
      title: 'Gardner, B., Lally, P., & Wardle, J. (2012). Making health habitual: the psychology of habit-formation and general practice.',
      source: 'British Journal of General Practice — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409',
    },
    {
      title: 'Time to Form a Habit: A Systematic Review and Meta-Analysis of Health Behaviour Habit Formation.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11641623',
    },
  ],

  'ai-identity-coach-guide': [
    {
      title: 'Artificial Intelligence–Based Chatbots for Promoting Health Behavioral Changes: Systematic Review.',
      source: 'Journal of Medical Internet Research (JMIR)',
      url: 'https://www.jmir.org/2023/1/e40789',
    },
    {
      title: 'Systematic review and meta-analysis of the effectiveness of conversational AI agents in health behavior change.',
      source: 'npj Digital Medicine — Nature',
      url: 'https://www.nature.com/articles/s41746-023-00856-1',
    },
    {
      title: 'An AI Health Coach Could Change Your Mindset.',
      source: 'Stanford HAI (Human-Centered AI Institute)',
      url: 'https://hai.stanford.edu/news/an-ai-health-coach-could-change-your-mindset',
    },
  ],

  'who-am-i-worksheet': [
    {
      title: 'Markus, H., & Nurius, P. (1986). Possible selves.',
      source: 'American Psychologist — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-01154-001',
    },
    {
      title: 'Higgins, E. T. (1987). Self-discrepancy: A theory relating self and affect.',
      source: 'Columbia University — full-text paper',
      url: 'https://www.columbia.edu/cu/psychology/higgins/papers/HIGGINS%3DPSYCH%20REVIEW%201987.pdf',
    },
  ],

  'identity-based-habits-worksheet': [
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
    {
      title: 'Oyserman, D. Identity-Based Motivation: Core Processes and Interventions.',
      source: 'Emerald Publishing — book chapter',
      url: 'https://www.emerald.com/books/edited-volume/14624/chapter/85666200/Identity-Based-Motivation-Core-Processes-and',
    },
    {
      title: 'Neilson, B. N., et al. (2014). Habits: bridging the gap between personhood and practical wisdom.',
      source: 'Frontiers in Human Neuroscience',
      url: 'https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2014.00330/full',
    },
  ],

  'self-authorship-worksheet': [
    {
      title: 'Baxter Magolda, M. B. (2008). Promoting Self-Authorship to Promote Liberal Education.',
      source: 'Journal of College & Character — Taylor & Francis',
      url: 'https://www.tandfonline.com/doi/pdf/10.2202/1940-1639.1079',
    },
    {
      title: 'Enhancing, Inhibiting, and Maintaining Voice: An Examination of Students\u2019 Self-Authorship Journeys.',
      source: 'ResearchGate',
      url: 'https://www.researchgate.net/publication/319874772',
    },
  ],

  'identity-baseline-8d-worksheet': [
    {
      title: 'Higgins, E. T. (1987). Self-discrepancy: A theory relating self and affect.',
      source: 'Journal of Personality and Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-34444-001',
    },
    {
      title: 'Markus, H., & Nurius, P. (1986). Possible selves.',
      source: 'American Psychologist — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-01154-001',
    },
  ],

  'environmental-audit-worksheet': [
    {
      title: 'Mertens, S., Herberz, M., Hahnel, U., & Brosch, T. (2022). The effectiveness of nudging: A meta-analysis of choice architecture interventions.',
      source: 'PNAS — PMC, National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8740589',
    },
    {
      title: 'Choice Architecture: How to Stick With Habits When Willpower Is Gone.',
      source: 'James Clear — behavioral science primer',
      url: 'https://jamesclear.com/choice-architecture',
    },
    {
      title: 'Choice Architecture 2.0: How People Interpret and Make Sense of Nudges.',
      source: 'Behavioral Scientist',
      url: 'https://behavioralscientist.org/choice-architecture-2-0-how-people-interpret-and-make-sense-of-nudges',
    },
  ],

  'erq-emotional-regulation-worksheet': [
    {
      title: 'Lougheed, J. P., & Hollenstein, T. (2023). The Emotion Regulation Questionnaire\u2013Short Form (ERQ-S): A 6-item measure of cognitive reappraisal and expressive suppression.',
      source: 'Journal of Affective Disorders — ScienceDirect',
      url: 'https://www.sciencedirect.com/science/article/pii/S0165032723010583',
    },
    {
      title: 'The Emotion Regulation Questionnaire-Short Form (ERQ-S).',
      source: 'PubMed — National Library of Medicine',
      url: 'https://pubmed.ncbi.nlm.nih.gov/37597776',
    },
    {
      title: 'The clinical significance of cognitive reappraisal and expressive suppression.',
      source: 'Frontiers in Psychiatry',
      url: 'https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2025.1614234/full',
    },
  ],

  'physics-of-momentum': [
    {
      title: 'Amabile, T., & Kramer, S. The Progress Principle: How Small Wins Unleash Creativity.',
      source: 'Harvard Business School — Working Knowledge',
      url: 'https://www.library.hbs.edu/working-knowledge/how-small-wins-unleash-creativity',
    },
    {
      title: 'Understanding the Progress Principle: Small Wins for Big Motivation.',
      source: 'Psychology Fanatic — research digest',
      url: 'https://psychologyfanatic.com/the-progress-principle',
    },
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
  ],

  'magic-in-work-you-avoid': [
    {
      title: 'Leroy, S. (2009). Why is it so hard to do my work? The challenge of attention residue when switching between work tasks.',
      source: 'Organizational Behavior and Human Decision Processes — ScienceDirect',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0749597809000399',
    },
    {
      title: 'Sirois, F., & Pychyl, T. (2013). Procrastination and the Priority of Short-Term Mood Regulation.',
      source: 'Social and Personality Psychology Compass — Wiley',
      url: 'https://compass.onlinelibrary.wiley.com/doi/10.1111/spc3.12011',
    },
    {
      title: 'Modulating task outcome value to mitigate real-world procrastination.',
      source: 'eLife — reviewed preprint',
      url: 'https://elifesciences.org/reviewed-preprints/108241v1',
    },
  ],

  'identity-millionaire': [
    {
      title: 'Mullainathan, S., & Shafir, E. (2013). Scarcity: Why Having Too Little Means So Much.',
      source: 'Harvard Kennedy School — book page',
      url: 'https://www.hks.harvard.edu/centers/cid/publications/books/scarcity-why-having-too-little-means-so-much',
    },
    {
      title: 'The psychology of scarcity.',
      source: 'American Psychological Association — APA Monitor',
      url: 'https://www.apa.org/monitor/2014/02/scarcity',
    },
    {
      title: 'Oyserman, D. Identity-Based Motivation: Core Processes and Interventions.',
      source: 'Emerald Publishing — book chapter',
      url: 'https://www.emerald.com/books/edited-volume/14624/chapter/85666200/Identity-Based-Motivation-Core-Processes-and',
    },
  ],

  'all-in-or-nothing': [
    {
      title: 'Understanding Goal Commitments for Behavioral Changes in the Wild (Sticky Goals).',
      source: 'ACM CHI — ACM Digital Library',
      url: 'https://dl.acm.org/doi/fullHtml/10.1145/3411764.3445295',
    },
    {
      title: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes.',
      source: 'Advances in Experimental Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/2007-19538-002',
    },
    {
      title: 'The Impact of Commitment, Accountability, and Written Goals on Goal Achievement.',
      source: 'Dominican University of California — scholar archive',
      url: 'https://scholar.dominican.edu/cgi/viewcontent.cgi?article=1002&context=psychology-faculty-conference-presentations',
    },
  ],

  'five-steps-to-miracles': [
    {
      title: 'Markus, H., & Nurius, P. (1986). Possible selves.',
      source: 'American Psychologist — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-01154-001',
    },
    {
      title: 'Aspects of possible self that predict motivation to achieve or avoid it.',
      source: 'Journal of Experimental Social Psychology — ScienceDirect',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0022103103000295',
    },
    {
      title: 'Monroy, M., & Keltner, D. (2023). Awe as a Pathway to Mental and Physical Health.',
      source: 'Perspectives on Psychological Science — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10018061',
    },
  ],

  'inversion-thinking': [
    {
      title: 'Klein, G. Pre-Mortem technique: prospective hindsight analysis.',
      source: 'The Uncertainty Project — decision science tools',
      url: 'https://www.theuncertaintyproject.org/tools/pre-mortem',
    },
    {
      title: 'Project Pre-mortem using Prospective Hindsight: An Unexplored Tool to Address Implementation Barriers.',
      source: 'ResearchGate',
      url: 'https://www.researchgate.net/publication/355070855',
    },
    {
      title: 'Inversion: The Crucial Thinking Skill Nobody Ever Taught You.',
      source: 'James Clear — mental models primer',
      url: 'https://jamesclear.com/inversion',
    },
  ],

  'speed-as-strategy': [
    {
      title: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis.',
      source: 'Advances in Experimental Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/2007-19538-002',
    },
    {
      title: 'Leroy, S. (2009). The challenge of attention residue when switching between work tasks.',
      source: 'Organizational Behavior and Human Decision Processes — ScienceDirect',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0749597809000399',
    },
    {
      title: 'Goal Setting Theory: Locke & Latham research overview.',
      source: 'ScienceDirect — topics in social sciences',
      url: 'https://www.sciencedirect.com/topics/social-sciences/goal-setting-theory',
    },
  ],

  'ten-minute-block-system': [
    {
      title: 'Leroy, S. (2009). Why is it so hard to do my work? Attention residue when switching between tasks.',
      source: 'Organizational Behavior and Human Decision Processes — ScienceDirect',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0749597809000399',
    },
    {
      title: 'Modulating task outcome value to mitigate real-world procrastination.',
      source: 'eLife — reviewed preprint',
      url: 'https://elifesciences.org/reviewed-preprints/108241v1',
    },
    {
      title: 'Sirois, F., & Pychyl, T. (2013). Procrastination and the Priority of Short-Term Mood Regulation.',
      source: 'Social and Personality Psychology Compass — Wiley',
      url: 'https://compass.onlinelibrary.wiley.com/doi/10.1111/spc3.12011',
    },
  ],

  'work-on-yourself': [
    {
      title: 'Psycho-Cybernetics in Depression: self-image psychotherapy perspective chapter.',
      source: 'IntechOpen — open access',
      url: 'https://www.intechopen.com/chapters/1161003',
    },
    {
      title: 'Maltz, M. Psycho-Cybernetics — self-image theory overview.',
      source: 'Wikipedia (encyclopedic overview with references)',
      url: 'https://en.wikipedia.org/wiki/Psycho-Cybernetics',
    },
    {
      title: 'Higgins, E. T. (1987). Self-discrepancy: A theory relating self and affect.',
      source: 'Journal of Personality and Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-34444-001',
    },
  ],

  'becoming-exceptional': [
    {
      title: 'Ericsson, K. A., et al. Deliberate practice and acquisition of expert performance.',
      source: 'PubMed — National Library of Medicine',
      url: 'https://pubmed.ncbi.nlm.nih.gov/18778378',
    },
    {
      title: 'Deliberate Practice and Proposed Limits on the Effects of Practice on Memory.',
      source: 'Frontiers in Psychology',
      url: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.02396/full',
    },
    {
      title: 'The Differential Influence of Experience, Practice, and Deliberate Practice on Development of Superior Performance.',
      source: 'Cambridge Handbook of Expertise and Expert Performance',
      url: 'https://www.cambridge.org/core/books/cambridge-handbook-of-expertise-and-expert-performance/differential-influence-of-experience-practice-and-deliberate-practice-on-the-development-of-superior-individual-performance-of-experts/757F5B791A5EAE0C46E738A26B2AAFC1',
    },
  ],

  'dopamine-reset': [
    {
      title: 'Striatal dopamine synthesis capacity reflects smartphone addiction severity.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8170001',
    },
    {
      title: 'Addictive potential of social media, explained by neuroscience.',
      source: 'Stanford Medicine — Insights',
      url: 'https://med.stanford.edu/news/insights/2021/10/addictive-potential-of-social-media-explained.html',
    },
  ],

  'and-the-bamboo-kept-growing': [
    {
      title: 'Delay of gratification and adult outcomes: The Marshmallow Test re-examined.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11581930',
    },
    {
      title: 'The Marshmallow Experiment and the Power of Delayed Gratification.',
      source: 'James Clear — behavioral science primer',
      url: 'https://jamesclear.com/delayed-gratification',
    },
  ],

  'automatic-change': [
    {
      title: 'Predictive processing models and affective neuroscience.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9074371',
    },
    {
      title: 'Disentangling predictive processing in the brain: a meta-analysis.',
      source: 'Scientific Reports — Nature',
      url: 'https://www.nature.com/articles/s41598-021-95603-5',
    },
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
  ],

  'physics-of-consciousness': [
    {
      title: 'Myelin plasticity: sculpting circuits in learning and memory.',
      source: 'Nature Reviews Neuroscience — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8018611',
    },
    {
      title: 'Neural activity promotes brain plasticity through myelin growth.',
      source: 'Stanford Medicine — News',
      url: 'https://med.stanford.edu/news/all-news/2014/04/neural-activity-promotes-brain-plasticity-through-myelin-growth-study-finds.html',
    },
    {
      title: 'The neuroplastic brain: current breakthroughs and emerging frontiers.',
      source: 'Brain Research — ScienceDirect',
      url: 'https://www.sciencedirect.com/science/article/pii/S0006899325002021',
    },
  ],

  'redefining-discipline': [
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
    {
      title: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis.',
      source: 'Advances in Experimental Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/2007-19538-002',
    },
    {
      title: 'Gardner, B., et al. (2012). Making health habitual: the psychology of habit-formation.',
      source: 'British Journal of General Practice — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409',
    },
  ],

  'vagus-nerve-breathing': [
    {
      title: 'Zaccaro, A., et al. (2018). How Breath-Control Can Change Your Life: The Respiratory Vagal Stimulation Model.',
      source: 'Frontiers in Human Neuroscience — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6189422',
    },
    {
      title: 'Benefits from one session of deep and slow breathing on vagal tone and anxiety.',
      source: 'Scientific Reports — Nature',
      url: 'https://www.nature.com/articles/s41598-021-98736-9',
    },
    {
      title: 'The science of slow breathing and heart rate variability.',
      source: 'PubMed — National Library of Medicine',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40252198',
    },
  ],

  'how-to-build-habits-that-stick': [
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
    {
      title: 'Time to Form a Habit: A Systematic Review and Meta-Analysis of Health Behaviour Habit Formation.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11641623',
    },
    {
      title: 'Gardner, B., et al. (2012). Making health habitual: the psychology of habit-formation.',
      source: 'British Journal of General Practice — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409',
    },
  ],

  'morning-routine-identity': [
    {
      title: 'Habit formation following routine-based versus time-based cue planning.',
      source: 'British Journal of Health Psychology — Wiley',
      url: 'https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/bjhp.12504',
    },
    {
      title: 'Time to Form a Habit: A Systematic Review and Meta-Analysis.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11641623',
    },
    {
      title: 'Morning Routines and Mental Health: What Science Actually Shows.',
      source: 'Simply Psychology — research digest',
      url: 'https://www.simplypsychology.com/articles/morning-routine-mental-health',
    },
  ],

  'stop-procrastinating-identity-shift': [
    {
      title: 'Sirois, F., & Pychyl, T. (2013). Procrastination and the Priority of Short-Term Mood Regulation.',
      source: 'Social and Personality Psychology Compass — Wiley',
      url: 'https://compass.onlinelibrary.wiley.com/doi/10.1111/spc3.12011',
    },
    {
      title: 'Modulating task outcome value to mitigate real-world procrastination.',
      source: 'eLife — reviewed preprint',
      url: 'https://elifesciences.org/reviewed-preprints/108241v1',
    },
    {
      title: 'Markus, H., & Nurius, P. (1986). Possible selves.',
      source: 'American Psychologist — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-01154-001',
    },
  ],

  'self-discipline-science': [
    {
      title: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis.',
      source: 'Advances in Experimental Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/2007-19538-002',
    },
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
    {
      title: 'Gardner, B., et al. (2012). Making health habitual: the psychology of habit-formation.',
      source: 'British Journal of General Practice — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409',
    },
  ],

  'goal-setting-framework': [
    {
      title: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes.',
      source: 'Advances in Experimental Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/2007-19538-002',
    },
    {
      title: 'Promoting the translation of intentions into action by implementation intentions.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4500900',
    },
    {
      title: 'Goal Setting Theory (Locke & Latham) research overview.',
      source: 'ScienceDirect — topics in social sciences',
      url: 'https://www.sciencedirect.com/topics/social-sciences/goal-setting-theory',
    },
  ],

  'ar-tatweer-althat': [
    {
      title: 'Higgins, E. T. (1987). Self-discrepancy: A theory relating self and affect.',
      source: 'Journal of Personality and Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-34444-001',
    },
    {
      title: 'Markus, H., & Nurius, P. (1986). Possible selves.',
      source: 'American Psychologist — APA PsycNet',
      url: 'https://psycnet.apa.org/record/1987-01154-001',
    },
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
  ],

  'ar-binaa-al3aadat': [
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
    {
      title: 'Time to Form a Habit: A Systematic Review and Meta-Analysis of Health Behaviour Habit Formation.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11641623',
    },
    {
      title: 'Gardner, B., et al. (2012). Making health habitual: the psychology of habit-formation.',
      source: 'British Journal of General Practice — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409',
    },
  ],

  'ar-tahqeeq-alahdaf': [
    {
      title: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis.',
      source: 'Advances in Experimental Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/2007-19538-002',
    },
    {
      title: 'Promoting the translation of intentions into action by implementation intentions.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4500900',
    },
    {
      title: 'Goal Setting Theory (Locke & Latham) research overview.',
      source: 'ScienceDirect — topics in social sciences',
      url: 'https://www.sciencedirect.com/topics/social-sciences/goal-setting-theory',
    },
  ],

  'ar-aldhibat-althati': [
    {
      title: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis.',
      source: 'Advances in Experimental Social Psychology — APA PsycNet',
      url: 'https://psycnet.apa.org/record/2007-19538-002',
    },
    {
      title: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world.',
      source: 'European Journal of Social Psychology — Wiley',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    },
    {
      title: 'Gardner, B., et al. (2012). Making health habitual: the psychology of habit-formation.',
      source: 'British Journal of General Practice — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409',
    },
  ],

  'ar-idarat-alwaqt': [
    {
      title: 'Leroy, S. (2009). Why is it so hard to do my work? Attention residue when switching between tasks.',
      source: 'Organizational Behavior and Human Decision Processes — ScienceDirect',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0749597809000399',
    },
    {
      title: 'Modulating task outcome value to mitigate real-world procrastination.',
      source: 'eLife — reviewed preprint',
      url: 'https://elifesciences.org/reviewed-preprints/108241v1',
    },
    {
      title: 'Sirois, F., & Pychyl, T. (2013). Procrastination and the Priority of Short-Term Mood Regulation.',
      source: 'Social and Personality Psychology Compass — Wiley',
      url: 'https://compass.onlinelibrary.wiley.com/doi/10.1111/spc3.12011',
    },
  ],

  'ar-hindasat-al-dimag': [
    {
      title: 'Myelin plasticity: sculpting circuits in learning and memory.',
      source: 'Nature Reviews Neuroscience — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8018611',
    },
    {
      title: 'The neuroplastic brain: current breakthroughs and emerging frontiers.',
      source: 'Brain Research — ScienceDirect',
      url: 'https://www.sciencedirect.com/science/article/pii/S0006899325002021',
    },
    {
      title: 'Neural activity promotes brain plasticity through myelin growth.',
      source: 'Stanford Medicine — News',
      url: 'https://med.stanford.edu/news/all-news/2014/04/neural-activity-promotes-brain-plasticity-through-myelin-growth-study-finds.html',
    },
  ],

  'ar-karizma-al-tatheer': [
    {
      title: 'Fiske, S. T. (2018). Stereotype Content: Warmth and Competence Endure.',
      source: 'Current Directions in Psychological Science — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5945217',
    },
    {
      title: 'The Stereotype Content Model and the BIAS Map.',
      source: 'Harvard Business School — faculty research',
      url: 'https://www.hbs.edu/faculty/Pages/item.aspx?num=34511',
    },
    {
      title: 'Warmth and competence as universal dimensions of social perception.',
      source: 'Princeton University — research repository',
      url: 'https://collaborate.princeton.edu/en/publications/warmth-and-competence-as-universal-dimensions-of-social-perceptio',
    },
  ],

  'ar-khulasat-al-arbaeen': [
    {
      title: 'Monroy, M., & Keltner, D. (2023). Awe as a Pathway to Mental and Physical Health.',
      source: 'Perspectives on Psychological Science — PMC',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10018061',
    },
    {
      title: 'Delay of gratification and adult outcomes: The Marshmallow Test re-examined.',
      source: 'PMC — National Library of Medicine',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11581930',
    },
    {
      title: 'The psychology of scarcity.',
      source: 'American Psychological Association — APA Monitor',
      url: 'https://www.apa.org/monitor/2014/02/scarcity',
    },
  ],
};
