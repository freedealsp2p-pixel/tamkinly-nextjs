/**
 * User Data Persistence Utility
 * 
 * Provides localStorage-based persistence for user data and progress
 * across all apps. Data is stored per-device and syncs with the server
 * when the user is authenticated.
 * 
 * Storage Keys:
 * - tamkinly_user: Basic user info (name, email)
 * - tamkinly_progress: Overall transformation progress
 * - tamkinly_app_progress: Per-app progress data
 * - tamkinly_assessments: Assessment results
 * - tamkinly_habits: Habit tracking data
 * - tamkinly_goals: Goals data
 * - tamkinly_journal: Journal entries
 * - tamkinly_decisions: Decision entries
 * - tamkinly_evidence: Evidence records
 * - tamkinly_access: Access code/tier info
 * - tamkinly_preferences: User preferences (locale, theme, etc.)
 */

// ============================================
// Types
// ============================================

export interface UserInfo {
  name: string;
  email: string;
  accessCode?: string;
  accessTier?: string;
  joinedAt?: string;
}

export interface AppProgressData {
  appSlug: string;
  progressData: Record<string, unknown>;
  score?: number;
  completed: boolean;
  lastAccessed: string;
  accessCount: number;
  timeSpent: number;
}

export interface AssessmentResult {
  type: string;
  data: Record<string, unknown>;
  completedAt: string;
}

export interface TransformationProgress {
  currentDay: number;
  currentPhase: 'AWARENESS' | 'RECODING' | 'INTEGRATION';
  identityScore: number;
  clarityScore?: number;
  alignmentScore?: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: string;
  completedDays: number[];
  totalExercises: number;
  completedExercises: number;
}

export interface HabitData {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  frequency: 'DAILY' | 'WEEKLY' | 'CUSTOM';
  streak: number;
  longestStreak: number;
  completions: { date: string; completed: boolean; note?: string }[];
  isArchived: boolean;
  createdAt: string;
}

export interface GoalData {
  id: string;
  title: string;
  description?: string;
  category?: string;
  targetDate?: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  progress: number;
  milestones: { id: string; title: string; completed: boolean }[];
  createdAt: string;
}

export interface JournalEntryData {
  date: string;
  title?: string;
  content: string;
  dayNumber?: number;
  prompt?: string;
  mood?: 'GREAT' | 'GOOD' | 'NEUTRAL' | 'LOW' | 'DIFFICULT';
  energy?: number;
  tags: string[];
}

export interface DecisionEntryData {
  date: string;
  decision: string;
  context?: string;
  choice?: string;
  emotionState?: string;
  clarity: number;
  emotionalStability: number;
  valueAlignment: number;
  overallQuality: number;
  patternNoticed?: string;
  upgradeRule?: string;
}

export interface EvidenceRecordData {
  date: string;
  evidenceType: string;
  description: string;
  strengthScore: number;
  sourceApp?: string;
}

export interface UserPreferences {
  locale: string;
  timezone?: string;
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  reminderTime?: string;
}

// ============================================
// Storage Keys
// ============================================

const KEYS = {
  USER: 'tamkinly_user',
  PROGRESS: 'tamkinly_progress',
  APP_PROGRESS: 'tamkinly_app_progress',
  ASSESSMENTS: 'tamkinly_assessments',
  HABITS: 'tamkinly_habits',
  GOALS: 'tamkinly_goals',
  JOURNAL: 'tamkinly_journal',
  DECISIONS: 'tamkinly_decisions',
  EVIDENCE: 'tamkinly_evidence',
  ACCESS: 'tamkinly_access',
  PREFERENCES: 'tamkinly_preferences',
} as const;

// ============================================
// Generic Storage Helpers
// ============================================

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch event for cross-component sync
    window.dispatchEvent(new CustomEvent('tamkinly-data-updated', { detail: { key } }));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
}

// ============================================
// User Info
// ============================================

export function getUserInfo(): UserInfo | null {
  return getItem<UserInfo | null>(KEYS.USER, null);
}

export function setUserInfo(info: UserInfo): void {
  setItem(KEYS.USER, info);
}

export function updateUserInfo(partial: Partial<UserInfo>): void {
  const current = getUserInfo() || { name: '', email: '' };
  setItem(KEYS.USER, { ...current, ...partial });
}

// ============================================
// Transformation Progress
// ============================================

const defaultProgress: TransformationProgress = {
  currentDay: 1,
  currentPhase: 'AWARENESS',
  identityScore: 0,
  currentStreak: 0,
  longestStreak: 0,
  completedDays: [],
  totalExercises: 0,
  completedExercises: 0,
};

