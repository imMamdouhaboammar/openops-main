# Spec-kit for OpenOps Agents Fleet

هذا الملف يشرح ما يحتويه Spec-kit وكيفية استخدامه لتسريع بناء صفحات المنتجات، adapters، وعمليات التكامل.

محتويات رئيسية

- Prompts: قوالب God-level prompts لتوليد وصف المنتج، خطوات التثبيت، تعليمات الأمان، وملخصات تقنية.
- Templates: قوالب صفحات المنتج (Markdown/FrontMatter) وملفات `manifest.json` نموذجية.
- API stubs: OpenAPI/contract examples لتكامل الاستيراد والـ webhooks.
- Scripts: أدوات لتفريغ القوالب إلى أماكن العمل، وإعداد بيئة التطوير المحلية.

أهداف الاستخدام

1. جعل كل منتج قابلًا للتوليد تلقائيًا من metadata + prompt
2. توفير نفس بنية الـ manifest لكل بائع لتسهيل التحويل بين المنصات
3. تسهيل مراجعة الأمان الآلية (SCA) عبر قواعد موحدة للفحص

مثال: مسار سريع لإنشاء صفحة منتج

1. انسخ قالب `prompts/product_prompt.template.md` وأدخل الحقول.
2. شغّل `scripts/install_speckit.sh --deploy-product ./path/to/new-product` لنسخ القالب وتحويله إلى ملف Markdown جاهز.

توصية: احتفظ بكل المنتجات في `content/products/{vendor}/{product}` واحفظ الـ manifest داخل الأرشيف `manifest.json` و`README.md` داخل كل حزمة.
