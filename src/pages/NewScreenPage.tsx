import { useSearchParams, useNavigate } from 'react-router-dom';
import { flowConfig } from '../flow/config';
import { Button } from '../components/Button';
import './NewScreenPage.css';

/**
 * INSERT YOUR NEW SCREEN HERE
 *
 * This page is a placeholder slot in the Car Match flow.
 * Enable it by setting `enableNewScreen: true` in src/flow/config.ts
 *
 * Default flow: Landing → [This screen] → Search Results
 */
export function NewScreenPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const continueToSearch = () => {
    const query = searchParams.toString();
    navigate(`${flowConfig.searchPath}${query ? `?${query}` : ''}`);
  };

  return (
    <div className="new-screen">
      <div className="container new-screen__inner">
        <span className="new-screen__badge">Prototype screen</span>
        <h1>Your new screen goes here</h1>
        <p>
          This is a placeholder in the Car Match user-testing flow. Replace this page with
          your new screen design — for example, an onboarding step, preference quiz, or
          comparison wizard.
        </p>

        <div className="new-screen__placeholder">
          <p>Build your prototype content in:</p>
          <code>src/pages/NewScreenPage.tsx</code>
        </div>

        <div className="new-screen__actions">
          <Button onClick={continueToSearch}>Continue to search results</Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back to Car Match
          </Button>
        </div>
      </div>
    </div>
  );
}
