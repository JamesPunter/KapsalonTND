# Netlify Hosting Checklist (Manual Upload + Git)

Use this checklist before every deployment.

## A. Choose deployment mode

- [ ] I know which mode I will use:
- [ ] Manual upload (drag-drop `dist`) OR
- [ ] Git-connected deploy

## B. Project build readiness

- [ ] `npm run build` succeeds locally
- [ ] Build output directory is confirmed (`dist` for Vite)
- [ ] Lockfile is committed (`package-lock.json` / `pnpm-lock.yaml` / `yarn.lock`)
- [ ] Required environment variables are set correctly for production

## C. SPA routing safety (React Router / Vue Router / etc.)

- [ ] SPA fallback exists so deep links do not 404 on refresh:
- [ ] `public/_redirects` contains exactly:

```txt
/* /index.html 200
```

- [ ] After build, `dist/_redirects` exists

## D. Asset/base-path safety

- [ ] Production base path is correct for host target
- [ ] No hardcoded old host paths (for example `/repo-name/`) unless intentionally needed
- [ ] Favicon, images, JS, and CSS all load in production build

## E. Manual upload flow (no Git import)

- [ ] I understand manual upload uses the uploaded `dist` contents directly
- [ ] I am not relying on Netlify build settings to run during drag-drop deploy
- [ ] Run `npm run build`
- [ ] Upload only the `dist` folder to Netlify
- [ ] Do not upload `src`, `node_modules`, or project root
- [ ] After deploy, open homepage and at least 2 deep links directly

## F. Git-connected flow (if used later)

- [ ] Build command is set (`npm run build`)
- [ ] Publish directory is set (`dist`)
- [ ] Node version is pinned in Netlify or `.nvmrc`
- [ ] `netlify.toml` is valid (if used)

## G. Post-deploy verification

- [ ] Hard refresh works on route URLs (example: `/amsterdam`, `/zaandam`)
- [ ] Mobile layout checks pass
- [ ] Contact links and external links work
- [ ] 404 behavior is intentional
- [ ] No console errors blocking core functionality
