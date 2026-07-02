# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website: an Angular 20 frontend (prerendered/SSG via `@angular/ssr` with `outputMode: "static"`) plus a small PHP backend in `src/sendmail/` that handles the contact form (CSRF token, captcha, rate limiting, email via sendmail). In production both are served by a single Apache+PHP container; the Angular build output and the PHP files live side by side under the web root.

## Commands

```bash
npm start                                        # ng serve (dev server on :4200)
ng serve --proxy-config proxy.conf.json          # dev server with /sendmail/* proxied to production
npm run build                                    # ng build (production config is the default)
npm test                                         # Karma/Jasmine unit tests (watch mode)
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

The PHP backend needs a `.env` (see `template.env`: `ALLOWED_ORIGINS`, `TO_EMAIL`, `FROM_EMAIL`, `ERROR_LOG`). PHP code style is PSR-12, checked with `phpcs` using `phpcs.xml`.

## Git Hooks & Commit Conventions

Husky enforces:
- **pre-commit**: `lint-staged` (eslint --fix on TS/HTML via `ng-lint-staged`, prettier on JS/JSON, stylelint --fix on SCSS)
- **commit-msg**: commitlint with `@commitlint/config-conventional` — commit messages must be Conventional Commits (`feat:`, `fix:`, `ci:`, etc.)
- **pre-push**: runs `ng test --watch=false` and `ng build` — pushes fail if tests or the build fail

## Architecture

- **Standalone components with NgModules as import bundles**: every component is standalone; the NgModules (`AppModule`, `SharedModule`, `LandingModule`, `ContactModule`) contain no declarations — they exist only to group and re-export sets of standalone components/directives. New components should be standalone and get added to the relevant bundle module's `dependencies` array.
- **Routing** (`src/app/app.routes.ts`): two routes — `''` → `LandingComponent`, `imprint` → `ImprintComponent`. All routes are prerendered (`RenderMode.Prerender` in `app.routes.server.ts`). The landing page is composed of section components under `src/app/routing/components/landing/` (introduction, about-me, my-skills, portfolio, contact).
- **Shared code** lives in `src/app/shared/`: `FeedbackService` (toast-style user feedback), scroll directives, shared UI components (logo, section-title, social), interfaces, and `shared-utils.ts`.
- **Contact form flow**: `ContactComponent` fetches a CSRF token and captcha image from `/sendmail/*` PHP endpoints, then POSTs multipart form data to `/sendmail/index.php`, which validates origin, rate limit, CSRF token, captcha, and payload before sending mail. In dev, `proxy.conf.json` forwards `/sendmail/*` to the live site; in Docker, MailHog captures outgoing mail.
- **Styles**: SCSS with `stylePreprocessorOptions.includePaths: ["src/styles"]` — partials in `src/styles/` (components, fonts, utils) can be imported by bare name from any component stylesheet.
- **SSR entry points**: `src/main.server.ts` and `src/server.ts` (Express) exist, but the build output mode is `static` — `server.ts` matters for prerendering, not runtime; production serving is Apache.
- **Assets beyond the usual**: `angular.json` also copies `src/.htaccess`, `robots.txt`, `sitemap.xml`, and the entire `src/sendmail/` directory into the build output.

## CI (GitHub Actions)

- `lint.yml` on every push; `build.yml` and `test.yml` on PRs; `image_scan.yml` runs a Trivy scan of the Docker image.
- `deploy.yml` deploys on `v*.*.*` tags (runs test + lint + build, then FTP-uploads the artifact). `workflow_dispatch` with `dry_run` is available.
- Composite actions in `.github/actions/` handle npm/composer caching.

## Code Style Notes

- Prettier: single quotes, 120 char print width, 2-space indent, LF line endings (double quotes in SCSS).
- Components use `inject()` rather than constructor injection.
