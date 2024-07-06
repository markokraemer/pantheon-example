import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen"
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </motion.div>
  );
};

export default Layout;