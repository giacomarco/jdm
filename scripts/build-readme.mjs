#!/usr/bin/env node
// Builds README.md = hand-maintained header (README.header.md) + JSDoc API reference
// generated from src/*.js via jsdoc-to-markdown. Keeps badges/intro from being clobbered
// by the doc generator.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const header = readFileSync(join(root, "README.header.md"), "utf8");

const api = execFileSync(
    "npx",
    ["jsdoc-to-markdown", "src/jdm.js", "src/_core.js", "src/_evt.js", "src/_common.js", "src/_animation.js", "src/proto.js"],
    { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
);

writeFileSync(join(root, "README.md"), `${header.trimEnd()}\n\n${api.trimStart()}`);
console.log("[readme] README.md rebuilt (header + JSDoc API)");
