import { FaqItem } from '../types';

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'ownership-1',
    category: 'Ownership & Legal',
    question: 'Am I really allowed to download, modify, and host this code anywhere?',
    answer: 'Yes! 100% absolutely. The code generated is completely yours. There are no royalty fees, licensing fees, proprietary runtime dependencies, or lock-in restrictions. You can use it for personal projects, commercial SaaS products, client work, or open-source repositories.',
    highlights: [
      'Zero vendor lock-in',
      'No hidden SDKs or proprietary runtimes',
      'Standard open-source stack (React, TypeScript, Vite, Tailwind)',
      'Full commercial rights'
    ]
  },
  {
    id: 'local-1',
    category: 'Local Development',
    question: 'What do I need installed on my computer to run this locally?',
    answer: 'You only need Node.js (version 18 or newer), which comes with npm. Once installed, open your terminal in the extracted project folder, run `npm install` to download dependencies, then run `npm run dev`. Your local server will start immediately at `http://localhost:5173`.',
    highlights: [
      'Node.js 18+ (free download from nodejs.org)',
      'Any code editor (VS Code, Cursor, WebStorm, Sublime, Zed)',
      'Works seamlessly on Windows, macOS, and Linux'
    ]
  },
  {
    id: 'deployment-1',
    category: 'Deployment & Hosting',
    question: 'What is the fastest and completely free way to put this on the internet?',
    answer: 'The fastest methods are: 1) Vercel (Push to GitHub and click import, live in 30 seconds), 2) Netlify (Run `npm run build` and drag the `dist` folder into app.netlify.com/drop), or 3) Cloudflare Pages (Direct upload or GitHub connect with 100% free unlimited bandwidth). All three provide automatic free HTTPS SSL certificates and custom domain support.',
    highlights: [
      'Vercel: Best GitHub CI/CD integration',
      'Netlify: Instant drag & drop of dist folder (No terminal needed)',
      'Cloudflare Pages: Unlimited bandwidth & top DDoS protection'
    ]
  },
  {
    id: 'backend-1',
    category: 'Databases & Backends',
    question: 'How do I add a database, user authentication, or backend API?',
    answer: 'Because this is a standard React frontend, you can easily connect to any backend architecture: \n• Serverless BaaS: Supabase (PostgreSQL + Auth + Storage) or Firebase.\n• Custom Backend: Node.js/Express, Python (FastAPI/Django), Go, Rust, or Ruby on Rails.\n• Fullstack Frameworks: You can easily port the components into Next.js or Remix for built-in server actions and SSR.',
    highlights: [
      'Supabase / Firebase for instant backend & Auth',
      'Standard REST API or GraphQL queries (fetch, axios, tanstack-query)',
      'Compatible with Prisma, Drizzle, PostgreSQL, MongoDB, Redis'
    ]
  },
  {
    id: 'desktop-mobile',
    category: 'Local Development',
    question: 'Can I turn this web app into a Desktop or Mobile App?',
    answer: 'Yes! Because this application is built with standard web technologies:\n• Desktop Apps: Wrap with Tauri (Rust-based, ultra-lightweight) or Electron to produce native `.exe`, `.dmg`, or `.deb` installers.\n• Mobile Apps: Wrap with Capacitor (Ionic) or React Native to create native iOS and Android apps for the App Store & Google Play.',
    highlights: [
      'Tauri or Electron for Mac/Windows/Linux native apps',
      'Capacitor / Ionic for iOS & Android native apps',
      'PWA (Progressive Web App) for installable web app without app store'
    ]
  },
  {
    id: 'keys-security',
    category: 'Deployment & Hosting',
    question: 'How do I protect my secret API keys and environment variables?',
    answer: 'In client-side React apps, any variable prefixed with `VITE_` is visible in browser network traffic. For secret tokens (e.g. OpenAI secret key, Stripe secret keys), always make requests through a secure backend server or serverless Edge Function (Vercel Functions, Cloudflare Workers, Supabase Edge Functions) rather than embedding secret keys directly into frontend code.',
    highlights: [
      'Never commit `.env` or `.env.local` to public Git',
      'Use serverless proxy functions for secret keys',
      'Store production secrets in Vercel/Netlify dashboard environment settings'
    ]
  }
];
