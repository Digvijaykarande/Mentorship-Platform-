"use client";

import { ThemeProvider } from "next-themes";

/**
 * App-wide providers. Wraps children with next-themes so `useTheme()` and the
 * `.dark` class toggling used across globals.css / shadcn components actually work.
 */
export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
