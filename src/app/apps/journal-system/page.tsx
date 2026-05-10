'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  PenLine, Calendar, Sparkles, Heart, Sun, Moon, Cloud, 
  CloudSun, Zap, BookOpen, ChevronLeft, ChevronRight,
  Star, Flame, Plus, Eye, EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import { useLocale } from '@/components/providers/LocaleProvider';

const moods = [
  { value: 'GREAT', labelEn: 'Amazing', labelAr: 'مذهل', icon: <Star className="h-5 w-5" />, color: 'text-amber-500', bg: 'bg-amber-100' },
  { value: 'GOOD', labelEn: 'Good', labelAr: 'جيد', icon: <Sun className="h-5 w-5" />, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  { value: 'NEUTRAL', labelEn: 'Okay', labelAr: 'عادي', icon: <CloudSun className="h-5 w-5" />, color: 'text-slate-500', bg: 'bg-slate-100' },
  { value: 'LOW', labelEn: 'Low', labelAr: 'منخفض', icon: <Cloud className="h-5 w-5" />, color: 'text-blue-500', bg: 'bg-blue-100' },
  { value: 'DIFFICULT', labelEn: 'Tough', labelAr: 'صعب', icon: <Moon className="h-5 w-5" />, color: 'text-violet-500', bg: 'bg-violet-100' },
];

const promptsEn = [
  "What identity did you embody today?",
  "What's one small win you had today?",
  "What challenged you today, and what did you learn?",
  "What are you grateful for right now?",
  "What would make tomorrow a great day?",
  "How did you take care of yourself today?",
  "What habit did you practice that aligns with your goals?",
  "What would your ideal self do in tomorrow's situation?",
  "What belief about yourself did you reinforce today?",
  "What's something you're looking forward to?",
  "Write about a moment of clarity you had recently.",
  "What boundaries did you set or maintain today?",
  "How did you show up for yourself today?",
  "What's draining your energy, and what's fueling it?",
  "If today was a chapter in your story, what would it be called?",
];

const promptsAr = [
  "ما الهوية التي تجسّدتها اليوم؟",
  "ما هو الانتصار الصغير الذي حققته اليوم؟",
  "ما الذي تحدّاك اليوم، وماذا تعلّمت؟",
  "على ما أنت ممتن الآن؟",
  "ما الذي سيجعل يوم غد يومًا رائعًا؟",
  "كما اعتنيت بنفسك اليوم؟",
  "ما العادة التي مارستها وتتوافق مع أهدافك؟",
  "ماذا سيفعل ذاتك المثالية في موقف الغد؟",
  "ما المعتقد عن نفسك الذي عزّزته اليوم؟",
  "ما الشيء الذي تتطلع إليه؟",
  "اكتب عن لحظة صفاء ذهني مررت بها مؤخرًا.",
  "ما الحدود التي وضعتها أو حافظت عليها اليوم؟",
  "كما ظهرت لنفسك اليوم؟",
  "ما الذي يستنزف طاقتك، وما الذي يغذّيها؟",
  "لو كان اليوم فصلًا في قصتك، فماذا سيكون اسمه؟",
];

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
  prompt: string;
  wordCount: number;
  createdAt: string;
}

// Calculate streak from entries
const calculateStreak = (entries: JournalEntry[]): number => {
  if (entries.length === 0) return 0;
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  let currentStreak = 0;
  let checkDate = new Date();
  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.date);
    const diffDays = Math.floor((checkDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0 || diffDays === 1) {
      currentStreak++;
      checkDate = entryDate;
    } else {
      break;
    }
  }
  return currentStreak;
};

// Initialize from localStorage
const getInitialEntries = (): JournalEntry[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('tamkinly-journal');
  return saved ? JSON.parse(saved) : [];
};

