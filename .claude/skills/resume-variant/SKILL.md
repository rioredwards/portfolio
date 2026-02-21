---
name: resume-variant
description: Generate a tailored PDF resume variant for a specific job application. Use when applying to a job and needing a customized version of the resume without affecting the production resume.
---

# Resume Variant

## What This Skill Does

Creates a one-off tailored PDF for a specific job application using a local copy of the resume data. The variant is never committed. The production resume (`content/resume.json` and `public/Rio_Edwards_Resume.pdf`) is not touched.

## Where Variants Live

```
resume-variants/          <- gitignored, never committed
  company-name.json       <- tailored resume data
  company-name.pdf        <- generated PDF to submit
```

## Steps

1. **Copy the canonical resume** as a starting point:

   ```bash
   cp content/resume.json resume-variants/company-name.json
   ```

2. **Edit the variant** at `resume-variants/company-name.json`. Tailor the summary, reorder highlights, adjust the label, trim less-relevant content, etc.

3. **Point the dev server at the variant** by adding this line to `.env.local`:

   ```
   RESUME_LOCAL_PATH=./resume-variants/company-name.json
   ```

4. **Start the dev server** (or restart it if already running so it picks up the env change):

   ```bash
   bun dev
   ```

5. **Preview the variant** at http://localhost:3000/resume to confirm it looks right.

6. **Generate the variant PDF**:

   ```bash
   bun generate:pdf -- --output ./resume-variants/company-name.pdf
   ```

7. **Submit the PDF** at `resume-variants/company-name.pdf`.

8. **Clean up** when done:
   - Remove `RESUME_LOCAL_PATH` from `.env.local`
   - Restart the dev server so it reverts to the canonical resume

## Important Rules

- Never overwrite `public/Rio_Edwards_Resume.pdf` with a variant. That file is the production download.
- `resume-variants/` is gitignored. Nothing in it will be committed.
- The one-page constraint still applies to variants. If the variant overflows, tighten the content or reduce `--print-base-font` / `--print-base-space` in `app/resume.css` (but revert after if the production PDF still fits).
- The HTML page on the live site always renders from `content/resume.json`, regardless of what `RESUME_LOCAL_PATH` is set to locally.
