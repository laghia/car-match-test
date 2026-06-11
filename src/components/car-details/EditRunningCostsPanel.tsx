import { useEffect, useId, useState } from 'react';
import type { RunningCostsData } from '../../data/content';
import { Button } from '../Button';
import { CrossIcon } from '../Icons';
import './EditRunningCostsPanel.css';

export type RunningCostsViewAs = 'monthly' | 'annual';

type EditRunningCostsPanelProps = {
  data: RunningCostsData;
  viewAs: RunningCostsViewAs;
  onClose: () => void;
  onUpdate: (updatedData: RunningCostsData) => void;
};

type EditCostsFormState = {
  hasFinance: 'yes' | 'no';
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  registration: string;
  fuel: string;
  servicing: string;
  tyres: string;
  battery: string;
  roadside: string;
  insurance: string;
};

const ROADSIDE_OPTIONS = [
  { value: 'total-care-1-2', label: 'Total Care (1-2 vehicles) $318', annualCost: 318 },
  { value: 'total-care-3-5', label: 'Total Care (3-5 vehicles) $411', annualCost: 411 },
  { value: 'extra-care-1', label: 'Extra Care (1 vehicle) $229', annualCost: 229 },
  { value: 'extra-care-2', label: 'Extra Care (2 vehicles) $301', annualCost: 301 },
  { value: 'roadside-care-1', label: 'Roadside Care (1 vehicle) $138', annualCost: 138 },
  { value: 'roadside-care-2', label: 'Roadside Care (2 vehicles) $276', annualCost: 276 },
] as const;

function getRoadsideOption(value: string) {
  return ROADSIDE_OPTIONS.find((item) => item.value === value) ?? ROADSIDE_OPTIONS[0];
}

function getRoadsideMonthlyCost(value: string): number {
  return getRoadsideOption(value).annualCost / 12;
}

function formAmountToMonthly(value: string, viewAs: RunningCostsViewAs): number {
  const amount = parseAmount(value);
  return viewAs === 'annual' ? amount / 12 : amount;
}

function monthlyToFormAmount(monthly: number, viewAs: RunningCostsViewAs): string {
  if (viewAs === 'annual') {
    return String(Math.round(monthly * 12));
  }
  return String(Math.round(monthly));
}

function parseStoredAmount(value: string): number {
  return Number.parseFloat(value.replace(/[$,]/g, '')) || 0;
}

function formatStoredAmount(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? `$${rounded}` : `$${rounded.toFixed(2)}`;
}

function stripCurrency(value: string): string {
  return value.replace(/^\$/, '');
}

function parseAmount(value: string): number {
  return Number.parseInt(value.replace(/,/g, ''), 10) || 0;
}

function getLineItemValue(data: RunningCostsData, id: string, fallback: string): string {
  const item = data.lineItems.find((lineItem) => lineItem.id === id);
  return item ? stripCurrency(item.value) : fallback;
}

function getRoadsideFromData(data: RunningCostsData): EditCostsFormState['roadside'] {
  const amount = parseStoredAmount(getLineItemValue(data, 'roadside', '0'));

  let closest: string = ROADSIDE_OPTIONS[0].value;
  let minDiff = Infinity;
  for (const option of ROADSIDE_OPTIONS) {
    const monthly = getRoadsideMonthlyCost(option.value);
    const diff = Math.abs(monthly - amount);
    if (diff < minDiff) {
      minDiff = diff;
      closest = option.value;
    }
  }
  return closest;
}

const DEFAULT_LOAN_FORM = {
  loanAmount: '25,000',
  interestRate: '7',
  loanTerm: '3',
} as const;

function hasFinanceFieldsChanged(
  form: EditCostsFormState,
  data: RunningCostsData,
): boolean {
  const defaultHasFinance = data.loanCost > 0 ? 'yes' : 'no';

  return (
    form.hasFinance !== defaultHasFinance ||
    form.loanAmount !== DEFAULT_LOAN_FORM.loanAmount ||
    form.interestRate !== DEFAULT_LOAN_FORM.interestRate ||
    form.loanTerm !== DEFAULT_LOAN_FORM.loanTerm
  );
}

function resolveLoanCost(form: EditCostsFormState, data: RunningCostsData): number {
  if (form.hasFinance === 'no') return 0;
  if (!hasFinanceFieldsChanged(form, data)) return data.loanCost;
  return calculateMonthlyLoanCost(form);
}

function calculateMonthlyLoanCost(form: EditCostsFormState): number {
  if (form.hasFinance === 'no') return 0;

  const principal = parseAmount(form.loanAmount);
  const annualRate = Number.parseFloat(form.interestRate) / 100;
  const termMonths = (Number.parseInt(form.loanTerm, 10) || 0) * 12;

  if (principal <= 0 || termMonths <= 0) return 0;
  if (annualRate === 0) return Math.round(principal / termMonths);

  const monthlyRate = annualRate / 12;
  const factor = (1 + monthlyRate) ** termMonths;
  const payment = (principal * monthlyRate * factor) / (factor - 1);

  return Math.round(payment);
}

