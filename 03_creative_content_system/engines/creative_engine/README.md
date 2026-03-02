# Creative Engine
## المحرك الإبداعي المتطور

Version: 1.0  
Status: Active  
Purpose: توليد أفكار إبداعية وأساليب كتابة متنوعة للمحتوى بالعامية

---

## 1. نظرة عامة

المحرك الإبداعي هو القلب النابض لنظام الكتابة. يقوم بـ:
- 💡 **توليد الأفكار**: Ideation frameworks متنوعة
- ✍️ **تنويع الأساليب**: Tone variations متعددة
- 🎣 **صناعة الخطافات**: Hook generators قوية
- 📣 **تحسين CTA**: Call-to-action optimizers
- 🎨 **التخصيص**: Personalization engine

---

## 2. المعمارية

```
creative_engine/
├── README.md (this file)
├── config.json
│
├── ideation/                   # توليد الأفكار
│   ├── brainstorm_frameworks.json
│   ├── content_pillars.json
│   ├── angle_generator.json
│   └── theme_variations.json
│
├── tone_library/               # مكتبة الأساليب
│   ├── egyptian_tones.json
│   ├── saudi_tones.json
│   ├── tone_mixer.json
│   └── voice_profiles.json
│
├── hook_generators/            # مولدات الافتتاحيات
│   ├── question_hooks.json
│   ├── story_hooks.json
│   ├── controversial_hooks.json
│   └── data_hooks.json
│
├── narrative_structures/       # بنية السرد
│   ├── story_arcs.json
│   ├── thread_structures.json
│   ├── listicle_templates.json
│   └── case_study_formats.json
│
├── cta_optimization/           # تحسين CTA
│   ├── cta_types.json
│   ├── urgency_creators.json
│   └── value_propositions.json
│
└── creativity_boosters/        # معززات الإبداع
    ├── metaphor_generator.json
    ├── analogy_builder.json
    └── emotion_triggers.json
```

---

## 3. Ideation Frameworks

### 3.1 Brainstorm Frameworks

#### Framework 1: SCAMPER
تطبيق على المحتوى:
- **Substitute**: ماذا لو استبدلنا النبرة الرسمية بودية؟
- **Combine**: دمج storytelling مع data
- **Adapt**: تكييف محتوى عالمي للسياق المحلي
- **Modify**: تغيير الطول/الشكل
- **Put to another use**: تحويل thread لـ carousel
- **Eliminate**: إزالة الحشو
- **Reverse**: عكس السرد (البداية من النهاية)

#### Framework 2: 6 Thinking Hats
- **White Hat** (Facts): "إليك 5 إحصائيات عن..."
- **Red Hat** (Emotions): "شعوري تجاه..."
- **Black Hat** (Caution): "المشاكل التي لا يخبرك بها أحد عن..."
- **Yellow Hat** (Benefits): "لماذا هذا أفضل قرار..."
- **Green Hat** (Creativity): "فكرة جديدة تماما..."
- **Blue Hat** (Process): "خطوات عملية لـ..."

#### Framework 3: Content Angles Matrix

```json
{
  "content_angles": [
    {
      "angle": "contrarian",
      "description": "رأي مخالف للسائد",
      "example": "ليه Startup الناجح مش محتاج Funding في البداية",
      "engagement_potential": 9.0
    },
    {
      "angle": "practical_guide",
      "description": "دليل عملي خطوة بخطوة",
      "example": "ازاي تبني Personal Brand على LinkedIn في 30 يوم",
      "engagement_potential": 8.5
    },
    {
      "angle": "myth_busting",
      "description": "تفنيد خرافات شائعة",
      "example": "5 خرافات عن الـ AI لازم تتوقف تصدقها",
      "engagement_potential": 8.7
    },
    {
      "angle": "behind_the_scenes",
      "description": "خلف الكواليس",
      "example": "الحقيقة وراء بناء Startup بـ 7 أرقام",
      "engagement_potential": 8.3
    },
    {
      "angle": "personal_story",
      "description": "قصة شخصية مع درس",
      "example": "ازاي فشلت 3 مرات قبل ما أنجح",
      "engagement_potential": 9.2
    }
  ]
}
```

