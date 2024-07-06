import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrainCogIcon, TrendingUpIcon, MapIcon } from 'lucide-react';

const AIInsightsSection = () => {
  const [query, setQuery] = useState('');
  const [insights, setInsights] = useState(null);

  const generateInsights = () => {
    // Mock AI-generated insights
    setInsights({
      trend: "Rising popularity of fusion cuisine in the Mission District",
      prediction: "20% increase in foot traffic expected in Union Square next month",
      recommendation: "Explore the emerging art scene in Dogpatch for unique experiences"
    });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          AI-Powered San Francisco Insights
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="flex space-x-2 mb-8">
            <Input
              type="text"
              placeholder="Ask about SF trends, predictions, or recommendations"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={generateInsights} className="bg-primary hover:bg-primary/90 text-white">
              <BrainCogIcon className="mr-2 h-4 w-4" /> Generate Insights
            </Button>
          </div>
          
          {insights && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <TrendingUpIcon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">{insights.trend}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <BrainCogIcon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">AI Prediction</h3>
                <p className="text-gray-600 dark:text-gray-300">{insights.prediction}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <MapIcon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Smart Recommendation</h3>
                <p className="text-gray-600 dark:text-gray-300">{insights.recommendation}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIInsightsSection;