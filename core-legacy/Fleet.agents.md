## OpenOps Agents Fleet — مواصفات ومكونات الموقع (God-level Prompt)

OpenOps Studio

OpenOps Studio Inc — شركة مسجلة في الإمارات العربية المتحدة.

الهيدر: OpenOps Agents Fleet

ملخص تنفيذي

OpenOps Agents Fleet هو سوق e‑commerce متقدّم لبيع وشراء شيفرات ومواصفات وكلاء ذكاء اصطناعي مفتوحة المصدر (source code + agent specs) جاهزة للتشغيل أو التعديل لتشغيلها على منصات مثل Gemini Gems, ChatGPT Custom GPTs, Claude Skills وغيرها. يتم توزيع الشيفرة في أرشيف مضغوط (.zip) يحتوي على JSON, MD, YML, pseudo, scripts، وملفات تكوين وملاحظات تشغيل.

هذا المستند هو "God-level Prompt" لتوليد الوصف، واجهات المنتج، المواصفات التقنية، وتجربة المستخدم للموقع.

## أهداف المنتج

- سوق موثوق للمؤسسات لشراء وكلاء ذكاء اصطناعي جاهزين
- تنويع نماذج التوزيع: مفتوح المصدر مع تراخيص تجارية/دعم
- تبسيط عمليات الاستيراد إلى Gemini Gems، ChatGPT Custom GPTs، Claude Skills عبر واجهات رفع أو أدوات مساعدة
- تجربة مستخدم احترافية، مع دعم RTL (العربية) وLTR (الإنجليزية)

## الجمهور المستهدف

- فرق AI/ML في الشركات
- مطورو الوكلاء ومستودعات النماذج
- شركات تكامل أنظمة تبحث عن حلول جاهزة

## متطلبات المنتج الأساسية

1) كتالوج منتجات
   - صفحات منتج تفصيلية تحتوي: اسم المنتج، وصف موجز وطويل، ملف ZIP للتحميل، قائمة ملفات داخل الأرشيف، تصنيف (Agent Type)، التوافق (Gemini/ChatGPT/Claude)، متطلبات التشغيل، لقطات شاشة، فيديو توضيحي، demo link, إصدار، changelog
   - معاينة شيفرة مدعومة بعارض كود مع تمييز نحوي لملفات JSON/YML/MD/Pseudo
   - زر "استيراد تلقائي" لتقديم ملف مضغوط إلى أداة استيراد خاصة بالمنصة (خدمة Cloud/CLI) أو تنزيل مباشر

2) صفحة شراء وتجربة السلة
   - خيارات تراخيص: MIT/Apache/BSD (OSS) + تراخيص تجارية أو اشتراك دعم
   - حل دفع متكامل (Stripe, PayPal، بوابات محلية في المنطقة) مع فواتير وضرائب مضافة
   - إدارة تراخيص للمشتري: مفاتيح ترخيص، روابط تنزيل، صلاحيات الوصول

3) لوحة البائع
   - رفع منتج جديد (واجهة رفع ZIP + وصف + فحص تلقائي للشيفرة)
   - إصدارات المنتج وإدارة التخريج (semver)
   - إحصاءات مبيعات، مراجعات، تقارير مشكلات

4) لوحة الإدارة
   - إدارة مستخدمين/بائعين/منتجات
   - عملية مراجعة وقبول المنتجات (vetting)
   - تكاملات أمان: فحص شيفرة آلي (SCA), Trivy, snyk أو أدوات مماثلة

5) تجربة التثبيت والتكامل
   - مستندات "كيفية الاستيراد" لكل منصة: Gemini Gems, ChatGPT Custom GPTs, Claude Skills
   - سكربتات أو CLI مساعدة لفك الأرشيف، تحويل المواصفات، رفعها للمنصة المستهدفة
   - نموذج تدفق: Upload ZIP -> Auto-scan -> Generate Adapter (optional) -> Export to Platform

6) الجودة والسلامة
   - فحص أمان للشيفرة عند الرفع
   - فحوصات للخصوصية (التأكد من عدم وجود أسرار/مفاتيح داخل الأرشيف)
   - رقابة على المحتوى ونظام بلاغات

7) تجربة المستخدم (UX)
   - دعم ثنائي اللغة (AR/EN) وRTL
   - تصميم Responsive, WCAG AA accessibility
   - ثيم: Dark / Light مع مبدل سريع (theme switcher)

## مواصفات النسخة الفاتحة (Light) والـ Theme Switcher

- دعم سمات: CSS variables (custom properties) + prefers-color-scheme media-query
- تصميم مُبسّط للنسخة الفاتحة: ألوان هادئة، تباين عالي للقراءة، ظلال خفيفة
- عنصر المبدّل: زر في الهيدر (icon sun/moon) يحفظ التفضيل في localStorage ويدعم sync عبر الحساب
- تنفيذ تقني مختصر:
  - HTML: إضافة attribute `data-theme="light|dark"` على `<html>`
  - CSS: جميع الألوان من متغيرات: `--bg`, `--fg`, `--muted`, `--accent`
  - JS: عند تبديل: setAttribute('data-theme', 'light')؛ localStorage.setItem('theme','light')
  - الاستجابة لتفضيل النظام: `if (!localStorage.getItem('theme')) use prefers-color-scheme`

