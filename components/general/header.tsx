"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as motion from "motion/react-client";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8 lg:px-10">
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
            Williams Onuaguluchi
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground md:text-[11px]">
            Software engineer
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="flex items-center gap-1">
                {i > 0 ? (
                  <Separator orientation="vertical" className="mx-1 h-4 bg-border/70" />
                ) : null}
                <motion.div className="relative px-2 py-1" whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium uppercase tracking-[0.12em] transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </motion.div>
              </div>
            );
          })}
          <Separator orientation="vertical" className="mx-2 h-6 bg-border/70" />
          <LightDarkToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LightDarkToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-sm" className="border-border/80" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 border-border/80 bg-background/95">
              <SheetHeader>
                <SheetTitle className="font-serif text-left text-xl">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={`rounded-md px-3 py-2.5 text-sm font-medium uppercase tracking-[0.14em] ${
                          isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