### 3.2 Content Pillars System

**تعريف**: الموضوعات الأساسية التي يدور حولها المحتوى

```json
{
  "brand": "TechStartup",
  "content_pillars": [
    {
      "pillar": "Education",
      "percentage": 40,
      "topics": ["AI basics", "Tech trends", "How-to guides"],
      "goal": "Build authority"
    },
    {
      "pillar": "Inspiration",
      "percentage": 30,
      "topics": ["Success stories", "Industry insights", "Future vision"],
      "goal": "Build aspiration"
    },
    {
      "pillar": "Engagement",
      "percentage": 20,
      "topics": ["Questions", "Polls", "Discussions"],
      "goal": "Build community"
    },
    {
      "pillar": "Promotion",
      "percentage": 10,
      "topics": ["Product updates", "Case studies", "Testimonials"],
      "goal": "Drive conversion"
    }
  ]
}
```

### 3.3 Angle Generator

**الوظيفة**: توليد زوايا مختلفة لنفس الموضوع

**مثال**: الموضوع = "AI في التعليم"

```json
{
  "topic": "AI في التعليم",
  "generated_angles": [
    {
      "angle": "Future vision",
      "hook": "2030: المدارس بدون مدرسين؟",
      "narrative": "رؤية مستقبلية"
    },
    {
      "angle": "Current problems",
      "hook": "ليه نظام التعليم الحالي فاشل وازاي AI هيحله",
      "narrative": "مشكلة + حل"
    },
    {
      "angle": "Personal experience",
      "hook": "اول مرة أستخدم AI لتعليم ابني... النتيجة صادمة",
      "narrative": "قصة شخصية"
    },
    {
      "angle": "Data-driven",
      "hook": "85% من المعلمين يستخدمون AI الآن. إليك السبب",
      "narrative": "إحصائيات + تحليل"
    },
    {
      "angle": "Actionable guide",
      "hook": "دليل عملي: ازاي تستخدم AI عشان تتعلم أسرع بـ 10 مرات",
      "narrative": "خطوات عملية"
    }
  ]
}
```

---

## 4. Tone Library

### 4.1 Egyptian Tones

```json
{
  "egyptian_tones": [
    {
      "tone_name": "Expert Friend",
      "description": "خبير ودود يشرح موضوع معقد ببساطة",
      "characteristics": [
        "استخدام \"بص يا سيدي\"، \"خلي بالك\"",
        "مزج المصطلحات الإنجليزية بسلاسة",
        "أسئلة بلاغية للتفاعل",
        "أمثلة من الواقع المصري"
      ],
      "sample": "بص يا سيدي، موضوع الـ AI ده مش معقد زي ما الناس فاكرة. خلي بالك، أنت فعلياً بتستخدمه كل يوم وانت مش واخد بالك...",
      "use_cases": ["LinkedIn", "Facebook", "Educational content"]
    },
    {
      "tone_name": "Sarcastic Critic",
      "description": "ناقد ساخر يفضح المشاكل",
      "characteristics": [
        "سخرية لطيفة",
        "نقد بناء",
        "كشف الحقائق المخفية",
        "استخدام \"يعني إيه يعني\"، \"طب ما كله كده\""
      ],
      "sample": "شفت نهاردة بوست عجيب... راجل بيقول عنده Startup هيغير الدنيا. طيب تمام. المشكلة إنه عامل Website بس ومفيش حتى MVP 😅",
      "use_cases": ["Twitter/X", "Hot takes", "Myth busting"]
    },
    {
      "tone_name": "Storyteller",
      "description": "راوي قصص جذاب",
      "characteristics": [
        "بداية قوية بقصة شخصية",
        "تصاعد درامي",
        "درس واضح في النهاية",
        "استخدام الحوار"
      ],
      "sample": "من 3 سنين، كنت قاعد في مقهى في وسط البلد. دخل واحد صاحبي قالي: \"عندي فكرة هتخلينا أغنياء\". ضحكت. دلوقتي الشركة بتاعته valuationها 10 مليون دولار...",
      "use_cases": ["Long-form content", "Case studies", "Inspiration"]
    }
  ]
}
```

