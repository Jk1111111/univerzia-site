#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════
# deploy.sh — Production deployment for Univerzia Site
# Usage: sudo ./deploy.sh
# ═══════════════════════════════════════════════════════════════

REPO_ROOT="/var/www/univerzia-site"
FRONTEND_DIR="${REPO_ROOT}/frontend"
BACKUP_DIR="${REPO_ROOT}/.deploy-backups"
LOCK_FILE="${REPO_ROOT}/.deploy.lock"
LOG_FILE="${REPO_ROOT}/.deploy.log"
PM2_APP_NAME="univerzia-site"
BRANCH="main"
MAX_BACKUPS=5
HEALTH_URL="http://localhost:3001"

# Source patterns that trigger a rebuild
SOURCE_PATTERNS=(
  "frontend/src/"
  "frontend/public/"
  "frontend/next.config.ts"
  "frontend/tsconfig.json"
  "frontend/postcss.config.mjs"
  "frontend/eslint.config.mjs"
  "frontend/package.json"
)

# ── Colors ──────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ── Logging ─────────────────────────────────────────────────────
log()      { local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $1"; echo -e "${CYAN}${msg}${NC}"; echo "$msg" >> "$LOG_FILE"; }
log_ok()   { local msg="[$(date '+%Y-%m-%d %H:%M:%S')] ✓ $1"; echo -e "${GREEN}${msg}${NC}"; echo "$msg" >> "$LOG_FILE"; }
log_warn() { local msg="[$(date '+%Y-%m-%d %H:%M:%S')] ⚠ $1"; echo -e "${YELLOW}${msg}${NC}"; echo "$msg" >> "$LOG_FILE"; }
log_err()  { local msg="[$(date '+%Y-%m-%d %H:%M:%S')] ✗ $1"; echo -e "${RED}${msg}${NC}"; echo "$msg" >> "$LOG_FILE"; }

# ── Cleanup trap ────────────────────────────────────────────────
cleanup() {
  rm -f "$LOCK_FILE"
}
trap cleanup EXIT

# ── Rollback function ───────────────────────────────────────────
rollback() {
  log_err "Deployment failed — rolling back..."

  if [[ -n "${BACKUP_PATH:-}" && -d "$BACKUP_PATH" ]]; then
    rm -rf "${FRONTEND_DIR}/.next"
    cp -a "$BACKUP_PATH" "${FRONTEND_DIR}/.next"
    log "Restored .next/ from backup"
  fi

  cd "$REPO_ROOT"
  if [[ -n "${OLD_COMMIT:-}" ]]; then
    git reset --hard "$OLD_COMMIT" 2>/dev/null || true
    log "Reset git to ${OLD_COMMIT:0:8}"
  fi

  if [[ "${NEEDS_INSTALL:-false}" == "true" && -n "${OLD_COMMIT:-}" ]]; then
    log "Re-installing old dependencies..."
    cd "$FRONTEND_DIR"
    npm ci --loglevel=error 2>/dev/null || true
  fi

  cd "$REPO_ROOT"
  if [[ -f "ecosystem.config.js" ]]; then
    pm2 reload ecosystem.config.js --update-env 2>/dev/null || true
  else
    pm2 reload "$PM2_APP_NAME" --update-env 2>/dev/null || true
  fi
  pm2 save 2>/dev/null || true

  log_err "Rollback complete — site restored to previous version"
}

# ════════════════════════════════════════════════════════════════
# Phase 0: Pre-flight checks
# ════════════════════════════════════════════════════════════════
DEPLOY_START=$(date +%s)
echo ""
echo -e "${BOLD}═══ Univerzia Site — Production Deploy ═══${NC}"
echo ""

cd "$REPO_ROOT"

# Lock file (prevent concurrent deploys)
if [[ -f "$LOCK_FILE" ]]; then
  LOCK_PID=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
  if [[ -n "$LOCK_PID" ]] && kill -0 "$LOCK_PID" 2>/dev/null; then
    log_err "Another deployment is running (PID $LOCK_PID). Aborting."
    exit 1
  else
    log_warn "Removing stale lock file (PID $LOCK_PID no longer running)"
    rm -f "$LOCK_FILE"
  fi
fi
echo $$ > "$LOCK_FILE"

# Verify required tools
for cmd in git node npm pm2; do
  if ! command -v "$cmd" &>/dev/null; then
    log_err "'$cmd' not found on PATH. Aborting."
    exit 1
  fi
done

# Verify clean working tree
if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
  log_err "Working tree has uncommitted changes. Aborting."
  echo ""
  git status --short
  echo ""
  echo "Resolve these changes before deploying (commit, stash, or discard)."
  exit 1
fi

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

log_ok "Pre-flight checks passed"

# ════════════════════════════════════════════════════════════════
# Phase 1: Git pull (fast-forward only)
# ════════════════════════════════════════════════════════════════
log "Fetching latest from origin/${BRANCH}..."

OLD_COMMIT=$(git rev-parse HEAD)
git fetch origin "$BRANCH" --quiet

NEW_REMOTE=$(git rev-parse "origin/${BRANCH}")

if [[ "$OLD_COMMIT" == "$NEW_REMOTE" ]]; then
  log_ok "Already up to date (${OLD_COMMIT:0:8}). Nothing to deploy."
  DEPLOY_END=$(date +%s)
  echo ""
  echo -e "${BOLD}Duration:${NC} $((DEPLOY_END - DEPLOY_START))s"
  echo ""
  exit 0
fi

log "Merging ${OLD_COMMIT:0:8} → ${NEW_REMOTE:0:8}..."

if ! git merge --ff-only "origin/${BRANCH}" --quiet; then
  log_err "Fast-forward merge failed — local branch has diverged from origin/${BRANCH}."
  echo "Run 'git log --oneline origin/${BRANCH}..HEAD' to see local commits."
  echo "Resolve manually before deploying."
  exit 1
fi

NEW_COMMIT=$(git rev-parse HEAD)
COMMIT_MSG=$(git log --format='%s' -1 "$NEW_COMMIT")
log_ok "Pulled: ${COMMIT_MSG}"

# ════════════════════════════════════════════════════════════════
# Phase 2: Determine what changed
# ════════════════════════════════════════════════════════════════
CHANGED_FILES=$(git diff --name-only "$OLD_COMMIT" "$NEW_COMMIT")

NEEDS_INSTALL=false
NEEDS_BUILD=false

if echo "$CHANGED_FILES" | grep -q "^frontend/package-lock.json$"; then
  NEEDS_INSTALL=true
  NEEDS_BUILD=true
  log "package-lock.json changed → will reinstall deps + rebuild"
fi

if [[ "$NEEDS_BUILD" == "false" ]]; then
  for pattern in "${SOURCE_PATTERNS[@]}"; do
    if echo "$CHANGED_FILES" | grep -q "^${pattern}"; then
      NEEDS_BUILD=true
      log "Source files changed (matched: ${pattern}) → will rebuild"
      break
    fi
  done
fi

if [[ "$NEEDS_BUILD" == "false" ]]; then
  log_ok "No source changes detected — skipping build and restart"
  echo ""
  echo -e "${BOLD}Changed files:${NC}"
  echo "$CHANGED_FILES" | sed 's/^/  /'
  echo ""
  DEPLOY_END=$(date +%s)
  echo -e "${GREEN}${BOLD}═══ Deploy complete (no rebuild needed) ═══${NC}"
  echo -e "${BOLD}Commit:${NC}   ${OLD_COMMIT:0:8} → ${NEW_COMMIT:0:8}"
  echo -e "${BOLD}Duration:${NC} $((DEPLOY_END - DEPLOY_START))s"
  echo ""
  exit 0
fi

# ════════════════════════════════════════════════════════════════
# Phase 3: Backup current build
# ════════════════════════════════════════════════════════════════
if [[ -d "${FRONTEND_DIR}/.next" ]]; then
  BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)_${OLD_COMMIT:0:8}"
  BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"
  log "Backing up .next/ → ${BACKUP_NAME}..."
  cp -a "${FRONTEND_DIR}/.next" "$BACKUP_PATH"
  log_ok "Backup created ($(du -sh "$BACKUP_PATH" | cut -f1))"

  # Prune old backups
  BACKUP_COUNT=$(find "$BACKUP_DIR" -maxdepth 1 -name "backup_*" -type d | wc -l)
  if (( BACKUP_COUNT > MAX_BACKUPS )); then
    find "$BACKUP_DIR" -maxdepth 1 -name "backup_*" -type d -printf '%T@ %p\n' \
      | sort -n | head -n "$((BACKUP_COUNT - MAX_BACKUPS))" | cut -d' ' -f2- \
      | xargs rm -rf
    log "Pruned old backups (keeping newest ${MAX_BACKUPS})"
  fi
