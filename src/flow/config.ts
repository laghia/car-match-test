/**
 * Flow configuration for user testing.
 *
 * Toggle `enableNewScreen` to insert your prototype screen between
 * the landing page search action and the search results page.
 *
 * Flow when enabled:  Landing → New Screen → Search Results
 * Flow when disabled: Landing → Search Results
 */
export const flowConfig = {
  enableNewScreen: false,
  newScreenPath: '/new-screen',
  searchPath: '/car-match/search',
  carDetailsPath: '/car-match/car-details',
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function buildCarDetailsUrl(make: string, model: string, variantSlug: string): string {
  return `${flowConfig.carDetailsPath}/${slugify(make)}/${slugify(model)}/${variantSlug}`;
}

export function getSearchDestination(): string {
  return flowConfig.enableNewScreen
    ? flowConfig.newScreenPath
    : flowConfig.searchPath;
}

/** Maps hero fuel-type selections to RACV search path segments. */
const fuelTypeTags: Record<string, string> = {
  Electric: 'electric-tag',
  Hybrid: 'hybrid-and-plugin-tag',
  'Plug-in Hybrid': 'hybrid-and-plugin-tag',
};

export type HeroSearchFilters = {
  make?: string;
  model?: string;
  fuel?: string;
};

/**
 * Builds the search results URL from hero banner filter values.
 * Primary prototype flow: Landing → Search (hero) → Search results.
 */
export function buildSearchUrl(filters: HeroSearchFilters): string {
  const params = new URLSearchParams();
  if (filters.make) params.set('make', filters.make);
  if (filters.model) params.set('model', filters.model);
  if (filters.fuel) params.set('fuel', filters.fuel);

  const tag = filters.fuel ? fuelTypeTags[filters.fuel] : undefined;
  const base = getSearchDestination();
  const path = tag ? `${base}/${tag}` : base;
  const query = params.toString();

  return query ? `${path}?${query}` : path;
}
