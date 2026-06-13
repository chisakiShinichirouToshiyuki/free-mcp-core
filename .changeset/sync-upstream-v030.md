---
"free-mcp-core": minor
---

chore: sync with upstream `freee/freee-mcp` v0.30.0 (75 commits). Absorbs upstream bug fixes and features: OpenAPI body coercion publishes `anyOf:[object,string]` so MCP clients don't pre-reject string bodies (#410), company-name resolution fallback via the API, email-scrubbing capture-group fix in the error serializer, and health-probe rename `/health` → `/livez`+`/readyz`. Library exports (`createTextResponse`, `formatErrorMessage`) are unchanged and backward-compatible (`createTextResponse` gains an optional `options` arg). Fork identity (package name `free-mcp-core`, library entrypoint, changesets release) preserved.
