import Link from "next/link";
import { LightDarkToggle } from "../ui/light-dark-toggle";

export function Header() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between mb-12 px-2 md:px-4 py-4 bg-background/50 backdrop-blur-sm border-b border-border">
      <Link href="/" className="font-bold md:text-2xl px-4 py-2">
        WILLIAMS
      </Link>
      <LightDarkToggle />
      <div className="flex items-center gap-8 uppercase">
        <Link href="/projects" className="text-sm md:text-lg">
          projects
        </Link>
        <Link href="/about" className="text-sm md:text-lg">
          about
        </Link>
        <Link href="/contact" className="text-sm md:text-lg">
          contact
        </Link>
      </div>
    </nav>
  );
}
