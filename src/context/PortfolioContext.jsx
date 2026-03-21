import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const PortfolioContext = createContext();

// Increment this whenever initialData schema changes, to bust stale localStorage
const DATA_VERSION = '3';

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const storedVersion = localStorage.getItem('portfolio_data_version');
      const saved = localStorage.getItem('portfolio_data');
      // If version mismatch or no saved data, use fresh initialData
      if (!saved || storedVersion !== DATA_VERSION) {
        localStorage.removeItem('portfolio_data');
        localStorage.setItem('portfolio_data_version', DATA_VERSION);
        return initialData;
      }
      return JSON.parse(saved);
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
