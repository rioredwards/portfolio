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
- `content/projects/` - Project MDX files with frontmatter metadata
- `lib/` - Utilities, data, server actions, and hooks
- `public/work/images/` - Project images
- `fonts/` - Custom local fonts (Mazaeni Demo)

### Key Patterns

**Data-driven content**: Blogs and testimonials are defined in `lib/*-data.ts` files. Projects are defined as MDX files in `content/projects/` with frontmatter for metadata.

**Project MDX system**: Projects are stored as single-source MDX files in `content/projects/`. Each file contains frontmatter (title, slug, description, category, skills, image, links, order) and MDX body content. Utility functions in `lib/projects.ts` provide `getProjectSlugs()`, `getAllProjectCards()`, `getProjectWithContent()`, and `getAllProjectsWithContent()`.

**Project detail pages**: Projects can be viewed as modal overlays (on home page) or standalone pages at `/work/[slug]`. MDX content is rendered using `next-mdx-remote`.

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
