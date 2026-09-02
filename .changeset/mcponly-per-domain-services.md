---
"freee-mcp": minor
---

mcp-only API のサービスをドメインごとに分割し、freee開業（`launch`）と人事評価（`employee_evaluation`）を `freee_api_*` の `service` として追加しました。

mcp-only なエンドポイントはドメイン横断で 1 つのスキーマに集約されて配信されるため、これまで `survey` サービスがその全体を掴んでおり、開業・人事評価のエンドポイントが `service: "survey"` として扱われていました。各サービスがスキーマ内の担当パス範囲だけを見るようになり、以下が変わります。

- `service: "launch"` / `service: "employee_evaluation"` を指定できるようになりました
- `service: "survey"` で開業・人事評価のパスを呼ぶとパス検証エラーになります（従来は通っていました）
- `freee_api_list_paths` が各ドメインを正しいサービス名の下に列挙します
- `FREEE_API_BASE_URL_SURVEY` が開業・人事評価の向き先まで変えてしまう問題が解消し、`FREEE_API_BASE_URL_LAUNCH` / `FREEE_API_BASE_URL_EMPLOYEE_EVALUATION` で個別に指定できます

Agent Skills 側では、リファレンスのファイル名がサービスに揃います。

- `survey-launch-kaigyo-application.md` → `launch-kaigyo-application.md`
- `survey-employee-evaluation-evaluation-results.md` → `employee-evaluation-evaluation-results.md`

あわせて開業のレシピ `recipes/launch-operations.md` を追加しました（`family_employees` が全件置き換えである点など、PATCH の注意点を含みます）。

いずれも freee-mcp（リモート版）限定のエンドポイントで、ローカル（stdio）モードでの扱いは変わりません。
