import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Loyanox Mentor — Internship & Mentorship Tracking",
  description: "Track internship tasks, progress and mentor feedback in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} font-sans h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-sans min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
