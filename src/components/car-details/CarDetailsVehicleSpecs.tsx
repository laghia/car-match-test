import { useState } from 'react';
import type { VehicleSpecAccordion, VehicleSpecRow, VehicleSpecsData } from '../../data/content';
import { MinusIcon, PlusIcon } from '../Icons';
import './CarDetailsVehicleSpecs.css';

type CarDetailsVehicleSpecsProps = {
  data: VehicleSpecsData;
};

function SpecRows({ rows }: { rows: VehicleSpecRow[] }) {
  return (
    <div className="vehicle-specs__rows">
      {rows.map((row) => (
        <div key={row.label} className="vehicle-specs__row-wrap">
          <hr className="vehicle-specs__divider" />
          <div className="vehicle-specs__row">
            <span className="vehicle-specs__label">
              {row.label}
              {row.footnote && <sup>{row.footnote}</sup>}
            </span>
            <span className="vehicle-specs__value">{row.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SpecAccordion({
  accordion,
  isOpen,
  onToggle,
}: {
  accordion: VehicleSpecAccordion;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="vehicle-specs__accordion">
      <button
        type="button"
        className="vehicle-specs__accordion-trigger"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{accordion.title}</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </button>
      {isOpen && <SpecRows rows={accordion.rows} />}
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="vehicle-specs__section-heading">
      <h3 className="vehicle-specs__section-title">{title}</h3>
      <hr className="vehicle-specs__divider" />
    </div>
  );
}

export function CarDetailsVehicleSpecs({ data }: CarDetailsVehicleSpecsProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (id: string) => {
    setOpenSections((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const overviewOpen = openSections.has('overview');

  return (
    <section id="vehicle-specs" className="vehicle-specs" aria-labelledby="vehicle-specs-heading">
      <div className="vehicle-specs__inner">
        <div className="vehicle-specs__page-heading">
          <h2 id="vehicle-specs-heading" className="vehicle-specs__heading">
            Vehicle specs
          </h2>
          <hr className="vehicle-specs__divider" />
        </div>

        <div className="vehicle-specs__accordion">
          <button
            type="button"
            className="vehicle-specs__accordion-trigger"
            aria-expanded={overviewOpen}
            onClick={() => toggleSection('overview')}
          >
            <span>Overview</span>
            {overviewOpen ? <MinusIcon /> : <PlusIcon />}
          </button>
          {overviewOpen && <SpecRows rows={data.overview} />}
        </div>

        <div className="vehicle-specs__section">
          <SectionHeading title="Features" />
          {data.features.map((accordion) => (
            <SpecAccordion
              key={accordion.id}
              accordion={accordion}
              isOpen={openSections.has(accordion.id)}
              onToggle={() => toggleSection(accordion.id)}
            />
          ))}
        </div>

        <div className="vehicle-specs__section">
          <SectionHeading title="Specifications" />
          {data.specifications.map((accordion) => (
            <SpecAccordion
              key={accordion.id}
              accordion={accordion}
              isOpen={openSections.has(accordion.id)}
              onToggle={() => toggleSection(accordion.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
