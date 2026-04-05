#!/bin/bash
# Tamkinly Deployment Script
# Run this script on the production server to deploy the latest updates

set -e

echo "=== Tamkinly Deployment Script ==="
echo ""

# Configuration
DEPLOY_DIR="/var/www/tamkinly"
BACKUP_DIR="/var/www/tamkinly-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="tamkinly-backup-$TIMESTAMP"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root or with sudo"
    exit 1
fi

# Create backup directory
log_info "Creating backup..."
mkdir -p $BACKUP_DIR
cd $DEPLOY_DIR

# Backup current state
tar --exclude='node_modules' --exclude='.next' --exclude='.git' \
    -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" .
log_info "Backup saved to: $BACKUP_DIR/$BACKUP_NAME.tar.gz"

# Pull latest changes
log_info "Pulling latest changes from Git..."
git fetch origin
git reset --hard origin/master

# Install dependencies
log_info "Installing dependencies..."
bun install --frozen-lockfile

# Clear Next.js cache
log_info "Clearing Next.js cache..."
rm -rf .next

# Generate Prisma client
log_info "Generating Prisma client..."
bun run db:generate

# Build the project
log_info "Building the project..."
NODE_OPTIONS='--max-old-space-size=768' bun run build

# Restart PM2
log_info "Restarting PM2 process..."
pm2 restart tamkinly-nextjs

# Wait for server to start
log_info "Waiting for server to start..."
sleep 5

# Check if server is running
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/ | grep -q "200"; then
    log_info "Server is running successfully!"
else
    log_error "Server might not be running. Check PM2 logs:"
    pm2 logs tamkinly-nextjs --lines 20
fi

# Show PM2 status
log_info "PM2 Status:"
pm2 status

# Test production URL
log_info "Testing production URL..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://tamkinly.com/)
if [ "$HTTP_CODE" = "200" ]; then
    log_info "Production site is live! (HTTP $HTTP_CODE)"
else
    log_warn "Production site returned HTTP $HTTP_CODE"
fi

echo ""
log_info "=== Deployment Complete ==="
log_info "Backup: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
log_info "To rollback: tar -xzf $BACKUP_DIR/$BACKUP_NAME.tar.gz -C $DEPLOY_DIR && pm2 restart tamkinly-nextjs"
