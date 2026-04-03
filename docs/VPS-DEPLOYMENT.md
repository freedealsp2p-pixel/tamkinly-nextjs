# Tamkinly VPS Deployment Guide

## 📋 Prerequisites

- VPS with AlmaLinux 8 (or similar)
- SSH access as root
- Domain name (optional, for SSL)
- GitHub repository with the code

---

## 🚀 Quick Deployment

### Step 1: Connect to VPS
```bash
ssh root@192.3.218.191
```

### Step 2: Download and run cleanup script
```bash
# Download cleanup script
curl -o cleanup-vps.sh https://raw.githubusercontent.com/YOUR_USERNAME/tamkinly/main/scripts/cleanup-vps.sh
chmod +x cleanup-vps.sh

# Run cleanup (preserves WordPress)
bash cleanup-vps.sh
```

### Step 3: Deploy Tamkinly
```bash
# Download deployment script
curl -o deploy-tamkinly.sh https://raw.githubusercontent.com/YOUR_USERNAME/tamkinly/main/scripts/deploy-tamkinly.sh
chmod +x deploy-tamkinly.sh

# First time deployment
bash deploy-tamkinly.sh --init --github=https://github.com/YOUR_USERNAME/tamkinly.git

# Or with domain
bash deploy-tamkinly.sh --init --domain=tamkinly.com --github=https://github.com/YOUR_USERNAME/tamkinly.git
```

### Step 4: Setup WooCommerce Integration
```bash
# Download integration script
curl -o setup-woocommerce.sh https://raw.githubusercontent.com/YOUR_USERNAME/tamkinly/main/scripts/setup-woocommerce-integration.sh
chmod +x setup-woocommerce.sh

# Run integration setup
bash setup-woocommerce.sh
```

---

## 📁 File Structure After Deployment

```
/var/www/tamkinly/           # Next.js application
├── .env                     # Environment variables
├── db/                      # SQLite database
├── logs/                    # Application logs
├── ecosystem.config.js      # PM2 config
└── ...                      # Application files

/var/www/html/               # WordPress (preserved)
├── wp-content/
│   ├── plugins/
│   │   └── tamkinly-integration/  # Custom plugin
│   ├── themes/
│   └── uploads/
└── wp-config.php            # WordPress config

/etc/nginx/conf.d/
└── tamkinly.conf            # Nginx config
```

---

## ⚙️ Environment Variables

Create/update `.env` file:
```env
# Database
DATABASE_URL="file:./db/database.sqlite"

# Authentication
JWT_SECRET="your-32-character-secret-key"
ADMIN_PASSWORD="your-admin-password"

# Environment
NODE_ENV="production"

# WordPress Integration
WORDPRESS_URL="https://yourdomain.com"
WOO_CONSUMER_KEY="ck_xxxxx"
WOO_CONSUMER_SECRET="cs_xxxxx"
WOO_WEBHOOK_SECRET="your-webhook-secret"

# Site URL
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

---

## 🔄 Update Deployment

When you push new code to GitHub:

```bash
# SSH to server
ssh root@192.3.218.191

# Run deployment (without --init)
cd /var/www/tamkinly
bash scripts/deploy-tamkinly.sh
```

Or use PM2:
```bash
pm2 restart tamkinly
```

---

## 🛠️ Useful Commands

### PM2 Process Manager
```bash
pm2 status              # Check status
pm2 logs tamkinly       # View logs
pm2 restart tamkinly    # Restart app
pm2 stop tamkinly       # Stop app
pm2 monit               # Monitor resources
```

### Nginx
```bash
systemctl status nginx  # Check status
systemctl restart nginx # Restart
nginx -t                # Test config
```

### Database
```bash
cd /var/www/tamkinly
npx prisma studio       # Open database UI
npx prisma db push      # Update schema
```

### Logs
```bash
# App logs
tail -f /var/www/tamkinly/logs/out.log
tail -f /var/www/tamkinly/logs/error.log

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 🌐 WordPress Integration

### WooCommerce Setup

1. **Install WooCommerce** in WordPress Admin

2. **Generate API Keys**:
   - Go to: WooCommerce → Settings → Advanced → REST API
   - Click "Add Key"
   - Permissions: Read/Write
   - Copy Consumer Key and Secret to `.env`

3. **Create Webhook**:
   - Go to: WooCommerce → Settings → Advanced → Webhooks
   - Click "Add Webhook"
   - Name: `Tamkinly Orders`
   - Status: Active
   - Topic: `Order updated`
   - Delivery URL: `https://yourdomain.com/api/webhook/woocommerce`
   - Secret: Use `WOO_WEBHOOK_SECRET` from `.env`

4. **Activate Plugin**:
   - Go to: Plugins → Installed Plugins
   - Activate "Tamkinly Integration"

---

## 🔒 Security Checklist

- [ ] Change default SSH port (optional)
- [ ] Set up firewall (firewalld/ufw)
- [ ] Enable SELinux (if applicable)
- [ ] Install SSL certificate
- [ ] Set strong passwords for:
  - [ ] JWT_SECRET
  - [ ] ADMIN_PASSWORD
  - [ ] WOO_WEBHOOK_SECRET
- [ ] Configure WordPress security plugins
- [ ] Set up automatic backups

---

## 🔥 Firewall Setup

```bash
# Enable firewalld
systemctl enable firewalld
systemctl start firewalld

# Allow necessary ports
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-port=22/tcp  # SSH

# Reload
firewall-cmd --reload
```

---

## 📦 SSL Certificate (Let's Encrypt)

```bash
# Install certbot
dnf install -y certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
systemctl enable certbot-renew.timer
```

---

## 🔄 Automatic Backups

Create backup script:
```bash
cat > /root/backup-tamkinly.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
mkdir -p $BACKUP_DIR/$DATE

# Backup database
cp /var/www/tamkinly/db/database.sqlite $BACKUP_DIR/$DATE/

# Backup .env
cp /var/www/tamkinly/.env $BACKUP_DIR/$DATE/

# Backup WordPress
tar -czf $BACKUP_DIR/$DATE/wordpress.tar.gz -C /var/www/html wp-content

# Keep only last 7 days
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +

echo "Backup completed: $BACKUP_DIR/$DATE"
EOF

chmod +x /root/backup-tamkinly.sh

# Add to cron (daily at 2am)
(crontab -l 2>/dev/null; echo "0 2 * * * /root/backup-tamkinly.sh") | crontab -
```

---

## 📞 Support

- Application logs: `/var/www/tamkinly/logs/`
- Database: `/var/www/tamkinly/db/database.sqlite`
- Config: `/var/www/tamkinly/.env`
