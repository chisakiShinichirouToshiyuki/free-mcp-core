---
"freee-mcp": patch
---

工数管理スキルのレシピとワークフローガイドを改善

- pm-operations: `/projects/{id}` を GET のみに修正（PUT/DELETE/PATCH は非対応）、`/workloads/{id}` に PATCH/DELETE を追加
- pm-operations: 使用例セクションにリファレンス確認を促す注意書きを追加
- pm-workload-registration: `payroll_employee_id`・`employee_id` がともに null の場合（HR未利用ユーザー）のスキップ手順を追記
