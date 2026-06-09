import { Link } from 'react-router-dom';
import type { RelatedCar } from '../../data/content';
import { flowConfig } from '../../flow/config';
import { Button } from '../Button';
import { RelatedCarCard } from './RelatedCarCard';
import './CarDetailsRelatedCars.css';

type CarDetailsRelatedCarsProps = {
  cars: RelatedCar[];
};

export function CarDetailsRelatedCars({ cars }: CarDetailsRelatedCarsProps) {
  if (cars.length === 0) {
    return null;
  }

  return (
    <section className="related-cars" aria-labelledby="related-cars-heading">
      <div className="related-cars__inner">
        <div className="related-cars__header">
          <h2 id="related-cars-heading" className="related-cars__heading">
            Similar top-selling new cars
          </h2>
        </div>

        <div className="related-cars__grid">
          {cars.map((car) => (
            <RelatedCarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="related-cars__cta">
          <Link to={flowConfig.searchPath} className="related-cars__cta-link">
            <Button variant="digital-primary">Search and compare vehicles</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
