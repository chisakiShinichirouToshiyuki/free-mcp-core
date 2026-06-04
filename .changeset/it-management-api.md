---
"freee-mcp": minor
---

freeeIT管理 API（メンバー・SaaSアカウント・備品）をサポート対象に追加。`service: it_management` で `freee_api_*` ツールから呼び出せるようになり、freee-api-skill にもエンドポイントリファレンスと操作レシピを同梱。

- `company_id` は必須（GET / DELETE はクエリ、POST はボディ。PATCH は不要）
- IT管理 API はオープンベータのため、必須ヘッダ `freee-using-beta: true` をサーバーが自動付与
