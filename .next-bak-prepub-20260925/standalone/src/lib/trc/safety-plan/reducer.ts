import type { SafetyPlanState, SafetyPlanAction, SafetyPlanData, DistressStep } from './types';

const defaultDistressSteps: DistressStep[] = [
  { level: 'mild', actionAr: 'لاحظ العلامة، خذ 3 أنفاس عميقة، استخدم تنفس A52', actionEn: 'Notice the sign, take 3 deep breaths, use A52 breathing' },
  { level: 'moderate', actionAr: 'استخدم تقنية 5-4-3-2-1، انتقل لمكان آمن، تواصل مع شخص دعم', actionEn: 'Use 5-4-3-2-1 grounding, move to a safe place, contact a support person' },
  { level: 'high', actionAr: 'تنفس Box 4-4-4-4، امسك شيئاً بارداً، ضع قدميك على الأرض، تواصل مع شخص الآن', actionEn: 'Box breathing 4-4-4-4, hold something cold, feet on the ground, contact someone now' },
  { level: 'crisis', actionAr: 'أنت تستحق المساعدة الآن. اتصل بخدمات الطوارئ أو خط الأزمة. هذا ليس ضعفاً.', actionEn: 'You deserve help NOW. Call emergency services or crisis line. This is not weakness.' },
];

export const initialPlan: SafetyPlanData = {
  warningSigns: { physical: [], emotional: [], behavioral: [], custom: '' },
  stabilizeTools: { breathing: false, grounding: false, safePlace: false, bodyScan: false, otherTools: [] },
  supportPeople: [],
  safePlaces: [],
  distressSteps: defaultDistressSteps,
  professionalCriteria: [],
  customCriterion: '',
  exitPlan: { stopSignal: '', firstAction: '', groundingChoice: '', contactPerson: '', safeDestination: '' },
};

export const initialState: SafetyPlanState = {
  phase: 'intro',
  locale: 'ar',
  plan: initialPlan,
  showSafetyCheck: false,
  hasConsented: false,
};

export function safetyPlanReducer(state: SafetyPlanState, action: SafetyPlanAction): SafetyPlanState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'SET_LOCALE':
      return { ...state, locale: action.locale };
    case 'CONSENT':
      return { ...state, hasConsented: true, phase: 'warning-signs' };
    case 'UPDATE_WARNING_SIGNS':
      return { ...state, plan: { ...state.plan, warningSigns: { ...state.plan.warningSigns, ...action.payload } } };
    case 'UPDATE_STABILIZE_TOOLS':
      return { ...state, plan: { ...state.plan, stabilizeTools: { ...state.plan.stabilizeTools, ...action.payload } } };
    case 'ADD_SUPPORT_PERSON':
      return { ...state, plan: { ...state.plan, supportPeople: [...state.plan.supportPeople, action.person] } };
    case 'REMOVE_SUPPORT_PERSON':
      return { ...state, plan: { ...state.plan, supportPeople: state.plan.supportPeople.filter(p => p.id !== action.id) } };
    case 'UPDATE_SUPPORT_PERSON':
      return { ...state, plan: { ...state.plan, supportPeople: state.plan.supportPeople.map(p => p.id === action.id ? { ...p, ...action.payload } : p) } };
    case 'ADD_SAFE_PLACE':
      return { ...state, plan: { ...state.plan, safePlaces: [...state.plan.safePlaces, action.place] } };
    case 'REMOVE_SAFE_PLACE':
      return { ...state, plan: { ...state.plan, safePlaces: state.plan.safePlaces.filter(p => p.id !== action.id) } };
    case 'UPDATE_DISTRESS_STEPS':
      return { ...state, plan: { ...state.plan, distressSteps: action.steps } };
    case 'TOGGLE_PROFESSIONAL_CRITERION': {
      const criteria = state.plan.professionalCriteria;
      const has = criteria.includes(action.criterion);
      return { ...state, plan: { ...state.plan, professionalCriteria: has ? criteria.filter(c => c !== action.criterion) : [...criteria, action.criterion] } };
    }
    case 'SET_CUSTOM_CRITERION':
      return { ...state, plan: { ...state.plan, customCriterion: action.text } };
    case 'UPDATE_EXIT_PLAN':
      return { ...state, plan: { ...state.plan, exitPlan: { ...state.plan.exitPlan, ...action.payload } } };
    case 'LOAD_PLAN':
      return { ...state, plan: action.plan };
    default:
      return state;
  }
}
