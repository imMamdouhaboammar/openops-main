# OpenOps — Knowledge Base (Internal Notes)

> هدف هذا الملف: بناء “قاعدة معرفة” سريعة تُعرّفني (كمطور/مراجع) ما هو OpenOps داخل هذا الـ repo: ما الذي يُعتبر **مواصفات/حوكمة** (v2)، وما الذي يُعتبر **تنفيذ فعلي بالكود** (v3)، وأين توجد نقاط الدخول، وكيف تتكامل الطبقات.

---

## 0) ملخص سريع (TL;DR)

- هذا المستودع يجمع بين **نظام OpenOps Studio v2.0 كمنظومة مواصفات/حوكمة** (ملفات Markdown/JSON في مجلدات مرقّمة `00_...` إلى `10_...`) وبين **تنفيذ أولي/مبدئي لـ Runtime v3.0 بالكود** داخل `src/` (Node.js + TypeScript + Express).
- الـ v2.0 هنا أقرب إلى “نظام تشغيل معرفي” knowledge-base + سياسات + تعريفات وكلها **مصدر حقيقة (Source of Truth)** للحوكمة والتشغيل داخل العقول/الأنظمة التي تقرأ هذه الملفات (مثل Gemini Gems).
- الـ v3.0 في `src/` هو **سيرفر** (Express) و”Runtime Engine” مع Boot phases، لكنه حاليًا **Placeholder**: يمر على مراحل التحميل ويضع TODOs بدل التنفيذ الكامل لقراءة ملفات v2 وتشغيلها فعليًا.
- يوجد أيضًا “مسار منتج” إضافي: `specs/` يحتوي مواصفات Spec Kit لمشاريع مثل Marketplace وAccount Center (توثيق + OpenAPI)، مع وجود مجلدات `backend/` و`frontend/` كقوالب (skeleton) لكنها شبه فارغة على مستوى الكود.

---

## 1) الصورة الكبرى: ما هو OpenOps في هذا repo؟

### 1.1 تعريف عملي
OpenOps Studio (كما يظهر في ملفات الحوكمة) هو إطار عمل لتشغيل فريق SaaS “افتراضي” متعدد الأدوار عبر **Rounds** ثابتة:

`Plan → Research → Blueprint → Detail → QA → Handoff`

كل Round له:
- هدف
- مدخلات إلزامية
- مخرجات إلزامية
- شروط خروج/فشل

الهدف النهائي: إنتاج مخرجات “Decision-grade” قابلة للتسليم لفريق حقيقي (PRD/Architecture/Prompt kits/Tracking/UX…).

### 1.2 نسختان داخل نفس المستودع
يوجد تداخل نسخي واضح:

- **v2.0 (Knowledge/Config-driven)**:
  - المصدر: مجلدات مرقّمة `00_governance/` … `10_legacy/` + `integration_config.json`.
  - طبيعة المحتوى: Markdown/JSON تصف السياسات والأنظمة ووحدات العمل.
  - مثال: `00_governance/00_OpenOps_Constitution_and_IP_Policy.md`, `01_orchestration/01B_Integration_Config.json`.

- **v3.0 (Code-driven runtime)**:
  - المصدر: `src/`
  - طبيعة المحتوى: TypeScript يعرّف runtime + server + config + middleware.
  - نقطة التشغيل الافتراضية: `npm run boot` يشغل `tsx src/index.ts`.

> ملاحظة: يوجد أيضًا runtime قديم/تمثيلي داخل `01_orchestration/runtime/index.ts` يقوم بتحميل ملفات JSON/MD مباشرة لكنه يبدو أقرب إلى “عرض/محاكاة” للـ boot sequence وليس تنفيذ production-ready.

---

## 2) خريطة الدلائل (Where to look first)

### 2.1 نقاط الدخول (Entry Points)
- Runtime/Server v3: `src/index.ts`
  - ينشئ Express app ويضيف:
    - `GET /health`
    - `GET /ready` (يعتمد على state داخل `OpenOpsRuntime`)
    - `GET /metrics` (اختياري حسب `PROMETHEUS_ENABLED`)
  - ثم يشغّل: `src/core/runtime/OpenOpsRuntime.ts`

