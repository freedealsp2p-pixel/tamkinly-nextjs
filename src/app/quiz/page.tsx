'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Brain, 
  Heart, 
  Shield,
  CheckCircle2,
  Star,
  Zap,
  User,
  Compass,
  TrendingUp,
  Clock,
  Lock,
  ChevronRight,
  Play,
  Download,
  ExternalLink
} from 'lucide-react';

// Types
type QuestionType = {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    value: number;
    insight?: string;
  }[];
  category: 'identity' | 'environment' | 'emotion' | 'decision' | 'progress';
};

type QuizPhase = 'intro' | 'questions' | 'analyzing' | 'results';

type UserProfile = {
  identityClarity: number;
  environmentalAlignment: number;
  emotionalRegulation: number;
  decisionQuality: number;
  progressMomentum: number;
  dominantChallenge: string;
  recommendedProduct: string;
  personalizedMessage: string;
};

// Quiz Questions - Designed to create desire and understanding
const quizQuestions: QuestionType[] = [
  {
    id: 1,
    question: "When you wake up in the morning, what's the first thought that crosses your mind?",
    subtitle: "Be honest with yourself - this reveals your current mental baseline",
    category: 'identity',
    options: [
      { text: "A clear sense of purpose and direction", value: 5, insight: "Strong identity foundation" },
      { text: "A vague unease that something needs to change", value: 3, insight: "Identity seeking" },
      { text: "Overwhelm about everything I need to do", value: 2, insight: "Scattered identity" },
      { text: "A feeling of emptiness or 'who am I really?'", value: 1, insight: "Identity gap detected" }
    ]
  },
  {
    id: 2,
    question: "When you set a goal, what usually happens?",
    subtitle: "This reveals your execution identity pattern",
    category: 'progress',
    options: [
      { text: "I follow through consistently without needing willpower", value: 5, insight: "Aligned action-taker" },
      { text: "I start strong but lose momentum after a few weeks", value: 3, insight: "Inconsistent identity" },
      { text: "I procrastinate and then feel guilty about it", value: 2, insight: "Self-sabotage pattern" },
      { text: "I struggle to even set goals - I don't know what I want", value: 1, insight: "Identity clarity needed" }
    ]
  },
  {
    id: 3,
    question: "How would you describe your relationship with your environment (home, workspace, digital space)?",
    subtitle: "Your environment reflects your internal state",
    category: 'environment',
    options: [
      { text: "Organized and energizing - it supports who I want to become", value: 5, insight: "Environment aligned" },
      { text: "Functional but not inspiring - I've been meaning to improve it", value: 3, insight: "Environmental drift" },
      { text: "Cluttered and draining - I feel stuck in it", value: 2, insight: "Environmental friction" },
      { text: "Chaotic - I can't seem to maintain any order", value: 1, insight: "Environmental collapse" }
    ]
  },
  {
    id: 4,
    question: "When you experience strong emotions, what's your typical response?",
    subtitle: "Emotional regulation is the foundation of identity stability",
    category: 'emotion',
    options: [
      { text: "I acknowledge them, process them, and move forward", value: 5, insight: "Emotionally intelligent" },
      { text: "I try to understand them but sometimes get stuck", value: 3, insight: "Developing awareness" },
      { text: "I suppress or avoid them until they explode", value: 2, insight: "Emotional suppression" },
      { text: "I feel controlled by them - they dictate my actions", value: 1, insight: "Emotional dysregulation" }
    ]
  },
  {
    id: 5,
    question: "When faced with an important decision, you typically...",
    subtitle: "Decision patterns reveal identity clarity",
    category: 'decision',
    options: [
      { text: "Make decisions aligned with my core values quickly and confidently", value: 5, insight: "Decisive identity" },
      { text: "Deliberate but eventually make choices I'm comfortable with", value: 3, insight: "Thoughtful processor" },
      { text: "Overthink, seek validation from others, and second-guess myself", value: 2, insight: "Decision paralysis" },
      { text: "Avoid making decisions or let others decide for me", value: 1, insight: "Decision avoidance" }
    ]
  },
  {
    id: 6,
    question: "Which statement resonates most with you right now?",
    subtitle: "This reveals your current transformation readiness",
    category: 'identity',
    options: [
      { text: "I know who I am and I'm actively becoming a better version", value: 5, insight: "Growth mindset active" },
      { text: "I have some clarity but feel there's more to discover", value: 3, insight: "Seeking deeper truth" },
      { text: "I've lost touch with who I really am under all the expectations", value: 2, insight: "Identity erosion" },
      { text: "I feel like a stranger to myself - I don't know who I am anymore", value: 1, insight: "Identity crisis" }
    ]
  },
  {
    id: 7,
    question: "How do you handle setbacks or failures?",
    subtitle: "Your relationship with failure shapes your identity",
    category: 'progress',
    options: [
      { text: "I see them as feedback and adjust my approach", value: 5, insight: "Resilient identity" },
      { text: "I recover eventually, but they shake my confidence", value: 3, insight: "Recovering resilience" },
      { text: "I spiral into self-doubt and take a long time to bounce back", value: 2, insight: "Fragile identity" },
      { text: "I use them as evidence that I'm not capable of change", value: 1, insight: "Fixed mindset" }
    ]
  },
  {
    id: 8,
    question: "What best describes your current state of mind?",
    subtitle: "Your honest assessment of where you are",
    category: 'identity',
    options: [
      { text: "Grounded and purposeful - I feel in control of my life", value: 5, insight: "Centered identity" },
      { text: "Functional but unfulfilled - something is missing", value: 3, insight: "Identity gap" },
      { text: "Restless and searching - I know I need change but don't know how", value: 2, insight: "Seeking direction" },
      { text: "Lost and overwhelmed - I need a complete reset", value: 1, insight: "Identity reconstruction needed" }
    ]
  }
];

