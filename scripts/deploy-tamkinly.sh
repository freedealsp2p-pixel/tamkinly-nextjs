#!/bin/bash

# ============================================
# Tamkinly Automatic Deployment Script
# ============================================
# Deploys Next.js site and integrates with WordPress
# 
# Usage: 
#   First time: bash deploy-tamkinly.sh --init
#   Update: bash deploy-tamkinly.sh
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
APP_NAME="tamkinly"
APP_DIR="/var/www/tamkinly"
APP_PORT=3000
DOMAIN=""  # Set your domain here
WORDPRESS_DIR=""  # Auto-detected or set manually
WORDPRESS_URL=""  # e.g., https://yourdomain.com or http://192.3.218.191

# GitHub repository (update with your repo)
GITHUB_REPO="https://github.com/YOUR_USERNAME/tamkinly.git"
GITHUB_BRANCH="main"

echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  Tamkinly Deployment Script${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Parse arguments
INIT_MODE=false
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --init) INIT_MODE=true ;;
        --domain=*) DOMAIN="${1#*=}" ;;
        --wordpress=*) WORDPRESS_DIR="${1#*=}" ;;
        --github=*) GITHUB_REPO="${1#*=}" ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# ============================================
# Step 1: Detect WordPress
# ============================================
echo -e "${YELLOW}Step 1: Detecting WordPress installation...${NC}"

if [ -z "$WORDPRESS_DIR" ]; then
    for path in "/var/www/html" "/var/www/wordpress" "/usr/share/wordpress" "/opt/wordpress"; do
        if [ -d "$path" ] && [ -f "$path/wp-config.php" ]; then
            WORDPRESS_DIR="$path"
            break
        fi
    done
fi

if [ -n "$WORDPRESS_DIR" ] && [ -d "$WORDPRESS_DIR" ]; then
    echo -e "${GREEN}✓ WordPress found at: $WORDPRESS_DIR${NC}"
    
    # Get WordPress URL from options
    WP_HOME=$(grep "WP_HOME" "$WORDPRESS_DIR/wp-config.php" 2>/dev/null | sed -n "s/.*'\([^']*\)'.*/\1/p" | tail -1)
    if [ -n "$WP_HOME" ]; then
        WORDPRESS_URL="$WP_HOME"
    fi
else
    echo -e "${YELLOW}! WordPress not found. Integration will be skipped.${NC}"
fi

# ============================================
# Step 2: Initial Setup (if --init)
# ============================================
if [ "$INIT_MODE" = true ]; then
    echo ""
    echo -e "${YELLOW}Step 2: Initial Setup...${NC}"
    
    # Create app directory
    mkdir -p "$APP_DIR"
    mkdir -p "$APP_DIR/logs"
    
    # Clone repository
    if [ ! -d "$APP_DIR/.git" ]; then
        echo "Cloning repository..."
        git clone -b "$GITHUB_BRANCH" "$GITHUB_REPO" "$APP_DIR"
    else
        echo "Repository already exists, pulling latest..."
        cd "$APP_DIR"
        git pull origin "$GITHUB_BRANCH"
    fi
    
    # Install dependencies
    echo "Installing dependencies..."
    cd "$APP_DIR"
    
    # Check if using npm or bun
    if [ -f "bun.lock" ]; then
        if ! command -v bun &> /dev/null; then
            echo "Installing Bun..."
            curl -fsSL https://bun.sh/install | bash
            source ~/.bashrc
        fi
        bun install
    else
        npm install
    fi
    
    # Create environment file
    if [ ! -f "$APP_DIR/.env" ]; then
        echo "Creating .env file..."
        
        # Generate random secrets
        JWT_SECRET=$(openssl rand -hex 32)
        ADMIN_PASSWORD=$(openssl rand -hex 16)
        
        cat > "$APP_DIR/.env" << ENVEOF
# Database
DATABASE_URL="file:./db/database.sqlite"

# Authentication
JWT_SECRET="${JWT_SECRET}"
ADMIN_PASSWORD="${ADMIN_PASSWORD}"

# Environment
NODE_ENV="production"

# WordPress Integration
WORDPRESS_URL="${WORDPRESS_URL}"
WORDPRESS_DIR="${WORDPRESS_DIR}"

# WooCommerce (update these with your credentials)
WOO_CONSUMER_KEY=""
WOO_CONSUMER_SECRET=""

# Site URL
NEXT_PUBLIC_SITE_URL="http://${DOMAIN:-localhost:3000}"
ENVEOF
        
        echo -e "${GREEN}✓ .env created with random secrets${NC}"
        echo -e "${YELLOW}  IMPORTANT: Save these credentials!${NC}"
        echo "  ADMIN_PASSWORD: $ADMIN_PASSWORD"
    fi
    
    # Setup database
    echo "Setting up database..."
    mkdir -p "$APP_DIR/db"
    npx prisma generate
    npx prisma db push --accept-data-loss
    
    # Build application
    echo "Building application..."
    npm run build
    
    echo -e "${GREEN}✓ Initial setup complete${NC}"
fi

# ============================================
# Step 3: Update Code (if not init)
# ============================================
if [ "$INIT_MODE" = false ]; then
    echo ""
    echo -e "${YELLOW}Step 2: Updating code...${NC}"
    
    cd "$APP_DIR"
    
    # Pull latest changes
    git fetch origin
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/$GITHUB_BRANCH)
    
    if [ "$LOCAL" != "$REMOTE" ]; then
        echo "New changes found, updating..."
        
        # Stop the app
        pm2 stop $APP_NAME 2>/dev/null || true
        
        # Pull changes
        git pull origin $GITHUB_BRANCH
        
        # Install new dependencies
        if [ -f "bun.lock" ]; then
            bun install
        else
            npm install
        fi
        
        # Run migrations
        npx prisma generate
        npx prisma db push
        
        # Rebuild
        npm run build
        
        echo -e "${GREEN}✓ Code updated${NC}"
    else
        echo -e "${GREEN}✓ Already up to date${NC}"
    fi
