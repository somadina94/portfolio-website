import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Header } from "@/components/general/header";
import Footer from "@/components/general/footer";
import { Toaster } from "@/components/ui/sonner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williams-onuaguluchi.vercel.app";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Williams Onuaguluchi — Software Engineer",
    template: "%s | Williams Onuaguluchi",
  },
  description:
    "Software engineer building fast, accessible web and mobile experiences. Portfolio, projects, and contact.",
  keywords: [
    "Williams Onuaguluchi",
    "software engineer",
    "full stack",
    "Next.js",
    "React",
    "React Native",
    "portfolio",
  ],
  authors: [{ name: "Williams Onuaguluchi" }],
  creator: "Williams Onuaguluchi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Williams Onuaguluchi",
    title: "Williams Onuaguluchi — Software Engineer",
    description:
      "Software engineer building fast, accessible web and mobile experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Williams Onuaguluchi — Software Engineer",
    description:
      "Software engineer building fast, accessible web and mobile experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Williams Onuaguluchi",
  url: siteUrl,
  jobTitle: "Software Engineer",
  description:
    "Software engineer focused on accessible, user-friendly web and mobile applications.",
  sameAs: [
    "https://github.com/somadina94",
    "https://www.linkedin.com/in/williams-onuaguluchi-3aa8b02a1",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${dmSans.variable} min-h-screen font-sans antialiased`}
      >
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WCMV1JRRJ7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WCMV1JRRJ7');
        `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-8 lg:px-10">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
