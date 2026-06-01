import http from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
const FILE = "notes.json";
function load() { try { return JSON.parse(readFileSync(FILE)); } catch { return []; } }
function save(n) { writeFileSync(FILE, JSON.stringify(n)); }
const server = http.createServer((req, res) => {
  const j = (code, obj) => { res.writeHead(code, {"Content-Type": "application/json"}); res.end(JSON.stringify(obj)); };
  if (req.method === "GET") return j(200, load());
  if (req.method === "POST") {
    let body = ""; req.on("data", c => body += c); req.on("end", () => {
      const note = { id: randomBytes(4).toString("hex"), text: JSON.parse(body).text, created: Date.now() };
      const all = load(); all.push(note); save(all); j(201, note);
    }); return;
  }
  j(404, { error: "not found" });
});
server.listen(3000);
