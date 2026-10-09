import React, { useState } from 'react';
import { 
  Sliders, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Sparkles
} from 'lucide-react';
import { CONFIG_TEMPLATES } from '../data/configTemplates';
import { ConfigTemplate } from '../types';

export const ConfigGenerator: React.FC = () => {
  const [selectedConfigId, setSelectedConfigId] = useState<string>(CONFIG_TEMPLATES[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState<boolean>(false);

  // Customization state
  const [appName, setAppName] = useState<string>('my-awesome-app');
  const [appPort, setAppPort] = useState<string>('8080');
  const [domainName, setDomainName] = useState<string>('example.com');
  const [nodeVersion, setNodeVersion] = useState<string>('20');

  const categories = ['All', 'Docker & VPS', 'Cloud Platform', 'CI/CD', 'Server'];

  const filteredConfigs = activeCategory === 'All' 
    ? CONFIG_TEMPLATES 
    : CONFIG_TEMPLATES.filter(c => c.category === activeCategory);

  const selectedTemplate: ConfigTemplate = 
    CONFIG_TEMPLATES.find(c => c.id === selectedConfigId) || CONFIG_TEMPLATES[0];

  // Dynamically interpolate template variables
  const getInterpolatedCode = (rawCode: string) => {
    return rawCode
      .replace(/my-app/g, appName)
      .replace(/my-web-app/g, appName)
      .replace(/yourdomain\.com/g, domainName)
      .replace(/8080:80/g, `${appPort}:80`)
      .replace(/3000:80/g, `${appPort}:80`)
      .replace(/node:20-alpine/g, `node:${nodeVersion}-alpine`)
      .replace(/node-version: 20/g, `node-version: ${nodeVersion}`);
  };

  const processedCode = getInterpolatedCode(selectedTemplate.code);

  const handleCopy = () => {
    navigator.clipboard.writeText(processedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([processedCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedTemplate.filename.split('/').pop() || selectedTemplate.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="config-gen" className="py-16 border-b border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
            <Sliders className="w-3.5 h-3.5" />
            <span>Ready-to-Use Artifacts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Production Deployment &amp; Server Config Generator
          </h2>
          <p className="text-slate-400 text-sm">
            Generate customized Dockerfiles, Nginx configurations, GitHub Actions pipelines, or cloud rewrite rules in real-time.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white font-semibold shadow-lg shadow-purple-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid: Customizer Sidebar + Config Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Config List & Live Variable Tuner */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Template Selector Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Select Configuration File
              </h4>

              <div className="space-y-2">
                {filteredConfigs.map((cfg) => {
                  const isSelected = cfg.id === selectedConfigId;
                  return (
                    <button
                      key={cfg.id}
                      onClick={() => setSelectedConfigId(cfg.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-purple-950/40 border-purple-500/80 ring-1 ring-purple-500/30 text-white'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-semibold text-purple-300">
                          {cfg.filename}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {cfg.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {cfg.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Customizer Parameters */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  <span>Customize Variables</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Live updates</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">App Name</label>
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-purple-500 focus:outline-none"
                    placeholder="my-app"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Host Port</label>
                  <input
                    type="text"
                    value={appPort}
                    onChange={(e) => setAppPort(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-purple-500 focus:outline-none"
                    placeholder="8080"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Domain Name</label>
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-purple-500 focus:outline-none"
                    placeholder="example.com"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Node.js Version</label>
                  <select
                    value={nodeVersion}
                    onChange={(e) => setNodeVersion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-purple-500 focus:outline-none"
                  >
                    <option value="20">Node 20 (LTS)</option>
                    <option value="22">Node 22 (Current)</option>
                    <option value="18">Node 18</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Code Viewer & Instructions */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
            
            {/* Header */}
            <div>
              <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <span className="font-mono text-sm font-bold text-white">{selectedTemplate.filename}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-purple-600/20"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy File</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instructions Bar */}
              <div className="px-4 py-2.5 bg-purple-950/20 border-b border-purple-500/20 text-xs text-purple-200 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{selectedTemplate.instructions}</span>
              </div>

              {/* Code Pre Area */}
              <div className="p-5 font-mono text-xs overflow-x-auto max-h-[460px] scrollbar-thin text-slate-200 leading-relaxed bg-slate-950">
                <pre><code>{processedCode}</code></pre>
              </div>
            </div>

            {/* Description Footer */}
            <div className="p-4 bg-slate-900/40 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>{selectedTemplate.description}</span>
              <span className="text-emerald-400 font-mono text-[11px] shrink-0 ml-2">✓ Ready for deployment</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
