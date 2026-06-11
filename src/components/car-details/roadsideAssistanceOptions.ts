export type RoadsideAssistanceOption = {
  value: string;
  label: string;
  annualCost: number;
  tier: 1 | 2 | 3;
};

export const ROADSIDE_ASSISTANCE_OPTIONS: RoadsideAssistanceOption[] = [
  {
    value: 'total-care-1-2',
    label: 'Total Care (1 – 2 vehicles) $318',
    annualCost: 318,
    tier: 3,
  },
  {
    value: 'extra-care-1',
    label: 'Extra Care (1 vehicle) $229',
    annualCost: 229,
    tier: 2,
  },
  {
    value: 'roadside-care-1',
    label: 'Roadside Care (1 vehicle) $138',
    annualCost: 138,
    tier: 1,
  },
];

export function getRoadsideOption(value: string) {
  return (
    ROADSIDE_ASSISTANCE_OPTIONS.find((option) => option.value === value) ??
    ROADSIDE_ASSISTANCE_OPTIONS[0]
  );
}

export function getRoadsideMonthlyCost(value: string): number {
  return getRoadsideOption(value).annualCost / 12;
}

export function normalizeRoadsideValue(value: string): string {
  return getRoadsideOption(value).value;
}
