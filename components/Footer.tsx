import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 border-t border-white/5 px-6 opacity-40 hover:opacity-100 transition-opacity">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-sm" />
              </div>
              <span className="font-bold text-sm tracking-tight text-white">AI Chief of Staff</span>
            </div>
            <p className="text-xs text-white/50">Rest is leverage. Sustainability is growth.</p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-white/50">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-white/50">
              <li><Link to="/use-cases" className="hover:text-white transition-colors">Use Cases</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-white font-medium uppercase tracking-widest opacity-50">
            © 2025 AI CHIEF OF STAFF FOR YOUTUBE ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/50 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-xs text-white/50 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-xs text-white/50 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
