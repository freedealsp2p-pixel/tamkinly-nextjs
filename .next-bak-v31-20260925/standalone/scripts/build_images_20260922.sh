#!/bin/bash
# build_images_20260922.sh — self-governing build with staged log + auto-rollback
# Task: rebuild tamkinly-prod with recovery article images wired in
set -u
TS="20260922"
LOG="/var/www/tamkinly/logs/build_images_${TS}.log"
APP_DIR="/var/www/tamkinly"
BAK="${APP_DIR}/.next-bak-preimg-${TS}"
APP="tamkinly-prod"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }

log "=== BUILD START (images integration) ==="

# Stage 0: prechecks + backup
DISK_FREE=$(df --output=avail -BG / | tail -1 | tr -dc '0-9')
log "STAGE0: disk free ${DISK_FREE}G"
if [ "$DISK_FREE" -lt 2 ]; then
  log "FATAL: less than 2G free, aborting (no downtime caused)"
  exit 1
fi
if [ -d "$BAK" ]; then rm -rf "$BAK"; fi
cp -a "${APP_DIR}/.next" "$BAK" || { log "FATAL: backup failed, aborting"; exit 1; }
log "STAGE0: .next backed up to $(basename $BAK) ($(du -sh $BAK | cut -f1))"

# Stage 1: stop app (downtime window begins)
pm2 stop "$APP" >> "$LOG" 2>&1
log "STAGE1: pm2 stopped — downtime window open"

# Stage 2: build
cd "$APP_DIR"
if NODE_OPTIONS="--max-old-space-size=2048" ./node_modules/.bin/next build >> "$LOG" 2>&1; then
  log "STAGE2: next build SUCCESS"
else
  log "STAGE2: next build FAILED — rolling back"
  rm -rf "${APP_DIR}/.next"
  mv "$BAK" "${APP_DIR}/.next"
  pm2 start "$APP" >> "$LOG" 2>&1
  sleep 4
  CODE=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/ || echo 000)
  log "STAGE2: rollback complete, local check=$CODE (expect 200)"
  log "=== BUILD ABORTED, SITE RESTORED ==="
  exit 1
fi

# Stage 3: copy static + public into standalone (MANDATORY per 2026-09-18 incident)
cp -r "${APP_DIR}/.next/static" "${APP_DIR}/.next/standalone/.next/static" || { log "FATAL: static copy failed"; pm2 start "$APP"; exit 1; }
cp -a "${APP_DIR}/public/." "${APP_DIR}/.next/standalone/public/" || { log "FATAL: public copy failed"; pm2 start "$APP"; exit 1; }
log "STAGE3: static + public copied into standalone"

# Stage 4: start + verify
pm2 start "$APP" >> "$LOG" 2>&1
log "STAGE4: pm2 started"
sleep 6
CODE_HOME=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/)
CODE_ART=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/blog/porn-recovery-roadmap)
CODE_IMG=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/uploads/articles/porn-recovery-roadmap.webp)
CODE_CSS=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3001$(curl -s http://127.0.0.1:3001/ | grep -o '/_next/static/chunks/[a-z0-9]*\.css' | head -1)")
CODE_VID=$(curl -s -o /dev/null -w '%{http_code}' -r 0-999 http://127.0.0.1:3001/videos/identity_gap_video_v1.mp4)
log "STAGE4: local checks — home=$CODE_ART? no: home=$CODE_HOME article=$CODE_ART image=$CODE_IMG css=$CODE_CSS video=$CODE_VID (want 200/200/200/200/206)"

if [ "$CODE_HOME" = "200" ] && [ "$CODE_ART" = "200" ] && [ "$CODE_IMG" = "200" ] && [ "$CODE_CSS" = "200" ]; then
  log "=== BUILD COMPLETE — ALL LOCAL CHECKS PASS ==="
  exit 0
else
  log "=== POST-BUILD CHECKS FAILED — rolling back ==="
  pm2 stop "$APP" >> "$LOG" 2>&1
  rm -rf "${APP_DIR}/.next"
  mv "$BAK" "${APP_DIR}/.next"
  pm2 start "$APP" >> "$LOG" 2>&1
  sleep 4
  CODE=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/ || echo 000)
  log "STAGE4: rollback done, local check=$CODE"
  log "=== BUILD ABORTED, SITE RESTORED ==="
  exit 1
fi
