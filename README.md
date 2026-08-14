# Unfinished Notebooks — Landing Page

A small, deployable landing page for **unfinishednotebooks.com**.

Current featured notebooks:

- **PKO** — `pko.unfinishednotebooks.com`
- **75 Steady** — `steady.unfinishednotebooks.com`
- **In the Margins** — placeholder section for future notes/blog content

Whalen and Hevik are intentionally **not included** in this starter.

## Stack

- React
- TypeScript
- Vite
- pnpm
- Plain CSS
- No backend required for the landing page

## Prerequisites

Install a current Node.js version and pnpm.

If you have Corepack available:

```bash
corepack enable
```

Otherwise:

```bash
npm install -g pnpm
```

This project declares its package manager in `package.json`.

## Run locally

```bash
pnpm install
pnpm dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173
```

## Production build

```bash
pnpm build
```

The production files will be created in `dist/`.

---

# Put this into your new GitHub account

## 1. Create an empty repository

In your new **unfinished-notebooks** GitHub account, create a repository named:

```text
unfinished-notebooks
```

Do **not** initialize it with a README, .gitignore, or license because those files already exist here.

## 2. Open Terminal in this folder

```bash
cd /path/to/unfinished-notebooks-starter-pnpm
```

## 3. Install dependencies first

```bash
pnpm install
```

This creates the `pnpm-lock.yaml` file you should commit.

## 4. Initialize Git and push

```bash
git init
git add .
git commit -m "Initial Unfinished Notebooks landing page"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/unfinished-notebooks.git
git push -u origin main
```

Replace `YOUR-GITHUB-USERNAME` with the username of the GitHub account you created.

---

# Deploy to Vercel

1. Sign in to Vercel.
2. Choose **Add New → Project**.
3. Import the `unfinished-notebooks` GitHub repository.
4. Vercel should automatically detect **Vite** and **pnpm** from `package.json` / `pnpm-lock.yaml`.
5. Confirm:
   - Install command: `pnpm install`
   - Build command: `pnpm build`
   - Output directory: `dist`
6. Deploy.

Vercel will first give you a temporary `*.vercel.app` URL.

---

# Connect unfinishednotebooks.com

After the Vercel deployment works:

1. Open the project in Vercel.
2. Go to **Settings → Domains**.
3. Add:

```text
unfinishednotebooks.com
```

4. Also add:

```text
www.unfinishednotebooks.com
```

5. Vercel will tell you which DNS records to add.
6. Open Cloudflare → `unfinishednotebooks.com` → **DNS → Records**.
7. Add the exact records Vercel requests.
8. Do **not** remove your Google Workspace MX records.

Cloudflare will continue handling your DNS while Vercel hosts the site.

---

# Future subdomains

PKO and Steady should remain separate deployable apps/projects.

Eventually:

```text
unfinishednotebooks.com
├── pko.unfinishednotebooks.com
└── steady.unfinishednotebooks.com
```

Each subdomain can point to its own Vercel project.

The links on this landing page already use those future URLs. Until the apps are connected, those links will not resolve.

---

# Easy first edits

Most homepage content is in:

```text
src/App.tsx
```

Most visual styling is in:

```text
src/styles.css
```

The email link currently uses:

```text
me@unfinishednotebooks.com
```

The small notebook/favicon mark is:

```text
public/favicon.svg
```

The logo in the site itself is currently CSS-based so the starter has no image dependencies. It can be replaced later with the final Unfinished Notebooks logo.
