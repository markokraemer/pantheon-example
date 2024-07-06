import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { MapIcon, CompassIcon, StarIcon } from 'lucide-react';

const DemoSection = () => {
  const [demoStarted, setDemoStarted] = useState(false);

  const startDemo = () => {
    setDemoStarted(true);
    // Here you would typically initiate your demo experience
    // For now, we'll just toggle the state
  };

  return (
    <section id="demo" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
        >
          Experience Pantheon.so in Action
        </motion.h2>
        <div className="max-w-3xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 mb-8"
          >
            Take a virtual tour of San Francisco using our AI-powered platform. Discover hidden gems, get real-time safety insights, and experience the city like never before.
          </motion.p>
          {!demoStarted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                onClick={startDemo}
              >
                <MapIcon className="mr-2 h-4 w-4" />
                Start Interactive Demo
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            >
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <CompassIcon className="h-12 w-12 mb-4 text-primary mx-auto" />
                <h3 className="text-xl font-semibold mb-2">AI Navigation</h3>
                <p className="text-gray-600 dark:text-gray-300">Experience our smart routing algorithm in action.</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <StarIcon className="h-12 w-12 mb-4 text-primary mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-300">See how our AI tailors suggestions just for you.</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <MapIcon className="h-12 w-12 mb-4 text-primary mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Real-time Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">Get up-to-date information on local hotspots and events.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;