else
  BACKUP_PATH=""
  log_warn "No existing .next/ to back up (first build?)"
fi

# ════════════════════════════════════════════════════════════════
# Phase 4: Install dependencies (conditional)
# ════════════════════════════════════════════════════════════════
cd "$FRONTEND_DIR"

if [[ "$NEEDS_INSTALL" == "true" ]]; then
  log "Installing dependencies (package-lock.json changed)..."
  INSTALL_START=$(date +%s)

  if ! npm ci --loglevel=error; then
    log_err "npm ci failed"
    cd "$REPO_ROOT"
    git reset --hard "$OLD_COMMIT" --quiet 2>/dev/null || true
    log_err "Reset to ${OLD_COMMIT:0:8}. Fix package-lock.json and retry."
    exit 1
  fi

  INSTALL_END=$(date +%s)
  log_ok "Dependencies installed ($((INSTALL_END - INSTALL_START))s)"
else
  log "Dependencies unchanged — skipping npm ci"
fi

# ════════════════════════════════════════════════════════════════
# Phase 4b: Prisma generate + migrate (conditional)
# ════════════════════════════════════════════════════════════════
if [[ "$NEEDS_BUILD" == "true" && -f "${FRONTEND_DIR}/prisma/schema.prisma" ]]; then
  # Ensure node_modules binaries are executable before running npx
  find "${FRONTEND_DIR}/node_modules/.bin/" -type f -exec chmod 755 {} + 2>/dev/null || true
  find "${FRONTEND_DIR}/node_modules/.bin/" -type l -exec sh -c 'chmod 755 "$(readlink -f "$1")"' _ {} \; 2>/dev/null || true

  log "Generating Prisma client..."
  if ! npx prisma generate; then
    log_err "Prisma generate failed"
    cd "$REPO_ROOT"
    git reset --hard "$OLD_COMMIT" --quiet 2>/dev/null || true
    exit 1
  fi
  log_ok "Prisma client generated"

  log "Running database migrations..."
  if ! npx prisma migrate deploy; then
    log_err "Prisma migrate failed — check database connection and .env credentials"
    log_err "WARNING: Database may be in a partial migration state. Do NOT rollback git."
    exit 1
  fi
  log_ok "Database migrations applied"
