import React from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { Testimonial } from './components/Testimonial';
import { Roles } from './components/Roles';
import { UpcomingEvents } from './components/UpcomingEvents';
import { Features } from './components/Features';

export const LandingPage: React.FC = () => {
 

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0c10] text-gray-900 dark:text-gray-100 font-sans selection:bg-purple-500/30 transition-colors duration-300">
      <Navbar  />

      <main>
        <Hero />

        <Stats />

        <Features />

        <UpcomingEvents />

        <Roles />

        <Testimonial />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;