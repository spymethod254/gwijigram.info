import { HostingProvider } from '../types';

export const HOSTING_PROVIDERS: HostingProvider[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    tagline: 'Best for React & Next.js with automatic global CDN & previews',
    badge: 'Popular Choice',
    icon: 'Triangle',
    logoColor: '#ffffff',
    difficulty: 'Beginner',
    cost: 'Free Tier Available',
    deployTime: '< 1 minute',
    bestFor: 'Modern React, Vite, Next.js, and static frontends with continuous Git deployment.',
    recommended: true,
    steps: [
      {
        title: 'Method A: GitHub / GitLab / Bitbucket Push (Easiest)',
        description: 'Push your downloaded code into a GitHub repository. Go to vercel.com, click "Add New Project", select your repository, and click "Deploy". Vercel auto-detects Vite!',
        command: 'git init && git add . && git commit -m "Initial commit"\ngit remote add origin https://github.com/your-username/your-repo.git\ngit push -u origin main',
        notes: 'Framework Preset: Vite (automatically detected). Output Directory: dist'
      },
      {
        title: 'Method B: Direct Instant CLI Deploy (No Git required)',
        description: 'Install Vercel CLI and deploy directly from your local terminal folder with one command.',
        command: 'npm i -g vercel\nvercel deploy --prod',
        notes: 'Follow the 3 terminal prompts to confirm project name and public dist directory.'
      },
      {
        title: 'Custom Domain Setup',
        description: 'Under Project Settings → Domains, add your domain (e.g. app.yourdomain.com). Point your CNAME record to cname.vercel-dns.com.',
        notes: 'Automatic free SSL certificates are provisioned in seconds.'
      }
    ],
    configSnippet: {
      filename: 'vercel.json',
      content: `{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}`
    },
    features: {
      freeTierBandwidth: '100 GB / month',
      customDomain: true,
      automaticSSL: true,
      gitIntegration: true,
      serverlessFunctions: true,
      ddosProtection: true,
    },
    pros: [
      'Zero configuration needed for Vite & React',
      'Instant preview deployments for every Git branch/PR',
      'Global Edge network with extreme performance',
      'Free automatic SSL certificates'
    ],
    cons: [
      'Commercial usage on free hobby tier has terms',
      'Serverless function runtime limits on free tier'
    ]
  },
  {
    id: 'netlify',
    name: 'Netlify',
    tagline: 'Super fast Drag & Drop deployment or Git CI/CD',
    badge: 'Easiest Drag & Drop',
    icon: 'Layers',
    logoColor: '#00c7b7',
    difficulty: 'Beginner',
    cost: 'Free Tier Available',
    deployTime: '< 30 seconds',
    bestFor: 'Quick static launches, drag-and-drop deployment of dist/ folder without terminal.',
    recommended: true,
    steps: [
      {
        title: 'Method A: Manual Drag-and-Drop (Zero Git / Zero CLI)',
        description: '1. Run `npm run build` on your computer.\n2. Go to app.netlify.com/drop.\n3. Drag and drop the generated `dist/` folder directly into the browser window!\n4. Your site is live instantly with an HTTPS URL.',
        command: 'npm run build',
        notes: 'The dist folder contains the production-ready compiled bundle.'
      },
      {
        title: 'Method B: Netlify CLI Deployment',
        description: 'Deploy instantly from command line:',
        command: 'npx netlify deploy --prod --dir=dist',
        notes: 'Log in when prompted to link with your Netlify account.'
      },
      {
        title: 'Method C: Continuous Git Deployment',
        description: 'Connect your GitHub repository. Build command: `npm run build`, Publish directory: `dist`.',
        notes: 'Netlify rebuilds on every `git push` automatically.'
      }
    ],
    configSnippet: {
      filename: 'netlify.toml',
      content: `[build]
  publish = "dist"
  command = "npm run build"

# SPA Fallback for client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"`
    },
    features: {
      freeTierBandwidth: '100 GB / month',
      customDomain: true,
      automaticSSL: true,
      gitIntegration: true,
      serverlessFunctions: true,
      ddosProtection: true,
    },
    pros: [
      'Easiest drag-and-drop web UI upload for beginners',
      'Form handling & serverless functions included',
      'Built-in branch previews and rollbacks'
    ],
    cons: [
      'Bandwidth overages cost $55/100GB if exceeded without alert setup',
      'Build minute limits (300 mins/mo free)'
    ]
  },
  {
    id: 'cloudflare-pages',
    name: 'Cloudflare Pages',
    tagline: 'Unlimited bandwidth on the world’s fastest CDN edge network',
    badge: 'Generous Free Tier',
    icon: 'Cloud',
    logoColor: '#f38020',
    difficulty: 'Beginner',
    cost: 'Free Tier Available',
    deployTime: '< 1 minute',
    bestFor: 'High traffic web apps needing 100% free unlimited bandwidth & top DDoS security.',
    recommended: true,
    steps: [
      {
        title: 'Method A: Direct Wrangler CLI Deployment',
        description: 'Build your project and deploy directly to Cloudflare Pages via Wrangler:',
        command: 'npm run build\nnpx wrangler pages deploy dist --project-name=my-awesome-app',
        notes: 'Creates an instant *.pages.dev URL.'
      },
      {
        title: 'Method B: Cloudflare Pages Dashboard & Git',
        description: '1. Open Cloudflare Dashboard → Workers & Pages → Create Application → Pages.\n2. Connect GitHub repo.\n3. Framework preset: Vite, Build command: `npm run build`, Output directory: `dist`.',
        notes: 'Includes unlimited free bandwidth and 500 builds per month.'
      }
    ],
    configSnippet: {
      filename: '_redirects',
      content: `# Cloudflare Pages Single Page App Redirect
/*    /index.html   200`
    },
    features: {
      freeTierBandwidth: 'Unlimited Bandwidth',
      customDomain: true,
      automaticSSL: true,
      gitIntegration: true,
      serverlessFunctions: true,
      ddosProtection: true,
    },
    pros: [
      'Unlimited bandwidth on free tier (no surprise bills!)',
      'Fastest global CDN edge points of presence (300+ cities)',
      'Enterprise-grade DDoS protection included'
    ],
    cons: [
      'Dashboard UI has a slightly steeper learning curve than Vercel'
    ]
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    tagline: '100% Free static web hosting directly from your repository',
    badge: '100% Free & Open',
    icon: 'Github',
    logoColor: '#a855f7',
    difficulty: 'Intermediate',
    cost: 'Free Tier Available',
    deployTime: '1-2 minutes',
    bestFor: 'Open-source projects, personal portfolios, documentation, and zero-cost hosting.',
    recommended: false,
    steps: [
      {
        title: 'Step 1: Adjust Vite Base Path',
        description: 'If your repository name is `my-app`, update `vite.config.ts` to include `base: "/my-app/"` so asset links resolve correctly on GitHub Pages domain `username.github.io/my-app/`.',
        command: '// In vite.config.ts:\nexport default defineConfig({\n  base: "./", // or "/repository-name/"\n  plugins: [react(), tailwindcss()]\n});',
        notes: 'Using base: "./" ensures relative paths work on any subpath.'
      },
      {
        title: 'Step 2: Add GitHub Actions Deployment Workflow',
        description: 'Create `.github/workflows/deploy.yml` in your project folder and push to GitHub.',
        command: 'git add .github/workflows/deploy.yml\ngit commit -m "Add GitHub Pages workflow"\ngit push origin main',
        notes: 'In GitHub repo Settings → Pages, select "GitHub Actions" as source.'
      }
    ],
    configSnippet: {
      filename: '.github/workflows/deploy.yml',
      content: `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`
    },
    features: {
      freeTierBandwidth: '100 GB / month',
      customDomain: true,
      automaticSSL: true,
      gitIntegration: true,
      serverlessFunctions: false,
      ddosProtection: true,
    },
    pros: [
      'Directly integrated into your GitHub repository',
      'Completely free with no credit card required',
      'Supports custom domain with HTTPS'
    ],
    cons: [
      'Requires configuring GitHub Actions workflow',
      'No server-side functions or dynamic backend natively'
    ]
  },
  {
    id: 'docker-vps',
    name: 'Self-Hosted VPS (Docker / Nginx / Coolify)',
    icon: 'Server',
    tagline: 'Complete 100% infrastructure sovereignty on your own server',
    badge: 'Maximum Control',
    logoColor: '#3b82f6',
    difficulty: 'Advanced',
    cost: 'Free / Low Cost',
    deployTime: '3-5 minutes',
    bestFor: 'Privacy, sovereignty, zero third-party platform lock-in, and hosting on $4/mo Hetzner/DigitalOcean/Linode.',
    recommended: false,
    steps: [
      {
        title: 'Option A: 1-Click with Coolify or CapRover (Self-Hosted PaaS)',
        description: 'Install Coolify on your $4/mo Linux VPS (Ubuntu 22.04+). Add your GitHub repo or Dockerfile, and Coolify handles SSL, Docker builds, and custom domains automatically.',
        command: 'curl -fsSL https://cdn.coolify.io/install.sh | bash',
        notes: 'Coolify gives you an open-source self-hosted Vercel/Netlify alternative.'
      },
      {
        title: 'Option B: Standard Docker Container Run',
        description: 'Build your container and run it on any server or local Docker Desktop:',
        command: 'docker build -t my-web-app .\ndocker run -d -p 80:80 --name my-app-instance my-web-app',
        notes: 'Includes Alpine Nginx configured for single-page routing and caching.'
      },
      {
        title: 'Option C: Traditional Nginx on Linux VPS',
        description: 'Upload the compiled `dist/` folder to `/var/www/my-app` and configure Nginx.',
        command: 'scp -r dist/* user@your-server-ip:/var/www/my-app/\nsudo systemctl reload nginx',
        notes: 'Use Certbot for free automatic Let\'s Encrypt SSL certificates (`sudo certbot --nginx`).'
      }
    ],
    configSnippet: {
      filename: 'nginx.conf',
      content: `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/my-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}`
    },
    features: {
      freeTierBandwidth: 'Terabytes (based on VPS)',
      customDomain: true,
      automaticSSL: true,
      gitIntegration: true,
      serverlessFunctions: true,
      ddosProtection: true,
    },
    pros: [
      '100% control over hardware, data, and software stack',
      'No platform limits, arbitrary pricing increases, or vendor lock-in',
      'Run database, API, and frontend all together for a few dollars/mo'
    ],
    cons: [
      'You are responsible for server updates, backups, and security patches'
    ]
  },
  {
    id: 'render-railway',
    name: 'Render & Railway',
    tagline: 'Modern cloud application platforms for fullstack apps & web services',
    badge: 'Fullstack Ready',
    icon: 'Cpu',
    logoColor: '#6366f1',
    difficulty: 'Beginner',
    cost: 'Free Tier Available',
    deployTime: '< 2 minutes',
    bestFor: 'Web applications with Node.js, Python, or Go backends + PostgreSQL databases.',
    recommended: false,
    steps: [
      {
        title: 'Static Site Deployment on Render',
        description: '1. Create a free account at render.com.\n2. Click "New Static Site" → Connect GitHub repo.\n3. Build command: `npm run build`, Publish directory: `dist`.\n4. Click "Create Static Site".',
        notes: 'Free tier includes 100GB bandwidth and free custom SSL domains.'
      },
      {
        title: 'Fullstack Node + Static on Railway',
        description: 'Railway automatically detects your `Dockerfile` or `package.json` and spins up containerized services with attached PostgreSQL database.',
        command: 'npm i -g @railway/cli\nrailway login\nrailway init\nrailway up',
        notes: 'Includes $5 free trial credit.'
      }
    ],
    configSnippet: {
      filename: 'render.yaml',
      content: `services:
  - type: web
    name: my-web-app
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html`
    },
    features: {
      freeTierBandwidth: '100 GB / month',
      customDomain: true,
      automaticSSL: true,
      gitIntegration: true,
      serverlessFunctions: true,
      ddosProtection: true,
    },
    pros: [
      'Easy fullstack support (Web + Background Workers + Postgres)',
      'Git push deployments and environment variables dashboard',
      'Generous free/hobby tiers'
    ],
    cons: [
      'Free web services on Render spin down after 15 minutes of inactivity'
    ]
  },
  {
    id: 'aws-s3-cloudfront',
    name: 'AWS S3 + CloudFront',
    tagline: 'Enterprise-grade ultra scalable cloud static hosting',
    badge: 'Enterprise Grade',
    icon: 'HardDrive',
    logoColor: '#ff9900',
    difficulty: 'Advanced',
    cost: 'Pay-as-you-go',
    deployTime: '2-3 minutes',
    bestFor: 'Companies and enterprise teams requiring AWS IAM compliance and global CloudFront CDN.',
    recommended: false,
    steps: [
      {
        title: 'Step 1: Upload to S3 Bucket',
        description: 'Build your project and synchronize the `dist/` directory to your AWS S3 bucket configured for static web hosting.',
        command: 'npm run build\naws s3 sync dist/ s3://my-web-app-bucket --delete',
        notes: 'Set bucket policy for public read or CloudFront Origin Access Identity (OAI).'
      },
      {
        title: 'Step 2: CloudFront Distribution + ACM SSL',
        description: 'Create CloudFront distribution pointing to S3 origin. Configure custom error response (404/403 -> /index.html 200 OK) for SPA routing.',
        notes: 'Attach free AWS Certificate Manager (ACM) SSL certificate.'
      }
    ],
    configSnippet: {
      filename: 's3-bucket-policy.json',
      content: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-web-app-bucket/*"
    }
  ]
}`
    },
    features: {
      freeTierBandwidth: 'AWS 12-month Free Tier',
      customDomain: true,
      automaticSSL: true,
      gitIntegration: true,
      serverlessFunctions: true,
      ddosProtection: true,
    },
    pros: [
      '99.999999999% durability and virtually infinite scale',
      'Extremely inexpensive for static sites (often < $0.50/month)',
      'Enterprise AWS security and IAM integrations'
    ],
    cons: [
      'AWS Console setup is complex with IAM permissions, Route 53, ACM, and CloudFront'
    ]
  }
];