fi

# ════════════════════════════════════════════════════════════════
# Phase 5: Build
# ════════════════════════════════════════════════════════════════
# Ensure node_modules binaries are executable (may have been stripped by chmod 644)
# Fix both the .bin/ symlinks AND the actual target files they point to
find "${FRONTEND_DIR}/node_modules/.bin/" -type f -exec chmod 755 {} + 2>/dev/null || true
find "${FRONTEND_DIR}/node_modules/.bin/" -type l -exec sh -c 'chmod 755 "$(readlink -f "$1")"' _ {} \; 2>/dev/null || true

log "Building Next.js application..."
BUILD_START=$(date +%s)

if ! npm run build; then
  log_err "Build failed"
  rollback
  exit 1
fi

if [[ ! -f ".next/BUILD_ID" ]]; then
  log_err "Build produced no .next/BUILD_ID — output incomplete"
  rollback
  exit 1
fi

BUILD_END=$(date +%s)
BUILD_DURATION=$((BUILD_END - BUILD_START))
log_ok "Build succeeded (${BUILD_DURATION}s) — BUILD_ID: $(cat .next/BUILD_ID)"

# ════════════════════════════════════════════════════════════════
# Phase 6: Set file permissions
# ════════════════════════════════════════════════════════════════
cd "$REPO_ROOT"

