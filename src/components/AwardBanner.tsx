import { awards } from '../data/content';
import { ChevronRight } from './Icons';
import './AwardBanner.css';

export function AwardBanner() {
  return (
    <section className="award-banner">
      <div className="container award-banner__inner">
        <div className="award-banner__content">
          <h2>Award-winning finance</h2>
          <p>
            Help make your dreams happen sooner with RACV Finance, including our WeMoney
            award-winning electric car loans.
          </p>
          <a href="#" className="award-banner__link">
            See all our awards
            <ChevronRight />
          </a>
        </div>
        <div className="award-banner__images">
          {awards.map((src, i) => (
            <img key={src} src={src} alt={`WeMoney award ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