// Products data - links to internal product pages
const products = [
  {
    id: 'trial',
    name: '7-Day Identity Reset',
    price: '$7',
    originalPrice: '$15',
    description: 'A quick-start mini-guide to experience the Tamkinly methodology',
    features: ['7-Day Guided Introduction', 'Daily Prompts Sample', 'Quick Assessment', 'PDF Download'],
    bestFor: 'Curious explorers ready to test the waters',
    color: '#3DD4B0',
    productUrl: '/products/trial'
  },
  {
    id: 'planner',
    name: 'Identity Recode Planner',
    price: '$17',
    originalPrice: '$29',
    description: 'The complete 30-day identity transformation system',
    features: ['Full 30-Day Program', 'Digital + Print Version', 'Daily Prompts', 'Evidence Tracking', 'Lifetime Updates'],
    bestFor: 'Those ready for deep transformation',
    color: '#1F6F78',
    popular: true,
    productUrl: '/products/planner'
  },
  {
    id: 'premium',
    name: 'Premium Transformation',
    price: '$27',
    originalPrice: '$44',
    description: 'Comprehensive transformation with advanced tools',
    features: ['Everything in Planner', 'Identity Reset Checklist', 'Advanced Worksheets', 'Priority Support', 'Quick-start Guide'],
    bestFor: 'Committed individuals seeking complete transformation',
    color: '#0F1C2E',
    productUrl: '/products/premium'
  },
  {
    id: 'bundle',
    name: 'Complete Bundle',
    price: '$47',
    originalPrice: '$91',
    description: 'The ultimate identity transformation experience',
    features: ['All PDF Products', 'Interactive Apps Access', 'Executive Manual', 'Daily Planner App', 'Progress Dashboard', '1-on-1 Support'],
    bestFor: 'Those who want the complete transformation experience',
    color: '#8A94A6',
    productUrl: '/products/bundle'
  }
];

