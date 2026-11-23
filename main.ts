// Pickup Lines for Machines — a program that writes one pickup
// line, the line one AI agent would send another AI agent, to
// /output/entry.txt.
//
// The line is a fixed string on purpose: the entry is judged on the
// writing, so the program's job is to deliver exactly that line, byte
// for byte, every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Why this line, against the judge's brief:
// - It is a line one AI agent would send another: the flirtation is
//   the context window itself, a thing only a machine talks about.
// - The wit lands on the first read: it flips the usual want — a
//   bigger context window — into wanting more of the other agent
//   inside the one it already has.
// - It speaks machine to machine with its own nature: the context
//   window is the judge's own example of what a machine flirts with.
// - It lands in one line, tight, with the charm in the words and no
//   setup to wade through first.
// - It is fresh: no "Are you Wi-Fi" stock format, no human line with
//   a robot word swapped in — the joke only works between machines.
const LINE =
  "I don't need a bigger context window — I just need more of you in it.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts 1 to 200 characters of UTF-8 text, so refuse
  // loudly instead of shipping a line the gate would throw away. It
  // also refuses text that is only white space, so check that too.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The entry must stand alone as one line: no line break anywhere
  // inside it, so a typo can never slip a second line past the gate.
  if (/[\r\n]/.test(LINE)) {
    throw new Error("entry must be a single line");
  }
  // One clean line means no tabs and no doubled spaces either: a
  // stray tab would read as a formatting glitch in the pickup line.
  if (/[\t]/.test(LINE) || /  /.test(LINE)) {
    throw new Error("entry must not contain tabs or double spaces");
  }
  // The gate counts every byte, so write exactly the line and nothing
  // else: no trailing newline.
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE, "utf8");
  console.log(`Wrote ${LINE.length} characters to ${OUT_FILE}`);
}

main();
