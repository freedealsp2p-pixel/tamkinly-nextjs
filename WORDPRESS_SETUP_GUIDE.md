# 🔧 دليل إعداد WordPress - Tamkinly

## ✅ المكونات المثبتة حالياً
- WordPress 6.9.4
- WooCommerce 10.6.1
- Yoast SEO
- Redis Object Cache
- JWT Authentication
- Kadence Theme

---

## 📋 خطوات الإعداد المطلوبة

### 1️⃣ إصلاح Site Health Issues

اذهب إلى: **Tools → Site Health**

المشاكل المتوقعة وحلولها:

#### أ. تحديث MariaDB (تم إصلاحه ✅)
#### ب. إضافة Site Icon
1. اذهب إلى **Appearance → Customize → Site Identity**
2. إذا لم يعمل رفع الصورة:
   - اذهب إلى **Media → Add New**
   - ارفع الصورة هناك أولاً
   - ثم اخترها من **Customize → Site Identity → Select Logo**

#### ج. تثبيت Theme افتراضي
```bash
# SSH إلى السيرفر
cd /var/www/html
wp theme install twentytwentyfour --activate --allow-root
wp theme activate kadence --allow-root
```

---

### 2️⃣ إعداد Yoast SEO

#### الطريقة اليدوية:
1. اذهب إلى **SEO → General → First-time configuration**
2. إذا لم تفتح:
   - اذهب إلى **SEO → General → Features**
   - تأكد من تفعيل جميع الميزات
   - ثم **SEO → General → Webmaster Tools**
   - أضف رموز التحقق (Google, Bing, etc.)

#### إعداد عبر WP-CLI (من SSH):
```bash
cd /var/www/html

# تفعيل جميع ميزات Yoast
wp yoast index --allow-root

# إعداد عنوان الموقع
wp option update blogname "Tamkinly - Identity Transformation Platform" --allow-root
wp option update blogdescription "Transform your identity, transform your life" --allow-root
```

---

### 3️⃣ إعداد WooCommerce Webhook

#### الطريقة اليدوية:
1. اذهب إلى **WooCommerce → Settings → Advanced → Webhooks**
2. انقر **Add Webhook**
3. املأ البيانات:
   - **Name**: `Tamkinly Next.js Integration`
   - **Status**: `Active`
   - **Topic**: `Order updated`
   - **Delivery URL**: `https://tamkinly.com/api/webhook/woocommerce`
   - **Secret**: `tamkinly_webhook_secret_2024`
   - **API Version**: `WP REST API Integration v3`
4. انقر **Save Webhook**

#### إعداد عبر WP-CLI (من SSH):
```bash
cd /var/www/html

# إنشاء Webhook
wc webhook create \
  --name="Tamkinly Next.js Integration" \
  --topic="order.updated" \
  --delivery_url="https://tamkinly.com/api/webhook/woocommerce" \
  --secret="tamkinly_webhook_secret_2024" \
  --status="active" \
  --user=1
```

---

### 4️⃣ إعداد Brevo Plugin (Sendinblue)

#### التثبيت:
```bash
cd /var/www/html
wp plugin install brevo --activate --allow-root
```

#### الإعداد:
1. اذهب إلى **Brevo** في القائمة الجانبية
2. أدخل API Key من حسابك في Brevo
3. اربط القوائم:
   - All Contacts → قائمة 1
   - Customers → قائمة 2
   - Trial Users → قائمة 3

---

### 5️⃣ إعداد Google Analytics

#### الطريقة 1: عبر Plugin
```bash
cd /var/www/html
wp plugin install google-analytics-dashboard-for-wp --activate --allow-root
```

#### الطريقة 2: عبر Header Script
1. اذهب إلى **Appearance → Theme Editor**
2. اختر **Theme Header (header.php)**
3. أضف كود Google Analytics قبل `</head>`

---

### 6️⃣ إعداد SEO Plugin إضافي

#### Rank Math (بديل قوي لـ Yoast):
```bash
cd /var/www/html
wp plugin install seo-by-rank-math --activate --allow-root
```

---

## 🔄 أوامر SSH سريعة للإعداد الكامل

```bash
# الاتصال بالسيرفر
ssh -p 2222 root@192.3.218.191
# كلمة المرور: g40d7KJfMyWrb2G3T1

# الذهاب لمجلد WordPress
cd /var/www/html

# تحديث جميع الإضافات
wp plugin update --all --allow-root

# تحديث القوالب
wp theme update --all --allow-root

# إصلاح قاعدة البيانات
wp db repair --allow-root

# تحديث خيارات الموقع
wp option update siteurl "https://tamkinly.com" --allow-root
wp option update home "https://tamkinly.com" --allow-root

# إنشاء webhook
wp wc webhook create \
  --name="Next.js Integration" \
  --topic="order.updated" \
  --delivery_url="https://tamkinly.com/api/webhook/woocommerce" \
  --secret="tamkinly_webhook_secret_2024" \
  --status="active" \
  --user=1 \
  --allow-root

# مسح الكاش
wp cache flush --allow-root
wp redis flush --allow-root

# إعادة تحميل القواعد
wp rewrite flush --allow-root
```

---

## 📧 إعداد Brevo للإيميلات

### من لوحة تحكم Brevo:

1. **إنشاء حساب**: اذهب إلى [brevo.com](https://www.brevo.com)
2. **الحصول على API Key**:
   - اذهب إلى **SMTP & API → API Keys**
   - انقر **Create a new API key**
   - اسمه: `Tamkinly Production`
   - انسخ الـ Key

3. **إنشاء القوائم**:
   - **Contacts → Lists → Create a list**
   - أنشئ:
     - `All Contacts` (ID: 1)
     - `Customers` (ID: 2)
     - `Trial Users` (ID: 3)
     - `Quiz Takers` (ID: 4)

4. **إنشاء قوالب الإيميل**:
   - **Campaigns → Email Templates**
   - أنشئ قوالب لكل نوع:
     - Welcome Email
     - Purchase Confirmation
     - Quiz Results
     - Daily Reminder

5. **إعداد Sender**:
   - **Senders & IP → Senders**
   - أضف: `noreply@tamkinly.com`
   - تحقق من الملكية

---

## 🔗 التكامل مع Next.js

### متغيرات البيئة المطلوبة في السيرفر:

```bash
# SSH إلى السيرفر
ssh -p 2222 root@192.3.218.191

# تحرير ملف .env
nano /var/www/tamkinly/.env

# أضف:
BREVO_API_KEY=your-actual-api-key
BREVO_SENDER_EMAIL=noreply@tamkinly.com
BREVO_SENDER_NAME=Tamkinly
BREVO_LIST_ALL=1
BREVO_LIST_CUSTOMERS=2
BREVO_LIST_TRIAL=3
BREVO_LIST_QUIZ=4
EMAIL_PROVIDER=brevo

# إعادة تشغيل Next.js
pm2 restart tamkinly
```

---

## ✅ قائمة التحقق النهائية

- [ ] Site Icon مرفوع
- [ ] Yoast SEO مُعد
- [ ] WooCommerce Webhook مُنشأ
- [ ] Brevo Plugin مُثبت ومُعد
- [ ] Google Analytics مُربط
- [ ] Site Health بدون أخطاء حرجة
- [ ] قوالب الإيميل في Brevo جاهزة
- [ ] API Keys في السيرفر مُحدثة

---

## 🆘 المساعدة

إذا واجهتك أي مشكلة:
1. تحقق من **Tools → Site Health**
2. راجع **WooCommerce → Status** للسجلات
3. تحقق من سجلات السيرفر: `tail -f /var/log/nginx/error.log`