export default function JournalSystemPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const [entries, setEntries] = useState<JournalEntry[]>(getInitialEntries);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(() => 
    Math.floor(Math.random() * promptsEn.length)
  );
  const [newContent, setNewContent] = useState('');
  const [newMood, setNewMood] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const streak = calculateStreak(entries);

  const currentPrompt = locale === 'ar' ? promptsAr[currentPromptIndex] : promptsEn[currentPromptIndex];

  // Save to localStorage when entries change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tamkinly-journal', JSON.stringify(entries));
    }
  }, [entries]);

  const today = new Date().toDateString();
  const hasEntryToday = entries.some(e => new Date(e.date).toDateString() === today);

  const saveEntry = () => {
    if (!newContent.trim()) return;

    const wordCount = newContent.trim().split(/\s+/).length;
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: newContent,
      mood: newMood || 'NEUTRAL',
      prompt: currentPrompt,
      wordCount,
      createdAt: new Date().toISOString(),
    };

    setEntries(prev => [entry, ...prev]);
    setNewContent('');
    setNewMood('');
    setIsWriting(false);
    setCurrentPromptIndex(Math.floor(Math.random() * promptsEn.length));
    
    toast.success(getText('📝 Journal entry saved! Keep building your story!', '📝 تم حفظ المدونة! استمر في بناء قصتك!'));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return getText('Today', 'اليوم');
    if (date.toDateString() === yesterday.toDateString()) return getText('Yesterday', 'أمس');
    
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const totalWords = entries.reduce((acc, e) => acc + e.wordCount, 0);
  const totalEntries = entries.length;

  const getMoodLabel = (moodValue: string) => {
    const mood = moods.find(m => m.value === moodValue);
    if (!mood) return '';
    return locale === 'ar' ? mood.labelAr : mood.labelEn;
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">
            {getText('Self-Reflection Tool', 'أداة التأمّل الذاتي')}
          </Badge>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {getText('Journal', 'المذكرة')}
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            {getText('Your thoughts shape your identity. Write to discover, reflect, and grow.', 'أفكارك تشكّل هويتك. اكتب لتكتشف، وتتأمّل، وتنمو.')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="pt-6 text-center">
              <div className="p-3 rounded-full bg-rose-500 text-white w-fit mx-auto mb-3">
                <Flame className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold text-rose-700">{streak}</p>
              <p className="text-sm text-rose-600">{getText('Day Streak', 'أيام متتالية')}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="pt-6 text-center">
              <div className="p-3 rounded-full bg-amber-500 text-white w-fit mx-auto mb-3">
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold text-amber-700">{totalEntries}</p>
              <p className="text-sm text-amber-600">{getText('Entries', 'المدوّنات')}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50">
            <CardContent className="pt-6 text-center">
              <div className="p-3 rounded-full bg-violet-500 text-white w-fit mx-auto mb-3">
                <PenLine className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold text-violet-700">{totalWords.toLocaleString()}</p>
              <p className="text-sm text-violet-600">{getText('Words Written', 'كلمة مكتوبة')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Write New Entry */}
        {!isWriting ? (
          <Card 
            className="border-0 shadow-lg mb-8 bg-gradient-to-r from-rose-500 to-pink-600 text-white cursor-pointer hover:shadow-xl transition-all"
            onClick={() => !hasEntryToday && setIsWriting(true)}
          >
            <CardContent className="pt-6">
              {hasEntryToday ? (
                <div className="text-center py-4">
                  <Sparkles className="h-8 w-8 mx-auto mb-3" />
                  <p className="text-lg font-medium">{getText("You've journaled today!", 'لقد كتبت في مذكّرتك اليوم!')}</p>
                  <p className="text-sm text-rose-200">{getText('Come back tomorrow to continue your streak.', 'عُد غدًا لمواصلة سلسلتك.')}</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Plus className="h-8 w-8 mx-auto mb-3" />
                  <p className="text-lg font-medium">{getText("Write Today's Entry", 'اكتب مدوّنة اليوم')}</p>
                  <p className="text-sm text-rose-200">{getText('Take a moment to reflect on your day.', 'خذ لحظة للتأمّل في يومك.')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PenLine className="h-5 w-5 text-rose-500" />
                  {getText('New Entry', 'مدوّنة جديدة')}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsWriting(false)}>
                  {getText('Cancel', 'إلغاء')}
                </Button>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100">
                <p className="text-sm text-rose-600 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  {currentPrompt}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={getText('Start writing your thoughts...', 'ابدأ بكتابة أفكارك...')}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="min-h-[200px] text-lg border-0 bg-slate-50 focus:bg-white"
              />
              
              {/* Mood Selection */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">{getText('How are you feeling?', 'كيف تشعر؟')}</p>
                <div className="flex gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setNewMood(mood.value)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        newMood === mood.value 
                          ? `${mood.bg} ${mood.color} ring-2 ring-offset-1` 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {mood.icon}
                      <span className="text-sm">{locale === 'ar' ? mood.labelAr : mood.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={saveEntry}
                className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-500"
                disabled={!newContent.trim()}
              >
                <Heart className="h-4 w-4 mr-2" />
                {getText('Save Entry', 'حفظ المدوّنة')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Past Entries */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-rose-500" />
            {getText('Past Entries', 'المدوّنات السابقة')}
          </h2>
          
          {entries.length === 0 ? (
            <Card className="border-0 shadow-lg bg-slate-50">
              <CardContent className="pt-6 text-center py-12">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">{getText('No entries yet. Start writing!', 'لا توجد مدوّنات بعد. ابدأ الكتابة!')}</p>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => {
              const moodData = moods.find(m => m.value === entry.mood) || moods[2];
              
              return (
                <Card 
                  key={entry.id} 
                  className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-slate-800">{formatDate(entry.date)}</p>
                          <span className={`p-1 rounded-lg ${moodData.bg} ${moodData.color}`}>
                            {moodData.icon}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{entry.prompt}</p>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100">
                        {entry.wordCount} {getText('words', 'كلمة')}
                      </Badge>
                    </div>
                    <p className="text-slate-600 line-clamp-3">{entry.content}</p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Entry Detail Dialog */}
        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="sm:max-w-lg">
            {selectedEntry && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-rose-500" />
                    {formatDate(selectedEntry.date)}
                  </DialogTitle>
                  <DialogDescription>{selectedEntry.prompt}</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">
                      {selectedEntry.wordCount} {getText('words', 'كلمة')}
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      moods.find(m => m.value === selectedEntry.mood)?.bg || 'bg-slate-100'
                    } ${
                      moods.find(m => m.value === selectedEntry.mood)?.color || 'text-slate-600'
                    }`}>
                      {moods.find(m => m.value === selectedEntry.mood)?.icon}
                      {getMoodLabel(selectedEntry.mood)}
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-slate-50 max-h-[300px] overflow-y-auto">
                    <p className="text-slate-700 whitespace-pre-wrap">{selectedEntry.content}</p>
                  </div>

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      setEntries(prev => prev.filter(e => e.id !== selectedEntry.id));
                      setSelectedEntry(null);
                      toast.success(getText('Entry deleted', 'تم حذف المدوّنة'));
                    }}
                  >
                    {getText('Delete Entry', 'حذف المدوّنة')}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Quote */}
        <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium mb-2">
              {getText('"Writing is the painting of the voice."', '"الكتابة رسم الصوت."')}
            </p>
            <p className="text-sm text-rose-200">{getText('— Voltaire', '— فولتير')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
);
}
