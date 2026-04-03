# 🐙 دليل إعداد GitHub والنشر التلقائي

## 📋 المحتويات
1. [إنشاء Repository على GitHub](#1-إنشاء-repository-على-github)
2. [رفع المشروع](#2-رفع-المشروع)
3. [إعداد GitHub Secrets](#3-إعداد-github-secrets)
4. [إعداد SSH Keys على السيرفر](#4-إعداد-ssh-keys-على-السيرفر)
5. [النشر التلقائي](#5-النشر-التلقائي)
6. [التحقق من العمل](#6-التحقق-من-العمل)

---

## 1. إنشاء Repository على GitHub

### الخطوة 1: إنشاء Repository جديد

1. اذهب إلى [github.com/new](https://github.com/new)
2. أدخل المعلومات:
   - **Repository name:** `tamkinly`
   - **Description:** `Tamkinly - Personal Development Platform`
   - **Visibility:** Private (موصى به) أو Public
   - **NO** initialize with README (لأن المشروع جاهز)

3. اضغط **Create repository**

---

## 2. رفع المشروع

### الخطوة 2: إعداد Git محلياً

```bash
# الدخول لمجلد المشروع
cd /home/z/my-project

# تهيئة Git (إن لم يكن موجوداً)
git init

# إضافة جميع الملفات
git add .

# أول Commit
git commit -m "🚀 Initial commit - Tamkinly Platform

Features:
- 50 pages fully implemented
- 26 API routes
- Authentication system
- WooCommerce integration
- AI Identity Coach
- 15 interactive apps
- 22 blog articles
- PostgreSQL ready"

# تغيير الفرع إلى main
git branch -M main

# إضافة Remote (استبدل YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/tamkinly.git

# رفع المشروع
git push -u origin main
```

---

## 3. إعداد GitHub Secrets

### الخطوة 3: إضافة Secrets للنشر التلقائي

اذهب إلى: **Repository → Settings → Secrets and variables → Actions**

اضغط **"New repository secret"** وأضف التالي:

| Secret Name | الوصف | مثال |
|-------------|-------|------|
| `VPS_HOST` | عنوان IP السيرفر | `192.168.1.100` |
| `VPS_USERNAME` | اسم المستخدم | `root` أو `ubuntu` |
| `VPS_SSH_KEY` | مفتاح SSH الخاص | (انظر الخطوة 4) |
| `VPS_PORT` | منفذ SSH | `22` |
| `PROJECT_PATH` | مسار المشروع | `/var/www/tamkinly` |

---

## 4. إعداد SSH Keys على السيرفر

### الخطوة 4: إنشاء SSH Key للنشر

**على السيرفر:**

```bash
# إنشاء مفتاح SSH جديد للنشر
ssh-keygen -t ed25519 -C "github-actions" -f /root/.ssh/github_actions

# عرض المفتاح العام
cat /root/.ssh/github_actions.pub

# إضافة المفتاح للمفاتيح المسموح بها
cat /root/.ssh/github_actions.pub >> /root/.ssh/authorized_keys

# اختبار المفتاح
ssh -i /root/.ssh/github_actions root@localhost
```

**انسخ المفتاح الخاص (Private Key) وأضفه كـ Secret:**

```bash
# عرض المفتاح الخاص (انسخ هذا بالكامل)
cat /root/.ssh/github_actions
```

**أضف المحتوى كاملاً إلى Secret `VPS_SSH_KEY`:**

```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

---

## 5. النشر التلقائي

### الخطوة 5: التحقق من ملف Workflow

تأكد من وجود الملف `.github/workflows/deploy.yml`

**محتوى الملف:**
```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT || 22 }}
          script: |
            cd ${{ secrets.PROJECT_PATH }}

            echo "📥 Pulling latest changes..."
            git pull origin main

            echo "📦 Installing dependencies..."
            bun install

            echo "🗄️ Updating database..."
            bun run db:push

            echo "🔨 Building application..."
            bun run deploy:build

            echo "🔄 Restarting application..."
            pm2 restart tamkinly || pm2 start .next/standalone/server.js --name tamkinly

            echo "✅ Deployment complete!"
```

---

## 6. التحقق من العمل

### الخطوة 6: اختبار النشر

**النشر اليدوي:**
1. اذهب إلى **Actions** في GitHub
2. اختر **"Deploy to Production"**
3. اضغط **"Run workflow"**

**النشر التلقائي:**
```bash
# أي push إلى main سيشغل النشر تلقائياً
git add .
git commit -m "Update feature"
git push
```

**مراقبة النشر:**
1. اذهب إلى **Actions** في GitHub
2. ستجد سجل جميع عمليات النشر
3. يمكنك رؤية السجلات في الوقت الحقيقي

---

## 🔄 التحديثات المستقبلية

### عند تحديث الموقع:

```bash
# محلياً
git add .
git commit -m "Description of changes"
git push

# GitHub Actions سيتولى الباقي تلقائياً!
```

### التحديث اليدوي على السيرفر:

```bash
# على السيرفر
cd /var/www/tamkinly
git pull
bun install
bunx prisma db push
bun run deploy:build
pm2 restart tamkinly
```

---

## 📊 مراقبة المشروع

### على السيرفر:

```bash
# حالة التطبيق
pm2 status

# السجلات الحية
pm2 logs tamkinly

# مراقبة الأداء
pm2 monit

# حالة Caddy
systemctl status caddy

# حالة PostgreSQL
systemctl status postgresql
```

### على GitHub:

- **Actions:** سجل النشر
- **Insights:** إحصائيات المشروع
- **Security:** تنبيهات الأمان

---

## ⚠️ استكشاف الأخطاء

### مشكلة: فشل النشر

```bash
# تحقق من السجلات على GitHub Actions
# أو على السيرفر:
pm2 logs tamkinly --err
journalctl -u caddy -f
```

### مشكلة: SSH Connection Failed

```bash
# تحقق من صلاحيات SSH
chmod 600 /root/.ssh/github_actions
chmod 700 /root/.ssh

# تحقق من authorized_keys
cat /root/.ssh/authorized_keys
```

### مشكلة: Build Failed

```bash
# تحقق من الذاكرة
free -h

# إذا كانت الذاكرة قليلة
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## ✅ قائمة التحقق النهائية

```
□ Repository تم إنشاؤه على GitHub
□ المشروع تم رفعه
□ Secrets تم إضافتها (5 secrets)
□ SSH Key تم إنشاؤه على السيرفر
□ Workflow يعمل بنجاح
□ الموقع يعمل على https://tamkinly.com
□ SSL شهادة نشطة
□ جميع الصفحات تعمل (200 OK)
□ API routes تعمل
□ قاعدة البيانات متصلة
```

---

## 🎉 مبروك!

الموقع الآن:
- ✅ يعمل على السيرفر
- ✅ يتم تحديثه تلقائياً من GitHub
- ✅ محمي بـ SSL
- ✅ جاهز للإنتاج!

**الخطوة التالية:** اختبار جميع الوظائف والتأكد من عمل WooCommerce webhook.
