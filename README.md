# Notes API

Minimal JSON note-taking API (Node, no deps).

```bash
node server.js
curl localhost:3000/notes
curl -X POST localhost:3000/notes -d '{"text":"hi"}'
curl -X DELETE localhost:3000/notes/<id>
curl "localhost:3000/notes?q=hi"
```
