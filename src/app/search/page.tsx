'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ArrowRight, 
  Clock, 
  FileText,
  AppWindow,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useState, Suspense } from 'react';

// Searchable content - comprehensive list
const searchableContent = [
  // Main Pages
  { title: 'Home', path: '/', type: 'page', description: 'Tamkinly - Return to your center', keywords: ['home', 'main', 'start', 'landing'] },
  { title: 'Products & Pricing', path: '/products', type: 'page', description: 'Start free with powerful identity tools, then upgrade as you grow', keywords: ['pricing', 'buy', 'purchase', 'planner', 'bundle', 'premium', 'trial'] },
  { title: 'Apps', path: '/apps', type: 'page', description: 'Interactive transformation tools', keywords: ['tools', 'applications', 'apps'] },
  { title: 'Methodology', path: '/methodology', type: 'page', description: 'Our evidence-based transformation approach', keywords: ['method', 'approach', 'how', 'process'] },
  { title: 'About Us', path: '/about', type: 'page', description: 'Learn about Tamkinly and our mission', keywords: ['about', 'team', 'founder', 'story', 'mission'] },
  { title: 'Contact', path: '/contact', type: 'page', description: 'Get in touch with us', keywords: ['contact', 'support', 'help', 'email'] },
  { title: 'Blog', path: '/blog', type: 'page', description: 'Research-backed insights and articles', keywords: ['blog', 'articles', 'posts', 'news'] },
  
  // Quiz
  { title: 'Identity Gap Quiz', path: '/quiz', type: 'app', description: 'Free 5-minute assessment to discover your identity gap', keywords: ['quiz', 'assessment', 'test', 'identity', 'gap', 'free'] },
  { title: 'Quiz Results', path: '/quiz/results', type: 'app', description: 'View your assessment results', keywords: ['results', 'score', 'outcome'] },
  
  // Apps
  { title: 'Identity Gap Assessment', path: '/apps/identity-gap-quiz', type: 'app', description: '12-question assessment with detailed analysis', keywords: ['identity', 'quiz', 'gap', 'assessment', 'self-trust', 'clarity'] },
  { title: 'Habit Tracker', path: '/apps/habit-tracker', type: 'app', description: 'Track and build identity-based habits', keywords: ['habit', 'tracker', 'habits', 'consistency'] },
  { title: 'Goal System', path: '/apps/goal-system', type: 'app', description: 'Set and achieve identity-aligned goals', keywords: ['goal', 'goals', 'system', 'achievement'] },
  { title: 'AI Identity Coach', path: '/apps/ai-identity-coach', type: 'app', description: '24/7 AI-powered transformation guidance', keywords: ['ai', 'coach', 'artificial', 'intelligence', 'gpt'] },
  { title: 'Daily Reflection', path: '/apps/daily-reflection', type: 'app', description: 'Guided daily prompts for self-awareness', keywords: ['daily', 'reflection', 'journal', 'prompts'] },
  { title: 'Values Clarification', path: '/apps/values-clarification', type: 'app', description: 'Discover your core values', keywords: ['values', 'clarification', 'core', 'priorities'] },
  { title: 'Decision Analysis', path: '/apps/decision-analysis', type: 'app', description: 'Analyze and improve your decision patterns', keywords: ['decision', 'analysis', 'choices', 'patterns'] },
  { title: 'Progress Dashboard', path: '/apps/progress-dashboard', type: 'app', description: 'Track your transformation journey', keywords: ['progress', 'dashboard', 'tracking', 'metrics'] },
  { title: 'Evidence Tracking', path: '/apps/evidence-tracking', type: 'app', description: 'Document proof of your growth', keywords: ['evidence', 'tracking', 'proof', 'growth'] },
  { title: 'Environmental Audit', path: '/apps/environmental-audit', type: 'app', description: 'Assess your environment for growth', keywords: ['environment', 'audit', 'surroundings', 'space'] },
  { title: 'Identity Baseline', path: '/apps/identity-baseline', type: 'app', description: 'Establish your identity starting point', keywords: ['baseline', 'identity', 'starting', 'foundation'] },
  { title: 'Executive Manual', path: '/apps/executive-manual', type: 'app', description: 'Comprehensive transformation guide', keywords: ['manual', 'guide', 'executive'] },
  
  // Products
  { title: '7-Day Trial', path: '/products/trial', type: 'product', description: 'Quick-start mini-guide', keywords: ['trial', '7-day', 'starter'] },
  { title: 'Identity Recode Planner', path: '/products/planner', type: 'product', description: 'Complete 30-day transformation system', keywords: ['planner', '30-day', 'recode'] },
  { title: 'Premium Transformation', path: '/products/premium', type: 'product', description: 'Advanced tools and analytics', keywords: ['premium', 'advanced', 'analytics'] },
  { title: 'Complete Bundle', path: '/products/bundle', type: 'product', description: 'All products and features', keywords: ['bundle', 'complete', 'all'] },
  
  // Blog Articles
  { title: 'Identity Recode System Guide', path: '/blog/identity-recode-system-guide', type: 'article', description: 'Complete transformation system guide', keywords: ['recode', 'system', 'guide'] },
  { title: 'AI Identity Coach Guide', path: '/blog/ai-identity-coach-guide', type: 'article', description: '24/7 AI coaching guide', keywords: ['ai', 'coach', 'guide'] },
  { title: 'Who Am I Worksheet', path: '/blog/who-am-i-worksheet', type: 'article', description: 'Complete identity exploration', keywords: ['who', 'worksheet', 'identity', 'exploration'] },
  { title: 'Identity-Based Habits Worksheet', path: '/blog/identity-based-habits-worksheet', type: 'article', description: "James Clear's method for habit change", keywords: ['habits', 'worksheet', 'clear', 'method'] },
  { title: 'Self-Authorship Worksheet', path: '/blog/self-authorship-worksheet', type: 'article', description: 'Your internal voice journey', keywords: ['self', 'authorship', 'internal', 'voice'] },
  { title: 'Identity Baseline 8D Worksheet', path: '/blog/identity-baseline-8d-worksheet', type: 'article', description: 'Holistic self-assessment', keywords: ['baseline', '8d', 'holistic', 'assessment'] },
  { title: 'Environmental Audit Worksheet', path: '/blog/environmental-audit-worksheet', type: 'article', description: 'Design your growth space', keywords: ['environmental', 'audit', 'space', 'design'] },
  { title: 'ERQ Emotional Regulation', path: '/blog/erq-emotional-regulation-worksheet', type: 'article', description: 'Master your inner world', keywords: ['erq', 'emotional', 'regulation'] },
  { title: 'Physics of Momentum', path: '/blog/physics-of-momentum', type: 'article', description: 'Why 18 minutes changes everything', keywords: ['physics', 'momentum', 'time'] },
  { title: 'Magic in Work You Avoid', path: '/blog/magic-in-work-you-avoid', type: 'article', description: 'The key in transformation', keywords: ['magic', 'avoid', 'work'] },
  { title: 'Identity Millionaire', path: '/blog/identity-millionaire', type: 'article', description: 'Building wealth through transformation', keywords: ['millionaire', 'wealth', 'success'] },
  { title: 'All In or Nothing', path: '/blog/all-in-or-nothing', type: 'article', description: 'The power of full commitment', keywords: ['all', 'commitment', 'dedication'] },
  { title: 'Five Steps to Miracles', path: '/blog/five-steps-to-miracles', type: 'article', description: 'Framework for identity liberation', keywords: ['miracles', 'steps', 'liberation'] },
  { title: 'Inversion Thinking', path: '/blog/inversion-thinking', type: 'article', description: 'How to win by avoiding failure', keywords: ['inversion', 'thinking', 'munger'] },
  { title: 'Speed as Strategy', path: '/blog/speed-as-strategy', type: 'article', description: 'The execution edge', keywords: ['speed', 'strategy', 'execution'] },
  { title: '10-Minute Block System', path: '/blog/ten-minute-block-system', type: 'article', description: 'Breaking through every obstacle', keywords: ['block', '10-minute', 'obstacle'] },
  { title: 'Work on Yourself', path: '/blog/work-on-yourself', type: 'article', description: 'The psycho-cybernetics of identity', keywords: ['work', 'psycho', 'cybernetics'] },
  { title: 'Becoming Exceptional', path: '/blog/becoming-exceptional', type: 'article', description: 'Why ordinary can never build legacy', keywords: ['exceptional', 'legacy', 'extraordinary'] },
  { title: 'Dopamine Reset', path: '/blog/dopamine-reset', type: 'article', description: 'Reclaiming your focus', keywords: ['dopamine', 'reset', 'focus'] },
  { title: 'Daily Reflection Practice', path: '/blog/daily-reflection-practice', type: 'article', description: 'Science of self-transformation', keywords: ['daily', 'reflection', 'practice'] },
  { title: 'Identity Gap Assessment', path: '/blog/identity-gap-assessment', type: 'article', description: 'Discover what\'s holding you back', keywords: ['identity', 'gap', 'assessment'] },
  { title: 'Values Clarification Tool', path: '/blog/values-clarification-tool', type: 'article', description: 'Find what truly matters', keywords: ['values', 'clarification', 'tool'] },
];

