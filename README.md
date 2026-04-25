# Portfolio

Personal portfolio website built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## Getting Started

1. Clone the repository
2. Run `bun install` to install the dependencies
3. Run `bun run dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) to see the result

## Environment Setup

Copy `.env.example` to `.env.local` and configure the following variables:

```bash
cp .env.example .env.local
```

| Variable                        | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `GOOGLE_APP_SENDER_USERNAME`    | Gmail account used to send contact form emails  |
| `GOOGLE_APP_SENDER_PASSWORD`    | Gmail App Password (requires 2FA enabled)       |
| `GOOGLE_APP_RECEIVER_USERNAME`  | Email address that receives contact submissions |
| `NEXT_PUBLIC_INTERVIEW_BOT_URL` | Interview bot API base URL (must be absolute)   |

> **Note:** You must use a Gmail [App Password](https://myaccount.google.com/apppasswords), not your regular Gmail password.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Content**: MDX for projects and blog posts
- **Forms**: TanStack Form with Zod validation
- **Icons**: Hugeicons
- **Fonts**: Geist Sans/Mono, Playfair Display, Mazaeni Demo

## Project Structure

```
app/           # Next.js App Router pages and layouts
components/    # React components (UI primitives in components/ui/)
content/
  projects/    # Project MDX files
  blogs/       # Blog MDX files
lib/           # Utilities, data, server actions, and hooks
public/        # Static assets (images, fonts)
```

## Site routes

| Path           | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `/`            | Home                                                                 |
| `/work`        | Project index (search, category filter, sort, grid/list, pagination) |
| `/work/[slug]` | Project case study                                                   |
| `/blog`        | Blog index (search, tag filter, pagination)                          |
| `/blog/[slug]` | Blog post                                                            |
| `/resume`      | Resume                                                               |
| `/riobot`      | Interview bot (separate app surface)                                 |
| `/privacy`     | Privacy policy                                                       |

Main navigation (`components/layout/navbar.tsx`): Home, Work, Blog, Resume, Contact.

## Resume

The resume page at `/resume` renders from `content/resume.json`. The site also serves a static PDF at `public/Rio_Edwards_Resume.pdf` (linked from the resume page). PDF generation is not part of this repo—create or update the file elsewhere, then commit it when it should match the JSON.

## Available Scripts

```bash
bun run dev           # Start development server
bun run build         # Production build
bun run lint          # Run ESLint
bun run lint:fix      # ESLint with auto-fix
bun run format        # Format with Prettier
bun run test:e2e      # Run Playwright e2e tests
```

## Deployment

Use `DEPLOYMENT_RUNBOOK.md` for deployment steps, environment mapping, and incident fixes.
