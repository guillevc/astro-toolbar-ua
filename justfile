[script('bash')]
release VERSION:
    set -euo pipefail
    npm pkg set version={{VERSION}} -w packages/astro-toolbar-ua
    git add packages/astro-toolbar-ua/package.json
    git diff --cached --quiet || git commit -m "chore: bump version to {{VERSION}}"
    git tag v{{VERSION}}
