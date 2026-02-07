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

| Variable                       | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| `GOOGLE_APP_SENDER_USERNAME`   | Gmail account used to send contact form emails  |
| `GOOGLE_APP_SENDER_PASSWORD`   | Gmail App Password (requires 2FA enabled)       |
| `GOOGLE_APP_RECEIVER_USERNAME` | Email address that receives contact submissions |

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

## Available Scripts

```bash
bun run dev      # Start development server
bun run build    # Production build
bun run lint     # Run ESLint
bun run lint:fix # ESLint with auto-fix
bun run format   # Format with Prettier
```
