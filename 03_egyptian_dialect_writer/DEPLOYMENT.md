# Egyptian Dialect Writer System - Deployment Guide
# دليل النشر والتشغيل

## نظرة عامة
هذا الدليل يشرح كيفية نشر وتشغيل نظام الكتابة بالعامية المصرية (EDWS) ضمن OpenOps.

---

## المتطلبات الأساسية

### البنية التحتية
```yaml
Hardware:
  CPU: 4 cores minimum (8 cores recommended)
  RAM: 8GB minimum (16GB recommended)
  Storage: 50GB for models and data
  GPU: Optional (improves performance 3-5x)

Software:
  OS: Linux (Ubuntu 20.04+) / macOS / Windows with WSL2
  Python: 3.9+
  Node.js: 16+ (for orchestration)
  Docker: 20.10+ (optional but recommended)
```

### Dependencies
```bash
# Python dependencies
pip install -r requirements.txt

# Key packages:
# - transformers>=4.30.0
# - torch>=2.0.0
# - fastapi>=0.100.0
# - uvicorn>=0.23.0
# - pydantic>=2.0.0
```

---

## خطوات التثبيت

### 1. استنساخ المشروع
```bash
cd /path/to/OpenOps
ls 03_egyptian_dialect_writer/  # يجب أن تشاهد المجلدات
```

### 2. إعداد البيئة
```bash
# إنشاء بيئة افتراضية
python -m venv edws_env
source edws_env/bin/activate  # على Linux/Mac
# أو edws_env\Scripts\activate على Windows

# تثبيت المكتبات
pip install -r 03_egyptian_dialect_writer/requirements.txt
```

### 3. تحميل النماذج
```bash
# تحميل النموذج اللغوي الأساسي
python 03_egyptian_dialect_writer/scripts/download_models.py

# هذا سيحمل:
# - Arabic language model
# - English technical model
# - Style transfer models
# - Context analysis models
```

### 4. تهيئة قواعد المعرفة
```bash
# تحميل قواعد المعرفة إلى الذاكرة
python 03_egyptian_dialect_writer/scripts/initialize_knowledge_bases.py

# سيتم تحميل:
# - Egyptian Lexicon
# - Tech Terminology
# - Writing Patterns
# - Cultural Context
```

---

## التكوين والإعدادات

### ملف التكوين الرئيسي
أنشئ ملف `config.yaml`:

```yaml
# 03_egyptian_dialect_writer/config.yaml

system:
  name: "Egyptian Dialect Writer"
  version: "1.0.0"
  environment: "production"  # development / staging / production

api:
  host: "0.0.0.0"
  port: 8080
  workers: 4
  timeout: 120

models:
  language_model:
    path: "./models/arabic_english_mixed"
    device: "cuda"  # cuda / cpu
    batch_size: 8
  
  style_transfer:
    path: "./models/style_transfer"
    device: "cuda"

agents:
  tone_master:
    enabled: true
    config: "./agents/01_tone_master.json"
  
  lexicon_mixer:
    enabled: true
    config: "./agents/02_lexicon_mixer.json"
  
  structure_architect:
    enabled: true
    config: "./agents/03_structure_architect.json"
  
  creativity_engine:
    enabled: true
    config: "./agents/04_creativity_engine.json"
  
  quality_checker:
    enabled: true
    config: "./agents/05_quality_checker.json"
  
  human_mimicker:
    enabled: true
    config: "./agents/06_human_mimicker.json"

knowledge_bases:
  egyptian_lexicon: "./knowledge_bases/egyptian_lexicon.json"
  tech_terminology: "./knowledge_bases/tech_terminology.json"
  writing_patterns: "./knowledge_bases/writing_patterns.json"
  cultural_context: "./knowledge_bases/cultural_context.json"

workflows:
  content_generation: "./workflows/content_generation.yml"
  quality_assurance: "./workflows/quality_assurance.yml"
  optimization: "./workflows/optimization.yml"

performance:
  max_concurrent_requests: 10
  generation_timeout: 30
  quality_check_timeout: 10

logging:
  level: "INFO"
  format: "json"
  output: "./logs/edws.log"

monitoring:
  enabled: true
  metrics_port: 9090
  health_check_interval: 30
```

---

## تشغيل النظام

### الطريقة 1: التشغيل المباشر
```bash
# تشغيل الخادم
python 03_egyptian_dialect_writer/main.py

# أو باستخدام uvicorn
uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
```

### الطريقة 2: باستخدام Docker
```bash
# بناء الصورة
docker build -t edws:1.0.0 ./03_egyptian_dialect_writer

# تشغيل الحاوية
docker run -d \
  --name edws \
  -p 8080:8080 \
  -v $(pwd)/models:/app/models \
  -v $(pwd)/logs:/app/logs \
  --gpus all \
  edws:1.0.0
```

### الطريقة 3: باستخدام Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  edws:
    build: ./03_egyptian_dialect_writer
    ports:
      - "8080:8080"
      - "9090:9090"
    volumes:
      - ./models:/app/models
      - ./logs:/app/logs
      - ./knowledge_bases:/app/knowledge_bases
    environment:
      - ENVIRONMENT=production
      - GPU_ENABLED=true
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

```bash
docker-compose up -d
```

---

## التحقق من التثبيت

### 1. فحص الصحة
```bash
curl http://localhost:8080/health

# الاستجابة المتوقعة:
# {
#   "status": "healthy",
#   "agents": "all_responsive",
#   "knowledge_bases": "loaded",
#   "models": "ready"
# }
```