export function getProgress(): TransformationProgress {
  return getItem<TransformationProgress>(KEYS.PROGRESS, defaultProgress);
}

export function setProgress(progress: TransformationProgress): void {
  setItem(KEYS.PROGRESS, progress);
}

export function updateProgress(partial: Partial<TransformationProgress>): void {
  const current = getProgress();
  setItem(KEYS.PROGRESS, { ...current, ...partial });
}

export function incrementDay(): void {
  const progress = getProgress();
  if (progress.currentDay < 30) {
    const newDay = progress.currentDay + 1;
    const newPhase = newDay <= 7 ? 'AWARENESS' as const : newDay <= 21 ? 'RECODING' as const : 'INTEGRATION' as const;
    updateProgress({ 
      currentDay: newDay, 
      currentPhase: newPhase,
      completedDays: [...new Set([...progress.completedDays, progress.currentDay])],
    });
  }
}

export function updateStreak(): void {
  const progress = getProgress();
  const today = new Date().toISOString().split('T')[0];
  const lastActivity = progress.lastActivityDate;
  
  if (lastActivity === today) return; // Already active today
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const newStreak = lastActivity === yesterday ? progress.currentStreak + 1 : 1;
  
  updateProgress({
    currentStreak: newStreak,
    longestStreak: Math.max(progress.longestStreak, newStreak),
    lastActivityDate: today,
  });
}

// ============================================
// App Progress
// ============================================

export function getAppProgress(): AppProgressData[] {
  return getItem<AppProgressData[]>(KEYS.APP_PROGRESS, []);
}

export function getAppProgressBySlug(appSlug: string): AppProgressData | null {
  const all = getAppProgress();
  return all.find(p => p.appSlug === appSlug) || null;
}

export function setAppProgress(appSlug: string, data: Partial<AppProgressData>): void {
  const all = getAppProgress();
  const idx = all.findIndex(p => p.appSlug === appSlug);
  
  const entry: AppProgressData = {
    appSlug,
    progressData: {},
    completed: false,
    lastAccessed: new Date().toISOString(),
    accessCount: 1,
    timeSpent: 0,
    ...data,
  };
  
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...entry };
  } else {
    all.push(entry);
  }
  
  setItem(KEYS.APP_PROGRESS, all);
  updateStreak();
}

export function updateAppAccess(appSlug: string, timeSpentMinutes: number = 0): void {
  const existing = getAppProgressBySlug(appSlug);
  setAppProgress(appSlug, {
    ...existing,
    appSlug,
    lastAccessed: new Date().toISOString(),
    accessCount: (existing?.accessCount || 0) + 1,
    timeSpent: (existing?.timeSpent || 0) + timeSpentMinutes,
  });
}

// ============================================
// Assessments
// ============================================

export function getAssessments(): AssessmentResult[] {
  return getItem<AssessmentResult[]>(KEYS.ASSESSMENTS, []);
}

export function saveAssessment(type: string, data: Record<string, unknown>): void {
  const assessments = getAssessments();
  assessments.push({
    type,
    data,
    completedAt: new Date().toISOString(),
  });
  setItem(KEYS.ASSESSMENTS, assessments);
  updateStreak();
}

export function getLatestAssessment(type: string): AssessmentResult | null {
  const assessments = getAssessments().filter(a => a.type === type);
  return assessments.length > 0 ? assessments[assessments.length - 1] : null;
}

// ============================================
// Habits
// ============================================

export function getHabits(): HabitData[] {
  return getItem<HabitData[]>(KEYS.HABITS, []);
}

