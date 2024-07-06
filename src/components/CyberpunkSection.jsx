import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, ZapIcon, ChipIcon, WifiIcon } from 'lucide-react';
import LazyImage from './LazyImage';

const CyberpunkSection = () => {
  const [cyberpunkMode, setCyberpunkMode] = useState(false);

  const toggleCyberpunkMode = () => {
    setCyberpunkMode(!cyberpunkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('cyberpunk-mode', cyberpunkMode);
    return () => {
      document.body.classList.remove('cyberpunk-mode');
    };
  }, [cyberpunkMode]);

  return (
    <section id="cyberpunk" className={`py-20 transition-all duration-500 ease-in-out ${cyberpunkMode ? 'cyberpunk-bg text-neon-green' : 'bg-gray-100 dark:bg-gray-800'}`}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 ${cyberpunkMode ? 'text-neon-pink' : ''}`}>
            Experience San Francisco in Cyberpunk Mode
          </h2>
          <p className={`max-w-[600px] mx-auto mb-8 ${cyberpunkMode ? 'text-neon-blue' : 'text-gray-500 dark:text-gray-400'}`}>
            Switch to Cyberpunk Mode and see San Francisco transformed into a futuristic metropolis. Discover hidden gems and experience the city like never before.
          </p>
          <Button
            onClick={toggleCyberpunkMode}
            className={`${cyberpunkMode ? 'bg-neon-green text-black' : 'bg-primary text-white'} hover:bg-opacity-90 transition-all duration-300`}
          >
            {cyberpunkMode ? (
              <>
                <EyeOffIcon className="mr-2 h-4 w-4" /> Disable Cyberpunk Mode
              </>
            ) : (
              <>
                <EyeIcon className="mr-2 h-4 w-4" /> Enable Cyberpunk Mode
              </>
            )}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <LazyImage
              src={cyberpunkMode ? "/api/placeholder/1600/900" : "/api/placeholder/1600/900"}
              alt={cyberpunkMode ? "San Francisco in Cyberpunk Mode" : "San Francisco Normal View"}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${
              cyberpunkMode ? 'from-neon-pink/50 to-neon-blue/50' : 'from-transparent to-transparent'
            } transition-opacity duration-500`}></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className={`text-xl font-bold mb-2 ${cyberpunkMode ? 'text-neon-green' : ''}`}>
                {cyberpunkMode ? "Neo San Francisco, 2077" : "San Francisco, Present Day"}
              </h3>
              <p className={`text-sm ${cyberpunkMode ? 'text-neon-blue' : ''}`}>
                {cyberpunkMode
                  ? "Explore the neon-lit streets and discover hidden cyberpunk wonders."
                  : "Experience the vibrant culture and iconic landmarks of the Bay Area."}
              </p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {cyberpunkMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="bg-black/50 p-4 rounded-lg border border-neon-green">
                <ZapIcon className="h-8 w-8 mb-2 text-neon-green" />
                <h4 className="text-lg font-semibold mb-2 text-neon-pink">AI-Enhanced Navigation</h4>
                <p className="text-sm text-neon-blue">Navigate through augmented reality pathways optimized for your preferences.</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-neon-pink">
                <ChipIcon className="h-8 w-8 mb-2 text-neon-pink" />
                <h4 className="text-lg font-semibold mb-2 text-neon-green">Holographic Menus</h4>
                <p className="text-sm text-neon-blue">Experience restaurant menus in stunning 3D holographic displays.</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-neon-blue">
                <WifiIcon className="h-8 w-8 mb-2 text-neon-blue" />
                <h4 className="text-lg font-semibold mb-2 text-neon-pink">Neural Network Insights</h4>
                <p className="text-sm text-neon-green">Get real-time crowd-sourced data and AI predictions about your surroundings.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CyberpunkSection;