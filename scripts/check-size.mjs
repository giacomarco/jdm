#!/usr/bin/env node
// Bundle-size budget guard. Fails (exit 1) if any shipped bundle exceeds its gzip budget,
// so consumers don't silently inherit bloat. Run after build; wired into CI.
import { readFileSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Budgets in bytes (gzip). Current ≈6.2KB each — headroom to 8KB before action required.
const budgets = [
    { file: "dist/jdm.js", gzip: 8192 },
    { file: "dist/jdm.es.js", gzip: 8192 },
];

let failed = false;
for (const { file, gzip } of budgets) {
    const path = join(root, file);
    if (!existsSync(path)) {
        console.error(`[size] missing ${file} — run \`npm run build\` first`);
        failed = true;
        continue;
    }
    const buf = readFileSync(path);
    const gz = gzipSync(buf).length;
    const pct = ((gz / gzip) * 100).toFixed(0);
    const over = gz > gzip;
    const tag = over ? "OVER" : "ok";
    console.log(
        `[size] ${file}: ${(buf.length / 1024).toFixed(1)}KB raw, ${(gz / 1024).toFixed(2)}KB gzip / ${(gzip / 1024).toFixed(0)}KB budget (${pct}%) ${tag}`,
    );
    if (over) failed = true;
}

if (failed) {
    console.error("[size] budget exceeded");
    process.exit(1);
}
console.log("[size] all bundles within budget");
