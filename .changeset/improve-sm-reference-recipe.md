---
"freee-mcp": patch
---

販売(sm)管理レシピを最新化

- GETを含む全リクエストで company_id が必須であることと、指定場所（GET=query / POST・PATCH=body）を明記
- 見積・納品・売上・原価予算・その他原価などのパスと、ドメイン用語（案件=businesses 等）の対応を追記
- 受注作成サンプルを実際に通る形へ修正し、明細(lines)や請求作成方法・入金方法のenum値を記載
- 取消/ロック/復元の違い、ULID形式のID、ページネーションのTipsを追加
