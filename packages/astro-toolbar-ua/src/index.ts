import type { AstroIntegration } from "astro";
import { OVERRIDE_SCRIPT } from "./override.ts";

export default function toolbarUA(): AstroIntegration {
  return {
    name: "astro-toolbar-ua",
    hooks: {
      "astro:config:setup": ({ addDevToolbarApp, injectScript, command }) => {
        if (command !== "dev") return;

        injectScript("head-inline", OVERRIDE_SCRIPT);

        addDevToolbarApp({
          id: "astro-toolbar-ua",
          name: "UA Switch",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
          entrypoint: new URL("./app.ts", import.meta.url),
        });
      },
    },
  };
}
