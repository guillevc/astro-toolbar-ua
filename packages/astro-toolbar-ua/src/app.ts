import { defineToolbarApp } from "astro/toolbar";
import { ICONS } from "./icons.ts";
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
    win.style.cssText = "overflow-y: auto; max-height: 100%;";

    // Header
    const header = document.createElement("h2");
    header.textContent = "UA Switch";
    header.style.cssText =
      "margin: 0 0 12px; font-size: 14px; font-weight: 600; color: white;";
    win.appendChild(header);

    // Group presets by category
    const categories = [...new Set(PRESETS.map((p) => p.category))];

    for (const category of categories) {
      const group = document.createElement("div");
      group.style.cssText = "margin-bottom: 12px;";

      const label = document.createElement("div");
      label.textContent = category;
      label.style.cssText =
        "font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;";
      group.appendChild(label);

      const row = document.createElement("div");
      row.style.cssText = "display: flex; gap: 6px; flex-wrap: wrap;";

      const presets = PRESETS.filter((p) => p.category === category);
      for (const preset of presets) {
        const btn = document.createElement("button");
        const isActive = stored === preset.ua;
        btn.innerHTML = `
          <span style="display: block; margin-bottom: 4px; line-height: 0;">${preset.icon}</span>
          <span style="font-size: 11px;">${preset.label}</span>
        `;
        btn.style.cssText = `
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 8px 10px; min-width: 60px; flex: 1;
          background: ${isActive ? "rgba(167, 139, 250, 0.15)" : "rgba(255,255,255,0.03)"};
          border: 1px solid ${isActive ? "rgba(167, 139, 250, 0.4)" : "rgba(255,255,255,0.08)"};
          border-radius: 8px; color: ${isActive ? "#a78bfa" : "rgba(255,255,255,0.8)"};
          cursor: pointer; font-family: system-ui, -apple-system, sans-serif;
        `;
        btn.addEventListener("mouseenter", () => {
          if (stored !== preset.ua) {
            btn.style.background = "rgba(255,255,255,0.07)";
            btn.style.borderColor = "rgba(255,255,255,0.15)";
          }
        });
        btn.addEventListener("mouseleave", () => {
          if (stored !== preset.ua) {
            btn.style.background = "rgba(255,255,255,0.03)";
            btn.style.borderColor = "rgba(255,255,255,0.08)";
          }
        });
        btn.addEventListener("click", () => {
          localStorage.setItem(STORAGE_KEY, preset.ua);
          location.reload();
        });
        row.appendChild(btn);
      }

      group.appendChild(row);
      win.appendChild(group);
    }

    // Separator
    const sep = document.createElement("hr");
    sep.style.cssText =
      "border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 12px 0;";
    win.appendChild(sep);

    // Custom UA input
    const isCustomActive = isOverridden && !activePreset;

    const customLabel = document.createElement("div");
    customLabel.textContent = "Custom";
    customLabel.style.cssText = `
      font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;
      color: ${isCustomActive ? "#a78bfa" : "rgba(255,255,255,0.5)"};
    `;
    win.appendChild(customLabel);

    const inputRow = document.createElement("div");
    inputRow.style.cssText = "display: flex; gap: 6px; margin-bottom: 12px;";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Paste UA string...";
    input.value = isCustomActive ? (stored ?? "") : "";
    input.style.cssText = `
      flex: 1; padding: 6px 8px;
      background: ${isCustomActive ? "rgba(167, 139, 250, 0.15)" : "rgba(255,255,255,0.05)"};
      border: 1px solid ${isCustomActive ? "rgba(167, 139, 250, 0.4)" : "rgba(255,255,255,0.1)"};
      border-radius: 6px; color: ${isCustomActive ? "#a78bfa" : "white"};
      font-size: 12px; font-family: ui-monospace, monospace; outline: none;
    `;
    const defaultInputBorder = isCustomActive
      ? "rgba(167, 139, 250, 0.4)"
      : "rgba(255,255,255,0.1)";
    input.addEventListener("focus", () => {
      input.style.borderColor = "rgba(167, 139, 250, 0.4)";
    });
    input.addEventListener("blur", () => {
      input.style.borderColor = defaultInputBorder;
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
        location.reload();
      }
    });

    inputRow.appendChild(input);
    inputRow.appendChild(applyBtn);
    win.appendChild(inputRow);

    // Reset button
    const resetBtn = document.createElement("button");
    resetBtn.innerHTML = `<span style="margin-right: 6px; line-height: 0;">${ICONS.undo}</span>Reset`;
    resetBtn.style.cssText = `
      display: flex; align-items: center; justify-content: center;
      width: 100%; padding: 8px 10px;
      background: ${isOverridden ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.03)"};
      border: 1px solid ${isOverridden ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.08)"};
      border-radius: 8px;
      color: ${isOverridden ? "#f87171" : "rgba(255,255,255,0.4)"};
      font-size: 12px; cursor: ${isOverridden ? "pointer" : "default"};
      font-family: system-ui, -apple-system, sans-serif;
    `;
    if (isOverridden) {
      resetBtn.addEventListener("mouseenter", () => {
        resetBtn.style.background = "rgba(239, 68, 68, 0.18)";
        resetBtn.style.borderColor = "rgba(239, 68, 68, 0.45)";
      });
      resetBtn.addEventListener("mouseleave", () => {
        resetBtn.style.background = "rgba(239, 68, 68, 0.1)";
        resetBtn.style.borderColor = "rgba(239, 68, 68, 0.3)";
      });
    }
    resetBtn.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    });
    win.appendChild(resetBtn);

    canvas.appendChild(win);
  },
});
