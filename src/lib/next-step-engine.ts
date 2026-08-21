// Next Best Step Engine — R1-C (Enhanced: State-Aware, Context-Aware, Safety-Aware)
// Converts SuggestedNextStep from UI component to journey logic
// Each asset knows: nextStep, previousStep, completionCondition, domain, stage
// CRITICAL: Recommendations based on user state, not static links
// CRITICAL: PornRecoveryState ≠ TrcState — TRC engine MUST NEVER use Porn Recovery data
// CRITICAL: No gamification. No cross-domain suggestions.
// CRITICAL: Must respect safety gates (safetyStageCompleted for TRC)
// CRITICAL: Never skip steps — always recommend in sequence unless explicitly completed

import {
  RecoveryProgram,
  PORN_RECOVERY_STEPS,
  TRC_STEPS,
  PornRecoveryStepId,
  TrcStepId,
  getNextStepForProgram
} from './recovery-journey';
import {
  getPornRecoveryState,
  getTrcState,
  PornRecoveryState,
  TrcState
} from './recovery-state';

// ============================================================
// NEXT STEP CONTEXT (NEW)
// ============================================================

export interface NextStepContext {
  justCompletedStep?: string;       // The step they just finished
  hasSavedState?: boolean;          // Do they have saved worksheet data?
  savedStepId?: string;             // Which step has saved data?
  timeSinceLastActivity?: number;   // Minutes since last visit
  isReturningUser?: boolean;        // Has been here before?
  highActivation?: boolean;         // User showing signs of high activation (for safety-aware recs)
}

// ============================================================
// NEXT STEP RESULT
// ============================================================

export interface NextStepResult {
  stepId: string;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  route: string;
  isAvailable: boolean;    // false if step is planned (Wave 2+)
  reasonAr: string;        // Why this is the next step
  reasonEn: string;
  stage: string;
  isPrimary: boolean;      // Primary vs secondary suggestion
  actionType?: 'continue' | 'review' | 'start' | 'resume'; // What kind of action this represents
}

// ============================================================
// HELPER: Safety stage step IDs
// ============================================================

const TRC_SAFETY_STEP_IDS = ['grounding', 'a52-breathing', 'safe-place', 'body-scan'] as const;
const TRC_REGULATION_STEP_IDS = ['trigger-mapping', 'safety-plan', 'regulation-toolkit', 'eft-tapping', 'thought-reframing', 'trauma-journal', 'trauma-responses', 'shame-recovery'] as const;
const TRC_INTEGRATION_STEP_IDS = ['boundaries', 'therapist-selection', 'recovery-milestones'] as const;

// Helper: Find the first incomplete step in a list of step IDs
function findFirstIncompleteTrcStep(stepIds: readonly string[], completedSteps: string[]) {
  for (const id of stepIds) {
    if (!completedSteps.includes(id)) {
      return TRC_STEPS.find(s => s.id === id);
    }
  }
  return null;
}

// Helper: Check if all steps in a list are completed
function areAllStepsCompleted(stepIds: readonly string[], completedSteps: string[]): boolean {
  return stepIds.every(id => completedSteps.includes(id));
}

// Helper: Build a NextStepResult from a TRC step
function buildTrcNextStepResult(
  step: { id: string; labelAr: string; labelEn: string; descriptionAr: string; descriptionEn: string; route: string; isAvailable: boolean; stage: string },
  reasonAr: string,
  reasonEn: string,
  isPrimary: boolean = true,
  actionType: 'continue' | 'review' | 'start' | 'resume' = 'start'
): NextStepResult {
  return {
    stepId: step.id,
    labelAr: step.labelAr,
    labelEn: step.labelEn,
    descriptionAr: step.descriptionAr,
    descriptionEn: step.descriptionEn,
    route: step.route,
    isAvailable: step.isAvailable,
    reasonAr,
    reasonEn,
    stage: step.stage,
    isPrimary,
    actionType
  };
}

