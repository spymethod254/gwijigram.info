import React, { useState } from 'react';
import { 
  Globe, 
  Terminal, 
  Copy, 
  Check, 
  CheckCircle2, 
  Layers, 
  Server, 
  Cloud, 
  GitBranch, 
  Cpu, 
  HardDrive,
  FileCode,
  Sparkles
} from 'lucide-react';
import { HOSTING_PROVIDERS } from '../data/hostingProviders';
import { HostingProvider } from '../types';

interface DeploymentPlaybookProps {
  selectedProviderId?: string;
  onSelectProvider?: (id: string) => void;
}

export const DeploymentPlaybook: React.FC<DeploymentPlaybookProps> = ({ 
  selectedProviderId: externalSelectedId,
  onSelectProvider: externalOnSelect
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string>(HOSTING_PROVIDERS[0].id);
  const selectedProviderId = externalSelectedId || internalSelectedId;
  const setSelectedProviderId = externalOnSelect || setInternalSelectedId;
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [copiedCommandIndex, setCopiedCommandIndex] = useState<number | null>(null);

  const selectedProvider: HostingProvider = 
    HOSTING_PROVIDERS.find(p => p.id === selectedProviderId) || HOSTING_PROVIDERS[0];

  const getProviderIcon = (id: string) => {
    switch (id) {
      case 'vercel':
        return <Globe className="w-5 h-5 text-white" />;
      case 'netlify':
        return <Layers className="w-5 h-5 text-teal-400" />;
      case 'cloudflare-pages':
        return <Cloud className="w-5 h-5 text-orange-400" />;
      case 'github-pages':
        return <GitBranch className="w-5 h-5 text-purple-400" />;
      case 'docker-vps':
        return <Server className="w-5 h-5 text-blue-400" />;
      case 'render-railway':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'aws-s3-cloudfront':
        return <HardDrive className="w-5 h-5 text-amber-500" />;
      default:
        return <Globe className="w-5 h-5 text-indigo-400" />;
    }
  };

  const handleCopySnippet = () => {
    if (selectedProvider.configSnippet) {
      navigator.clipboard.writeText(selectedProvider.configSnippet.content);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const handleCopyCommand = (command: string, index: number) => {
    navigator.clipboard.writeText(command);
    setCopiedCommandIndex(index);
    setTimeout(() => setCopiedCommandIndex(null), 2000);
  };

  return (
    <section id="deployment" className="py-16 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Universal Deployment Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How to Host on Any Platform for Free
          </h2>
          <p className="text-slate-400 text-sm">
            Because this application compiles to standard web files (<code className="text-emerald-400 font-mono">dist/</code>), you can host it on any modern cloud service, CDN, or self-hosted server.
          </p>
        </div>

        {/* Provider Tabs List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {HOSTING_PROVIDERS.map((provider) => {
            const isSelected = provider.id === selectedProviderId;
            return (
              <button
                key={provider.id}
                onClick={() => setSelectedProviderId(provider.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10 ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {getProviderIcon(provider.id)}
                <span>{provider.name}</span>
                {provider.recommended && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ★ Top Pick
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Provider Details Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Card Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                {getProviderIcon(selectedProvider.id)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    {selectedProvider.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {selectedProvider.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {selectedProvider.cost}
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  {selectedProvider.tagline}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Difficulty</span>
                <span className="text-indigo-400 font-semibold">{selectedProvider.difficulty}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Est. Deploy Time</span>
                <span className="text-emerald-400 font-semibold">{selectedProvider.deployTime}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Free Bandwidth</span>
                <span className="text-white font-semibold">{selectedProvider.features.freeTierBandwidth}</span>
              </div>
            </div>
          </div>

          {/* Provider Content Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Step-by-Step Instructions */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Deployment Steps &amp; Commands</span>
              </h4>

              <div className="space-y-4">
                {selectedProvider.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-semibold text-white text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-mono font-bold flex items-center justify-center border border-indigo-500/30 shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step.title}</span>
                      </h5>
                    </div>

                    <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                      {step.description}
                    </p>

                    {step.command && (
                      <div className="mt-2 bg-slate-950 rounded-lg p-3 font-mono text-xs text-indigo-300 border border-slate-800/80 flex items-center justify-between gap-2 group">
                        <pre className="overflow-x-auto whitespace-pre-wrap flex-1">{step.command}</pre>
                        <button
                          onClick={() => handleCopyCommand(step.command!, idx)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0 transition-colors"
                          title="Copy command"
                        >
                          {copiedCommandIndex === idx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}

                    {step.notes && (
                      <div className="text-[11px] text-slate-400 italic">
                        💡 Note: {step.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Best For Callout */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Best Use Case: </strong>
                  {selectedProvider.bestFor}
                </div>
              </div>
            </div>

            {/* Right Column: Config Snippet + Features & Pros */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Config Snippet Box if available */}
              {selectedProvider.configSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{selectedProvider.configSnippet.filename}</span>
                    </span>
                    <button
                      onClick={handleCopySnippet}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 border border-slate-700 transition-colors"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Config</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3 font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto max-h-48 scrollbar-thin">
                    <pre><code>{selectedProvider.configSnippet.content}</code></pre>
                  </div>
                </div>
              )}

              {/* Features Checklist */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Included Features
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Free SSL/HTTPS</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Custom Domains</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Global CDN Edge</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Git CI/CD Auto-Build</span>
                  </div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                  <h6 className="text-xs font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Advantages
                  </h6>
                  <ul className="text-[11px] text-slate-300 space-y-1">
                    {selectedProvider.pros.map((pro, i) => (
                      <li key={i}>• {pro}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <h6 className="text-xs font-bold text-slate-400 mb-1.5">
                    Considerations
                  </h6>
                  <ul className="text-[11px] text-slate-400 space-y-1">
                    {selectedProvider.cons.map((con, i) => (
                      <li key={i}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