export function addHabit(habit: Omit<HabitData, 'id' | 'streak' | 'longestStreak' | 'completions' | 'isArchived' | 'createdAt'>): HabitData {
  const habits = getHabits();
  const newHabit: HabitData = {
    ...habit,
    id: `habit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    streak: 0,
    longestStreak: 0,
    completions: [],
    isArchived: false,
    createdAt: new Date().toISOString(),
  };
  habits.push(newHabit);
  setItem(KEYS.HABITS, habits);
  return newHabit;
}

export function updateHabit(id: string, partial: Partial<HabitData>): void {
  const habits = getHabits();
  const idx = habits.findIndex(h => h.id === id);
  if (idx >= 0) {
    habits[idx] = { ...habits[idx], ...partial };
    setItem(KEYS.HABITS, habits);
  }
}

export function completeHabitForToday(id: string, note?: string): void {
  const habits = getHabits();
  const idx = habits.findIndex(h => h.id === id);
  if (idx >= 0) {
    const today = new Date().toISOString().split('T')[0];
    const habit = habits[idx];
    
    // Check if already completed today
    const todayCompletion = habit.completions.find(c => c.date === today);
    if (todayCompletion) {
      todayCompletion.completed = true;
      if (note) todayCompletion.note = note;
    } else {
      habit.completions.push({ date: today, completed: true, note });
    }
    
    // Recalculate streak
    habit.streak = calculateHabitStreak(habit);
    habit.longestStreak = Math.max(habit.longestStreak, habit.streak);
    
    setItem(KEYS.HABITS, habits);
    updateStreak();
  }
}

function calculateHabitStreak(habit: HabitData): number {
  const sortedCompletions = [...habit.completions]
    .filter(c => c.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedCompletions.length === 0) return 0;
  
  let streak = 0;
  let checkDate = new Date();
  
  for (const completion of sortedCompletions) {
    const completionDate = new Date(completion.date);
    const diffDays = Math.floor((checkDate.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      streak++;
      checkDate = completionDate;
    } else {
      break;
    }
  }
  
  return streak;
}

// ============================================
// Goals
// ============================================

export function getGoals(): GoalData[] {
  return getItem<GoalData[]>(KEYS.GOALS, []);
}

export function addGoal(goal: Omit<GoalData, 'id' | 'status' | 'progress' | 'milestones' | 'createdAt'>): GoalData {
  const goals = getGoals();
  const newGoal: GoalData = {
    ...goal,
    id: `goal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: 'NOT_STARTED',
    progress: 0,
    milestones: [],
    createdAt: new Date().toISOString(),
  };
  goals.push(newGoal);
  setItem(KEYS.GOALS, goals);
  updateStreak();
  return newGoal;
}

export function updateGoal(id: string, partial: Partial<GoalData>): void {
  const goals = getGoals();
  const idx = goals.findIndex(g => g.id === id);
  if (idx >= 0) {
    goals[idx] = { ...goals[idx], ...partial };
    setItem(KEYS.GOALS, goals);
  }
}

// ============================================
// Journal
// ============================================

export function getJournalEntries(): JournalEntryData[] {
  return getItem<JournalEntryData[]>(KEYS.JOURNAL, []);
}

export function saveJournalEntry(entry: JournalEntryData): void {
  const entries = getJournalEntries();
  const idx = entries.findIndex(e => e.date === entry.date);
  
  if (idx >= 0) {
    entries[idx] = entry; // Update existing entry for the same date
  } else {
    entries.push(entry);
  }
  
  setItem(KEYS.JOURNAL, entries);
  updateStreak();
}

export function getJournalEntry(date: string): JournalEntryData | null {
  const entries = getJournalEntries();
  return entries.find(e => e.date === date) || null;
}

// ============================================
// Decisions
// ============================================

export function getDecisions(): DecisionEntryData[] {
  return getItem<DecisionEntryData[]>(KEYS.DECISIONS, []);
}

export function saveDecision(decision: DecisionEntryData): void {
  const decisions = getDecisions();
  decisions.push(decision);
  setItem(KEYS.DECISIONS, decisions);
  updateStreak();
}

// ============================================
// Evidence
// ============================================

export function getEvidence(): EvidenceRecordData[] {
  return getItem<EvidenceRecordData[]>(KEYS.EVIDENCE, []);
}

export function saveEvidence(evidence: EvidenceRecordData): void {
  const records = getEvidence();
  records.push(evidence);
  setItem(KEYS.EVIDENCE, records);
  updateStreak();
}

// ============================================
// Access/Tier
// ============================================

export interface AccessInfo {
  code: string;
  tier: string;
  activatedAt: string;
  expiresAt?: string;
}

export function getAccessInfo(): AccessInfo | null {
  return getItem<AccessInfo | null>(KEYS.ACCESS, null);
}

export function setAccessInfo(info: AccessInfo): void {
  setItem(KEYS.ACCESS, info);
  // Also update user info with access tier
  updateUserInfo({ accessCode: info.code, accessTier: info.tier });
}

export function hasAccess(requiredTier: string): boolean {
  const access = getAccessInfo();
  if (!access) return false;
  
  const tierOrder = ['FREE', 'TRIAL', 'BASIC', 'PREMIUM', 'BUNDLE'];
  const userTierIndex = tierOrder.indexOf(access.tier);
  const requiredTierIndex = tierOrder.indexOf(requiredTier);
  
  return userTierIndex >= requiredTierIndex;
}

