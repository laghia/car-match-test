import { useNavigate } from 'react-router-dom';
import { categories } from '../data/content';
import { getSearchDestination } from '../flow/config';
import { ElectricBadge } from './Icons';
import './CategoryTiles.css';

export function CategoryTiles() {
  const navigate = useNavigate();

  const handleCategoryClick = (tag: string) => {
    navigate(`${getSearchDestination()}?category=${tag}`);
  };

  return (
    <section className="category-tiles">
      <div className="container">
        <h4 className="category-tiles__heading">What are you looking for in a car?</h4>
        <div className="category-tiles__grid">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="category-tiles__tile"
              onClick={() => handleCategoryClick(category.tag)}
            >
              <div className="category-tiles__image-wrap">
                {category.badge && (
                  <span className="category-tiles__badge">
                    <ElectricBadge />
                  </span>
                )}
                <img src={category.image} alt="" aria-hidden="true" loading="lazy" />
              </div>
              <h4>{category.label}</h4>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
