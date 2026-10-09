import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw
} from 'lucide-react';

interface HostSelectorQuizProps {
  onSelectProvider: (providerId: string) => void;
}

export const HostSelectorQuiz: React.FC<HostSelectorQuizProps> = ({ onSelectProvider }) => {
  const [appType, setAppType] = useState<string>('static');
  const [prefMethod, setPrefMethod] = useState<string>('git');
  const [budget, setBudget] = useState<string>('free');
  const [traffic, setTraffic] = useState<string>('hobby');

  // Recommendation engine
  const calculateRecommendation = () => {
    if (appType === 'docker' || prefMethod === 'vps' || budget === 'vps') {
      return {
        id: 'docker-vps',
        name: 'Self-Hosted VPS (Docker / Coolify)',
        badge: 'Maximum Sovereignty',
        cost: '$4 - $6 / month',
        why: 'You want full control over your server, background processes, and databases with zero vendor lock-in.',
        highlights: ['100% data ownership', 'Run unlimited apps on 1 server', 'No unexpected bills']
      };
    }

    if (traffic === 'high' || budget === 'free_unlimited') {
      return {
        id: 'cloudflare-pages',
        name: 'Cloudflare Pages',
        badge: 'Best Free Unlimited Bandwidth',
        cost: '100% Free',
        why: 'Cloudflare provides unmetered bandwidth on the free tier with 300+ edge locations worldwide.',
        highlights: ['Unlimited bandwidth', 'Top DDoS protection', 'Instant edge caching']
      };
    }

    if (prefMethod === 'drag') {
      return {
        id: 'netlify',
        name: 'Netlify',
        badge: 'Easiest Drag & Drop',
        cost: '100% Free Tier',
        why: 'Netlify lets you drag and drop your `dist/` folder directly from your computer without touching Git or terminal.',
        highlights: ['Zero terminal required', 'Instant HTTPS URL', '100 GB bandwidth / mo']
      };
    }

    if (appType === 'nextjs') {
      return {
        id: 'vercel',
        name: 'Vercel',
        badge: 'Best for Next.js & React',
        cost: '100% Free Tier',
        why: 'Created by the Next.js team, Vercel provides automatic zero-config deployments, preview branches, and edge rendering.',
        highlights: ['Native Vite & Next.js support', 'Automatic Git CI/CD', 'Global Edge CDN']
      };
    }

    // Default top pick for standard Vite app
    return {
      id: 'vercel',
      name: 'Vercel',
      badge: 'Recommended Overall',
      cost: '100% Free Tier',
      why: 'Zero configuration needed for Vite and React apps. Just connect your GitHub repo and you are live in under 30 seconds.',
      highlights: ['Zero configuration', 'Instant preview URLs', 'Automatic SSL certificate']
    };
  };

  const rec = calculateRecommendation();

  const handleReset = () => {
    setAppType('static');
    setPrefMethod('git');
    setBudget('free');
    setTraffic('hobby');
  };

  return (
    <section id="recommender" className="py-16 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Decision Helper</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Which Hosting Platform is Right for You?
          </h2>
          <p className="text-slate-400 text-sm">
            Answer 4 quick questions below to get an instant tailored hosting and deployment recommendation.
          </p>
        </div>

        {/* Quiz Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Questions Grid */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Question 1: App Type */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                1. What type of web application are you building?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'static', label: 'React / Vite SPA', desc: 'Client-side static HTML/JS' },
                  { id: 'nextjs', label: 'Next.js 15 Fullstack', desc: 'SSR + API route handlers' },
                  { id: 'docker', label: 'Docker Container / DB', desc: 'Custom backend & Postgres' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setAppType(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      appType === opt.id
                        ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/50 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white mb-0.5">{opt.label}</div>
                    <div className="text-[11px] text-slate-400">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Deployment Style */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                2. What is your preferred deployment workflow?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'git', label: 'GitHub Push (CI/CD)', desc: 'Auto-build on every commit' },
                  { id: 'drag', label: 'Drag & Drop Folder', desc: 'No Git or terminal required' },
                  { id: 'vps', label: 'Full VPS Server / SSH', desc: 'Linux CLI & Docker' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setPrefMethod(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      prefMethod === opt.id
                        ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/50 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white mb-0.5">{opt.label}</div>
                    <div className="text-[11px] text-slate-400">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Budget */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                3. What is your budget target?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'free', label: '$0 / Month (Free Tier)', desc: 'Vercel, Netlify, Cloudflare' },
                  { id: 'vps', label: '$4 - $10 / Month', desc: 'Hetzner / DigitalOcean VPS' },
                  { id: 'scale', label: 'Pay as You Scale', desc: 'AWS S3 or Cloud infrastructure' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setBudget(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      budget === opt.id
                        ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/50 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white mb-0.5">{opt.label}</div>
                    <div className="text-[11px] text-slate-400">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Traffic */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                4. Expected traffic &amp; scale?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'hobby', label: 'Hobby / MVP (< 50,000 visits/mo)', desc: 'Standard free tiers are plenty' },
                  { id: 'high', label: 'High Traffic / Viral spikes', desc: 'Need unmetered bandwidth & Edge CDN' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setTraffic(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      traffic === opt.id
                        ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/50 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white mb-0.5">{opt.label}</div>
                    <div className="text-[11px] text-slate-400">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 p-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Answers</span>
              </button>
            </div>

          </div>

          {/* Dynamic Recommendation Card (Right) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl border border-indigo-500/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl pointer-events-none rounded-full" />
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tailored Match</span>
              </div>

              <div className="space-y-1 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-indigo-400 font-bold block">
                  Recommended Choice
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {rec.name}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                    {rec.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {rec.cost}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {rec.why}
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-xs font-semibold text-white uppercase tracking-wider">
                  Why this fits:
                </div>
                {rec.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectProvider(rec.id)}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 text-xs sm:text-sm cursor-pointer"
              >
                <span>View {rec.name} Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
