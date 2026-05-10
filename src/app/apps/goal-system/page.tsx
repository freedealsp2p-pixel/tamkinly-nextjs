'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocale } from '@/components/providers/LocaleProvider';
import { 
  Target, Plus, Trophy, Star, Zap, Rocket, Briefcase, 
  Heart, Users, DollarSign, BookOpen, Sparkles, 
  CheckCircle2, Circle, Calendar, TrendingUp, Award,
  ChevronRight, Flag, Mountain
} from 'lucide-react';
import { toast } from 'sonner';

const categoryIcons: Record<string, React.ReactNode> = {
  IDENTITY: <Sparkles className="h-5 w-5" />,
  CAREER: <Briefcase className="h-5 w-5" />,
  HEALTH: <Heart className="h-5 w-5" />,
  RELATIONSHIPS: <Users className="h-5 w-5" />,
  PERSONAL_GROWTH: <Rocket className="h-5 w-5" />,
  FINANCIAL: <DollarSign className="h-5 w-5" />,
  SPIRITUAL: <Mountain className="h-5 w-5" />,
};

const categoryColors: Record<string, { bg: string; text: string; light: string }> = {
  IDENTITY: { bg: 'bg-violet-500', text: 'text-violet-700', light: 'bg-violet-100' },
  CAREER: { bg: 'bg-blue-500', text: 'text-blue-700', light: 'bg-blue-100' },
  HEALTH: { bg: 'bg-rose-500', text: 'text-rose-700', light: 'bg-rose-100' },
  RELATIONSHIPS: { bg: 'bg-pink-500', text: 'text-pink-700', light: 'bg-pink-100' },
  PERSONAL_GROWTH: { bg: 'bg-emerald-500', text: 'text-emerald-700', light: 'bg-emerald-100' },
  FINANCIAL: { bg: 'bg-amber-500', text: 'text-amber-700', light: 'bg-amber-100' },
  SPIRITUAL: { bg: 'bg-cyan-500', text: 'text-cyan-700', light: 'bg-cyan-100' },
};

const categoryNamesAr: Record<string, string> = {
  IDENTITY: 'الهوية',
  CAREER: 'المسيرة المهنية',
  HEALTH: 'الصحة',
  RELATIONSHIPS: 'العلاقات',
  PERSONAL_GROWTH: 'النمو الشخصي',
  FINANCIAL: 'المالية',
  SPIRITUAL: 'الروحانية',
};

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  status: string;
  progress: number;
  milestones: Milestone[];
  createdAt: string;
}

