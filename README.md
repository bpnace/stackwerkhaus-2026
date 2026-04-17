# Stackwerkhaus

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Status](https://img.shields.io/badge/status-active_development-1F2937)](#)

Modern App Router rebuild of the Stackwerkhaus marketing site. The project is a German-first business website focused on service positioning, case studies, blog publishing, conversion-oriented landing content, and a lightweight contact pipeline.

## Overview

This repository is not a generic starter. It is a content-driven production site with:

- a custom homepage and section-based marketing layout
- routed blog and project detail pages
- local MDX content collections for editorial and portfolio content
- technical SEO primitives such as metadata, `robots.ts`, and `sitemap.ts`
- motion-enhanced UI with reduced-motion-safe GSAP client islands
- a contact endpoint that can run in preview mode without live email delivery

## Tech Stack

- `Next.js 16` with the App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `GSAP` and `@gsap/react`
- `next-mdx-remote` for local MDX content rendering
- `Resend` for contact email delivery

## Project Structure

```text
app/            App Router pages, metadata routes, and API handlers
components/     Layout, section, UI, and MDX rendering components
content/        Local MDX content for blog posts and project entries
lib/            Site config, content loaders, animation helpers, utilities
public/         Static images, icons, logos, and project assets
scripts/        Content and smoke test scripts
tests/          Additional verification assets
```

## Getting Started

### Prerequisites

- Node.js 22.19+
- `pnpm`

### Install

```bash
pnpm install
```

### Start the Development Server

```bash
pnpm dev
```

The app runs locally with Next.js development tooling and uses `.env.local` for local configuration.

## Available Scripts

```bash
pnpm dev                  # start local development
pnpm build                # production build
pnpm start                # run the built app
pnpm lint                 # eslint across the repo
pnpm typecheck            # TypeScript without emit
pnpm test:content         # content-level checks
pnpm test:drupal-richtext # Drupal rich text parser tests
pnpm test:mobile          # rich text tests + mobile smoke pass
pnpm test:smoke           # rich text tests + general smoke pass
pnpm start:local-prod     # start local production server on 127.0.0.1:3000
pnpm lighthouse           # run local Lighthouse budgets for home, blog, and project detail
```

## Environment Variables

Copy `.env.example` to `.env.local` and provide only what you need for the current environment:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata and sitemap generation |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables analytics integration when set |
| `RESEND_API_KEY` | Enables live contact email delivery |
| `CONTACT_TO_EMAIL` | Override recipient for inbound contact submissions |
| `STACKWERKHAUS_BLOG_SOURCE` | `auto` by default, `local` for hermetic local verification |
| `SMOKE_BASE_URL` | Base URL for local smoke and Lighthouse validation |
| `SMOKE_BLOG_SLUG` | Deterministic local blog detail slug for verification |

### Runtime Behavior

- If `RESEND_API_KEY` is missing, the contact API stays in validation-only preview mode and returns a successful non-sending response.
- If `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is missing, analytics remains disabled in local and preview environments.
- If `STACKWERKHAUS_BLOG_SOURCE=local`, blog loaders skip Drupal and read only local MDX content.

## Hermetic Local Verification

Use `.env.local.test` for all local signoff work. It pins canonicals to `http://127.0.0.1:3000`, forces blog content to local MDX, and gives the smoke/Lighthouse scripts deterministic route inputs.

```bash
set -a
source .env.local.test
pnpm build
pnpm start:local-prod
```

Run verification in a second shell with the same env loaded:

```bash
set -a
source .env.local.test
pnpm lint
pnpm typecheck
pnpm test:content
pnpm test:smoke
pnpm test:mobile
pnpm lighthouse
```

The Lighthouse runner enforces full budgets for the blog and project detail routes. The homepage still audits accessibility, best practices, and SEO, but it treats a `performance: null` result as a warning because the hero shell intentionally stays hidden until the intro animation is ready.

## Content Workflow

- Blog posts live in `content/blog`
- Project entries live in `content/projects`
- Routed detail pages are generated from local content loaders in `lib/`
- The default site language and marketing copy are German

## Notes for Development

- Motion is intentionally isolated to client components and includes reduced-motion-safe fallbacks.
- The site-level metadata is centrally defined through `lib/site-config.ts` and `app/layout.tsx`.
- The contact flow is implemented in `app/api/contact/route.ts`.
- SEO support is part of the app surface, including `app/sitemap.ts` and `app/robots.ts`.
