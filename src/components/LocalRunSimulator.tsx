import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Globe, 
  Sparkles, 
  Zap, 
  Copy, 
  Check
} from 'lucide-react';

interface TerminalLog {
  id: string;
  type: 'cmd' | 'info' | 'success' | 'warn' | 'dim';
  text: string;
}

export const LocalRunSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: '1', type: 'info', text: 'Terminal ready. Click any step below to simulate local execution.' },
    { id: '2', type: 'dim', text: 'Working directory: ~/my-awesome-app' }
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [localServerRunning, setLocalServerRunning] = useState<boolean>(false);
  const [pkgManager, setPkgManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Mini app preview state
  const [previewCounter, setPreviewCounter] = useState<number>(0);

  const getCmd = (action: 'install' | 'dev' | 'build' | 'preview') => {
    switch (pkgManager) {
      case 'pnpm':
        return action === 'install' ? 'pnpm install' : `pnpm run ${action}`;
      case 'yarn':
        return action === 'install' ? 'yarn install' : `yarn ${action}`;
      case 'bun':
        return action === 'install' ? 'bun install' : `bun run ${action}`;
      default:
        return action === 'install' ? 'npm install' : `npm run ${action}`;
    }
  };

  const handleRunStep = (stepNumber: number) => {
    setIsSimulating(true);
    setActiveStep(stepNumber);

    if (stepNumber === 1) {
      // Step 1: Install
      setLocalServerRunning(false);
      setLogs(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'cmd', text: `$ ${getCmd('install')}` },
        { id: (Date.now() + 1).toString(), type: 'info', text: 'Resolving dependencies from package.json...' },
        { id: (Date.now() + 2).toString(), type: 'info', text: 'Fetched: react@19, react-dom@19, vite@7, tailwindcss@4, lucide-react' },
        { id: (Date.now() + 3).toString(), type: 'success', text: `added 112 packages in 2.14s. 0 vulnerabilities found.` }
      ]);
    } else if (stepNumber === 2) {
      // Step 2: Dev
      setLogs(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'cmd', text: `$ ${getCmd('dev')}` },
        { id: (Date.now() + 1).toString(), type: 'info', text: '  VITE v7.3.2  ready in 184 ms' },
        { id: (Date.now() + 2).toString(), type: 'success', text: '  ➜  Local:   http://localhost:5173/' },
        { id: (Date.now() + 3).toString(), type: 'dim', text: '  ➜  Network: use --host to expose' },
        { id: (Date.now() + 4).toString(), type: 'info', text: '  ➜  press h + enter to show help' }
      ]);
      setLocalServerRunning(true);
    } else if (stepNumber === 3) {
      // Step 3: Build
      setLogs(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'cmd', text: `$ ${getCmd('build')}` },
        { id: (Date.now() + 1).toString(), type: 'info', text: 'vite v7.3.2 building for production...' },
        { id: (Date.now() + 2).toString(), type: 'info', text: '✓ 42 modules transformed.' },
        { id: (Date.now() + 3).toString(), type: 'dim', text: 'dist/index.html                   0.48 kB │ gzip:  0.31 kB' },
        { id: (Date.now() + 4).toString(), type: 'dim', text: 'dist/assets/index-Bf_8k1.css      4.12 kB │ gzip:  1.32 kB' },
        { id: (Date.now() + 5).toString(), type: 'dim', text: 'dist/assets/index-Cv91la.js     142.18 kB │ gzip: 44.82 kB' },
        { id: (Date.now() + 6).toString(), type: 'success', text: '✓ built in 420ms -> Output directory: dist/' }
      ]);
    } else if (stepNumber === 4) {
      // Step 4: Preview
      setLogs(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'cmd', text: `$ ${getCmd('preview')}` },
        { id: (Date.now() + 1).toString(), type: 'info', text: 'Serving production build from ./dist:' },
        { id: (Date.now() + 2).toString(), type: 'success', text: '  ➜  Local:   http://localhost:4173/' }
      ]);
    }

    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const handleClearLogs = () => {
    setLogs([
      { id: Date.now().toString(), type: 'info', text: 'Terminal reset. Click a command step to run.' }
    ]);
    setLocalServerRunning(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="simulator" className="py-16 border-b border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Terminal Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How to Run on Your Own Computer in 3 Steps
          </h2>
          <p className="text-slate-400 text-sm">
            Once you download the files, here is exactly what running it looks like. Click the interactive step buttons below to test the local terminal lifecycle.
          </p>
        </div>

        {/* Package Manager Selector */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-xs text-slate-400 font-medium">Choose Package Manager:</span>
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {(['npm', 'pnpm', 'yarn', 'bun'] as const).map(pm => (
              <button
                key={pm}
                onClick={() => setPkgManager(pm)}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all ${
                  pkgManager === pm 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Step-by-Step Command Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          
          {/* Step 1 */}
          <div 
            onClick={() => handleRunStep(1)}
            className={`p-4 rounded-xl border transition-all cursor-pointer group ${
              activeStep === 1 
                ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/40' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-400">STEP 1</span>
              <Play className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-125 transition-transform" />
            </div>
            <h4 className="font-semibold text-white text-sm mb-1">Install Packages</h4>
            <div className="font-mono text-xs text-indigo-300 bg-slate-950 p-1.5 rounded border border-slate-800 flex items-center justify-between">
              <span>{getCmd('install')}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); handleCopy(getCmd('install')); }} 
                className="text-slate-500 hover:text-slate-300"
              >
                {copiedCmd === getCmd('install') ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Downloads dependencies into local node_modules.</p>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => handleRunStep(2)}
            className={`p-4 rounded-xl border transition-all cursor-pointer group ${
              activeStep === 2 
                ? 'bg-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500/40' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400">STEP 2</span>
              <Play className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-125 transition-transform" />
            </div>
            <h4 className="font-semibold text-white text-sm mb-1">Start Local Server</h4>
            <div className="font-mono text-xs text-cyan-300 bg-slate-950 p-1.5 rounded border border-slate-800 flex items-center justify-between">
              <span>{getCmd('dev')}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); handleCopy(getCmd('dev')); }} 
                className="text-slate-500 hover:text-slate-300"
              >
                {copiedCmd === getCmd('dev') ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Launches Vite on http://localhost:5173 with instant HMR.</p>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => handleRunStep(3)}
            className={`p-4 rounded-xl border transition-all cursor-pointer group ${
              activeStep === 3 
                ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/40' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400">STEP 3</span>
              <Play className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-125 transition-transform" />
            </div>
            <h4 className="font-semibold text-white text-sm mb-1">Production Build</h4>
            <div className="font-mono text-xs text-emerald-300 bg-slate-950 p-1.5 rounded border border-slate-800 flex items-center justify-between">
              <span>{getCmd('build')}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); handleCopy(getCmd('build')); }} 
                className="text-slate-500 hover:text-slate-300"
              >
                {copiedCmd === getCmd('build') ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Generates optimized static bundle in dist/ for hosting.</p>
          </div>

          {/* Step 4 */}
          <div 
            onClick={() => handleRunStep(4)}
            className={`p-4 rounded-xl border transition-all cursor-pointer group ${
              activeStep === 4 
                ? 'bg-purple-950/40 border-purple-500 ring-1 ring-purple-500/40' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-400">STEP 4 (OPTIONAL)</span>
              <Play className="w-3.5 h-3.5 text-purple-400 group-hover:scale-125 transition-transform" />
            </div>
            <h4 className="font-semibold text-white text-sm mb-1">Preview Build</h4>
            <div className="font-mono text-xs text-purple-300 bg-slate-950 p-1.5 rounded border border-slate-800 flex items-center justify-between">
              <span>{getCmd('preview')}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); handleCopy(getCmd('preview')); }} 
                className="text-slate-500 hover:text-slate-300"
              >
                {copiedCmd === getCmd('preview') ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Locally tests the exact compiled production bundle.</p>
          </div>

        </div>

        {/* Live Simulator View: Terminal (Left) & Simulated Localhost Window (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Simulated Terminal Window */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[400px]">
            {/* Terminal Window Header */}
            <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2">bash ~/my-awesome-app</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearLogs}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1"
                  title="Clear Terminal Output"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="text-[11px]">Clear</span>
                </button>
              </div>
            </div>

            {/* Terminal Log Stream */}
            <div className="p-4 font-mono text-xs flex-1 overflow-y-auto space-y-1.5 scrollbar-thin">
              {logs.map((log) => {
                if (log.type === 'cmd') {
                  return (
                    <div key={log.id} className="text-white font-bold flex items-center gap-2 mt-2">
                      <span className="text-indigo-400">user@laptop:~/app$</span>
                      <span>{log.text.replace('$ ', '')}</span>
                    </div>
                  );
                }
                if (log.type === 'success') {
                  return <div key={log.id} className="text-emerald-400">{log.text}</div>;
                }
                if (log.type === 'warn') {
                  return <div key={log.id} className="text-amber-400">{log.text}</div>;
                }
                if (log.type === 'dim') {
                  return <div key={log.id} className="text-slate-500">{log.text}</div>;
                }
                return <div key={log.id} className="text-slate-300">{log.text}</div>;
              })}

              {isSimulating && (
                <div className="text-indigo-400 animate-pulse flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                  <span>Processing command...</span>
                </div>
              )}
            </div>

            {/* Terminal Quick Hint Bar */}
            <div className="px-4 py-2 bg-slate-900/40 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Status: <strong className={localServerRunning ? 'text-emerald-400 font-mono' : 'text-slate-400 font-mono'}>{localServerRunning ? '● Live Server Active (:5173)' : '○ Standby'}</strong></span>
              <span>Hot Module Replacement (HMR): <strong className="text-indigo-300 font-mono">Ready</strong></span>
            </div>
          </div>

          {/* Simulated Localhost Browser Preview */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[400px]">
            {/* Browser Header Bar */}
            <div className="px-3 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-xs bg-slate-900 border border-slate-800 rounded-md px-3 py-1 flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>http://localhost:5173</span>
                </div>
                <Globe className="w-3 h-3 text-slate-500" />
              </div>

              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                200 OK
              </span>
            </div>

            {/* Browser Content Area (Live Interactive Sandbox App!) */}
            <div className="p-6 flex-1 bg-slate-950 flex flex-col items-center justify-center text-center overflow-y-auto">
              <div className="max-w-sm w-full bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-semibold">
                  <Zap className="w-3 h-3" />
                  <span>Local React 19 Instance</span>
                </div>

                <h4 className="font-heading font-bold text-white text-base">
                  Running on Your Computer!
                </h4>

                <p className="text-xs text-slate-400">
                  This simulated window reflects the exact single-page app you download and run.
                </p>

                {/* Interactive State Demo */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Interactive Click Counter:</span>
                  <button
                    onClick={() => setPreviewCounter(c => c + 1)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all active:scale-95 shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Count: {previewCounter}</span>
                  </button>
                </div>

                <div className="text-[11px] text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Full TypeScript + Tailwind CSS active</span>
                </div>
              </div>
            </div>

            {/* Browser Status Bar */}
            <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between font-mono">
              <span>Port: 5173</span>
              <span>Rendering: Client-side DOM</span>
              <span>HMR: Active</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
