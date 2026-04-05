#!/bin/bash
# Deploy SEO fixes to production server

SERVER="root@192.3.218.191"
PORT="2222"
REMOTE_PATH="/var/www/tamkinly"

echo "🚀 Deploying SEO fixes to production..."
echo ""

# Sync new library files
echo "📦 Syncing library files..."
scp -P $PORT /home/z/my-project/src/lib/blog-articles.ts $SERVER:$REMOTE_PATH/src/lib/
scp -P $PORT /home/z/my-project/src/lib/app-pages.ts $SERVER:$REMOTE_PATH/src/lib/

# Sync robots.txt
echo "📦 Syncing robots.txt..."
scp -P $PORT /home/z/my-project/public/robots.txt $SERVER:$REMOTE_PATH/public/

# Sync all blog article layouts
echo "📦 Syncing blog article layouts..."
for dir in /home/z/my-project/src/app/blog/*/; do
  if [ -f "$dir/layout.tsx" ]; then
    slug=$(basename "$dir")
    echo "  - $slug/layout.tsx"
    ssh -p $PORT $SERVER "mkdir -p $REMOTE_PATH/src/app/blog/$slug"
    scp -P $PORT "$dir/layout.tsx" $SERVER:$REMOTE_PATH/src/app/blog/$slug/
  fi
done

# Sync all app page layouts
echo "📦 Syncing app page layouts..."
for dir in /home/z/my-project/src/app/apps/*/; do
  if [ -f "$dir/layout.tsx" ]; then
    slug=$(basename "$dir")
    echo "  - $slug/layout.tsx"
    ssh -p $PORT $SERVER "mkdir -p $REMOTE_PATH/src/app/apps/$slug"
    scp -P $PORT "$dir/layout.tsx" $SERVER:$REMOTE_PATH/src/app/apps/$slug/
  fi
done

# Restart PM2
echo ""
echo "🔄 Restarting PM2 process..."
ssh -p $PORT $SERVER "cd $REMOTE_PATH && pm2 restart tamkinly-nextjs"

echo ""
echo "✅ Deployment complete!"
