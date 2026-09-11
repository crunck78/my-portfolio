# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website: an Angular 20 frontend (prerendered/SSG via `@angular/ssr` with `outputMode: "static"`) plus a small PHP backend in `src/sendmail/` that handles the contact form (CSRF token, captcha, rate limiting, email via sendmail). In production both are served by a single Apache+PHP host; the Angular build output and the PHP files live side by side under the web root, with `.htaccess` guarding the sensitive files.

## Commands

```bash
npm start                                        # ng serve (dev server on :4200)
ng serve --proxy-config proxy.conf.json          # dev server with /sendmail/* proxied to the live site
npm run build                                    # ng build (production config is the default)
npm test                                         # Karma/Jasmine unit tests (watch mode, Chrome)
npm test -- --watch=false --browsers=ChromeHeadless   # single run, as CI does
ng test --include src/app/path/to/some.spec.ts   # run a single spec file
npm run lint                                     # angular-eslint over src/**/*.ts and src/**/*.html
npx stylelint "src/**/*.scss" --fix              # SCSS lint (stylelint-config-standard-scss)
npx auditjs ossi                                 # dependency vulnerability check
```

Docker (full stack incl. PHP mail backend):

```bash
docker compose up --build    # web on :8080, MailHog UI on :8025 (SMTP :1025)
```

The PHP backend needs a `.env` next to the web root (see `template.env`: `ALLOWED_ORIGINS`, `TO_EMAIL`, `FROM_EMAIL`, `ERROR_LOG`); `bootstrap.php` loads it via phpdotenv from `../vendor` (`composer install`). PHP code style is PSR-12, checked with `phpcs` using `phpcs.xml`.

## Git Hooks & Commit Conventions

Husky enforces:
- **pre-commit**: `lint-staged` (eslint --fix on TS/HTML via `ng-lint-staged`, prettier on JS/JSON, stylelint --fix on SCSS)
- **commit-msg**: commitlint with `@commitlint/config-conventional` — commit messages must be Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, …)
- **pre-push**: runs `ng test --watch=false` and `ng build` — pushes fail if tests or the build fail

The PR template (`.github/pull_request_template.md`) has a checklist that matters for this repo: new sensitive files must be denied in `src/.htaccess`; `src/sitemap.xml` and the JSON-LD block in `src/index.html` must be updated when content changes; components should use OnPush change detection and typed forms.

## Architecture

- **Standalone components with NgModules as import bundles**: every component is standalone; the NgModules (`AppModule`, `SharedModule`, `LandingModule`, `ContactModule`, `FormFieldModule`, `PortfolioModule`, `MySkillsModule`, `HeaderModule`, `FooterModule`) contain no declarations — each holds a `dependencies` array that it both imports and exports. A component imports its bundle module (e.g. `imports: [ContactModule]`). New components should be standalone and get added to the relevant bundle module's `dependencies` array.
- **Routing** (`src/app/app.routes.ts`): two routes — `''` → `LandingComponent`, `imprint` → `ImprintComponent`. All routes are prerendered (`RenderMode.Prerender` for `**` in `app.routes.server.ts`). The landing page is composed of section components under `src/app/routing/components/landing/` (introduction, about-me, my-skills, portfolio, contact). Section navigation uses the `appScrollTo` directive (`ScrollToDirective`), which navigates back to `/` if needed and then smooth-scrolls to the element whose `id` matches — so each section must keep a stable `id`.
- **Prerendering constraints**: because every route is prerendered, browser-only work (timers, `window`, DOM access) must be guarded, e.g. with `afterNextRender()` as the contact component does for its captcha countdown.
- **Shared code** lives in `src/app/shared/`: `FeedbackService` (root-provided toast-style feedback, rendered by `FeedbackComponent`), scroll directives, shared UI components (logo, section-title, social).
- **Contact form flow** (`ContactComponent`, OnPush + signals): the component loads a captcha image from `/sendmail/captcha.php` and auto-refreshes it every 10 minutes with a visible countdown (PHP session GC would otherwise expire it). On submit it fetches a fresh CSRF token from `/sendmail/csrfToken.php`, then POSTs multipart form data to `/sendmail/index.php`. The PHP side (`functions.php`) checks origin → method → content type → CSRF → captcha → payload, and only then applies the rate limit (`checkLastRequestTime`) so a rejected attempt does not lock the user into a cooldown. Errors come back as JSON `{ detail }` and are shown through `FeedbackService`. In dev, `proxy.conf.json` forwards `/sendmail/*` to the live site; in Docker, MailHog captures outgoing mail via `mhsendmail`.
- **Styles**: SCSS with `stylePreprocessorOptions.includePaths: ["src/styles"]` — partials in `src/styles/` (`components/`, `utils/`, `fonts/`) are loaded by bare path from any component stylesheet, e.g. `@use "utils/variables";`. Production budgets cap component styles at 4kb (error) so keep component SCSS small and put shared rules in `src/styles/components/`.
- **SSR entry points**: `src/main.server.ts` and `src/server.ts` (Express) exist, but the output mode is `static` — `server.ts` matters for prerendering, not runtime; production serving is Apache.
- **Assets beyond the usual**: `angular.json` also copies `src/.htaccess`, `robots.txt`, `sitemap.xml`, and the entire `src/sendmail/` directory into the build output. `.htaccess` denies access to `vendor/`, `.env`, error logs and the internal PHP/asset files, blocks AI crawlers by user agent, and sets caching headers and a CSP `frame-ancestors` policy.

## CI (GitHub Actions)

- `lint.yml` on every push; `build.yml` and `test.yml` on PRs (all three are also reusable via `workflow_call`).
- `deploy.yml` deploys on `v*.*.*` tags: runs test + lint + build, writes the `.env` from secrets, then FTP-uploads the artifact. `workflow_dispatch` with `dry_run` (default true) only verifies the artifact.
- Composite actions in `.github/actions/` handle npm/composer caching.

## Code Style Notes

- Prettier: single quotes, 120 char print width, 2-space indent, LF line endings (double quotes in SCSS).
- Components use `inject()` rather than constructor injection; prefer signals/`computed` for template state and `takeUntilDestroyed(destroyRef)` for subscriptions.
