# Stackwerkhaus Website

[![CI](https://github.com/bpnace/stackwerkhaus-2026/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bpnace/stackwerkhaus-2026/actions/workflows/ci.yml)
[![Deploy](https://github.com/bpnace/stackwerkhaus-2026/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/bpnace/stackwerkhaus-2026/actions/workflows/deploy.yml)
![Version](https://img.shields.io/badge/version-0.1.0-2563EB?style=flat-square)
![Status](https://img.shields.io/badge/status-current_showcase-1F2937?style=flat-square)
![Security](https://img.shields.io/badge/security-Dependabot_%2B_CodeQL-2ea043?style=flat-square)
![License](https://img.shields.io/badge/license-proprietary_portfolio_review-6B7280?style=flat-square)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.19-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-lockfile_v9-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![GSAP](https://img.shields.io/badge/GSAP-motion-88CE02?logo=greensock&logoColor=000000)](https://gsap.com/)

![Stackwerkhaus live homepage](public/readme/stackwerkhaus-home.png)

Current production website for Stackwerkhaus. The project is the public business
site for a German-first web and automation studio, combining service
positioning, case-study content, Drupal-backed publishing, conversion-oriented
landing sections, and a lightweight contact pipeline.

## Case study

### Problem
Stackwerkhaus needed more than a personal portfolio: the site has to explain the
offer, show credible project work, publish content, and convert qualified
inquiries without feeling like a generic agency template.

### Solution
I built a content-driven Next.js 16 site with a sharp German positioning layer,
routed service and project pages, Drupal blog publishing, local MDX case
studies, technical SEO primitives, and reduced-motion-safe GSAP islands.

### Engineering decisions
- Use App Router metadata routes for sitemap, robots, and canonical structure
- Keep motion isolated in client components so content and SEO stay server-first
- Support local preview mode when live email credentials are not available
- Separate Drupal blog content from local project case studies
- Keep verification scripts close to the publishing and smoke-test paths

### Outcome
The repository now represents the live Stackwerkhaus website and should be read
as a current production case, not an old portfolio rebuild experiment.

## What this shows

- Production-oriented Next.js 16 / React 19 implementation
- German-first content architecture for services, case studies, and landing pages
- Drupal-backed blog publishing plus local MDX project content
- SEO primitives, sitemap generation, robots handling, and metadata structure
- Motion-enhanced UI with reduced-motion-safe GSAP client islands
- Contact flow that can run locally without live email delivery

## Overview

This repository is not a generic starter. It is a content-driven production site with:

- a custom homepage and section-based marketing layout
- routed blog and project detail pages
- Drupal-backed blog publishing plus local MDX project entries
- technical SEO primitives such as metadata, `robots.ts`, and `sitemap.ts`
- motion-enhanced UI with reduced-motion-safe GSAP client islands
- a contact endpoint that can run in preview mode without live email delivery

## Tech Stack

- `Next.js 16` with the App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `GSAP` and `@gsap/react`
- `next-mdx-remote` for local project MDX rendering
- `Resend` for contact email delivery

## Project Structure

```text
app/            App Router pages, metadata routes, and API handlers
components/     Layout, section, UI, and MDX rendering components
content/        Local MDX content for project entries
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
| `SMOKE_BASE_URL` | Base URL for local smoke and Lighthouse validation |
| `SMOKE_BLOG_SLUG` | Deterministic Drupal blog detail slug for verification |

### Runtime Behavior

- If `RESEND_API_KEY` is missing, the contact API stays in validation-only preview mode and returns a successful non-sending response.
- If `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is missing, analytics remains disabled in local and preview environments.

## Local Verification

Use `.env.local.test` for all local signoff work. It pins canonicals to `http://127.0.0.1:3000` and gives the smoke/Lighthouse scripts deterministic route inputs.

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

- Blog posts are published through Drupal JSON:API
- Project entries live in `content/projects`
- Routed detail pages are generated from content loaders in `lib/`
- The default site language and marketing copy are German

## Notes for Development

- Motion is intentionally isolated to client components and includes reduced-motion-safe fallbacks.
- The site-level metadata is centrally defined through `lib/site-config.ts` and `app/layout.tsx`.
- The contact flow is implemented in `app/api/contact/route.ts`.
- SEO support is part of the app surface, including `app/sitemap.ts` and `app/robots.ts`.
