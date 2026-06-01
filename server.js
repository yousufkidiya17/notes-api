import http from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
const FILE = "notes.json";
function load() { try { return JSON.parse(readFileSync(FILE)); } catch { return []; } }
function save(n) { writeFileSync(FILE, JSON.stringify(n)); }
const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(load()));
});
server.listen(3000);
