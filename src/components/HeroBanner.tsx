import { assets } from '../data/content';
import './HeroBanner.css';

export function HeroBanner() {
  return (
    <div className="hero-cm__banner">
      <div className="hero-cm__content">
        <div className="hero-cm__text">
          <h1>Research and compare cars</h1>
          <p>
            Looking for your next car? Find estimated running costs, compare features and specs,
            and view loan options with RACV Car Match.
          </p>
        </div>
      </div>

      <div className="hero-cm__image-wrap">
        <picture>
          <source media="(max-width: 767px)" srcSet={assets.heroMobile} />
          <img src={assets.hero} alt="Green MG electric vehicle" className="hero-cm__image" />
        </picture>
        <div className="hero-cm__journey" aria-hidden="true">
          <img src="/journey-device-solid.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
