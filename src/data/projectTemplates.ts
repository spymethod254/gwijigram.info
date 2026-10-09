import { ProjectTemplate } from '../types';

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'react-vite-tailwind',
    name: 'React 19 + Vite + Tailwind CSS (Standard)',
    iconName: 'Atom',
    badge: 'Recommended / Current Setup',
    description: 'The exact modern web development stack used here. Ultra-fast HMR, TypeScript support, Tailwind v4 styling, and zero bloat.',
    summary: 'Standard single-page web app stack that builds to pure static HTML/CSS/JS in seconds.',
    quickCommands: {
      manager: 'npm',
      install: 'npm install',
      dev: 'npm run dev',
      build: 'npm run build',
      preview: 'npm run preview',
    },
    files: [
      {
        name: 'package.json',
        path: 'package.json',
        language: 'json',
        description: 'Project manifest with dependencies and build scripts',
        content: `{
  "name": "my-awesome-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^1.16.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vite": "^7.0.0"
  }
}`
      },
      {
        name: 'vite.config.ts',
        path: 'vite.config.ts',
        language: 'typescript',
        description: 'Vite build tool configuration and React plugin setup',
        content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
});`
      },
      {
        name: 'App.tsx',
        path: 'src/App.tsx',
        language: 'tsx',
        description: 'Main React application root component',
        content: `import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ExternalLink, Zap } from 'lucide-react';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium">
          <Zap className="w-3.5 h-3.5" />
          <span>Self-Hosted & 100% Owned</span>
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent">
          Welcome to Your Web App!
        </h1>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          You downloaded this project and ran it locally on your computer. You have full freedom to modify, expand, or host anywhere with zero limits.
        </p>

        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Interactive Counter State:</span>
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Count is: {count}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Source Code</span>
            </div>
            <p className="text-xs text-slate-400">No obfuscation, clean React + TypeScript.</p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Host Anywhere</span>
            </div>
            <p className="text-xs text-slate-400">Vercel, Netlify, VPS, S3, Docker.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;`
      },
      {
        name: 'main.tsx',
        path: 'src/main.tsx',
        language: 'tsx',
        description: 'React DOM entry point mounting root App',
        content: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`
      },
      {
        name: 'index.css',
        path: 'src/index.css',
        language: 'css',
        description: 'Global stylesheet with Tailwind CSS v4 import',
        content: `@import "tailwindcss";

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #020617;
  color: #f8fafc;
}`
      },
      {
        name: 'index.html',
        path: 'index.html',
        language: 'html',
        description: 'Single-page HTML entry point',
        content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Awesome Web App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
      },
      {
        name: 'README.md',
        path: 'README.md',
        language: 'markdown',
        description: 'Quick start instructions for your project',
        content: `# My Awesome Web App

This application was created with complete source code ownership. You are free to run, modify, and host it anywhere.

## 🚀 Quick Start (Local Run)

1. Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start local development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open your browser at [http://localhost:5173](http://localhost:5173).

## 📦 Building for Production

To compile standard static files for deployment:
\`\`\`bash
npm run build
\`\`\`
This produces a \`dist/\` folder ready to upload to any static hosting provider (Vercel, Netlify, Cloudflare Pages, GitHub Pages, AWS S3, Nginx).

## 🌐 Deploying

- **Vercel**: Run \`npx vercel\`
- **Netlify**: Run \`npx netlify deploy --prod --dir=dist\`
- **GitHub Pages**: Push to GitHub and enable Pages via GitHub Actions.`
      },
      {
        name: '.gitignore',
        path: '.gitignore',
        language: 'text',
        description: 'Git ignore rules for node_modules and build artifacts',
        content: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Dependency directories
node_modules/
dist/
dist-ssr/
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`
      },
      {
        name: 'tsconfig.json',
        path: 'tsconfig.json',
        language: 'json',
        description: 'TypeScript compiler configuration',
        content: `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`
      },
      {
        name: 'tsconfig.node.json',
        path: 'tsconfig.node.json',
        language: 'json',
        description: 'TypeScript config for Vite build tooling files',
        content: `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}`
      },
      {
        name: 'Button.tsx',
        path: 'src/components/Button.tsx',
        language: 'tsx',
        description: 'Reusable button component with variants',
        content: `import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variant === 'primary' && 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25',
        variant === 'secondary' && 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700',
        variant === 'ghost' && 'bg-transparent hover:bg-slate-800/60 text-slate-300',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;`
      },
      {
        name: 'Card.tsx',
        path: 'src/components/Card.tsx',
        language: 'tsx',
        description: 'Glass-style container card component',
        content: `import React from 'react';
import { cn } from '../utils/cn';

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, className, children }) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl backdrop-blur',
        className
      )}
    >
      {title && <h3 className="text-base font-bold text-white mb-1">{title}</h3>}
      {description && <p className="text-xs text-slate-400 mb-3">{description}</p>}
      {children}
    </div>
  );
};

export default Card;`
      },
      {
        name: 'cn.ts',
        path: 'src/utils/cn.ts',
        language: 'typescript',
        description: 'Tailwind class merge helper utility',
        content: `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes safely, resolving conflicts.
 * Example: cn('p-2', condition && 'p-4') => 'p-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`
      },
      {
        name: 'useLocalStorage.ts',
        path: 'src/hooks/useLocalStorage.ts',
        language: 'typescript',
        description: 'Custom React hook for persisted state',
        content: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable (private mode) - fail silently
    }
  }, [key, value]);

  return [value, setValue] as const;
}`
      },
      {
        name: '.env.example',
        path: '.env.example',
        language: 'text',
        description: 'Environment variable template (copy to .env.local)',
        content: `# Copy this file to .env.local and fill in your values.