### 4.2 Saudi Tones

```json
{
  "saudi_tones": [
    {
      "tone_name": "Professional Vision 2030",
      "description": "محترف طموح متماشي مع الرؤية",
      "characteristics": [
        "لغة رسمية مهذبة",
        "ربط بـ Vision 2030",
        "تركيز على التحول والطموح",
        "احترام السياق الثقافي والمؤسسي"
      ],
      "sample": "في إطار التحول الرقمي الذي تشهده المملكة ضمن رؤية 2030، نشهد اليوم نقلة نوعية في قطاع التقنية. الفرص أمامنا واعدة، والإمكانات هائلة...",
      "use_cases": ["LinkedIn", "Corporate", "Government sector"]
    },
    {
      "tone_name": "Friendly Saudi Professional",
      "description": "محترف سعودي ودود",
      "characteristics": [
        "مزيج من الرسمية والود",
        "استخدام تعابير سعودية بسيطة",
        "تشجيع وتحفيز",
        "تواضع"
      ],
      "sample": "صراحة، التطور اللي نشوفه في المملكة خيالي. كل يوم فيه فرصة جديدة، وكل مشروع فيه أمل. يلا نبدأ ونشوف وين توصل أحلامنا...",
      "use_cases": ["Social media", "Startups", "Youth engagement"]
    },
    {
      "tone_name": "Industry Expert",
      "description": "خبير صناعة محترم",
      "characteristics": [
        "عمق معرفي",
        "مصداقية عالية",
        "رسمي لكن قابل للنقاش",
        "تحليل دقيق"
      ],
      "sample": "بناءً على دراسة متأنية للسوق السعودي، نلاحظ أن قطاع التقنية المالية يشهد نموًا سنويًا بنسبة 32%. الأرقام تشير إلى...",
      "use_cases": ["Thought leadership", "Reports", "Analysis"]
    }
  ]
}
```

### 4.3 Tone Mixer

**الوظيفة**: مزج الأساليب لإنشاء نبرات مخصصة

```json
{
  "custom_tone": {
    "base_tone": "expert_friend",
    "add_elements": ["storytelling", "data_driven"],
    "adjust": {
      "formality": 0.4,
      "humor": 0.6,
      "technicality": 0.7
    },
    "result": "خبير ودود يروي قصص مدعومة ببيانات بأسلوب خفيف"
  }
}
```

---

## 5. Hook Generators

### 5.1 Question Hooks

```json
{
  "question_hooks": [
    {
      "type": "rhetorical",
      "template": "عارف إيه اللي [surprising fact]؟",
      "example": "عارف إيه اللي بيميز الـ Startups الناجحة عن الفاشلة؟"
    },
    {
      "type": "challenge",
      "template": "تفتكر تقدر [challenging action]؟",
      "example": "تفتكر تقدر تبني Business بدون ما تصرف جنيه واحد؟"
    },
    {
      "type": "what_if",
      "template": "لو [hypothetical scenario]، هتعمل إيه؟",
      "example": "لو معاك 100 ألف جنيه بس لبناء Startup، هتعمل إيه؟"
    },
    {
      "type": "why",
      "template": "ليه [common belief] غلط تماماً؟",
      "example": "ليه فكرة إنك محتاج Funding عشان تبدأ غلط تماماً؟"
    }
  ]
}
```

### 5.2 Story Hooks

```json
{
  "story_hooks": [
    {
      "type": "personal_failure",
      "template": "من [time period]، [failure]. دلوقتي [success]",
      "example": "من 5 سنين، فشلت في 3 مشاريع. دلوقتي شركتي Valuation 10 مليون دولار"
    },
    {
      "type": "surprising_encounter",
      "template": "من [time period]، [unexpected event]...",
      "example": "من أسبوع، دخل علي عميل قالي حاجة غيرت كل حاجة..."
    },
    {
      "type": "before_after",
      "template": "قبل [timeframe]: [bad situation]. بعد [timeframe]: [transformation]",
      "example": "قبل سنة: 0 متابع على LinkedIn. بعد سنة: 50 ألف متابع وعقود بـ 500 ألف دولار"
    }
  ]
}
```

### 5.3 Controversial Hooks

```json
{
  "controversial_hooks": [
    {
      "type": "unpopular_opinion",
      "template": "[Popular belief] هي أسوأ نصيحة ممكن تسمعها",
      "example": "\"Follow your passion\" هي أسوأ نصيحة ممكن رائد أعمال يسمعها"
    },
    {
      "type": "against_common_wisdom",
      "template": "الجميع يقول [X]. أنا أقول [opposite]",
      "example": "الجميع يقول \"اشتغل بجد\". أنا أقول \"اشتغل بذكاء وخلي غيرك يشتغل بجد\""
    },
    {
      "type": "industry_secret",
      "template": "الحقيقة اللي محدش في [industry] هيقولك عليها",
      "example": "الحقيقة اللي محدش في عالم الـ SaaS هيقولك عليها: معظم الـ Features ملهاش لازمة"
    }
  ]
}
```

### 5.4 Data Hooks

```json
{
  "data_hooks": [
    {
      "type": "shocking_stat",
      "template": "[X%] من [group] [surprising fact]",
      "example": "85% من الـ Startups بتفشل في أول سنتين. السبب مش اللي انت فاكره"
    },
    {
      "type": "comparison",
      "template": "[Group A] يحقق [X] أكثر من [Group B]. السر في [reason]",
      "example": "الشركات اللي عندها Strong Brand تحقق أرباح 20% أكثر. السر في 3 حاجات"
    },
    {
      "type": "trend",
      "template": "[Metric] زاد/قل بنسبة [X%] في [timeframe]. ده معناه إيه ليك؟",
      "example": "استخدام AI في Marketing زاد 340% في 2024. ده معناه إيه ليك كـ Marketer؟"
    }
  ]
}
```

---

## 6. Narrative Structures

### 6.1 Story Arcs

```json
{
  "story_arcs": [
    {
      "arc_name": "Hero's Journey",
      "structure": [
        "Ordinary World",
        "Call to Adventure",
        "Challenges",
        "Transformation",
        "Return with Knowledge"
      ],
      "example": "كنت موظف عادي → قررت أبدأ Startup → واجهت فشل وصعوبات → تعلمت واتطورت → دلوقتي أشارك التجربة"
    },
    {
      "arc_name": "Problem-Solution",
      "structure": [
        "Problem Introduction",
        "Impact/Pain Points",
        "Solution Reveal",
        "Implementation",
        "Results"
      ],
      "example": "المشكلة: Marketing مش فعال → الأثر: خسارة ملايين → الحل: AI-powered targeting → التطبيق: كذا → النتائج: زيادة 300%"
    },
    {
      "arc_name": "Before-After-Bridge",
      "structure": [
        "Before (Problem)",
        "After (Desired State)",
        "Bridge (How to get there)"
      ],
      "example": "قبل: صفر عملاء → بعد: 100 عميل شهرياً → الطريقة: 3 خطوات بسيطة"
    }
  ]
}
```

### 6.2 Thread Structures (Twitter/X)

```json
{
  "thread_structures": [
    {
      "name": "Listicle Thread",
      "format": "Hook tweet + Numbered points (each = 1 tweet) + Summary/CTA",
      "example": "Tweet 1: Hook\nTweet 2: Point 1\nTweet 3: Point 2\n...\nLast Tweet: Summary + CTA"
    },
    {
      "name": "Story Thread",
      "format": "Hook + Setup + Rising Action + Climax + Resolution + Lesson + CTA",
      "tweet_count": "7-10 tweets"
    },
    {
      "name": "How-To Thread",
      "format": "Hook + Context + Step 1 + Step 2 + ... + Results + CTA",
      "tweet_count": "5-8 tweets"
    }
  ]
}
```

---

## 7. CTA Optimization

### 7.1 CTA Types

```json
{
  "cta_types": [
    {
      "type": "engagement",
      "goal": "زيادة التفاعل",
      "examples": [
        "إيه رأيك؟ قولي في الكومنتات",
        "لو عجبك البوست، اعمل Share",
        "تاج حد محتاج يشوف ده"
      ]
    },
    {
      "type": "conversion",
      "goal": "تحويل لعميل",
      "examples": [
        "عاوز تتعلم أكتر؟ سجل في الكورس من الرابط",
        "جرب الخدمة مجاناً لمدة 14 يوم",
        "احجز استشارة مجانية دلوقتي"
      ]
    },
    {
      "type": "follow",
      "goal": "زيادة المتابعين",
      "examples": [
        "Follow عشان المزيد من المحتوى المفيد",
        "اشترك في النيوزليتر من هنا",
        "تابع الصفحة عشان تفضل Updated"
      ]
    }
  ]
}
```

### 7.2 Urgency Creators

```json
{
  "urgency_tactics": [
    {
      "tactic": "Limited Time",
      "template": "العرض متاح لمدة [timeframe] بس",
      "example": "العرض متاح لمدة 48 ساعة بس"
    },
    {
      "tactic": "Limited Spots",
      "template": "متبقي [number] مكان بس",
      "example": "متبقي 5 أماكن بس في البرنامج"
    },
    {
      "tactic": "FOMO",
      "template": "متفوتش الفرصة، [consequence]",
      "example": "متفوتش الفرصة، السعر هيزيد 50% الأسبوع الجاي"
    }
  ]
}
```

---

## 8. Creativity Boosters

### 8.1 Metaphor Generator

```json
{
  "metaphors": [
    {
      "concept": "Startup Growth",
      "metaphor": "زراعة شجرة",
      "usage": "بناء Startup زي زراعة شجرة: محتاج وقت، صبر، ورعاية يومية. مش هتشوف نتيجة في يوم وليلة"
    },
    {
      "concept": "Marketing Strategy",
      "metaphor": "شطرنج",
      "usage": "Marketing الناجح زي لعب الشطرنج: كل حركة محسوبة، وأنت دايماً تفكر 3 خطوات قدام"
    }
  ]
}
```

### 8.2 Emotion Triggers

```json
{
  "emotion_triggers": [
    {
      "emotion": "Curiosity",
      "triggers": [
        "السر اللي محدش هيقولك عليه",
        "الحقيقة الصادمة وراء...",
        "اكتشفت حاجة غريبة..."
      ]
    },
    {
      "emotion": "Fear (FOMO)",
      "triggers": [
        "بينما أنت نايم، منافسينك...",
        "لو ما عملتش ده دلوقتي، هتندم",
        "الفرصة مش هتتكرر"
      ]
    },
    {
      "emotion": "Hope",
      "triggers": [
        "ممكن تحقق [goal] في [timeframe]",
        "أنا كنت مكانك، ودلوقتي...",
        "الحلم مش مستحيل"
      ]
    }
  ]
}
```

---

## 9. التكامل والاستخدام

### API Request Example

```json
{
  "engine": "creative",
  "task": "generate_content",
  "params": {
    "content_type": "linkedin_post",
    "topic": "AI in Marketing",
    "dialect": "egyptian",
    "tone": "expert_friend",
    "length": "medium",
    "include_hook": true,
    "include_cta": true
  }
}
```

### Response Example

```json
{
  "content_id": "abc123",
  "generated_content": {
    "hook": "عارف ليه 90% من الـ Marketers فاشلين في استخدام AI؟",
    "body": "بص يا سيدي، الموضوع مش إنهم مش فاهمين التكنولوجيا...\n\n...",
    "cta": "إيه رأيك؟ بتستخدم AI في الـ Marketing ولا لسه؟ قولي في الكومنتات",
    "variations": [
      {"type": "shorter", "content": "..."},
      {"type": "longer", "content": "..."},
      {"type": "different_hook", "content": "..."}
    ],
    "metadata": {
      "tone_used": "expert_friend",
      "hook_type": "data_question",
      "structure": "problem_solution",
      "estimated_engagement": 8.5
    }
  }
}
```

---

## 10. الملفات ذات الصلة

- [ideation/](./ideation/) - أطر توليد الأفكار
- [tone_library/](./tone_library/) - مكتبة الأساليب
- [hook_generators/](./hook_generators/) - مولدات الافتتاحيات
- [narrative_structures/](./narrative_structures/) - بنية السرد
- [cta_optimization/](./cta_optimization/) - تحسين CTA
