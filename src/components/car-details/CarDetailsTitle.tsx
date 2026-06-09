import { HeartOutlineIcon } from '../Icons';
import './CarDetailsTitle.css';

type CarDetailsTitleProps = {
  title: string;
  variant: string;
};

export function CarDetailsTitle({ title, variant }: CarDetailsTitleProps) {
  return (
    <div className="car-details-title">
      <div className="car-details-title__heading-row">
        <h1 className="car-details-title__h1">{title}</h1>
        <button type="button" className="car-details-title__shortlist">
          <HeartOutlineIcon />
          Add to shortlist
        </button>
      </div>
      <p className="car-details-title__variant">{variant}</p>
    </div>
  );
}
