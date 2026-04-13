import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import williams from "@/assets/williams.jpeg";
import * as motion from "motion/react-client";
import { container, item } from "@/utils/motion-config";

export function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="border-b border-border/80 pb-16 pt-6 md:flex md:items-center md:justify-between md:gap-16 md:pb-24 md:pt-10"
    >
      <motion.div variants={item} className="flex max-w-xl flex-col gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Portfolio</p>
          <h1 className="text-balance font-serif text-4xl leading-[1.1] md:text-5xl lg:text-[3.35rem]">
            Hello — I&apos;m Williams Onuaguluchi
          </h1>
        </div>
        <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          A software engineer and digital nomad focused on fast, accessible experiences on the web and
          mobile — from product polish to solid engineering under the hood.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="font-medium">
            <Link href="#contact-me">Get in touch</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary/35">
            <Link
              href="https://www.linkedin.com/in/williams-onuaguluchi-3aa8b02a1"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary/35">
            <Link href="https://github.com/somadina94" target="_blank" rel="noopener noreferrer" className="gap-2">
              <GithubIcon className="size-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="relative mt-12 w-full max-w-md shrink-0 md:mt-0 md:max-w-sm lg:max-w-md"
      >
        <div className="pointer-events-none absolute -inset-3 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative overflow-hidden rounded-2xl border border-border/80 shadow-lg">
          <Image
            src={williams}
            alt="Williams Onuaguluchi"
            width={480}
            height={600}
            priority
            sizes="(min-width: 768px) 360px, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
