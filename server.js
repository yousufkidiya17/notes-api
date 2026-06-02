import http from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
const FILE = "notes.json";
function load() { try { return JSON.parse(readFileSync(FILE)); } catch { return []; } }
function save(n) { writeFileSync(FILE, JSON.stringify(n)); }
const server = http.createServer((req, res) => {
  const j = (code, obj) => { res.writeHead(code, {"Content-Type": "application/json"}); res.end(JSON.stringify(obj)); };
  const [path, q] = req.url.split("?");
  if (req.method === "GET" && path === "/notes") {
    const all = load();
    if (q) { const term = new URLSearchParams(q).get("q").toLowerCase(); return j(200, all.filter(n => n.text.toLowerCase().includes(term))); }
    return j(200, all);
  }
  if (req.method === "POST" && path === "/notes") {
    let body = ""; req.on("data", c => body += c); req.on("end", () => {
      const note = { id: randomBytes(4).toString("hex"), text: JSON.parse(body).text, created: Date.now() };
      const all = load(); all.push(note); save(all); j(201, note);
    }); return;
  }
  const m = path.match(/^\/notes\/(.+)$/);
  if (m && req.method === "DELETE") {
    const all = load().filter(n => n.id !== m[1]); save(all); return j(200, { deleted: m[1] });
  }
  j(404, { error: "not found" });
});
server.listen(3000);
