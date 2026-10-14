"use client";

import * as React from "react";

/**
 * Lightweight, dependency-free replacement for `next-themes`.
 * Same API surface used in this project: ThemeProvider, useTheme()
 * -> { theme, resolvedTheme, setTheme }.
 *
 * The anti-flash script lives in app/layout.js (server-rendered <head>), so no
 * <script> is rendered inside a client component (which React 19 warns about).
 */

export const THEME_STORAGE_KEY = "theme";
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(_){}})();`;

const ThemeContext = React.createContext({
  theme: "system",
  resolvedTheme: undefined,
  setTheme: () => {},
});

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function readTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || "system";
  } catch {
    return "system";
  }
}

function systemIsDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribe(listener) {
  listeners.add(listener);
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const onStorage = (e) => {
    if (e.key === null || e.key === THEME_STORAGE_KEY) listener();
  };
  mql.addEventListener("change", listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    mql.removeEventListener("change", listener);
    window.removeEventListener("storage", onStorage);
  };
}

// Snapshot is a primitive string ("theme|resolved") so it is referentially stable.
const getSnapshot = () => {
  const theme = readTheme();
  const resolved = theme === "system" ? (systemIsDark() ? "dark" : "light") : theme;
  return `${theme}|${resolved}`;
};
const getServerSnapshot = () => "system|";

function applyTheme(resolved) {
  const el = document.documentElement;
  el.classList.toggle("dark", resolved === "dark");
  el.style.colorScheme = resolved;
}

export function ThemeProvider({ children }) {
  const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [theme, resolvedRaw] = snapshot.split("|");
  const resolvedTheme = resolvedRaw || undefined;

  React.useEffect(() => {
    if (resolvedTheme) applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = React.useCallback((next) => {
    const value = typeof next === "function" ? next(readTheme()) : next;
    // Disable transitions for one frame so the swap is instant.
    const style = document.createElement("style");
    style.appendChild(
      document.createTextNode("*,*::before,*::after{transition:none!important}")
    );
    document.head.appendChild(style);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {}
    const resolved = value === "system" ? (systemIsDark() ? "dark" : "light") : value;
    applyTheme(resolved);
    emit();
    window.getComputedStyle(document.body);
    setTimeout(() => style.remove(), 1);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
