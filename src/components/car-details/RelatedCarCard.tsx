import { Link } from 'react-router-dom';
import type { RelatedCar } from '../../data/content';
import { getVehicleDetailsPath } from '../../data/content';
import { ChevronRight, ElectricBadge, HeartOutlineIcon, HybridBadge } from '../Icons';
import './RelatedCarCard.css';

type RelatedCarCardProps = {
  car: RelatedCar;
};

function FuelBadge({ label }: { label: string }) {
  const normalized = label.toLowerCase();
  const Icon = normalized.includes('electric') && !normalized.includes('hybrid')
    ? ElectricBadge
    : HybridBadge;

  return (
    <span className="related-car-card__fuel-badge">
      <Icon />
      <span>{label}</span>
    </span>
  );
}

function YearTag({ tag }: { tag: NonNullable<RelatedCar['yearTag']> }) {
  const label = tag === 'current-model' ? 'Current model' : 'Coming soon';
  return (
    <span className={`related-car-card__year-tag related-car-card__year-tag--${tag}`}>
      {label}
    </span>
  );
}

export function RelatedCarCard({ car }: RelatedCarCardProps) {
  const variantLabel = `${car.variantCount} variant${car.variantCount === 1 ? '' : 's'} available`;

  return (
    <article className="related-car-card">
      <div className="related-car-card__media">
        <div className="related-car-card__image-wrap">
          <img src={car.image} alt="" loading="lazy" />
        </div>

        <div className="related-car-card__tags">
          {car.yearTag ? <YearTag tag={car.yearTag} /> : <span aria-hidden="true" />}
          <FuelBadge label={car.badge ?? car.fuelType} />
        </div>

        <button type="button" className="related-car-card__shortlist" aria-label="Add to shortlist">
          <HeartOutlineIcon />
        </button>
      </div>

      <div className="related-car-card__content">
        <div className="related-car-card__summary">
          <h3 className="related-car-card__title">{car.title}</h3>
          <p className="related-car-card__variant">{car.variant}</p>
          <div className="related-car-card__price-row">
            <p className="related-car-card__price">
              {car.price}
              <sup>*</sup>
            </p>
            <p className="related-car-card__driveaway">Estimated VIC drive-away</p>
          </div>
          <p className="related-car-card__variants">{variantLabel}</p>
        </div>

        {car.showReview !== false && (
          <div className="related-car-card__rating" aria-label="RACV Review">
            <img
              className="related-car-card__rating-logo"
              src="/racv-rating-logo.svg"
              alt=""
              width={37}
              height={20}
            />
            <span className="related-car-card__rating-label">Review</span>
          </div>
        )}
      </div>

      <div className="related-car-card__footer">
        <Link to={getVehicleDetailsPath(car)} className="related-car-card__link">
          View details
          <ChevronRight />
        </Link>
      </div>
    </article>
  );
}
