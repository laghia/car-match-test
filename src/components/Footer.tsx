import './Footer.css';

const footerColumns = [
  {
    title: 'Insurance',
    links: [
      'Car insurance',
      'Home insurance',
      'Travel insurance',
      'Business insurance',
      'Motorcycle insurance',
      'Caravan insurance',
      'Boat insurance',
      'Make or track a claim',
    ],
  },
  {
    title: 'Cars & transport',
    links: [
      'Roadside assistance',
      'Car and vehicle loans',
      'Drive School',
      'Vehicle maintenance',
      'Electric vehicles',
      'Bikes and other transport',
      'Road safety and rules',
    ],
  },
  {
    title: 'Home',
    links: [
      'Emergency trades',
      'Home repairs and maintenance',
      'Buying and selling a house',
      'Home security',
      'Home insurance',
      'Solar',
    ],
  },
  {
    title: 'Travel & experiences',
    links: [
      'RACV Resorts',
      'Travel insurance',
      'Holidays',
      'Offers and deals',
      'Things to do',
      'Holiday planning',
      'Getting around',
      'Event planning',
    ],
  },
  {
    title: 'Membership',
    links: [
      'Manage your account',
      'Member benefits and deals',
      'About membership',
      'RACV Club',
      'Help and support',
    ],
  },
  {
    title: 'About us',
    links: [
      'Corporate Governance',
      'Our leadership',
      'Newsroom',
      'Careers',
      'Job list',
      'Graduate program',
    ],
  },
];

const secondaryLinks = [
  'RACV Club',
  'RACV Resorts',
  'Retail Stores',
  'Careers',
  'About RACV',
  'Privacy Charter',
  'Legal',
  'Sitemap',
];

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a href="#" className="footer__social-link" aria-label={label}>
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__inner">
          <div className="footer__logo">
            <img src="/racv-footer-logo.svg" alt="RACV" width="133" height="72" />
          </div>

          <div className="footer__columns">
            {footerColumns.map((column) => (
              <div key={column.title} className="footer__column">
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__secondary">
        <div className="footer__inner footer__secondary-inner">
          <nav className="footer__tertiary" aria-label="Footer">
            {secondaryLinks.map((link) => (
              <a key={link} href="#">
                {link}
              </a>
            ))}
          </nav>

          <div className="footer__social" aria-label="Social media">
            <SocialIcon label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M14 8.5V7.2c0-.7.5-1.2 1.2-1.2H17V3h-2.2C12.7 3 11 4.7 11 7v1.5H9v2.8h2V21h3v-9.7h2.5l.4-2.8H14z"
                />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5zM17.8 6.7a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
                />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6 9h3v12H6V9zm1.5-4.5A1.8 1.8 0 1 1 6 6.3a1.8 1.8 0 0 1 1.5-1.8zM11 9h2.9v1.6h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v6.1H17v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H11V9z"
                />
              </svg>
            </SocialIcon>
            <SocialIcon label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.5V8.5l5.5 3.5L10 15.5z"
                />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__inner footer__bottom-inner">
          <p className="footer__copyright">
            © 2026 Royal Automobile Club of Victoria (RACV) All rights reserved.
          </p>

          <div className="footer__badges">
            <p className="footer__badges-label">Download the RACV App</p>
            <div className="footer__badges-row">
              <a href="#" aria-label="Download on the App Store">
                <img src="/app-store-badge.svg" alt="" width="144" height="48" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img src="/google-play-badge.svg" alt="" width="162" height="48" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
