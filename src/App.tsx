import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { SearchPage } from './pages/SearchPage';
import { CarDetailsPage } from './pages/CarDetailsPage';
import { NewScreenPage } from './pages/NewScreenPage';
import { flowConfig } from './flow/config';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path={flowConfig.searchPath} element={<SearchPage />} />
          <Route path={`${flowConfig.searchPath}/:tag`} element={<SearchPage />} />
          <Route
            path={`${flowConfig.carDetailsPath}/:make/:model/:variantSlug`}
            element={<CarDetailsPage />}
          />
          {flowConfig.enableNewScreen && (
            <Route path={flowConfig.newScreenPath} element={<NewScreenPage />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