export function applyFormToRunningCosts(
  form: EditCostsFormState,
  currentData: RunningCostsData,
  viewAs: RunningCostsViewAs = 'monthly',
): RunningCostsData {
  const registration = formAmountToMonthly(form.registration, viewAs);
  const fuel = formAmountToMonthly(form.fuel, viewAs);
  const servicing = formAmountToMonthly(form.servicing, viewAs);
  const tyres = formAmountToMonthly(form.tyres, viewAs);
  const battery = formAmountToMonthly(form.battery, viewAs);
  const roadside = getRoadsideMonthlyCost(form.roadside);
  const insurance = formAmountToMonthly(form.insurance, viewAs);

  const lineItemAmounts: Record<string, number> = {
    registration,
    fuel,
    servicing,
    tyres,
    battery,
    roadside,
  };

  const runningCost = Object.values(lineItemAmounts).reduce((sum, amount) => sum + amount, 0);

  return {
    loanCost: resolveLoanCost(form, currentData),
    runningCost,
    insuranceCost: insurance,
    lineItems: currentData.lineItems.map((item) =>
      lineItemAmounts[item.id] !== undefined
        ? { ...item, value: formatStoredAmount(lineItemAmounts[item.id]) }
        : item,
    ),
  };
}

function buildDefaultFormState(data: RunningCostsData, viewAs: RunningCostsViewAs): EditCostsFormState {
  return {
    hasFinance: data.loanCost > 0 ? 'yes' : 'no',
    loanAmount: DEFAULT_LOAN_FORM.loanAmount,
    interestRate: DEFAULT_LOAN_FORM.interestRate,
    loanTerm: DEFAULT_LOAN_FORM.loanTerm,
    registration: monthlyToFormAmount(parseStoredAmount(getLineItemValue(data, 'registration', '96')), viewAs),
    fuel: monthlyToFormAmount(parseStoredAmount(getLineItemValue(data, 'fuel', '104')), viewAs),
    servicing: monthlyToFormAmount(parseStoredAmount(getLineItemValue(data, 'servicing', '45')), viewAs),
    tyres: monthlyToFormAmount(parseStoredAmount(getLineItemValue(data, 'tyres', '16')), viewAs),
    battery: monthlyToFormAmount(parseStoredAmount(getLineItemValue(data, 'battery', '8')), viewAs),
    roadside: getRoadsideFromData(data),
    insurance: monthlyToFormAmount(data.insuranceCost, viewAs),
  };
}

function Field({
  id,
  label,
  helper,
  children,
}: {
  id: string;
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="edit-costs-panel__field">
      <label className="edit-costs-panel__label" htmlFor={id}>
        {label}
      </label>
      {helper && <p className="edit-costs-panel__helper">{helper}</p>}
      {children}
    </div>
  );
}

