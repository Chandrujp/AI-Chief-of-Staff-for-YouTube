import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass border-b border-white/5">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-sm" />
        </div>
        <span className="font-bold text-lg tracking-tight hidden sm:inline">AI Chief of Staff</span>
      </Link>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Features
          </Link>
          <Link to="/use-cases" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Use Cases
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Pricing
          </Link>
        </div>
        
        <Link
          to="/app"
          className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:scale-105 transition-all"
        >
          Launch App
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
