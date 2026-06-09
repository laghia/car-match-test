import { Link } from 'react-router-dom';
import { flowConfig } from '../../flow/config';
import { HeartOutlineIcon } from '../Icons';
import './CarDetailsSubNav.css';

type CarDetailsSubNavProps = {
  make: string;
  model: string;
  shortlistCount?: number;
};

export function CarDetailsSubNav({
  make,
  model,
  shortlistCount = 0,
}: CarDetailsSubNavProps) {
  return (
    <div className="car-details-subnav">
      <div className="car-details-subnav__inner">
        <nav className="car-details-subnav__breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="car-details-subnav__link">
            Car Match
          </Link>
          <span className="car-details-subnav__divider" aria-hidden="true">
            /
          </span>
          <Link to={flowConfig.searchPath} className="car-details-subnav__link">
            {make}
          </Link>
          <span className="car-details-subnav__divider" aria-hidden="true">
            /
          </span>
          <Link to={flowConfig.searchPath} className="car-details-subnav__link">
            {model}
          </Link>
          <span className="car-details-subnav__divider" aria-hidden="true">
            /
          </span>
          <span className="car-details-subnav__current">Price &amp; Specs</span>
        </nav>

        <button type="button" className="car-details-subnav__shortlist">
          Compare shortlist ({shortlistCount})
          <HeartOutlineIcon />
        </button>
      </div>
    </div>
  );
}
