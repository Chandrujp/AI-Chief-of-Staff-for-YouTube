import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Enter Your Handle',
      description: 'Type your YouTube channel handle or ID. That\'s it—no login, no API keys, no friction.',
      icon: '1️⃣'
    },
    {
      number: '02',
      title: 'AI Synthesizes Data',
      description: 'Gemini 3 Pro analyzes your recent videos using Google Search grounding. In seconds, not hours.',
      icon: '2️⃣'
    },
    {
      number: '03',
      title: 'Get Your Analysis',
      description: 'Burnout risk level, ROI optimization insights, and a 30-day sustainable growth plan.',
      icon: '3️⃣'
    },
    {
      number: '04',
      title: 'Chat with Your Chief',
      description: 'Ask follow-up questions. Get specific recommendations. Have a real conversation with AI.',
      icon: '4️⃣'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      <Navigation />
      
      <section className="relative pt-40 pb-24 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-green-600/10 blur-[140px] rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold">How it works</h1>
          <p className="text-lg text-white/50">From channel handle to actionable insights in <strong>under 10 seconds</strong>.</p>
        </div>
      </section>
      
      {/* Steps */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-24">
            {steps.map((step, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl font-bold text-white/20">{step.number}</div>
                    <h3 className="text-4xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-xl text-white/60 leading-relaxed">{step.description}</p>
                </div>
                
                <div className={`glass-card p-16 rounded-3xl border-white/10 h-[300px] flex items-center justify-center text-6xl ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  {step.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Built with best-in-class AI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'Gemini 3 Pro',
                description: 'State-of-the-art multimodal AI for reasoning and analysis'
              },
              {
                icon: '🔍',
                title: 'Google Search Grounding',
                description: 'Real-time web search integration for current channel data'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Sub-10 second analysis powered by edge computing'
              }
            ].map((feature, idx) => (
              <div key={idx} className="glass-card p-10 rounded-3xl border-white/10 text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Data Transparency */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Privacy & Transparency</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              ['No Login Required', 'Analyze any public YouTube channel. Privacy respecting from day one.'],
              ['Public Data Only', 'We only analyze publicly available video metadata from YouTube.'],
              ['No Storage', 'Your data is processed in real-time and never stored on our servers.'],
              ['Open APIs', 'All data comes from official YouTube and Google APIs.']
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-lg font-bold">✓ {item[0]}</p>
                <p className="text-white/60">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to see it in action?</h2>
          <Link
            to="/app"
            className="inline-block px-12 py-5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-all"
          >
            Try Free Now
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
