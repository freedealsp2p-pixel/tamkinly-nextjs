#!/bin/bash

# ============================================
# VPS Cleanup Script for Tamkinly Deployment
# ============================================
# This script cleans up old files while preserving WordPress
# Run this on your VPS before deploying the new Next.js site
#
# Usage: bash cleanup-vps.sh
# ============================================

set -e

echo "============================================"
echo "  VPS Cleanup Script for Tamkinly"
echo "============================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Confirm before proceeding
read -p "This will clean up old files. Are you sure? (y/N): " confirm
if [[ $confirm != "y" && $confirm != "Y" ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo -e "${YELLOW}Step 1: Checking current setup...${NC}"

# Check for WordPress installation
WORDPRESS_PATHS=(
    "/var/www/html"
    "/var/www/wordpress"
    "/usr/share/wordpress"
    "/opt/wordpress"
)

WORDPRESS_FOUND=false
WORDPRESS_DIR=""

for path in "${WORDPRESS_PATHS[@]}"; do
    if [ -d "$path" ] && [ -f "$path/wp-config.php" ]; then
        WORDPRESS_FOUND=true
        WORDPRESS_DIR="$path"
        echo -e "${GREEN}✓ WordPress found at: $path${NC}"
        break
    fi
done

if [ "$WORDPRESS_FOUND" = false ]; then
    echo -e "${YELLOW}! WordPress not found in common locations${NC}"
    read -p "Enter WordPress directory path (or press Enter to skip): " custom_path
    if [ -n "$custom_path" ] && [ -d "$custom_path" ] && [ -f "$custom_path/wp-config.php" ]; then
        WORDPRESS_FOUND=true
        WORDPRESS_DIR="$custom_path"
        echo -e "${GREEN}✓ WordPress found at: $custom_path${NC}"
    fi
fi

echo ""
echo -e "${YELLOW}Step 2: Backing up WordPress database...${NC}"

if [ "$WORDPRESS_FOUND" = true ]; then
    # Create backup directory
    BACKUP_DIR="/root/backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Get database credentials from wp-config.php
    DB_NAME=$(grep "DB_NAME" "$WORDPRESS_DIR/wp-config.php" | sed -n "s/.*'\([^']*\)'.*/\1/p" | tail -1)
    DB_USER=$(grep "DB_USER" "$WORDPRESS_DIR/wp-config.php" | sed -n "s/.*'\([^']*\)'.*/\1/p" | tail -1)
    DB_PASS=$(grep "DB_PASSWORD" "$WORDPRESS_DIR/wp-config.php" | sed -n "s/.*'\([^']*\)'.*/\1/p" | tail -1)
    DB_HOST=$(grep "DB_HOST" "$WORDPRESS_DIR/wp-config.php" | sed -n "s/.*'\([^']*\)'.*/\1/p" | tail -1)
    
    echo "Database: $DB_NAME"
    echo "User: $DB_USER"
    echo "Host: $DB_HOST"
    
    # Backup database
    if command -v mysqldump &> /dev/null; then
        mysqldump -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" > "$BACKUP_DIR/wordpress_db.sql"
        echo -e "${GREEN}✓ Database backed up to: $BACKUP_DIR/wordpress_db.sql${NC}"
    else
        echo -e "${YELLOW}! mysqldump not found, skipping database backup${NC}"
    fi
    
    # Backup wp-content (plugins, themes, uploads)
    echo ""
    echo -e "${YELLOW}Step 3: Backing up WordPress content...${NC}"
    
    if [ -d "$WORDPRESS_DIR/wp-content" ]; then
        tar -czf "$BACKUP_DIR/wp-content.tar.gz" -C "$WORDPRESS_DIR" wp-content
        echo -e "${GREEN}✓ wp-content backed up to: $BACKUP_DIR/wp-content.tar.gz${NC}"
    fi
    
    # Backup wp-config.php
    cp "$WORDPRESS_DIR/wp-config.php" "$BACKUP_DIR/wp-config.php"
    echo -e "${GREEN}✓ wp-config.php backed up${NC}"
    
    # List what we're keeping
    echo ""
    echo -e "${YELLOW}WordPress Components Preserved:${NC}"
    echo "  - Database: $DB_NAME"
    echo "  - Plugins: $WORDPRESS_DIR/wp-content/plugins/"
    echo "  - Themes: $WORDPRESS_DIR/wp-content/themes/"
    echo "  - Uploads: $WORDPRESS_DIR/wp-content/uploads/"
    echo "  - Products (WooCommerce): In database"
fi

echo ""
echo -e "${YELLOW}Step 4: Cleaning up old files...${NC}"

# Remove old Node.js projects (except WordPress)
NODE_PROJECTS=(
    "/var/www/html/*"  # Be careful here
    "/var/www/node_modules"
    "/root/*.js"
    "/root/*.ts"
)

# Ask about each directory
read -p "Remove old Next.js/Node projects from /var/www? (y/N): " remove_node
if [[ $remove_node == "y" || $remove_node == "Y" ]]; then
    for dir in /var/www/*/; do
        if [[ "$dir" != "$WORDPRESS_DIR/"* ]] && [ -f "$dir/package.json" ]; then
            echo "Removing: $dir"
            rm -rf "$dir"
        fi
    done
    echo -e "${GREEN}✓ Old Node.js projects removed${NC}"
fi

# Clean npm cache
if command -v npm &> /dev/null; then
    npm cache clean --force 2>/dev/null || true
    echo -e "${GREEN}✓ npm cache cleaned${NC}"
fi

# Clean old PM2 processes
if command -v pm2 &> /dev/null; then
    pm2 delete all 2>/dev/null || true
    echo -e "${GREEN}✓ PM2 processes stopped${NC}"
fi

echo ""
echo -e "${YELLOW}Step 5: Preparing for new deployment...${NC}"

# Create directory structure for new site
mkdir -p /var/www/tamkinly
mkdir -p /var/www/tamkinly/logs
mkdir -p /var/www/tamkinly/uploads

echo -e "${GREEN}✓ Directory structure created${NC}"

# Check and install required packages
echo ""
echo -e "${YELLOW}Step 6: Checking required packages...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 20..."
    curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
    dnf install -y nodejs
else
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
fi

# Check PM2
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
else
    echo -e "${GREEN}✓ PM2 installed${NC}"
fi

# Check Nginx
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    dnf install -y nginx
    systemctl enable nginx
else
    echo -e "${GREEN}✓ Nginx installed${NC}"
fi

# Check Git
if ! command -v git &> /dev/null; then
    echo "Installing Git..."
    dnf install -y git
else
    echo -e "${GREEN}✓ Git installed${NC}"
fi

# Check SQLite
if ! command -v sqlite3 &> /dev/null; then
    echo "Installing SQLite..."
    dnf install -y sqlite
else
    echo -e "${GREEN}✓ SQLite installed${NC}"
fi

echo ""
echo "============================================"
echo -e "${GREEN}  Cleanup Complete!${NC}"
echo "============================================"
echo ""
echo "Backups saved to: $BACKUP_DIR"
echo ""
echo "WordPress preserved at: $WORDPRESS_DIR"
echo ""
echo "Ready for Next.js deployment!"
echo "Run: deploy-tamkinly.sh"
echo ""
