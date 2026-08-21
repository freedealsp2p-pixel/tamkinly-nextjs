'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Flame, Plus, Target, Trophy, Star, Zap, Heart, Brain, 
  Dumbbell, Book, Coffee, Moon, Sun, Droplets, Apple,
  CheckCircle2, Circle, TrendingUp, Award, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { useLocale } from '@/components/providers/LocaleProvider';

// Habit icons mapping
const habitIcons: Record<string, React.ReactNode> = {
  heart: <Heart className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />,
  dumbbell: <Dumbbell className="h-5 w-5" />,
  book: <Book className="h-5 w-5" />,
  coffee: <Coffee className="h-5 w-5" />,
  moon: <Moon className="h-5 w-5" />,
  sun: <Sun className="h-5 w-5" />,
  droplets: <Droplets className="h-5 w-5" />,
  apple: <Apple className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
};

const habitColors = [
  { name: 'Coral', value: 'bg-rose-500', light: 'bg-rose-100 text-rose-700' },
  { name: 'Orange', value: 'bg-[#2A8A94]', light: 'bg-[#e6f3f4] text-[#2A8A94]' },
  { name: 'Amber', value: 'bg-[#7AEEE0]', light: 'bg-[#f4fcfb] text-[#1F6F78]' },
  { name: 'Emerald', value: 'bg-emerald-500', light: 'bg-emerald-100 text-emerald-700' },
  { name: 'Teal', value: 'bg-teal-500', light: 'bg-teal-100 text-teal-700' },
  { name: 'Cyan', value: 'bg-cyan-500', light: 'bg-cyan-100 text-cyan-700' },
  { name: 'Blue', value: 'bg-blue-500', light: 'bg-blue-100 text-blue-700' },
  { name: 'Violet', value: 'bg-violet-500', light: 'bg-violet-100 text-violet-700' },
  { name: 'Pink', value: 'bg-pink-500', light: 'bg-pink-100 text-pink-700' },
];

interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  streak: number;
  longestStreak: number;
  completedToday: boolean;
  completedDays: string[];
  votes: number;
}

const daysEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const daysAr = ['إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت', 'أحد'];

// Demo habits for initial state
const demoHabits: Habit[] = [
  { id: '1', name: 'Morning Meditation', icon: 'brain', color: 'Violet', streak: 7, longestStreak: 12, completedToday: false, completedDays: [], votes: 35 },
  { id: '2', name: 'Exercise', icon: 'dumbbell', color: 'Coral', streak: 5, longestStreak: 10, completedDays: [], completedToday: false, votes: 25 },
  { id: '3', name: 'Read 30 mins', icon: 'book', color: 'Emerald', streak: 3, longestStreak: 8, completedDays: [], completedToday: false, votes: 15 },
  { id: '4', name: 'Drink 8 glasses', icon: 'droplets', color: 'Cyan', streak: 10, longestStreak: 15, completedDays: [], completedToday: false, votes: 50 },
];

// Demo habits Arabic names
const demoHabitsAr: Record<string, string> = {
  '1': 'تأمّل الصباح',
  '2': 'تمرين رياضي',
  '3': 'قراءة 30 دقيقة',
  '4': 'شرب 8 أكواب',
};

// Initialize from localStorage
const getInitialHabits = (): Habit[] => {
  if (typeof window === 'undefined') return demoHabits;
  const saved = localStorage.getItem('tamkinly-habits');
  if (saved) {
    const parsedHabits = JSON.parse(saved);
    const today = new Date().toDateString();
    return parsedHabits.map((h: Habit) => {
      const lastCompleted = h.completedDays?.[h.completedDays.length - 1];
      if (lastCompleted && new Date(lastCompleted).toDateString() !== today) {
        return { ...h, completedToday: false };
      }
      return h;
    });
  }
  return demoHabits;
};

