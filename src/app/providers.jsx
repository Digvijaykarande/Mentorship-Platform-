"use client";

import { ThemeProvider } from "@/lib/theme";

/**
 * App-wide providers. Wraps children with the local theme provider so `useTheme()` and the
 * `.dark` class toggling used across globals.css / shadcn components actually work.
 */
export default function Providers({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
