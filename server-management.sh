#!/bin/bash
# ============================================
# Tamkinly Server Management Script
# ============================================
# Usage: bash server-management.sh [command]
# Commands: update, optimize, backup, clean, status, full

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Paths
PROJECT_PATH="/var/www/tamkinly"
BACKUP_PATH="/var/www/backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Tamkinly Server Management${NC}"
echo -e "${BLUE}========================================${NC}"

# ============================================
# Function: Update Site from GitHub
# ============================================
update_site() {
    echo -e "\n${GREEN}📦 Updating site from GitHub...${NC}"
    
    cd $PROJECT_PATH
    
    # Pull latest changes
    echo "Pulling latest changes..."
    git pull origin master
    
    # Install dependencies if package.json changed
    if git diff --name-only HEAD@{1} HEAD | grep -q "package.json"; then
        echo "Installing dependencies..."
        bun install
    fi
    
    # Run database migrations if needed
    if git diff --name-only HEAD@{1} HEAD | grep -q "prisma/schema.prisma"; then
        echo "Running database migrations..."
        bun run db:push
    fi
    
    # Restart PM2
    echo "Restarting PM2..."
    HOSTNAME=localhost PORT=3001 pm2 restart tamkinly-nextjs
    
    echo -e "${GREEN}✅ Site updated successfully!${NC}"
}

# ============================================
# Function: Optimize Performance
# ============================================
optimize_performance() {
    echo -e "\n${GREEN}⚡ Optimizing performance...${NC}"
    
    cd $PROJECT_PATH
    
    # Clear Next.js cache
    echo "Clearing Next.js cache..."
    rm -rf .next/cache
    
    # Clear node_modules cache
    echo "Clearing node cache..."
    npm cache clean --force 2>/dev/null || true
    
    # Optimize images
    echo "Optimizing images..."
    if command -v optipng &> /dev/null; then
        find public -name "*.png" -type f -exec optipng -o5 -quiet {} \; 2>/dev/null || true
    fi
    
    # Compress logs
    echo "Compressing old logs..."
    find /var/log -name "*.log" -mtime +7 -exec gzip {} \; 2>/dev/null || true
    
    # Clear PM2 logs (keep last 1000 lines)
    echo "Clearing PM2 logs..."
    pm2 flush
    
    # Restart with fresh memory
    echo "Restarting services..."
    pm2 restart tamkinly-nextjs
    
    echo -e "${GREEN}✅ Performance optimized!${NC}"
}

# ============================================
# Function: Compress Images
# ============================================
compress_images() {
    echo -e "\n${GREEN}🖼️ Compressing images...${NC}"
    
    cd $PROJECT_PATH/public
    
    # Install tools if not present
    if ! command -v optipng &> /dev/null; then
        echo "Installing image optimization tools..."
        apt-get update -qq
        apt-get install -y -qq optipng jpegoptim 2>/dev/null || true
    fi
    
    # Compress PNG files
    echo "Compressing PNG files..."
    find . -name "*.png" -type f -exec optipng -o5 -quiet {} \; 2>/dev/null || true
    
    # Compress JPEG files
    if command -v jpegoptim &> /dev/null; then
        echo "Compressing JPEG files..."
        find . -name "*.jpg" -o -name "*.jpeg" | xargs jpegoptim --max=85 --strip-all --quiet 2>/dev/null || true
    fi
    
    # Show results
    echo -e "${GREEN}✅ Images compressed!${NC}"
    du -sh .
}

