import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Table, 
  Search
} from 'lucide-react';
import { HOSTING_PROVIDERS } from '../data/hostingProviders';

export const HostingComparisonTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = HOSTING_PROVIDERS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.cost.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold mb-2">
              <Table className="w-3.5 h-3.5" />
              <span>Side-by-Side Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Hosting Platform Comparison Matrix
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Compare free tier limits, custom domain capabilities, bandwidth, and security across all deployment targets.
            </p>
          </div>

          {/* Search filter */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter providers..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Cost Model</th>
                  <th className="p-4">Free Bandwidth</th>
                  <th className="p-4 text-center">Custom Domain</th>
                  <th className="p-4 text-center">Auto SSL</th>
                  <th className="p-4 text-center">Git Auto-Deploy</th>
                  <th className="p-4 text-center">Serverless / Edge</th>
                  <th className="p-4">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProviders.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    
                    {/* Platform name */}
                    <td className="p-4 font-medium text-white flex items-center gap-2">
                      <span className="font-semibold text-white">{p.name}</span>
                      {p.recommended && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Recommended
                        </span>
                      )}
                    </td>

                    {/* Cost */}
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {p.cost}
                      </span>
                    </td>

                    {/* Bandwidth */}
                    <td className="p-4 font-mono text-slate-200">
                      {p.features.freeTierBandwidth}
                    </td>

                    {/* Custom domain */}
                    <td className="p-4 text-center">
                      {p.features.customDomain ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-rose-400 mx-auto" />
                      )}
                    </td>

                    {/* Auto SSL */}
                    <td className="p-4 text-center">
                      {p.features.automaticSSL ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-rose-400 mx-auto" />
                      )}
                    </td>

                    {/* Git Integration */}
                    <td className="p-4 text-center">
                      {p.features.gitIntegration ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-rose-400 mx-auto" />
                      )}
                    </td>

                    {/* Serverless Functions */}
                    <td className="p-4 text-center">
                      {p.features.serverlessFunctions ? (
                        <Check className="w-4 h-4 text-indigo-400 mx-auto" />
                      ) : (
                        <span className="text-slate-500 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Difficulty */}
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        p.difficulty === 'Beginner' 
                          ? 'bg-emerald-500/10 text-emerald-300' 
                          : p.difficulty === 'Intermediate'
                          ? 'bg-amber-500/10 text-amber-300'
                          : 'bg-purple-500/10 text-purple-300'
                      }`}>
                        {p.difficulty}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-900/50 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>All 7 platforms support modern Single Page Applications (SPA) with fallback routing.</span>
            <span className="text-emerald-400 font-medium">✓ HTTPS encrypted by default</span>
          </div>
        </div>

      </div>
    </section>
  );
};
