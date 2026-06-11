import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { RunningCostsData } from '../../data/content';
import { assetUrl } from '../../utils/baseUrl';
import { Button } from '../Button';
import { ChevronDownIcon, TooltipIcon } from '../Icons';
import { EditRunningCostsPanel } from './EditRunningCostsPanel';
import './CarDetailsRunningCosts.css';

type CarDetailsRunningCostsProps = {
  data: RunningCostsData;
};

const LINE_ITEM_ICONS: Record<string, string> = {
  'car-loan': assetUrl('/icons/running-costs/car-loan.png'),
  registration: assetUrl('/icons/running-costs/licence.png'),
  fuel: assetUrl('/icons/running-costs/fuel.png'),
  servicing: assetUrl('/icons/running-costs/wrench.png'),
  tyres: assetUrl('/icons/running-costs/tyre.png'),
  battery: assetUrl('/icons/running-costs/battery.png'),
  roadside: assetUrl('/icons/running-costs/roadside.png'),
};

const COST_TOOLTIPS: Record<string, ReactNode> = {
  'car-loan': (
    <>
      Car loan cost is based on an RACV Car Loan on a 5 year term for the full purchase price.
      <br />
      <br />- New car loan from 6.89% p.a. (comparison rate from 7.59% p.a.
      <sup>+</sup>).
      <br />
      <br />
      Fees apply.
      <sup>+</sup> See important information about the Comparison Rate
    </>
  ),
  'running-costs': (
    <>
      Running costs are based on the latest vehicle-specific data and standard personal car usage, which
      assumes you drive 15,000km per year and follow the manufacturer's recommended servicing schedule**.
      We use the manufacturer's minimum recommended fuel type. Electricity usage assumes the vehicle is
      charged predominately at home, with occasional public charging. For more information on how we
      calculate the running costs, visit our{' '}
      <a
        href="https://www.racv.com.au/car-match/car-match-faqs.html#Whatareestimatedrunningcosts"
        target="_blank"
        rel="noreferrer"
      >
        FAQs page
      </a>
      .
    </>
  ),
  insurance:
    'Estimated monthly premium for RACV Car Insurance based on indicative pricing for this vehicle.',
};

function CostTooltip({ id, label }: { id: keyof typeof COST_TOOLTIPS; label: string }) {
  const tooltipId = `running-costs-tooltip-${id}`;

  return (
    <span className="running-costs__tooltip">
      <button
        type="button"
        className="running-costs__tooltip-trigger"
        aria-label={`More information about ${label}`}
        aria-describedby={tooltipId}
      >
        <TooltipIcon />
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className={`running-costs__tooltip-content${
          id === 'car-loan' || id === 'running-costs' ? ' running-costs__tooltip-content--wide' : ''
        }`}
      >
        {COST_TOOLTIPS[id]}
      </span>
    </span>
  );
}

function CostDot({ variant }: { variant: 'ownership' | 'running' | 'insurance' }) {
  return <span className={`running-costs__dot running-costs__dot--${variant}`} aria-hidden="true" />;
}

function LineItemIcon({ id }: { id: string }) {
  const src = LINE_ITEM_ICONS[id];
  if (!src) return null;

  return <img className="running-costs__icon" src={src} alt="" width={24} height={24} aria-hidden="true" />;
}

function DonutChart({
  ownershipAmount,
  runningAmount,
  insuranceAmount,
  totalLabel,
  periodLabel,
}: {
  ownershipAmount: number;
  runningAmount: number;
  insuranceAmount: number;
  totalLabel: string;
  periodLabel: string;
}) {
  const total = ownershipAmount + runningAmount + insuranceAmount;
  const ownershipPercent = total > 0 ? (ownershipAmount / total) * 100 : 0;
  const runningPercent = total > 0 ? (runningAmount / total) * 100 : 0;
  const runningEnd = ownershipPercent + runningPercent;

  const gradient = useMemo(
    () =>
      `conic-gradient(var(--link) 0 ${ownershipPercent}%, var(--accent-01) ${ownershipPercent}% ${runningEnd}%, var(--accent-yellow) ${runningEnd}% 100%)`,
    [ownershipPercent, runningEnd],
  );

  return (
    <div className="running-costs__chart">
      <div className="running-costs__donut" style={{ background: gradient }}>
        <div className="running-costs__donut-hole">
          <p className="running-costs__donut-label">Estimated costs</p>
          <p className="running-costs__donut-total">{totalLabel}</p>
          <p className="running-costs__donut-period">{periodLabel}</p>
        </div>
      </div>
    </div>
  );
}

