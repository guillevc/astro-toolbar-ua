import { defineConfig } from "astro/config";
import toolbarUA from "astro-toolbar-ua";

export default defineConfig({
  integrations: [toolbarUA()],
});
