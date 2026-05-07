/**
 * User Data Persistence Utility
 * Saves user data, progress, and preferences to localStorage
 * with optional sync to server API when authenticated
 * 
 * This ensures data persists across all apps on the same device
 */

const STORAGE_KEYS = {
  USER: 'tamkinly_user',
  PROGRESS: 'tamkinly_progress',
  ACCESS_CODE: 'tamkinly_access_code',
  PREFERENCES: 'tamkinly_preferences',
  APP_DATA: 'tamkinly_app_data',
};

// ============================================
// USER INFO
// ============================================

export interface UserInfo {
  name: string;
  email: string;
  accessCode?: string;
  accessTier?: string;
}

export function getUserInfo(): UserInfo | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setUserInfo(info: UserInfo): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(info));
  } catch (e) {
    console.error('Failed to save user info:', e);
  }
}

// ============================================
// ACCESS CODE
// ============================================

export interface AccessCodeInfo {
  code: string;
  tier: string;
  email: string;
  activatedAt: string;
  expiresAt?: string;
}

export function saveAccessCode(info: AccessCodeInfo): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ACCESS_CODE, JSON.stringify(info));
    // Also update user info with access code
    const user = getUserInfo();
    if (user) {
      user.accessCode = info.code;
      user.accessTier = info.tier;
      setUserInfo(user);
    }
  } catch (e) {
    console.error('Failed to save access code:', e);
  }
}

export function getAccessCode(): AccessCodeInfo | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACCESS_CODE);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// ============================================
// USER PROGRESS
// ============================================

export interface UserProgress {
  currentDay: number;
  currentPhase: string;
  completedDays: number[];
  totalExercises: number;
  completedExercises: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  identityScore: number | null;
  clarityScore: number | null;
  alignmentScore: number | null;
  startedAt: string | null;
  updatedAt: string;
}

const DEFAULT_PROGRESS: UserProgress = {
  currentDay: 1,
  currentPhase: 'AWARENESS',
  completedDays: [],
  totalExercises: 0,
  completedExercises: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  identityScore: null,
  clarityScore: null,
  alignmentScore: null,
  startedAt: null,
  updatedAt: new Date().toISOString(),
};

export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? { ...DEFAULT_PROGRESS, ...JSON.parse(data) } : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function updateUserProgress(updates: Partial<UserProgress>): UserProgress {
  const current = getUserProgress();
  const updated: UserProgress = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  if (!updated.startedAt) {
    updated.startedAt = new Date().toISOString();
  }
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }
  
  return updated;
}

export function markDayCompleted(day: number): UserProgress {
  const progress = getUserProgress();
  const completedDays = progress.completedDays.includes(day)
    ? progress.completedDays
    : [...progress.completedDays, day];
  
  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const lastActivity = progress.lastActivityDate;
  let currentStreak = progress.currentStreak;
  
  if (lastActivity) {
    const lastDate = new Date(lastActivity);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentStreak += 1;
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
    // If diffDays === 0, keep current streak (already active today)
  } else {
    currentStreak = 1;
  }
  
  const longestStreak = Math.max(progress.longestStreak, currentStreak);
  
  // Update phase based on day
  let currentPhase = progress.currentPhase;
  if (day <= 7) {
    currentPhase = 'AWARENESS';
  } else if (day <= 21) {
    currentPhase = 'RECODING';
  } else {
    currentPhase = 'INTEGRATION';
  }
  
  return updateUserProgress({
    completedDays,
    currentDay: Math.max(progress.currentDay, day + 1),
    currentPhase,
    currentStreak,
    longestStreak,
    lastActivityDate: today,
    completedExercises: progress.completedExercises + 1,
  });
}

// ============================================
// APP-SPECIFIC DATA
// ============================================

export function getAppData(appSlug: string): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null;
  try {
    const allData = localStorage.getItem(STORAGE_KEYS.APP_DATA);
    if (!allData) return null;
    const parsed = JSON.parse(allData);
    return parsed[appSlug] || null;
  } catch {
    return null;
  }
}

export function setAppData(appSlug: string, data: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  try {
    const allData = localStorage.getItem(STORAGE_KEYS.APP_DATA);
    const parsed = allData ? JSON.parse(allData) : {};
    parsed[appSlug] = {
      ...parsed[appSlug],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.APP_DATA, JSON.stringify(parsed));
  } catch (e) {
    console.error('Failed to save app data:', e);
  }
}

export function getAllAppData(): Record<string, Record<string, unknown>> {
  if (typeof window === 'undefined') return {};
  try {
    const allData = localStorage.getItem(STORAGE_KEYS.APP_DATA);
    return allData ? JSON.parse(allData) : {};
  } catch {
    return {};
  }
}

// ============================================
// PREFERENCES
// ============================================

export interface UserPreferences {
  locale: 'en' | 'ar';
  theme: 'light' | 'dark';
  notifications: boolean;
  reminderTime: string | null;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  locale: 'en',
  theme: 'light',
  notifications: true,
  reminderTime: null,
};

export function getUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return data ? { ...DEFAULT_PREFERENCES, ...JSON.parse(data) } : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function updateUserPreferences(updates: Partial<UserPreferences>): void {
  const current = getUserPreferences();
  const updated = { ...current, ...updates };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save preferences:', e);
    }
  }
}

// ============================================
// SYNC TO SERVER (Optional - when user has access code)
// ============================================

export async function syncProgressToServer(): Promise<boolean> {
  const user = getUserInfo();
  const accessCode = getAccessCode();
  const progress = getUserProgress();
  
  if (!user?.email || !accessCode?.code) {
    return false; // Need authentication
  }
  
  try {
    const response = await fetch('/api/user/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        accessCode: accessCode.code,
        progress,
      }),
    });
    
    return response.ok;
  } catch (e) {
    console.error('Failed to sync progress to server:', e);
    return false;
  }
}

export async function loadProgressFromServer(): Promise<UserProgress | null> {
  const user = getUserInfo();
  const accessCode = getAccessCode();
  
  if (!user?.email || !accessCode?.code) {
    return null;
  }
  
  try {
    const response = await fetch(`/api/user/progress?email=${encodeURIComponent(user.email)}&accessCode=${encodeURIComponent(accessCode.code)}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.progress) {
        // Merge server progress with local (take the most recent)
        const localProgress = getUserProgress();
        const serverProgress = data.progress as UserProgress;
        
        // Use whichever was updated more recently
        const merged = new Date(serverProgress.updatedAt) > new Date(localProgress.updatedAt)
          ? { ...DEFAULT_PROGRESS, ...serverProgress }
          : localProgress;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(merged));
        }
        
        return merged;
      }
    }
    
    return null;
  } catch (e) {
    console.error('Failed to load progress from server:', e);
    return null;
  }
}