export function EditRunningCostsPanel({
  data,
  viewAs,
  onClose,
  onUpdate,
}: EditRunningCostsPanelProps) {
  const titleId = useId();
  const [form, setForm] = useState<EditCostsFormState>(() => buildDefaultFormState(data, viewAs));

  useEffect(() => {
    setForm(buildDefaultFormState(data, viewAs));
  }, [data, viewAs]);

  const [isFollowing, setIsFollowing] = useState(false);
  const [panelTop, setPanelTop] = useState<number | null>(null);

  useEffect(() => {
    const section = document.getElementById('running-costs');
    if (!section) return undefined;

    const shell = section.querySelector('.running-costs__shell');

    const updatePanelPosition = () => {
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        ) || 98;
      const tabsHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--car-details-tabs-height'),
        ) || 57;
      const stickyTop = headerHeight + tabsHeight;
      const shellTop = shell?.getBoundingClientRect().top ?? section.getBoundingClientRect().top;

      if (shellTop <= stickyTop) {
        setIsFollowing(true);
        setPanelTop(stickyTop);
      } else {
        setIsFollowing(false);
        setPanelTop(shellTop);
      }
    };

    updatePanelPosition();
    window.addEventListener('scroll', updatePanelPosition, { passive: true });
    window.addEventListener('resize', updatePanelPosition);

    return () => {
      window.removeEventListener('scroll', updatePanelPosition);
      window.removeEventListener('resize', updatePanelPosition);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const updateField = <K extends keyof EditCostsFormState>(key: K, value: EditCostsFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleUpdate = () => {
    onUpdate(applyFormToRunningCosts(form, data, viewAs));
    onClose();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleUpdate();
  };

  return (
    <>
      {isFollowing && <div className="edit-costs-panel__spacer" aria-hidden="true" />}
      <aside
        className={`edit-costs-panel ${isFollowing ? 'edit-costs-panel--following' : ''}`}
        style={panelTop !== null ? { top: panelTop } : undefined}
        aria-labelledby={titleId}
        role="dialog"
      >
        <div className="edit-costs-panel__header">
          <h2 id={titleId} className="edit-costs-panel__title">
            Edit running costs
            {viewAs === 'annual' && (
              <span className="edit-costs-panel__period"></span>
            )}
          </h2>
          <button type="button" className="edit-costs-panel__close" onClick={onClose} aria-label="Close">
            <CrossIcon />
          </button>
        </div>

        <div className="edit-costs-panel__body">
          <form id="edit-costs-form" className="edit-costs-panel__form" onSubmit={handleSubmit}>
            <Field id="has-finance" label="Do you have finance?">
              <div className="edit-costs-panel__radios" role="radiogroup" aria-label="Do you have finance?">
                <label className="edit-costs-panel__radio">
                  <input
                    type="radio"
                    name="has-finance"
                    value="yes"
                    checked={form.hasFinance === 'yes'}
                    onChange={() => updateField('hasFinance', 'yes')}
                  />
                  Yes
                </label>
                <label className="edit-costs-panel__radio">
                  <input
                    type="radio"
                    name="has-finance"
                    value="no"
                    checked={form.hasFinance === 'no'}
                    onChange={() => updateField('hasFinance', 'no')}
                  />
                  No
                </label>
              </div>
            </Field>

            {form.hasFinance === 'yes' && (
              <div className="edit-costs-panel__section">
                <Field
                  id="loan-amount"
                  label="Loan amount"
                  helper="Enter an amount between $5,000 and $100,000"
                >
                  <input
                    id="loan-amount"
                    className="edit-costs-panel__input"
                    type="text"
                    inputMode="numeric"
                    value={`$${form.loanAmount}`}
                    onChange={(event) =>
                      updateField('loanAmount', event.target.value.replace(/[^\d,]/g, ''))
                    }
                  />
                </Field>

                <Field
                  id="interest-rate"
                  label="Interest rate"
                  helper="RACV New car loan from 6.59% p.a. (comparison rate 7.29% p.a.+)."
                >
                  <input
                    id="interest-rate"
                    className="edit-costs-panel__input"
                    type="text"
                    inputMode="decimal"
                    value={`${form.interestRate}%`}
                    onChange={(event) =>
                      updateField('interestRate', event.target.value.replace(/[^\d.]/g, ''))
                    }
                  />
                  <a href="#get-rate" className="edit-costs-panel__link">
                    Get my personalised rate
                  </a>
                </Field>

                <Field
                  id="loan-term"
                  label="Loan term (years)"
                  helper="Enter a term from 1 to 7 years"
                >
                  <input
                    id="loan-term"
                    className="edit-costs-panel__input"
                    type="text"
                    inputMode="numeric"
                    value={`${form.loanTerm} years`}
                    onChange={(event) =>
                      updateField('loanTerm', event.target.value.replace(/[^\d]/g, ''))
                    }
                  />
                </Field>
              </div>
            )}

            <hr className="edit-costs-panel__divider" />

            <div className="edit-costs-panel__section">
              <Field id="registration" label="Registration">
                <input
                  id="registration"
                  className="edit-costs-panel__input"
                  type="text"
                  value={`$${form.registration}`}
                  onChange={(event) =>
                    updateField('registration', event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </Field>

              <Field id="fuel" label="Fuel / electricity">
                <input
                  id="fuel"
                  className="edit-costs-panel__input"
                  type="text"
                  value={`$${form.fuel}`}
                  onChange={(event) =>
                    updateField('fuel', event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </Field>

              <Field id="servicing" label="Servicing">
                <input
                  id="servicing"
                  className="edit-costs-panel__input"
                  type="text"
                  value={`$${form.servicing}`}
                  onChange={(event) =>
                    updateField('servicing', event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </Field>

              <Field id="tyres" label="Tyres">
                <input
                  id="tyres"
                  className="edit-costs-panel__input"
                  type="text"
                  value={`$${form.tyres}`}
                  onChange={(event) =>
                    updateField('tyres', event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </Field>

              <Field id="battery" label="Battery">
                <input
                  id="battery"
                  className="edit-costs-panel__input"
                  type="text"
                  value={`$${form.battery}`}
                  onChange={(event) =>
                    updateField('battery', event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </Field>

              <Field id="roadside" label="RACV Emergency Roadside Assistance">
                <select
                  id="roadside"
                  className="edit-costs-panel__select"
                  value={form.roadside}
                  onChange={(event) => updateField('roadside', event.target.value)}
                >
                  {ROADSIDE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                id="insurance"
                label="RACV Car Insurance"
                helper={
                  viewAs === 'annual'
                    ? 'Enter your yearly cost or quote number. E.g. REQ12345'
                    : 'Enter your monthly cost or quote number. E.g. REQ12345'
                }
              >
                <input
                  id="insurance"
                  className="edit-costs-panel__input"
                  type="text"
                  value={`$${form.insurance}`}
                  onChange={(event) =>
                    updateField('insurance', event.target.value.replace(/[^\d]/g, ''))
                  }
                />
              </Field>
            </div>
          </form>
        </div>

        <div className="edit-costs-panel__footer">
          <Button variant="digital-primary" fullWidth onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </aside>
    </>
  );
}
