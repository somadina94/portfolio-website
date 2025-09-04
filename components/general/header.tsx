import Link from "next/link";
import { LightDarkToggle } from "../ui/light-dark-toggle";

export function Header() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between mb-12 px-2 md:px-4 py-4 bg-background/50 backdrop-blur-sm border-b border-border">
      <Link
        href="/"
        className="font-bold md:text-2xl py-2 text-primary hover:text-primary/80"
      >
        WILLIAMSS
      </Link>
      <LightDarkToggle />
      <div className="flex items-center gap-4 uppercase">
        <Link
          href="/projects"
          className="text-[14px] md:text-[16px] hover:text-primary"
        >
          projects
        </Link>
        <Link
          href="/about"
          className="text-[14px] md:text-[16px] hover:text-primary"
        >
          about
        </Link>
        <Link
          href="/contact"
          className="text-[14px] md:text-[16px] hover:text-primary"
        >
          contact
        </Link>
      </div>
    </nav>
  );
}
