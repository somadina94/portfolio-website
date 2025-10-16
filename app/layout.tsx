import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Header } from "@/components/general/header";
import Footer from "@/components/general/footer";
import { Toaster } from "@/components/ui/sonner";

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
  title: "Williams Onuaguluchi",
  description: "Official website of Williams Onuaguluchi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1440px] mx-auto`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FDJQ4QESCB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FDJQ4QESCB');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
