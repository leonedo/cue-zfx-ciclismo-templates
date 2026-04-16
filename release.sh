#!/bin/bash

set -e

# Obtener último tag (o default)
last_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")

# Sacar la "v"
version=${last_tag#v}

# Separar versión
IFS='.' read -r major minor patch <<< "$version"

# Tipo de incremento (default: patch)
type=${1:-patch}

case $type in
  major)
    major=$((major+1))
    minor=0
    patch=0
    ;;
  minor)
    minor=$((minor+1))
    patch=0
    ;;
  patch)
    patch=$((patch+1))
    ;;
  *)
    echo "Uso: ./release.sh [major|minor|patch]"
    exit 1
    ;;
esac

new_version="v$major.$minor.$patch"

echo "Última versión: $last_tag"
echo "Nueva versión:  $new_version"

# Crear release
gh release create "$new_version" \
  --title "$new_version" \
  --generate-notes

echo "✅ Release creado: $new_version"