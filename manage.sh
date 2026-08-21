#!/bin/bash

# ============================================
# Tamkinly Server Management Script
# ============================================
# This script provides a menu of common server tasks
# Usage: bash manage.sh
# ============================================

# Server Configuration
SERVER="root@192.3.218.191"
PORT="2222"
APP_DIR="/var/www/tamkinly"

show_menu() {
    clear
    echo "╔══════════════════════════════════════════╗"
    echo "║      TAMKINLY SERVER MANAGEMENT          ║"
    echo "╠══════════════════════════════════════════╣"
    echo "║                                          ║"
    echo "║  1. 🔄 Full Deploy (Build + Restart)     ║"
    echo "║  2. ⚡ Quick Update (Pull + Restart)     ║"
    echo "║  3. 📊 Check Status                      ║"
    echo "║  4. 📋 View Logs                         ║"
    echo "║  5. 🔄 Restart Only                      ║"
    echo "║  6. ⏹️ Stop Website                      ║"
    echo "║  7. ▶️ Start Website                     ║"
    echo "║  8. 💾 Backup Database                   ║"
    echo "║  9. 🧹 Clean & Rebuild                   ║"
    echo "║  10. 📈 Server Resources                 ║"
    echo "║  0. 🚪 Exit                              ║"
    echo "║                                          ║"
    echo "╚══════════════════════════════════════════╝"
    echo ""
}

# Function to run command on server
run_ssh() {
    ssh -p $PORT $SERVER "$1"
}

# Main loop
while true; do
    show_menu
    read -p "Enter your choice [0-10]: " choice
    echo ""
    
    case $choice in
        1)
            echo "🚀 Running full deploy..."
            bash deploy.sh
            ;;
        2)
            echo "⚡ Running quick update..."
            bash quick-update.sh
            ;;
        3)
            echo "📊 Checking status..."
            run_ssh "pm2 status && echo '' && curl -sI https://tamkinly.com | head -5"
            ;;
        4)
            echo "📋 Showing logs (Ctrl+C to exit)..."
            run_ssh "pm2 logs tamkinly-nextjs --lines 50"
            ;;
        5)
            echo "🔄 Restarting..."
            run_ssh "pm2 restart tamkinly-nextjs && pm2 status"
            ;;
        6)
            echo "⏹️ Stopping..."
            run_ssh "pm2 stop tamkinly-nextjs && pm2 status"
            ;;
        7)
            echo "▶️ Starting..."
            run_ssh "pm2 start tamkinly-nextjs && pm2 status"
            ;;
        8)
            echo "💾 Creating backup..."
            run_ssh "mkdir -p /var/www/backups && cp /var/www/tamkinly/db/custom.db /var/www/backups/database_\$(date +%Y%m%d_%H%M%S).db && ls -la /var/www/backups/"
            ;;
        9)
            echo "🧹 Cleaning and rebuilding..."
            run_ssh "cd /var/www/tamkinly && rm -rf .next && NODE_OPTIONS='--max-old-space-size=768' bun run build && cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/ 2>/dev/null && pm2 restart tamkinly-nextjs"
            ;;
        10)
            echo "📈 Server resources..."
            run_ssh "echo '--- MEMORY ---' && free -h && echo '' && echo '--- DISK ---' && df -h && echo '' && echo '--- CPU ---' && uptime"
            ;;
        0)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Please try again."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done
