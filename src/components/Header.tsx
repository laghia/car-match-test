import { Link } from 'react-router-dom';
import { SearchIcon } from './Icons';
import './Header.css';

const utilityLinks = [
  'About RACV',
  'Retail stores',
  'Fuel prices',
  'Help & Support',
  'Contact',
];

const navItems = [
  'Insurance',
  'Cars & transport',
  'Home',
  'Travel & experiences',
  'Membership',
  'News & Lifestyle',
];

export function Header() {
  return (
    <header className="header">
      <div className="header__shell">
        <div className="header__container">
          <Link to="/" className="header__logo" aria-label="RACV home">
            <img src="/racv-master-logo.svg" alt="" width="93" height="50" />
          </Link>

          <div className="header__content">
            <nav className="header__utility" aria-label="Utility">
              {utilityLinks.map((item) => (
                <a key={item} href="#">
                  {item}
                </a>
              ))}
            </nav>

            <div className="header__primary-row">
              <nav className="header__nav" aria-label="Main">
                {navItems.map((item) => (
                  <a key={item} href="#">
                    {item}
                  </a>
                ))}
              </nav>

              <div className="header__actions">
                <button type="button" className="header__search-icon" aria-label="Search RACV">
                  <SearchIcon />
                </button>
                <button type="button" className="header__login">
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
