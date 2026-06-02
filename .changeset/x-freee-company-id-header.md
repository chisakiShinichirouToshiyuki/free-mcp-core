---
'freee-mcp': patch
---

freee public API リクエストに `x-freee-company-id` ヘッダーを付与。WAF の ApiCompositeRateLimit が (IP + company_id) の composite key でレートリミットできるようになり、共有 IP 経由で複数事業所が利用する際の誤 BLOCK を防ぐ。companyId 未設定時は従来どおりヘッダーを付与しない。
