# Unreal

A small Next.js 15 (App Router) site with a minimal neumorphic look, light/dark themes and responsive layout. Built to be deployed on Vercel as `unreal.vercel.app`.

| Route       | What it is                                    | Access                                |
| ----------- | --------------------------------------------- | ------------------------------------- |
| `/`         | Landing page                                  | everyone                              |
| `/login`    | Sign in                                       | signed out (signed in → `/ps`)        |
| `/register` | Create account                                | signed out (signed in → `/ps`)        |
| `/ps`       | Personal area: profile, account, plan         | signed in (else → `/login?next=/ps`)  |
| `/panel`    | Admin panel: user list, role/suspend/delete   | admins (users → `/ps?denied=panel`)   |
| `/purchase` | Plans. Checkout is **disabled** ("Coming soon") | everyone                            |

## Run locally

Needs Node 18.18+.

```bash
npm install
cp .env.example .env.local    # then set AUTH_SECRET (see the file for a generator command)
npm run dev                   # http://localhost:3000
```

Production build check: `npm run build && npm start`.

### Demo accounts (mock auth)

Seeded from `lib/demo-users.ts`:

- admin: `admin@unreal.test` / `admin-demo-123`
- user: `user@unreal.test` / `user-demo-123`

Set `DISABLE_DEMO_USERS=1` to turn them off.

## Auth: this is a MOCK, swap it before real use

- Users live **in server memory** (`lib/users.ts`). They reset on every restart, and on Vercel each serverless instance has its own copy, so registered accounts and panel changes are not durable.
- The session is a real HMAC-signed, httpOnly cookie (`lib/session.ts`) signed with `AUTH_SECRET`. That part can stay.
- Guards: `middleware.ts` redirects first; `lib/auth.ts` (`requireUser`, `requireAdmin`) re-checks inside each protected page.
- To go real, replace the functions in `lib/users.ts` (`verifyCredentials`, `createUser`, `listUsers`, `updateUser`, `deleteUser`, `findUserById`) with a database or auth provider. Nothing else needs to change. Keep any keys in env vars.

## Purchase

`/purchase` reads placeholder plans from `lib/plans.ts`. There's no payment integration: buttons are disabled and a banner says checkout is coming soon.

## Deploy to Vercel

1. Push this folder to a Git repo (`.env*` files are gitignored; only `.env.example` is committed).
2. In Vercel: **Add New → Project**, import the repo. Framework preset: Next.js (defaults are fine).
3. **Settings → Environment Variables**: add `AUTH_SECRET` (32+ random characters). Without it, signed-in pages throw in production.
4. Deploy. To get `unreal.vercel.app`, name the project `unreal` (or set it under **Settings → Domains**) if that name is free.

Or with the CLI: `npx vercel` (preview) / `npx vercel --prod`.

## Structure

```
app/            routes (login, register, ps, panel, purchase), actions.ts (server actions), globals.css
components/     NavLinks, ThemeToggle, AuthForms, ProfileForm
lib/            session.ts (signed cookie, edge-safe), auth.ts (guards), users.ts (mock store), plans.ts
middleware.ts   route guards
```
