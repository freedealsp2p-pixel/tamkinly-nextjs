"use client";

// Trigger Mapping Types — TRC Wave 2A
// Backed by: TRC Framework Section ج(ز) Worksheet Type 1
// TRC Framework Section ب(2) Regulation Stage

export type Locale = 'ar' | 'en';

export type MappingPhase = 
  | 'intro'           // Welcome + methodology explanation
  | 'trigger-entry'   // What happened / what triggered
  | 'body-response'   // Body's response
  | 'emotion'         // Emotion / activation level
  | 'impulse'         // Impulse / response
  | 'what-helped'     // What helped or could help
  | 'review'          // Review all entries
  | 'completion';     // Done

export interface TriggerEntry {
  id: string;
  createdAt: string;
  // Step 1: Trigger
  triggerDescription: string;      // Free text — what happened
  triggerCategory: TriggerCategory | null;
  // Step 2: Body Response
  bodyResponses: BodyResponse[];
  bodyResponseNotes: string;       // Optional free text
  // Step 3: Emotion
  primaryEmotion: EmotionLabel | null;
  activationLevel: number;         // 1-10
  emotionNotes: string;
  // Step 4: Impulse/Response
  impulse: string;                 // What felt like doing
  actualResponse: string;          // What actually did
  // Step 5: What Helped
  whatHelped: string;
  wouldHelpNextTime: string;
}

export type TriggerCategory = 
  | 'sensory'       // Sound, smell, touch, visual
  | 'situational'   // Place, time, circumstance
  | 'relational'    // Interaction with someone
  | 'emotional'     // Feeling that triggered other feelings
  | 'anniversary'   // Date, season, time of year
  | 'internal'      // Thought, memory, body sensation
  | 'other';

export type BodyResponse = 
  | 'racing-heart'
  | 'shallow-breathing'
  | 'chest-tightness'
  | 'stomach-tightness'
  | 'muscle-tension'
  | 'numbness'
  | 'dissociation'
  | 'trembling'
  | 'hot-flashes'
  | 'nausea';

export type EmotionLabel =
  | 'fear'
  | 'anxiety'
  | 'anger'
  | 'sadness'
  | 'shame'
  | 'guilt'
  | 'numbness'
  | 'overwhelm'
  | 'confusion';

export interface TriggerMappingState {
  phase: MappingPhase;
  locale: Locale;
  entries: TriggerEntry[];
  currentEntry: Partial<TriggerEntry>;
  showSafetyCheck: boolean;
  hasConsented: boolean;
}

export type TriggerMappingAction =
  | { type: 'SET_PHASE'; phase: MappingPhase }
  | { type: 'SET_LOCALE'; locale: Locale }
  | { type: 'CONSENT' }
  | { type: 'ADD_ENTRY'; entry: TriggerEntry }
  | { type: 'UPDATE_CURRENT_ENTRY'; updates: Partial<TriggerEntry> }
  | { type: 'SAVE_AND_CONTINUE' }
  | { type: 'STOP_HERE' }
  | { type: 'DELETE_ENTRY'; id: string }
  | { type: 'SET_ENTRIES'; entries: TriggerEntry[] }
  | { type: 'SHOW_SAFETY_CHECK'; show: boolean };

export const TRIGGER_CATEGORIES: TriggerCategory[] = [
  'sensory', 'situational', 'relational', 'emotional', 'anniversary', 'internal', 'other'
];

export const BODY_RESPONSES: BodyResponse[] = [
  'racing-heart', 'shallow-breathing', 'chest-tightness', 'stomach-tightness',
  'muscle-tension', 'numbness', 'dissociation', 'trembling', 'hot-flashes', 'nausea'
];

export const EMOTION_LABELS: EmotionLabel[] = [
  'fear', 'anxiety', 'anger', 'sadness', 'shame', 'guilt', 'numbness', 'overwhelm', 'confusion'
];

