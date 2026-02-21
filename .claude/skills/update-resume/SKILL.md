---
name: update-resume
description: Update the canonical resume and regenerate the PDF. Use when editing resume content, fixing typos, adding jobs/projects/skills, or regenerating the PDF after CSS changes.
---

# Update Resume

## What This Skill Does

Guides you through editing `content/resume.json` and regenerating `public/Rio_Edwards_Resume.pdf` so both outputs (the HTML page and the PDF download) stay in sync.

## Key Files

| File                            | Purpose                                                |
| ------------------------------- | ------------------------------------------------------ |
| `content/resume.json`           | Canonical resume data. Edit this.                      |
| `public/Rio_Edwards_Resume.pdf` | Committed static PDF. Regenerate after every edit.     |
| `app/resume.css`                | All resume styles, including the `@media print` block. |
| `scripts/generate-pdf.ts`       | Generates the PDF from the running dev server.         |
| `e2e/resume-pdf.spec.ts`        | Asserts the PDF is exactly one page.                   |

## Steps

1. **Edit the resume data** in `content/resume.json`. The schema matches the JSON Resume standard. Key sections: `basics`, `work`, `projects`, `education`, `certificates`, `skills`.

2. **Start the dev server** if it is not already running:

   ```bash
   bun dev
   ```

3. **Preview the changes** at http://localhost:3000/resume to confirm the HTML looks correct before generating the PDF.

4. **Regenerate the PDF**:

   ```bash
   bun generate:pdf
   ```

   This overwrites `public/Rio_Edwards_Resume.pdf`.

5. **Run the one-page test** to confirm it still fits:

   ```bash
   npx playwright test e2e/resume-pdf.spec.ts --project=chromium
   ```

6. **Commit both files together**:
   ```bash
   git add content/resume.json public/Rio_Edwards_Resume.pdf
   git commit -m "..."
   ```

## If the One-Page Test Fails

The PDF overflowed. Reduce the two scale variables at the top of the `@media print` block in `app/resume.css`:

```css
--print-base-font: 10.5pt; /* lower to shrink all text */
--print-base-space: 4.25pt; /* lower to tighten all spacing */
```

All font sizes and spacing are derived from these two values, so one small adjustment affects the whole layout. Re-run `bun generate:pdf` and the test after each change.

## Important Rules

- The PDF must always match `content/resume.json`. Commit them together.
- Never commit a variant PDF (for a job application) as `public/Rio_Edwards_Resume.pdf`. Use the `/resume-variant` skill for that.
- `RESUME_LOCAL_PATH` must not be set in `.env.local` when regenerating the production PDF. If it is set, clear it first.
