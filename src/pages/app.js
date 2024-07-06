import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/ui/sidebar";
import { MapIcon, SearchIcon, MenuIcon, MoonIcon, SunIcon, ZapIcon, RefreshCwIcon, HeartIcon, FilterIcon, RouteIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import { useTheme } from 'next-themes';
import { mockAISearch, mockSafetyInfo, mockRestaurants, mockEvents, mockRoutePlanning } from '@/lib/mockApi';
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const AppPage = () => {
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [mapData, setMapData] = useState({ safetyInfo: [], restaurants: [], events: [] });
  const [loading, setLoading] = useState(false);
  const [cyberpunkMode, setCyberpunkMode] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({ safety: true, restaurants: true, events: true });
  const [route, setRoute] = useState(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await mockAISearch(query);
      setSearchResults(results);
      toast({
        title: "Search Results",
        description: `Found ${results.length} results for "${query}"`,
      });
    } catch (error) {
      console.error('Error performing search:', error);
      toast({
        title: "Error",
        description: "Failed to perform search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMapData = useCallback(async () => {
    setLoading(true);
    try {
      const [safetyInfo, restaurants, events] = await Promise.all([
        mockSafetyInfo(),
        mockRestaurants(),
        mockEvents(),
      ]);
      setMapData({ safetyInfo, restaurants, events });
      toast({
        title: "Map Updated",
        description: "Latest data loaded successfully",
      });
    } catch (error) {
      console.error('Error fetching map data:', error);
      toast({
        title: "Error",
        description: "Failed to update map data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMapData();
    // Simulating real-time updates
    const interval = setInterval(fetchMapData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [fetchMapData]);

  // Mock authentication check - replace with actual auth logic later
  useEffect(() => {
    const isAuthenticated = true; // Replace with actual auth check
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  const toggleCyberpunkMode = () => {
    setCyberpunkMode(!cyberpunkMode);
    document.body.classList.toggle('cyberpunk-mode', !cyberpunkMode);
  };

  const handleMarkerClick = (markerData) => {
    setSelectedMarker(markerData);
    setSidebarOpen(true);
  };

  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
    toast({
      title: "Added to Favorites",
      description: `${item.data.name || 'Location'} has been added to your favorites.`,
    });
  };

  const removeFromFavorites = (item) => {
    setFavorites(favorites.filter(fav => fav.data.name !== item.data.name));
    toast({
      title: "Removed from Favorites",
      description: `${item.data.name || 'Location'} has been removed from your favorites.`,
    });
  };

  const handleFilterChange = (filterType) => {
    setFilters(prev => ({ ...prev, [filterType]: !prev[filterType] }));
  };

  const planRoute = async () => {
    if (selectedMarker) {
      setLoading(true);
      try {
        const routeData = await mockRoutePlanning(selectedMarker.data);
        setRoute(routeData);
        toast({
          title: "Route Planned",
          description: "A route has been planned to your selected destination.",
        });
      } catch (error) {
        console.error('Error planning route:', error);
        toast({
          title: "Error",
          description: "Failed to plan route. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className={`flex h-screen overflow-hidden ${cyberpunkMode ? 'cyberpunk-bg' : ''}`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <div className="p-4 space-y-4">
            <h2 className={`text-2xl font-bold mb-4 ${cyberpunkMode ? 'text-neon-green' : ''}`}>Pantheon.so</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="controls">
                <AccordionTrigger>Controls</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <Button onClick={fetchMapData} className={`w-full ${cyberpunkMode ? 'cyberpunk-button' : ''}`} disabled={loading}>
                      <RefreshCwIcon className="mr-2 h-4 w-4" />
                      Refresh Map Data
                    </Button>
                    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`w-full ${cyberpunkMode ? 'cyberpunk-button' : ''}`}>
                      {theme === 'dark' ? <SunIcon className="mr-2 h-4 w-4" /> : <MoonIcon className="mr-2 h-4 w-4" />}
                      Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </Button>
                    <Button onClick={toggleCyberpunkMode} className={`w-full ${cyberpunkMode ? 'cyberpunk-button' : ''}`}>
                      <ZapIcon className="mr-2 h-4 w-4" />
                      Toggle Cyberpunk Mode
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="filters">
                <AccordionTrigger>Filters</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="filter-safety" checked={filters.safety} onCheckedChange={() => handleFilterChange('safety')} />
                      <Label htmlFor="filter-safety" className="ml-2">Safety Info</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="filter-restaurants" checked={filters.restaurants} onCheckedChange={() => handleFilterChange('restaurants')} />
                      <Label htmlFor="filter-restaurants" className="ml-2">Restaurants</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="filter-events" checked={filters.events} onCheckedChange={() => handleFilterChange('events')} />
                      <Label htmlFor="filter-events" className="ml-2">Events</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {selectedMarker && (
              <div className={`mt-4 p-4 rounded-lg ${cyberpunkMode ? 'cyberpunk-card' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${cyberpunkMode ? 'text-neon-pink' : ''}`}>
                  {selectedMarker.data.name || 'Location Details'}
                </h3>
                <p>{selectedMarker.data.description || `Type: ${selectedMarker.type}`}</p>
                {selectedMarker.data.price && <p>Price: {selectedMarker.data.price}</p>}
                {selectedMarker.data.date && <p>Date: {selectedMarker.data.date}</p>}
                {selectedMarker.data.level && <p>Safety Level: {selectedMarker.data.level}</p>}
                <div className="flex space-x-2 mt-2">
                  <Button
                    onClick={() => addToFavorites(selectedMarker)}
                    className={`${cyberpunkMode ? 'cyberpunk-button' : ''}`}
                  >
                    <HeartIcon className="mr-2 h-4 w-4" />
                    Add to Favorites
                  </Button>
                  <Button
                    onClick={planRoute}
                    className={`${cyberpunkMode ? 'cyberpunk-button' : ''}`}
                    disabled={loading}
                  >
                    <RouteIcon className="mr-2 h-4 w-4" />
                    Plan Route
                  </Button>
                </div>
              </div>
            )}
            {route && (
              <div className={`mt-4 p-4 rounded-lg ${cyberpunkMode ? 'cyberpunk-card' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${cyberpunkMode ? 'text-neon-blue' : ''}`}>Planned Route</h3>
                <p>Distance: {route.distance} km</p>
                <p>Estimated Time: {route.time} minutes</p>
                <p>Steps: {route.steps.join(' → ')}</p>
              </div>
            )}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="favorites">
                <AccordionTrigger>Favorites</AccordionTrigger>
                <AccordionContent>
                  {favorites.map((fav, index) => (
                    <div key={index} className={`p-2 rounded mb-2 ${cyberpunkMode ? 'cyberpunk-card' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      <p className="font-semibold">{fav.data.name || 'Favorite Location'}</p>
                      <Button
                        onClick={() => removeFromFavorites(fav)}
                        className={`mt-1 ${cyberpunkMode ? 'cyberpunk-button' : ''}`}
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="search-results">
                <AccordionTrigger>Search Results</AccordionTrigger>
                <AccordionContent>
                  {searchResults.map((result, index) => (
                    <div key={index} className={`p-2 rounded mb-2 ${cyberpunkMode ? 'cyberpunk-card' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      <p className={`font-semibold ${cyberpunkMode ? 'text-neon-blue' : ''}`}>{result.name || 'Info'}</p>
                      <p className="text-sm">{result.description}</p>
                      {result.price && <p className="text-sm">Price: {result.price}</p>}
                      {result.date && <p className="text-sm">Date: {result.date}</p>}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className={`bg-white dark:bg-gray-800 shadow-sm z-10 ${cyberpunkMode ? 'cyberpunk-header' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className={`md:hidden ${cyberpunkMode ? 'cyberpunk-button' : ''}`}
                >
                  <MenuIcon className="h-6 w-6" />
                </Button>
                <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Ask Pantheon about SF..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={`w-full pr-10 ${cyberpunkMode ? 'cyberpunk-input' : ''}`}
                      />
                      <Button
                        type="button"
                        onClick={handleSearch}
                        className={`absolute inset-y-0 right-0 px-3 flex items-center ${cyberpunkMode ? 'cyberpunk-button' : ''}`}
                        disabled={loading}
                      >
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-hidden">
            <Map mapData={mapData} cyberpunkMode={cyberpunkMode} onMarkerClick={handleMarkerClick} filters={filters} route={route} />
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AppPage;