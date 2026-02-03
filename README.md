# Portfolio

This is my portfolio website. It is built with Next.js, TypeScript, shadcn/ui, and Tailwind CSS.

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

| Variable | Description |
|----------|-------------|
| `GOOGLE_APP_SENDER_USERNAME` | Gmail account used to send contact form emails |
| `GOOGLE_APP_SENDER_PASSWORD` | Gmail App Password (requires 2FA enabled) |
| `GOOGLE_APP_RECEIVER_USERNAME` | Email address that receives contact submissions |

> **Note:** You must use a Gmail [App Password](https://myaccount.google.com/apppasswords), not your regular Gmail password.

## New TODOS

- The links in the navbar don't work for navigating between pagees, only within sections on the home page. I think that there should be two variants of the navbar. One is for navigating the home page (as is currently) and one is for navigating between pages. The between pages one should.
- Cursor should be a pointer on the navbuttons on the carousel.
- Refine project modal and page ui. Possibly switch to an MDX renderer.
- Fix Nex.js error in modal

## TODO

Priority key

- ❤️ - High Priority
- 🧡 - Medium Priority
- 💛 - Low Priority

### Design System Checklist

- [ ] Create a design system for the portfolio while keeping the current design with: ❤️
  - [x] A set of variables for the font sizes ❤️
  - [x] A set of variables for the colors ❤️
  - [x] A set of variables for the spacing ❤️
  - [x] A set of variables for the border radius ❤️
  - [ ] A set of variables for the box shadow 🧡
  - [ ] A set of variables for the animations 🧡
  - [ ] A set of variables for the borders 🧡
- [x] Apply the design system to the portfolio while keeping the current design ❤️
  - [x] Apply to the desktop navbar ❤️
  - [x] Apply to the mobile navbar ❤️
  - [x] Apply to the sidebar ❤️
  - [x] Apply to the slide panel ❤️
  - [x] Apply to the hero section ❤️
  - [x] Apply to the work section ❤️
  - [x] Apply to the blog section ❤️
  - [x] Apply to the contact section ❤️
  - [x] Apply to the footer ❤️
- [x] Tweak the design system as needed to ensure every component looks good/consistent ❤️
- [x] Ensure the layout is responsive and spacing is consistent ❤️
  - [x] Navbar ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [x] Sidebar ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [x] Slide panel ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [x] Hero section ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [x] Work section ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [x] Blog section ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [x] Contact section ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [x] Footer ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️

### Replace Placeholder Content Checklist

- [x] Sidebar Links ❤️
  - [x] LinkedIn ❤️
  - [x] GitHub ❤️
  - [x] Email ❤️
  - [x] YouTube ❤️
  - [x] BlueSky ❤️
  - [x] Resume ❤️
- [x] Hero section ❤️
  - [x] Title ❤️
  - [x] Paragraphs ❤️
  - [x] Image ❤️
- [x] Work section ❤️
  - [x] First project ❤️
    - [x] Category ❤️
    - [x] Title ❤️
    - [x] Description ❤️
    - [x] Skills ❤️
    - [x] Image ❤️
  - [x] Second project ❤️
    - [x] Category ❤️
    - [x] Title ❤️
    - [x] Description ❤️
    - [x] Skills ❤️
    - [x] Image ❤️
  - [x] Third project ❤️
    - [x] Category ❤️
    - [x] Title ❤️
    - [x] Description ❤️
    - [x] Skills ❤️
    - [x] Image ❤️
- [x] Blog section ❤️
  - [x] First blog ❤️
    - [x] Title ❤️
    - [x] Description ❤️
    - [x] Icon ❤️
- [x] Contact section ❤️
  - [x] Wire up with real email service (refer to previous version of this project... there's a working version of this somewhere in the git history. Use the worktree that is dedicated to referencing older versions of this project in ../portfolio-old/) ❤️
- [x] Footer ❤️
  - [x] Built With Pills ❤️

### New Content Checklist

- [x] Design a "Testimonials" section ❤️
  - [x] Desktop ❤️
  - [x] Mobile ❤️
- [x] Add Testimonials section ❤️
  - [x] First testimonial ❤️
    - [x] Name ❤️
    - [x] Description ❤️
    - [x] Image ❤️
  - [x] Second testimonial ❤️
    - [x] Name ❤️
    - [x] Description ❤️
    - [x] Image ❤️
- [x] Add project detail page/modal ❤️
      This should be a modal that appears when the user clicks on a project card in the works section. It should render mdx content, which should be stored in the project's directory. It can also be viewed in a standalone page. This is made possible by a next.js feature (see previous versions of this project for reference)
  - [x] Desktop ❤️
  - [x] Mobile ❤️
- [x] Add blog detail page/modal ❤️
      This should be a modal that appears when the user clicks on a blog card in the blog section. It should render mdx content, which should be stored in the blog's directory. It can also be viewed in a standalone page. This is made possible by a next.js feature (see previous versions of this project for reference)
  - [x] Desktop ❤️
  - [x] Mobile ❤️
- [x] Ancillary Pages ❤️
  - [x] Resume page ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [ ] Contact page 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [x] Not Found page ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️
  - [x] Error page ❤️
    - [x] Desktop ❤️
    - [x] Mobile ❤️

### Animations Checklist

- [ ] Add framer motion for animations. Use the worktree that is dedicated to referencing older versions of this project in ../portfolio-old/ for reference. 🧡
  - [ ] Navbar 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Sidebar 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Slide panel 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Hero section 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Works section 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Blog section 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Contact section 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Footer 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Project detail page 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Blog detail page 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Resume page 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Contact page 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Not Found page 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡
  - [ ] Error page 🧡
    - [ ] Desktop 🧡
    - [ ] Mobile 🧡

### Polish & Robustness Checklist

- [x] Error Handling & Boundaries ❤️
  - [x] Add React Error Boundaries (wrap key sections) ❤️
  - [x] Handle API errors (contact form, any data fetching) ❤️
  - [x] Handle network failures gracefully ❤️
  - [ ] Add error logging/monitoring (Sentry, LogRocket, etc.) 🧡
- [x] Form Validation & Security ❤️
  - [x] Client-side form validation (contact form) ❤️
  - [x] Server-side form validation ❤️
  - [x] Input sanitization ❤️
- [ ] Rate limiting for contact form submissions 🧡
  - [ ] CSRF protection 🧡
  - [x] Spam protection (honeypot, reCAPTCHA, etc.) 🧡
- [x] Loading States & UX 🧡
  - [x] Loading states for form submissions 🧡
  - [ ] Loading states for modal/page transitions 💛
  - [ ] Loading skeletons for async content (this is a static site so far, so no not needed) 💛
  - [ ] Empty states (no projects, no blog posts, etc.) 💛
- [ ] Testing 💛
  - [ ] Set up testing framework (Jest/Vitest + React Testing Library) 💛
  - [ ] Unit tests for components 💛
  - [ ] Integration tests for forms/flows 💛
  - [ ] E2E tests for critical paths (Playwright/Cypress) 💛
  - [ ] Visual regression testing (optional but valuable) 💛
- [ ] Browser Compatibility & Testing ❤️
  - [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge) ❤️
  - [ ] Mobile device testing (iOS, Android) ❤️
  - [ ] Test on different screen sizes ❤️
  - [x] Test with reduced motion preferences 🧡
  - [ ] Test with screen readers 🧡
- [x] Favicon & App Icons ❤️
  - [x] Multiple favicon sizes (16x16, 32x32, etc.) ❤️
  - [x] Apple touch icons 🧡
  - [x] Android icons 🧡
  - [x] Web manifest for PWA (optional) 💛
- [x] SEO ❤️
  - [x] Title ❤️
  - [x] Description ❤️
  - [x] Keywords ❤️
  - [x] Author ❤️
  - [x] Date ❤️
  - [x] Image ❤️
  - [x] URL ❤️
  - [x] Canonical URL ❤️
  - [x] Robots ❤️
  - [x] Sitemap ❤️
  - [x] Open Graph ❤️
  - [x] robots.txt file ❤️
  - [x] Twitter Cards 🧡
  - [x] JSON-LD structured data for Person/Portfolio 🧡
  - [x] Dynamic metadata per page (not just home) 🧡
  - [x] Language/locale tags 🧡
  - [ ] RSS feed for blog section 💛
- [x] Performance 🧡
      Next.js handles these automatically via Turbopack and built-in optimizations.
  - [x] Critical CSS 🧡
  - [x] Image optimization 🧡
  - [x] Font optimization 🧡
  - [x] Code splitting 🧡
  - [x] Lazy loading 🧡
  - [x] Preloading 🧡
  - [x] Prefetching 🧡
  - [x] Compression 🧡
- [x] Performance Monitoring 🧡
  - [x] Core Web Vitals monitoring 🧡
  - [ ] Error tracking (beyond Vercel analytics) 💛
  - [ ] Performance budgets 💛
  - [ ] Bundle size monitoring 💛
- [x] Accessibility ❤️
  - [x] Alt text for images ❤️
  - [x] Tab order ❤️
  - [x] Keyboard navigation ❤️
  - [x] Screen reader support ❤️
  - [x] Contrast ❤️
  - [x] Font size ❤️
  - [x] Font weight ❤️
  - [x] Font color ❤️
  - [x] ARIA labels where needed ❤️
  - [x] Focus visible states ❤️
  - [ ] Semantic HTML validation 🧡
  - [ ] Color contrast testing tools 🧡
  - [x] Skip to content link 💛

### Content Management Checklist

- [x] Document MDX content structure 🧡
- [x] Content creation workflow 🧡
- [ ] Image optimization workflow 💛
- [ ] Content versioning strategy 💛

### Configuration & Environment Checklist

- [x] Document all required environment variables ❤️
- [x] Create `.env.example` file ❤️
- [x] Secure environment variable handling ❤️
- [ ] Different configs for dev/staging/prod 🧡

### Legal & Compliance Checklist

- [x] Privacy Policy page 🧡
- [ ] Terms of Service (if collecting data) 🧡
- [x] Cookie consent banner (if using analytics) 🧡 (Not needed - Vercel Analytics is cookieless)
- [ ] GDPR compliance (if targeting EU) 🧡

### Additional Features Checklist

- [ ] Social sharing buttons (blog posts, work) 🧡
- [x] Print styles (especially for resume page) 🧡
- [ ] Email templates (for contact form auto-replies) 🧡
- [ ] Search functionality (if blog/works grow large) 💛
- [ ] Pagination (if content grows) 💛

### CI/CD & Automation Checklist

- [x] Automated linting/formatting checks 🧡
- [x] Automated build verification 🧡
- [x] Pre-deployment checks 🧡
- [ ] Automated testing in CI pipeline 💛

### Documentation Checklist

- [x] README updates with deployment instructions ❤️
- [ ] Code documentation for complex components 💛
- [ ] Architecture decisions documentation 💛
- [ ] Content contribution guidelines 💛

### Deployment Checklist

- [x] Deploy to Vercel ❤️
  - [ ] Vercel CLI 🧡
  - [x] Add monitoring through vercel analytics 🧡

Final Sitemap:

- Home
  - Hero section
  - Works section
    - Project detail page
  - Testimonials section
  - Blog section
    - Blog detail page
  - Contact section
  - Footer
- Project detail page
- Blog detail page
- Resume page
- Contact page
- Not Found page
- Error page

### Ideas

- try the new starting-style css property
