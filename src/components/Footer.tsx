import React from 'react';
import { 
  Code2, 
  Download, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onDownloadStarter: () => void;
  isDownloading: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onDownloadStarter,
  isDownloading
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Block */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/40 border border-indigo-500/20 rounded-3xl p-8 sm:p-12 mb-16 text-center space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Build &amp; Own Your Web Apps?</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Your Code. Your Infrastructure. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Zero Platform Lock-In.
            </span>
          </h3>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Download your starter project ZIP, launch on your local computer in seconds, or deploy to Vercel, Netlify, Cloudflare, or your own VPS server for free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onDownloadStarter}
              disabled={isDownloading}
              className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-xl shadow-indigo-600/30 flex items-center gap-2 text-sm transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Packaging Files...' : 'Download React 19 Starter .ZIP'}</span>
            </button>

            <button
              onClick={() => onNavigate('simulator')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Try Local Simulator</span>
            </button>
          </div>
        </div>

        {/* Links & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-sm text-white">Code Sovereignty Hub</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Standard modern web development tooling with full source ownership and open deployment portability.
            </p>
          </div>

          {/* Quick Jump */}
          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Guides &amp; Tools</h5>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('exporter')} className="hover:text-indigo-400 transition-colors">Code Exporter &amp; ZIP</button></li>
              <li><button onClick={() => onNavigate('simulator')} className="hover:text-indigo-400 transition-colors">Local Run Simulator</button></li>
              <li><button onClick={() => onNavigate('deployment')} className="hover:text-indigo-400 transition-colors">Hosting Playbook</button></li>
              <li><button onClick={() => onNavigate('config-gen')} className="hover:text-indigo-400 transition-colors">Config Generator</button></li>
            </ul>
          </div>

          {/* Deployment Targets */}
          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Supported Hosts</h5>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('deployment')} className="hover:text-indigo-400 transition-colors">Vercel &amp; Netlify</button></li>
              <li><button onClick={() => onNavigate('deployment')} className="hover:text-indigo-400 transition-colors">Cloudflare Pages (Unlimited)</button></li>
              <li><button onClick={() => onNavigate('deployment')} className="hover:text-indigo-400 transition-colors">GitHub Pages (100% Free)</button></li>
              <li><button onClick={() => onNavigate('deployment')} className="hover:text-indigo-400 transition-colors">Docker &amp; Linux VPS / Coolify</button></li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Freedom &amp; License</h5>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Open &amp; Portable</span>
              </div>
              <p className="text-[11px]">All generated code is yours under permissive MIT / Unlicense terms with zero royalties.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>Built with React 19, Vite &amp; Tailwind CSS</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
