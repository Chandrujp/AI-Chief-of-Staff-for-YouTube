import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const UseCasesPage: React.FC = () => {
  const useCases = [
    {
      icon: '🎮',
      title: 'Gaming Creators',
      challenge: 'Pressure to stream daily while maintaining production quality',
      solution: 'Identify which game content drives sustainable growth. Cut low-ROI streams, invest in high-return content.',
      impact: 'Reduce weekly hours by 30% while growing channel 2x faster'
    },
    {
      icon: '📚',
      title: 'Educational Content Creators',
      challenge: 'Balancing comprehensive tutorials with content frequency',
      solution: 'Analyze which video length/format converts best. Optimize content depth vs. publishing cadence.',
      impact: 'Publish smarter, not harder. Same audience growth, 25% less production time'
    },
    {
      icon: '🌿',
      title: 'Lifestyle & Wellness Creators',
      challenge: '12-month burnout cycles from constant daily vlogging',
      solution: 'Detect burnout patterns before they happen. Get sustainable weekly schedules that maintain momentum.',
      impact: 'Create indefinitely. Prevent the dreaded "channel hiatus"'
    },
    {
      icon: '🚀',
      title: 'Growth Hackers',
      challenge: 'Scaling production without losing profitability',
      solution: 'Find the optimal content formula that scales. Know exactly where to invest for maximum ROI.',
      impact: '10x growth without 10x effort. Automate what matters.'
    },
    {
      icon: '⏰',
      title: 'Part-Time Creators',
      challenge: 'Maximizing limited time without sacrificing growth',
      solution: 'Prioritize high-impact content. Eliminate time-wasters. Strategic release schedule.',
      impact: '5 hours/week strategy beats 40 hours/week guessing'
    },
    {
      icon: '💰',
      title: 'Monetized Creators',
      challenge: 'Balancing ad revenue with viewer retention',
      solution: 'Analyze CPM vs. engagement vs. effort. Optimize for revenue per hour, not just views.',
      impact: 'Increase earnings 3-5x while reducing production time'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      <Navigation />
      
      <section className="relative pt-40 pb-24 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/10 blur-[140px] rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold">Built for every creator type</h1>
          <p className="text-lg text-white/50">Whether you're scaling or surviving, we have a use case for you.</p>
        </div>
      </section>
      
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="text-6xl mb-6">{useCase.icon}</div>
                  <h3 className="text-4xl font-bold mb-4">{useCase.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-2">Challenge</p>
                      <p className="text-white/70 text-lg">{useCase.challenge}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-2">Solution</p>
                      <p className="text-white/70 text-lg">{useCase.solution}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-green-400 text-lg font-bold">↳ {useCase.impact}</p>
                    </div>
                  </div>
                </div>
                <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="glass-card p-12 rounded-3xl border-white/10 h-[300px] flex items-center justify-center">
                    <p className="text-white/20 text-center">Channel analytics visualization</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Is your story here?</h2>
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

export default UseCasesPage;