// Helper: Build a NextStepResult from a Porn Recovery step
function buildPrNextStepResult(
  step: { id: string; labelAr: string; labelEn: string; descriptionAr: string; descriptionEn: string; route: string; anchorId: string; stage: string },
  reasonAr: string,
  reasonEn: string,
  isPrimary: boolean = true,
  actionType: 'continue' | 'review' | 'start' | 'resume' = 'start'
): NextStepResult {
  return {
    stepId: step.id,
    labelAr: step.labelAr,
    labelEn: step.labelEn,
    descriptionAr: step.descriptionAr,
    descriptionEn: step.descriptionEn,
    route: `${step.route}#${step.anchorId}`,
    isAvailable: true,
    reasonAr,
    reasonEn,
    stage: step.stage,
    isPrimary,
    actionType
  };
}

// ============================================================
// PORN RECOVERY NEXT STEP ENGINE (Enhanced)
// ============================================================

export function getPornRecoveryNextStep(currentStepId?: string, context?: NextStepContext): NextStepResult | null {
  const state = getPornRecoveryState();
  const completedSteps = state?.completedSteps || [];
  const isReturningUser = context?.isReturningUser ?? (state !== null);

  // --- SAFETY-AWARE: High activation override ---
  // If user shows high activation, recommend grounding/breathing tools
  // (For Porn Recovery, this means HALT toolkit first)
  if (context?.highActivation) {
    const haltStep = PORN_RECOVERY_STEPS.find(s => s.id === 'toolkit');
    if (haltStep && !completedSteps.includes('toolkit')) {
      return buildPrNextStepResult(
        haltStep,
        'أنت في حالة تفعيل عالية — استخدم أدوات HALT الآن',
        'You\'re in high activation — use HALT tools now',
        true,
        'start'
      );
    }
  }

  // --- CONTEXT-AWARE: Has saved state (worksheet in progress) ---
  if (context?.hasSavedState && context?.savedStepId) {
    const savedStep = PORN_RECOVERY_STEPS.find(s => s.id === context.savedStepId);
    if (savedStep && !completedSteps.includes(context.savedStepId!)) {
      return buildPrNextStepResult(
        savedStep,
        'واصل من حيث توقفت',
        'Continue where you left off',
        true,
        'resume'
      );
    }
  }

  // --- STATE-AWARE: New user (no state at all) ---
  if (!state && !currentStepId) {
    const firstStep = PORN_RECOVERY_STEPS.find(s => s.id === 'recognition');
    if (firstStep) {
      return buildPrNextStepResult(
        firstStep,
        'ابدأ بفهم النمط — هذه أول خطوة في رحلتك',
        'Start by understanding the pattern — this is the first step in your journey',
        true,
        'start'
      );
    }
  }

  // --- CONTEXT-AWARE: Just completed a step ---
  if (context?.justCompletedStep) {
    const completedStep = PORN_RECOVERY_STEPS.find(s => s.id === context.justCompletedStep);
    if (completedStep?.nextStep) {
      const nextStep = PORN_RECOVERY_STEPS.find(s => s.id === completedStep.nextStep);
      if (nextStep) {
        return buildPrNextStepResult(
          nextStep,
          `أحسنت على إكمال "${completedStep.labelAr}" — الخطوة التالية: ${nextStep.labelAr}`,
          `Great job completing "${completedStep.labelEn}" — next: ${nextStep.labelEn}`,
          true,
          'continue'
        );
      }
    }
    // Just completed the last step → Identity Transformation CTA
    if (completedStep && !completedStep.nextStep) {
      return {
        stepId: 'identity-transformation',
        labelAr: 'برنامج إعادة برمجة الهوية',
        labelEn: 'Identity Transformation Program',
        descriptionAr: 'أكملت رحلة التعافي. الآن ابدأ بناء هويتك وأهدافك وعاداتك.',
        descriptionEn: 'You\'ve completed the recovery journey. Now start building your identity, goals, and habits.',
        route: '/quiz',
        isAvailable: true,
        reasonAr: 'رحلة التعافي مكتملة — حان وقت بناء هويتك الجديدة',
        reasonEn: 'Recovery journey complete — time to build your new identity',
        stage: 'complete',
        isPrimary: true,
        actionType: 'start'
      };
    }
  }

  // --- STATE-AWARE: Determine current step ---
  let stepId: string;
  if (currentStepId) {
    stepId = currentStepId;
  } else if (state?.currentStepId) {
    stepId = state.currentStepId;
  } else {
    stepId = 'recognition';
  }

  const currentStep = PORN_RECOVERY_STEPS.find(s => s.id === stepId);
  if (!currentStep) return null;

  const isCurrentCompleted = completedSteps.includes(stepId);

  // If current step is not completed, recommend completing it
  if (!isCurrentCompleted && currentStep.isInteractive) {
    // Returning user coming back to an incomplete step
    if (isReturningUser && state) {
      return buildPrNextStepResult(
        currentStep,
        'واصل من حيث توقفت — أكمل هذه الخطوة',
        'Continue where you left off — complete this step',
        true,
        'resume'
      );
    }
    return buildPrNextStepResult(
      currentStep,
      'أكمل هذه الخطوة أولاً قبل الانتقال للخطوة التالية',
      'Complete this step first before moving to the next',
      true,
      'start'
    );
  }

  // Current step completed → find next incomplete step in sequence
  if (currentStep.nextStep) {
    const nextStep = PORN_RECOVERY_STEPS.find(s => s.id === currentStep.nextStep);
    if (nextStep) {
      const isNextCompleted = completedSteps.includes(nextStep.id);
      if (isNextCompleted && nextStep.nextStep) {
        // Skip to the next uncompleted step
        const afterNext = PORN_RECOVERY_STEPS.find(s => s.id === nextStep.nextStep);
        if (afterNext && !completedSteps.includes(afterNext.id)) {
          return buildPrNextStepResult(
            afterNext,
            `بعد إكمال "${currentStep.labelAr}" و"${nextStep.labelAr}"، الخطوة التالية: ${afterNext.labelAr}`,
            `After completing "${currentStep.labelEn}" and "${nextStep.labelEn}", next: ${afterNext.labelEn}`,
            true,
            'continue'
          );
        }
      }
      return buildPrNextStepResult(
        nextStep,
        `بعد "${currentStep.labelAr}"، الخطوة التالية هي "${nextStep.labelAr}"`,
        `After "${currentStep.labelEn}", the next step is "${nextStep.labelEn}"`,
        true,
        'continue'
      );
    }
  }

  // Journey complete → Identity Transformation CTA (not automatic)
  return {
    stepId: 'identity-transformation',
    labelAr: 'برنامج إعادة برمجة الهوية',
    labelEn: 'Identity Transformation Program',
    descriptionAr: 'أكملت رحلة التعافي. الآن ابدأ بناء هويتك وأهدافك وعاداتك.',
    descriptionEn: 'You\'ve completed the recovery journey. Now start building your identity, goals, and habits.',
    route: '/quiz',
    isAvailable: true,
    reasonAr: 'رحلة التعافي مكتملة — حان وقت بناء هويتك الجديدة',
    reasonEn: 'Recovery journey complete — time to build your new identity',
    stage: 'complete',
    isPrimary: true,
    actionType: 'start'
  };
}

