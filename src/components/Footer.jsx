import React from 'react';
import { MapIcon, GithubIcon, TwitterIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <MapIcon className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">pantheon.so</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Discover San Francisco like never before with AI-powered insights.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Features</a></li>
              <li><a href="#demo" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Demo</a></li>
              <li><a href="#cyberpunk" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Cyberpunk Mode</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <GithubIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <TwitterIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2023 pantheon.so. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;