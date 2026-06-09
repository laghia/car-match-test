import { features } from '../data/content';
import { FeatureIcon, ReviewIcon, RunningCostsIcon } from './Icons';
import './FeatureSection.css';

const iconMap = {
  costs: RunningCostsIcon,
  features: FeatureIcon,
  reviews: ReviewIcon,
};

export function FeatureSection() {
  return (
    <section className="feature-section">
      <div className="feature-section__inner">
        <div className="container">
          <h2 className="feature-section__title">Compare cars by cost, features and reviews</h2>
          <div className="feature-section__grid">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <div key={feature.title} className="feature-section__item">
                  <div className="feature-section__icon">
                    <Icon />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="feature-section__curve" aria-hidden="true">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0V43.1908C164.424 38.1191 553.601 32.6875 794.912 51.5344C1036.22 70.3813 1325.52 25.031 1440 0H0Z" fill="var(--accent-blue-light)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
