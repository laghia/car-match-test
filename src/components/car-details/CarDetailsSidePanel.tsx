import type { CarDetailsSpec } from '../../data/content';
import { Button } from '../Button';
import './CarDetailsSidePanel.css';

type CarDetailsSidePanelProps = {
  price: string;
  monthlyRepayment: string;
  specs: CarDetailsSpec[];
  ancapYear?: string;
  ancapStars?: number;
};

function StarRating({ count }: { count: number }) {
  return (
    <span className="car-details-side-panel__stars" aria-label={`${count} out of 5 stars`}>
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

export function CarDetailsSidePanel({
  price,
  monthlyRepayment,
  specs,
  ancapYear,
  ancapStars = 5,
}: CarDetailsSidePanelProps) {
  return (
    <aside className="car-details-side-panel">
      <div className="car-details-side-panel__price-section">
        <div className="car-details-side-panel__price-row">
          <div className="car-details-side-panel__price-lockup">
            <p className="car-details-side-panel__price">
              {price}
              <sup>*</sup>
            </p>
            <p className="car-details-side-panel__driveaway">
              Estimated VIC drive-away
              <span className="car-details-side-panel__help" aria-hidden="true">
                ?
              </span>
            </p>
          </div>
          <div className="car-details-side-panel__rating" aria-label="RACV Review">
            <img
              className="car-details-side-panel__rating-logo"
              src="/racv-rating-logo.svg"
              alt=""
              width={37}
              height={20}
            />
            <span className="car-details-side-panel__rating-label">Review</span>
          </div>
        </div>

        <hr className="car-details-side-panel__divider" />

        <div className="car-details-side-panel__finance">
          <p className="car-details-side-panel__monthly">
            {monthlyRepayment}
            <sup>+</sup>
          </p>
          <p className="car-details-side-panel__finance-label">
            Estimated monthly RACV car loan repayment
            <sup>+</sup>
          </p>
          <Button variant="digital-primary" size="small" fullWidth className="car-details-side-panel__cta">
            Get my rate
          </Button>
        </div>
      </div>

      <hr className="car-details-side-panel__divider car-details-side-panel__divider--full" />

      <dl className="car-details-side-panel__specs">
        {specs.map((spec) => (
          <div key={spec.label} className="car-details-side-panel__spec">
            <dt>{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}

        {ancapYear && (
          <div className="car-details-side-panel__spec car-details-side-panel__spec--ancap">
            <dt>
              <span className="car-details-side-panel__ancap">ANCAP</span> rating
            </dt>
            <dd>
              <span>{ancapYear}</span>
              {ancapStars > 0 && <StarRating count={ancapStars} />}
            </dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
