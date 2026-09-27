---
"free-mcp-core": minor
---

chore: sync with upstream `freee/freee-mcp` v0.36.0 (176 commits since the v0.30.3 baseline). Absorbs upstream API coverage and fixes: freee 業務委託管理・固定資産・申告（法人税申告・帳票参照）・開業・人事評価 の API サポート追加、IT 管理 API の備品ステータス/備品種別/部署リソース、サインのファイルアップロード対応、DCR クライアントの client_secret 30 日失効の修正、クエリパラメータのスキーマ準拠シリアライズ、Remote モードの rate limit 見直し、OpenAPI スキーマとスキルリファレンスの最新化。

- 追加した library export: `createSignMcpServer`, `addSignApiTools`, `addSignAuthenticationTools`, `addSignFileUploadTool`, `loadSignConfig`, `getSignCredentials`, 型 `SignConfig`（会計側と対称なサイン側のサーバープリミティブ）
- 既存の library export はシグネチャ互換
- フォーク固有の構成（パッケージ名 `free-mcp-core`、ライブラリエントリ、skill リソース、install-skills 系サブコマンド、changesets リリース、CodeQL/SECURITY ポリシー）は維持
