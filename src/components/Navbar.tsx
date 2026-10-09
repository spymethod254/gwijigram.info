import React, { useState } from 'react';
import { 
  Download, 
  Terminal, 
  Globe, 
  ShieldCheck, 
  CheckCircle, 
  HelpCircle, 
  Sliders, 
  Sparkles,
  Menu,
  X,
  Code2
} from 'lucide-react';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import { downloadProjectAsZip } from '../utils/zipExporter';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleQuickDownload = async () => {
    setIsExporting(true);
    const defaultTemplate = PROJECT_TEMPLATES[0];
    await downloadProjectAsZip(defaultTemplate.name, defaultTemplate.files);
    setIsExporting(false);
  };

  const navLinks = [
    { id: 'overview', label: 'Overview', icon: ShieldCheck },
    { id: 'exporter', label: 'Code & ZIP Exporter', icon: Code2 },
    { id: 'simulator', label: 'Run Locally', icon: Terminal },
    { id: 'deployment', label: 'Hosting Playbook', icon: Globe },
    { id: 'config-gen', label: 'Config Generator', icon: Sliders },
    { id: 'recommender', label: 'Host Recommender', icon: Sparkles },
    { id: 'checklist', label: 'Pre-Flight Checklist', icon: CheckCircle },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => onNavigate('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-white tracking-tight">Code Sovereignty Hub</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Exportable
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Run Locally & Host Anywhere Without Lock-In</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 6).map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Download ZIP */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickDownload}
              disabled={isExporting}
              className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">{isExporting ? 'Packaging ZIP...' : 'Download Starter .ZIP'}</span>
              <span className="sm:hidden">{isExporting ? '...' : '.ZIP'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
