
import React, { useState, useEffect, useRef } from 'react';
import { analyzeYouTubeChannel, chatWithChiefOfStaff } from './services/geminiService';
import { MOCK_VIDEOS } from './constants';
import { VideoData, AnalysisResult, BurnoutLevel, ChatMessage } from './types';
import BurnoutMeter from './components/BurnoutMeter';
import ROICard from './components/ROICard';
import VideoChart from './components/VideoChart';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<(AnalysisResult & { channelName?: string }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [channelInput, setChannelInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSyncChannel = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const idToSync = channelInput.trim() || "@MrBeast"; // Default for demo if empty
    
    setLoading(true);
    setSyncStatus('Connecting to YouTube Data API...');
    
    try {
      setTimeout(() => setSyncStatus('Syncing historical retention data...'), 2000);
      setTimeout(() => setSyncStatus('Analyzing content ROI & effort metrics...'), 4500);
      
      const result = await analyzeYouTubeChannel(idToSync);
      setAnalysis(result);
      setChatHistory([{
        role: 'assistant',
        content: `Analysis for ${result.channelName} is complete. I've synthesized your recent performance data. Your current energy savings potential is ${result.energySaved}. How would you like to proceed with your 30-day sustainable plan?`,
        timestamp: Date.now(),
        analysis: result
      }]);
    } catch (error) {
      console.error("Analysis failed", error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: "I encountered an error connecting to the channel data. Please ensure the handle is correct and public.",
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
      setSyncStatus('');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: userInput,
      timestamp: Date.now()
    };
    setChatHistory(prev => [...prev, userMsg]);
    setUserInput('');
    setLoading(true);

    try {
      const responseText = await chatWithChiefOfStaff(chatHistory, userInput, analysis);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error("Chat failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      {/* Syncing Overlay */}
      {loading && syncStatus && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500">
          <div className="relative w-24 h-24 mb-12">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-black rounded-sm animate-pulse" />
            </div>
          </div>
          <h2 className="text-xl font-light tracking-widest text-white/90 animate-pulse">{syncStatus}</h2>
          <p className="mt-4 text-[10px] text-white/30 uppercase tracking-[0.4em]">Executive AI is processing</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm" />
          </div>
          <span className="font-bold text-lg tracking-tight">AI Chief of Staff</span>
        </div>
        <div className="flex items-center gap-8">
          {analysis && (
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 glass-card rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">{analysis.channelName}</span>
            </div>
          )}
          <button 
            onClick={() => setAnalysis(null)}
            className="text-xs font-medium text-white/60 hover:text-white transition-colors"
          >
            Switch Channel
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {!analysis && !loading && (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full" />
          </div>
          
          <div className="relative z-10 max-w-4xl space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-white/40 mb-4 block animate-float">
              The Creator Longevity Engine
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1]">
              Analyze any channel <br />
              <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic">prevent burnout.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
              Connect your YouTube handle to identify high-effort diminishing returns and reclaim 20+ hours every month.
            </p>
            
            <form onSubmit={handleSyncChannel} className="pt-8 flex flex-col items-center gap-6 w-full max-w-md mx-auto">
              <div className="relative w-full group">
                <input 
                  type="text"
                  placeholder="@handle or Channel ID"
                  value={channelInput}
                  onChange={(e) => setChannelInput(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/20 text-center font-light"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
              </div>
              <button 
                type="submit"
                className="group relative px-12 py-5 bg-white text-black text-sm font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
              >
                Sync Executive Data
              </button>
              <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">No login required • Public Data Sync</span>
            </form>
          </div>
        </section>
      )}

      {/* Main Analysis View */}
      {analysis && (
        <main className="max-w-[1400px] mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Dashboard Left Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Status & Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-8 rounded-3xl col-span-1 md:col-span-2 flex flex-col justify-between min-h-[160px]">
                <BurnoutMeter level={analysis.burnoutRisk as BurnoutLevel || BurnoutLevel.LOW} />
                <p className="mt-4 text-sm text-white/50 leading-relaxed italic">
                  "Sustainability is your competitive advantage. Your current trajectory for <strong>{analysis.channelName}</strong> suggests a {analysis.burnoutRisk === BurnoutLevel.HIGH ? 'critical need for a recovery window' : 'stable path for strategic expansion'}."
                </p>
              </div>
              <div className="glass-card p-8 rounded-3xl flex flex-col justify-center items-center gap-2 border-white/20">
                <span className="text-xs uppercase tracking-widest text-white/40">Potential Time Saved</span>
                <span className="text-5xl font-bold tracking-tighter text-white">{analysis.energySaved}</span>
                <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">per month</span>
              </div>
            </div>

            {/* ROI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {analysis.roiFindings.map((finding, idx) => (
                <ROICard key={idx} {...finding} />
              ))}
            </div>

            {/* Data Visualization */}
            <div className="glass-card p-10 rounded-[2.5rem]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Performance Landscape</h3>
                  <p className="text-sm text-white/40 font-medium tracking-tight">Real-time mapping of ${analysis.channelName}'s recent output (Watch Time vs Production Effort)</p>
                </div>
              </div>
              <VideoChart data={MOCK_VIDEOS} />
              <div className="mt-6 flex gap-6 overflow-x-auto pb-2 no-scrollbar">
                {['Cinematic', 'Deep Dive', 'Shorts', 'Talking Head'].map(f => (
                  <div key={f} className="flex items-center gap-2 whitespace-nowrap">
                    <div className={`w-2 h-2 rounded-full ${f === 'Cinematic' ? 'bg-[#f43f5e]' : f === 'Deep Dive' ? 'bg-[#a78bfa]' : f === 'Shorts' ? 'bg-[#38bdf8]' : 'bg-[#fbbf24]'}`} />
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights & Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-10 rounded-[2rem] space-y-6">
                <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-white/30">Data-Backed Insights</h4>
                <ul className="space-y-4">
                  {analysis.keyInsights.map((insight, idx) => (
                    <li key={idx} className="flex gap-4 items-start group">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 transition-all group-hover:bg-white group-hover:scale-125" />
                      <span className="text-sm text-white/70 leading-relaxed font-light">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-10 rounded-[2rem] space-y-6 bg-gradient-to-br from-white/[0.04] to-transparent border-white/10">
                <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-white/30">Actionable Adjustments</h4>
                <div className="space-y-4">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-4 items-center glass-card p-3 rounded-xl border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-white/90 font-medium leading-tight">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat / Sidebar Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-8 h-fit lg:sticky lg:top-32">
            <div className="glass rounded-[2rem] flex flex-col h-[600px] shadow-2xl overflow-hidden border-white/10">
              <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Executive Advisory</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-white text-black font-semibold shadow-xl' 
                        : 'glass border-white/10 text-white/80'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && !syncStatus && (
                  <div className="flex justify-start">
                    <div className="glass p-4 rounded-2xl flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-6 bg-white/[0.02] border-t border-white/5">
                <div className="relative group">
                  <input 
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Consult your Chief of Staff..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/20"
                  />
                  <button 
                    type="submit"
                    disabled={loading || !userInput.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <div className="glass-card p-8 rounded-3xl border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all" />
              <h5 className="text-xs uppercase tracking-[0.2em] font-bold text-blue-400 mb-3 flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-400 rounded-full" />
                Executive Roadmap
              </h5>
              <p className="text-sm text-white/70 leading-relaxed font-light italic">
                {analysis.sustainablePlan}
              </p>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 px-6 opacity-40 hover:opacity-100 transition-opacity">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-sm" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">AI Chief of Staff</span>
          </div>
          <div className="flex gap-12">
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Rest is Leverage</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Data-Driven Strategy</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Sustainable Growth</span>
          </div>
          <p className="text-[10px] text-white font-medium uppercase tracking-widest opacity-50">© 2025 AI CHIEF OF STAFF FOR YOUTUBE ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
