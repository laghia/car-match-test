import { HeroBanner } from '../components/HeroBanner';
import { FilterSearch } from '../components/FilterSearch';
import { CategoryTiles } from '../components/CategoryTiles';
import { FeatureSection } from '../components/FeatureSection';
import { ArticleGrid } from '../components/ArticleGrid';
import { AwardBanner } from '../components/AwardBanner';
import { FinanceTiles } from '../components/FinanceTiles';
import {
  adviceArticles,
  evArticles,
  reviewArticles,
} from '../data/content';

export function LandingPage() {
  return (
    <>
      <section className="hero-cm">
        <HeroBanner />
        <FilterSearch />
      </section>
      <CategoryTiles />
      <FeatureSection />
      <ArticleGrid
        title="Read the latest on electric vehicles"
        articles={evArticles}
        ctaLabel="Read the latest"
      />
      <ArticleGrid
        title="Discover car reviews from RACV's team of experts"
        articles={reviewArticles}
        ctaLabel="Read reviews"
      />
      <ArticleGrid
        title="Read the latest car news and advice"
        articles={adviceArticles}
        ctaLabel="Read advice"
      />
      <AwardBanner />
      <FinanceTiles />
    </>
  );
}
