import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Header } from "@/components/general/header";
import Footer from "@/components/general/footer";

// Fallback fonts for Docker build
const geistSans = {
  variable: "--font-geist-sans",
  style: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

const geistMono = {
  variable: "--font-geist-mono",
  style: {
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  },
};

export const metadata: Metadata = {
  title: "Williams Portfolio",
  description: "Williams Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