- Runtime v2 (تمثيلي): `01_orchestration/runtime/index.ts`
  - يعرّف BootState ومراحل تحميل الطبقات (مع delays) ويشغّل `main()` إذا كان run directly.

### 2.2 أهم ملفات الحوكمة (v2 Source-of-Truth)
اعتبر هذه الملفات “دستور التشغيل”:

- الدستور + IP/عدم الإفشاء: `00_governance/00_OpenOps_Constitution_and_IP_Policy.md`
- راوتر الجولات: `01_orchestration/01_Orchestration_Engine_and_Rounds_Router.md`
- تعريف النظام/الأدوار/الراوتر: `00_governance/00A_OpenOps_Main_Orchestrator_System_Prompt.json`
- سجل التدقيق والقرارات: `00_governance/00B_OpenOps_Audit_and_Decision_Ledger.json`
- مخاطر/فشل/استعادة: `00_governance/00C_OpenOps_Risk_and_Failure_Playbook.md`

### 2.3 ملف الفهرس الرسمي للملفات (Authoritative load order)
- `00_governance/00E_System_File_Index.json`
  - يحدد load order عبر طبقات (governance → orchestration → agents → core systems…)
  - يعرّف “gemini_upload_profiles” (حزم الملفات عند رفع النظام كـ Gem).
  - يعرّف أيضًا `targets.*` لتجهيز حزم متعددة المنصات (Gemini Gems / ChatGPT GPTs / Claude Skills) مع نفس منطق الـ profiles والـ addons.

---

## 3) طبقات OpenOps (v2) — ماذا تمثل كل طبقة؟

> المجلدات المرقّمة تمثل “طبقات تشغيل” (Layered architecture). المحتوى داخلها غالبًا ملفات مواصفات وتشغيل.

### 3.1 00_governance/
الحوكمة والسياسات العليا:
- القواعد/الرفض/السرية
- سجل التدقيق (Audit Ledger)
- مخاطر وفشل واستعادة (Risk & Failure Playbook)
- فهرس ملفات النظام (System file index)

### 3.2 01_orchestration/
محرك التوجيه والانتقالات (Rounds + routing):
- `01A_Execution_Context_Manager.json`: إدارة السياق (Context) + عزل الذاكرة + snapshots + hooks.
- `01B_Integration_Config.json`: dependency graph + runtime hooks + QA thresholds.
- `01C_Failure_Recovery_Manager.json`: signal detection + classification + recovery strategies.
- `01E_Workflow_Registry.json`: تعريف workflows وربطها بالRounds.
- `01F_Output_Contracts.json`: “عقد المخرجات” لكل round (حقول إلزامية/اختيارية).

### 3.3 02_agents/
وصف “النظام متعدد الوكلاء”:
- الأدوار/القدرات/الصلاحيات: `02A_Agent_Roles_Config.json`
- الذاكرة + التسجيل + التدقيق: `02B_Agent_Memory_Registry.json`, `02C_Agent_Logging_and_Audit.json`
- شخصيات الوكلاء: `02D_Agent_Personality_Profile.json`

### 3.4 03_product/ + 04_research/ + 05_architecture/ + 06_security/ + 07_tracking/ + 08_ux/
هذه الطبقات تعمل كـ “Playbooks” أو “Frameworks” إلزامية:
- Product/PRD discipline
- Research discipline + evidence grading
- Architecture rules + tradeoffs + ADRs
- Security/privacy gates + classification/RBAC/encryption
- Tracking discipline + event schemas + experimentation
- UX rules + copy guidelines + accessibility

### 3.5 09_tooling/
طبقة تعريف الأدوات والـ Prompt pipeline:
- `09_tooling/09A_Prompt_Template_Registry.json`
- `09_tooling/09B_Tool_and_API_Mapping.json`
- `09_tooling/09C_Agent_Prompt_Mapping.json`
- `09_tooling/09D_Runtime_Prompt_Pipeline.json`

> يوجد أيضًا playbook عام في الجذر: `09_PromptKit_and_Tooling_Handoff.md` يحدد قواعد كتابة الـ PromptKits و”Docs Gate” و”Validation steps”.

