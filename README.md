# Wiltech Labs - Live Projects

Showcase and discovery portal for Wiltech Labs applications, APIs, and engineering platforms. Built with Angular 22, NgRx SignalStore, and Material 3 design.

## Cloudflare Pages Deployment Configuration

When deploying this project to **Cloudflare Pages**:

| Setting | Value |
| --- | --- |
| **Production branch** | `main` |
| **Framework preset** | `None` / `Angular` |
| **Root directory** | `/live-projects-ui` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist/live-projects-ui/browser` |
| **Node.js Version** | `24.19.0` |

Cloudflare Pages uses the `.nvmrc` or `.node-version` file at the configured
root directory. If `NODE_VERSION` is set in the Pages project environment,
set it to `24.19.0` as well. Angular 22's build tooling requires Node.js
`24.15.0` or newer in the 24.x line.

If the Pages root directory is the repository root (`/`) instead, use
`cd live-projects-ui && npm run build` and set the build output directory to
`live-projects-ui/dist/live-projects-ui/browser`.

### SPA Client-Side Routing on Page Reload
- Cloudflare Pages rewrites all sub-routes (e.g., `/project/:id`) to `/index.html` with status `200` via `public/_redirects` (`/*  /index.html  200`).
- This prevents 404 errors when reloading or directly navigating to deep URLs.
