import { useState } from 'react';
import { Button } from './Button';
import { assetUrl } from '../utils/baseUrl';
import {
  grantSiteAccess,
  hasSiteAccess,
  isSiteAccessConfigured,
  verifySitePassword,
} from '../utils/siteAccess';
import './PasswordGate.css';

type PasswordGateProps = {
  children: React.ReactNode;
};

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(hasSiteAccess);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSiteAccessConfigured() || unlocked) {
    return children;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const isValid = await verifySitePassword(password);
    if (isValid) {
      grantSiteAccess();
      setUnlocked(true);
      return;
    }

    setError('Incorrect password. Please try again.');
    setIsSubmitting(false);
  };

  return (
    <div className="password-gate">
      <div className="password-gate__card">
        <img
          className="password-gate__logo"
          src={assetUrl('racv-logo.svg')}
          alt="RACV"
          width={120}
          height={40}
        />
        <h1 className="password-gate__title">RACV Car Match</h1>
        <p className="password-gate__intro">This prototype is password protected.</p>

        <form className="password-gate__form" onSubmit={handleSubmit}>
          <label className="password-gate__label" htmlFor="site-password">
            Password
          </label>
          <input
            id="site-password"
            className="password-gate__input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            autoFocus
            required
          />
          {error && <p className="password-gate__error">{error}</p>}
          <Button type="submit" variant="digital-primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Checking...' : 'Enter'}
          </Button>
        </form>
      </div>
    </div>
  );
}
