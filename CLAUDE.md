# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui components.

## Commands

```bash
bun run dev      # Start development server (localhost:3000)
bun run build    # Production build
bun run lint     # ESLint
bun run lint:fix # ESLint with auto-fix
bun run format   # Prettier formatting
```

## Architecture

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components (UI primitives in `components/ui/`)
- `lib/` - Utilities, data, server actions, and hooks
- `public/work/` - Project assets (images in `images/`, markdown content in `markdown/`)
- `fonts/` - Custom local fonts (Mazaeni Demo)

### Key Patterns

**Data-driven content**: Projects, blogs, and testimonials are defined in `lib/*-data.ts` files and rendered by corresponding components.

**Project detail pages**: Use parallel routes pattern - projects can be viewed as modal overlays or standalone pages at `/work/[slug]`. Markdown content lives in `public/work/markdown/` and is parsed via `lib/get-project-markdown.ts` and `lib/parse-project-markdown.ts`.

**Design system**: CSS variables defined in `app/globals.css` with responsive sizing using `clamp()`. Uses Tailwind's `@theme` directive for custom tokens. Key concepts:
- `--responsive-spacing-*` variables scale with viewport width
- Custom radius, color, and spacing tokens
- `extended-padding` component pattern for sections with decorative overflow

**Contact form**: Uses TanStack Form with Zod validation (`lib/dataTypes.ts`), nodemailer for email, and server actions (`lib/actions.ts`).

### Fonts
- Geist Sans/Mono (Google Fonts)
- Playfair Display (Google Fonts)
- Mazaeni Demo (local, in `fonts/`)

## Important Conventions

**Icons**: Use Hugeicons, not lucide-react:
```typescript
import { IconName } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

<HugeiconsIcon icon={IconName} size={16} color="currentColor" strokeWidth={2} />
```

**Path aliases**: Use `@/*` for imports (configured in tsconfig.json).

**Keep changes small and focused** - this is a personal portfolio, not an enterprise project. Ask for clarification when in doubt.
