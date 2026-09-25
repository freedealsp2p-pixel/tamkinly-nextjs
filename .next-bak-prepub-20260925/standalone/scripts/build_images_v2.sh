#!/bin/bash
# build_images_v2.sh — same as v1 + temporary 2G swap to survive TypeScript check on 962MB box
set -u
TS="20260922"
LOG="/var/www/tamkinly/logs/build_images_v2_${TS}.log"
APP_DIR="/var/www/tamkinly"
BAK="${APP_DIR}/.next-bak-preimg2-${TS}"
APP="tamkinly-prod"
SWAPF="/swapfile-build-tmp"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }
log "=== BUILD V2 START (swap-assisted) ==="

# Stage -1: temporary swap
if ! swapon --show | grep -q "$SWAPF"; then
  fallocate -l 2G "$SWAPF" && chmod 600 "$SWAPF" && mkswap "$SWAPF" >> "$LOG" 2>&1 && swapon "$SWAPF" && log "STAGE-1: 2G swap enabled"
fi
sync; echo 3 > /proc/sys/vm/drop_caches 2>/dev/null
free -m >> "$LOG"

# Stage 0: backup
DISK_FREE=$(df --output=avail -BG / | tail -1 | tr -dc '0-9')
log "STAGE0: disk free ${DISK_FREE}G"
if [ "$DISK_FREE" -lt 2 ]; then log "FATAL: <2G free, aborting (no downtime)"; exit 1; fi
[ -d "$BAK" ] && rm -rf "$BAK"
cp -a "${APP_DIR}/.next" "$BAK" || { log "FATAL: backup failed"; exit 1; }
log "STAGE0: backup done ($(du -sh $BAK | cut -f1))"

# Stage 1: stop
pm2 stop "$APP" >> "$LOG" 2>&1
log "STAGE1: pm2 stopped — downtime window open"

# Stage 2: build
cd "$APP_DIR"
if NODE_OPTIONS="--max-old-space-size=3072" ./node_modules/.bin/next build >> "$LOG" 2>&1; then
  log "STAGE2: next build SUCCESS"
else
  log "STAGE2: next build FAILED — rolling back"
  rm -rf "${APP_DIR}/.next"; mv "$BAK" "${APP_DIR}/.next"
  pm2 start "$APP" >> "$LOG" 2>&1; sleep 4
  CODE=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/ || echo 000)
  log "STAGE2: rollback done, local=$CODE"; log "=== BUILD ABORTED, SITE RESTORED ==="
  swapoff "$SWAPF" 2>/dev/null; rm -f "$SWAPF"
  exit 1
fi

# Stage 3: mandatory copies
cp -r "${APP_DIR}/.next/static" "${APP_DIR}/.next/standalone/.next/static" || { log "FATAL: static copy failed"; pm2 start "$APP"; exit 1; }
cp -a "${APP_DIR}/public/." "${APP_DIR}/.next/standalone/public/" || { log "FATAL: public copy failed"; pm2 start "$APP"; exit 1; }
log "STAGE3: static + public copied"

# Stage 4: start + verify
pm2 start "$APP" >> "$LOG" 2>&1
log "STAGE4: pm2 started"
sleep 6
CODE_HOME=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/)
CODE_ART=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/blog/porn-recovery-roadmap)
CODE_ARTAR=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/ar/blog/trauma-recovery-three-stages)
CODE_IMG=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/uploads/articles/porn-recovery-roadmap.webp)
CODE_CSS=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3001$(curl -s http://127.0.0.1:3001/ | grep -o '/_next/static/chunks/[a-z0-9]*\.css' | head -1)")
CODE_VID=$(curl -s -o /dev/null -w '%{http_code}' -r 0-999 http://127.0.0.1:3001/videos/identity_gap_video_v1.mp4)
log "STAGE4: home=$CODE_HOME article=$CODE_ART article-ar=$CODE_ARTAR image=$CODE_IMG css=$CODE_CSS video=$CODE_VID (want 200/200/200/200/200/206)"

if [ "$CODE_HOME" = "200" ] && [ "$CODE_ART" = "200" ] && [ "$CODE_ARTAR" = "200" ] && [ "$CODE_IMG" = "200" ] && [ "$CODE_CSS" = "200" ]; then
  swapoff "$SWAPF" 2>/dev/null; rm -f "$SWAPF"
  log "=== BUILD COMPLETE — ALL CHECKS PASS — SWAP CLEANED ==="
  exit 0
else
  log "=== POST-BUILD CHECKS FAILED — rolling back ==="
  pm2 stop "$APP" >> "$LOG" 2>&1
  rm -rf "${APP_DIR}/.next"; mv "$BAK" "${APP_DIR}/.next"
  pm2 start "$APP" >> "$LOG" 2>&1; sleep 4
  CODE=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/ || echo 000)
  log "STAGE4: rollback done, local=$CODE"; log "=== BUILD ABORTED, SITE RESTORED ==="
  swapoff "$SWAPF" 2>/dev/null; rm -f "$SWAPF"
  exit 1
fi