# ============================================
# Function: Create Full Backup
# ============================================
create_backup() {
    echo -e "\n${GREEN}💾 Creating backup...${NC}"
    
    # Create backup directory
    mkdir -p $BACKUP_PATH
    
    # Backup database
    echo "Backing up database..."
    cp $PROJECT_PATH/db/custom.db $BACKUP_PATH/database_$DATE.db
    
    # Backup .env file
    echo "Backing up .env..."
    cp $PROJECT_PATH/.env $BACKUP_PATH/env_$DATE.backup
    
    # Backup uploads folder
    echo "Backing up uploads..."
    cp -r $PROJECT_PATH/upload $BACKUP_PATH/upload_$DATE
    
    # Backup current code state
    echo "Creating code archive..."
    tar -czf $BACKUP_PATH/tamkinly_$DATE.tar.gz \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='.git' \
        -C /var/www tamkinly
    
    # Show backup info
    echo -e "\n${GREEN}✅ Backup created successfully!${NC}"
    echo "Backup location: $BACKUP_PATH"
    ls -lh $BACKUP_PATH | tail -5
    
    # Clean old backups (keep last 10)
    echo "Cleaning old backups (keeping last 10)..."
    ls -t $BACKUP_PATH/*.tar.gz 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true
}

# ============================================
# Function: Clean Cache & Temporary Files
# ============================================
clean_cache() {
    echo -e "\n${GREEN}🧹 Cleaning cache...${NC}"
    
    cd $PROJECT_PATH
    
    # Clear Next.js cache
    echo "Clearing Next.js build cache..."
    rm -rf .next/cache
    
    # Clear browser cache headers (force refresh)
    echo "Clearing static cache..."
    rm -rf .next/static 2>/dev/null || true
    
    # Clear PM2 logs
    echo "Clearing PM2 logs..."
    pm2 flush
    
    # Clear system temp files
    echo "Clearing temp files..."
    rm -rf /tmp/* 2>/dev/null || true
    
    # Clear apt cache
    echo "Clearing apt cache..."
    apt-get clean 2>/dev/null || true
    
    # Rebuild
    echo "Rebuilding..."
    rm -rf .next
    bun run build
    
    # Restart
    pm2 restart tamkinly-nextjs
    
    echo -e "${GREEN}✅ Cache cleaned!${NC}"
}

# ============================================
# Function: Show Status
# ============================================
show_status() {
    echo -e "\n${BLUE}📊 Server Status${NC}"
    echo "================"
    
    # PM2 Status
    echo -e "\n${YELLOW}PM2 Status:${NC}"
    pm2 status
    
    # Memory Usage
    echo -e "\n${YELLOW}Memory Usage:${NC}"
    free -h
    
    # Disk Usage
    echo -e "\n${YELLOW}Disk Usage:${NC}"
    df -h | grep -E "Filesystem|/dev/"
    
    # CPU Load
    echo -e "\n${YELLOW}CPU Load:${NC}"
    uptime
    
    # Site Size
    echo -e "\n${YELLOW}Site Size:${NC}"
    du -sh $PROJECT_PATH
    du -sh $PROJECT_PATH/public
    
    # Database Size
    echo -e "\n${YELLOW}Database Size:${NC}"
    du -sh $PROJECT_PATH/db/
    
    # Recent Errors
    echo -e "\n${YELLOW}Recent Errors (if any):${NC}"
    pm2 logs tamkinly-nextjs --lines 10 --err 2>/dev/null || echo "No errors"
}

# ============================================
# Function: Full Maintenance
# ============================================
full_maintenance() {
    echo -e "${BLUE}🔄 Running FULL MAINTENANCE...${NC}"
    
    create_backup
    update_site
    compress_images
    optimize_performance
    clean_cache
    show_status
    
    echo -e "\n${GREEN}🎉 FULL MAINTENANCE COMPLETE!${NC}"
}

# ============================================
# Main Menu
# ============================================
case "$1" in
    update)
        update_site
        ;;
    optimize)
        optimize_performance
        ;;
    compress)
        compress_images
        ;;
    backup)
        create_backup
        ;;
    clean)
        clean_cache
        ;;
    status)
        show_status
        ;;
    full)
        full_maintenance
        ;;
    *)
        echo -e "\n${YELLOW}Usage: bash server-management.sh [command]${NC}"
        echo ""
        echo "Commands:"
        echo "  update   - Pull latest from GitHub and restart"
        echo "  optimize - Clear caches and optimize performance"
        echo "  compress - Compress all images"
        echo "  backup   - Create full backup"
        echo "  clean    - Deep clean all caches"
        echo "  status   - Show server status"
        echo "  full     - Run complete maintenance (backup + update + optimize)"
        echo ""
        echo "Example: bash server-management.sh full"
        ;;
esac
