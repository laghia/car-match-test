import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ChevronDownIcon, CrossIcon, HeartOutlineIcon } from '../Icons';
import './SearchResultsTitle.css';

type ActiveTag = {
  id: string;
  label: string;
};

type SearchResultsTitleProps = {
  carsFoundCount: number;
  tags: ActiveTag[];
  onRemoveTag: (id: string) => void;
  shortlistCount?: number;
};

export function SearchResultsTitle({
  carsFoundCount,
  tags,
  onRemoveTag,
  shortlistCount = 0,
}: SearchResultsTitleProps) {
  const title = `${carsFoundCount.toLocaleString('en-AU')} cars found`;

  return (
    <div className="search-title">
      <div className="search-title__subnav">
        <div className="search-title__subnav-inner">
          <Link to="/" className="search-title__back">
            <ArrowLeftIcon />
            Car Match
          </Link>
          <button type="button" className="search-title__shortlist">
            Compare shortlist ({shortlistCount})
            <HeartOutlineIcon />
          </button>
        </div>
      </div>

      <div className="search-title__content">
        <div className="search-title__heading-row">
          <h1 className="search-title__h1">{title}</h1>
          <div className="search-title__sort">
            <label htmlFor="sort-by" className="sr-only">
              Sort results
            </label>
            <select id="sort-by" className="search-title__sort-select" defaultValue="most-popular">
              <option value="most-popular">Most popular</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="newest">Newest first</option>
            </select>
            <ChevronDownIcon />
          </div>
        </div>

        {tags.length > 0 && (
          <div className="search-title__tags">
            {tags.map((tag) => (
              <span key={tag.id} className="search-title__tag">
                {tag.label}
                <button
                  type="button"
                  className="search-title__tag-remove"
                  aria-label={`Remove ${tag.label} filter`}
                  onClick={() => onRemoveTag(tag.id)}
                >
                  <CrossIcon />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
