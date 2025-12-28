import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        '1 analysis per month',
        'Basic burnout assessment',
        'ROI overview',
        'No login required',
        'Community support'
      ],
      cta: 'Start Free',
      ctaLink: '/app',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '9',
      period: 'per month',
      description: 'For serious creators',
      features: [
        'Unlimited analyses',
        'Advanced burnout detection',
        'Detailed ROI reports',
        'Export analytics to PDF',
        'Historical trend analysis',
        'Priority email support',
        'Monthly insights digest'
      ],
      cta: 'Start Free Trial',
      ctaLink: '/app',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams & networks',
      features: [
        'Everything in Pro',
        'Analyze unlimited channels',
        'Team management',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'White-label option'
      ],
      cta: 'Contact Sales',
      ctaLink: '#',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      <Navigation />
      
      <section className="relative pt-40 pb-24 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/10 blur-[140px] rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold">Simple, transparent pricing</h1>
          <p className="text-lg text-white/50">Choose the plan that fits your growth.</p>
        </div>
      </section>
      
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative rounded-3xl p-10 transition-all ${
              plan.highlighted 
                ? 'glass-card border-white/30 bg-gradient-to-b from-white/10 to-transparent scale-105' 
                : 'glass-card border-white/10'
            }`}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <span className="text-xs font-bold uppercase tracking-widest">Most Popular</span>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/50 text-sm">{plan.description}</p>
                </div>
                
                <div className="py-8 border-y border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    {plan.period && <span className="text-white/50">/{plan.period}</span>}
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 items-start">
                      <span className="text-green-400 font-bold text-xl mt-0">✓</span>
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={plan.ctaLink}
                  className={`block w-full py-4 text-center font-bold rounded-full transition-all text-sm ${
                    plan.highlighted
                      ? 'bg-white text-black hover:scale-105'
                      : 'border border-white/20 text-white hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          
          <div className="text-left space-y-6">
            {[
              ['Can I cancel anytime?', 'Yes, cancel your subscription anytime with no questions asked.'],
              ['Do you offer discounts?', 'Annual plans get 20% off. Contact us for bulk licensing.'],
              ['What if I need more?', 'Enterprise plans are fully customizable. Talk to our team.'],
              ['Is there a free trial?', 'Absolutely. Try Pro free for 14 days, no credit card required.']
            ].map((qa, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border-white/10">
                <h3 className="font-bold text-lg mb-2">{qa[0]}</h3>
                <p className="text-white/60">{qa[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
