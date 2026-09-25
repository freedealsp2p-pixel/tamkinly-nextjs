#!/bin/bash
# build_v4.sh — wire 2 selected images into the-memory-illusion (page figures + og:image + JSON-LD).
# Same proven v3 procedure: temp swap -> backup -> stop -> build -> static/public copies -> start -> verify -> auto-rollback.
set -u
TS="20260926"
APP_DIR="/var/www/tamkinly"
LOG="/var/www/tamkinly/logs/build_v4_${TS}.log"
BAK="${APP_DIR}/.next-bak-v4-${TS}"
APP="tamkinly-prod"
SWAPF="/swapfile-build-tmp"
STATUS="/tmp/mi_build_v4_status"

mkdir -p /var/www/tamkinly/logs
echo "RUNNING" > "$STATUS"
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }
log "=== BUILD V4 START (memory-illusion images) ==="

# Gate: edits marker
if [ ! -f /tmp/mi_edits_ok ]; then
  log "FATAL: /tmp/mi_edits_ok missing — edits incomplete. Aborting (no downtime)."
  echo "FAILED_GATE" > "$STATUS"; exit 1
fi

# Stage -1: temp swap
if ! swapon --show | grep -q "$SWAPF"; then
  fallocate -l 2G "$SWAPF" && chmod 600 "$SWAPF" && mkswap "$SWAPF" >> "$LOG" 2>&1 && swapon "$SWAPF" && log "STAGE-1: 2G swap enabled"
fi
sync; echo 3 > /proc/sys/vm/drop_caches 2>/dev/null
free -m >> "$LOG"

# Stage 0: disk + backup
DISK_FREE=$(df --output=avail -BG / | tail -1 | tr -dc '0-9')
log "STAGE0: disk free ${DISK_FREE}G"
if [ "$DISK_FREE" -lt 2 ]; then log "FATAL: <2G free, aborting (no downtime)"; echo "FAILED_DISK" > "$STATUS"; exit 1; fi
if [ ! -d "$BAK" ]; then
  cp -a "${APP_DIR}/.next" "$BAK" || { log "FATAL: backup failed"; echo "FAILED_BAK" > "$STATUS"; exit 1; }
fi
log "STAGE0: backup present ($(du -sh $BAK | cut -f1))"

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
  echo "FAILED_BUILD_ROLLED_BACK" > "$STATUS"; exit 1
fi

# Stage 3: mandatory copies
cp -r "${APP_DIR}/.next/static" "${APP_DIR}/.next/standalone/.next/static" || { log "FATAL: static copy failed"; pm2 start "$APP"; echo "FAILED_COPY" > "$STATUS"; exit 1; }
cp -a "${APP_DIR}/public/." "${APP_DIR}/.next/standalone/public/" || { log "FATAL: public copy failed"; pm2 start "$APP"; echo "FAILED_COPY" > "$STATUS"; exit 1; }
log "STAGE3: static + public copied"

