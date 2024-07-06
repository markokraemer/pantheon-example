import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, MapPinIcon, Loader2, CoffeeIcon, UtensilsIcon, DollarSignIcon, ZapIcon } from 'lucide-react';

const mockAPI = {
  search: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (Math.random() < 0.1) throw new Error("Search failed. Please try again.");
    
    return {
      location: 'Neo Mission District, San Francisco',
      description: 'Affordable and trendy restaurants with cyberpunk vibes',
      recommendations: [
        { name: "Neon Taqueria", type: "Mexican Fusion", price: "$", rating: 4.5 },
        { name: "Cyber Bakery", type: "Augmented Pastries", price: "$$", rating: 4.8 },
        { name: "Holo Delfina", type: "Italian AI", price: "$$$", rating: 4.7 }
      ]
    };
  }
};

const DemoSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mockAPI.search(searchQuery);
      setSearchResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 bg-gray-50 dark:bg-gray-900 cyberpunk-bg">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-neon-pink">
          Experience AI-Powered Map Search
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-black/50 rounded-lg shadow-lg p-6 border border-neon-blue">
            <div className="flex space-x-2 mb-4">
              <Input 
                type="text" 
                placeholder="Try 'Cheapest cyberpunk restaurants in Mission District'" 
                className="flex-grow bg-gray-800 text-neon-green border-neon-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search query input"
              />
              <Button 
                type="submit" 
                onClick={handleSearch}
                disabled={isLoading}
                aria-label="Perform search"
                className="bg-neon-green hover:bg-neon-green/90 text-black"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <SearchIcon className="mr-2 h-4 w-4" />}
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-neon-blue" />
                    <p className="text-neon-green">Searching with AI...</p>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-neon-pink"
                  >
                    <p>{error}</p>
                  </motion.div>
                )}
                {searchResult && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center p-4">
                      <MapPinIcon className="h-16 w-16 text-neon-pink mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-neon-green">{searchResult.location}</h3>
                      <p className="text-sm text-neon-blue mb-4">{searchResult.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {searchResult.recommendations.map((rec, index) => (
                          <div key={index} className="bg-black/50 p-3 rounded-lg border border-neon-green">
                            <UtensilsIcon className="h-6 w-6 text-neon-pink mx-auto mb-2" />
                            <p className="font-semibold text-neon-green">{rec.name}</p>
                            <p className="text-sm text-neon-blue">{rec.type}</p>
                            <p className="text-neon-pink">{rec.price} | ⭐ {rec.rating}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                {!isLoading && !error && !searchResult && (
                  <motion.p
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neon-blue"
                  >
                    Enter a location to see AI-powered results
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-4 text-sm text-neon-green">
              Our AI understands natural language queries. Try asking for specific cuisines, price ranges, or even cyberpunk ambiance!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;