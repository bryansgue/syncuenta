
tree -I "node_modules|.next" -L 6 > arbol.txt


## Quick repository overview

- Framework: Next.js (app router). Project contains both a root `app/` and `src/app/` directories; most application logic and auth pages live under `src/`.
- Auth & backend: Supabase is the primary backend (see `src/lib/supabaseClient.ts`). The app uses `@supabase/auth-helpers-nextjs` both in client code and middleware.
- Styling: Tailwind is configured as a dependency and global styles live in `app/globals.css` (fonts are loaded in `app/layout.tsx`).

## How to run

- Development server: `npm run dev` (see `package.json`).
- Build: `npm run build`; Start: `npm run start`.
- Lint: `npm run lint` (alias to `eslint`).

When running locally you must provide environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Important paths & conventions

- `src/lib/supabaseClient.ts` — single Supabase client used across the app. It reads from the `NEXT_PUBLIC_...` env vars.
- `src/app/login/page.tsx` — client-side login page using `supabase.auth.signInWithOtp` and a hard-coded `emailRedirectTo` of `http://localhost:3000/dashboard` (dev behavior).
- `src/middleware.ts` — server middleware using `createMiddlewareSupabaseClient({ req, res })` to protect `/dashboard` (see `config.matcher`).
- `app/layout.tsx` and `app/page.tsx` — top-level UI and global CSS; note fonts are loaded via `next/font/google`.
- `tsconfig.json` — path alias: `@/*` -> `src/*` (import with `@/lib/supabaseClient`).

## Authentication & protected routes (concrete pattern)

- The middleware registers a matcher for `/dashboard` and redirects unauthenticated users to `/login`:

  - Code reference: `src/middleware.ts`
  - Pattern: create middleware supabase client -> `const { data: { session } } = await supabase.auth.getSession()` -> if no session, redirect.

- Client code should use the shared `supabase` client from `src/lib/supabaseClient.ts`. Example import used in the repo:

  import { supabase } from '@/lib/supabaseClient';

## Import and path rules

- Use the `@/` alias for imports referencing `src/` (configured in `tsconfig.json`). Prefer absolute alias imports over relative paths for project files.

## Small actionable examples (copy/paste friendly)

- Send a magic link (existing pattern):

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: 'http://localhost:3000/dashboard' },
  });

- Middleware redirect (server-side):

  const supabase = createMiddlewareSupabaseClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.redirect(new URL('/login', req.url));

## Project-specific conventions & gotchas

- The repo mixes a root `app/` and `src/app/`. For edits related to authentication and pages shown in production, prefer files under `src/` (e.g., `src/app/login`).
- Environment values used in client code are `NEXT_PUBLIC_*` — confirm these exist in the deployment environment. Some URLs (like redirect targets) are hard-coded to `http://localhost:3000`.
- TypeScript is strict (`tsconfig.json` sets `strict: true`) — provide types where appropriate and prefer exported helpers for shared logic.

## Where to look for changes

- Add backend integration logic: `src/lib/supabaseClient.ts` and `src/app/*` pages.
- Change auth flow or protections: `src/middleware.ts` and `src/app/login/page.tsx`.
- Styling & global UI: `app/layout.tsx` and `app/globals.css`.

## If something looks missing

- There is a protected route `/dashboard` referenced by middleware and login redirects but no `src/app/dashboard` file in the current tree — check whether the dashboard is implemented elsewhere or should be added.

---

If any of these notes are unclear or you want me to merge a different agent instruction file, tell me which sections to expand and I will iterate. 
