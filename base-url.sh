#!/bin/bash
# ============================================================
# BASE URL CONFIGURATION
# ============================================================
# This is the SINGLE SOURCE OF TRUTH for the API base URL.
# Change this value to update the entire application.
#
# Usage:
#   Before running dev or build, source this file:
#   $ source base-url.sh
#   $ npm run dev
#   OR
#   $ source base-url.sh && npm run build
#
# Examples:
#   BASE_URL="https://robotmanagerv1test.qikpod.com"
#   BASE_URL="https://abc.leapmile.com"
#   BASE_URL="https://production.example.com"
# ============================================================

BASE_URL="https://robotmanagerv1test.qikpod.com"

# Export for Vite (must be prefixed with VITE_ for client-side access)
export VITE_BASE_URL="$BASE_URL"

# Also export the raw BASE_URL for any scripts that need it
export BASE_URL

echo "✓ BASE_URL configured: $BASE_URL"
