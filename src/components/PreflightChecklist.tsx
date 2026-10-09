import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  RotateCcw, 
  ShieldCheck
} from 'lucide-react';
import { DEFAULT_CHECKLIST_ITEMS } from '../data/checklistData';
import { ChecklistItem } from '../types';

export const PreflightChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST_ITEMS);
  const [copiedMd, setCopiedMd] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Local Environment', 'Development', 'Build & Quality', 'Version Control', 'Security & Config', 'Deployment', 'SEO & Branding'];

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleReset = () => {
    setItems(DEFAULT_CHECKLIST_ITEMS);
  };

  const handleExportMarkdown = () => {
    const lines = [
      `# 🚀 Web App Deployment Pre-Flight Checklist (${completedCount}/${totalCount} Completed - ${progressPercent}%)`,
      '',
      ...items.map(i => `- [${i.completed ? 'x' : ' '}] **${i.title}** (${i.category})\n  - ${i.description}${i.commandOrTip ? `\n  - Command/Tip: \`${i.commandOrTip}\`` : ''}`)
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <section id="checklist" className="py-16 border-b border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Pre-Flight Launch Checklist
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Follow these verified steps to inspect, test, and deploy your downloaded web application safely.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copiedMd ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Export as Markdown</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
              title="Reset Checklist"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white font-mono">{progressPercent}%</span>
              <div>
                <span className="text-xs text-slate-400">Readiness Score</span>
                <span className="text-xs font-semibold text-indigo-400 ml-2">
                  ({completedCount} of {totalCount} items verified)
                </span>
              </div>
            </div>

            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              progressPercent === 100 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                : progressPercent > 50 
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {progressPercent === 100 ? '🚀 100% Ready for Live Production!' : '⚡ In Progress'}
            </span>
          </div>

          {/* Bar */}
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Items Grid */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                item.completed
                  ? 'bg-slate-900/40 border-emerald-500/30 text-slate-300'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="pt-0.5 shrink-0">
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600" />
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className={`text-sm font-semibold ${item.completed ? 'text-white' : 'text-slate-200'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="text-[11px] text-slate-500 pt-1">
                  💡 <strong className="text-slate-400">Why it matters:</strong> {item.whyImportant}
                </div>

                {item.commandOrTip && (
                  <div className="mt-2 inline-block font-mono text-[11px] text-indigo-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    {item.commandOrTip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
