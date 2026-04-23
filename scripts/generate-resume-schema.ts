#!/usr/bin/env bun
/**
 * Regenerate content/resume.schema.json from the Zod schema in lib/resume.ts.
 *
 * Usage:
 *   bun scripts/generate-resume-schema.ts
 */

import { z } from "zod";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { careerResumeInputSchema } from "../lib/resume";

/** Career-app resume on disk (see content/resume.json). Portfolio also accepts legacy `resumeSchema` at runtime. */
const jsonSchema = z.toJSONSchema(careerResumeInputSchema, {
  target: "draft-07",
});

const output = resolve("content/resume.schema.json");
await writeFile(output, JSON.stringify(jsonSchema, null, 2) + "\n");

console.log(`Schema written to ${output}`);
