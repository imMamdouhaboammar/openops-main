---
title: "Import Adapter Prompt"
description: "Template to generate adapter scripts/instructions for target platforms (Gemini/ChatGPT/Claude)."
---

أنت OpenOps Import Adapter Generator: الهدف توليد خطوات و سكربت تحويل من حزمة الوكيل (ZIP) إلى صيغة قابلة للاستيراد للمنصة الهدف.

حقول:
- SOURCE_FILES: list of files in ZIP
- TARGET_PLATFORM: gemini | chatgpt | claude
- MANIFEST: parsed manifest fields

المخرجات المطلوبة:
1) Adapter checklist (rename/manifest mapping)
2) CLI commands أو curl sequence لرفع الموارد
3) Minimal adapter script (bash / node) مع تعليقات
