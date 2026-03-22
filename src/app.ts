import { defineToolbarApp } from "astro/toolbar";
import { PRESETS, STORAGE_KEY } from "./presets.ts";

export default defineToolbarApp({
  init(canvas, app) {
    const stored = localStorage.getItem(STORAGE_KEY);
    const activePreset = PRESETS.find((p) => p.ua === stored);
    const isOverridden = stored !== null && stored !== "default";

    // Show notification dot when override is active
    if (isOverridden) {
      app.toggleNotification({ state: true });
    }

    // Window container
    const win = document.createElement("astro-dev-toolbar-window");

    // Header
    const header = document.createElement("header");
    header.innerHTML = `
      <h2 style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: white;">
        UA Switch
      </h2>
      <p style="margin: 0 0 12px; font-size: 12px; color: rgba(255,255,255,0.6);">
        Active: <strong style="color: ${isOverridden ? "#a78bfa" : "rgba(255,255,255,0.8)"}">
          ${activePreset?.label ?? (isOverridden ? "Custom" : "Default")}
        </strong>
      </p>
    `;
    win.appendChild(header);

    // Group presets by category
    const categories = [...new Set(PRESETS.map((p) => p.category))];

    for (const category of categories) {
      const group = document.createElement("div");
      group.style.cssText = "margin-bottom: 12px;";

      const label = document.createElement("div");
      label.textContent = category;
      label.style.cssText =
        "font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;";
      group.appendChild(label);

      const presets = PRESETS.filter((p) => p.category === category);
      for (const preset of presets) {
        const btn = document.createElement("button");
        const isActive = stored === preset.ua;
        btn.textContent = preset.label;
        btn.style.cssText = `
          display: block; width: 100%; text-align: left; padding: 6px 8px;
          background: ${isActive ? "rgba(167, 139, 250, 0.15)" : "transparent"};
          border: 1px solid ${isActive ? "rgba(167, 139, 250, 0.4)" : "transparent"};
          border-radius: 6px; color: ${isActive ? "#a78bfa" : "rgba(255,255,255,0.8)"};
          font-size: 13px; cursor: pointer; margin-bottom: 2px;
          font-family: system-ui, -apple-system, sans-serif;
        `;
        btn.addEventListener("mouseenter", () => {
          if (stored !== preset.ua) {
            btn.style.background = "rgba(255,255,255,0.05)";
          }
        });
        btn.addEventListener("mouseleave", () => {
          if (stored !== preset.ua) {
            btn.style.background = "transparent";
          }
        });
        btn.addEventListener("click", () => {
          localStorage.setItem(STORAGE_KEY, preset.ua);
          window.location.reload();
        });
        group.appendChild(btn);
      }

      win.appendChild(group);
    }

    // Separator
    const sep = document.createElement("hr");
    sep.style.cssText =
      "border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 12px 0;";
    win.appendChild(sep);

    // Custom UA input
    const customLabel = document.createElement("div");
    customLabel.textContent = "Custom";
    customLabel.style.cssText =
      "font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;";
    win.appendChild(customLabel);

    const inputRow = document.createElement("div");
    inputRow.style.cssText = "display: flex; gap: 6px; margin-bottom: 12px;";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Paste UA string...";
    input.value =
      isOverridden && !activePreset ? (stored ?? "") : "";
    input.style.cssText = `
      flex: 1; padding: 6px 8px; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 6px;
      color: white; font-size: 12px; font-family: ui-monospace, monospace;
      outline: none;
    `;
    input.addEventListener("focus", () => {
      input.style.borderColor = "rgba(167, 139, 250, 0.4)";
    });
    input.addEventListener("blur", () => {
      input.style.borderColor = "rgba(255,255,255,0.1)";
    });

    const applyBtn = document.createElement("button");
    applyBtn.textContent = "Apply";
    applyBtn.style.cssText = `
      padding: 6px 12px; background: rgba(167, 139, 250, 0.2);
      border: 1px solid rgba(167, 139, 250, 0.4); border-radius: 6px;
      color: #a78bfa; font-size: 12px; cursor: pointer; white-space: nowrap;
      font-family: system-ui, -apple-system, sans-serif;
    `;
    applyBtn.addEventListener("click", () => {
      const value = input.value.trim();
      if (value) {
        localStorage.setItem(STORAGE_KEY, value);
        window.location.reload();
      }
    });

    inputRow.appendChild(input);
    inputRow.appendChild(applyBtn);
    win.appendChild(inputRow);

    // Reset button
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset to default";
    resetBtn.style.cssText = `
      display: block; width: 100%; padding: 6px 8px;
      background: transparent; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px; color: rgba(255,255,255,0.6); font-size: 12px;
      cursor: pointer; font-family: system-ui, -apple-system, sans-serif;
    `;
    resetBtn.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    });
    win.appendChild(resetBtn);

    canvas.appendChild(win);
  },
});
