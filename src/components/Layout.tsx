import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { documentElement } = document;
    const previousBehavior = documentElement.style.scrollBehavior;
    documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    documentElement.style.scrollBehavior = previousBehavior;
  }, [pathname]);

  return null;
}

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
