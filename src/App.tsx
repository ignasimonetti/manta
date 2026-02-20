import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingDock from './components/FloatingDock';
import CustomCursor from './components/CustomCursor';
import SVGFilters from './components/SVGFilters';
import { ProjectProvider } from './context/ProjectContext';
import Home from './pages/Home';
import Lab from './pages/Lab';
import NotFound from './pages/NotFound';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';

function App() {
  const { scrollY } = useScroll();
  const [currentVh, setCurrentVh] = React.useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  React.useEffect(() => {
    const updateVh = () => setCurrentVh(window.innerHeight);
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  // Immersive Mode Reveal Logic (for Navbar and FloatingDock)
  const uiOpacityRaw = useTransform(scrollY, [currentVh * 2.7, currentVh * 2.9], [0, 1]);
  const uiOpacity = useSpring(uiOpacityRaw, { stiffness: 40, damping: 25 });

  return (
    <ProjectProvider>
      <CustomCursor />

      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <motion.div style={{ opacity: uiOpacity }}>
              <FloatingDock />
            </motion.div>
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
