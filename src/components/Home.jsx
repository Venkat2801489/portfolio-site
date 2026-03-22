import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Feed from './Feed';
import Facts from './Facts';
import Focus from './Focus';
import Tools from './Tools';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

const Home = () => {
  return (
      <div className="home-page">
        <Hero />
        <Feed />
        <Facts />
        <Focus />
        <Tools />
        <Testimonials />
        <FAQ />
      </div>
  );
};

export default Home;
