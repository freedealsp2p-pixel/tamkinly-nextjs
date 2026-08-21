/**
 * Recovery Assets Registry — Compatibility Shim
 * Use trc-assets.ts for TRC assets and porn-recovery-assets.ts for Porn Recovery assets.
 */
export { TRC_ASSETS, TRC_SAFETY_PATH, TRC_REGULATION_PATH, getTrcAssetsByStage, getTrcAssetsByStatus, getTrcAssetById, getTrcSafetyPath, getTrcRegulationPath, getTrcNextStep } from './trc-assets';
export type { TrcAsset, TrcAssetType, TrcAssetStatus, TrcSafetyLevel, TrcStage, TrcDownloadableRef } from './trc-assets';
export { PORN_RECOVERY_ASSETS, PORN_RECOVERY_PATH, getPornRecoveryAssetsByStage, getPornRecoveryAssetsByStatus, getPornRecoveryAssetById, getPornRecoveryPath, getPornRecoveryNextStep, getPornRecoveryDownloadables } from './porn-recovery-assets';
export type { PornRecoveryAsset, PornRecoveryAssetType, PornRecoveryAssetStatus, PornRecoveryStage, PornRecoveryDownloadableRef } from './porn-recovery-assets';

export type AssetCategory = 'trauma' | 'porn-recovery' | 'general';
export type AssetType = 'interactive' | 'worksheet' | 'psychoeducation' | 'workbook' | 'crisis' | 'psychoeducation-system' | 'tool';
export type AssetStatus = 'planned' | 'specification' | 'in-progress' | 'clinical-review' | 'live' | 'deprecated';

import { TRC_ASSETS } from './trc-assets';
import { PORN_RECOVERY_ASSETS } from './porn-recovery-assets';
export const RECOVERY_ASSETS = [...TRC_ASSETS, ...PORN_RECOVERY_ASSETS] as any[];

export function getAssetsByCategory(category: AssetCategory): any[] {
  if (category === 'trauma') return TRC_ASSETS;
  if (category === 'porn-recovery') return PORN_RECOVERY_ASSETS;
  return RECOVERY_ASSETS;
}
export function getAssetsByStatus(status: AssetStatus): any[] { return RECOVERY_ASSETS.filter(a => a.status === status); }
export function getAssetsByType(type: AssetType): any[] { return RECOVERY_ASSETS.filter(a => a.type === type); }
export function getAssetById(id: string): any | undefined { return RECOVERY_ASSETS.find(a => a.id === id); }
export function getLiveAssets(): any[] { return RECOVERY_ASSETS.filter(a => a.status === 'live'); }
export function getInprogressAssets(): any[] { return RECOVERY_ASSETS.filter(a => a.status === 'in-progress'); }
export function getClinicalReviewAssets(): any[] { return RECOVERY_ASSETS.filter(a => a.status === 'clinical-review'); }
export function getSafetyPath(): any[] { return TRC_ASSETS.filter(a => ['grounding-54321', 'a52', 'safe-place', 'body-scan', 'trigger-mapping'].includes(a.id)); }
export function getNextStep(assetId: string): any | undefined { const a = getAssetById(assetId); if (!a?.nextStep) return undefined; return getAssetById(a.nextStep); }
