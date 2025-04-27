import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";

export default defineConfig([
    // build per browser (IIFE)
    {
        input: "src/jdm.js",
        output: {
            file: "dist/jdm.js",
            format: "iife",
            name: "Jdm", // il nome globale da usare nel browser
            sourcemap: true,
        },
        plugins: [terser()],
    },
    // build per modulo ES
    {
        input: "src/jdm.js",
        output: {
            file: "dist/jdm.es.js",
            format: "es",
            sourcemap: true,
        },
        plugins: [terser()],
    },
]);
