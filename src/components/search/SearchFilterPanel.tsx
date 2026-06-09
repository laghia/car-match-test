import { searchFilterSections } from '../../data/content';
import { ChevronDownIcon } from '../Icons';
import './SearchFilterPanel.css';

type SearchFilterPanelProps = {
  activeCount: number;
  onClearAll?: () => void;
};

export function SearchFilterPanel({ activeCount, onClearAll }: SearchFilterPanelProps) {
  return (
    <aside className="search-filters" aria-label="Search filters">
      <div className="search-filters__header">
        <h2 className="search-filters__title">Filters ({activeCount})</h2>
        <button
          type="button"
          className={`search-filters__clear ${activeCount === 0 ? 'search-filters__clear--disabled' : ''}`}
          disabled={activeCount === 0}
          onClick={onClearAll}
        >
          Clear all
        </button>
      </div>

      {searchFilterSections.map((section) => (
        <div key={section.title} className="search-filters__section">
          <h3 className="search-filters__section-title">{section.title}</h3>
          <ul className="search-filters__list">
            {section.filters.map((filter) => (
              <li key={filter.label} className="search-filters__item">
                <button type="button" className="search-filters__accordion">
                  <span className="search-filters__accordion-label">
                    {filter.label}
                    {filter.count > 0 ? ` (${filter.count})` : ''}
                  </span>
                  <ChevronDownIcon />
                </button>
                {filter.value && (
                  <p className="search-filters__value">{filter.value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
