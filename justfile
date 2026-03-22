[script('bash')]
release VERSION:
    set -euo pipefail
    (cd packages/astro-toolbar-ua && npm pkg set version={{VERSION}})
    git add packages/astro-toolbar-ua/package.json
    git diff --cached --quiet || git commit -m "chore: bump version to {{VERSION}}"
    git tag v{{VERSION}}
