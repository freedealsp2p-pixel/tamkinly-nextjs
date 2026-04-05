# Tamkinly Backup - Current State
# Date: 2026-04-05

## Server Information
- Server: root@192.3.218.191 (SSH Port: 2222)
- Path: /var/www/tamkinly
- PM2 Process: tamkinly-nextjs
- Port: 3001

## Create Backup on Server
Run these commands on the production server:

```bash
# Create backup directory
mkdir -p /var/www/tamkinly-backups

# Create full backup
tar --exclude='node_modules' --exclude='.next' --exclude='.git' \
    -czf /var/www/tamkinly-backups/tamkinly-$(date +%Y%m%d-%H%M%S).tar.gz \
    -C /var/www tamkinly

# List backups
ls -la /var/www/tamkinly-backups/
```

## Current Features Working:
- ✅ Homepage with all sections
- ✅ Identity Gap Quiz (12 questions)
- ✅ Products pages (trial, planner, premium, bundle)
- ✅ Blog (22 articles)
- ✅ Apps (15+ tools)
- ✅ Contact form with email
- ✅ User authentication (NextAuth.js)
- ✅ Payment integration (Wise, Crypto, Bank)
- ✅ Arabic language support (localStorage-based)
- ✅ PWA support (service worker, offline page)
- ✅ Google Analytics 4 (with consent)
- ✅ SEO optimization (all pages have unique metadata)

## Environment Variables Required:
```env
# NextAuth (required for user auth)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://tamkinly.com

# Brevo Email (optional)
BREVO_API_KEY=your-brevo-key
BREVO_SENDER_EMAIL=noreply@tamkinly.com

# Admin Password
ADMIN_PASSWORD=tamkinly2024

# Database
DATABASE_URL="file:./db/custom.db"

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# reCAPTCHA (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

## Rollback Instructions:
```bash
# Stop PM2
pm2 stop tamkinly-nextjs

# Restore from backup
tar -xzf /var/www/tamkinly-backups/tamkinly-YYYYMMDD-HHMMSS.tar.gz -C /var/www/

# Reinstall and rebuild
cd /var/www/tamkinly
bun install
bun run build

# Restart PM2
pm2 start tamkinly-nextjs
```

## PM2 Commands:
```bash
pm2 status                    # Check status
pm2 logs tamkinly-nextjs      # View logs
pm2 restart tamkinly-nextjs   # Restart
pm2 stop tamkinly-nextjs      # Stop
pm2 save                      # Save process list
```

## Git Repository:
- Remote: git@github.com:freedealsp2p-pixel/tamkinly-nextjs.git
- Branch: main (pushes to master on remote)
