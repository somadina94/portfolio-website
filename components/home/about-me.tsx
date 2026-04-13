import { cn } from "@/lib/utils";
import Link from "next/link";
import * as motion from "motion/react-client";
import { container, item } from "@/utils/motion-config";
import { Separator } from "@/components/ui/separator";

export default function AboutMe({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-12 border-b border-border/80 py-16 md:flex-row md:items-start md:justify-between md:gap-20 md:py-24",
        className
      )}
      id="about-me"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="md:w-1/3"
      >
        <motion.div variants={item}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">About</p>
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">The work behind the code</h2>
        </motion.div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="flex max-w-2xl flex-col gap-6 md:w-2/3"
      >
        <motion.div variants={item}>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            I am a software engineer with a focus on building clean, scalable, and user-friendly web and
            mobile applications. I specialize in modern JavaScript and TypeScript stacks — React, Next.js,
            and React Native — with backends on Firebase, Supabase, and Node.js. I enjoy turning complex
            problems into elegant solutions and learning tools that keep products fast and maintainable.
            Whether it&apos;s intuitive UIs, integrations, or robust server logic, I aim for code that
            delivers real value. When I&apos;m not coding, I&apos;m exploring new tech, collaborating on
            freelance work, or refining products that make everyday tasks simpler.
          </p>
        </motion.div>
        <Separator className="bg-border/70" />
        <motion.div variants={item}>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border-b border-primary pb-0.5 text-sm font-medium text-primary transition-colors hover:text-primary/85"
          >
            Full story &amp; skills
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
