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
import { resumeSchema } from "../lib/resume";

const jsonSchema = z.toJSONSchema(resumeSchema, { target: "draft-07" });

const output = resolve("content/resume.schema.json");
await writeFile(output, JSON.stringify(jsonSchema, null, 2) + "\n");

console.log(`Schema written to ${output}`);
