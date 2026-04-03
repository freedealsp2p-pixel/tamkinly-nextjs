# 🔧 دليل إصلاح مشكلة Jetpack

## ❌ المشكلة
Jetpack يظهر فارغاً ولا يظهر زر الاتصال

## ✅ الحلول

### الطريقة 1: روابط مباشرة (جربها بالترتيب)

**رابط 1 - التسجيل:**
```
https://tamkinly.com/wp-admin/admin.php?page=jetpack&action=register
```

**رابط 2 - الاتصال:**
```
https://tamkinly.com/wp-admin/admin.php?page=jetpack&action=connect
```

**رابط 3 - إعادة التعيين ثم الاتصال:**
```
https://tamkinly.com/wp-admin/admin.php?page=jetpack&action=disconnect
```
ثم:
```
https://tamkinly.com/wp-admin/admin.php?page=jetpack&action=connect
```

---

### الطريقة 2: إعادة تفعيل Jetpack

1. اذهب إلى: **Plugins → Installed Plugins**
2. انقر **Deactivate** تحت Jetpack
3. انتظر 5 ثوان
4. انقر **Activate**
5. ستظهر شاشة الاتصال تلقائياً

---

### الطريقة 3: عبر SSH (إذا لم تنجح الطرق السابقة)

```bash
# الاتصال بالسيرفر
ssh -p 2222 root@192.3.218.191
# كلمة المرور: g40d7KJfMyWrb2G3T1

# الذهاب لمجلد WordPress
cd /var/www/html

# إعادة تعيين Jetpack
wp jetpack disconnect --allow-root
wp jetpack reset --allow-root

# إعادة تفعيل Jetpack
wp plugin deactivate jetpack --allow-root
wp plugin activate jetpack --allow-root

# عرض حالة Jetpack
wp jetpack status --allow-root

# الحصول على رابط الاتصال
wp jetpack authorization_url --allow-root
```

---

### الطريقة 4: إصلاح مشكلة JavaScript

قد تكون هناك مشكلة في تحميل JavaScript. جرب:

1. افتح **Developer Tools** (F12)
2. اذهب إلى **Console**
3. تحقق من وجود أخطاء
4. امسح الكاش: **Ctrl+Shift+R** (Windows) أو **Cmd+Shift+R** (Mac)

---

### الطريقة 5: التحقق من SSL

Jetpack يتطلب SSL صحيح:

```bash
# التحقق من SSL
curl -I https://tamkinly.com 2>&1 | head -10
```

---

## 🔗 بعد نجاح الاتصال

عندما يعمل الاتصال، ستظهر:

```
✅ Connected to WordPress.com
```

ثم يمكنك:
1. الذهاب إلى WordPress.com
2. رؤية موقعك في قائمة المواقع
3. إدارة الموقع من WordPress.com

---

## 📞 إذا لم تنجح أي طريقة

أخبرني وسأساعدك عبر SSH مباشرة!
