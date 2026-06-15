#!/usr/bin/env node
// Propagates the version from package.json into every in-repo source that hard-codes it,
// so `npm version <patch|minor|major>` keeps a single source of truth. Invoked by the
// "version" lifecycle script (after package.json/lock are bumped, before the version commit).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

// Each target: file + regex whose first capture group is the version literal to replace.
const targets = [{ file: "src/jdm.js", re: /(static version\s*=\s*")[\d.]+(")/ }];

let changed = 0;
for (const { file, re } of targets) {
    const path = join(root, file);
    const src = readFileSync(path, "utf8");
    if (!re.test(src)) {
        console.error(`[sync-version] pattern not found in ${file} — aborting to avoid silent drift`);
        process.exit(1);
    }
    const out = src.replace(re, `$1${version}$2`);
    if (out !== src) {
        writeFileSync(path, out);
        changed++;
        console.log(`[sync-version] ${file} → ${version}`);
    }
}
console.log(`[sync-version] done (${version}, ${changed} file(s) updated)`);