// Demo goals for initial state
const demoGoals: Goal[] = [
  {
    id: '1',
    title: 'Become a Morning Person',
    description: 'Wake up at 5 AM daily and build a powerful morning routine',
    category: 'IDENTITY',
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'IN_PROGRESS',
    progress: 45,
    milestones: [
      { id: '1', title: 'Wake up at 6 AM for 7 days', completed: true, order: 1 },
      { id: '2', title: 'Create morning routine checklist', completed: true, order: 2 },
      { id: '3', title: 'Wake up at 5:30 AM for 7 days', completed: false, order: 3 },
      { id: '4', title: 'Wake up at 5 AM for 30 days', completed: false, order: 4 },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Build $10k Emergency Fund',
    description: 'Save money consistently to build financial security',
    category: 'FINANCIAL',
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'IN_PROGRESS',
    progress: 30,
    milestones: [
      { id: '1', title: 'Save first $1,000', completed: true, order: 1 },
      { id: '2', title: 'Save $3,000', completed: false, order: 2 },
      { id: '3', title: 'Save $6,000', completed: false, order: 3 },
      { id: '4', title: 'Reach $10,000', completed: false, order: 4 },
    ],
    createdAt: new Date().toISOString(),
  },
];

export default function GoalSystemPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const [goals, setGoals] = useState<Goal[]>(demoGoals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const saved = localStorage.getItem('tamkinly-goals');
    if (saved) {
      setGoals(JSON.parse(saved));
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('PERSONAL_GROWTH');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newMilestones, setNewMilestones] = useState<string[]>(['']);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tamkinly-goals', JSON.stringify(goals));
    }
  }, [goals]);

  const addGoal = () => {
    if (!newTitle.trim()) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      category: newCategory,
      targetDate: newTargetDate,
      status: 'NOT_STARTED',
      progress: 0,
      milestones: newMilestones
        .filter(m => m.trim())
        .map((m, i) => ({ id: `${Date.now()}-${i}`, title: m, completed: false, order: i })),
      createdAt: new Date().toISOString(),
    };

    setGoals(prev => [...prev, goal]);
    setNewTitle('');
    setNewDescription('');
    setNewMilestones(['']);
    setIsAddDialogOpen(false);
    toast.success(getText('🎯 New goal created! You\'re on your way!', '🎯 تم إنشاء هدف جديد! أنت في طريقك!'));
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(m => 
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = updatedMilestones.length > 0 
          ? Math.round((completedCount / updatedMilestones.length) * 100) 
          : 0;
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress,
          status: progress === 100 ? 'COMPLETED' : progress > 0 ? 'IN_PROGRESS' : 'NOT_STARTED',
        };
      }
      return goal;
    }));
    
    const goal = goals.find(g => g.id === goalId);
    const milestone = goal?.milestones.find(m => m.id === milestoneId);
    
    if (milestone && !milestone.completed) {
      toast.success(getText('🎉 Milestone completed! Great progress!', '🎉 تم إنجاز المعلم! تقدم رائع!'));
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    setSelectedGoal(null);
    toast.success(getText('Goal removed', 'تم إزالة الهدف'));
  };

  const getDaysRemaining = (targetDate: string) => {
    if (!targetDate) return null;
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const completedGoals = goals.filter(g => g.status === 'COMPLETED').length;
  const inProgressGoals = goals.filter(g => g.status === 'IN_PROGRESS').length;

  if (!hydrated) return null;

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-violet-100 text-violet-700 hover:bg-violet-200">
            {getText('Achievement System', 'نظام الإنجاز')}
          </Badge>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            {getText('Goal Tracker', 'متتبع الأهداف')}
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            {getText('Transform your identity through meaningful goals. Break them down into milestones and track your progress.', 'حوّل هويتك من خلال أهداف ذات معنى. قسمها إلى معالم وتتبع تقدمك.')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="pt-6 text-center">
              <div className="p-3 rounded-full bg-emerald-500 text-white w-fit mx-auto mb-3">
                <Trophy className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold text-emerald-700">{completedGoals}</p>
              <p className="text-sm text-emerald-600">{getText('Completed', 'مكتمل')}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50">
            <CardContent className="pt-6 text-center">
              <div className="p-3 rounded-full bg-violet-500 text-white w-fit mx-auto mb-3">
                <Target className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold text-violet-700">{inProgressGoals}</p>
              <p className="text-sm text-violet-600">{getText('In Progress', 'قيد التنفيذ')}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="pt-6 text-center">
              <div className="p-3 rounded-full bg-amber-500 text-white w-fit mx-auto mb-3">
                <Flag className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold text-amber-700">{goals.length}</p>
              <p className="text-sm text-amber-600">{getText('Total Goals', 'إجمالي الأهداف')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="space-y-4 mb-8">
          {goals.map((goal) => {
            const colors = categoryColors[goal.category] || categoryColors.PERSONAL_GROWTH;
            const daysLeft = getDaysRemaining(goal.targetDate);
            const completedMilestones = goal.milestones.filter(m => m.completed).length;

            return (
              <Card 
                key={goal.id} 
                className={`border-0 shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                  goal.status === 'COMPLETED' ? 'ring-2 ring-emerald-400' : ''
                }`}
                onClick={() => setSelectedGoal(goal)}
              >
                <div className="flex">
                  {/* Progress Circle */}
                  <div className={`w-24 flex items-center justify-center ${colors.light}`}>
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-white"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={175.9}
                          strokeDashoffset={175.9 - (175.9 * goal.progress) / 100}
                          className={colors.text}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-sm font-bold ${colors.text}`}>{goal.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${colors.light} ${colors.text}`}>
                          {categoryIcons[goal.category]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{goal.title}</h3>
                          <p className="text-sm text-slate-500">{goal.description}</p>
                        </div>
                      </div>
                      {goal.status === 'COMPLETED' && (
                        <Badge className="bg-emerald-500 text-white">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {getText('Complete', 'مكتمل')}
                        </Badge>
                      )}
                    </div>

                    {/* Milestones Preview */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Flag className="h-4 w-4" />
                        <span>{completedMilestones}/{goal.milestones.length} {getText('milestones', 'معالم')}</span>
                      </div>
                      {daysLeft !== null && daysLeft > 0 && (
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Calendar className="h-4 w-4" />
                          <span>{daysLeft} {getText('days left', 'أيام متبقية')}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center pr-4">
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Add Goal Button */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full h-14 text-lg bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              {getText('Create New Goal', 'إنشاء هدف جديد')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{getText('Create New Goal', 'إنشاء هدف جديد')}</DialogTitle>
              <DialogDescription>
                {getText('Set a meaningful goal that aligns with your identity.', 'حدد هدفًا ذا معنى يتوافق مع هويتك.')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder={getText('Goal title', 'عنوان الهدف')}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="h-12"
              />
              
              <Textarea
                placeholder={getText('Describe your goal...', 'صف هدفك...')}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="min-h-[80px]"
              />

              <div className="grid grid-cols-2 gap-4">
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(categoryIcons).map(cat => (
                      <SelectItem key={cat} value={cat}>
                        <div className="flex items-center gap-2">
                          {categoryIcons[cat]}
                          <span>{locale === 'ar' ? (categoryNamesAr[cat] || cat.replace('_', ' ')) : cat.replace('_', ' ')}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  value={newTargetDate}
                  onChange={(e) => setNewTargetDate(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Milestones */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{getText('Milestones', 'المعالم')}</label>
                {newMilestones.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder={`${getText('Milestone', 'معلم')} ${i + 1}`}
                      value={m}
                      onChange={(e) => {
                        const updated = [...newMilestones];
                        updated[i] = e.target.value;
                        setNewMilestones(updated);
                      }}
                    />
                    {i === newMilestones.length - 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setNewMilestones([...newMilestones, ''])}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button 
                onClick={addGoal} 
                className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-500"
                disabled={!newTitle.trim()}
              >
                <Target className="h-4 w-4 mr-2" />
                {getText('Create Goal', 'إنشاء الهدف')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Goal Detail Dialog */}
        <Dialog open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
          <DialogContent className="sm:max-w-lg">
            {selectedGoal && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${categoryColors[selectedGoal.category]?.light || 'bg-slate-100'}`}>
                      {categoryIcons[selectedGoal.category]}
                    </div>
                    {selectedGoal.title}
                  </DialogTitle>
                  <DialogDescription>{selectedGoal.description}</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{getText('Progress', 'التقدم')}</span>
                    <span className="font-semibold">{selectedGoal.progress}%</span>
                  </div>
                  <Progress value={selectedGoal.progress} className="h-3" />

                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-700">{getText('Milestones', 'المعالم')}</h4>
                    {selectedGoal.milestones.map((milestone) => (
                      <div 
                        key={milestone.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          milestone.completed 
                            ? 'bg-emerald-50 border border-emerald-200' 
                            : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                        onClick={() => toggleMilestone(selectedGoal.id, milestone.id)}
                      >
                        {milestone.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-300" />
                        )}
                        <span className={milestone.completed ? 'text-emerald-700 line-through' : 'text-slate-700'}>
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => deleteGoal(selectedGoal.id)}
                  >
                    {getText('Delete Goal', 'حذف الهدف')}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Quote */}
        <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium mb-2">
              {getText('"A goal without a plan is just a wish."', '"الهدف بلا خطة مجرد أمنية."')}
            </p>
            <p className="text-sm text-violet-200">— Antoine de Saint-Exupéry</p>
          </CardContent>
        </Card>
      </div>
    </div>
);
}
