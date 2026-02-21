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

### Resume

The resume has two outputs that must stay in sync: the **HTML page** at `/resume` and the **static PDF** at `/Rio_Edwards_Resume.pdf`.

**Key files:**

- `content/resume.json` - canonical resume data (single source of truth)
- `app/resume.css` - all resume styles, including the `@media print` block
- `app/resume/page.tsx` - resume page component
- `components/resume-content.tsx` - renders the resume from JSON data
- `public/Rio_Edwards_Resume.pdf` - the committed, pre-generated PDF
- `scripts/generate-pdf.ts` - generates the PDF from the running dev server
- `e2e/resume-pdf.spec.ts` - asserts the PDF is exactly one page

**How the PDF is generated:**
`page.pdf()` renders the `/resume` page using `@media print` styles. Margins are declared in CSS via `@page { margin: 0.5in 0.55in; }` inside the print block in `resume.css`. The `generate-pdf.ts` script passes `margin: 0` to `page.pdf()` so Playwright does not override them.

**Updating the resume (standard edits):**

1. Edit `content/resume.json`
2. Start the dev server: `bun dev`
3. Regenerate the PDF: `bun generate:pdf`
4. Commit both files together: `content/resume.json` + `public/Rio_Edwards_Resume.pdf`

**One-page constraint:**
`e2e/resume-pdf.spec.ts` asserts the PDF is exactly one page. If the test fails after adding content, tighten the two CSS variables at the top of the `@media print` block in `resume.css`, then regenerate:

```css
--print-base-font: 10.5pt; /* reduce to shrink all text */
--print-base-space: 4.25pt; /* reduce to tighten all spacing */
```

All font sizes and spacing derive from these two values, so one adjustment affects the whole layout proportionally.

**Generating a variant PDF for a job application:**

1. `cp content/resume.json resume-variants/company-name.json`
2. Edit `resume-variants/company-name.json` with tailored content
3. Add `RESUME_LOCAL_PATH=./resume-variants/company-name.json` to `.env.local`
4. `bun dev` (the page now renders the variant data)
5. `bun generate:pdf -- --output ./resume-variants/company-name.pdf`
6. Submit the variant PDF. The `resume-variants/` directory is gitignored.
7. Remove `RESUME_LOCAL_PATH` from `.env.local` when done

Never overwrite `public/Rio_Edwards_Resume.pdf` with a variant. The committed PDF must always match `content/resume.json`.

## Important Conventions

**Icons**: Use Hugeicons, not lucide-react:

```typescript
import { IconName } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

<HugeiconsIcon icon={IconName} size={16} color="currentColor" strokeWidth={2} />
```

**Path aliases**: Use `@/*` for imports (configured in tsconfig.json).

**Keep changes small and focused** - this is a personal portfolio, not an enterprise project. Ask for clarification when in doubt.
