#!/bin/bash

# ============================================
# Tamkinly Automatic Deployment Script
# ============================================
# This script updates the website on the server
# Usage: bash deploy.sh
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Server Configuration
SERVER="root@192.3.218.191"
PORT="2222"
APP_DIR="/var/www/tamkinly"
PM2_NAME="tamkinly-nextjs"

echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  Tamkinly Deployment Script${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Check if SSH key is available or use password
echo -e "${YELLOW}📦 Deploying to server...${NC}"
echo ""

# Deploy commands
ssh -p $PORT $SERVER << 'ENDSSH'

# Colors for remote output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Starting deployment...${NC}"

cd /var/www/tamkinly

# 1. Backup database
echo -e "${YELLOW}📁 Creating database backup...${NC}"
mkdir -p /var/www/backups
cp db/custom.db /var/www/backups/database_$(date +%Y%m%d_%H%M%S).db 2>/dev/null || echo "No database to backup"

# 2. Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes from GitHub...${NC}"
git fetch origin
git reset --hard origin/main

# 3. Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
bun install

# 4. Generate Prisma client
echo -e "${YELLOW}⚙️ Generating Prisma client...${NC}"
bunx prisma generate

# 5. Stop PM2
echo -e "${YELLOW}⏹️ Stopping PM2 process...${NC}"
pm2 stop tamkinly-nextjs 2>/dev/null || true

# 6. Clean build
echo -e "${YELLOW}🧹 Cleaning old build...${NC}"
rm -rf .next

# 7. Build with limited memory
echo -e "${YELLOW}🏗️ Building application...${NC}"
NODE_OPTIONS="--max-old-space-size=768" bun run build

# 8. Restart PM2
echo -e "${YELLOW}▶️ Starting PM2 process...${NC}"
HOSTNAME=localhost PORT=3001 pm2 restart tamkinly-nextjs || pm2 start ecosystem.config.js

# 9. Save PM2 config
pm2 save

# 10. Check status
echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
pm2 status tamkinly-nextjs
echo ""
echo -e "${GREEN}🌐 Website: https://tamkinly.com${NC}"
echo -e "${GREEN}🔐 Admin: https://tamkinly.com/admin${NC}"
echo ""

ENDSSH

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Deployment Finished Successfully!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "🌐 Visit: ${BLUE}https://tamkinly.com${NC}"
echo -e "🔐 Admin: ${BLUE}https://tamkinly.com/admin${NC}"
echo ""
