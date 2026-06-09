import { financeTiles } from '../data/content';
import { CarLoanIcon } from './Icons';
import { Button } from './Button';
import './FinanceTiles.css';

export function FinanceTiles() {
  return (
    <section className="finance-tiles">
      <div className="container">
        <div className="finance-tiles__grid">
          {financeTiles.map((tile) => (
            <div key={tile.title} className="finance-tiles__card">
              <div className="finance-tiles__icon">
                <CarLoanIcon />
              </div>
              <h3>{tile.title}</h3>
              <p>{tile.description}</p>
              <div className="finance-tiles__actions">
                <Button variant="secondary">{tile.cta}</Button>
                <Button>{tile.secondaryCta}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
