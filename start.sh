#!/bin/bash
# Tamkinly PM2 Startup — loads env vars then starts/restarts PM2
cd /var/www/tamkinly

# Load environment variables from .env file
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

# Also load .env.local if it exists (overrides .env)
if [ -f .env.local ]; then
  set -a
  source .env.local
  set +a
fi

ACTION=${1:-restart}

case $ACTION in
  start)
    pm2 start ecosystem.config.js
    ;;
  restart)
    pm2 restart tamkinly-prod
    ;;
  reload)
    pm2 reload tamkinly-prod
    ;;
  stop)
    pm2 stop tamkinly-prod
    ;;
  delete)
    pm2 delete tamkinly-prod
    ;;
  *)
    echo "Usage: bash start.sh [start|restart|reload|stop|delete]"
    exit 1
    ;;
esac
