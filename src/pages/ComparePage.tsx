import { Link } from 'react-router-dom';
import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { ChevronRight, CrossIcon, TooltipIcon } from '../components/Icons';
import {
  getRoadsideMonthlyCost,
  ROADSIDE_ASSISTANCE_OPTIONS,
} from '../components/car-details/roadsideAssistanceOptions';
import { ANNUAL_KM_BANDS } from '../components/car-details/EditRunningCostsPanel';
import type { RunningCostsData } from '../data/content';
import {
  clearStoredOwnershipCosts,
  getStoredOwnershipCosts,
  ownershipCostsKey,
  setStoredOwnershipCosts,
} from '../data/ownershipCostsStore';
import { flowConfig } from '../flow/config';
import { assetUrl } from '../utils/baseUrl';
import './ComparePage.css';

const comparisonCars = [
  {
    id: 1,
    title: '2025 BYD Sealion 7 Premium',
    variant: 'Premium',
    price: '$60,210',
    driveAway: 'Estimated VIC used car driveaway',
    image: assetUrl('/compare-byd-sealion-7.png'),
    detailsPath: `${flowConfig.carDetailsPath}/byd/sealion-7/premium`,
    ownershipKey: ownershipCostsKey('byd', 'sealion-7'),
  },
  {
    id: 2,
    title: '2025 Mazda CX-5 Akera',
    variant: 'G35 Akera Petrol Turbo AWD Auto',
    price: '$58,907',
    driveAway: 'Estimated VIC driveaway',
    image: assetUrl('/compare-mazda-cx5.png'),
    detailsPath: `${flowConfig.carDetailsPath}/mazda/cx-5/akera`,
    ownershipKey: ownershipCostsKey('mazda', 'cx-5'),
  },
  {
    id: 3,
    title: '2026 Toyota RAV4 Cruiser',
    variant: '2.5 Hybrid AWD Cruiser E-CVT',
    price: '$65,885',
    driveAway: 'Estimated VIC driveaway',
    image: assetUrl('/compare-toyota-rav4.png'),
    detailsPath: `${flowConfig.carDetailsPath}/toyota/rav4/cruiser`,
    ownershipKey: ownershipCostsKey('toyota', 'rav4'),
  },
];

type OverviewRow = {
  label: ReactNode;
  values: [ReactNode, ReactNode, ReactNode];
  className?: string;
};

const overviewRows: OverviewRow[] = [
  { label: 'Body type', values: ['SUV', 'SUV', 'SUV'] },
  { label: 'Number of doors', values: ['5', '5', '5'] },
  { label: 'Number of seats', values: ['5', '5', '5'] },
  { label: 'Fuel type', values: ['Electric', 'Petrol', 'Hybrid Petrol'] },
  {
    label: (
      <span className="compare-overview__safety-label">
        <span className="compare-overview__ancap">
          <img src={assetUrl('/ancap-logo.svg')} alt="ANCAP" />
        </span>
        <span>Safety rating</span>
        <span className="compare-overview__tooltip" aria-label="About ANCAP safety ratings">
          <TooltipIcon />
        </span>
      </span>
    ),
    values: [
      <span className="compare-overview__rating">
        <strong>2025</strong>
        <span aria-label="5 out of 5 stars">★★★★★</span>
      </span>,
      'Not tested',
      'Not tested',
    ],
    className: 'compare-overview__row--safety',
  },
  { label: 'Power / torque', values: ['230kW/380Nm', '170kW/420Nm', ''] },
  { label: 'Transmission', values: ['Automatic', 'Automatic', 'Automatic'] },
  { label: 'Drive wheels', values: ['Rear wheel drive', '4×4', '4×4'] },
  { label: 'Engine size', values: ['', '2.5L', '2.5L'] },
  { label: 'Towing capacity (braked)', values: ['750kg', '2,000kg', '1,500kg'] },
  {
    label: 'Fuel consumption (combined)',
    values: ['', <span>8.2L/100km<sup>†</sup></span>, <span>4.6L/100km<sup>†</sup></span>],
  },
  {
    label: 'Energy consumption (combined)',
    values: [<span>19.9kWh/100km (WLTP)<sup>†</sup></span>, '', ''],
  },
  {
    label: <span>CO<sub>2</sub> emissions (combined)</span>,
    values: [
      <span>0g/km (WLTP)<sup>†</sup></span>,
      <span>191g/km<sup>†</sup></span>,
      <span>105g/km<sup>†</sup></span>,
    ],
  },
  { label: 'Warranty', values: ['6 years/150,000km', '5 years/unlimited km', '5 years/unlimited km'] },
  { label: 'Build country', values: ['China', 'Japan', 'Japan'] },
];