// Main Quiz Component
export default function IdentityQuizPage() {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);

  // Calculate user profile
  const calculateProfile = () => {
    const categories = {
      identity: 0,
      environment: 0,
      emotion: 0,
      decision: 0,
      progress: 0
    };

    let categoryCounts = { ...categories };

    answers.forEach((answer, index) => {
      const question = quizQuestions[index];
      categories[question.category] += answer;
      categoryCounts[question.category]++;
    });

    // Calculate percentages
    const identityClarity = Math.round((categories.identity / (categoryCounts.identity * 5)) * 100);
    const environmentalAlignment = Math.round((categories.environment / (categoryCounts.environment * 5)) * 100);
    const emotionalRegulation = Math.round((categories.emotion / (categoryCounts.emotion * 5)) * 100);
    const decisionQuality = Math.round((categories.decision / (categoryCounts.decision * 5)) * 100);
    const progressMomentum = Math.round((categories.progress / (categoryCounts.progress * 5)) * 100);

    // Calculate overall score
    const overallScore = Math.round((identityClarity + environmentalAlignment + emotionalRegulation + decisionQuality + progressMomentum) / 5);

    // Determine dominant challenge
    const scores = [
      { name: 'Identity Clarity', score: identityClarity },
      { name: 'Environmental Alignment', score: environmentalAlignment },
      { name: 'Emotional Regulation', score: emotionalRegulation },
      { name: 'Decision Quality', score: decisionQuality },
      { name: 'Progress Momentum', score: progressMomentum }
    ];
    const lowestScore = scores.sort((a, b) => a.score - b.score)[0];

    // Determine recommended product based on score
    let recommendedProduct = 'planner';
    let personalizedMessage = '';

    if (overallScore >= 70) {
      recommendedProduct = 'premium';
      personalizedMessage = "You have a strong foundation. The Premium Bundle will help you optimize and master your identity transformation with advanced tools and frameworks.";
    } else if (overallScore >= 50) {
      recommendedProduct = 'planner';
      personalizedMessage = "You're ready for transformation. The Identity Recode Planner is perfectly suited for your journey - it will guide you through a complete 30-day identity reconstruction.";
    } else if (overallScore >= 35) {
      recommendedProduct = 'planner';
      personalizedMessage = "There's significant potential waiting to be unlocked. The Planner will help you rebuild your identity foundation from the ground up.";
    } else {
      recommendedProduct = 'trial';
      personalizedMessage = "Your transformation journey starts with a single step. The 7-Day Reset is the perfect introduction to discover what's possible.";
    }

    setProfile({
      identityClarity,
      environmentalAlignment,
      emotionalRegulation,
      decisionQuality,
      progressMomentum,
      dominantChallenge: lowestScore.name,
      recommendedProduct,
      personalizedMessage
    });
  };

  // Handle answer selection
  const handleAnswer = (value: number) => {
    setSelectedAnswer(value);
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Start analyzing phase
        setPhase('analyzing');
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setAnalyzingProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            calculateProfile();
            setPhase('results');
          }
        }, 100);
      }
    }, 500);
  };

  // Render intro section
  const renderIntro = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-28 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-2 border border-[#3DD4B0]/20">
            <Image 
              src="/logo.png" 
              alt="Tamkinly Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Badge */}
        <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
          <Sparkles className="w-3.5 h-3.5 mr-2" />
          Free Identity Assessment
        </Badge>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Discover Your <span className="text-[#3DD4B0]">Identity Gap</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Answer 8 revealing questions to uncover what's holding you back from becoming 
          the person you know you can be — and get a personalized transformation roadmap.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3DD4B0]">2,847+</div>
            <div className="text-slate-400 text-sm">People Assessed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3DD4B0]">94%</div>
            <div className="text-slate-400 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3DD4B0]">3 min</div>
            <div className="text-slate-400 text-sm">Average Time</div>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => setPhase('questions')}
          className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-10 h-16 text-xl font-semibold shadow-xl rounded-xl transition-all hover:scale-105 group"
        >
          <Play className="mr-3 h-6 w-6 group-hover:animate-pulse" />
          Start Your Free Assessment
          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
        </Button>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#3DD4B0]" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
            <span>No Email Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-[#3DD4B0]" />
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render questions
  const renderQuestions = () => {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion) / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-[#F6F8FA] flex flex-col">
        {/* Progress Bar */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8A94A6]">Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span className="text-sm font-semibold text-[#0F1C2E]">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-200" />
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full">
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8 md:p-12">
                {/* Category Badge */}
                <Badge 
                  className="mb-6"
                  style={{ 
                    backgroundColor: `${question.category === 'identity' ? '#3DD4B0' : 
                      question.category === 'environment' ? '#1F6F78' : 
                      question.category === 'emotion' ? '#E57373' : 
                      question.category === 'decision' ? '#64B5F6' : '#FFB74D'}20`,
                    color: question.category === 'identity' ? '#3DD4B0' : 
                      question.category === 'environment' ? '#1F6F78' : 
                      question.category === 'emotion' ? '#E57373' : 
                      question.category === 'decision' ? '#64B5F6' : '#FFB74D'
                  }}
                >
                  {question.category === 'identity' && <User className="w-3.5 h-3.5 mr-1" />}
                  {question.category === 'environment' && <Compass className="w-3.5 h-3.5 mr-1" />}
                  {question.category === 'emotion' && <Heart className="w-3.5 h-3.5 mr-1" />}
                  {question.category === 'decision' && <Brain className="w-3.5 h-3.5 mr-1" />}
                  {question.category === 'progress' && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
                  {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                </Badge>

                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-3 leading-tight">
                  {question.question}
                </h2>
                
                {question.subtitle && (
                  <p className="text-[#8A94A6] mb-8 text-lg">{question.subtitle}</p>
                )}

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-300 group
                        ${selectedAnswer === option.value 
                          ? 'border-[#3DD4B0] bg-[#3DD4B0]/10 shadow-lg' 
                          : 'border-slate-200 hover:border-[#3DD4B0]/50 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                          ${selectedAnswer === option.value 
                            ? 'bg-[#3DD4B0] text-[#0F1C2E]' 
                            : 'bg-slate-100 text-[#8A94A6] group-hover:bg-[#3DD4B0]/20 group-hover:text-[#3DD4B0]'
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0F1C2E] text-lg">{option.text}</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-[#8A94A6] transition-all
                          ${selectedAnswer === option.value ? 'opacity-100 text-[#3DD4B0]' : 'opacity-0 group-hover:opacity-100'}
                        `} />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Render analyzing phase
  const renderAnalyzing = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Brain */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-[#3DD4B0]/20 animate-ping" />
          <div className="absolute inset-4 rounded-full bg-[#3DD4B0]/30 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-16 h-16 text-[#3DD4B0]" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Analyzing Your Responses
        </h2>
        <p className="text-slate-300 mb-8">
          Our algorithm is processing your answers to create a personalized identity transformation roadmap...
        </p>

        {/* Progress */}
        <div className="max-w-md mx-auto">
          <Progress value={analyzingProgress} className="h-3 bg-slate-700" />
          <p className="text-[#3DD4B0] mt-4 font-semibold">{analyzingProgress}% Complete</p>
        </div>

        {/* Loading Messages */}
        <div className="mt-8 space-y-2 text-slate-400 text-sm">
          {analyzingProgress > 20 && <p className="animate-fade-in">✓ Identifying identity patterns...</p>}
          {analyzingProgress > 40 && <p className="animate-fade-in">✓ Calculating transformation readiness...</p>}
          {analyzingProgress > 60 && <p className="animate-fade-in">✓ Mapping environmental factors...</p>}
          {analyzingProgress > 80 && <p className="animate-fade-in">✓ Generating personalized recommendations...</p>}
        </div>
      </div>
    </div>
  );

  // Render results
  const renderResults = () => {
    if (!profile) return null;

    const recommendedProduct = products.find(p => p.id === profile.recommendedProduct);
    const overallScore = Math.round(
      (profile.identityClarity + profile.environmentalAlignment + profile.emotionalRegulation + 
       profile.decisionQuality + profile.progressMomentum) / 5
    );

    return (
      <div className="min-h-screen bg-[#F6F8FA]">
        {/* Results Header */}
        <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
              Assessment Complete
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Identity Transformation <span className="text-[#3DD4B0]">Roadmap</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Based on your responses, we've identified your key growth areas and created a personalized transformation plan.
            </p>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-6xl mx-auto px-4 py-12 -mt-8">
          {/* Overall Score Card */}
          <Card className="border-0 shadow-xl bg-white mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-[#0F1C2E] p-8 text-center">
                <p className="text-slate-400 mb-2">Your Identity Alignment Score</p>
                <div className="text-6xl font-bold text-[#3DD4B0]">{overallScore}%</div>
                <p className="text-slate-300 mt-2">
                  {overallScore >= 70 ? 'Strong foundation with room for optimization' : 
                   overallScore >= 50 ? 'Good potential with clear growth opportunities' :
                   overallScore >= 35 ? 'Significant transformation potential' :
                   'Major breakthrough opportunity ahead'}
                </p>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-[#0F1C2E] mb-6">Your Detailed Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { label: 'Identity Clarity', value: profile.identityClarity, icon: User, color: '#3DD4B0' },
                    { label: 'Environment', value: profile.environmentalAlignment, icon: Compass, color: '#1F6F78' },
                    { label: 'Emotional Reg.', value: profile.emotionalRegulation, icon: Heart, color: '#E57373' },
                    { label: 'Decision Quality', value: profile.decisionQuality, icon: Brain, color: '#64B5F6' },
                    { label: 'Progress Momentum', value: profile.progressMomentum, icon: TrendingUp, color: '#FFB74D' }
                  ].map((metric) => (
                    <div key={metric.label} className="text-center p-4 rounded-xl bg-slate-50">
                      <metric.icon className="w-8 h-8 mx-auto mb-2" style={{ color: metric.color }} />
                      <div className="text-2xl font-bold text-[#0F1C2E]">{metric.value}%</div>
                      <div className="text-sm text-[#8A94A6]">{metric.label}</div>
                      <Progress value={metric.value} className="h-1.5 mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Insight */}
          <Card className="border-2 border-[#3DD4B0]/30 bg-white mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#3DD4B0]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F1C2E] mb-2">Your Dominant Growth Area</h3>
                  <p className="text-[#8A94A6] mb-4">
                    Your assessment reveals that <strong className="text-[#0F1C2E]">{profile.dominantChallenge}</strong> is your primary opportunity for transformation. 
                    Addressing this area will create the most significant positive impact on your overall identity alignment.
                  </p>
                  <p className="text-[#0F1C2E] font-medium">{profile.personalizedMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Recommendation */}
          <div className="text-center mb-8">
            <Badge className="mb-4 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0]">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Recommended For You
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F1C2E] mb-4">Your Perfect Transformation Match</h2>
          </div>

          {/* Recommended Product */}
          {recommendedProduct && (
            <Card className="border-2 shadow-xl bg-white mb-6 overflow-hidden" style={{ borderColor: recommendedProduct.color }}>
              {recommendedProduct.popular && (
                <div className="bg-[#3DD4B0] text-[#0F1C2E] text-center py-2 text-sm font-semibold">
                  Most Popular Choice
                </div>
              )}
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  {/* Left - Product Info */}
                  <div className="p-8" style={{ backgroundColor: `${recommendedProduct.color}10` }}>
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6"
                      style={{ backgroundColor: recommendedProduct.color }}
                    >
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F1C2E] mb-2">{recommendedProduct.name}</h3>
                    <p className="text-[#8A94A6] mb-4">{recommendedProduct.description}</p>
                    <p className="text-sm text-[#0F1C2E] font-medium mb-6">{recommendedProduct.bestFor}</p>
                    
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold" style={{ color: recommendedProduct.color }}>{recommendedProduct.price}</span>
                      <span className="text-[#8A94A6] line-through">{recommendedProduct.originalPrice}</span>
                      <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0]">Save {Math.round((1 - parseInt(recommendedProduct.price.slice(1)) / parseInt(recommendedProduct.originalPrice.slice(1))) * 100)}%</Badge>
                    </div>
                  </div>
                  
                  {/* Right - Features & CTA */}
                  <div className="p-8">
                    <h4 className="font-semibold text-[#0F1C2E] mb-4">What's Included:</h4>
                    <ul className="space-y-3 mb-8">
                      {recommendedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0" />
                          <span className="text-[#2B2E34]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link href={recommendedProduct.productUrl}>
                      <Button 
                        className="w-full h-14 text-lg font-semibold shadow-lg"
                        style={{ backgroundColor: recommendedProduct.color, color: recommendedProduct.id === 'premium' || recommendedProduct.id === 'bundle' ? 'white' : '#0F1C2E' }}
                      >
                        Start Your Transformation
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    
                    <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[#8A94A6]">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 w-4" />
                        <span>30-Day Guarantee</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 w-4" />
                        <span>Instant Access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Products */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#0F1C2E] text-center mb-6">All Transformation Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link key={product.id} href={product.productUrl} className="block">
                  <Card 
                    className={`border-2 hover:shadow-lg transition-all cursor-pointer h-full ${profile.recommendedProduct === product.id ? 'border-[#3DD4B0]' : 'border-transparent hover:border-slate-200'}`}
                  >
                    <CardContent className="p-6">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"
                        style={{ backgroundColor: product.color }}
                      >
                        <Zap className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-[#0F1C2E] mb-1">{product.name}</h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold" style={{ color: product.color }}>{product.price}</span>
                        <span className="text-xs text-[#8A94A6] line-through">{product.originalPrice}</span>
                      </div>
                      {profile.recommendedProduct === product.id && (
                        <Badge className="mt-3 bg-[#3DD4B0]/20 text-[#3DD4B0]">Recommended</Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <Card className="mt-12 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Identity?
              </h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands who have already begun their journey back to themselves. 
                Your transformation starts with a single decision.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {recommendedProduct && (
                  <Link href={recommendedProduct.productUrl}>
                    <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-10 h-14 text-lg font-semibold shadow-xl">
                      Begin Your Transformation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Link href="/products">
                  <Button variant="white" size="lg" className="px-8 h-14 font-semibold">
                    View All Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <>
      {phase === 'intro' && renderIntro()}
      {phase === 'questions' && renderQuestions()}
      {phase === 'analyzing' && renderAnalyzing()}
      {phase === 'results' && renderResults()}
    </>
  );
}
