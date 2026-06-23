---
"freee-mcp": patch
---

OAuth callback サーバーのログから `code` / `state` / `code_verifier` を redact。callback リクエストの URL や parsed URL、登録時の state/code_verifier prefix、unknown state 時の state 値などを presence のみのログに置き換え、OAuth artifact が stderr / MCP client log に残らないようにした。
