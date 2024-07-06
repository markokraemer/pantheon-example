import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import DemoSection from '@/components/DemoSection';
import CyberpunkSection from '@/components/CyberpunkSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapIcon, SearchIcon, ShieldCheckIcon, CalendarIcon, DollarSignIcon, ChevronUpIcon } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
  >
    <Icon className="h-12 w-12 mb-4 text-primary" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400">{description}</p>
  </motion.div>
);

const SafetyLevelSection = () => (
  <section className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
        Know Your Neighborhood
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Low', 'Medium', 'High'].map((level) => (
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <ShieldCheckIcon className={`h-12 w-12 mb-4 ${
              level === 'Low' ? 'text-green-500' :
              level === 'Medium' ? 'text-yellow-500' : 'text-red-500'
            }`} />
            <h3 className="text-xl font-bold mb-2">{level} Safety Level</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {level === 'Low' ? 'Areas with excellent safety records and low crime rates.' :
               level === 'Medium' ? 'Moderate safety with some precautions advised.' :
               'Exercise caution and stay alert in these areas.'}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section className="py-20 bg-white dark:bg-gray-800">
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
        Why Choose Pantheon?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Traditional Map Services</h3>
          <ul className="space-y-2">
            <li>✓ Basic navigation</li>
            <li>✓ Point of interest search</li>
            <li>✗ AI-powered recommendations</li>
            <li>✗ Natural language queries</li>
            <li>✗ Real-time safety insights</li>
            <li>✗ Cyberpunk mode</li>
          </ul>
        </div>
        <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Pantheon.so</h3>
          <ul className="space-y-2">
            <li>✓ Advanced AI-powered navigation</li>
            <li>✓ Personalized point of interest search</li>
            <li>✓ Intelligent recommendations</li>
            <li>✓ Natural language understanding</li>
            <li>✓ Real-time safety insights</li>
            <li>✓ Immersive cyberpunk mode</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Pantheon's AI-powered search work?",
      answer: "Pantheon uses advanced natural language processing to understand your queries and provide personalized recommendations based on your preferences, location, and real-time data about San Francisco."
    },
    {
      question: "Is the safety information reliable?",
      answer: "Yes, our safety insights are based on real-time data from multiple sources, including official crime statistics, user reports, and AI analysis of current events and social media trends."
    },
    {
      question: "What makes Cyberpunk Mode unique?",
      answer: "Cyberpunk Mode offers an immersive, futuristic visualization of San Francisco, highlighting tech hubs, AI-powered locations, and giving you a glimpse into the city's potential future."
    },
    {
      question: "How often is the information updated?",
      answer: "Pantheon's data is updated in real-time, ensuring you always have the most current information about restaurants, events, and safety in San Francisco."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FloatingCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
    className="fixed bottom-4 right-4 z-50"
  >
    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full shadow-lg">
      Get Started
    </Button>
  </motion.div>
);

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                  Discover San Francisco Like Never Before
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                  Pantheon.so uses cutting-edge AI to help you find the best spots in SF, from the cheapest eats to the safest neighborhoods.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-sm space-y-2"
              >
                <div className="flex space-x-2">
                  <Input type="text" placeholder="Where in SF do you want to explore?" className="flex-grow" />
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                    <SearchIcon className="mr-2 h-4 w-4" /> Explore
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Explore San Francisco with AI-Powered Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={DollarSignIcon}
                title="Budget-Friendly Dining"
                description="Find the cheapest restaurants that suit your taste and budget in any SF neighborhood."
              />
              <FeatureCard
                icon={CalendarIcon}
                title="Local Events"
                description="Discover exciting events happening around you, from street fairs to underground concerts."
              />
              <FeatureCard
                icon={ShieldCheckIcon}
                title="Neighborhood Safety"
                description="Get real-time safety information for different areas to explore SF with confidence."
              />
            </div>
          </div>
        </section>

        <DemoSection />

        <SafetyLevelSection />

        <CyberpunkSection />

        <ComparisonSection />

        <FAQSection />

        <TestimonialsSection />

        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Explore San Francisco?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                  Join Pantheon.so today and unlock the full potential of AI-powered city exploration. Your next SF adventure awaits!
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  Get Started for Free
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <NewsletterSignup />

        <FloatingCTA />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-4 left-4 bg-primary hover:bg-primary/90 text-white p-2 rounded-full shadow-lg z-50"
            >
              <ChevronUpIcon className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
}