# Stage 4: start + verify
pm2 start "$APP" >> "$LOG" 2>&1
log "STAGE4: pm2 started"
sleep 6
B="http://127.0.0.1:3001"
CODE_HOME=$(curl -s -o /dev/null -w '%{http_code}' $B/)
CODE_ART=$(curl -s -o /dev/null -w '%{http_code}' $B/blog/the-memory-illusion)
CODE_ARTAR=$(curl -s -o /dev/null -w '%{http_code}' $B/ar/blog/the-memory-illusion)
CODE_I1=$(curl -s -o /dev/null -w '%{http_code}' $B/uploads/articles/the-memory-illusion.webp)
CODE_I2=$(curl -s -o /dev/null -w '%{http_code}' $B/uploads/articles/the-memory-illusion-reconstruction.webp)
CODE_CSS=$(curl -s -o /dev/null -w '%{http_code}' "$B$(curl -s $B/ | grep -o '/_next/static/chunks/[a-z0-9]*\.css' | head -1)")
CODE_VID=$(curl -s -o /dev/null -w '%{http_code}' -r 0-999 $B/videos/identity_gap_video_v1.mp4)
# content checks (grep -o | wc -l: count OCCURRENCES, HTML is minified single-line)
HTML_EN=$(curl -s $B/blog/the-memory-illusion)
HTML_AR=$(curl -s $B/ar/blog/the-memory-illusion)
OG=$(echo "$HTML_EN" | grep -o 'property="og:image" content="https://tamkinly.com/uploads/articles/the-memory-illusion.webp"' | wc -l)
FIGS=$(echo "$HTML_EN" | grep -o '<figure' | wc -l)
FIG2EN=$(echo "$HTML_EN" | grep -o 'the-memory-illusion-reconstruction.webp' | wc -l)
FIG1AR=$(echo "$HTML_AR" | grep -o 'قد تبدو الذاكرة كأنها تسجيل دقيق' | wc -l)
FIG2AR=$(echo "$HTML_AR" | grep -o 'تُعاد بناؤها بتغيّرات طفيفة' | wc -l)
OTHER=$(curl -s $B/blog/window-of-tolerance -o /dev/null -w '%{http_code}')
SM=$(curl -s $B/sitemap.xml | grep -c '<loc>' || true)
log "STAGE4: home=$CODE_HOME mi-en=$CODE_ART mi-ar=$CODE_ARTAR img1=$CODE_I1 img2=$CODE_I2 css=$CODE_CSS video=$CODE_VID"
log "STAGE4: og-image=$OG (want >=1) figures-en=$FIGS (want 2) fig2-src-en=$FIG2EN (want >=1) fig1-cap-ar=$FIG1AR (want >=1) fig2-cap-ar=$FIG2AR (want >=1) other-article=$OTHER sitemap-locs=$SM"

PASS=1
[ "$CODE_HOME" = "200" ] || PASS=0
[ "$CODE_ART" = "200" ] || PASS=0
[ "$CODE_ARTAR" = "200" ] || PASS=0
[ "$CODE_I1" = "200" ] || PASS=0
[ "$CODE_I2" = "200" ] || PASS=0
[ "$CODE_CSS" = "200" ] || PASS=0
[ "$CODE_VID" = "206" ] || PASS=0
[ "$OTHER" = "200" ] || PASS=0
[ "$OG" -ge 1 ] 2>/dev/null || PASS=0
[ "$FIGS" = "2" ] || PASS=0
[ "$FIG2EN" -ge 1 ] 2>/dev/null || PASS=0
[ "$FIG1AR" -ge 1 ] 2>/dev/null || PASS=0
[ "$FIG2AR" -ge 1 ] 2>/dev/null || PASS=0
[ "$SM" -ge 232 ] 2>/dev/null || PASS=0

if [ "$PASS" = "1" ]; then
  swapoff "$SWAPF" 2>/dev/null; rm -f "$SWAPF"
  rm -rf "$BAK"
  log "=== BUILD V4 COMPLETE — ALL CHECKS PASS — SWAP+BAK CLEANED ==="
  echo "SUCCESS" > "$STATUS"
  exit 0
else
  log "=== POST-BUILD CHECKS FAILED — rolling back ==="
  pm2 stop "$APP" >> "$LOG" 2>&1
  rm -rf "${APP_DIR}/.next"; mv "$BAK" "${APP_DIR}/.next"
  pm2 start "$APP" >> "$LOG" 2>&1; sleep 4
  CODE=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/ || echo 000)
  log "STAGE4: rollback done, local=$CODE"; log "=== BUILD ABORTED, SITE RESTORED ==="
  swapoff "$SWAPF" 2>/dev/null; rm -f "$SWAPF"
  echo "FAILED_POSTCHECK_ROLLED_BACK" > "$STATUS"
  exit 1
fi
