تمام. خلّينا نعملها صح وبشكل تنفيذي قابل للاستخدام فورًا من فريق Product / Engineering / QA.

هنا هتلاقي Acceptance Criteria per feature
مش per story فردية، لكن مجمّعة على مستوى الـ Feature
وده الأسلوب اللي بيخلي الـ PRD “perfect & complete” فعلًا.

سألتزم بالآتي:
	•	لغة واضحة
	•	قابلة للاختبار
	•	بدون افتراضات
	•	بدون كلام تسويقي
	•	صالحة لـ QA sign-off

⸻

RIVO – ACCEPTANCE CRITERIA (MVP)

⸻

Feature 1: User Onboarding & Workspace Creation

Acceptance Criteria
	•	المستخدم يقدر يعمل Sign up باستخدام Email + Password أو OAuth (لو متاح).
	•	بعد أول Login، يتم إنشاء Workspace تلقائيًا بدون أي تدخل يدوي.
	•	المستخدم يُنقل مباشرة إلى شاشة “Get Started / Marketplace”.
	•	لا يُطلب من المستخدم أي إعدادات تقنية في هذه المرحلة.
	•	في حالة فشل إنشاء Workspace، يظهر Error واضح مع Retry.
	•	لا يمكن للمستخدم الوصول لأي Feature بدون Workspace نشط.

Definition of Done
	•	User يمكنه الوصول للمنصة خلال أقل من 30 ثانية من التسجيل.
	•	Workspace مرتبط User ID بشكل صحيح.

⸻

Feature 2: Marketplace (Browse & Discovery)

Acceptance Criteria
	•	المستخدم يرى قائمة Agents جاهزة فور فتح Marketplace.
	•	كل Agent Card تحتوي على:
	•	الاسم
	•	وصف مختصر
	•	الفئة
	•	زر Install
	•	يمكن تصفية Agents حسب:
	•	الفئة
	•	البحث بالاسم
	•	Marketplace لا يظهر Agents غير معتمدة أو غير منشورة.
	•	تحميل الصفحة يتم في أقل من 1.5 ثانية.

Definition of Done
	•	المستخدم يستطيع اختيار Agent بدون الحاجة لشرح إضافي.
	•	لا تظهر أي معلومات تقنية (Models, Tokens) في Marketplace.

⸻

Feature 3: Agent Installation

Acceptance Criteria
	•	عند الضغط على Install:
	•	يتم تثبيت Agent داخل Workspace الحالي.
	•	يظهر Confirmation واضح بالنجاح.
	•	Agent المثبّت يظهر فورًا في “My Agents”.
	•	لا يمكن تثبيت نفس Agent أكثر من مرة في نفس Workspace.
	•	في حالة فشل التثبيت:
	•	يظهر سبب واضح (Network / Validation).
	•	لا يتم ترك Workspace في حالة غير مستقرة.

Definition of Done
	•	Agent جاهز للتشغيل خلال ≤ 1 ثانية بعد التثبيت.
	•	لا توجد Configurations مطلوبة من المستخدم بعد التثبيت.

⸻

Feature 4: Playground (Run Agent)

Acceptance Criteria
	•	المستخدم يقدر يفتح Playground لأي Agent مثبت.
	•	Chat Interface تظهر مباشرة بدون تحميل إضافي.
	•	System Prompt الخاص بالـ Agent يُطبّق تلقائيًا.
	•	المستخدم يقدر يرسل Message واحدة على الأقل بدون إعدادات إضافية.
	•	الرد يظهر Streamed (Token by token) أو Batch واضح.
	•	في حالة فشل الـ Provider:
	•	يظهر Error قابل للفهم
	•	لا يتم فقدان الرسالة

Definition of Done
	•	أول رد من Agent خلال ≤ 3 ثواني في المتوسط.
	•	لا يظهر أي Prompt داخلي أو System instructions للمستخدم.

⸻

Feature 5: File Upload & Knowledge Context