export function CarDetailsRunningCosts({ data }: CarDetailsRunningCostsProps) {
  const [viewAs, setViewAs] = useState<'monthly' | 'annual'>('monthly');
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [runningCosts, setRunningCosts] = useState(data);

  useEffect(() => {
    setRunningCosts(data);
    setIsEditPanelOpen(false);
  }, [data]);

  const multiplier = viewAs === 'monthly' ? 1 : 12;
  const parseLineItemAmount = (value: string) =>
    Number.parseFloat(value.replace(/[$,]/g, '')) || 0;
  const formatMoney = (amount: number) =>
    `$${Math.round(amount * multiplier).toLocaleString('en-AU')}`;
  const formatLineItemValue = (value: string) => formatMoney(parseLineItemAmount(value));

  const ownershipAmount = runningCosts.loanCost;
  const runningAmount = useMemo(
    () =>
      runningCosts.lineItems.reduce(
        (sum, item) => sum + parseLineItemAmount(item.value),
        0,
      ),
    [runningCosts.lineItems],
  );
  const insuranceAmount = runningCosts.insuranceCost;
  const totalAmount = ownershipAmount + runningAmount + insuranceAmount;

  return (
    <section
      id="running-costs"
      className={`running-costs ${isEditPanelOpen ? 'running-costs--panel-open' : ''}`}
      aria-labelledby="running-costs-heading"
    >
      <div className="running-costs__shell">
        <div className="running-costs__inner">
          <h2 id="running-costs-heading" className="running-costs__heading">
            Estimated cost of ownership
          </h2>
          <p className="running-costs__intro">
          See the estimated costs of owning this car in Victoria**. To learn more, read the{' '}
            <a
              href="https://www.racv.com.au/car-match/car-match-faqs.html#Whatareestimatedrunningcosts"
              target="_blank"
              rel="noreferrer"
            >
              Car Match FAQs
            </a>
            .
          </p>

          <div className="running-costs__card">
            <div className="running-costs__card-body">
              <div className="running-costs__list-col">
                <div className="running-costs__list">
                  <div className="running-costs__row running-costs__row--primary">
                    <div className="running-costs__label-group">
                      <CostDot variant="ownership" />
                      <div className="running-costs__label-wrap">
                        <div className="running-costs__label running-costs__label--strong">
                          Car loan
                          <CostTooltip id="car-loan" label="car loan" />
                        </div>
                      </div>
                    </div>
                    <span className="running-costs__amount running-costs__amount--strong">
                      {formatMoney(ownershipAmount)}
                    </span>
                  </div>

                  <div className="running-costs__row running-costs__row--sub">
                    <div className="running-costs__label-group">
                      <LineItemIcon id="car-loan" />
                      <div className="running-costs__label-wrap">
                        <p className="running-costs__sub-label">Want a new car loan?</p>
                        <a href="#get-rate" className="running-costs__link">
                          Get my RACV Car Loan rate
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="running-costs__row running-costs__row--primary">
                    <div className="running-costs__label-group">
                      <CostDot variant="running" />
                      <div className="running-costs__label-wrap">
                        <div className="running-costs__label running-costs__label--strong">
                          Running costs
                          <CostTooltip id="running-costs" label="running costs" />
                        </div>
                      </div>
                    </div>
                    <span className="running-costs__amount running-costs__amount--strong">
                      {formatMoney(runningAmount)}
                    </span>
                  </div>

                  {runningCosts.lineItems.map((item) => (
                    <div key={item.id} className="running-costs__row running-costs__row--line">
                      <div className="running-costs__label-group">
                        <LineItemIcon id={item.id} />
                        <div className="running-costs__label-wrap">
                          <p className="running-costs__line-label">
                            {item.label}
                            {item.footnote && <sup>{item.footnote}</sup>}
                          </p>
                          {item.linkLabel && (
                            <a href={item.linkHref ?? '#'} className="running-costs__link">
                              {item.linkLabel}
                            </a>
                          )}
                        </div>
                      </div>
                      <span className="running-costs__amount">
                        {formatLineItemValue(item.value)}
                        {item.valueFootnote && <sup>{item.valueFootnote}</sup>}
                      </span>
                    </div>
                  ))}

                  <div className="running-costs__row running-costs__row--primary">
                    <div className="running-costs__label-group">
                      <CostDot variant="insurance" />
                      <div className="running-costs__label-wrap">
                        <div className="running-costs__label running-costs__label--strong">
                          Car Insurance
                          <CostTooltip id="insurance" label="car insurance" />
                        </div>
                        <a href="#get-quote" className="running-costs__link">
                          Get an RACV Insurance quote
                        </a>
                      </div>
                    </div>
                    <span className="running-costs__amount running-costs__amount--strong">
                      {formatMoney(insuranceAmount)}
                    </span>
                  </div>
                </div>

                <div className="running-costs__actions">
                  <Button variant="primary" onClick={() => setIsEditPanelOpen(true)}>
                    Customise costs
                  </Button>
                  <Button variant="secondary" onClick={() => setRunningCosts(data)}>
                    Reset
                  </Button>
                </div>
              </div>


              <div className="running-costs__summary">
                <div className="running-costs__view-as">
                  <span className="running-costs__view-as-label">View as</span>
                  <div className="running-costs__view-select">
                    <select
                      value={viewAs}
                      onChange={(event) =>
                        setViewAs(event.target.value as 'monthly' | 'annual')
                      }
                      aria-label="View costs as"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </select>
                    <ChevronDownIcon />
                  </div>
                </div>

                <DonutChart
                  ownershipAmount={ownershipAmount}
                  runningAmount={runningAmount}
                  insuranceAmount={insuranceAmount}
                  totalLabel={formatMoney(totalAmount)}
                  periodLabel={viewAs === 'monthly' ? 'per month' : 'per year'}
                />
              </div>
            </div>
          </div>
        </div>

        {isEditPanelOpen && (
          <EditRunningCostsPanel
            key={viewAs}
            data={runningCosts}
            baselineData={data}
            viewAs={viewAs}
            onClose={() => setIsEditPanelOpen(false)}
            onUpdate={setRunningCosts}
          />
        )}
      </div>
    </section>
  );
}
