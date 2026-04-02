# ============================================
# أوامر إدارة سيرفر Tamkinly
# ============================================

## 📌 معلومات السيرفر:
# SSH: port 2222, root@192.3.218.191
# Password: g40d7KJfMyWrb2G3T1
# Path: /var/www/tamkinly
# PM2: tamkinly-nextjs on port 3001

# ============================================
# 1️⃣ الاتصال بالسيرفر
# ============================================
ssh -p 2222 root@192.3.218.191
# ثم أدخل كلمة المرور: g40d7KJfMyWrb2G3T1

# ============================================
# 2️⃣ تحديث الموقع من GitHub
# ============================================
cd /var/www/tamkinly
git pull origin master
HOSTNAME=localhost PORT=3001 pm2 restart tamkinly-nextjs

# ============================================
# 3️⃣ إنشاء نسخة احتياطية كاملة
# ============================================
# إنشاء مجلد النسخ الاحتياطي
mkdir -p /var/www/backups

# نسخ احتياطي للقاعدة
cp /var/www/tamkinly/db/custom.db /var/www/backups/database_$(date +%Y%m%d).db

# نسخ احتياطي لملف .env
cp /var/www/tamkinly/.env /var/www/backups/env_$(date +%Y%m%d).backup

# نسخ احتياطي كامل للموقع
tar -czf /var/www/backups/tamkinly_$(date +%Y%m%d_%H%M%S).tar.gz \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    -C /var/www tamkinly

# عرض النسخ الاحتياطية
ls -lh /var/www/backups/

# ============================================
# 4️⃣ تنظيف الكاش وتحسين الأداء
# ============================================
cd /var/www/tamkinly

# مسح كاش Next.js
rm -rf .next/cache

# مسح كاش PM2
pm2 flush

# إعادة البناء (إذا لزم الأمر)
bun run build

# إعادة التشغيل
HOSTNAME=localhost PORT=3001 pm2 restart tamkinly-nextjs

# ============================================
# 5️⃣ ضغط الصور
# ============================================
# تثبيت أدوات الضغط (مرة واحدة فقط)
apt-get update
apt-get install -y optipng jpegoptim

# ضغط ملفات PNG
cd /var/www/tamkinly/public
find . -name "*.png" -type f -exec optipng -o5 {} \;

# ضغط ملفات JPEG
find . -name "*.jpg" -o -name "*.jpeg" | xargs jpegoptim --max=85 --strip-all

# ============================================
# 6️⃣ فحص حالة السيرفر
# ============================================
# حالة PM2
pm2 status

# الذاكرة
free -h

# القرص
df -h

# تحميل CPU
uptime

# سجلات الأخطاء
pm2 logs tamkinly-nextjs --lines 50 --err

# ============================================
# 7️⃣ أوامر سريعة
# ============================================

# إعادة تشغيل الموقع فقط
pm2 restart tamkinly-nextjs

# إيقاف الموقع
pm2 stop tamkinly-nextjs

# تشغيل الموقع
pm2 start tamkinly-nextjs

# عرض السجلات الحية
pm2 logs tamkinly-nextjs

# حفظ إعدادات PM2
pm2 save

# ============================================
# 8️⃣ تنظيف شامل (Deep Clean)
# ============================================
cd /var/www/tamkinly

# مسح الكاش
rm -rf .next/cache

# مسح الملفات المؤقتة
rm -rf /tmp/*

# مسح كاش apt
apt-get clean

# إعادة البناء الكاملة
rm -rf .next
bun run build

# إعادة التشغيل
pm2 restart tamkinly-nextjs

# ============================================
# 9️⃣ استعادة النسخة الاحتياطية
# ============================================
# استعرض النسخ المتاحة
ls -lh /var/www/backups/

# استعادة القاعدة
cp /var/www/backups/database_YYYYMMDD.db /var/www/tamkinly/db/custom.db

# استعادة الكود
tar -xzf /var/www/backups/tamkinly_YYYYMMDD_HHMMSS.tar.gz -C /var/www/

# إعادة التشغيل
pm2 restart tamkinly-nextjs

# ============================================
# 🔟 أوامر صيانة دورية
# ============================================

# يومياً: تحديث وإعادة تشغيل
cd /var/www/tamkinly && git pull && pm2 restart tamkinly-nextjs

# أسبوعياً: تنظيف وتحسين
pm2 flush && rm -rf /var/www/tamkinly/.next/cache && apt-get clean

# شهرياً: نسخ احتياطي كامل
tar -czf /var/www/backups/tamkinly_$(date +%Y%m%d).tar.gz \
    --exclude='node_modules' --exclude='.next' --exclude='.git' \
    -C /var/www tamkinly

# ============================================
# ✅ أوامر جاهزة للنسخ واللصق
# ============================================

# أمر شامل: تحديث + نسخ احتياطي + إعادة تشغيل
cd /var/www/tamkinly && \
mkdir -p /var/www/backups && \
cp db/custom.db /var/www/backups/database_$(date +%Y%m%d).db && \
git pull origin master && \
HOSTNAME=localhost PORT=3001 pm2 restart tamkinly-nextjs && \
echo "✅ تم التحديث بنجاح!"

# أمر تنظيف شامل
cd /var/www/tamkinly && \
rm -rf .next/cache && \
pm2 flush && \
apt-get clean && \
echo "✅ تم التنظيف بنجاح!"
