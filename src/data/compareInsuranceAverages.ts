import { ownershipCostsKey } from './ownershipCostsStore';

export const COMPREHENSIVE_INSURANCE_AVERAGE_TOOLTIP =
  'This estimate is derived from a comprehensive car insurance quote for a 28 year old female privately owned car parked in the western suburbs with no claim history';

/** Monthly comprehensive insurance averages for the standard compare profile. */
export const COMPARE_INSURANCE_AVERAGE_MONTHLY = {
  [ownershipCostsKey('byd', 'sealion-7')]: 69,
  [ownershipCostsKey('mazda', 'cx-5')]: 78,
  [ownershipCostsKey('toyota', 'rav4')]: 78,
} as const;

export function getCompareInsuranceAverageMonthly(ownershipKey: string): number {
  return COMPARE_INSURANCE_AVERAGE_MONTHLY[ownershipKey as keyof typeof COMPARE_INSURANCE_AVERAGE_MONTHLY] ?? 0;
}

export function getCompareInsuranceAverageAnnual(ownershipKey: string): string {
  return String(getCompareInsuranceAverageMonthly(ownershipKey) * 12);
}
