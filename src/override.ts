export const OVERRIDE_SCRIPT = `(function() {
  try {
    var stored = localStorage.getItem("astro-toolbar-ua:override");
    if (stored && stored !== "default") {
      Object.defineProperty(navigator, "userAgent", {
        get: function() { return stored; },
        configurable: true
      });
    }
  } catch(e) {}
})();`;
