---
'freee-mcp': patch
---

`freee_file_upload` の fetch に AbortSignal タイムアウト（120秒）を設定し、上流 API が応答しないケースで abort されるように修正
