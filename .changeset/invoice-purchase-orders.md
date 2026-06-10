---
"freee-mcp": minor
---

請求書API（freee請求書）の発注書(purchase_order)操作に対応

- `skills/freee-api-skill/recipes/invoice-operations.md` に発注書のパス・作成例・Web確認URL・リファレンス参照を追記
- `skills/freee-api-skill/references/invoice-purchase-orders.md` を公開スキーマから生成して追加
- あわせて領収書(receipts)のレシピ記載漏れを補完
- `fetch:schemas` / `generate:references` の再実行で生じた他API（会計・IT管理・サイン）の公開スキーマ最新化差分を反映
