import Contact from "@/components/general/contact";
import AboutMe from "@/components/home/about-me";
import Featured from "@/components/home/featured";
import { Hero } from "@/components/home/hero";
import PageTransition from "@/components/general/page-transition";
import type { Metadata } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williams-onuaguluchi.vercel.app";

export const metadata: Metadata = {
  title: { absolute: "Williams Onuaguluchi — Software Engineer" },
  description:
    "Williams Onuaguluchi — software engineer building accessible, high-performance web and mobile applications.",
  alternates: { canonical: site },
  openGraph: {
    title: "Williams Onuaguluchi — Software Engineer",
    description: "Portfolio, featured projects, and contact.",
    url: site,
  },
};

export default function Home() {
  return (
    <PageTransition>
      <div className="pt-2">
        <Hero />
        <Featured />
        <AboutMe />
        <Contact />
      </div>
    </PageTransition>
  );
}
