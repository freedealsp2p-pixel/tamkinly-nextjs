# Tamkinly Deployment Guide

## Server Specifications
- **OS**: Ubuntu 24.04
- **RAM**: 1GB
- **CPU**: 1 Core
- **Location**: New York

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Caddy (Port 80/443)                  │
│                    Reverse Proxy + SSL                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Next.js       │
                    │   Port 3001     │
                    │   (Standalone)  │
                    └─────────────────┘
```

## Quick Start

### 1. Memory Optimization (Required for 1GB RAM)
```bash
# Create swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Optimize swap
sudo sysctl vm.swappiness=10
sudo sysctl vm.vfs_cache_pressure=50
```

### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

### 3. Deploy App
```bash
cd /var/www/tamkinly
bun install
bun run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Configure Caddy
```caddyfile
tamkinly.com {
    reverse_proxy localhost:3001
}
```

## Payment Integration

### Tahweel Payment Gateway
- Payment endpoint: `/api/payment/create`
- Webhook endpoint: `/api/payment/webhook`
- Demo mode available for testing

## Memory Monitoring
```bash
free -h           # Check memory
pm2 monit         # Monitor PM2
pm2 logs          # View logs
```

## Update Commands
```bash
cd /var/www/tamkinly
git pull origin master
HOSTNAME=localhost PORT=3001 pm2 restart tamkinly-nextjs
```
