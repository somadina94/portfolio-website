import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import ContactForm from "./contact-form";
import { container, item } from "@/utils/motion-config";
import * as motion from "motion/react-client";
import { Separator } from "@/components/ui/separator";

export default function Contact() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="flex flex-col gap-12 border-b border-border/80 py-16 md:flex-row md:items-start md:justify-between md:gap-16 md:py-24"
      id="contact-me"
    >
      <motion.div variants={item} className="max-w-lg space-y-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Contact</p>
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">Let&apos;s connect</h2>
        </div>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          I&apos;m open to new roles, collaborations, and interesting product work. Reach me by email or
          connect on social — and grab my resume when you need the full picture.
        </p>
        <p className="text-sm leading-relaxed">
          <a
            href="mailto:williamsonuaguluchi4991@gmail.com"
            className="border-b border-primary font-medium text-primary transition-colors hover:text-primary/85"
          >
            williamsonuaguluchi4991@gmail.com
          </a>
          <span className="text-muted-foreground"> · </span>
          <Link
            href="/resume.pdf"
            className="border-b border-primary font-medium text-primary transition-colors hover:text-primary/85"
          >
            Resume
          </Link>
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="icon" className="border-primary/35">
            <Link
              href="https://www.linkedin.com/in/williams-onuaguluchi-3aa8b02a1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="border-primary/35">
            <Link href="https://github.com/somadina94" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <Separator className="md:hidden" />

      <motion.div variants={item} className="w-full md:max-w-md md:flex-1">
        <ContactForm />
      </motion.div>
    </motion.section>
  );
}
