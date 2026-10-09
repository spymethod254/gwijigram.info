import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CodeExporter } from './components/CodeExporter';
import { LocalRunSimulator } from './components/LocalRunSimulator';
import { DeploymentPlaybook } from './components/DeploymentPlaybook';
import { ConfigGenerator } from './components/ConfigGenerator';
import { HostSelectorQuiz } from './components/HostSelectorQuiz';
import { HostingComparisonTable } from './components/HostingComparisonTable';
import { PreflightChecklist } from './components/PreflightChecklist';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PROJECT_TEMPLATES } from './data/projectTemplates';
import { downloadProjectAsZip } from './utils/zipExporter';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedHostProvider, setSelectedHostProvider] = useState<string>('vercel');
  const [isDownloadingStarter, setIsDownloadingStarter] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadStarter = async () => {
    setIsDownloadingStarter(true);
    const standardTemplate = PROJECT_TEMPLATES[0]; // React 19 + Vite + Tailwind
    await downloadProjectAsZip(standardTemplate.name, standardTemplate.files);
    setIsDownloadingStarter(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Sticky Top Navigation */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Banner: Direct Answer & Visual Pipeline */}
        <HeroBanner 
          onNavigate={handleNavigate}
          onDownloadStarter={handleDownloadStarter}
          isDownloading={isDownloadingStarter}
        />

        {/* Code Exporter & Live In-Browser ZIP Bundler */}
        <CodeExporter />

        {/* Interactive Local Terminal Sandbox & Localhost Preview */}
        <LocalRunSimulator />

        {/* Hosting Playbook: Vercel, Netlify, Cloudflare, VPS, GitHub */}
        <DeploymentPlaybook 
          selectedProviderId={selectedHostProvider}
          onSelectProvider={setSelectedHostProvider}
        />

        {/* Dynamic Config Generator (Dockerfile, Nginx, CI/CD, .env) */}
        <ConfigGenerator />

        {/* Interactive Quiz / Recommendation Engine */}
        <HostSelectorQuiz 
          onSelectProvider={(providerId) => {
            setSelectedHostProvider(providerId);
            handleNavigate('deployment');
          }}
        />

        {/* Side-by-Side Platform Comparison Table */}
        <HostingComparisonTable />

        {/* Pre-Flight Launch Checklist & Markdown Exporter */}
        <PreflightChecklist />

        {/* Searchable FAQ & Knowledge Base */}
        <FaqSection />

      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onDownloadStarter={handleDownloadStarter}
        isDownloading={isDownloadingStarter}
      />
    </div>
  );
}

export default App;
