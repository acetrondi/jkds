# jkds

A portfolio website for architectural visualizations, built with React + TypeScript + Vite, deployed on Cloudflare Pages.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui
- Cloudflare Pages + Pages Functions (serverless API)
- GitHub API for content publishing

## Local development

```sh
# Install dependencies
npm install

# Start dev server (port 8080)
npm run dev

# Start with Cloudflare Workers (for admin API routes)
npx wrangler pages dev --compatibility-date=2024-01-01
```

## Environment variables

For local dev, create a `.dev.vars` file (never commit this):

```
GITHUB_TOKEN=your_pat
GITHUB_REPO=owner/repo
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```

For production, set these in Cloudflare Pages → Settings → Environment variables.

## Deployment

Push to `main` — Cloudflare Pages builds and deploys automatically.
