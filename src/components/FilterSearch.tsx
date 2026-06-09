import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fuelTypes, popularMakes } from '../data/content';
import { buildSearchUrl } from '../flow/config';
import { HeartIcon } from './Icons';
import { Button } from './Button';
import './FilterSearch.css';

type FilterState = {
  make: string;
  model: string;
  fuel: string;
};

export function FilterSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    make: '',
    model: '',
    fuel: '',
  });

  const hasFilters = Object.values(filters).some(Boolean);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => {
    setFilters({ make: '', model: '', fuel: '' });
  };

  const handleSearch = () => {
    navigate(buildSearchUrl(filters));
  };

  return (
    <div className="hero-cm__filter">
      <div className="hero-cm__filter-shell">
        <div className="hero-cm__filter-card">
          <div className="hero-cm__filter-row">
            <div className="hero-cm__filter-fields">
              <div className="hero-cm__field">
                <label htmlFor="make">Make</label>
                <select
                  id="make"
                  value={filters.make}
                  onChange={(e) => updateFilter('make', e.target.value)}
                >
                  <option value="">Select make</option>
                  {popularMakes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hero-cm__field">
                <label htmlFor="model">Model</label>
                <select
                  id="model"
                  value={filters.model}
                  onChange={(e) => updateFilter('model', e.target.value)}
                  disabled={!filters.make}
                >
                  <option value="">Select model</option>
                  {filters.make && (
                    <>
                      <option value="All models">All models</option>
                      <option value="Base">Base</option>
                      <option value="Premium">Premium</option>
                    </>
                  )}
                </select>
              </div>

              <div className="hero-cm__field">
                <label htmlFor="fuel">Fuel type</label>
                <select
                  id="fuel"
                  value={filters.fuel}
                  onChange={(e) => updateFilter('fuel', e.target.value)}
                >
                  <option value="">Select fuel type</option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hero-cm__filter-action">
              <Button variant="digital-primary" size="small" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>

          <button
            type="button"
            className={`hero-cm__clear ${!hasFilters ? 'hero-cm__clear--disabled' : ''}`}
            onClick={clearAll}
            disabled={!hasFilters}
          >
            Clear all
          </button>

          <div className="hero-cm__shortlist">
            <hr className="hero-cm__shortlist-divider" />
            <button type="button" className="hero-cm__shortlist-btn">
              View shortlist (3)
              <HeartIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
