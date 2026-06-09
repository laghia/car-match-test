import { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  categoryTagLabels,
  defaultSearchResults,
  electricSearchResults,
} from '../data/content';
import { flowConfig } from '../flow/config';
import { SearchFilterPanel } from '../components/search/SearchFilterPanel';
import { SearchPagination } from '../components/search/SearchPagination';
import { SearchResultsTitle } from '../components/search/SearchResultsTitle';
import { VehicleCard } from '../components/search/VehicleCard';
import './SearchPage.css';

type ActiveTag = {
  id: string;
  label: string;
};

function buildActiveTags(
  tag: string | undefined,
  make: string | null,
  model: string | null,
  fuel: string | null,
  category: string | null,
): ActiveTag[] {
  const tags: ActiveTag[] = [];

  const categoryKey = tag || category;
  if (categoryKey && categoryTagLabels[categoryKey]) {
    tags.push({ id: `category-${categoryKey}`, label: categoryTagLabels[categoryKey] });
  }

  if (make) tags.push({ id: 'make', label: make });
  if (model) tags.push({ id: 'model', label: model });
  if (fuel) tags.push({ id: 'fuel', label: fuel });

  return tags;
}

function getCarsFoundCount(tag: string | undefined): number {
  if (tag === 'electric-tag') return 1250;
  return 36850;
}

export function SearchPage() {
  const navigate = useNavigate();
  const { tag } = useParams<{ tag?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const fuel = searchParams.get('fuel');
  const category = searchParams.get('category');

  const results =
    tag === 'electric-tag' || category === 'electric-tag' || fuel === 'Electric'
      ? electricSearchResults
      : defaultSearchResults;

  const activeTags = useMemo(
    () => buildActiveTags(tag, make, model, fuel, category),
    [tag, make, model, fuel, category],
  );

  const carsFoundCount = getCarsFoundCount(tag);
  const filterCount = Math.max(activeTags.length, 1);

  const handleRemoveTag = (id: string) => {
    if (id.startsWith('category-') && tag) {
      const nextParams = searchParams.toString();
      navigate(`${flowConfig.searchPath}${nextParams ? `?${nextParams}` : ''}`);
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    if (id === 'make') nextParams.delete('make');
    if (id === 'model') nextParams.delete('model');
    if (id === 'fuel') nextParams.delete('fuel');
    if (id.startsWith('category-')) nextParams.delete('category');
    setSearchParams(nextParams, { replace: true });
  };

  const handleClearAll = () => {
    navigate(flowConfig.searchPath);
  };

  return (
    <div className="search-page">
      <SearchResultsTitle
        carsFoundCount={carsFoundCount}
        tags={activeTags}
        onRemoveTag={handleRemoveTag}
        shortlistCount={0}
      />

      <div className="search-page__layout">
        <SearchFilterPanel activeCount={filterCount} onClearAll={handleClearAll} />

        <div className="search-page__main">
          <div className="search-page__grid">
            {results.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <SearchPagination />
        </div>
      </div>
    </div>
  );
}
