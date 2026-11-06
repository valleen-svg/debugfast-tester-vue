# scripts/upload-sourcemaps.sh
#!/usr/bin/env bash
set -euo pipefail

RELEASE=$(node -p "require('./package.json').version")

if [ -z "${DEBUGFAST_SECRET_KEY:-}" ]; then
  echo "DEBUGFAST_SECRET_KEY not set, skipping upload"
else
  cd dist
  args=()
  for f in $(find . -name '*.map'); do
    args+=(-F "file=@$f;filename=${f#./}")
  done
  curl --fail-with-body -X POST "$DEBUGFAST_INGESTION_URL/v1/sourcemaps/upload" \
    -H "Authorization: Bearer $DEBUGFAST_SECRET_KEY" \
    -F release="$RELEASE" "${args[@]}"
  cd ..
fi

find dist -name '*.map' -delete