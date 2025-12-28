import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-5xl space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-white/40 mb-4 block animate-float">
            The Creator Longevity Engine
          </span>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1]">
            Analyze any channel,<br />
            <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic">prevent burnout.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Connect your YouTube handle to identify high-effort diminishing returns and reclaim 20+ hours every month through data-driven insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              to="/app"
              className="group relative px-12 py-5 bg-white text-black text-sm font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
            >
              Start Free Analysis
            </Link>
            <Link
              to="/features"
              className="px-12 py-5 border border-white/20 text-white text-sm font-bold rounded-full hover:bg-white/5 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trust Badges */}
      <section className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-white">10K+</p>
            <p className="text-white/50 text-sm">Creators Analyzed</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-white">200K+</p>
            <p className="text-white/50 text-sm">Hours Reclaimed</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-white">98%</p>
            <p className="text-white/50 text-sm">Accuracy Rate</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">Ready to prevent burnout?</h2>
          <p className="text-lg text-white/50">Get personalized insights for your channel in seconds. No login required.</p>
          <Link
            to="/app"
            className="inline-block px-12 py-5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-all"
          >
            Analyze Your Channel
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
