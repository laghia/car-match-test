import { useState } from 'react';
import type { CarDetailsFuelFilter, CarDetailsVariant } from '../../data/content';
import { ChevronDownIcon, ChevronRight } from '../Icons';
import './CarDetailsVariantPanel.css';

type CarDetailsVariantPanelProps = {
  variantCount: number;
  year: number;
  yearOptions: number[];
  fuelFilters: CarDetailsFuelFilter[];
  variants: CarDetailsVariant[];
  selectedVariantId: string;
  onSelectVariant: (id: string) => void;
};

export function CarDetailsVariantPanel({
  variantCount,
  year,
  yearOptions,
  fuelFilters,
  variants,
  selectedVariantId,
  onSelectVariant,
}: CarDetailsVariantPanelProps) {
  const [activeFuelFilter, setActiveFuelFilter] = useState(
    fuelFilters.find((filter) => filter.active)?.id ?? 'all',
  );

  return (
    <section className="car-details-variant-panel">
      <div className="car-details-variant-panel__header">
        <h2 className="car-details-variant-panel__title">
          Available in {variantCount} variants
        </h2>
        <div className="car-details-variant-panel__year">
          <span>{year}</span>
          <ChevronDownIcon />
        </div>
      </div>

      <div className="car-details-variant-panel__filters" role="tablist" aria-label="Fuel type filters">
        {fuelFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={activeFuelFilter === filter.id}
            className={`car-details-variant-panel__filter ${
              activeFuelFilter === filter.id ? 'car-details-variant-panel__filter--active' : ''
            }`}
            onClick={() => setActiveFuelFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="car-details-variant-panel__scroll-wrap">
        <div className="car-details-variant-panel__variants">
          {variants.map((variant) => {
            const isSelected = variant.id === selectedVariantId;

            return (
              <button
                key={variant.id}
                type="button"
                className={`car-details-variant-panel__tile ${
                  isSelected ? 'car-details-variant-panel__tile--selected' : ''
                }`}
                onClick={() => onSelectVariant(variant.id)}
                aria-pressed={isSelected}
              >
                <div className="car-details-variant-panel__tile-top">
                  <span className="car-details-variant-panel__trim">{variant.trim}</span>
                  <span className="car-details-variant-panel__tile-price">
                    {variant.price}
                    <sup>*</sup>
                  </span>
                </div>
                <span className="car-details-variant-panel__tile-engine">{variant.engine}</span>
                {variant.isHybrid && (
                  <span className="car-details-variant-panel__hybrid-badge" aria-label="Hybrid">
                    H
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <button type="button" className="car-details-variant-panel__scroll-btn" aria-label="Scroll variants">
          <ChevronRight />
        </button>
      </div>

      <select className="sr-only" aria-label="Select model year" defaultValue={year}>
        {yearOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </section>
  );
}