// ============================================
// Preferences
// ============================================

const defaultPreferences: UserPreferences = {
  locale: 'en',
  theme: 'light',
  notifications: true,
};

export function getPreferences(): UserPreferences {
  return getItem<UserPreferences>(KEYS.PREFERENCES, defaultPreferences);
}

export function setPreferences(prefs: Partial<UserPreferences>): void {
  const current = getPreferences();
  setItem(KEYS.PREFERENCES, { ...current, ...prefs });
}

// ============================================
// Data Export / Import (for backup/restore)
// ============================================

export function exportAllData(): Record<string, unknown> {
  return {
    user: getUserInfo(),
    progress: getProgress(),
    appProgress: getAppProgress(),
    assessments: getAssessments(),
    habits: getHabits(),
    goals: getGoals(),
    journal: getJournalEntries(),
    decisions: getDecisions(),
    evidence: getEvidence(),
    access: getAccessInfo(),
    preferences: getPreferences(),
    exportedAt: new Date().toISOString(),
    version: '1.0',
  };
}

export function importAllData(data: Record<string, unknown>): boolean {
  try {
    if (data.user) setItem(KEYS.USER, data.user);
    if (data.progress) setItem(KEYS.PROGRESS, data.progress);
    if (data.appProgress) setItem(KEYS.APP_PROGRESS, data.appProgress);
    if (data.assessments) setItem(KEYS.ASSESSMENTS, data.assessments);
    if (data.habits) setItem(KEYS.HABITS, data.habits);
    if (data.goals) setItem(KEYS.GOALS, data.goals);
    if (data.journal) setItem(KEYS.JOURNAL, data.journal);
    if (data.decisions) setItem(KEYS.DECISIONS, data.decisions);
    if (data.evidence) setItem(KEYS.EVIDENCE, data.evidence);
    if (data.access) setItem(KEYS.ACCESS, data.access);
    if (data.preferences) setItem(KEYS.PREFERENCES, data.preferences);
    return true;
  } catch {
    return false;
  }
}

// ============================================
// Sync with Server (when authenticated)
// ============================================

export async function syncToServer(): Promise<boolean> {
  try {
    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'sync',
        data: exportAllData(),
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function syncFromServer(): Promise<boolean> {
  try {
    const response = await fetch('/api/progress');
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.progress) {
        // Merge server data with local data (server takes precedence for scores)
        // but local data takes precedence for unsaved changes
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

// ============================================
// Calculate Identity Score
// ============================================

export function calculateIdentityScore(): number {
  const progress = getProgress();
  const habits = getHabits();
  const goals = getGoals();
  const journal = getJournalEntries();
  const decisions = getDecisions();
  const evidence = getEvidence();
  const assessments = getAssessments();
  
  // Base score from current phase
  const phaseBase = progress.currentPhase === 'INTEGRATION' ? 60 : 
                    progress.currentPhase === 'RECODING' ? 30 : 10;
  
  // Habit contribution
  const habitScore = Math.min(20, habits.reduce((sum, h) => sum + h.streak * 2, 0));
  
  // Goals contribution
  const goalScore = Math.min(15, goals.filter(g => g.status === 'COMPLETED').length * 5);
  
  // Journal contribution
  const journalScore = Math.min(10, Math.min(journal.length, 10));
  
  // Decision contribution
  const decisionScore = Math.min(10, decisions.length * 2);
  
  // Evidence contribution
  const evidenceScore = Math.min(10, evidence.length * 1.5);
  
  // Assessment bonus
  const assessmentBonus = Math.min(15, assessments.length * 5);
  
  // Streak bonus
  const streakBonus = Math.min(10, progress.currentStreak * 2);
  
  return Math.min(100, Math.round(
    phaseBase + habitScore + goalScore + journalScore + 
    decisionScore + evidenceScore + assessmentBonus + streakBonus
  ));
}

// ============================================
// Initialize with Access Code
// ============================================

export async function initializeWithAccessCode(code: string, email: string): Promise<{ success: boolean; tier?: string; error?: string }> {
  try {
    const response = await fetch('/api/access/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, email }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      setAccessInfo({
        code: code.toUpperCase(),
        tier: data.tier,
        activatedAt: new Date().toISOString(),
      });
      // Also save user info
      updateUserInfo({ email, accessCode: code.toUpperCase(), accessTier: data.tier });
      return { success: true, tier: data.tier };
    }
    
    return { success: false, error: data.error || 'Invalid access code' };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}