### 3.6 10_legacy/
محتوى قديم/مهاجر (Deprecated modules & migration) داخل `10_legacy/`.

> يوجد ملف كبير في الجذر: `10_Legacy_Old_Scope.md` يحتوي محتوى “متعدد الأنواع” (إرشادات + JSONs + تكرارات). اعتبره مرجعًا غير منظم مقارنةً بملفات v2 المعيارية.

---

## 4) كيف “يعمل” النظام نظريًا؟ (Boot + Rounds)

### 4.1 Boot sequence (كما في v2/v2-runtime)
1) Governance  
2) Orchestration  
3) Agents  
4) Research  
5) Architecture & Storage  
6) Security  
7) Analytics  
8) UX  
9) Tooling  
10) QA boot pass + logging checkpoints  

يمكن رؤية هذا التسلسل بوضوح في:
- `01_orchestration/runtime/index.ts` (BootState + delays)
- `src/core/runtime/OpenOpsRuntime.ts` (RuntimeState + phases + TODOs)

### 4.2 Rounds (Plan → … → Handoff)
- المرجع الأساسي: `01_orchestration/01_Orchestration_Engine_and_Rounds_Router.md`
- العقود: `01_orchestration/01F_Output_Contracts.json`
- فكرة “عدم القفز” بين المراحل هي حجر الأساس: التقدم “يُكتسب” عبر اكتمال شروط الخروج والـ QA gates.

---

## 5) التنفيذ بالكود (v3) — ما الموجود فعليًا؟

### 5.1 Express API Skeleton
- `src/index.ts`:
  - middleware: `helmet`, `cors`, `compression`, `express-rate-limit`
  - endpoints:
    - `/health` (alive)
    - `/ready` (يعتمد على runtime state)
    - `/metrics` (اختياري)

### 5.2 Runtime Engine (placeholder)
- `src/core/runtime/OpenOpsRuntime.ts`:
  - EventEmitter
  - states: `IDLE → INITIALIZING → LOADING_* → READY/ERROR`
  - `validateConfiguration()` يستخدم Zod-validated config ويُعدّد required keys (حاليًا `NODE_ENV`, `PORT`)
  - كل `load*Layer()` هو TODO + محاكاة latency (simulateAsyncLoad)

### 5.3 Config system
- `src/core/config/index.ts`:
  - Zod schema يقرأ من `process.env` (dotenv)
  - تعريف keys كثيرة: DB/Redis/Neo4j/OpenAI/Anthropic/AWS/Sentry/Prometheus/JWT…
  - `getMaskedConfig()` لإخفاء القيم الحساسة عند logging

### 5.4 Logging & Error handling
- `src/core/logger/index.ts`: Pino + pretty print في dev
- `src/core/errors/*`: AppError hierarchy + Express error middleware

### 5.5 Security middleware (JWT + hygiene)
- `src/security/middleware/authMiddleware.ts`:
  - JWT verify + role-based checks
  - basic API key middleware (TODO validation)
  - requestId + requestLogger + sanitizeInput + ipWhitelist

### 5.6 Infrastructure: Redis cache
- `src/infrastructure/cache/CacheManager.ts`:
  - Redis client (`redis` v5) + key prefix + TTL + helper methods

---

## 6) “Marketplace” و“Account Center” (Spec-driven فقط حتى الآن)

### 6.1 specs/
يوجد مجلد `specs/` يحتوي وثائق Spec Kit لمشاريع:
- `specs/002-agents-fleet-marketplace/`: خطة، قواعد، OpenAPI (`contracts/api.openapi.yaml`)، features specs… إلخ.
- `specs/003-account-center/`: spec + checklist + سلسلة مهام (50 task ملفات).

### 6.2 backend/ و frontend/
- يوجد `backend/README.md` و`frontend/README.md` يصفان مشروع Marketplace،
  لكن داخل `backend/src/` و`frontend/src/` لا توجد ملفات TypeScript فعلية (فقط بنية مجلدات وملفات `.DS_Store`).
- هذا يعني أن Marketplace حالياً “مواصفات + وثائق” أكثر من كونه تطبيقًا مكتملًا داخل هذا repo.

