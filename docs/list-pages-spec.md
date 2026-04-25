# List Pages Spec

**Status:** Shipped. Index routes: `app/work/page.tsx`, `app/blog/page.tsx`. Linked from `components/layout/navbar.tsx` and included in `app/sitemap.ts`.

## Feature Summary

Add resource index pages for portfolio content so the site supports both:

- collection views (`/work`, `/blog`)
- detail views (`/work/[slug]`, `/blog/[slug]`)

This mirrors the standard resource pattern used in APIs and content-heavy websites: users can browse all resources or navigate directly to a single resource.

## Goals

1. Add a canonical SSR list page for projects at `/work`
2. Add a canonical SSR list page for blog posts at `/blog`
3. Keep routing, data loading, and filtering idiomatic to Next.js App Router
4. Use URL search params as the long-term contract for search, filters, and pagination
5. Preserve the site’s current visual language while making the list pages feel intentional and browseable

## Non-Goals for Initial Slice

- Full search UI
- Tag/category filtering UI
- Pagination UI
- Infinite scroll
- Client-side fetching for the primary list content
- Reworking existing detail page architecture

## Existing Architecture Notes

The repo already has the data layer needed for list pages:

- `lib/projects.ts`
  - `getAllProjectCards()`
  - `getProjectSlugs()`
  - `getProjectWithContent()`
- `lib/blogs.ts`
  - `getAllBlogCards()`
  - `getBlogSlugs()`
  - `getBlogWithContent()`
- Existing detail routes:
  - `app/work/[slug]/page.tsx`
  - `app/blog/[slug]/page.tsx`

This means the feature is primarily a routing + page composition task, not a data-model rewrite.

## Routing Contract

### Initial

- `/work` → all projects
- `/blog` → all blog posts

### Planned Query Params

- `/work?q=&category=&page=`
- `/blog?q=&tag=&page=`

These params should be server-readable so the page remains shareable, crawlable, and SSR-friendly.

## Rendering Strategy

- Use App Router server components by default
- Render collection pages on the server using existing content utilities
- Avoid client-only data fetching for the primary listing experience
- Introduce client components only for interactive controls that truly need them

## Milestones

### Milestone 1: `/work` vertical slice

Deliver a production-ready first pass of the projects index page.

#### Requirements

- Create `app/work/page.tsx`
- Load project data on the server via `getAllProjectCards()`
- Render all projects in a browsable list/grid
- Each project item must include:
  - title
  - description
  - category
  - skills/tags
  - image when available
  - link to `/work/[slug]`
- Use the existing ordering logic from `getAllProjectCards()`
- Include page-level copy that establishes this as the index for all work
- Ensure the page works responsively on mobile and desktop

#### UX expectations

- Clear page heading
- Short intro copy
- Scannable layout
- Obvious click target to the detail page
- Visual continuity with the existing homepage aesthetic

### Milestone 2: `/work` design refinement

Refine spacing, hierarchy, and browsing feel after the data is correctly rendered.

Potential improvements:

- density tuning
- stronger section intro
- card rhythm / alternating visual treatment if useful
- discoverability of project metadata
- improved empty-state language

### Milestone 3: `/blog` vertical slice

Repeat the same architectural pattern for the blog collection page.

#### Requirements

- Create `app/blog/page.tsx`
- Load blog data on the server via `getAllBlogCards()`
- Render all blog posts with links to `/blog/[slug]`
- Include title, description, and metadata that is already available in content frontmatter

### Milestone 4: search + filtering

Add URL-param-driven browsing controls.

#### Work

- Search over title + description
- Filter by category if project data supports stable categories

#### Blog

- Search over title + description
- Filter by tag if blog data supports stable tags

#### Technical approach

- Read `searchParams` in the page
- Filter on the server
- Keep controls URL-driven
- Preserve good no-JS behavior where practical

### Milestone 5: pagination

Add standard server-driven pagination for both collections.

#### Requirements

- `page` query param is the source of truth
- Stable page size per resource type
- Pagination links preserve active search/filter params
- Graceful behavior for invalid or out-of-range page values

### Milestone 6: validation + polish

- verify metadata and canonical behavior
- test empty and no-result states
- mobile QA
- lint
- typecheck
- build

## Information Architecture Decisions

### Why SSR-first?

These are content index pages, not highly personalized dashboards. SSR gives:

- better default SEO
- faster first meaningful render for content
- simpler architecture
- shareable URL state for future filtering/search

### Why URL search params?

Because search/filter/pagination state should be:

- linkable
- restorable on refresh
- crawl-friendly
- easy to reason about in App Router

## Initial Implementation Decision

For the first slice, prefer architectural correctness over feature completeness:

- ship `/work`
- render all projects from the canonical server-side source
- make the page feel solid
- then iterate on design
- then add filters/search/pagination without rewriting the foundation

## Acceptance Criteria for Milestone 1

- Visiting `/work` no longer 404s
- All project cards render from `content/projects`
- Cards link to existing slug pages
- Layout is responsive and visually coherent
- Implementation follows idiomatic Next.js App Router patterns
- Lint, typecheck, and build pass
