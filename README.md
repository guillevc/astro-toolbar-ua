# astro-toolbar-ua

Astro dev toolbar app for switching user agent strings. Test platform detection, bot crawlers, and browser-specific behavior without leaving the browser.

<!-- TODO: screenshot -->

## Install

```bash
npx astro add astro-toolbar-ua
```

Or manually:

```bash
npm install -D astro-toolbar-ua
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import toolbarUA from "astro-toolbar-ua";

export default defineConfig({
  integrations: [toolbarUA()],
});
```

## Usage

Click the **UA Switch** icon in the Astro dev toolbar to open the panel. Select a preset or paste a custom UA string. The page reloads automatically with the new user agent applied.

A notification dot on the toolbar icon indicates when a UA override is active.

## Presets

| Category      | Presets                                           |
| ------------- | ------------------------------------------------- |
| **Platforms** | macOS (Chrome), Windows (Chrome), Linux (Chrome)  |
| **Mobile**    | iOS (Safari), Android (Chrome)                    |
| **Browsers**  | Safari (macOS), Firefox (macOS), Edge (Windows)   |
| **Bots**      | Googlebot, Bingbot, Facebook Crawler, Twitter Bot |

Custom UA strings can be entered directly in the text input.

## How it works

1. The integration injects a synchronous `<head>` script that reads a `localStorage` key and overrides `navigator.userAgent` via `Object.defineProperty` — before any page scripts run
2. The toolbar app UI writes the selected UA string to `localStorage` and reloads the page
3. The override only runs during `astro dev` — production builds are not affected

## Limitations

- Only overrides client-side `navigator.userAgent`. Does not modify server-side request headers.
- `Object.defineProperty` on `navigator.userAgent` works in Chromium and Firefox. Safari may not support it in all versions.

## License

MIT
