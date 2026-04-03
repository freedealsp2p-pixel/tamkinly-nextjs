# 🚀 دليل إعداد السيرفر لنشر Tamkinly

## 📋 المحتويات
1. [تنظيف الموقع القديم](#1-تنظيف-الموقع-القديم)
2. [إعداد السيرفر](#2-إعداد-السيرفر)
3. [تثبيت المتطلبات](#3-تثبيت-المتطلبات)
4. [إعداد قاعدة البيانات](#4-إعداد-قاعدة-البيانات)
5. [إعداد المشروع](#5-إعداد-المشروع)
6. [إعداد Caddy](#6-إعداد-caddy)
7. [إعداد PM2](#7-إعداد-pm2)
8. [التحقق من العمل](#8-التحقق-من-العمل)

---

## 1. تنظيف الموقع القديم

### ⚠️ تحذير: تأكد من النسخ الاحتياطي قبل الحذف!

```bash
# الدخول للسيرفر
ssh root@YOUR_SERVER_IP

# عرض ما هو موجود حالياً
ls -la /var/www/
ls -la /etc/caddy/
ls -la /etc/systemd/system/

# === النسخ الاحتياطي (مهم!) ===
# إنشاء مجلد للنسخة الاحتياطية
mkdir -p /backup/old-site-$(date +%Y%m%d)

# نسخ احتياطي للموقع القديم
cp -r /var/www/html /backup/old-site-$(date +%Y%m%d)/html 2>/dev/null || true
cp -r /var/www/tamkinly /backup/old-site-$(date +%Y%m%d)/tamkinly 2>/dev/null || true

# نسخ احتياطي لإعدادات Caddy
cp /etc/caddy/Caddyfile /backup/old-site-$(date +%Y%m%d)/Caddyfile 2>/dev/null || true

# نسخ احتياطي لقاعدة البيانات (إن وجدت)
cp -r /var/lib/mysql /backup/old-site-$(date +%Y%m%d)/mysql 2>/dev/null || true

# === إيقاف الخدمات القديمة ===
# إيقاف PM2
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# إيقاف أي خدمات تعمل على المنفذ 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null || true

# === حذف الملفات القديمة ===
# حذف الموقع القديم (بعد التأكد من النسخ الاحتياطي)
rm -rf /var/www/html/*
rm -rf /var/www/tamkinly 2>/dev/null || true

# تنظيف ملفات مؤقتة
rm -rf /tmp/*
rm -rf /var/cache/*

echo "✅ تم التنظيف بنجاح!"
```

---

## 2. إعداد السيرفر

```bash
# تحديث النظام
apt update && apt upgrade -y

# تثبيت الحزم الأساسية
apt install -y \
  curl \
  wget \
  git \
  unzip \
  build-essential \
  libssl-dev \
  pkg-config \
  ca-certificates \
  gnupg \
  lsb-release \
  ufw

# إعداد Firewall
ufw allow 22      # SSH
ufw allow 80      # HTTP
ufw allow 443     # HTTPS
ufw allow 3000    # Node.js (للتطوير فقط)
ufw --force enable

echo "✅ تم إعداد السيرفر!"
```

---

## 3. تثبيت المتطلبات

### 3.1 تثبيت Bun.js (أسرع من Node.js)

```bash
# تثبيت Bun
curl -fsSL https://bun.sh/install | bash

# تحديث PATH
source ~/.bashrc

# التحقق من التثبيت
bun --version
```

### 3.2 تثبيت PM2 (لإدارة العمليات)

```bash
# تثبيت PM2
bun add -g pm2

# أو باستخدام npm
npm install -g pm2

# التحقق
pm2 --version
```

### 3.3 تثبيت Caddy (Web Server)

```bash
# إضافة مستودع Caddy
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list

# تثبيت Caddy
apt update
apt install -y caddy

# التحقق
caddy version
```

### 3.4 تثبيت PostgreSQL (قاعدة البيانات)

```bash
# تثبيت PostgreSQL
apt install -y postgresql postgresql-contrib

# بدء الخدمة
systemctl start postgresql
systemctl enable postgresql

# التحقق
systemctl status postgresql
```

---

## 4. إعداد قاعدة البيانات

```bash
# الدخول لـ PostgreSQL
sudo -u postgres psql

# داخل PostgreSQL، نفذ:
CREATE DATABASE tamkinly_db;
CREATE USER tamkinly_user WITH ENCRYPTED PASSWORD 'YOUR_SECURE_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE tamkinly_db TO tamkinly_user;
ALTER DATABASE tamkinly_db OWNER TO tamkinly_user;
\q

# اختبار الاتصال
psql -U tamkinly_user -d tamkinly_db -h localhost
# إذا طلب كلمة المرور، أدخلها وستنجح
\q
```

---

## 5. إعداد المشروع

### 5.1 إنشاء مجلد المشروع

```bash
# إنشاء المجلد
mkdir -p /var/www/tamkinly
cd /var/www/tamkinly

# تعيين الصلاحيات
chown -R www-data:www-data /var/www/tamkinly
chmod -R 755 /var/www/tamkinly
```

### 5.2 استنساخ المشروع (سأعطيك الأوامر بعد رفع GitHub)

```bash
# سيتم استنساخ المشروع من GitHub
# git clone https://github.com/YOUR_USERNAME/tamkinly.git .
```

### 5.3 إنشاء ملف .env

```bash
# إنشاء ملف البيئة
nano .env
```

**محتوى ملف .env:**
```env
# Database
DATABASE_URL="postgresql://tamkinly_user:YOUR_SECURE_PASSWORD@localhost:5432/tamkinly_db"

# Auth
JWT_SECRET="GENERATE_32_CHAR_STRING"
ADMIN_PASSWORD="YOUR_ADMIN_PASSWORD"

# Site
NEXT_PUBLIC_SITE_URL="https://tamkinly.com"

# WooCommerce
WOOCOMMERCE_URL="https://tamkinly.com"
WOOCOMMERCE_CONSUMER_KEY="ck_your_key"
WOOCOMMERCE_CONSUMER_SECRET="cs_your_secret"
WOOCOMMERCE_WEBHOOK_SECRET="your_webhook_secret"

# Email (Brevo)
BREVO_API_KEY="your_brevo_api_key"
BREVO_SENDER_EMAIL="hello@tamkinly.com"
```

### 5.4 تثبيت وبناء المشروع

```bash
# تثبيت المكتبات
bun install

# إعداد Prisma
bunx prisma generate
bunx prisma db push

# بذرة البيانات (Apps, Email Sequences)
bunx prisma db seed

# بناء المشروع
bun run deploy:build
```

---

## 6. إعداد Caddy

### 6.1 إنشاء ملف Caddyfile

```bash
nano /etc/caddy/Caddyfile
```

**محتوى الملف:**
```
tamkinly.com {
    encode gzip zstd

    # Logs
    log {
        output file /var/log/caddy/tamkinly-access.log
        format json
    }

    # Security headers
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        X-XSS-Protection "1; mode=block"
        Referrer-Policy strict-origin-when-cross-origin
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    }

    # Main app
    reverse_proxy localhost:3000 {
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }
}

www.tamkinly.com {
    redir https://tamkinly.com{uri} permanent
}
```

### 6.2 إنشاء مجلد السجلات

```bash
mkdir -p /var/log/caddy
chown caddy:caddy /var/log/caddy
```

### 6.3 إعادة تشغيل Caddy

```bash
# التحقق من التكوين
caddy validate --config /etc/caddy/Caddyfile

# إعادة التشغيل
systemctl restart caddy
systemctl enable caddy

# التحقق من الحالة
systemctl status caddy
```

---

## 7. إعداد PM2

### 7.1 إنشاء ملف التكوين

```bash
cd /var/www/tamkinly
nano ecosystem.config.js
```

**محتوى الملف:**
```javascript
module.exports = {
  apps: [{
    name: 'tamkinly',
    script: '.next/standalone/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/tamkinly/error.log',
    out_file: '/var/log/tamkinly/out.log',
    log_file: '/var/log/tamkinly/combined.log',
    time: true
  }]
};
```

### 7.2 إنشاء مجلد السجلات

```bash
mkdir -p /var/log/tamkinly
chown -R www-data:www-data /var/log/tamkinly
```

### 7.3 بدء التطبيق

```bash
# بدء التطبيق
pm2 start ecosystem.config.js

# حفظ تكوين PM2
pm2 save

# جعل PM2 يعمل عند إعادة التشغيل
pm2 startup
# انسخ الأمر الذي يظهر والصقه
```

---

## 8. التحقق من العمل

### 8.1 التحقق من الخدمات

```bash
# التحقق من PM2
pm2 status

# التحقق من Caddy
systemctl status caddy

# التحقق من PostgreSQL
systemctl status postgresql

# التحقق من المنافذ
netstat -tlnp | grep -E "3000|80|443|5432"
```

### 8.2 اختبار الموقع

```bash
# اختبار محلي
curl http://localhost:3000

# اختبار عبر الدومين
curl -I https://tamkinly.com
```

### 8.3 مراقبة السجلات

```bash
# سجلات التطبيق
pm2 logs tamkinly

# سجلات Caddy
tail -f /var/log/caddy/tamkinly-access.log
```

---

## 🎯 ملخص الأوامر السريعة

```bash
# إعادة تشغيل التطبيق
pm2 restart tamkinly

# إعادة تشغيل Caddy
systemctl restart caddy

# تحديث الموقع (بعد git pull)
cd /var/www/tamkinly
git pull
bun install
bunx prisma db push
bun run deploy:build
pm2 restart tamkinly

# عرض الحالة
pm2 status && systemctl status caddy
```

---

## ⚠️ ملاحظات مهمة

1. **لا تنسى تحديث DNS** - وجه الدومين إلى IP السيرفر
2. **SSL تلقائي** - Caddy سيحصل على شهادة SSL تلقائياً
3. **النسخ الاحتياطي** - قم بجدولة نسخ احتياطي لقاعدة البيانات
4. **المراقبة** - استخدم `pm2 monit` لمراقبة الأداء

---

**الخطوة التالية:** [إعداد GitHub](./GITHUB-SETUP.md)
