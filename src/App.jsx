import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Work from './components/Work';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';
import FooterSection from './components/FooterSection';
import WhatsAppButton from './components/WhatsAppButton';
import './index.css';

import Dashboard from './components/Dashboard';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import SEOManager from './components/SEOManager';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const { portfolioData } = usePortfolio();

  return (
    <div className="app">
      {!isDashboard && <Header />}
      <SEOManager />
      <main>
        <Routes>
          <Route path={portfolioData.seo?.pages?.home?.slug || "/"} element={<Home />} />
          <Route path={portfolioData.seo?.pages?.profile?.slug || "/profile"} element={<Profile />} />
          <Route path={portfolioData.seo?.pages?.work?.slug || "/work"} element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path={portfolioData.seo?.pages?.contact?.slug || "/contact"} element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboard && <FooterSection />}
      {!isDashboard && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <AppContent />
      </Router>
    </PortfolioProvider>
  );
}

export default App;
