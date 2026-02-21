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

## Resume

The resume has two outputs: the HTML page at `/resume` and a static PDF download. Both are driven by `content/resume.json`.

### Updating the resume

```bash
# 1. Edit the resume data
open content/resume.json

# 2. Start the dev server
bun dev

# 3. Regenerate the PDF
bun generate:pdf

# 4. Commit both files together
git add content/resume.json public/Rio_Edwards_Resume.pdf
git commit -m "..."
```

The e2e test (`bun test:e2e`) asserts the PDF is exactly one page. If it fails after adding content, reduce `--print-base-font` and `--print-base-space` at the top of the `@media print` block in `app/resume.css`, then regenerate.

### Generating a variant for a job application

```bash
# 1. Copy the base resume and tailor it
cp content/resume.json resume-variants/company-name.json

# 2. Point the dev server at the variant
echo "RESUME_LOCAL_PATH=./resume-variants/company-name.json" >> .env.local
bun dev

# 3. Generate the variant PDF (gitignored)
bun generate:pdf -- --output ./resume-variants/company-name.pdf

# 4. Clean up when done
# Remove RESUME_LOCAL_PATH from .env.local
```

`resume-variants/` is gitignored. Never commit a variant PDF as `public/Rio_Edwards_Resume.pdf`.

## Available Scripts

```bash
bun run dev           # Start development server
bun run build         # Production build
bun run lint          # Run ESLint
bun run lint:fix      # ESLint with auto-fix
bun run format        # Format with Prettier
bun run generate:pdf  # Regenerate public/Rio_Edwards_Resume.pdf (requires bun dev)
bun run test:e2e      # Run Playwright e2e tests
```
