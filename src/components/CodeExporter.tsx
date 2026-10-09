import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Folder, 
  ChevronRight, 
  Sparkles, 
  Terminal, 
  Box, 
  FileJson, 
  FileText,
  Info
} from 'lucide-react';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import { downloadProjectAsZip } from '../utils/zipExporter';
import { ProjectFile } from '../types';

export const CodeExporter: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(PROJECT_TEMPLATES[0].id);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedFile, setCopiedFile] = useState<boolean>(false);
  const [copiedCommands, setCopiedCommands] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [selectedPkgManager, setSelectedPkgManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');

  const currentTemplate = PROJECT_TEMPLATES.find(t => t.id === selectedTemplateId) || PROJECT_TEMPLATES[0];
  const activeFile: ProjectFile = currentTemplate.files[selectedFileIndex] || currentTemplate.files[0];

  const handleCopyCode = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.content);
      setCopiedFile(true);
      setTimeout(() => setCopiedFile(false), 2000);
    }
  };

  const handleDownloadSingleFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    await downloadProjectAsZip(currentTemplate.name, currentTemplate.files);
    setIsDownloading(false);
  };

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.json')) return <FileJson className="w-4 h-4 text-amber-400" />;
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return <FileCode className="w-4 h-4 text-cyan-400" />;
    if (filename.endsWith('.css')) return <FileCode className="w-4 h-4 text-sky-400" />;
    if (filename.endsWith('.html')) return <FileCode className="w-4 h-4 text-orange-400" />;
    if (filename.endsWith('.md')) return <FileText className="w-4 h-4 text-slate-400" />;
    if (filename.includes('Docker')) return <Box className="w-4 h-4 text-blue-400" />;
    return <FileText className="w-4 h-4 text-indigo-400" />;
  };

  const getManagerCommands = () => {
    switch (selectedPkgManager) {
      case 'pnpm':
        return {
          install: 'pnpm install',
          dev: 'pnpm run dev',
          build: 'pnpm run build',
          preview: 'pnpm run preview'
        };
      case 'yarn':
        return {
          install: 'yarn install',
          dev: 'yarn dev',
          build: 'yarn build',
          preview: 'yarn preview'
        };
      case 'bun':
        return {
          install: 'bun install',
          dev: 'bun run dev',
          build: 'bun run build',
          preview: 'bun run preview'
        };
      default:
        return {
          install: 'npm install',
          dev: 'npm run dev',
          build: 'npm run build',
          preview: 'npm run preview'
        };
    }
  };

  const commands = getManagerCommands();

  const handleCopyCommands = () => {
    const text = `# 1. Install packages\n${commands.install}\n\n# 2. Start local server\n${commands.dev}\n\n# 3. Production build\n${commands.build}`;
    navigator.clipboard.writeText(text);
    setCopiedCommands(true);
    setTimeout(() => setCopiedCommands(false), 2000);
  };

  return (
    <section id="exporter" className="py-16 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Source Code Access</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive Code Exporter &amp; ZIP Downloader
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Inspect any file right here in the browser or download the entire project bundle in one click. Every file is yours to keep, modify, and host.
            </p>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 cursor-pointer text-sm shrink-0"
          >
            <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
            <span>{isDownloading ? 'Generating ZIP...' : `Download ${currentTemplate.name.split(' ')[0]} .ZIP`}</span>
          </button>
        </div>

        {/* Template Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {PROJECT_TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === selectedTemplateId;
            return (
              <button
                key={tmpl.id}
                onClick={() => {
                  setSelectedTemplateId(tmpl.id);
                  setSelectedFileIndex(0);
                }}
                className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                    <div className="bg-indigo-600 text-white text-[9px] font-bold py-0.5 right-[-24px] top-[10px] w-[80px] text-center rotate-45 shadow-sm">
                      ACTIVE
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {tmpl.badge}
                  </span>
                </div>
                <h4 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {tmpl.name}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {tmpl.summary}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>{tmpl.files.length} project files</span>
                  <span className="text-indigo-400 font-medium">Click to inspect →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ZIP Manifest: what you actually get after extracting */}
        {(() => {
          const rootFiles = currentTemplate.files.filter(f => !f.path.includes('/'));
          const nestedFiles = currentTemplate.files.filter(f => f.path.includes('/'));
          const hiddenFiles = currentTemplate.files.filter(f => f.path.split('/').pop()!.startsWith('.'));
          const folders = Array.from(
            new Set(nestedFiles.map(f => f.path.split('/').slice(0, -1).join('/')))
          ).sort();
          const visibleRoot = rootFiles.filter(f => !f.name.startsWith('.'));

          return (
            <div className="mb-6 bg-slate-900/70 border border-amber-500/25 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      What&apos;s actually inside this ZIP — {currentTemplate.files.length} files total
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Only <strong className="text-amber-300">{visibleRoot.length}</strong> appear at the top level. The rest live inside subfolders or are hidden dotfiles.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
                  <span className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                    {rootFiles.length} root
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                    {nestedFiles.length} nested
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-300">
                    {hiddenFiles.length} hidden
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                {/* Folder tree */}
                <div className="font-mono text-[11px] leading-relaxed">
                  <div className="text-slate-300 mb-1">
                    📂 {currentTemplate.name.toLowerCase().replace(/[^a-z0-9_-]/g, '-')}/
                  </div>
                  {rootFiles.map(f => (
                    <div key={f.path} className="text-slate-400 pl-4">
                      ├── {f.name}
                      {f.name.startsWith('.') && (
                        <span className="text-amber-400/80 ml-1.5">(hidden)</span>
                      )}
                    </div>
                  ))}
                  {folders.map(folder => (
                    <div key={folder}>
                      <div className="text-cyan-300 pl-4">
                        ├── {folder}/
                        {folder.startsWith('.') && (
                          <span className="text-amber-400/80 ml-1.5">(hidden folder)</span>
                        )}
                      </div>
                      {nestedFiles
                        .filter(f => f.path.split('/').slice(0, -1).join('/') === folder)
                        .map(f => (
                          <div key={f.path} className="text-slate-400 pl-10">
                            └── {f.name}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>

                {/* Why you may see fewer files */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="font-semibold text-white text-xs uppercase tracking-wider">
                    Seeing fewer files than expected?
                  </div>
                  <p className="leading-relaxed">
                    Files starting with a dot (<code className="text-amber-300 font-mono">.gitignore</code>,{' '}
                    <code className="text-amber-300 font-mono">.env.example</code>,{' '}
                    <code className="text-amber-300 font-mono">.github/</code>) are hidden by default in Finder and
                    Windows Explorer — they are still in the archive.
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-400 font-mono shrink-0">macOS</span>
                      <span className="text-slate-400">Press <kbd className="px-1 py-0.5 bg-slate-950 border border-slate-700 rounded text-[10px]">⌘ + Shift + .</kbd> in Finder</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-400 font-mono shrink-0">Windows</span>
                      <span className="text-slate-400">Explorer → View → Show → Hidden items</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-400 font-mono shrink-0">Terminal</span>
                      <span className="text-slate-400">Run <code className="text-emerald-300">ls -la</code> to list everything</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Code Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Left Panel: Virtual File Tree */}
          <div className="lg:col-span-4 bg-slate-900/70 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Folder className="w-4 h-4 text-indigo-400" />
                  <span>PROJECT DIRECTORY</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {currentTemplate.files.length} files
                </span>
              </div>

              {/* File List */}
              <div className="space-y-1">
                {currentTemplate.files.map((file, idx) => {
                  const isSelected = idx === selectedFileIndex;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFileIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all text-left ${
                        isSelected
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {getFileIcon(file.name)}
                        <span className="truncate">{file.path}</span>
                      </div>
                      {isSelected ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 opacity-60" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Local Commands Box */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>Run Command</span>
                </span>
                
                {/* Package manager picker */}
                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800 text-[10px]">
                  {(['npm', 'pnpm', 'yarn', 'bun'] as const).map(pm => (
                    <button
                      key={pm}
                      onClick={() => setSelectedPkgManager(pm)}
                      className={`px-1.5 py-0.5 rounded ${
                        selectedPkgManager === pm ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 border border-slate-800/80 space-y-1 relative group">
                <div className="text-emerald-400">$ {commands.install}</div>
                <div className="text-cyan-400">$ {commands.dev}</div>
                <button
                  onClick={handleCopyCommands}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy Commands"
                >
                  {copiedCommands ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Code Viewer */}
          <div className="lg:col-span-8 flex flex-col bg-slate-950">
            
            {/* Viewer Header */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {getFileIcon(activeFile.name)}
                <div>
                  <span className="text-xs font-mono font-semibold text-white">{activeFile.path}</span>
                  <span className="hidden sm:inline-block text-[11px] text-slate-400 ml-2">({activeFile.description})</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadSingleFile}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save File</span>
                </button>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {copiedFile ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Content Area with Line Numbers */}
            <div className="p-4 font-mono text-xs overflow-x-auto max-h-[520px] scrollbar-thin">
              <div className="flex text-slate-300">
                {/* Line Numbers */}
                <div className="select-none text-right pr-4 text-slate-600 text-xs font-mono space-y-0.5 border-r border-slate-800 mr-4">
                  {activeFile.content.split('\n').map((_, index) => (
                    <div key={index} className="leading-relaxed">
                      {index + 1}
                    </div>
                  ))}
                </div>

                {/* Actual Code */}
                <pre className="flex-1 leading-relaxed overflow-x-auto text-slate-200">
                  <code>{activeFile.content}</code>
                </pre>
              </div>
            </div>

            {/* Footer Status Bar */}
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span>Language: <strong className="text-indigo-300 font-mono">{activeFile.language}</strong></span>
                <span>Lines: <strong className="text-slate-200 font-mono">{activeFile.content.split('\n').length}</strong></span>
                <span>Size: <strong className="text-slate-200 font-mono">{(new Blob([activeFile.content]).size / 1024).toFixed(1)} KB</strong></span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" /> Validated Syntax
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
