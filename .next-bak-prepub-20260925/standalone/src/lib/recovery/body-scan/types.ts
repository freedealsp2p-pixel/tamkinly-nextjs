export type BodyScanPhase = 'entry' | 'bridge' | 'scanning' | 'integration' | 'completion';
export type BodyPart = 'feet' | 'legs' | 'abdomen' | 'chest' | 'arms' | 'neck-face';
export type Sensation = 'tension' | 'ease' | 'neutral' | null;
export type Locale = 'en' | 'ar';

export interface BodyPartResult {
  part: BodyPart;
  sensation: Sensation;
}

export interface BodyScanState {
  phase: BodyScanPhase;
  currentPartIndex: number;
  sensations: BodyPartResult[];
  isPaused: boolean;
  locale: Locale;
}

export type BodyScanAction =
  | { type: 'START_BRIDGE' }
  | { type: 'PROCEED' }
  | { type: 'GO_BACK' }
  | { type: 'SET_SENSATION'; sensation: Sensation }
  | { type: 'NEXT_PART' }
  | { type: 'FINISH_SCANNING' }
  | { type: 'FINISH_INTEGRATION' }
  | { type: 'REPEAT' }
  | { type: 'SET_PAUSED'; isPaused: boolean };

export const BODY_PARTS: { id: BodyPart; labelAr: string; labelEn: string; instructionAr: string; durationMs: number }[] = [
  { id: 'feet', labelAr: 'القدمان', labelEn: 'Feet', instructionAr: 'وجّه انتباهك إلى قدميك. لاحظ أي إحساس: دفء، برودة، ضغط، أو فراغ. لا تُقيّم — فقط لاحظ.', durationMs: 30000 },
  { id: 'legs', labelAr: 'الساقان', labelEn: 'Legs', instructionAr: 'انقل انتباهك إلى ساقيك. من الركبتين إلى الكاحلين. لاحظ التوتر أو الاسترخاء دون محاولة تغيير شيء.', durationMs: 30000 },
  { id: 'abdomen', labelAr: 'البطن والخصر', labelEn: 'Abdomen & Lower Back', instructionAr: 'وجّه انتباهك إلى بطنك وخصرك. هل تشعر بعقدة؟ فراغ؟ حركة؟ فقط لاحظ ما يوجد.', durationMs: 30000 },
  { id: 'chest', labelAr: 'الصدر والكتفان', labelEn: 'Chest & Shoulders', instructionAr: 'انقل انتباهك إلى صدرك وكتفك. لاحظ ارتفاع وانخفاض التنفس. أي شدّ أو ثقل؟ فقط لاحظ.', durationMs: 30000 },
  { id: 'arms', labelAr: 'الذراعان واليدان', labelEn: 'Arms & Hands', instructionAr: 'وجّه انتباهك إلى ذراعيك ويديك. من الكتفين إلى أطراف الأصابع. لاحظ أي إحساس يمرّ من خلالهما.', durationMs: 30000 },
  { id: 'neck-face', labelAr: 'الرقبة والوجه', labelEn: 'Neck & Face', instructionAr: 'أخيرًا، وجّه انتباهك إلى رقبتك ووجهك. الفك، الجبين، العينان. لاحظ أي توتر أو استرخاء.', durationMs: 30000 },
];
