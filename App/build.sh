#!/bin/bash
set -e
echo "--- CUSTOM BUILD SCRIPT ---"
echo "Current Directory: $(pwd)"
echo "Listing files:"
ls -F

echo "--- FORCING NPM INSTALL ---"
npm install

echo "--- CHECKING BINARIES ---"
ls -la node_modules/.bin

echo "--- RUNNING BUILD ---"
npx tsc -b
npx vite build

echo "--- LISTING OUTPUT DIST ---"
ls -R dist
