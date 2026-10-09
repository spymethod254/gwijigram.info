export interface ProjectFile {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  iconName: string;
  badge: string;
  description: string;
  summary: string;
  files: ProjectFile[];
  quickCommands: {
    manager: string;
    install: string;
    dev: string;
    build: string;
    preview: string;
  };
}

export interface HostingProvider {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  icon: string;
  logoColor: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  cost: 'Free Tier Available' | 'Free / Low Cost' | 'Pay-as-you-go';
  deployTime: string;
  bestFor: string;
  recommended: boolean;
  steps: {
    title: string;
    description: string;
    command?: string;
    notes?: string;
  }[];
  configSnippet?: {
    filename: string;
    content: string;
  };
  features: {
    freeTierBandwidth: string;
    customDomain: boolean;
    automaticSSL: boolean;
    gitIntegration: boolean;
    serverlessFunctions: boolean;
    ddosProtection: boolean;
  };
  pros: string[];
  cons: string[];
}

export interface ConfigTemplate {
  id: string;
  title: string;
  filename: string;
  description: string;
  category: 'Docker & VPS' | 'Cloud Platform' | 'CI/CD' | 'Server';
  code: string;
  instructions: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  whyImportant: string;
  commandOrTip?: string;
  completed: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  category: 'Ownership & Legal' | 'Local Development' | 'Deployment & Hosting' | 'Databases & Backends';
  answer: string;
  highlights: string[];
}