type CostFormState = {
  includeFinance: boolean;
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  annualKmBand: string;
  applyKmToAll: boolean;
  includeRoadside: boolean;
  roadside: string;
  applyRoadsideToAll: boolean;
  insurance: string;
};

type CarOwnershipCosts = {
  loan: number;
  insurance: number;
  registration: number;
  fuel: number;
  servicing: number;
  battery: number;
  roadside: number;
  calculated: boolean;
  form: CostFormState;
};

const BASELINE_ANNUAL_KM = 15000;
const DEFAULT_ROADSIDE = ROADSIDE_ASSISTANCE_OPTIONS[0].value;

const DEFAULT_FORM: CostFormState = {
  includeFinance: true,
  loanAmount: '25000',
  interestRate: '7',
  loanTerm: '1',
  annualKmBand: '10000-15000',
  applyKmToAll: false,
  includeRoadside: true,
  roadside: DEFAULT_ROADSIDE,
  applyRoadsideToAll: false,
  insurance: '2105',
};

const INITIAL_OWNERSHIP: CarOwnershipCosts[] = [
  {
    loan: 1183,
    insurance: 69,
    registration: 65,
    fuel: 48,
    servicing: 30,
    battery: 8,
    roadside: 20,
    calculated: true,
    form: { ...DEFAULT_FORM, insurance: '828' },
  },
  {
    loan: 1172,
    insurance: 78,
    registration: 193,
    fuel: 40,
    servicing: 22,
    battery: 8,
    roadside: 20,
    calculated: false,
    form: { ...DEFAULT_FORM, insurance: '936' },
  },
  {
    loan: 1311,
    insurance: 78,
    registration: 117,
    fuel: 52,
    servicing: 34,
    battery: 7,
    roadside: 20,
    calculated: false,
    form: { ...DEFAULT_FORM, insurance: '936' },
  },
];

function parseAmount(value: string): number {
  return Number.parseFloat(value.replace(/[$,%\s,]/g, '')) || 0;
}

function formatMoney(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-AU')}`;
}

function getMonthlyTotal(costs: CarOwnershipCosts): number {
  return (
    costs.loan +
    costs.insurance +
    costs.registration +
    costs.fuel +
    costs.servicing +
    costs.battery +
    costs.roadside
  );
}

function getKmBand(value: string) {
  return ANNUAL_KM_BANDS.find((band) => band.value === value) ?? ANNUAL_KM_BANDS[1];
}

function calculateMonthlyLoan(form: CostFormState): number {
  if (!form.includeFinance) return 0;

  const principal = parseAmount(form.loanAmount);
  const annualRate = parseAmount(form.interestRate) / 100;
  const termMonths = (Number.parseInt(form.loanTerm, 10) || 0) * 12;

  if (principal <= 0 || termMonths <= 0) return 0;
  if (annualRate === 0) return Math.round(principal / termMonths);

  const monthlyRate = annualRate / 12;
  const factor = (1 + monthlyRate) ** termMonths;
  return Math.round((principal * monthlyRate * factor) / (factor - 1));
}

function scaleKmCost(baseline: number, annualKm: number): number {
  return Math.round(baseline * (annualKm / BASELINE_ANNUAL_KM));
}

function getLineItemAmount(data: RunningCostsData, id: string): number {
  const item = data.lineItems.find((lineItem) => lineItem.id === id);
  return item ? parseAmount(item.value) : 0;
}

