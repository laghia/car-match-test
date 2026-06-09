import { Link } from 'react-router-dom';
import type { VehicleResult } from '../../data/content';
import { getVehicleDetailsPath } from '../../data/content';
import { HeartOutlineIcon } from '../Icons';
import { Button } from '../Button';
import './VehicleCard.css';

type VehicleCardProps = {
  vehicle: VehicleResult;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <article className="vehicle-card">
      <div className="vehicle-card__media">
        <div className="vehicle-card__image-wrap">
          <img src={vehicle.image} alt="" loading="lazy" />
        </div>
        {vehicle.badge && (
          <span className="vehicle-card__badge">{vehicle.badge}</span>
        )}
        <button type="button" className="vehicle-card__shortlist" aria-label="Add to shortlist">
          <HeartOutlineIcon />
        </button>
      </div>

      <div className="vehicle-card__body">
        <div className="vehicle-card__summary">
          <h3 className="vehicle-card__title">{vehicle.title}</h3>
          <p className="vehicle-card__variant">{vehicle.variant}</p>
          <div className="vehicle-card__price-row">
            <div className="vehicle-card__price-lockup">
              <p className="vehicle-card__price">
                {vehicle.price}
                <sup>*</sup>
              </p>
              <p className="vehicle-card__driveaway">Estimated VIC drive-away</p>
            </div>
            <div className="vehicle-card__rating" aria-label="RACV Review">
              <img
                className="vehicle-card__rating-logo"
                src="/racv-rating-logo.svg"
                alt=""
                width={37}
                height={20}
              />
              <span className="vehicle-card__rating-label">Review</span>
            </div>
          </div>
        </div>

        <div className="vehicle-card__specs">
          <div className="vehicle-card__spec">
            <span className="vehicle-card__spec-label">Type</span>
            <span className="vehicle-card__spec-value">{vehicle.fuelType}</span>
          </div>
          <div className="vehicle-card__spec">
            <span className="vehicle-card__spec-label">Engine</span>
            <span className="vehicle-card__spec-value">{vehicle.engine}</span>
          </div>
        </div>

        <Link to={getVehicleDetailsPath(vehicle)} className="vehicle-card__cta-link">
          <Button variant="digital-primary" fullWidth>
            View details
          </Button>
        </Link>
      </div>
    </article>
  );
}