// ============================================================
// TRC NEXT STEP ENGINE (Enhanced — State-Aware, Context-Aware, Safety-Aware)
// ============================================================

export function getTrcNextStep(currentStepId?: string, context?: NextStepContext): NextStepResult | null {
  const state = getTrcState();
  const completedSteps = state?.completedSteps || [];
  const safetyStageCompleted = state?.safetyStageCompleted ?? false;
  const isReturningUser = context?.isReturningUser ?? (state !== null);

  // --- SAFETY-AWARE: High activation override ---
  // If user shows high activation, ALWAYS recommend grounding/breathing first
  if (context?.highActivation) {
    // Prefer grounding (5-4-3-2-1) as it's the most immediate
    const groundingStep = TRC_STEPS.find(s => s.id === 'grounding');
    if (groundingStep) {
      return buildTrcNextStepResult(
        groundingStep,
        'أنت في حالة تفعيل عالية — ابدأ بتنظيم الحواس للعودة إلى اللحظة الحالية',
        'You\'re in high activation — start with sensory grounding to return to the present moment',
        true,
        'start'
      );
    }
  }

  // --- CONTEXT-AWARE: Has saved state (worksheet in progress) ---
  if (context?.hasSavedState && context?.savedStepId) {
    const savedStep = TRC_STEPS.find(s => s.id === context.savedStepId);
    if (savedStep) {
      // SAFETY GATE: Even saved state must respect safety gate
      if (savedStep.stage === 'regulation' && !safetyStageCompleted) {
        // Redirect to incomplete Safety step instead
        const incompleteSafetyStep = findFirstIncompleteTrcStep(TRC_SAFETY_STEP_IDS, completedSteps);
        if (incompleteSafetyStep) {
          return buildTrcNextStepResult(
            incompleteSafetyStep,
            'أكمل مرحلة الأمان أولاً قبل العودة لأدوات التنظيم',
            'Complete the Safety stage first before returning to Regulation tools',
            true,
            'start'
          );
        }
      }
      if (!completedSteps.includes(context.savedStepId!)) {
        return buildTrcNextStepResult(
          savedStep,
          'واصل من حيث توقفت',
          'Continue where you left off',
          true,
          'resume'
        );
      }
    }
  }

  // --- STATE-AWARE: New user (no state at all) ---
  if (!state && !currentStepId) {
    const groundingStep = TRC_STEPS.find(s => s.id === 'grounding');
    if (groundingStep) {
      return buildTrcNextStepResult(
        groundingStep,
        'ابدأ بتنظيم الحواس — الخطوة الأولى في رحلة التعافي من الصدمات',
        'Start with sensory grounding — the first step in trauma recovery',
        true,
        'start'
      );
    }
  }

  // --- CONTEXT-AWARE: Just completed a step ---
  if (context?.justCompletedStep) {
    const completedStepId = context.justCompletedStep;
    const completedStep = TRC_STEPS.find(s => s.id === completedStepId);

    if (completedStep) {
      // Check if this was the last Safety step → Safety stage now complete
      const safetyNowComplete = areAllStepsCompleted(TRC_SAFETY_STEP_IDS, [...completedSteps, completedStepId]);

      if (safetyNowComplete) {
        // Safety stage just completed → recommend Trigger Mapping (first Regulation step)
        const triggerMapping = TRC_STEPS.find(s => s.id === 'trigger-mapping');
        if (triggerMapping) {
          return buildTrcNextStepResult(
            triggerMapping,
            'أحسنت! أكملت مرحلة الأمان. الآن حدد محفزاتك الشخصية لبناء خطة أمان فعالة',
            'Great! You completed the Safety stage. Now identify your personal triggers to build an effective safety plan',
            true,
            'continue'
          );
        }
      }

      // Normal flow: suggest review + next tool (NOT automatic redirect)
      if (completedStep.nextStep) {
        const nextStep = TRC_STEPS.find(s => s.id === completedStep.nextStep);
        if (nextStep) {
          // SAFETY GATE: Never recommend Regulation if Safety not complete
          if (nextStep.stage === 'regulation' && !safetyNowComplete && !safetyStageCompleted) {
            const incompleteSafetyStep = findFirstIncompleteTrcStep(TRC_SAFETY_STEP_IDS, [...completedSteps, completedStepId]);
            if (incompleteSafetyStep) {
              return buildTrcNextStepResult(
                incompleteSafetyStep,
                'أكمل مرحلة الأمان أولاً قبل الانتقال لأدوات التنظيم',
                'Complete the Safety stage first before moving to Regulation tools',
                true,
                'start'
              );
            }
          }
          return buildTrcNextStepResult(
            nextStep,
            nextStep.isAvailable
              ? `أحسنت على إكمال "${completedStep.labelAr}" — الخطوة التالية: ${nextStep.labelAr}`
              : 'هذه الأداة قيد التطوير وستكون متاحة قريباً (الموجة 3)',
            nextStep.isAvailable
              ? `Great job completing "${completedStep.labelEn}" — next: ${nextStep.labelEn}`
              : 'This tool is under development and will be available soon (Wave 3)',
            nextStep.isAvailable,
            nextStep.isAvailable ? 'continue' : 'review'
          );
        }
      }

      // Just completed the last available step
      return {
        stepId: 'identity-transformation',
        labelAr: 'برنامج إعادة برمجة الهوية',
        labelEn: 'Identity Transformation Program',
        descriptionAr: 'أكملت هذه المرحلة من أدوات التنظيم والاستقرار. يمكنك متابعة رحلتك داخل Tamkinly.',
        descriptionEn: 'You\'ve completed this phase of regulation and stabilization tools. You can continue your journey within Tamkinly.',
        route: '/quiz',
        isAvailable: true,
        reasonAr: 'رحلة التعافي مكتملة — حان وقت بناء هويتك الجديدة',
        reasonEn: 'Recovery journey complete — time to build your new identity',
        stage: 'complete',
        isPrimary: true,
        actionType: 'start'
      };
    }
  }

  // --- STATE-AWARE: Safety stage logic ---
  // If Safety stage not complete, stay in Safety
  if (!safetyStageCompleted) {
    const incompleteSafetyStep = findFirstIncompleteTrcStep(TRC_SAFETY_STEP_IDS, completedSteps);
    if (incompleteSafetyStep) {
      // Returning user coming back
      if (isReturningUser && state) {
        return buildTrcNextStepResult(
          incompleteSafetyStep,
          `واصل من حيث توقفت — أكمل "${incompleteSafetyStep.labelAr}" في مرحلة الأمان`,
          `Continue where you left off — complete "${incompleteSafetyStep.labelEn}" in the Safety stage`,
          true,
          'resume'
        );
      }
      return buildTrcNextStepResult(
        incompleteSafetyStep,
        `أكمل "${incompleteSafetyStep.labelAr}" — مرحلة الأمان شرط أساسي لأي خطوة لاحقة`,
        `Complete "${incompleteSafetyStep.labelEn}" — the Safety stage is a prerequisite for any subsequent step`,
        true,
        'start'
      );
    }
    // Edge case: safetyStageCompleted is false but all safety steps are completed
    // This shouldn't happen normally, but handle it gracefully
  }

  // --- STATE-AWARE: Safety complete, Regulation stage logic ---
  if (safetyStageCompleted) {
    const regulationComplete = areAllStepsCompleted(TRC_REGULATION_STEP_IDS, completedSteps);

    if (!regulationComplete) {
      // In Regulation: context-aware recommendations based on completed tools

      // If trigger-mapping incomplete → recommend it first
      if (!completedSteps.includes('trigger-mapping')) {
        const triggerMapping = TRC_STEPS.find(s => s.id === 'trigger-mapping');
        if (triggerMapping) {
          return buildTrcNextStepResult(
            triggerMapping,
            'أكمل مرحلة الأمان — الآن حدد محفزاتك الشخصية لفهم أنماطك',
            'Safety stage complete — now identify your personal triggers to understand your patterns',
            true,
            'start'
          );
        }
      }

      // If trigger-mapping complete but no safety plan → build safety plan
      if (completedSteps.includes('trigger-mapping') && !completedSteps.includes('safety-plan')) {
        const safetyPlan = TRC_STEPS.find(s => s.id === 'safety-plan');
        if (safetyPlan) {
          return buildTrcNextStepResult(
            safetyPlan,
            'بعد فهم محفزاتك، بناء خطة الأمان هو الخطوة التالية',
            'After understanding your triggers, building a safety plan is the next step',
            true,
            'continue'
          );
        }
      }

      // If both trigger-mapping and safety-plan complete → regulation toolkit
      if (completedSteps.includes('trigger-mapping') && completedSteps.includes('safety-plan') && !completedSteps.includes('regulation-toolkit')) {
        const regToolkit = TRC_STEPS.find(s => s.id === 'regulation-toolkit');
        if (regToolkit) {
          return buildTrcNextStepResult(
            regToolkit,
            'جرب أدوات التنظيم لإيجاد الأداة المناسبة لحالتك',
            'Try the Regulation Toolkit to find the right tool for your state',
            true,
            'continue'
          );
        }
      }

      // If regulation-toolkit complete but trauma-responses not → trauma responses
      if (completedSteps.includes('regulation-toolkit') && !completedSteps.includes('trauma-responses')) {
        const traumaResp = TRC_STEPS.find(s => s.id === 'trauma-responses');
        if (traumaResp) {
          return buildTrcNextStepResult(
            traumaResp,
            'افهم أنماط استجابتك للصدمة — هذه المعرفة تعزز أدواتك',
            'Understand your trauma response patterns — this knowledge strengthens your tools',
            true,
            'continue'
          );
        }
      }

      // If trauma-responses complete but shame-recovery not → shame recovery
      if (completedSteps.includes('trauma-responses') && !completedSteps.includes('shame-recovery')) {
        const shameRecovery = TRC_STEPS.find(s => s.id === 'shame-recovery');
        if (shameRecovery) {
          return buildTrcNextStepResult(
            shameRecovery,
            shameRecovery.isAvailable
              ? 'الصدمة تخلق قصة مدمّرة عن الذات — تعلم كيف تعيد صياغتها'
              : 'هذه الأداة قيد التطوير وستكون متاحة قريباً (الموجة 2)',
            shameRecovery.isAvailable
              ? 'Trauma creates a destructive self-story — learn how to reframe it'
              : 'This tool is under development and will be available soon (Wave 2)',
            shameRecovery.isAvailable,
            shameRecovery.isAvailable ? 'continue' : 'review'
          );
        }
      }

      // Fallback: find any incomplete regulation step
      const incompleteRegStep = findFirstIncompleteTrcStep(TRC_REGULATION_STEP_IDS, completedSteps);
      if (incompleteRegStep) {
        return buildTrcNextStepResult(
          incompleteRegStep,
          `أكمل "${incompleteRegStep.labelAr}" في مرحلة التنظيم`,
          `Complete "${incompleteRegStep.labelEn}" in the Regulation stage`,
          true,
          'continue'
        );
      }
    }

    // --- Regulation complete → Integration (Wave 3 / coming soon) ---
    const integrationComplete = areAllStepsCompleted(TRC_INTEGRATION_STEP_IDS, completedSteps);

    if (!integrationComplete) {
      const incompleteIntStep = findFirstIncompleteTrcStep(TRC_INTEGRATION_STEP_IDS, completedSteps);
      if (incompleteIntStep) {
        return buildTrcNextStepResult(
          incompleteIntStep,
          'هذه الأداة قيد التطوير وستكون متاحة قريباً (الموجة 3)',
          'This tool is under development and will be available soon (Wave 3)',
          false,
          'review'
        );
      }
    }
  }

  // --- Fallback: Use currentStepId-based logic for edge cases ---
  if (currentStepId) {
    const currentStep = TRC_STEPS.find(s => s.id === currentStepId);
    if (currentStep) {
      const isCurrentCompleted = completedSteps.includes(currentStepId);

      if (!isCurrentCompleted && currentStep.isInteractive && currentStep.isAvailable) {
        // SAFETY GATE
        if (currentStep.stage === 'regulation' && !safetyStageCompleted) {
          const incompleteSafetyStep = findFirstIncompleteTrcStep(TRC_SAFETY_STEP_IDS, completedSteps);
          if (incompleteSafetyStep) {
            return buildTrcNextStepResult(
              incompleteSafetyStep,
              'أكمل مرحلة الأمان أولاً قبل الانتقال لأدوات التنظيم',
              'Complete the Safety stage first before moving to Regulation tools',
              true,
              'start'
            );
          }
        }
        return buildTrcNextStepResult(
          currentStep,
          'أكمل هذه الخطوة أولاً قبل الانتقال للخطوة التالية',
          'Complete this step first before moving to the next',
          true,
          isReturningUser ? 'resume' : 'start'
        );
      }

      // Current completed → next step
      if (currentStep.nextStep) {
        const nextStep = TRC_STEPS.find(s => s.id === currentStep.nextStep);
        if (nextStep) {
          // SAFETY GATE
          if (nextStep.stage === 'regulation' && !safetyStageCompleted) {
            const incompleteSafetyStep = findFirstIncompleteTrcStep(TRC_SAFETY_STEP_IDS, completedSteps);
            if (incompleteSafetyStep) {
              return buildTrcNextStepResult(
                incompleteSafetyStep,
                'أكمل مرحلة الأمان أولاً قبل الانتقال لأدوات التنظيم',
                'Complete the Safety stage first before moving to Regulation tools',
                true,
                'start'
              );
            }
          }
          return buildTrcNextStepResult(
            nextStep,
            nextStep.isAvailable
              ? `بعد "${currentStep.labelAr}"، الخطوة التالية هي "${nextStep.labelAr}"`
              : 'هذه الأداة قيد التطوير وستكون متاحة قريباً',
            nextStep.isAvailable
              ? `After "${currentStep.labelEn}", the next step is "${nextStep.labelEn}"`
              : 'This tool is under development and will be available soon',
            nextStep.isAvailable,
            nextStep.isAvailable ? 'continue' : 'review'
          );
        }
      }
    }
  }

  // --- Journey complete → Identity Transformation ---
  return {
    stepId: 'identity-transformation',
    labelAr: 'برنامج إعادة برمجة الهوية',
    labelEn: 'Identity Transformation Program',
    descriptionAr: 'أكملت هذه المرحلة من أدوات التنظيم والاستقرار. يمكنك متابعة رحلتك داخل Tamkinly.',
    descriptionEn: 'You\'ve completed this phase of regulation and stabilization tools. You can continue your journey within Tamkinly.',
    route: '/quiz',
    isAvailable: true,
    reasonAr: 'رحلة التعافي مكتملة — حان وقت بناء هويتك الجديدة',
    reasonEn: 'Recovery journey complete — time to build your new identity',
    stage: 'complete',
    isPrimary: true,
    actionType: 'start'
  };
}

