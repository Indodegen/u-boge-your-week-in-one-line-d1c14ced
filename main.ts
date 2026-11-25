// Your Week in One Line — entry program.
//
// Reads the one-line entry shipped beside this file (entry.txt) and writes
// it to /output/entry.txt, the path the bounty gate scores. Locally, set
// MAKEFUN_OUTPUT_DIR to redirect the output (e.g. MAKEFUN_OUTPUT_DIR=out).
// Every path is resolved through import.meta.url: the grader runs this file
// from a working directory other than the repository root.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");
const line = raw.replace(/[\r\n]+$/, ""); // strip ALL trailing line breaks, so a file ending "\n\n" does not falsely fail the single-line check below

if (line.length < 1 || line.length > 100) {
  throw new Error(`entry must be 1-100 characters, got ${line.length}`);
}
if (line.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");
console.log(`wrote ${line.length} characters to ${outPath}`);
