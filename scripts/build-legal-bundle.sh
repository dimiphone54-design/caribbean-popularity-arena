#!/usr/bin/env bash
# Build one combined markdown bundle for PDF export / attorney review.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LEGAL="$ROOT/legal"
OUT="$ROOT/deliverables/caribbean-popularity-arena-legal-framework-complete.md"

mkdir -p "$(dirname "$OUT")"

{
  echo "# Caribbean Popularity Arena — Complete Legal Framework"
  echo ""
  echo "**Generated:** $(date -u +"%Y-%m-%d %H:%M UTC")"
  echo "**Status:** Draft for attorney review"
  echo ""
  echo "---"
  echo ""

  for file in \
    terms-and-conditions.md \
    privacy-policy.md \
    community-guidelines.md \
    creator-participation-agreement.md \
    refund-and-payment-policy.md \
    safety-reporting-moderation-policy.md \
    cookie-and-analytics-policy.md \
    acceptable-use-policy.md \
    content-ownership-ip-policy.md \
    data-retention-deletion-policy.md \
    birthday-bless-time-promotion-terms.md
  do
    echo ""
    cat "$LEGAL/$file"
    echo ""
    echo "---"
    echo ""
  done
} > "$OUT"

echo "Wrote $OUT"
