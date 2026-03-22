import type { AstroIntegration } from "astro";
import { ICONS } from "./icons.ts";
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
          icon: ICONS.anonymous,
          entrypoint: new URL("./app.ts", import.meta.url),
        });
      },
    },
  };
}
