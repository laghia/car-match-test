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
  searchPath: '/search',
};

export function getSearchDestination(): string {
  return flowConfig.enableNewScreen
    ? flowConfig.newScreenPath
    : flowConfig.searchPath;
}
