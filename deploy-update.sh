#!/bin/bash
# Tamkinly Update Deployment Script
# Run this script on the server to apply the latest updates

echo "======================================"
echo "Tamkinly Update Deployment"
echo "======================================"

# Configuration
PROJECT_DIR="/var/www/tamkinly"
BACKUP_DIR="/var/www/tamkinly-backup-$(date +%Y%m%d_%H%M%S)"

# Create backup
echo "Creating backup..."
cp -r $PROJECT_DIR $BACKUP_DIR

# Files to update
FILES=(
    "src/components/layout/Header.tsx"
    "src/app/contact/page.tsx"
)

# Apply updates from git or manual copy
echo "Applying updates..."

# Option 1: If using git
# cd $PROJECT_DIR && git pull

# Option 2: Manual file copy (copy from local machine)
# scp -P 2222 src/components/layout/Header.tsx root@192.3.218.191:/var/www/tamkinly/src/components/layout/
# scp -P 2222 src/app/contact/page.tsx root@192.3.218.191:/var/www/tamkinly/src/app/contact/

# Rebuild and restart
echo "Rebuilding application..."
cd $PROJECT_DIR
NODE_OPTIONS="--max-old-space-size=512" npm run build

echo "Restarting PM2..."
pm2 restart tamkinly-nextjs

echo "======================================"
echo "Deployment complete!"
echo "Backup saved to: $BACKUP_DIR"
echo "======================================"

# Verify
echo "Verifying deployment..."
curl -sI https://tamkinly.com | head -5
