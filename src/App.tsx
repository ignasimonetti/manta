import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SVGFilters from './components/SVGFilters';
import { ProjectProvider } from './context/ProjectContext';
import Home from './pages/Home';

// Lazy load heavy pages
const Lab = lazy(() => import('./pages/Lab'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ProjectProvider>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <SVGFilters />
    </ProjectProvider>
  );
}

export default App;
