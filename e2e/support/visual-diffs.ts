// Crops Playwright's visual-test diffs to the changed band and writes a PR comment.
// Input: test-results/**/<name>-{expected,actual,diff}.png (from a non-updating run).
// Output: visual-diffs/<project>/<name>.png (before / after / diff stacked) + visual-diffs/comment.md
// Usage: bun e2e/support/visual-diffs.ts <rawBaseUrl>
import { readdirSync, statSync, mkdirSync, writeFileSync } from "fs";
import { join, basename } from "path";
import sharp from "sharp";

const [rawBase = ""] = process.argv.slice(2);
const PAD = 40;
const out = "visual-diffs";
const rows: string[] = [];

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory()
      ? walk(p)
      : p.endsWith("-diff.png")
        ? [p]
        : [];
  });

for (const diffPath of walk("test-results").sort()) {
  const dir = diffPath.slice(0, -diffPath.split("/").pop()!.length - 1);
  const name = basename(diffPath, "-diff.png");
  const project = basename(dir).replace(/^visual-.*-visual-/, "").replace(/-retry\d+$/, ""); // visual-home-visual-chromium
  const { data, info } = await sharp(diffPath)
    .raw()
    .toBuffer({ resolveWithObject: true });
  let top = -1,
    bottom = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      if (data[i] > 200 && data[i + 1] < 100) {
        if (top < 0) top = y;
        bottom = y;
        break;
      } // pixelmatch red
    }
  }
  if (top < 0) continue;
  top = Math.max(0, top - PAD);
  bottom = Math.min(info.height - 1, bottom + PAD);
  const band = { left: 0, top, width: info.width, height: bottom - top + 1 };
  const crop = (f: string) =>
    sharp(join(dir, `${name}-${f}.png`))
      .extract(band)
      .toBuffer();
  const [before, after, diff] = await Promise.all(
    ["expected", "actual", "diff"].map(crop),
  );
  const gap = 16;
  mkdirSync(join(out, project), { recursive: true });
  const h = band.height;
  await sharp({
    create: {
      width: info.width,
      height: h * 3 + gap * 2,
      channels: 4,
      background: "#888",
    },
  })
    .composite([
      { input: before, left: 0, top: 0 },
      { input: after, left: 0, top: h + gap },
      { input: diff, left: 0, top: (h + gap) * 2 },
    ])
    .png()
    .toFile(join(out, project, `${name}.png`));
  rows.push(
    `**${name}** · ${project} · rows ${top}–${bottom}\n\n![${name} ${project}](${rawBase}/${project}/${name}.png)`,
  );
}

mkdirSync(out, { recursive: true });
writeFileSync(
  join(out, "comment.md"),
  rows.length
    ? `### 📸 Visual changes (before / after / diff)\n\n${rows.join("\n\n")}\n`
    : "### 📸 Visual changes\n\nNone detected.\n",
);
console.log(`${rows.length} visual diff(s)`);
