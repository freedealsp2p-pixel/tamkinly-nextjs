#!/bin/bash

# ============================================
# Tamkinly Deployment Script
# Server: Ubuntu 24.04, 1GB RAM, 1 CPU
# ============================================

set -e

echo "🚀 Starting Tamkinly deployment..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/tamkinly"
NODE_VERSION="20"
MEMORY_LIMIT="400M"

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

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root or with sudo"
    exit 1
fi

# Step 1: Install dependencies
log_info "Installing system dependencies..."
apt-get update
apt-get install -y curl git build-essential

# Step 2: Install Node.js
log_info "Installing Node.js $NODE_VERSION..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
    apt-get install -y nodejs
fi
node --version
npm --version

# Step 3: Install PM2
log_info "Installing PM2..."
npm install -g pm2

# Step 4: Create swap file for low memory
log_info "Creating swap file..."
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    log_info "Swap file created (2GB)"
else
    log_info "Swap file already exists"
fi

# Step 5: Create app directory
log_info "Creating app directory..."
mkdir -p $APP_DIR
mkdir -p $APP_DIR/logs

# Step 6: Configure memory limits
log_info "Configuring memory limits..."
sysctl vm.swappiness=10
sysctl vm.vfs_cache_pressure=50

log_info "✅ Server setup complete!"