fi

# ============================================
# Step 4: Configure PM2
# ============================================
echo ""
echo -e "${YELLOW}Step $([ "$INIT_MODE" = true ] && echo "4" || echo "3"): Configuring PM2...${NC}"

cd "$APP_DIR"

# Create PM2 ecosystem file
cat > "$APP_DIR/ecosystem.config.js" << PM2EOF
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'npm',
    args: 'start',
    cwd: '$APP_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: $APP_PORT
    },
    error_file: '$APP_DIR/logs/error.log',
    out_file: '$APP_DIR/logs/out.log',
    time: true
  }]
};
PM2EOF

# Start/restart with PM2
if pm2 describe $APP_NAME > /dev/null 2>&1; then
    pm2 restart $APP_NAME
    echo -e "${GREEN}✓ Application restarted${NC}"
else
    pm2 start ecosystem.config.js
    pm2 save
    echo -e "${GREEN}✓ Application started${NC}"
fi

# Ensure PM2 starts on boot
pm2 startup 2>/dev/null || true

# ============================================
# Step 5: Configure Nginx
# ============================================
echo ""
echo -e "${YELLOW}Step $([ "$INIT_MODE" = true ] && echo "5" || echo "4"): Configuring Nginx...${NC}"

# Determine if we have a domain or using IP
if [ -n "$DOMAIN" ]; then
    SERVER_NAME="$DOMAIN www.$DOMAIN"
else
    SERVER_NAME="_"
fi

# Create Nginx config
cat > /etc/nginx/conf.d/tamkinly.conf << NGINXEOF
# Tamkinly Next.js Application
server {
    listen 80;
    server_name $SERVER_NAME;
    
    # Logging
    access_log $APP_DIR/logs/nginx_access.log;
    error_log $APP_DIR/logs/nginx_error.log;
    
    # Next.js app
    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Static files (for Next.js optimized images, etc)
    location /_next/static {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # API endpoints
    location /api {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

NGINXEOF

# Test Nginx config
nginx -t

# Reload Nginx
systemctl reload nginx

echo -e "${GREEN}✓ Nginx configured${NC}"

# ============================================
# Step 6: WordPress Integration
# ============================================
if [ -n "$WORDPRESS_DIR" ] && [ -d "$WORDPRESS_DIR" ]; then
    echo ""
    echo -e "${YELLOW}Step $([ "$INIT_MODE" = true ] && echo "6" || echo "5"): WordPress Integration...${NC}"
    
    # Add WooCommerce webhook endpoint to WordPress
    # This will be done via WordPress admin, but we can prepare
    
    echo -e "${BLUE}WordPress Integration Steps:${NC}"
    echo "1. Install WooCommerce if not already installed"
    echo "2. Go to WooCommerce > Settings > Advanced > REST API"
    echo "3. Create API keys with Read/Write permissions"
    echo "4. Add the keys to your .env file:"
    echo "   WOO_CONSUMER_KEY=ck_xxxxx"
    echo "   WOO_CONSUMER_SECRET=cs_xxxxx"
    echo ""
    echo "5. Go to WooCommerce > Settings > Advanced > Webhooks"
    echo "6. Create webhook for 'Order created' event:"
    echo "   URL: http://YOUR_IP_OR_DOMAIN/api/webhook/woocommerce"
    echo "   Secret: (use JWT_SECRET from .env)"
    echo ""
    
    # Add CORS headers to WordPress for API access
    WP_HTACCESS="$WORDPRESS_DIR/.htaccess"
    if [ -f "$WP_HTACCESS" ]; then
        if ! grep -q "Tamkinly CORS" "$WP_HTACCESS"; then
            cat >> "$WP_HTACCESS" << HTACCESSEOF

# Tamkinly CORS Headers
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
HTACCESSEOF
            echo -e "${GREEN}✓ CORS headers added to WordPress${NC}"
        fi
    fi
fi

# ============================================
# Step 7: SSL (if domain provided)
# ============================================
if [ -n "$DOMAIN" ] && command -v certbot &> /dev/null; then
    echo ""
    echo -e "${YELLOW}Step $([ "$INIT_MODE" = true ] && echo "7" || echo "6"): Setting up SSL...${NC}"
    
    if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
        certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN"
        echo -e "${GREEN}✓ SSL certificate installed${NC}"
    else
        echo -e "${GREEN}✓ SSL already configured${NC}"
    fi
fi

# ============================================
# Final Summary
# ============================================
echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""
echo -e "${GREEN}Application URL:${NC}"
if [ -n "$DOMAIN" ]; then
    echo "  http://$DOMAIN"
    echo "  https://$DOMAIN (if SSL enabled)"
else
    # Get server IP
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "YOUR_SERVER_IP")
    echo "  http://$SERVER_IP"
fi
echo ""
echo -e "${GREEN}Admin Panel:${NC}"
echo "  http://${DOMAIN:-$SERVER_IP}/admin"
echo ""
echo -e "${GREEN}WordPress:${NC}"
echo "  $WORDPRESS_DIR"
echo ""
echo -e "${GREEN}Logs:${NC}"
echo "  $APP_DIR/logs/"
echo ""
echo -e "${YELLOW}Useful Commands:${NC}"
echo "  pm2 logs $APP_NAME     # View logs"
echo "  pm2 restart $APP_NAME  # Restart app"
echo "  pm2 status             # Check status"
echo ""