### 2. اختبار التوليد
```bash
curl -X POST http://localhost:8080/api/edws/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "الذكاء الاصطناعي في مصر",
    "content_type": "thought_leadership",
    "platform": "linkedin",
    "tone": "confident_knowledgeable",
    "length": "medium"
  }'
```

### 3. فحص المقاييس
```bash
# عرض المقاييس
curl http://localhost:9090/metrics
```

---

## الربط مع OpenOps

### 1. تسجيل النظام الفرعي
```bash
# تعديل ملف Integration Config في OpenOps
# File: /01_orchestration/01B_Integration_Config.json

# إضافة:
{
  "subsystem_id": "03_egyptian_dialect_writer",
  "name": "Egyptian Dialect Writer",
  "endpoint": "http://localhost:8080",
  "capabilities": [
    "content_generation",
    "quality_assurance",
    "optimization"
  ],
  "status": "active"
}
```

### 2. تسجيل الوكلاء
```bash
# تعديل ملف Agent Roles Config
# File: /02_agents/02A_Agent_Roles_Config.json

# إضافة:
{
  "agent_group": "egyptian_dialect_agents",
  "agents": [
    "tone_master",
    "lexicon_mixer",
    "structure_architect",
    "creativity_engine",
    "quality_checker",
    "human_mimicker"
  ],
  "subsystem": "03_egyptian_dialect_writer"
}
```

---

## المراقبة والصيانة

### Logging
```bash
# عرض اللوجات الحية
tail -f logs/edws.log

# تصفية الأخطاء فقط
tail -f logs/edws.log | grep ERROR
```

### Metrics
```bash
# الاتصال بـ Prometheus
# قم بإضافة هذا Target إلى prometheus.yml:
scrape_configs:
  - job_name: 'edws'
    static_configs:
      - targets: ['localhost:9090']
```

### Health Checks
```bash
# إضافة health check cron job
# crontab -e
*/5 * * * * curl -f http://localhost:8080/health || systemctl restart edws
```

---

## استكشاف الأخطاء

### المشكلة: النظام لا يبدأ
```bash
# التحقق من:
1. البيئة الافتراضية نشطة
2. جميع المكتبات مثبتة
3. النماذج محملة بشكل صحيح
4. المنفذ 8080 غير مستخدم

# الحل:
lsof -i :8080  # للتحقق من المنفذ
source edws_env/bin/activate
pip install -r requirements.txt
```

### المشكلة: بطء في التوليد
```bash
# الأسباب المحتملة:
1. تشغيل على CPU بدلاً من GPU
2. حجم batch كبير جداً
3. عدد workers قليل

# الحل:
# تعديل config.yaml:
models:
  language_model:
    device: "cuda"  # استخدام GPU
    batch_size: 4   # تقليل batch size

api:
  workers: 8  # زيادة عدد workers
```

### المشكلة: جودة المحتوى منخفضة
```bash
# التحقق من:
1. قواعد المعرفة محدثة
2. النماذج مدربة بشكل صحيح
3. thresholds معقولة

# الحل:
# تشغيل التحسين اليدوي:
python scripts/optimize_models.py
python scripts/update_knowledge_bases.py
```

---

## التحديثات والترقيات

### تحديث النماذج
```bash
# إيقاف النظام
systemctl stop edws

# تحديث النماذج
python scripts/update_models.py --version 1.1.0

# إعادة التشغيل
systemctl start edws
```

### تحديث قواعد المعرفة
```bash
# لا يتطلب إيقاف النظام
python scripts/update_knowledge_bases.py --hot-reload
```

---

## الأمان

### API Authentication
```yaml
# إضافة في config.yaml:
security:
  auth_enabled: true
  api_keys:
    - key: "your_secret_key_here"
      permissions: ["generate", "quality_check"]
  
  rate_limiting:
    enabled: true
    requests_per_minute: 100
```

### HTTPS
```bash
# استخدام Nginx كـ reverse proxy
# /etc/nginx/sites-available/edws

server {
    listen 443 ssl;
    server_name edws.yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## الأداء والتوسع

### Horizontal Scaling
```bash
# استخدام Kubernetes
kubectl apply -f k8s/deployment.yaml

# deployment.yaml:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: edws
spec:
  replicas: 3
  selector:
    matchLabels:
      app: edws
  template:
    metadata:
      labels:
        app: edws
    spec:
      containers:
      - name: edws
        image: edws:1.0.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "8Gi"
            cpu: "4"
          limits:
            memory: "16Gi"
            cpu: "8"
```

### Load Balancing
```bash
# استخدام nginx للتوازن
upstream edws_cluster {
    server localhost:8080;
    server localhost:8081;
    server localhost:8082;
}

server {
    listen 80;
    location / {
        proxy_pass http://edws_cluster;
    }
}
```

---

## الدعم والمساعدة

### الوثائق
- README.md: نظرة عامة
- INTEGRATION.json: تفاصيل التكامل
- API Documentation: http://localhost:8080/docs

### اللوجات والتشخيص
- Application Logs: ./logs/edws.log
- Error Logs: ./logs/error.log
- Performance Logs: ./logs/performance.log

### الاتصال
- GitHub Issues: لمشاكل البرمجة
- Slack Channel: للدعم السريع
- Email: support@openops.ai