# Only variables prefixed with VITE_ are exposed to browser code.

VITE_APP_TITLE="My Awesome Web App"
VITE_API_BASE_URL="https://api.example.com/v1"

# Secrets must NEVER be placed in VITE_ variables.
# Use a backend or serverless function for these:
# DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
# STRIPE_SECRET_KEY="sk_live_..."`
      },
      {
        name: 'vercel.json',
        path: 'vercel.json',
        language: 'json',
        description: 'Vercel SPA routing and cache headers',
        content: `{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}`
      },
      {
        name: 'netlify.toml',
        path: 'netlify.toml',
        language: 'toml',
        description: 'Netlify build settings and SPA redirects',
        content: `[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`
      },
      {
        name: 'Dockerfile',
        path: 'Dockerfile',
        language: 'dockerfile',
        description: 'Multi-stage container build for self-hosting',
        content: `# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      },
      {
        name: 'nginx.conf',
        path: 'nginx.conf',
        language: 'nginx',
        description: 'Nginx server block with SPA fallback routing',
        content: `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}`
      },
      {
        name: 'deploy.yml',
        path: '.github/workflows/deploy.yml',
        language: 'yaml',
        description: 'GitHub Actions CI/CD pipeline for GitHub Pages',
        content: `name: Build and Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4`
      },
      {
        name: 'LICENSE',
        path: 'LICENSE',
        language: 'text',
        description: 'MIT license granting you full commercial rights',
        content: `MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
      }
    ]
  },
  {
    id: 'nextjs-starter',
    name: 'Next.js 15 (App Router + Tailwind)',
    iconName: 'Server',
    badge: 'Fullstack / SSR Ready',
    description: 'Next.js App Router configuration for server-side rendering, API route handlers, and SEO-optimized web applications.',
    summary: 'Ideal if you want built-in backend API routes, server actions, and metadata management.',
    quickCommands: {
      manager: 'npm',
      install: 'npm install',
      dev: 'npm run dev',
      build: 'npm run build',
      preview: 'npm run start',
    },
    files: [
      {
        name: 'package.json',
        path: 'package.json',
        language: 'json',
        description: 'Next.js package setup',
        content: `{
  "name": "nextjs-web-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.1.0",
    "lucide-react": "^1.16.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0"
  }
}`
      },
      {
        name: 'page.tsx',
        path: 'app/page.tsx',
        language: 'tsx',
        description: 'Root page server / client component',
        content: `import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Next.js 15 App</h1>
        <p className="text-zinc-400 text-sm">
          Server-side rendered and ready to host on Vercel, Node servers, or Docker.
        </p>
      </div>
    </main>
  );
}`
      },
      {
        name: 'layout.tsx',
        path: 'app/layout.tsx',
        language: 'tsx',
        description: 'Next.js root layout with metadata',
        content: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Self-Hosted App',
  description: 'Generated web application ready for custom deployment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`
      }
    ]
  },
  {
    id: 'dockerized-web',
    name: 'Dockerized Multi-Stage Container App',
    iconName: 'Box',
    badge: 'Self-Hosted VPS Ready',
    description: 'Production Dockerfile + Nginx configuration for running on any Virtual Private Server (DigitalOcean, Hetzner, AWS EC2, Coolify).',
    summary: 'Containerized deployment that runs identically on your machine, staging, and production servers.',
    quickCommands: {
      manager: 'docker',
      install: 'docker build -t my-app .',
      dev: 'docker run -p 8080:80 my-app',
      build: 'docker-compose up --build -d',
      preview: 'docker ps',
    },
    files: [
      {
        name: 'Dockerfile',
        path: 'Dockerfile',
        language: 'dockerfile',
        description: 'Multi-stage lightweight alpine build container',
        content: `# Stage 1: Build React/Vite app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with lightweight Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      },
      {
        name: 'nginx.conf',
        path: 'nginx.conf',
        language: 'nginx',
        description: 'Nginx config with SPA fallback routing and caching',
        content: `server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html index.htm;

    # Support Single Page Application (SPA) routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets for high performance
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}`
      },
      {
        name: 'docker-compose.yml',
        path: 'docker-compose.yml',
        language: 'yaml',
        description: 'Docker compose file for 1-command startup',
        content: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: always
    environment:
      - NODE_ENV=production`
      }
    ]
  },
  {
    id: 'vanilla-html',
    name: 'Static HTML + Tailwind CDN + JavaScript',
    iconName: 'FileCode',
    badge: 'Zero-Build / Drag & Drop',
    description: 'Pure static files requiring no Node.js or build steps. Open index.html directly in any browser.',
    summary: 'The simplest possible web app format with zero dependencies.',
    quickCommands: {
      manager: 'browser',
      install: '# No install needed!',
      dev: 'npx serve .',
      build: '# Ready immediately',
      preview: 'open index.html',
    },
    files: [
      {
        name: 'index.html',
        path: 'index.html',
        language: 'html',
        description: 'Self-contained HTML file with Tailwind CDN and JavaScript',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Standalone Web App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl text-center space-y-4">
    <h1 class="text-2xl font-bold text-white">Standalone Static App</h1>
    <p class="text-slate-400 text-sm">No build tools or Node.js required. Double click to run anywhere.</p>
    <button id="btn" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium text-sm">
      Clicks: <span id="count">0</span>
    </button>
  </div>
  <script>
    let count = 0;
    const btn = document.getElementById('btn');
    const display = document.getElementById('count');
    btn.addEventListener('click', () => {
      count++;
      display.textContent = count;
    });
  </script>
</body>
</html>`
      }
    ]
  }
];
