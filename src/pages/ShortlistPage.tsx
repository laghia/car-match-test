import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { CrossIcon, ElectricBadge, HeartIcon, HybridBadge } from '../components/Icons';
import { flowConfig } from '../flow/config';
import { assetUrl } from '../utils/baseUrl';
import './ShortlistPage.css';

type ShortlistCar = {
  id: number;
  title: string;
  variant: string;
  price: string;
  priceRange?: string;
  driveAway: string;
  badge?: 'Electric' | 'Hybrid';
  ancapYear: string;
  ancapStars: number;
  fuelType: string;
  engine: string;
  image: string;
  detailsPath: string;
};

const shortlistedCars: ShortlistCar[] = [
  {
    id: 1,
    title: '2025 BYD Sealion 7 Premium',
    variant: 'Premium',
    price: '$60,210',
    driveAway: 'Estimated VIC drive-away',
    badge: 'Electric',
    ancapYear: '2025',
    ancapStars: 5,
    fuelType: 'Plug-In Electric (567km electric range)',
    engine: '230kW automatic RWD',
    image: assetUrl('/compare-byd-sealion-7.png'),
    detailsPath: `${flowConfig.carDetailsPath}/byd/sealion-7/premium`,
  },
  {
    id: 2,
    title: '2025 Mazda CX-5 Akera',
    variant: 'G35 Akera Petrol Turbo AWD Auto',
    price: '$58,907',
    priceRange: '$40,900 - $66,866',
    driveAway: 'Estimated VIC used car drive-away',
    ancapYear: 'Not tested',
    ancapStars: 0,
    fuelType: 'Petrol',
    engine: '170kW automatic 4X4',
    image: assetUrl('/compare-mazda-cx5.png'),
    detailsPath: `${flowConfig.carDetailsPath}/mazda/cx-5/akera`,
  },
  {
    id: 3,
    title: '2026 Toyota RAV4 Cruiser',
    variant: '2.5 Hybrid AWD Cruiser E-CVT',
    price: '$65,885',
    driveAway: 'Estimated VIC drive-away',
    badge: 'Hybrid',
    ancapYear: 'Not tested',
    ancapStars: 0,
    fuelType: 'Petrol (hybrid electric)',
    engine: '143kW automatic 4X4',
    image: assetUrl('/compare-toyota-rav4.png'),
    detailsPath: `${flowConfig.carDetailsPath}/toyota/rav4/cruiser`,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <span className="shortlist-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, index) => (
        <svg key={index} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M8 1.2l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.47l-3.52 1.85.67-3.92-2.85-2.78 3.94-.57L8 1.2z"
          />
        </svg>
      ))}
    </span>
  );
}

function FuelBadge({ label }: { label: 'Electric' | 'Hybrid' }) {
  const Icon = label === 'Electric' ? ElectricBadge : HybridBadge;

  return (
    <span className="shortlist-card__badge">
      <Icon />
      <span>{label}</span>
    </span>
  );
}

export function ShortlistPage() {
  const navigate = useNavigate();

  return (
    <div className="shortlist-page">
      <nav className="shortlist-page__breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Car match</Link>
        <span aria-hidden="true">/</span>
        <Link to={flowConfig.searchPath}>Search</Link>
        <span aria-hidden="true">/</span>
        <span>Shortlist &amp; compare cars</span>
      </nav>

      <div className="shortlist-page__container">
        <header className="shortlist-page__title">
          <div>
            <h1>Shortlist &amp; compare cars</h1>
            <p>Select up to 3 cars and compare the specs, features, ratings and running costs side-by-side.</p>
          </div>
          <button type="button" className="shortlist-page__share">
            <img src={assetUrl('/shortlist-link-icon.svg')} alt="" />
            Share your unique link
          </button>
        </header>

        <div className="shortlist-page__separator" />

        <section className="shortlist-page__cards" aria-label="Shortlisted cars">
          {shortlistedCars.map((car) => (
            <article key={car.id} className="shortlist-card shortlist-card--selected">
              <label className="shortlist-card__compare">
                <input type="checkbox" defaultChecked />
                <span>Compare car</span>
              </label>

              <div className="shortlist-card__media">
                <div className="shortlist-card__image-wrap">
                  <img src={car.image} alt="" />
                </div>
                <button
                  type="button"
                  className="shortlist-card__remove"
                  aria-label={`Remove ${car.title} from shortlist`}
                >
                  <HeartIcon />
                </button>
                <div className="shortlist-card__tags">
                  {car.badge ? <FuelBadge label={car.badge} /> : <span aria-hidden="true" />}
                </div>
              </div>

              <div className="shortlist-card__body">
                <div className="shortlist-card__details">
                  <h2>{car.title}</h2>
                  <p>{car.variant}</p>
                  <strong>
                    {car.price}
                    <sup>*</sup>
                  </strong>
                  {car.priceRange && <span className="shortlist-card__price-range">{car.priceRange}</span>}
                  <span>{car.driveAway}</span>
                </div>

                <dl className="shortlist-card__specs">
                  <div className="shortlist-card__spec shortlist-card__spec--ancap">
                    <dt>ANCAP rating</dt>
                    <dd>
                      <span>{car.ancapYear}</span>
                      {car.ancapStars > 0 && <StarRating count={car.ancapStars} />}
                    </dd>
                  </div>
                  <div className="shortlist-card__spec">
                    <dt>Type</dt>
                    <dd>{car.fuelType}</dd>
                  </div>
                  <div className="shortlist-card__spec">
                    <dt>Engine</dt>
                    <dd>{car.engine}</dd>
                  </div>
                </dl>

                <Link to={car.detailsPath} className="shortlist-card__view">
                  <Button variant="secondary" fullWidth>
                    Check costs and details
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </section>

        <aside className="shortlist-page__disclaimer">
          The information provided on this car review site is intended for general informational purposes only. While
          we strive to provide accurate and up-to-date information, we make no representations or warranties of any
          kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with
          respect to the site or the information, products, services, or related graphics contained on the site. Any
          reliance you place on such information is therefore strictly at your own risk. In no event will we be liable
          for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss
          or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of
          this website.
        </aside>
      </div>

      <div className="shortlist-tray" aria-label="Compare selected cars">
        <div className="shortlist-tray__cars">
          {shortlistedCars.map((car) => (
            <article key={car.id} className="shortlist-tray__car">
              <img src={car.image} alt="" />
              <div>
                <h2>{car.title}</h2>
                <p>
                  {car.price}
                  <sup>*</sup>
                </p>
              </div>
              <button type="button" aria-label={`Remove ${car.title}`}>
                <CrossIcon />
              </button>
            </article>
          ))}
        </div>
        <div className="shortlist-tray__actions">
          <Button variant="digital-primary" onClick={() => navigate(flowConfig.comparePath)}>
            Compare (3/3)
          </Button>
          <button type="button">Clear all</button>
        </div>
      </div>
    </div>
  );
}