if [[ "$(id -u)" -eq 0 ]]; then
  log "Setting file permissions..."
  chown -R www-data:www-data "$REPO_ROOT"
  find "$REPO_ROOT" -type d -exec chmod 755 {} +
  find "$REPO_ROOT" -type f -exec chmod 644 {} +
  chmod 755 "${REPO_ROOT}/deploy.sh"
  # Fix both .bin/ symlinks AND actual target binaries they point to
  find "${FRONTEND_DIR}/node_modules/.bin/" -type f -exec chmod 755 {} + 2>/dev/null || true
  find "${FRONTEND_DIR}/node_modules/.bin/" -type l -exec sh -c 'chmod 755 "$(readlink -f "$1")"' _ {} \; 2>/dev/null || true
  log_ok "Permissions set (www-data:www-data)"
else
  log "Running as non-root — skipping permission changes"
fi

# ════════════════════════════════════════════════════════════════
# Phase 7: PM2 reload (zero-downtime)
# ════════════════════════════════════════════════════════════════
log "Reloading PM2 process..."

if [[ -f "${REPO_ROOT}/ecosystem.config.js" ]]; then
  pm2 reload "${REPO_ROOT}/ecosystem.config.js" --update-env
else
  pm2 reload "$PM2_APP_NAME" --update-env
fi

sleep 2

# Health check
PM2_STATUS=$(pm2 jlist 2>/dev/null | python3 -c "
import sys, json
apps = json.load(sys.stdin)
for a in apps:
    if a['name'] == '${PM2_APP_NAME}':
        print(a['pm2_env']['status'])
        break
" 2>/dev/null || echo "unknown")

if [[ "$PM2_STATUS" != "online" ]]; then
  log_err "PM2 process is not online (status: ${PM2_STATUS})"
  rollback
  exit 1
fi

# HTTP health check
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$HEALTH_URL" 2>/dev/null || echo "000")
if [[ "$HTTP_STATUS" != "200" ]]; then
  log_err "Health check failed (HTTP ${HTTP_STATUS} from ${HEALTH_URL})"
  rollback
  exit 1
fi

pm2 save --force 2>/dev/null || true
log_ok "PM2 reloaded and healthy (HTTP ${HTTP_STATUS})"

# ════════════════════════════════════════════════════════════════
# Phase 8: Summary
# ════════════════════════════════════════════════════════════════
DEPLOY_END=$(date +%s)
DEPLOY_DURATION=$((DEPLOY_END - DEPLOY_START))

echo ""
echo -e "${GREEN}${BOLD}═══ Deployment Successful ═══${NC}"
echo ""
echo -e "${BOLD}Commit:${NC}     ${OLD_COMMIT:0:8} → ${NEW_COMMIT:0:8}"
echo -e "${BOLD}Message:${NC}    ${COMMIT_MSG}"
echo -e "${BOLD}Deps:${NC}       $(if [[ "$NEEDS_INSTALL" == "true" ]]; then echo "Updated"; else echo "Unchanged"; fi)"
echo -e "${BOLD}Build:${NC}      ${BUILD_DURATION}s"
echo -e "${BOLD}Duration:${NC}   ${DEPLOY_DURATION}s"
echo -e "${BOLD}Status:${NC}     ${GREEN}LIVE${NC}"
echo ""
