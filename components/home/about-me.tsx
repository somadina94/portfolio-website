import { cn } from "@/lib/utils";
import Link from "next/link";
import * as motion from "motion/react-client";
import { container, item } from "@/utils/motion-config";

export default function AboutMe({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between border-b border-border py-12 md:pb-60",
        className
      )}
      id="about-me"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={item} className="w-full">
          <h2 className="uppercase text-primary mb-12 md:mb-0">About Me</h2>
        </motion.div>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="flex flex-col gap-4 mb-8 md:w-1/2"
      >
        <motion.div variants={item} className="w-full">
          <div className="flex flex-col gap-4 ">
            <p className="text-muted-foreground mb-12 md:mb-0">
              I am a software engineer with a focus on building clean, scalable,
              and user-friendly web and mobile applications. I specialize in
              modern JavaScript/Typescript frameworks like React, Next.js, and
              React Native, and I’m experienced with backend technologies such
              as Firebase, Supabase, and Node.js. I enjoy turning complex
              problems into elegant solutions and constantly learning new tools
              to stay ahead in the ever-evolving tech space. Whether it&apos;s
              building intuitive UIs, integrating third-party APIs, or crafting
              robust backend logic, I strive to deliver high-quality,
              maintainable code that adds real value. When I&apos;m not coding,
              I&apos;m usually exploring new tech trends, collaborating on
              freelance projects, or refining products that make everyday tasks
              simpler and smarter.
            </p>
            <Link
              href="/about"
              className="text-primary hover:text-primary/80 uppercase border-b border-primary inline-block w-fit"
            >
              More about me
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
