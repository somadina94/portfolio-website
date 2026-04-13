import Link from "next/link";
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/certs", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/80 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="font-serif text-2xl font-semibold tracking-tight">Williams Onuaguluchi</p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building thoughtful, performant interfaces for the web and mobile — with accessibility and
              clarity at the center.
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Connect</p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:williamsonuaguluchi4991@gmail.com"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/williams-onuaguluchi-3aa8b02a1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/somadina94"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-border/60" />

        <div className="flex flex-col gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {year} Williams Onuaguluchi. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.18em]">Crafted with Next.js &amp; care</p>
        </div>
      </div>
    </footer>
  );
}