Suggested Light palette (example):
- --bg: #ffffff
- --fg: #0f172a
- --muted: #6b7280
- --accent: #0ea5a4 (teal)

## هيكل واجهة المستخدم المقترح

- Header: شعار OpenOps (يسار RTL/يمين LTR) + عنوان "OpenOps Agents Fleet" + theme switcher + search
- Search & filters: نص، فلاتر للمنصة (Gemini/ChatGPT/Claude), فئة الوكيل، لغة الشيفرة، تراخيص
- Product grid: بطاقات بها صورة، ملخص، سعر، badge للتوافق
- Product page: تفاصيل، gallery، file ZIP، preview code viewer، زر استيراد
- Footer: روابط قانونية، contact, docs, privacy

## المواصفات التقنية المقترحة (stack)

- Frontend: Next.js (React) أو Vue/Nuxt مع SSR/ISR للـ SEO
- UI: Tailwind CSS + Headless UI
- Highlighting: PrismJS أو Shiki for server-side highlighting
- Backend: Node.js (NestJS / Fastify) أو Python (FastAPI)
- Database: PostgreSQL + Redis
- Storage: S3-compatible for ZIPs + Cloud CDN
- Payments: Stripe + بوابات محلية
- CI/CD: GitHub Actions
- Security: Container scanning, dependency scanning (trivy/snyk), secret scanning

## تجربة البائع والمشتري

بائع:
- يسجل كبائع، يملأ صفحة المنتج، يرفع ZIP
- يخضع المنتج لفحص آلي ويدخل في قائمة مراجعة بشرية
- بعد الموافقة، يُدرج المنتج ويصبح متاحاً للبيع

مشتري:
- بحث، فلترة، معاينة، شراء
- بعد الدفع يظهر رابط تنزيل، وواجهة إدارة تراخيص
- خيار "استيراد تلقائي" الذي يوجه المستخدم لعملية رفع على المنصة المختارة أو تنزيل ملف adapter

## التشغيل التكامل مع Gemini / ChatGPT / Claude

- مواصفات التوافق: لكل منتج حاجة واضحة (metadata) توضح الحقول المطلوبة لكل منصة
- مثال: `manifest.json` يحتوي على الحقول: platform_compatibility: ["gemini","chatgpt","claude"]
- أدوات مساعدة: scripts/convert-to-gemini.sh, cli import-cli --to chatgpt

## الأمن والالتزام القانوني

- التزام قوانين الإمارات وGDPR عند التعامل مع بيانات المستخدمين
- عقود بائع/مشتري، سياسة إلغاء واسترداد، تراخيص واضحة لكل منتج

## تجربة التشغيل والاعتمادية

- CDN لتوزيع الأرشيفات
- signed URLs لتنزيلات مؤقتة
- rate limiting وWAF

## SEO، Analytics، الأداء

- صفحات منتجات SSR، structured data (schema.org/Product) وOpenGraph
- telemetry: Mixpanel/Amplitude + server-side events
- Lighthouse target: 90+ for performance/accessibility

## نموذج "God-level" Prompt لتوليد صفحة منتج أو إعلان

Prompt (Arabic) — قالب لإنتاج وصف وخصائص المنتج تلقائياً:

"أنت OpenOps Product Writer: اكتب وصفاً احترافياً لمنتج وكيل ذكاء اصطناعي موجه للمؤسسات. اسم المنتج: {{NAME}}. الهدف: {{PURPOSE}}. المنصات المتوافقة: {{COMPATIBILITY}}. مكونات الأرشيف: {{FILES_LIST}}. متطلبات التشغيل: {{RUNTIME}}. مثال بسيط على استدعاء: {{USAGE_SNIPPET}}. اذكر فوائد الاستخدام، حالات الاستخدام المقترحة، والقيود المعروفة. اكتب ملخصًا (one-liner)، ثم قسم ميزات، ثم خطوات التثبيت السريعة (3-5 خطوات)، ثم نصائح الأمان. اجعل النبرة رسمية، موجّهة للمهنيين، وطويلة بما يكفي لتغطي الفني والعملي." 

## قالب صفحة منتج (Markdown snippet)

---
title: {{NAME}}
platforms: {{COMPATIBILITY}}
license: {{LICENSE}}
version: {{VERSION}}
---

# {{NAME}}

{{ONE_LINER}}

## الميزات
- ...

## الملفات داخل الأرشيف
- {{FILES_LIST}}

## خطوات التثبيت السريعة
1. تنزيل ZIP
2. فك الضغط
3. تشغيل `install.sh` أو اتباع التعليمات في `README.md`

## حقوق وملخص الترخيص
- {{LICENSE_DETAIL}}

## ملاحظة قانونية
- هذا المنتج مقدم بواسطة بائع مستقل. OpenOps Studio يوفر المنصة والضمانات الأساسية فقط.

## ملاحظات أخيرة

هذا الملف هو مصدر شامل لتوليد مستندات المنتج، التصميم العام، ومواصفات التطوير. بعد اعتماد المستند يمكن تحويل مقاطع منه إلى user stories، واجهات API spec (OpenAPI)، ومخططات قواعد بيانات.

---

Contact: OpenOps Studio Inc — legal@openops.studio
