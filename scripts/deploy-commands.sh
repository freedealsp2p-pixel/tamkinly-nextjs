#!/bin/bash

# ===========================================
# Tamkinly Quick Deploy Script
# ===========================================
# Usage: bash scripts/deploy-commands.sh [command]

case "$1" in
  "status")
    echo "📊 Checking system status..."
    pm2 status
    systemctl status caddy --no-pager
    systemctl status postgresql --no-pager
    ;;

  "logs")
    echo "📜 Showing application logs..."
    pm2 logs tamkinly --lines 100
    ;;

  "restart")
    echo "🔄 Restarting application..."
    pm2 restart tamkinly
    systemctl restart caddy
    echo "✅ Restarted!"
    ;;

  "update")
    echo "📥 Updating application..."
    git pull origin main
    bun install
    bunx prisma db push
    bun run deploy:build
    pm2 restart tamkinly
    echo "✅ Updated!"
    ;;

  "backup")
    echo "💾 Creating backup..."
    BACKUP_DIR="/backup/tamkinly-$(date +%Y%m%d-%H%M%S)"
    mkdir -p $BACKUP_DIR

    # Backup database
    pg_dump -U tamkinly_user tamkinly_db > $BACKUP_DIR/database.sql

    # Backup .env
    cp .env $BACKUP_DIR/

    # Backup uploads (if any)
    cp -r public/uploads $BACKUP_DIR/ 2>/dev/null || true

    echo "✅ Backup created at $BACKUP_DIR"
    ;;

  "ssl")
    echo "🔒 Checking SSL..."
    curl -I https://tamkinly.com 2>/dev/null | head -5
    ;;

  "test")
    echo "🧪 Testing endpoints..."
    echo "Homepage:"
    curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:3000/
    echo "Products:"
    curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:3000/products
    echo "Apps:"
    curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:3000/apps
    echo "Blog:"
    curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:3000/blog
    echo "API:"
    curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:3000/api/products
    ;;

  "clean")
    echo "🧹 Cleaning up..."
    rm -rf .next/cache
    rm -rf node_modules/.cache
    pm2 flush
    echo "✅ Cleaned!"
    ;;

  *)
    echo "Tamkinly Deploy Commands"
    echo ""
    echo "Usage: bash scripts/deploy-commands.sh [command]"
    echo ""
    echo "Commands:"
    echo "  status   - Show system status"
    echo "  logs     - Show application logs"
    echo "  restart  - Restart application"
    echo "  update   - Update from Git and rebuild"
    echo "  backup   - Create backup"
    echo "  ssl      - Check SSL certificate"
    echo "  test     - Test endpoints"
    echo "  clean    - Clean cache files"
    ;;
esac