---

## 7) أدوات/سكربتات مساعدة داخل repo

### 7.1 Validator للـ JSON modules
- `scripts/validate-config.ts`:
  - يمر على طبقات `00_..` إلى `10_..` ويقرأ ملفات `.json`
  - يتحقق من وجود `module.{name,version,layer,code,description}` + governance/objectives
  - يتحقق من `integration_points.imports_from/exports_to` عبر بحث بسيط بالاسم

### 7.2 ملاحظة عن scripts في package.json
- في `package.json` توجد سكربتات مذكورة وغير موجودة فعليًا في `scripts/`:
  - `scripts/qa-boot-test.ts` (غير موجود)
  - `scripts/generate-module.ts` (غير موجود)
  - الموجود فقط حاليًا: `scripts/validate-config.ts`

---

## 8) ملاحظات جودة/اتساق (Inconsistencies & Gaps)

هذه نقاط مهمّة إذا أردنا تحويل المشروع إلى تنفيذ production-ready:

1) **تعدد مصادر الحقيقة (v2 vs v3)**  
   - v2 يملك load order وworkflow registry وoutput contracts… لكن v3 runtime لا يقرأ/يطبّق هذه الملفات بعد.

2) **tsconfig.json في الجذر يحتوي قيم غير معتادة**  
   - `include` يحتوي `srcdules` (يبدو typo) ويحتوي `dist`  
   - `rootDir` = `./src` بينما include يضم طبقات أخرى (`00_governance/**/*.ts`, `01_orchestration/**/*.ts`) — قد يسبب مشاكل build لو وُجدت ملفات TS هناك لاحقًا.

3) **backend/frontend مشاريع موصوفة لكن غير منفّذة**  
   - اقرأهما كـ target architecture/spec وليس كـ codebase جاهز.

4) **ملفات `.DS_Store` كثيرة**  
   - المستودع يحتوي عدد كبير منها (macOS). عادةً تُزال من git وتُضاف إلى `.gitignore` لتقليل noise.

5) **.specify يحتوي سياق مشروع مختلف (PixelForge Studio)**  
   - `/.specify/memory/project-context.md` يصف PixelForge وليس OpenOps. هذا قد يعني أن الـ repo يستضيف أكثر من نظام/مشروع أو توجد artifacts من مشروع آخر.

---

## 9) كيف أشغّل الجزء البرمجي الموجود الآن؟

من جذر المشروع:

```bash
npm install
npm run dev
```

أو تشغيل مرة واحدة:

```bash
npm run boot
```

ثم:
- `GET http://localhost:<PORT>/health`
- `GET http://localhost:<PORT>/ready`

> قيمة `PORT` تأتي من env (افتراضيًا 3000 داخل `src/core/config/index.ts`).

---

## 10) “خارطة طريق” من مواصفات v2 إلى تنفيذ v3

إذا كان الهدف تحويل OpenOps من “KB/spec” إلى runtime فعلي:

1) إضافة Loader يقرأ `00_governance/00E_System_File_Index.json` ويطبق load order.
2) بناء طبقات تنفيذية حقيقية لكل Layer (Governance/Orchestration/Agents…).
3) تطبيق `01_orchestration/01F_Output_Contracts.json` كـ schemas داخل v3 (Zod).
4) ربط Audit Ledger فعليًا بخزن (S3/DB/JSONL) مع masking وحماية secrets.
5) تفعيل security gates وربطها بـ middleware/API boundaries.

---

## 11) ملفات مرجعية (Quick links)

- تشغيل v3: `src/index.ts`
- Runtime v3: `src/core/runtime/OpenOpsRuntime.ts`
- Config v3: `src/core/config/index.ts`
- Orchestration Router: `01_orchestration/01_Orchestration_Engine_and_Rounds_Router.md`
- Integration graph: `01_orchestration/01B_Integration_Config.json`
- System file index: `00_governance/00E_System_File_Index.json`
- Output contracts: `01_orchestration/01F_Output_Contracts.json`
- Validator: `scripts/validate-config.ts`

---

© OpenOps Studio  
Strategic and Execution Framework  
Created by Mamdouh Aboammar  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar
