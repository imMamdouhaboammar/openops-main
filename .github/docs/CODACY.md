# Codacy Integration Guide
# دليل تكامل Codacy

<div dir="rtl">

## 🎯 نظرة عامة

تم تكوين **Codacy** بشكل كامل في مشروع **PixelForge Studio** لتحليل جودة الكود، اكتشاف المشاكل الأمنية، وقياس التعقيد.

---

## ✅ ما تم تكوينه

### 1. ملفات التكوين

| الملف | الوصف |
|-------|-------|
| `.codacy.yml` | التكوين الرئيسي لـ Codacy |
| `.codacy.json` | تكوين JSON بديل |
| `.github/workflows/codacy.yml` | GitHub Actions workflow |
| `.github/instructions/codacy.instructions.md` | تعليمات للـ AI |

---

### 2. npm Scripts

```bash
npm run codacy:config  # عرض التكوين
npm run codacy:check   # معلومات التحليل
npm run codacy:docs    # عرض هذا الدليل
```

---

### 3. GitHub Actions

تم إعداد workflow يعمل:
- ✅ عند كل push لـ main/develop
- ✅ عند كل Pull Request
- ✅ يومياً في الساعة 2 صباحاً UTC

---

## 🚀 كيفية الاستخدام

### الطريقة 1: عبر GitHub Copilot MCP Server

إذا كان لديك Codacy MCP Server مفعّل في GitHub Copilot:

```javascript
// بعد تعديل أي ملف، سيتم التحليل تلقائياً
// AI سيستدعي codacy_cli_analyze تلقائياً
```

**القواعد التلقائية**:
- ✅ بعد أي `edit_file` → تحليل فوري
- ✅ بعد `npm install` → فحص أمني بـ Trivy
- ✅ إذا وُجدت مشاكل → اقتراحات وإصلاحات تلقائية

---

### الطريقة 2: عبر GitHub Actions

عند push أو Pull Request:

```bash
# 1. Push الكود
git add .
git commit -m "feat: add new feature"
git push

# 2. GitHub Actions ستشغل Codacy تلقائياً
# 3. النتائج ستظهر في:
#    - GitHub Security tab
#    - Pull Request checks
#    - Codacy dashboard (إذا كان متصلاً)
```

---

### الطريقة 3: محلياً (إذا كان Codacy CLI مثبتاً)

```bash
# تحليل المشروع بالكامل
codacy analyze

# تحليل ملف محدد
codacy analyze --file src/App.tsx

# تحليل مع رفع النتائج
codacy analyze --upload
```

---

## 📋 ماذا يحلل Codacy؟

### 1. جودة الكود (Code Quality)

- ✅ **ESLint** - قواعد JavaScript/TypeScript
- ✅ **TypeScript** - تحقق الأنواع الصارم
- ✅ **Code Patterns** - الأنماط السيئة
- ✅ **Best Practices** - أفضل الممارسات

**الأمثلة**:
```typescript
// ❌ سيكتشف Codacy:
const x: any = getData(); // استخدام 'any'
console.log(x); // console في production

// ✅ الصحيح:
const x: UserData = getData();
logger.info(x);
```

---

### 2. التعقيد (Complexity)

- ✅ **Cyclomatic Complexity** - تعقيد دورات الكود
- ✅ **File Complexity** - تعقيد الملفات
- ✅ **Function Complexity** - تعقيد الوظائف

**الحدود المكونة**:
- Max Complexity per Function: `15`
- Max File Lines: `400` (من الدستور)

---

### 3. التكرار (Duplication)

- ✅ **Code Clones** - الكود المكرر
- ✅ **Similar Blocks** - الكتل المتشابهة

**الإعدادات**:
- Min Tokens: `50`
- Min Lines: `10`

---

### 4. الأمان (Security)

- ✅ **Trivy** - فحص الثغرات الأمنية
- ✅ **Dependencies** - فحص الاعتماديات
- ✅ **Security Patterns** - الأنماط الأمنية

**متى يعمل**:
- بعد `npm install`
- بعد تعديل `package.json`
- عند إضافة dependencies جديدة

---

## ⚙️ التكوين المخصص

### .codacy.yml

```yaml
# الملفات المستبعدة من التحليل
exclude_paths:
  - "node_modules/**"
  - "dist/**"
  - "build/**"
  - "coverage/**"
  - "**/*.min.js"
  - ".specify/**"
  - "public/**"

# الأدوات المفعّلة
engines:
  eslint:
    enabled: true
  
  duplication:
    enabled: true
    config:
      languages:
        - typescript
        - javascript
  
  metrics:
    enabled: true
  
  trivy:
    enabled: true  # فحص الأمان

# الحدود
complexity:
  max_complexity: 15
  max_file_complexity: 400

duplication:
  min_tokens: 50
  min_lines: 10
```

---

### .codacy.json

```json
{
  "files": {
    "ignore": [
      "node_modules/**",
      "dist/**",
      "**/*.min.js",
      ".specify/**"
    ]
  },
  "tools": {
    "eslint": {
      "enabled": true
    },
    "typescript": {
      "enabled": true,
      "strict": true
    }
  },
  "duplication": {
    "enabled": true
  },
  "metrics": {
    "enabled": true,
    "complexity": {
      "threshold": 15
    }
  }
}
```

---

## 🔧 سيناريوهات الاستخدام

### سيناريو 1: تعديل ملف موجود

```typescript
// 1. تعديل الملف
// src/components/Button.tsx

export const Button = () => {
  return <button>Click</button>
}

// 2. AI سيحلل تلقائياً (إذا كان MCP مفعّل)
// 3. إذا وُجدت مشاكل، سيقترح إصلاحات:

// ❌ مشكلة: Missing accessibility
export const Button = () => {
  return <button>Click</button>
}

// ✅ الإصلاح المقترح:
export const Button = ({ 
  onClick, 
  children, 
  ariaLabel 
}: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
```

---

### سيناريو 2: إضافة dependency جديدة

```bash
# 1. إضافة package
npm install react-markdown

# 2. AI سيشغل Trivy تلقائياً
# 3. إذا وُجدت ثغرات أمنية:
#    - ⚠️  سيوقف جميع العمليات
#    - 📋 سيعرض الثغرات
#    - 🔧 سيقترح بدائل آمنة
#    - ✅ سيكمل فقط بعد الحل

# 4. مثال على التحذير:
# ⚠️  Security vulnerability found in react-markdown@8.0.0
#     CVE-2023-XXXXX: XSS vulnerability
#     Recommendation: Upgrade to react-markdown@9.0.0
```

---

### سيناريو 3: Pull Request Review

```bash
# 1. إنشاء PR
git checkout -b feature/new-component
git push origin feature/new-component

# 2. فتح Pull Request على GitHub

# 3. Codacy سيشتغل تلقائياً:
#    ✅ تحليل الكود الجديد
#    ✅ مقارنة مع main branch
#    ✅ عرض المشاكل الجديدة فقط
#    ✅ إضافة تعليقات في PR

# 4. النتائج ستظهر:
#    - في PR checks (✅/❌)
#    - في تعليقات على الأسطر
#    - في Codacy dashboard
```

---

## 📊 فهم النتائج

### Codacy Grades

```
A+ : ممتاز جداً (0-2 issues)
A  : ممتاز (3-10 issues)
B  : جيد جداً (11-25 issues)
C  : جيد (26-50 issues)      ← الحد الأدنى المقبول
D  : مقبول (51-100 issues)
E  : ضعيف (101-200 issues)
F  : سيء جداً (>200 issues)
```

**الهدف**: الحفاظ على `Grade B` أو أعلى

---

### Issue Severity

```
🔴 Critical  : يجب الإصلاح فوراً (أمان، bugs خطيرة)
🟠 High      : يجب الإصلاح قريباً (جودة، أداء)
🟡 Medium    : يُفضل الإصلاح (code style، best practices)
🟢 Low       : اختياري (تحسينات صغيرة)
```

---

### Issue Categories

| الفئة | الوصف | الأولوية |
|------|-------|---------|
| **Security** | ثغرات أمنية | 🔴 Critical |
| **Error Prone** | prone للأخطاء | 🟠 High |
| **Performance** | مشاكل أداء | 🟠 High |
| **Code Style** | أسلوب الكود | 🟡 Medium |
| **Compatibility** | التوافق | 🟡 Medium |
| **Documentation** | التوثيق | 🟢 Low |
| **Unused Code** | كود غير مستخدم | 🟢 Low |

---

## 🛠️ حل المشاكل الشائعة

### المشكلة 1: "Codacy CLI not installed"

**الحل**:
```bash
# Codacy CLI اختياري في هذا المشروع
# استخدم بدلاً من ذلك:
# 1. GitHub Copilot MCP Server (تلقائي)
# 2. GitHub Actions (عند push/PR)
# 3. ESLint محلياً
npm run lint
```

---

### المشكلة 2: "Too many issues found"

**الحل**:
```bash
# 1. ابدأ بالـ Critical issues
# صفّي حسب الخطورة في Codacy dashboard

# 2. أصلح فئة واحدة في كل مرة
# مثلاً: ابدأ بـ Security

# 3. استخدم ESLint للإصلاح التلقائي
npm run lint -- --fix

# 4. راجع الدستور للقواعد
npm run spec:constitution
```

---

### المشكلة 3: "False positives"

**الحل**:
```typescript
// إذا كانت المشكلة false positive:

// 1. أضف تعليق توضيحي
// eslint-disable-next-line rule-name
const value = someComplexLogic();

// 2. أو أضف للـ ignore في .codacy.yml
// ignore_patterns:
//   - "specific-pattern"

// 3. أو استبعد الملف كاملاً
// exclude_paths:
//   - "path/to/file.ts"
```

---

### المشكلة 4: "GitHub Actions failing"

**الحل**:
```bash
# 1. تحقق من Secrets في GitHub
# Settings → Secrets → Actions
# يجب وجود: CODACY_PROJECT_TOKEN (اختياري)

# 2. راجع logs في GitHub Actions
# Actions tab → اختر الـ run الفاشل → راجع الخطأ

# 3. إذا كان الخطأ في ESLint:
npm run lint
# أصلح المشاكل محلياً أولاً

# 4. إذا استمرت المشكلة:
# راجع .github/workflows/codacy.yml
```

---

## 📚 التكامل مع Spec-Kit

### القاعدة الذهبية

> **"قبل تنفيذ أي مهمة، تأكد من جودة الكود"**

```
/speckit.implement
    ↓
  AI ينفذ المهمة
    ↓
  Codacy يحلل تلقائياً
    ↓
  إذا وُجدت مشاكل → إصلاحات
    ↓
  npm run quality:all
    ↓
  جاهز للـ commit
```

---

### سير العمل المدمج

```bash
# 1. كتابة Spec
/speckit.specify
"إضافة feature X"

# 2. التخطيط
/speckit.plan
"استخدام تقنيات Y مع Z"

# 3. التنفيذ
/speckit.implement
# ← Codacy يحلل تلقائياً بعد كل ملف

# 4. إذا وُجدت مشاكل
# ← AI يصلح تلقائياً

# 5. التحقق النهائي
npm run quality:all
# ← Build + Lint + Test

# 6. Commit
git commit -m "feat: add feature X"
# ← GitHub Actions يحلل مرة أخرى
```

---

## 🎯 أفضل الممارسات

### 1. قبل Commit

```bash
# دائماً شغّل:
npm run lint         # ESLint
npm run test         # Tests
npm run build        # Build

# أو اختصار:
npm run quality:all
```

---

### 2. أثناء Development

```typescript
// ✅ افعل:
- اتبع الدستور (.specify/memory/constitution.md)
- استخدم TypeScript strict mode
- أضف Zod validation
- اكتب tests (>80% coverage)
- no file >400 lines

// ❌ لا تفعل:
- استخدام 'any' type
- تخطي validation
- console.log في production
- circular dependencies
- god files (ملفات ضخمة)
```

---

### 3. عند Pull Request

```markdown
## PR Checklist

- [ ] ✅ Code follows constitution
- [ ] ✅ All tests pass
- [ ] ✅ ESLint clean (no warnings)
- [ ] ✅ Codacy grade maintained or improved
- [ ] ✅ No new security issues
- [ ] ✅ Documentation updated
- [ ] ✅ Coverage >80%
```

---

## 📞 الموارد

### الوثائق

- [Codacy Instructions](./.github/instructions/codacy.instructions.md)
- [Codacy Configuration](./.codacy.yml)
- [GitHub Workflow](./.github/workflows/codacy.yml)
- [Constitution](./.specify/memory/constitution.md)

---

### الأوامر السريعة

```bash
# عرض التكوين
npm run codacy:config

# عرض الوثائق
npm run codacy:docs

# فحص الجودة
npm run quality:all

# ESLint فقط
npm run lint

# Tests فقط
npm run test
```

---

### الروابط الخارجية

- [Codacy Documentation](https://docs.codacy.com/)
- [Codacy Analysis CLI](https://github.com/codacy/codacy-analysis-cli)
- [GitHub Actions](https://github.com/codacy/codacy-analysis-cli-action)

---

## ✅ خلاصة التثبيت

### ما تم إنجازه

- ✅ `.codacy.yml` - التكوين الرئيسي
- ✅ `.codacy.json` - تكوين JSON
- ✅ `.github/workflows/codacy.yml` - GitHub Actions
- ✅ npm scripts - 3 أوامر جديدة
- ✅ Documentation - هذا الدليل
- ✅ Instructions - للـ AI (.github/instructions/)

---

### الخطوات التالية

1. **اربط مع Codacy.com** (اختياري):
   ```bash
   # زر https://www.codacy.com/
   # أضف المستودع
   # احصل على CODACY_PROJECT_TOKEN
   # أضفه في GitHub Secrets
   ```

2. **فعّل MCP Server** (للتحليل التلقائي):
   ```
   GitHub Settings → Copilot → MCP Servers
   ```

3. **ابدأ التطوير**:
   ```bash
   /speckit.specify
   "بناء ميزة جديدة..."
   ```

---

**جاهز للاستخدام! 🚀**

</div>

---

## English Summary

### ✅ Codacy Integration Complete

**What was configured**:

1. ✅ `.codacy.yml` - Main configuration
2. ✅ `.codacy.json` - JSON configuration
3. ✅ GitHub Actions workflow
4. ✅ npm scripts (3 new)
5. ✅ Comprehensive documentation

### Usage

```bash
# Show configuration
npm run codacy:config

# Check quality
npm run quality:all

# View docs
npm run codacy:docs
```

### Automatic Analysis

- ✅ After file edits (via MCP Server)
- ✅ On push/PR (via GitHub Actions)
- ✅ Security scans (after npm install)

### What Codacy Checks

- Code Quality (ESLint, TypeScript)
- Complexity (max 15 per function)
- Duplication (min 50 tokens)
- Security (Trivy scans)

---

**Ready to use! 🚀**
