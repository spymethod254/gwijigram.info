import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  Terminal, 
  Globe, 
  Server, 
  Sparkles, 
  ArrowRight,
  FolderTree,
  Unlock,
  PackageCheck
} from 'lucide-react';

interface HeroBannerProps {
  onNavigate: (sectionId: string) => void;
  onDownloadStarter: () => void;
  isDownloading: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onNavigate,
  onDownloadStarter,
  isDownloading
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Core Direct Answer Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold shadow-inner shadow-emerald-500/20 animate-pulse-glow">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>YES! 100% Code Ownership & Complete Self-Hosting Freedom</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Download, Run Locally &amp; <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Host Anywhere on Your Own
            </span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every web application built here is standard, pure open-source code (React 19, TypeScript, Vite, Tailwind CSS). There are <strong className="text-white">no proprietary lock-ins, no licensing fees, and no restrictions</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onDownloadStarter}
            disabled={isDownloading}
            className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-xl shadow-indigo-600/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 text-sm sm:text-base cursor-pointer"
          >
            <Download className={`w-5 h-5 ${isDownloading ? 'animate-bounce' : ''}`} />
            <span>{isDownloading ? 'Packaging Files...' : 'Download Complete Starter .ZIP'}</span>
          </button>

          <button
            onClick={() => onNavigate('simulator')}
            className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold rounded-xl transition-all flex items-center gap-2.5 text-sm sm:text-base hover:border-indigo-500/50 cursor-pointer"
          >
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>Interactive Run Simulator</span>
          </button>

          <button
            onClick={() => onNavigate('deployment')}
            className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold rounded-xl transition-all flex items-center gap-2.5 text-sm sm:text-base hover:border-cyan-500/50 cursor-pointer"
          >
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>Hosting Playbook</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* 4 Feature Key Highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-indigo-500/40 transition-all hover:bg-slate-900/60 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Unlock className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-heading font-bold text-white text-base mb-1">Zero Vendor Lock-In</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard file hierarchy. No proprietary cloud wrappers, no hidden analytics, no forced subscriptions.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all hover:bg-slate-900/60 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-heading font-bold text-white text-base mb-1">3 Commands to Run</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unzip, run <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">npm install</code>, then <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">npm run dev</code>. Open in your browser in under 15 seconds.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-emerald-500/40 transition-all hover:bg-slate-900/60 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-heading font-bold text-white text-base mb-1">Free 1-Click Hosting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Host 100% free with custom domain &amp; SSL on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-purple-500/40 transition-all hover:bg-slate-900/60 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Server className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-heading font-bold text-white text-base mb-1">Self-Host Anywhere</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploy with Docker, Nginx, Coolify, AWS S3, or your own $4/mo Linux VPS server with total sovereignty.
            </p>
          </div>

        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="mt-12 glass-panel-glow p-6 sm:p-8 rounded-2xl border border-indigo-500/30">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-heading font-bold text-lg text-white">How Your Code Travels: From AI to Your Own Server</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing the standard open lifecycle of this React + Vite + Tailwind application
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg">
              Output: Pure Static HTML5 / JS / CSS
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative group hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                  01
                </span>
                <FolderTree className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Source Code Files</h4>
              <p className="text-xs text-slate-400">
                Created with React 19, TypeScript, Vite &amp; Tailwind CSS inside clean project structure.
              </p>
              <div className="mt-3 text-[11px] font-mono text-indigo-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                src/App.tsx, vite.config.ts
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative group hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center border border-cyan-500/30">
                  02
                </span>
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Run on Your Computer</h4>
              <p className="text-xs text-slate-400">
                Run locally with instant Hot Module Reloading in VS Code or any text editor.
              </p>
              <div className="mt-3 text-[11px] font-mono text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                npm run dev → :5173
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center border border-emerald-500/30">
                  03
                </span>
                <PackageCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Production Build</h4>
              <p className="text-xs text-slate-400">
                Compiles into lightweight, minified static files ready for any web server.
              </p>
              <div className="mt-3 text-[11px] font-mono text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                npm run build → dist/
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative group hover:border-purple-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 font-mono text-xs font-bold flex items-center justify-center border border-purple-500/30">
                  04
                </span>
                <Globe className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Deploy to Any Host</h4>
              <p className="text-xs text-slate-400">
                Serve on Vercel, Netlify, Cloudflare, GitHub Pages, Docker, or Linux VPS.
              </p>
              <div className="mt-3 text-[11px] font-mono text-purple-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                Free HTTPS + Custom Domain
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
