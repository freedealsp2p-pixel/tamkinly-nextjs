export type Locale = 'ar' | 'en';

export type PlanPhase =
  | 'intro'
  | 'warning-signs'
  | 'stabilize'
  | 'support-people'
  | 'safe-places'
  | 'distress-steps'
  | 'professional-help'
  | 'exit-plan'
  | 'review'
  | 'completion';

export interface WarningSigns {
  physical: string[];
  emotional: string[];
  behavioral: string[];
  custom: string;
}

export interface StabilizeTools {
  breathing: boolean;
  grounding: boolean;
  safePlace: boolean;
  bodyScan: boolean;
  otherTools: string[];
}

export interface SupportPerson {
  id: string;
  name: string;
  relation: string;
  contactMethod: string;
  whenToContact: string;
}

export interface SafePlace {
  id: string;
  name: string;
  location: string;
  whySafe: string;
}

export interface DistressStep {
  level: 'mild' | 'moderate' | 'high' | 'crisis';
  actionAr: string;
  actionEn: string;
}

export type ProfessionalCriterion =
  | 'suicidal-thoughts'
  | 'self-harm'
  | 'panic-attacks'
  | 'cant-function'
  | 'dissociation'
  | 'flashbacks'
  | 'cant-sleep'
  | 'custom';

export interface ExitPlan {
  stopSignal: string;
  firstAction: string;
  groundingChoice: string;
  contactPerson: string;
  safeDestination: string;
}

export interface SafetyPlanData {
  warningSigns: WarningSigns;
  stabilizeTools: StabilizeTools;
  supportPeople: SupportPerson[];
  safePlaces: SafePlace[];
  distressSteps: DistressStep[];
  professionalCriteria: ProfessionalCriterion[];
  customCriterion: string;
  exitPlan: ExitPlan;
}

export interface SafetyPlanState {
  phase: PlanPhase;
  locale: Locale;
  plan: SafetyPlanData;
  showSafetyCheck: boolean;
  hasConsented: boolean;
}

export type SafetyPlanAction =
  | { type: 'SET_PHASE'; phase: PlanPhase }
  | { type: 'SET_LOCALE'; locale: Locale }
  | { type: 'CONSENT' }
  | { type: 'UPDATE_WARNING_SIGNS'; payload: Partial<WarningSigns> }
  | { type: 'UPDATE_STABILIZE_TOOLS'; payload: Partial<StabilizeTools> }
  | { type: 'ADD_SUPPORT_PERSON'; person: SupportPerson }
  | { type: 'REMOVE_SUPPORT_PERSON'; id: string }
  | { type: 'UPDATE_SUPPORT_PERSON'; id: string; payload: Partial<SupportPerson> }
  | { type: 'ADD_SAFE_PLACE'; place: SafePlace }
  | { type: 'REMOVE_SAFE_PLACE'; id: string }
  | { type: 'UPDATE_DISTRESS_STEPS'; steps: DistressStep[] }
  | { type: 'TOGGLE_PROFESSIONAL_CRITERION'; criterion: ProfessionalCriterion }
  | { type: 'SET_CUSTOM_CRITERION'; text: string }
  | { type: 'UPDATE_EXIT_PLAN'; payload: Partial<ExitPlan> }
  | { type: 'LOAD_PLAN'; plan: SafetyPlanData };

export const DISTRESS_LEVELS: Array<DistressStep["level"]> = ["mild", "moderate", "high", "crisis"];

export const PROFESSIONAL_CRITERIA_OPTIONS: { id: ProfessionalCriterion; labelEn: string; labelAr: string }[] = [
  { id: "suicidal-thoughts", labelEn: "Suicidal thoughts or urges", labelAr: "أفكار أو رغبات انتحارية" },
  { id: "self-harm", labelEn: "Self-harm behaviors", labelAr: "سلوكيات إيذاء النفس" },
  { id: "panic-attacks", labelEn: "Panic attacks", labelAr: "نوبات هلع" },
  { id: "cant-function", labelEn: "Can not function daily", labelAr: "عدم القدرة على أداء المهام اليومية" },
  { id: "dissociation", labelEn: "Dissociation or numbness", labelAr: "انفصال أو خدر" },
  { id: "flashbacks", labelEn: "Flashbacks or intrusive memories", labelAr: "نوبات ماض أو ذكريات مزعجة" },
  { id: "cant-sleep", labelEn: "Severe sleep disruption", labelAr: "اضطراب نوم شديد" },
  { id: "custom", labelEn: "Other concern", labelAr: "مخاوف أخرى" },
];