Acceptance Criteria
	•	المستخدم يقدر يرفع ملفات من الأنواع:
	•	MD
	•	TXT
	•	JSON
	•	YAML
	•	النظام يمنع:
	•	ملفات غير مدعومة
	•	ملفات أكبر من الحد المحدد (مثلا 5MB)
	•	الملفات المرفوعة تظهر في قائمة واضحة داخل Playground.
	•	الملفات تُستخدم تلقائيًا كـ Context للـ Agent.
	•	المستخدم يقدر يحذف ملف في أي وقت.
	•	حذف الملف ينعكس فورًا على الجلسات التالية.

Definition of Done
	•	لا يتم إرسال الملفات الخام للموديل بدون فلترة.
	•	لا يتم تخزين الملفات Cloud بدون موافقة صريحة.

⸻

Feature 6: API Key Management

Acceptance Criteria
	•	المستخدم يقدر يختار بين:
	•	Platform API Key (افتراضي)
	•	User-provided API Key
	•	المستخدم يقدر يضيف API Key خاص به لكل Provider.
	•	الـ API Key يتم:
	•	التحقق منه قبل الاستخدام
	•	تخزينه بشكل آمن (Encrypted)
	•	في حالة API Key غير صالح:
	•	يظهر Error واضح
	•	لا يتم استهلاك أي Credits

Definition of Done
	•	التبديل بين Keys لا يتطلب Reload للصفحة.
	•	لا يتم تسجيل أو عرض الـ API Key في أي Log.

⸻

Feature 7: Provider Selection (MVP Limited)

Acceptance Criteria
	•	المستخدم يرى Provider واحد فقط في الـ MVP (Primary Provider).
	•	إذا كان Agent غير متوافق مع Provider:
	•	يتم منعه من التشغيل
	•	يظهر سبب واضح
	•	لا يظهر أي Provider غير مدعوم للمستخدم.

Definition of Done
	•	Provider abstraction موجودة لكن UI مبسطة.
	•	لا توجد خيارات مربكة في الـ MVP.

⸻

Feature 8: Usage Limits & Quota

Acceptance Criteria
	•	النظام يفرض حد Usage واضح لكل مستخدم (Runs أو Tokens).
	•	المستخدم يرى Warning عند الاقتراب من الحد.
	•	عند تجاوز الحد:
	•	يتم إيقاف التشغيل
	•	يُعرض خيار إضافة API Key خاص
	•	Usage لا يتم احتسابه مرتين لنفس الطلب.

Definition of Done
	•	لا يوجد سيناريو يستهلك Usage بدون Run ناجح.
	•	Quota reset يعمل حسب السياسة المحددة.

⸻

Feature 9: Error Handling & UX States

Acceptance Criteria
	•	كل Error له:
	•	رسالة مفهومة
	•	Action واضح (Retry / Fix / Contact)
	•	لا تظهر Stack traces أو رسائل تقنية.
	•	لا يتم فقدان بيانات المستخدم عند Error.
	•	حالات Empty State واضحة (لا Agents / لا Files).

Definition of Done
	•	لا يوجد Error Silent.
	•	المستخدم يعرف دائمًا “ماذا حدث” و “ماذا يفعل الآن”.

⸻

Feature 10: Admin – Agent Publishing (Internal)

Acceptance Criteria
	•	Admin يقدر يرفع Agent Package.
	•	يتم التحقق من:
	•	Manifest schema
	•	وجود prompts
	•	وجود knowledge files
	•	Agent لا يظهر في Marketplace إلا بعد approval.
	•	Version واحدة فقط Active لكل Agent في الـ MVP.

Definition of Done
	•	لا يمكن نشر Agent بدون اجتياز Validation.
	•	Rollback متاح داخليًا.

⸻

FINAL QUALITY GATE (MVP)

الـ MVP يُعتبر جاهز للإطلاق فقط إذا:
	•	مستخدم جديد يقدر:
	•	يسجل
	•	يثبت Agent
	•	يشغّله
	•	يحصل على قيمة خلال أول 5 دقائق
	•	بدون:
	•	شرح خارجي
	•	دعم مباشر
	•	إعدادات تقنية

⸻

لو تحب، الخطوة التالية المنطقية جدًا:
	•	تحويل Acceptance Criteria دي إلى QA Test Cases
	•	أو تحويلها إلى Engineering Tickets (Backend / Frontend split)
	•	أو عمل MVP Scope Cut يحدد ما يجب حذفه لو الوقت ضغط

قولي نكمّل على إيه.