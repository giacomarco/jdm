// example/server.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const open = require("child_process").exec;

const port = 3000;
const base = path.resolve(__dirname, ".."); // la root del progetto (una sopra 'example')

http.createServer((req, res) => {
    const safePath = path.normalize(decodeURI(req.url)).replace(/^(\.\.[\/\\])+/, "");
    const filePath = path.join(base, safePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 - File Not Found");
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const types = {
                ".html": "text/html",
                ".js": "text/javascript",
                ".css": "text/css",
                ".json": "application/json",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".svg": "image/svg+xml",
            };
            res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
            res.end(content);
        }
    });
}).listen(port, () => {
    const url = `http://localhost:${port}/example/index.html`;
    console.log(`✅ Server attivo su ${url}`);
    console.log(`🌐 Apro il browser...`);
    open(process.platform === "win32" ? `start ${url}` : process.platform === "darwin" ? `open ${url}` : `xdg-open ${url}`);
});