function ownershipToRunningCosts(
  costs: CarOwnershipCosts,
  baseline: RunningCostsData | null,
): RunningCostsData {
  const amounts: Record<string, number> = {
    registration: costs.registration,
    fuel: costs.fuel,
    servicing: costs.servicing,
    battery: costs.battery,
    roadside: costs.roadside,
  };

  const defaultItems = [
    { id: 'registration', label: 'Victorian registration', value: '$0' },
    { id: 'fuel', label: 'Fuel / electricity', value: '$0' },
    { id: 'servicing', label: 'Servicing', value: '$0' },
    { id: 'battery', label: 'Battery', value: '$0' },
    {
      id: 'roadside',
      label: 'RACV Emergency Roadside Assistance',
      footnote: '#',
      value: '$0',
      linkLabel: 'Join now',
    },
  ];

  const lineItems = (baseline?.lineItems ?? defaultItems).map((item) =>
    amounts[item.id] !== undefined ? { ...item, value: formatMoney(amounts[item.id]) } : item,
  );

  return {
    loanCost: costs.loan,
    insuranceCost: costs.insurance,
    runningCost: lineItems.reduce((sum, item) => sum + parseAmount(item.value), 0),
    lineItems,
    customizations: {
      annualKmBand: costs.form.annualKmBand,
      hasFinance: costs.form.includeFinance ? 'yes' : 'no',
      loanAmount: costs.form.loanAmount,
      interestRate: costs.form.interestRate,
      loanTerm: costs.form.loanTerm,
      roadside: costs.form.roadside,
    },
    lastCustomisedAt: new Date().toISOString(),
  };
}

function runningCostsToOwnership(
  data: RunningCostsData,
  baseline: CarOwnershipCosts,
): CarOwnershipCosts {
  const customizations = data.customizations;

  return {
    loan: Math.round(data.loanCost),
    insurance: Math.round(data.insuranceCost),
    registration: getLineItemAmount(data, 'registration'),
    fuel: getLineItemAmount(data, 'fuel'),
    servicing: getLineItemAmount(data, 'servicing'),
    battery: getLineItemAmount(data, 'battery'),
    roadside: getLineItemAmount(data, 'roadside'),
    calculated: true,
    form: {
      includeFinance: customizations ? customizations.hasFinance === 'yes' : data.loanCost > 0,
      loanAmount: customizations?.loanAmount ?? baseline.form.loanAmount,
      interestRate: customizations?.interestRate ?? baseline.form.interestRate,
      loanTerm: customizations?.loanTerm ?? baseline.form.loanTerm,
      annualKmBand: customizations?.annualKmBand ?? baseline.form.annualKmBand,
      applyKmToAll: false,
      includeRoadside: getLineItemAmount(data, 'roadside') > 0,
      roadside: customizations?.roadside ?? baseline.form.roadside,
      applyRoadsideToAll: false,
      insurance: String(Math.round(data.insuranceCost * 12)),
    },
  };
}

function buildInitialOwnershipCosts(): CarOwnershipCosts[] {
  return INITIAL_OWNERSHIP.map((baseline, index) => {
    const stored = getStoredOwnershipCosts(comparisonCars[index].ownershipKey);
    return stored ? runningCostsToOwnership(stored, baseline) : baseline;
  });
}

function applyCostForm(baseline: CarOwnershipCosts, form: CostFormState): CarOwnershipCosts {
  const { annualKm } = getKmBand(form.annualKmBand);

  return {
    // Finance section → Car Loan repayment
    loan: form.includeFinance ? calculateMonthlyLoan(form) : 0,
    // Car insurance section → Car Insurance
    insurance: Math.round(parseAmount(form.insurance) / 12),
    // Annual km section → Running costs
    registration: scaleKmCost(baseline.registration, annualKm),
    fuel: scaleKmCost(baseline.fuel, annualKm),
    servicing: scaleKmCost(baseline.servicing, annualKm),
    battery: scaleKmCost(baseline.battery, annualKm),
    // Roadside section → RACV Roadside Assistance
    roadside: form.includeRoadside ? Math.round(getRoadsideMonthlyCost(form.roadside)) : 0,
    calculated: true,
    form,
  };
}

