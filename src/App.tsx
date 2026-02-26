import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SVGFilters from './components/SVGFilters';
import { ProjectProvider } from './context/ProjectContext';
import Home from './pages/Home';
import Lab from './pages/Lab';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ProjectProvider>
      <CustomCursor />

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

      <SVGFilters />
    </ProjectProvider>
  );
}

export default App;
