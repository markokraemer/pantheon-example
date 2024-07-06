import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MapIcon, MenuIcon, XIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <a className="flex items-center space-x-2" href="/">
            <MapIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">pantheon.so</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a className="transition-colors hover:text-primary" href="#features">Features</a>
          <a className="transition-colors hover:text-primary" href="#demo">Demo</a>
          <a className="transition-colors hover:text-primary" href="#cyberpunk">Cyberpunk Mode</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-0 hover:bg-transparent"
          >
            <SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white">Try Pantheon Free</Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a className="transition-colors hover:text-primary" href="#features" onClick={toggleMobileMenu}>Features</a>
            <a className="transition-colors hover:text-primary" href="#demo" onClick={toggleMobileMenu}>Demo</a>
            <a className="transition-colors hover:text-primary" href="#cyberpunk" onClick={toggleMobileMenu}>Cyberpunk Mode</a>
            <Button className="bg-primary hover:bg-primary/90 text-white">Try Pantheon Free</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;