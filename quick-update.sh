#!/bin/bash

# ============================================
# Tamkinly Quick Update Script
# ============================================
# Use this for minor updates that don't require a full rebuild
# Usage: bash quick-update.sh
# ============================================

set -e

echo "🚀 Quick update starting..."

ssh -p 2222 root@192.3.218.191 << 'ENDSSH'
cd /var/www/tamkinly
echo "📥 Pulling changes..."
git pull origin main
echo "📦 Installing dependencies..."
bun install
echo "▶️ Restarting..."
pm2 restart tamkinly-nextjs
echo "✅ Done!"
pm2 status tamkinly-nextjs
ENDSSH

echo ""
echo "✅ Quick update complete!"
echo "🌐 https://tamkinly.com"
