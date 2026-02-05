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
- `content/blogs/` - Blog MDX files with frontmatter metadata
- `lib/` - Utilities, data, server actions, and hooks
- `public/work/images/` - Project images
- `public/blog/images/` - Blog images
- `fonts/` - Custom local fonts (Mazaeni Demo)

### Key Patterns

**Data-driven content**: Testimonials are defined in `lib/testimonials-data.ts`. Projects and blogs are MDX files in `content/` with frontmatter for metadata.

**Project MDX system**: Projects are stored as single-source MDX files in `content/projects/`. Each file contains frontmatter (title, slug, description, category, skills, image, links, order) and MDX body content. Utility functions in `lib/projects.ts` provide `getProjectSlugs()`, `getAllProjectCards()`, `getProjectWithContent()`, and `getAllProjectsWithContent()`.

**Blog MDX system**: Blogs are stored as MDX files in `content/blogs/`. Each file contains frontmatter (title, slug, description, icon, date, tags, order) and MDX body content. Utility functions in `lib/blogs.ts` provide `getBlogSlugs()`, `getAllBlogCards()`, `getBlogWithContent()`, and `getAllBlogsWithContent()`.

**Detail pages**: Projects and blogs can be viewed as modal overlays (on home page) or standalone pages at `/work/[slug]` and `/blog/[slug]`. MDX content is rendered using `next-mdx-remote`.

**Design system**: CSS variables defined in `app/globals.css` with responsive sizing using `clamp()`. Uses Tailwind's `@theme` directive for custom tokens. Key concepts:

- `--responsive-spacing-*` variables scale with viewport width
- Custom radius, color, and spacing tokens
- `extended-padding` component pattern for sections with decorative overflow

**Contact form**: Uses TanStack Form with Zod validation (`lib/dataTypes.ts`), nodemailer for email, and server actions (`lib/actions.ts`).

## Content Creation

### Adding a New Project

1. Create `content/projects/your-project.mdx`
2. Add frontmatter:

```yaml
---
title: "Project Title"
slug: "project-slug"
icon: "/work/images/project/icon.png" # optional
description: "Short description for cards"
category: "Web App"
skills:
  - "TypeScript"
  - "React"
image: "/work/images/project/preview.webp"
brandColor: "#HEX" # optional, for card accent
links:
  - text: "View Live"
    url: "https://..."
    icon: "globe"
  - text: "Source Code"
    url: "https://github.com/..."
    icon: "github"
order: 1 # lower = appears first
---
```

3. Write MDX content below frontmatter
4. Use `<LightboxImage src={...} alt="..." />` for clickable images
5. Add images to `public/work/images/project-slug/`

### Adding a New Blog Post

1. Create `content/blogs/your-post.mdx`
2. Add frontmatter:

```yaml
---
title: "Blog Title"
slug: "blog-slug"
description: "Short description"
icon: "ServerStack03Icon" # Hugeicon name
date: "2024-01-15"
tags:
  - "Topic"
order: 1
---
```

3. Use `<Figure src="..." alt="..." credit="..." creditUrl="..." />` for images with attribution
4. Add images to `public/blog/images/blog-slug/`

### Available MDX Components

- `<LightboxImage>` - Clickable image that opens in lightbox
- `<Figure>` - Image with caption and credit attribution
- Standard markdown (headings, lists, code blocks, links)

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
