#!/usr/bin/env bash
# Canary cleanup via the admin case API.
# Usage: ADMIN_PASSWORD='your-admin-password' bash scripts/cleanup-canaries-curl.sh
set -euo pipefail

BASE="https://thearmchairfuturist.com"
JAR="$(mktemp)"
trap 'rm -f "$JAR"' EXIT

: "${ADMIN_PASSWORD:?Set ADMIN_PASSWORD env var first}"

echo "→ logging in..."
code=$(curl -s -o /dev/null -w "%{http_code}" -c "$JAR" -X POST "$BASE/api/admin/verify" \
  -H "content-type: application/json" \
  -d "{\"password\":\"$ADMIN_PASSWORD\"}")
[ "$code" = "200" ] || { echo "login failed (HTTP $code) — check ADMIN_PASSWORD"; exit 1; }
echo "✓ authenticated"

echo "→ current audit_cases (newest 10):"
curl -s -b "$JAR" "$BASE/api/admin/cases?collection=audit_cases&limit=10" | head -c 2000; echo
echo "→ current identity_cases (newest 10):"
curl -s -b "$JAR" "$BASE/api/admin/cases?collection=identity_cases&limit=10" | head -c 2000; echo

for id in audit_mth2c0fr_u0iuul id_mth8en1y_wvtg9z; do
  collection=audit_cases
  [[ "$id" == id_* ]] && collection=identity_cases
  echo "→ deleting $id from $collection ..."
  code=$(curl -s -o /dev/null -w "%{http_code}" -b "$JAR" -X DELETE \
    "$BASE/api/admin/cases?collection=$collection&id=$id")
  echo "  [$code] $id"
done

echo "done. verify with the list commands above."
