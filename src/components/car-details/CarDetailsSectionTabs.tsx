import { useEffect, useState } from 'react';
import './CarDetailsSectionTabs.css';

export type CarDetailsTabId = 'running-costs' | 'expert-review' | 'vehicle-specs';

type Tab = {
  id: CarDetailsTabId;
  label: string;
};

const tabs: Tab[] = [
  { id: 'running-costs', label: 'Estimated running costs' },
  { id: 'expert-review', label: 'Expert review' },
  { id: 'vehicle-specs', label: 'Vehicle specs' },
];

export function CarDetailsSectionTabs() {
  const [activeSection, setActiveSection] = useState<CarDetailsTabId>('running-costs');

  useEffect(() => {
    const sectionElements = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.id;
        if (nextId && tabs.some((tab) => tab.id === nextId)) {
          setActiveSection(nextId as CarDetailsTabId);
        }
      },
      {
        rootMargin: '-120px 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="car-details-tabs" aria-label="Car details sections">
      <div className="car-details-tabs__inner">
        <ul className="car-details-tabs__list">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                className={`car-details-tabs__tab ${
                  activeSection === tab.id ? 'car-details-tabs__tab--active' : ''
                }`}
                aria-current={activeSection === tab.id ? 'true' : undefined}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
