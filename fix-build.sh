#!/bin/bash

# ============================================
# سكربت إصلاح البناء - Tamkinly
# ============================================

echo "🚀 بدء إصلاح البناء..."

cd /var/www/tamkinly

# 1. إيقاف التطبيق
echo "⏹️ إيقاف التطبيق..."
pm2 stop tamkinly-nextjs 2>/dev/null || true

# 2. التحقق من الذاكرة
echo "📊 فحص الذاكرة..."
free -h

# 3. تنظيف الملفات المؤقتة
echo "🧹 تنظيف الملفات المؤقتة..."
rm -rf .next/cache
rm -rf /tmp/node-* 2>/dev/null || true

# 4. مسح البناء القديم
echo "🗑️ مسح البناء القديم..."
rm -rf .next

# 5. تحديث الكود
echo "📥 تحديث الكود..."
git fetch origin
git reset --hard origin/master

# 6. تثبيت الحزم
echo "📦 تثبيت الحزم..."
bun install

# 7. توليد Prisma
echo "⚙️ توليد Prisma..."
bunx prisma generate

# 8. البناء الجديد مع ذاكرة محدودة
echo "🏗️ بناء التطبيق..."
NODE_OPTIONS="--max-old-space-size=768" bun run build

# 9. التحقق من نجاح البناء
if [ -d ".next/standalone" ]; then
    echo "✅ تم البناء بنجاح!"
    
    # 10. تشغيل التطبيق
    echo "▶️ تشغيل التطبيق..."
    HOSTNAME=localhost PORT=3001 pm2 start tamkinly-nextjs || pm2 restart tamkinly-nextjs
    
    echo "🎉 تم الإصلاح بنجاح!"
    echo "🌐 الموقع: https://tamkinly.com"
else
    echo "❌ فشل البناء! تحقق من السجلات:"
    pm2 logs tamkinly-nextjs --lines 20 --err
fi
