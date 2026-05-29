import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SVGFilters from './components/SVGFilters';
import { ProjectProvider } from './context/ProjectContext';
import Home from './pages/Home';

// Lazy load pages
const Lab = lazy(() => import('./pages/Lab'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ProjectProvider>
      <ScrollToTop />
      <CustomCursor />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/lab" element={<Lab />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <SVGFilters />
    </ProjectProvider>
  );
}

export default App;
