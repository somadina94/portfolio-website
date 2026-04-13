import AboutMe from "@/components/home/about-me";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { container, item } from "@/utils/motion-config";
import PageTransition from "@/components/general/page-transition";
import type { Metadata } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williams-onuaguluchi.vercel.app";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, skills, and technologies Williams Onuaguluchi works with — React, Next.js, mobile, and cloud.",
  alternates: { canonical: `${site}/about` },
  openGraph: {
    title: "About | Williams Onuaguluchi",
    url: `${site}/about`,
  },
};

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "React Native",
  "Expo",
  "Shadcn UI",
  "Vercel",
  "Netlify",
  "Heroku",
  "Render",
  "Github Actions",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "Git",
  "Docker",
  "AWS",
  "Windows",
  "MacOS",
];

export default function About() {
  return (
    <PageTransition>
      <div className="border-b border-border/80 py-16 md:py-24">
        <AboutMe className="border-0 py-0 md:pb-0" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-10 pt-16 md:flex-row md:items-start md:justify-between md:gap-16 md:pt-24"
        >
          <motion.div variants={item} className="max-w-md space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Toolkit</p>
            <h2 className="font-serif text-3xl tracking-tight md:text-4xl">Skills &amp; technologies</h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              Languages, frameworks, and platforms I use to ship production software.
            </p>
          </motion.div>
          <motion.div variants={item} className="flex flex-1 flex-wrap gap-2 md:justify-end">
            {skills.map((skill) => (
              <Button key={skill} variant="outline" size="sm" className="border-border/80 font-normal">
                {skill}
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