function CostLabel({ children, tooltip = false }: { children: ReactNode; tooltip?: boolean }) {
  return (
    <span className="ownership-costs__label">
      <span>{children}</span>
      {tooltip && (
        <span className="ownership-costs__tooltip" aria-label={`About ${children}`}>
          <TooltipIcon />
        </span>
      )}
    </span>
  );
}

function MoneyCell({ amount, annotated = false }: { amount: number; annotated?: boolean }) {
  if (annotated) {
    return (
      <span>
        {formatMoney(amount)}
        <sup>^</sup>
      </span>
    );
  }

  return <>{formatMoney(amount)}</>;
}

function OwnershipColumnLoader({ carTitle }: { carTitle: string }) {
  return (
    <div
      className="ownership-costs__column-loading-inner"
      role="status"
      aria-live="polite"
      aria-label={`Updating costs for ${carTitle}`}
    >
      <svg className="ownership-costs__spinner" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="ownership-costs__spinner-track" cx="24" cy="24" r="20" fill="none" strokeWidth="4" />
        <circle
          className="ownership-costs__spinner-arc"
          cx="24"
          cy="24"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.4 94.2"
          transform="rotate(-90 24 24)"
        />
      </svg>
    </div>
  );
}

type CalculateCostModalProps = {
  initialForm: CostFormState;
  baselineForm: CostFormState;
  onClose: () => void;
  onUpdate: (form: CostFormState) => void;
  onReset: () => void;
};

