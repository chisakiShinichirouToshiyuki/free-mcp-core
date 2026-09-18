---
"freee-mcp": minor
---

OpenAI Plugin Directory のドメイン所有確認用エンドポイント `/.well-known/openai-apps-challenge` を追加

- 環境変数 `OPENAI_APPS_CHALLENGE_TOKEN` に設定されたトークンを、認証なしの GET に対して `text/plain` で返す
- トークンはプラグインのドラフトごとに変わるため環境変数で注入する。未設定の環境では 404 を返す