// ============================================================
// GENERIC NEXT STEP (Enhanced with context parameter)
// ============================================================

export function getNextBestStep(program: RecoveryProgram, currentStepId?: string, context?: NextStepContext): NextStepResult | null {
  if (program === 'porn-recovery') {
    return getPornRecoveryNextStep(currentStepId, context);
  }
  return getTrcNextStep(currentStepId, context);
}

// ============================================================
// GET PREVIOUS STEP (Enhanced with context parameter)
// ============================================================

export function getPreviousStep(program: RecoveryProgram, currentStepId: string, context?: NextStepContext): NextStepResult | null {
  if (program === 'porn-recovery') {
    const step = PORN_RECOVERY_STEPS.find(s => s.id === currentStepId);
    if (!step || !step.previousStep) return null;
    const prev = PORN_RECOVERY_STEPS.find(s => s.id === step.previousStep);
    if (!prev) return null;
    return {
      stepId: prev.id,
      labelAr: prev.labelAr,
      labelEn: prev.labelEn,
      descriptionAr: prev.descriptionAr,
      descriptionEn: prev.descriptionEn,
      route: `${prev.route}#${prev.anchorId}`,
      isAvailable: true,
      reasonAr: 'الخطوة السابقة',
      reasonEn: 'Previous step',
      stage: prev.stage,
      isPrimary: false,
      actionType: 'review'
    };
  }

  const step = TRC_STEPS.find(s => s.id === currentStepId);
  if (!step || !step.previousStep) return null;
  const prev = TRC_STEPS.find(s => s.id === step.previousStep);
  if (!prev) return null;

  // SAFETY GATE: Don't suggest Regulation steps if Safety not complete
  if (prev.stage === 'regulation') {
    const state = getTrcState();
    if (state && !state.safetyStageCompleted) {
      // Return to the last safety step instead
      const lastSafetyStep = TRC_SAFETY_STEP_IDS[TRC_SAFETY_STEP_IDS.length - 1];
      const safetyStep = TRC_STEPS.find(s => s.id === lastSafetyStep);
      if (safetyStep) {
        return {
          stepId: safetyStep.id,
          labelAr: safetyStep.labelAr,
          labelEn: safetyStep.labelEn,
          descriptionAr: safetyStep.descriptionAr,
          descriptionEn: safetyStep.descriptionEn,
          route: safetyStep.route,
          isAvailable: true,
          reasonAr: 'أكمل مرحلة الأمان أولاً',
          reasonEn: 'Complete the Safety stage first',
          stage: safetyStep.stage,
          isPrimary: false,
          actionType: 'review'
        };
      }
    }
  }

  return {
    stepId: prev.id,
    labelAr: prev.labelAr,
    labelEn: prev.labelEn,
    descriptionAr: prev.descriptionAr,
    descriptionEn: prev.descriptionEn,
    route: prev.route,
    isAvailable: prev.isAvailable,
    reasonAr: 'الخطوة السابقة',
    reasonEn: 'Previous step',
    stage: prev.stage,
    isPrimary: false,
    actionType: 'review'
  };
}