function CalculateCostModal({
  initialForm,
  baselineForm,
  onClose,
  onUpdate,
  onReset,
}: CalculateCostModalProps) {
  const titleId = useId();
  const [form, setForm] = useState<CostFormState>(initialForm);
  const lockedScrollYRef = useRef(0);

  useEffect(() => {
    const scrollY = window.scrollY;
    lockedScrollYRef.current = scrollY;
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const previousScrollBehavior = documentElement.style.scrollBehavior;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    const restoreScroll = () => {
      documentElement.style.scrollBehavior = 'auto';
      body.style.overflow = previousOverflow;
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      documentElement.scrollTop = scrollY;
      body.scrollTop = scrollY;
      window.scrollTo(0, scrollY);
      documentElement.style.scrollBehavior = previousScrollBehavior;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      restoreScroll();
    };
    // Lock scroll for the lifetime of the modal only.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onClose is stable enough for Escape handling
  }, []);

  const updateField = <K extends keyof CostFormState>(key: K, value: CostFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const resetForm = () => {
    setForm({
      ...baselineForm,
      annualKmBand: '10000-15000',
      applyKmToAll: false,
      applyRoadsideToAll: false,
    });
    onReset();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const scrollY = lockedScrollYRef.current;

    // Prevent the browser scrolling to refocus the opener after the modal unmounts.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onUpdate(form);
    onClose();

    requestAnimationFrame(() => {
      const { documentElement, body } = document;
      const previousScrollBehavior = documentElement.style.scrollBehavior;
      documentElement.style.scrollBehavior = 'auto';
      documentElement.scrollTop = scrollY;
      body.scrollTop = scrollY;
      window.scrollTo(0, scrollY);
      documentElement.style.scrollBehavior = previousScrollBehavior;
    });
  };

  return (
    <div className="cost-modal__overlay" onMouseDown={onClose}>
      <div
        className="cost-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="cost-modal__header">
          <h2 id={titleId}>Calculate cost</h2>
          <button type="button" className="cost-modal__close" onClick={onClose} aria-label="Close calculate cost">
            <CrossIcon />
          </button>
        </div>

        <form className="cost-modal__form" onSubmit={handleSubmit}>
          <div className="cost-modal__scroll">
            <section className="cost-modal__card cost-modal__card--choice">
              <div className="cost-modal__radio-set">
                <h3>Do you want to include finance costs?</h3>
                <div className="cost-modal__radio-group" role="radiogroup" aria-label="Include finance costs">
                  <label>
                    <input
                      type="radio"
                      name="include-finance"
                      checked={form.includeFinance}
                      onChange={() => updateField('includeFinance', true)}
                    />
                    <span>Yes</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="include-finance"
                      checked={!form.includeFinance}
                      onChange={() => updateField('includeFinance', false)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {form.includeFinance && (
                <div className="cost-modal__finance-fields">
                  <label className="cost-modal__field">
                    <strong>Loan amount</strong>
                    <span>Enter an amount between $5,000 and $100,000.</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={`$${parseAmount(form.loanAmount).toLocaleString('en-AU')}`}
                      onChange={(event) =>
                        updateField('loanAmount', event.target.value.replace(/[^\d]/g, ''))
                      }
                    />
                  </label>
                  <div className="cost-modal__field">
                    <label htmlFor="cost-modal-interest-rate">
                      <strong>Interest rate</strong>
                    </label>
                    <span>Enter a rate between 5 and 18%.</span>
                    <input
                      id="cost-modal-interest-rate"
                      type="text"
                      inputMode="decimal"
                      value={`${form.interestRate}%`}
                      onChange={(event) =>
                        updateField('interestRate', event.target.value.replace(/[^\d.]/g, ''))
                      }
                    />
                    <a
                      href="https://my.loans.racv.com.au/s/getMyRate"
                      className="cost-modal__link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get my personalised rate
                    </a>
                  </div>
                  <label className="cost-modal__field">
                    <strong>Loan term</strong>
                    <select
                      value={form.loanTerm}
                      onChange={(event) => updateField('loanTerm', event.target.value)}
                    >
                      {Array.from({ length: 7 }, (_, index) => {
                        const years = String(index + 1);
                        return (
                          <option key={years} value={years}>
                            {years} year{years === '1' ? '' : 's'}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
              )}
            </section>

            <section className="cost-modal__card" aria-labelledby="insurance-label">
              <label className="cost-modal__field">
                <strong id="insurance-label">Car insurance</strong>
                <span>Enter your yearly cost or quote number. E.g. REQ12345</span>
                <input
                  type="text"
                  value={`$${parseAmount(form.insurance).toLocaleString('en-AU')}`}
                  onChange={(event) =>
                    updateField('insurance', event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </label>
              <a href="https://my.racv.com.au/s/motor-insurance?p=CRCP" target="_blank" rel="noreferrer">
                Get RACV Insurance quote
              </a>
            </section>

            <section className="cost-modal__card" aria-labelledby="annual-distance-label">
              <label className="cost-modal__field">
                <strong id="annual-distance-label">How many km’s do you drive per year?</strong>
                <span>This helps calculate your estimated running costs.</span>
                <select
                  value={form.annualKmBand}
                  onChange={(event) => updateField('annualKmBand', event.target.value)}
                >
                  {ANNUAL_KM_BANDS.map((band) => (
                    <option key={band.value} value={band.value}>
                      {band.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="cost-modal__switch">
                <input
                  type="checkbox"
                  checked={form.applyKmToAll}
                  onChange={(event) => updateField('applyKmToAll', event.target.checked)}
                />
                <span aria-hidden="true" />
                Apply km’s to all vehicles
              </label>
            </section>

            <section className="cost-modal__card cost-modal__card--choice">
              <div className="cost-modal__radio-set">
                <h3>Do you want to include RACV Emergency Roadside Assistance?</h3>
                <div className="cost-modal__radio-group" role="radiogroup" aria-label="Include roadside assistance">
                  <label>
                    <input
                      type="radio"
                      name="include-roadside"
                      checked={form.includeRoadside}
                      onChange={() => updateField('includeRoadside', true)}
                    />
                    <span>Yes</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="include-roadside"
                      checked={!form.includeRoadside}
                      onChange={() => updateField('includeRoadside', false)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {form.includeRoadside && (
                <>
                  <label className="cost-modal__field">
                    <strong className="cost-modal__tooltip-label">
                      RACV Emergency Roadside Assistance
                      <TooltipIcon />
                    </strong>
                    <select
                      value={form.roadside}
                      onChange={(event) => updateField('roadside', event.target.value)}
                    >
                      {ROADSIDE_ASSISTANCE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="cost-modal__switch">
                    <input
                      type="checkbox"
                      checked={form.applyRoadsideToAll}
                      onChange={(event) => updateField('applyRoadsideToAll', event.target.checked)}
                    />
                    <span aria-hidden="true" />
                    Apply roadside assistance to all vehicles
                  </label>
                </>
              )}
            </section>

          </div>

          <footer className="cost-modal__footer">
            <div className="cost-modal__actions">
              <button type="button" className="cost-modal__reset" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="cost-modal__update">
                Update
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export function ComparePage() {
  const [ownershipCosts, setOwnershipCosts] = useState(buildInitialOwnershipCosts);
  const [activeCostCarIndex, setActiveCostCarIndex] = useState<number | null>(null);
  const [loadingColumns, setLoadingColumns] = useState<number[]>([]);
  const [stickyHeaderVisible, setStickyHeaderVisible] = useState(false);
  const loadingTimeoutRef = useRef<number | null>(null);
  const cardGridRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOwnershipCosts(buildInitialOwnershipCosts());
  }, []);

  useEffect(
    () => () => {
      if (loadingTimeoutRef.current !== null) {
        window.clearTimeout(loadingTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const cardGrid = cardGridRef.current;
    if (!cardGrid) return undefined;

    const headerHeight = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    ) || 98;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast =
          !entry.isIntersecting && entry.boundingClientRect.bottom <= headerHeight;
        setStickyHeaderVisible(scrolledPast);
      },
      {
        threshold: [0, 1],
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
      },
    );

    observer.observe(cardGrid);
    return () => observer.disconnect();
  }, []);

  const persistOwnership = (index: number, costs: CarOwnershipCosts) => {
    const key = comparisonCars[index].ownershipKey;
    if (costs.calculated) {
      const baselineStored = getStoredOwnershipCosts(key);
      setStoredOwnershipCosts(key, ownershipToRunningCosts(costs, baselineStored));
    } else {
      clearStoredOwnershipCosts(key);
    }
  };

  const applyOwnershipUpdate = (activeIndex: number, form: CostFormState) => {
    setOwnershipCosts((current) => {
      const nextCosts = current.map((car, index) => {
        const baseline = INITIAL_OWNERSHIP[index];
        const isActive = index === activeIndex;

        if (isActive) {
          return applyCostForm(baseline, form);
        }

        let next = car;
        let nextForm = car.form;

        if (form.applyKmToAll) {
          nextForm = { ...nextForm, annualKmBand: form.annualKmBand, applyKmToAll: true };
          const { annualKm } = getKmBand(form.annualKmBand);
          next = {
            ...next,
            registration: scaleKmCost(baseline.registration, annualKm),
            fuel: scaleKmCost(baseline.fuel, annualKm),
            servicing: scaleKmCost(baseline.servicing, annualKm),
            battery: scaleKmCost(baseline.battery, annualKm),
            form: nextForm,
            calculated: true,
          };
        }

        if (form.applyRoadsideToAll) {
          nextForm = {
            ...next.form,
            includeRoadside: form.includeRoadside,
            roadside: form.roadside,
            applyRoadsideToAll: true,
          };
          next = {
            ...next,
            roadside: form.includeRoadside ? Math.round(getRoadsideMonthlyCost(form.roadside)) : 0,
            form: nextForm,
            calculated: true,
          };
        }

        return next;
      });

      nextCosts.forEach((costs, index) => {
        if (index === activeIndex || form.applyKmToAll || form.applyRoadsideToAll) {
          if (costs.calculated) persistOwnership(index, costs);
        }
      });

      return nextCosts;
    });
  };

  const handleOwnershipUpdate = (form: CostFormState) => {
    if (activeCostCarIndex === null) return;

    const activeIndex = activeCostCarIndex;
    const columns =
      form.applyKmToAll || form.applyRoadsideToAll
        ? comparisonCars.map((_, index) => index)
        : [activeIndex];

    if (loadingTimeoutRef.current !== null) {
      window.clearTimeout(loadingTimeoutRef.current);
    }

    setLoadingColumns(columns);
    loadingTimeoutRef.current = window.setTimeout(() => {
      applyOwnershipUpdate(activeIndex, form);
      setLoadingColumns([]);
      loadingTimeoutRef.current = null;
    }, 700);
  };

  const handleOwnershipReset = () => {
    if (activeCostCarIndex === null) return;

    clearStoredOwnershipCosts(comparisonCars[activeCostCarIndex].ownershipKey);
    setOwnershipCosts((current) =>
      current.map((car, index) =>
        index === activeCostCarIndex
          ? {
              ...INITIAL_OWNERSHIP[index],
              calculated: false,
              form: {
                ...INITIAL_OWNERSHIP[index].form,
                annualKmBand: '10000-15000',
                applyKmToAll: false,
                applyRoadsideToAll: false,
              },
            }
          : car,
      ),
    );
  };

  const isColumnLoading = (index: number) => loadingColumns.includes(index);

  return (
    <div className="compare-page">
      <nav className="compare-page__breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Car Match</Link>
        <span aria-hidden="true">/</span>
        <Link to={flowConfig.searchPath}>Search</Link>
        <span aria-hidden="true">/</span>
        <Link to={flowConfig.shortlistPath}>Shortlist cars</Link>
        <span aria-hidden="true">/</span>
        <span>Compare cars</span>
      </nav>

      {stickyHeaderVisible && (
        <div className="compare-sticky-header" aria-hidden="true">
          <div className="compare-sticky-header__inner">
            <div className="compare-sticky-header__spacer" />
            {comparisonCars.map((car, index) => (
              <div
                key={car.id}
                className={`compare-sticky-header__car${index > 0 ? ' compare-sticky-header__car--divided' : ''}`}
              >
                <div className="compare-sticky-header__text">
                  <p className="compare-sticky-header__title">{car.title}</p>
                  <p className="compare-sticky-header__trim">{car.variant}</p>
                </div>
                <p className="compare-sticky-header__price">
                  {car.price}
                  <sup>*</sup>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="compare-page__container">
        <header className="compare-page__title">
          <h1>Compare cars</h1>
          <p>Compare pricing, specs, features and ratings for up to three cars from your shortlist.</p>
        </header>

        <div className="compare-page__separator" />

        <div className="compare-page__table">
          <section
            ref={cardGridRef}
            className="compare-page__card-grid"
            aria-label="Cars being compared"
          >
            <div className="compare-page__row-heading" aria-hidden="true" />
            {comparisonCars.map((car) => (
              <article key={car.id} className="compare-card">
                <div className="compare-card__top">
                  <div className="compare-card__image">
                    <img src={car.image} alt="" />
                  </div>
                  <div className="compare-card__identity">
                    <h2>{car.title}</h2>
                    <p>{car.variant}</p>
                  </div>
                </div>

                <div className="compare-card__bottom">
                  <div className="compare-card__price">
                    <strong>
                      {car.price}
                      <sup>*</sup>
                    </strong>
                    <p>{car.driveAway}</p>
                  </div>
                  <Link to={car.detailsPath} className="compare-card__details-link">
                    View details
                    <ChevronRight />
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <section className="compare-overview" aria-labelledby="overview-heading">
            <header className="compare-overview__header">
              <h2 id="overview-heading">Overview</h2>
            </header>
            <div className="compare-overview__table-wrap">
              <table className="compare-overview__table">
                <tbody>
                  {overviewRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={row.className}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, valueIndex) => (
                        <td key={valueIndex}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="ownership-costs" aria-labelledby="ownership-costs-heading">
            <header className="ownership-costs__header">
              <h2 id="ownership-costs-heading">Estimated monthly cost of ownership</h2>
              <p>
                Compare and calculate your indicative costs of owning and running this car in Victoria with RACV
                products, and based on driving 15,000kms per year,{' '}
                <a
                  href="https://www.racv.com.au/car-match/car-match-faqs.html#Whatareestimatedrunningcosts"
                  target="_blank"
                  rel="noreferrer"
                >
                  learn more
                </a>
                .**
              </p>
            </header>

            <div className="ownership-costs__body">
              <div className="ownership-costs__scroll">
                <div className="ownership-costs__tables">
                  <table className="ownership-costs__monthly">
                    <tbody>
                      <tr>
                        <th scope="row">Estimated monthly costs</th>
                        {ownershipCosts.map((costs, index) => (
                          <td
                            key={comparisonCars[index].id}
                            className={isColumnLoading(index) ? 'ownership-costs__cell--loading' : undefined}
                            aria-busy={isColumnLoading(index)}
                          >
                            <strong>{formatMoney(getMonthlyTotal(costs))}</strong>
                            <button
                              type="button"
                              onClick={() => setActiveCostCarIndex(index)}
                              disabled={loadingColumns.length > 0}
                            >
                              {costs.calculated ? 'Recalculate cost' : 'Calculate cost'}
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  <table className="ownership-costs__breakdown">
                    <tbody>
                      <tr>
                        <th scope="row">
                          <CostLabel tooltip>Car Loan repayment</CostLabel>
                        </th>
                        {ownershipCosts.map((costs, index) => (
                          <td
                            key={`loan-${comparisonCars[index].id}`}
                            className={isColumnLoading(index) ? 'ownership-costs__cell--loading' : undefined}
                            aria-busy={isColumnLoading(index)}
                          >
                            {formatMoney(costs.loan)}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">
                          <CostLabel tooltip>Car Insurance***</CostLabel>
                        </th>
                        {ownershipCosts.map((costs, index) => (
                          <td
                            key={`insurance-${comparisonCars[index].id}`}
                            className={isColumnLoading(index) ? 'ownership-costs__cell--loading' : undefined}
                            aria-busy={isColumnLoading(index)}
                          >
                            {formatMoney(costs.insurance)}
                          </td>
                        ))}
                      </tr>
                      <tr className="ownership-costs__row--running">
                        <th scope="row">
                          <span className="ownership-costs__running-label">
                            <strong>Running costs</strong>
                            <span>Victorian registration</span>
                          </span>
                        </th>
                        {ownershipCosts.map((costs, index) => (
                          <td
                            key={`registration-${comparisonCars[index].id}`}
                            className={isColumnLoading(index) ? 'ownership-costs__cell--loading' : undefined}
                            aria-busy={isColumnLoading(index)}
                          >
                            <MoneyCell amount={costs.registration} annotated={index === 0} />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">Fuel</th>
                        {ownershipCosts.map((costs, index) => (
                          <td
                            key={`fuel-${comparisonCars[index].id}`}
                            className={isColumnLoading(index) ? 'ownership-costs__cell--loading' : undefined}
                            aria-busy={isColumnLoading(index)}
                          >
                            <MoneyCell amount={costs.fuel} annotated />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">Servicing</th>
                        {ownershipCosts.map((costs, index) => (
                          <td
                            key={`servicing-${comparisonCars[index].id}`}
                            className={isColumnLoading(index) ? 'ownership-costs__cell--loading' : undefined}
                            aria-busy={isColumnLoading(index)}
                          >
                            {formatMoney(costs.servicing)}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">Battery</th>
                        {ownershipCosts.map((costs, index) => (
                          <td
                            key={`battery-${comparisonCars[index].id}`}
                            className={isColumnLoading(index) ? 'ownership-costs__cell--loading' : undefined}
                            aria-busy={isColumnLoading(index)}
                          >
                            <MoneyCell amount={costs.battery} annotated />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">
                          <strong>
                            RACV Roadside Assistance<sup>#</sup>
                          </strong>
                        </th>
                        {ownershipCosts.map((costs, index) => (
                          <td
                            key={`roadside-${comparisonCars[index].id}`}
                            className={isColumnLoading(index) ? 'ownership-costs__cell--loading' : undefined}
                            aria-busy={isColumnLoading(index)}
                          >
                            {formatMoney(costs.roadside)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  {loadingColumns.map((index) => (
                    <div
                      key={`loading-${comparisonCars[index].id}`}
                      className="ownership-costs__column-loading"
                      style={{ '--column-index': index } as CSSProperties}
                    >
                      <OwnershipColumnLoader carTitle={comparisonCars[index].title} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {activeCostCarIndex !== null && (
        <CalculateCostModal
          key={activeCostCarIndex}
          initialForm={ownershipCosts[activeCostCarIndex].form}
          baselineForm={INITIAL_OWNERSHIP[activeCostCarIndex].form}
          onClose={() => setActiveCostCarIndex(null)}
          onUpdate={handleOwnershipUpdate}
          onReset={handleOwnershipReset}
        />
      )}
    </div>
  );
}