export default function HabitTrackerPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const days = locale === 'ar' ? daysAr : daysEn;

  const [habits, setHabits] = useState<Habit[]>(getInitialHabits);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('heart');
  const [newHabitColor, setNewHabitColor] = useState('Emerald');

  // Save to localStorage when habits change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tamkinly-habits', JSON.stringify(habits));
    }
  }, [habits]);

  const toggleHabit = (id: string) => {
    const today = new Date().toDateString();
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const wasCompleted = habit.completedToday;
        const newCompletedDays = wasCompleted 
          ? habit.completedDays.filter(d => d !== today)
          : [...habit.completedDays, today];
        
        // Calculate streak
        let newStreak = wasCompleted ? Math.max(0, habit.streak - 1) : habit.streak + 1;
        
        // Calculate votes (each completion = 1 vote for identity)
        const votesDiff = wasCompleted ? -1 : 1;
        
        return {
          ...habit,
          completedToday: !wasCompleted,
          completedDays: newCompletedDays,
          streak: newStreak,
          longestStreak: Math.max(habit.longestStreak, newStreak),
          votes: Math.max(0, habit.votes + votesDiff),
        };
      }
      return habit;
    }));
    
    const habit = habits.find(h => h.id === id);
    if (!habit?.completedToday) {
      toast.success(getText('🎉 Great job! +1 vote for your identity!', '🎉 أحسنت! +1 صوت لهويتك!'), {
        duration: 3000,
      });
    }
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      icon: newHabitIcon,
      color: newHabitColor,
      streak: 0,
      longestStreak: 0,
      completedToday: false,
      completedDays: [],
      votes: 0,
    };
    
    setHabits(prev => [...prev, newHabit]);
    setNewHabitName('');
    setIsAddDialogOpen(false);
    toast.success(getText('✨ New habit added! Start building your identity!', '✨ تمت إضافة عادة جديدة! ابدأ ببناء هويتك!'));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
    toast.success(getText('Habit removed', 'تمت إزالة العادة'));
  };

  const completedToday = habits.filter(h => h.completedToday).length;
  const totalVotes = habits.reduce((acc, h) => acc + h.votes, 0);
  const maxStreak = Math.max(...habits.map(h => h.streak), 0);

  // Get current day (0 = Monday, 6 = Sunday)
  const currentDay = new Date().getDay();
  const adjustedDay = currentDay === 0 ? 6 : currentDay - 1;

  const getHabitName = (habit: Habit) => {
    if (locale === 'ar' && demoHabitsAr[habit.id]) {
      return demoHabitsAr[habit.id];
    }
    return habit.name;
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-teal-100 text-teal-700 hover:bg-teal-200">
            {getText('Identity Building Tool', 'أداة بناء الهوية')}
          </Badge>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            {getText('Habit Tracker', 'متتبّع العادات')}
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            {getText(
              'Every action is a vote for the person you want to become. Build your identity one habit at a time.',
              'كل فعل هو تصويت للشخص الذي تريد أن تصبحه. ابنِ هويتك عادةً واحدة في كل مرة.'
            )}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#e8f4f3] to-[#e6f3f4]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#1F6F78] text-white">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1F6F78]">{maxStreak}</p>
                  <p className="text-xs text-[#4da8a2]">{getText('Best Streak', 'أفضل سلسلة')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500 text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-700">{completedToday}/{habits.length}</p>
                  <p className="text-xs text-emerald-600">{getText('Today', 'اليوم')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-500 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-violet-700">{totalVotes}</p>
                  <p className="text-xs text-violet-600">{getText('Identity Votes', 'أصوات الهوية')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500 text-white">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-rose-700">{habits.length}</p>
                  <p className="text-xs text-rose-600">{getText('Active Habits', 'عادات نشطة')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week Progress */}
        <Card className="border-0 shadow-lg mb-8 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700">{getText('This Week', 'هذا الأسبوع')}</h3>
              <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                {completedToday} {getText('done today', 'مكتمل اليوم')}
              </Badge>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div key={day} className="text-center">
                  <p className="text-xs text-slate-500 mb-2">{day}</p>
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index === adjustedDay 
                      ? 'bg-teal-500 text-white ring-4 ring-teal-200' 
                      : index < adjustedDay
                        ? 'bg-slate-100 text-slate-400'
                        : 'bg-slate-50 text-slate-300 border border-dashed border-slate-200'
                  }`}>
                    {index === adjustedDay ? completedToday : index < adjustedDay ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Habits List */}
        <div className="space-y-4 mb-8">
          {habits.map((habit) => {
            const colorConfig = habitColors.find(c => c.name === habit.color) || habitColors[3];
            return (
              <Card 
                key={habit.id} 
                className={`border-0 shadow-lg transition-all duration-300 overflow-hidden ${
                  habit.completedToday ? 'ring-2 ring-emerald-400' : ''
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    {/* Checkbox Area */}
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-20 h-24 flex items-center justify-center transition-all ${
                        habit.completedToday 
                          ? `${colorConfig.value} text-white` 
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      {habit.completedToday ? (
                        <CheckCircle2 className="h-8 w-8" />
                      ) : (
                        <Circle className="h-8 w-8 text-slate-300" />
                      )}
                    </button>

                    {/* Habit Info */}
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${colorConfig.light}`}>
                          {habitIcons[habit.icon] || <Heart className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${habit.completedToday ? 'text-emerald-700' : 'text-slate-700'}`}>
                            {getHabitName(habit)}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Flame className="h-3 w-3 text-[#3DD4B0]" />
                              {habit.streak} {getText('day streak', 'أيام متتالية')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-violet-500" />
                              {habit.votes} {getText('votes', 'أصوات')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Streak Progress */}
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(habit.streak / 30) * 100} 
                          className="h-2 flex-1"
                        />
                        <span className="text-xs text-slate-500 w-12">
                          {habit.streak}/30
                        </span>
                      </div>
                    </div>

                    {/* Streak Badge */}
                    {habit.streak >= 7 && (
                      <div className="pr-4">
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#edfbf6] text-[#1F6F78] text-sm font-medium">
                          <Flame className="h-4 w-4" />
                          {habit.streak}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add Habit Button */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full h-14 text-lg bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              {getText('Add New Habit', 'إضافة عادة جديدة')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{getText('Create New Habit', 'إنشاء عادة جديدة')}</DialogTitle>
              <DialogDescription>
                {getText('Choose a habit that represents the person you want to become.', 'اختر عادة تمثّل الشخص الذي تريد أن تصبحه.')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder={getText('e.g., Morning meditation', 'مثال: تأمّل الصباح')}
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="h-12"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{getText('Icon', 'الأيقونة')}</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(habitIcons).map(([key, icon]) => (
                    <button
                      key={key}
                      onClick={() => setNewHabitIcon(key)}
                      className={`p-3 rounded-xl transition-all ${
                        newHabitIcon === key 
                          ? 'bg-teal-500 text-white ring-2 ring-teal-300' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{getText('Color', 'اللون')}</label>
                <div className="flex flex-wrap gap-2">
                  {habitColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setNewHabitColor(color.name)}
                      className={`w-8 h-8 rounded-full ${color.value} transition-all ${
                        newHabitColor === color.name 
                          ? 'ring-4 ring-offset-2 ring-slate-300' 
                          : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <Button 
                onClick={addHabit} 
                className="w-full h-12 bg-gradient-to-r from-teal-500 to-emerald-500"
                disabled={!newHabitName.trim()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {getText('Add Habit', 'إضافة عادة')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Motivational Quote */}
        <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium mb-2">
              {getText(
                '"Every action is a vote for the type of person you wish to become."',
                '"كل فعل هو تصويت لنوع الشخص الذي ترغب في أن تصبحه."'
              )}
            </p>
            <p className="text-sm text-violet-200">{getText('— James Clear, Atomic Habits', '— جيمس كلير، العادات الذرية')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
);
}
