import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Real-Time YouTube Analysis',
      description: 'Access official YouTube metrics instantly. No delays, no estimates—pure data from the source.'
    },
    {
      icon: '🔥',
      title: 'Burnout Risk Detection',
      description: 'AI identifies unsustainable patterns in your content strategy. Know your breaking point before it happens.'
    },
    {
      icon: '📊',
      title: 'ROI Optimization Insights',
      description: 'See which videos return the most value for effort invested. Make smarter content decisions.'
    },
    {
      icon: '🗺️',
      title: 'Performance Landscape Mapping',
      description: 'Visualize watch time vs. production effort across all your videos in one dashboard.'
    },
    {
      icon: '🛠️',
      title: 'Sustainable Planning Framework',
      description: 'Get a 30-day roadmap tailored to your channel. Balance growth with wellbeing.'
    },
    {
      icon: '⚡',
      title: 'Executive Summary Generation',
      description: 'Key insights + recommendations delivered in plain language. No data science degree required.'
    },
    {
      icon: '🔓',
      title: 'Zero Authentication Required',
      description: 'Analyze any public YouTube channel instantly. No login, no API keys, no friction.'
    },
    {
      icon: '⏱️',
      title: 'Instant Analysis (<10 seconds)',
      description: 'From channel handle to insights in seconds. AI Chief of Staff works at creator speed.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold">Powerful features for sustainable growth</h1>
          <p className="text-lg text-white/50">Everything you need to analyze your channel, prevent burnout, and grow smart.</p>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="group glass-card p-10 rounded-3xl border-white/10 hover:border-white/30 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Comparison Table */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">How we compare</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 font-bold">Feature</th>
                  <th className="text-center py-4 px-6 font-bold">AI Chief of Staff</th>
                  <th className="text-center py-4 px-6 font-bold">YouTube Analytics</th>
                  <th className="text-center py-4 px-6 font-bold">Generic Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AI-Powered Insights', true, false, false],
                  ['Burnout Risk Detection', true, false, false],
                  ['No Login Required', true, false, false],
                  ['ROI Optimization', true, false, false],
                  ['30-Day Sustainability Plan', true, false, false],
                  ['Real-Time Data', true, true, false],
                  ['Historical Analytics', false, true, false],
                  ['Audience Demographics', false, true, false]
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-6 text-white">{row[0]}</td>
                    <td className="text-center py-4 px-6">{row[1] ? '✓' : '—'}</td>
                    <td className="text-center py-4 px-6">{row[2] ? '✓' : '—'}</td>
                    <td className="text-center py-4 px-6">{row[3] ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to prevent burnout?</h2>
          <Link
            to="/app"
            className="inline-block px-12 py-5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-all"
          >
            Start Free Analysis
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;
