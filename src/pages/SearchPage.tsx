import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import './SearchPage.css';

const mockResults = [
  {
    id: 1,
    make: 'BYD',
    model: 'Seal',
    year: 2026,
    fuel: 'Electric',
    price: '$45,990',
    image:
      'https://www.racv.com.au/content/dam/racv-assets/images/images/content-hub/transport/2025-cars/byd/2025-byd-sealion-7/2025-byd-sealion-7-black/BYD-Sealion-7-Thumbnail.jpg.transform/imageDesktop/image.jpg',
  },
  {
    id: 2,
    make: 'Toyota',
    model: 'RAV4',
    year: 2026,
    fuel: 'Hybrid',
    price: '$42,500',
    image:
      'https://www.racv.com.au/content/dam/racv-assets/images/images/motor/car-match/1600x900/green-mg-1600x900.jpg',
  },
  {
    id: 3,
    make: 'MG',
    model: '4',
    year: 2026,
    fuel: 'Electric',
    price: '$38,990',
    image:
      'https://www.racv.com.au/content/dam/racv-assets/images/icons/car-match/electric-420x280.jpg',
  },
  {
    id: 4,
    make: 'Ford',
    model: 'Everest',
    year: 2026,
    fuel: 'Diesel',
    price: '$58,990',
    image:
      'https://www.racv.com.au/content/dam/racv-assets/images/images/content-hub/transport/2026-cars/ford/ford-everest/ford-everest-active/banners-and-thumbnails/2026-Ford-Everest-Active-thumbnail-900x600.jpg.transform/imageDesktop/image.jpg',
  },
];

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const fuel = searchParams.get('fuel');
  const bodyType = searchParams.get('bodyType');
  const category = searchParams.get('category');

  const filters = [
    make && `Make: ${make}`,
    model && `Model: ${model}`,
    fuel && `Fuel: ${fuel}`,
    bodyType && `Body: ${bodyType}`,
    category && `Category: ${category}`,
  ].filter(Boolean);

  return (
    <div className="search-page">
      <div className="container">
        <nav className="search-page__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Car Match</Link>
          <span aria-hidden="true">/</span>
          <span>Search results</span>
        </nav>

        <div className="search-page__header">
          <h1>Search results</h1>
          {filters.length > 0 ? (
            <p className="search-page__filters">
              Showing results for: {filters.join(' · ')}
            </p>
          ) : (
            <p className="search-page__filters">Showing all available vehicles</p>
          )}
        </div>

        <div className="search-page__prototype-note">
          <strong>Prototype note:</strong> This is a mock search results page for user testing.
          Results are static placeholders.
        </div>

        <div className="search-page__results">
          {mockResults.map((car) => (
            <article key={car.id} className="search-result-card">
              <img src={car.image} alt={`${car.make} ${car.model}`} />
              <div className="search-result-card__content">
                <h2>
                  {car.year} {car.make} {car.model}
                </h2>
                <p className="search-result-card__fuel">{car.fuel}</p>
                <p className="search-result-card__price">From {car.price}</p>
                <Button variant="secondary">Compare</Button>
              </div>
            </article>
          ))}
        </div>

        <div className="search-page__back">
          <Link to="/">
            <Button variant="secondary">Back to Car Match</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
