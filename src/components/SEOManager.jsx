import { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const updateMetaTag = (name, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const updateCanonicalTag = (url) => {
  if (!url) return;
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
};

const SEOManager = () => {
  const location = useLocation();
  const { portfolioData } = usePortfolio();

  useEffect(() => {
    if (!portfolioData || !portfolioData.seo) return;

    let seoData = null;

    const projectMatch = matchPath({ path: '/work/:slug' }, location.pathname);
    
    if (projectMatch) {
      const { slug } = projectMatch.params;
      const project = portfolioData.projects.find(p => 
        String(p.slug) === String(slug) || String(p.id) === String(slug)
      );
      if (project && project.seo) {
        seoData = project.seo;
      }
    } 
    else {
      const pageKey = Object.keys(portfolioData.seo.pages).find(key => 
        portfolioData.seo.pages[key].slug === location.pathname
      ) || 'home';
      
      seoData = portfolioData.seo.pages[pageKey];
    }

    if (seoData) {
      if (seoData.title) document.title = seoData.title;
      updateMetaTag('description', seoData.description);
      updateMetaTag('keywords', seoData.keywords);
      updateCanonicalTag(seoData.canonical);
    }
  }, [location.pathname, portfolioData]);

  return null;
};

export default SEOManager;
