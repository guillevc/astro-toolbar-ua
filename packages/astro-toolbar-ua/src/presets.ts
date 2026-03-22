import { ICONS } from "./icons.ts";

export interface UaPreset {
  id: string;
  label: string;
  icon: string;
  category: string;
  ua: string;
}

export const STORAGE_KEY = "astro-toolbar-ua:override";

export const PRESETS: UaPreset[] = [
  // Desktop
  {
    id: "macos-chrome",
    label: "macOS",
    icon: ICONS.apple,
    category: "Desktop",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  },
  {
    id: "windows-chrome",
    label: "Windows",
    icon: ICONS.windowsNew,
    category: "Desktop",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  },
  {
    id: "linux-chrome",
    label: "Linux",
    icon: ICONS.laptop,
    category: "Desktop",
    ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  },

  // Mobile
  {
    id: "ios-safari",
    label: "iOS",
    icon: ICONS.apple,
    category: "Mobile",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
  {
    id: "android-chrome",
    label: "Android",
    icon: ICONS.android,
    category: "Mobile",
    ua: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  },

  // Browsers
  {
    id: "macos-safari",
    label: "Safari",
    icon: ICONS.compass,
    category: "Browsers",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  },
  {
    id: "macos-firefox",
    label: "Firefox",
    icon: ICONS.fire,
    category: "Browsers",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0",
  },
  {
    id: "windows-edge",
    label: "Edge",
    icon: ICONS.chrome,
    category: "Browsers",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
  },
];
