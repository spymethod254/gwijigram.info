import { ConfigTemplate } from '../types';

export const CONFIG_TEMPLATES: ConfigTemplate[] = [
  {
    id: 'dockerfile',
    title: 'Production Dockerfile (Multi-Stage Node + Nginx)',
    filename: 'Dockerfile',
    description: 'Ultra-lightweight (under 25MB) two-stage Docker container. Builds React in Node 20 alpine and serves with optimized Nginx.',
    category: 'Docker & VPS',
    instructions: 'Place in project root. Run: `docker build -t my-app . && docker run -p 8080:80 my-app`',
    code: `# Multi-stage Build Dockerfile for React + Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
RUN npm ci

# Copy source code and build production bundle
COPY . .
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Copy built static files to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]`
  },
  {
    id: 'nginx-conf',
    title: 'Nginx Configuration with SPA Routing & Caching',
    filename: 'nginx.conf',
    description: 'Nginx server block with Single Page Application (SPA) HTML5 pushState fallback routing, gzip compression, and caching headers.',
    category: 'Server',
    instructions: 'Place in root directory next to Dockerfile or inside /etc/nginx/conf.d/ on your VPS.',
    code: `server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html index.htm;

    # Gzip compression for faster transfers
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json image/svg+xml;

    # SPA fallback: all unknown routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # High performance caching for fingerprinted assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}`
  },
  {
    id: 'docker-compose',
    title: 'Docker Compose (Web + Reverse Proxy)',
    filename: 'docker-compose.yml',
    description: 'Docker Compose setup with automatic restart and environment variable passing.',
    category: 'Docker & VPS',
    instructions: 'Run `docker-compose up -d --build` to launch your application in background.',
    code: `version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: production_web_app
    ports:
      - "3000:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3`
  },
  {
    id: 'github-actions-deploy',
    title: 'GitHub Actions Auto-Deploy to GitHub Pages',
    filename: '.github/workflows/deploy.yml',
    description: 'Continuous Integration / Continuous Deployment (CI/CD) workflow that builds and publishes your site on every push to main.',
    category: 'CI/CD',
    instructions: 'Create folder `.github/workflows/` and save as `deploy.yml`. Enable Pages in repository settings.',
    code: `name: Build and Deploy to GitHub Pages

on:
  push:
    branches:
      - main

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
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Bundle
        run: npm run build

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`
  },
  {
    id: 'vercel-config',
    title: 'Vercel Custom Routing & Cache Headers',
    filename: 'vercel.json',
    description: 'Configuration for client-side routing fallback and aggressive asset caching on Vercel Edge CDN.',
    category: 'Cloud Platform',
    instructions: 'Place in project root next to package.json.',
    code: `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
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
  {
    id: 'netlify-config',
    title: 'Netlify Build & Redirect Configuration',
    filename: 'netlify.toml',
    description: 'Netlify build directives, environment variables, and client-side single page app routing.',
    category: 'Cloud Platform',
    instructions: 'Place in project root next to package.json.',
    code: `[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "20"

# Redirect all requests to index.html for React Router / SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Cache fingerprinted assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"`
  },
  {
    id: 'env-example',
    title: 'Environment Variables Template (.env.example)',
    filename: '.env.example',
    description: 'Template for public and secret environment variables in Vite.',
    category: 'Cloud Platform',
    instructions: 'Copy to `.env` or `.env.local` for local development. In Vite, prefix frontend variables with `VITE_`.',
    code: `# Vite Client-Side Environment Variables
# (Prefix with VITE_ to expose to browser code)
VITE_APP_TITLE="My Production Web App"
VITE_API_BASE_URL="https://api.yourdomain.com/v1"
VITE_SUPABASE_URL="https://xyzcompany.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Server/Secret Variables (NEVER expose to client code or commit to Git)
# DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
# STRIPE_SECRET_KEY="sk_live_..."
# JWT_SECRET="your-ultra-secure-random-secret"`
  }
];
