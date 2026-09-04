---
"freee-mcp": patch
---

freee開業のレシピを拡充し、開業の eval と mcp-only ゲートのテストを追加しました。

- `recipes/launch-operations.md` に、`completion_hint` を使った入力補完の流れ、提出が Web 画面限定であること、422 の `invalid_fields[]` によるエラー処理、e-Tax の文字数制限、電話番号・住所を組み合わせで送る必要があることを追記
- `company_id` の指定場所が GET（クエリ）と PATCH（ボディ）で異なる点を明記
- 開業の eval ケースを 3 件追加
