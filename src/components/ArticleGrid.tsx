import type { Article } from '../data/content';
import { ChevronRight } from './Icons';
import { Button } from './Button';
import './ArticleGrid.css';

type ArticleGridProps = {
  title: string;
  articles: Article[];
  ctaLabel: string;
};

export function ArticleGrid({ title, articles, ctaLabel }: ArticleGridProps) {
  return (
    <section className="article-grid">
      <div className="container">
        <h2 className="article-grid__title">{title}</h2>
        <ul className="article-grid__list">
          {articles.map((article) => (
            <li key={article.title}>
              <a href="#" className="article-card">
                <div className="article-card__image">
                  <img src={article.image} alt="" loading="lazy" />
                  <span className="article-card__label">{article.label}</span>
                </div>
                <div className="article-card__content">
                  <h4>{article.title}</h4>
                  <p>{article.description}</p>
                  <span className="article-card__link">
                    Find out more
                    <ChevronRight />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="article-grid__cta">
          <Button>{ctaLabel}</Button>
        </div>
      </div>
    </section>
  );
}