function getTypeColor(type: string): string {
  switch (type) {
        case 'app': return 'text-[#3DD4B0] border-[#3DD4B0]';
        case 'article': return 'text-[#1F6F78] border-[#1F6F78]';
        case 'product': return 'text-[#0F1C2E] border-[#0F1C2E]';
        default: return 'text-slate-600 border-slate-300';
    }
}

function getTypeIcon(type: string) {
    switch (type) {
        case 'app': return <AppWindow className="h-4 w-4 text-[#3DD4B0]" />;
        case 'article': return <FileText className="h-4 w-4 text-[#1F6F78]" />;
        case 'product': return <Sparkles className="h-4 w-4 text-[#0F1C2E]" />;
        default: return <FileText className="h-4 w-4 text-slate-500" />;
    }
}

function SearchContent() {
    const searchParams = useSearchParams();
    const urlQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(urlQuery);
    const [hasSearched, setHasSearched] = useState(!!urlQuery);
    
    // Compute results based on query
    const results = query.trim() ? searchableContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(query.toLowerCase().trim()) ||
        item.keywords.some(keyword => keyword.includes(query.toLowerCase().trim()))
    ) : [];
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSearched(true);
    };

    
    return (
        <div className="min-h-screen bg-[#F6F8FA]">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <Badge variant="outline" className="mb-6 px-4 py-2 border-[#3DD4B0]/30 text-[#3DD4B0] bg-[#3DD4B0]/10">
                            <Search className="w-3.5 h-3.5 mr-2" />
                            Search
                        </Badge>
                        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
                            Find What You Need
                        </h1>
                        <p className="text-lg text-slate-300 mb-8">
                            Search across our apps, articles, products, and resources
                        </p>
                        
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="relative">
                            <Input
                                type="search"
                                placeholder="Search for apps, articles, topics..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 text-lg bg-white rounded-xl border-0 shadow-lg"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        </form>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Results Count */}
                        {hasSearched && (
                            <div className="mb-8">
                                <p className="text-slate-600">
                                    {results.length > 0 
                                        ? `Found {results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                                        : `No results found for "${query}"`
                                    }
                                </p>
                            </div>
                        )}

                        {/* No Results */}
                        {hasSearched && results.length === 0 && (
                            <Card className="border-0 shadow-sm bg-white">
                                <CardContent className="p-8 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertCircle className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">No Results Found</h2>
                                    <p className="text-slate-600 mb-6">
                                        We couldn&apos;t find anything matching your search. Try different keywords or browse our popular pages.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <Link href="/quiz">
                                            <Button variant="outline" className="border-[#3DD4B0] text-[#3DD4B0]">
                                                Take this Quiz
                                            </Button>
                                        </Link>
                                        <Link href="/apps">
                                            <Button variant="outline" className="border-[#1F6F78] text-[#1F6F78]">
                                                Browse Apps
                                            </Button>
                                        </Link>
                                        <Link href="/blog">
                                            <Button variant="outline">
                                                Read Blog
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Results List */}
                        {results.length > 0 && (
                            <div className="space-y-4">
                                {results.map((item, index) => (
                                    <Link key={index} href={item.path}>
                                        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 mt-1">
                                                        {getTypeIcon(item.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="font-semibold text-lg text-[#0F1C2E] group-hover:text-[#3DD4B0] transition-colors">
                                                                {item.title}
                                                            </h3>
                                                            <Badge variant="outline" className={`text-xs capitalize ${getTypeColor(item.type)}`}>
                                                                {item.type}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-slate-600 text-sm mb-2">{item.description}</p>
                                                        <p className="text-xs text-slate-400">{item.path}</p>
                                                    </div>
                                                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-[#3DD4B0] group-hover:translate-x-1 transition-all flex-shrink-0" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Initial State - Popular Pages */}
                        {!hasSearched && (
                            <div>
                                <h2 className="text-xl font-bold text-[#0F1C2E] mb-6">Popular Pages</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: 'Identity Gap Quiz', path: '/quiz', description: 'Free 5-minute assessment' },
                                        { title: 'All Apps', path: '/apps', description: 'Interactive transformation tools' },
                                        { title: 'Products', path: '/products', description: 'Transformation packages' },
                                        { title: 'Blog', path: '/blog', description: 'Articles and guides' },
                                    ].map((item, index) => (
                                        <Link key={index} href={item.path}>
                                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group h-full">
                                                <CardContent className="p-5">
                                                    <h3 className="font-semibold text-[#0F1C2E] group-hover:text-[#3DD4B0] transition-colors mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600">{item.description}</p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
