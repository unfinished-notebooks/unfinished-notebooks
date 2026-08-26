# Unfinished Notebooks

The home and shared identity service for **unfinishednotebooks.com**.

Current featured notebooks:

- **PKO** — `pko.unfinishednotebooks.com`
- **Run It Back** — `runitback.unfinishednotebooks.com`
- **In the Margins** — placeholder section for future notes/blog content

Whalen and Hevik are intentionally **not included** in this starter.

## Stack

- React
- TypeScript
- Vite
- pnpm
- Plain CSS
- Better Auth
- PostgreSQL (Neon)
- Resend magic-link email
- Vercel Functions

## Shared identity

Unfinished Notebooks owns the account shared by every notebook. Authentication
is served from `unfinishednotebooks.com/api/auth`, and production session
cookies are scoped to `.unfinishednotebooks.com`. This means a user can sign in
from UN, PKO, or Run It Back and remain signed in across all three.

The identity database contains users, sessions, verification tokens, and the
global `user` or `admin` role. PKO and Run It Back should keep their application
data and product-specific permissions in their own databases.

Routes:

- `/login` — request a one-time sign-in link
- `/account` — view the current shared account and sign out
- `/admin` — global-admin landing page
- `/api/auth/*` — Better Auth API

## Configure auth

1. Create a Neon Postgres database for shared UN identity.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` to the Neon pooled connection string.
4. Generate a secret with `openssl rand -base64 32` and set
   `BETTER_AUTH_SECRET`.
5. Set `BETTER_AUTH_URL=http://localhost:3000` locally and
   `https://unfinishednotebooks.com` in Vercel.
6. Create a Resend API key and set `RESEND_API_KEY`.
7. Verify `unfinishednotebooks.com` in Resend and set `AUTH_EMAIL_FROM`.
8. Apply the Better Auth schema with `pnpm auth:migrate`.

In local development, a missing Resend key prints the one-time link to the
server console. Production intentionally fails instead of exposing or silently
dropping a login link.

To make the first account an administrator after it has signed in once:

```sql
UPDATE "user"
SET "role" = 'admin'
WHERE "email" = 'your-email@example.com';
```

Every later role change should go through Better Auth's authenticated admin API.

## Use auth from a subdomain app

Install `better-auth`, configure its React client with the UN origin, and include
credentials:

```ts
import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: 'https://unfinishednotebooks.com',
  fetchOptions: { credentials: 'include' },
  plugins: [magicLinkClient()],
})
```

Protected server operations must validate the session through Better Auth; a
client-side route check is only presentation, not authorization.

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
pnpm dev:vercel
```

Vercel will serve the frontend and auth function together at:

```text
http://localhost:3000
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

The intended structure is:

```text
unfinishednotebooks.com
├── pko.unfinishednotebooks.com
└── runitback.unfinishednotebooks.com
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
