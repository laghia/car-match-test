import { useMemo, useState } from 'react';
import type { RunningCostsData } from '../../data/content';
import { Button } from '../Button';
import { ChevronDownIcon } from '../Icons';
import './CarDetailsRunningCosts.css';

type CarDetailsRunningCostsProps = {
  data: RunningCostsData;
};

function HelpIcon() {
  return (
    <span className="running-costs__help" aria-hidden="true">
      ?
    </span>
  );
}

function CostDot({ variant }: { variant: 'loan' | 'running' }) {
  return <span className={`running-costs__dot running-costs__dot--${variant}`} aria-hidden="true" />;
}

function DonutChart({
  loanAmount,
  runningAmount,
  totalLabel,
  periodLabel,
}: {
  loanAmount: number;
  runningAmount: number;
  totalLabel: string;
  periodLabel: string;
}) {
  const total = loanAmount + runningAmount;
  const loanPercent = total > 0 ? (loanAmount / total) * 100 : 0;

  const gradient = useMemo(
    () =>
      `conic-gradient(var(--link) 0 ${loanPercent}%, var(--accent-01) ${loanPercent}% 100%)`,
    [loanPercent],
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

  const multiplier = viewAs === 'monthly' ? 1 : 12;
  const formatMoney = (amount: number) =>
    `$${Math.round(amount * multiplier).toLocaleString('en-AU')}`;

  const loanAmount = data.loanCost;
  const runningAmount = data.runningCost;
  const totalAmount = loanAmount + runningAmount;

  return (
    <section id="running-costs" className="running-costs" aria-labelledby="running-costs-heading">
      <div className="running-costs__inner">
        <h2 id="running-costs-heading" className="running-costs__heading">
          Estimated running costs
        </h2>
        <p className="running-costs__intro">
          See the indicative costs of owning and running this car in Victoria with RACV products,
          and based on driving 15,000kms per year,{' '}
          <a
            href="https://www.racv.com.au/car-match/car-match-faqs.html#Whatareestimatedrunningcosts"
            target="_blank"
            rel="noreferrer"
          >
            learn more
          </a>
          .**
        </p>

        <div className="running-costs__card">
          <div className="running-costs__card-body">
            <div className="running-costs__list">
              <div className="running-costs__row running-costs__row--primary">
                <div className="running-costs__label-group">
                  <CostDot variant="loan" />
                  <div>
                    <div className="running-costs__label running-costs__label--strong">
                      RACV car loan cost
                      <HelpIcon />
                    </div>
                  </div>
                </div>
                <span className="running-costs__amount running-costs__amount--strong">
                  {formatMoney(loanAmount)}
                </span>
              </div>

              <div className="running-costs__row running-costs__row--sub">
                <div className="running-costs__label-group">
                  <span className="running-costs__sub-icon" aria-hidden="true">
                    ⏱
                  </span>
                  <div>
                    <p className="running-costs__sub-label">Want a new car loan?</p>
                    <a href="#get-rate" className="running-costs__link">
                      Get my rate
                    </a>
                  </div>
                </div>
              </div>

              <div className="running-costs__row running-costs__row--primary">
                <div className="running-costs__label-group">
                  <CostDot variant="running" />
                  <div>
                    <div className="running-costs__label running-costs__label--strong">
                      Running costs
                      <HelpIcon />
                    </div>
                  </div>
                </div>
                <span className="running-costs__amount running-costs__amount--strong">
                  {formatMoney(runningAmount)}
                </span>
              </div>

              {data.lineItems.map((item) => (
                <div key={item.id} className="running-costs__row running-costs__row--line">
                  <div className="running-costs__label-group">
                    <span className="running-costs__line-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div>
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
                    {item.value}
                    {item.valueFootnote && <sup>{item.valueFootnote}</sup>}
                  </span>
                </div>
              ))}
            </div>

            <div className="running-costs__divider" aria-hidden="true" />

            <div className="running-costs__summary">
              <div className="running-costs__view-as">
                <span>View as</span>
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
                loanAmount={loanAmount}
                runningAmount={runningAmount}
                totalLabel={formatMoney(totalAmount)}
                periodLabel={viewAs === 'monthly' ? 'per month' : 'per year'}
              />
            </div>
          </div>

          <div className="running-costs__card-footer">
            <p className="running-costs__footer-title">Finish calculating your costs</p>
            <div className="running-costs__footer-row">
              <div className="running-costs__footer-copy">
                <span className="running-costs__line-icon" aria-hidden="true">
                  🚗
                </span>
                <span>Add RACV Comprehensive Car Insurance</span>
              </div>
              <Button variant="digital-secondary" size="small">
                Get a quote
              </Button>
            </div>
          </div>
        </div>

        <div className="running-costs__loan-banner">
          <div className="running-costs__loan-copy">
            <h3 className="running-costs__loan-title">
              Get your personalised car loan estimate in minutes
            </h3>
            <p className="running-costs__loan-text">
              Find out what your interest rate could look like - fast, free and with no impact on
              your credit score.
            </p>
          </div>
          <Button variant="primary" size="small">
            Get my rate
          </Button>
        </div>
      </div>
    </section>
  );
}
