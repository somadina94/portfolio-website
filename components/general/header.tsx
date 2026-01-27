"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as motion from "motion/react-client";
import { LightDarkToggle } from "../ui/light-dark-toggle";

const navItems = [
  { label: "projects", href: "/projects" },
  { label: "certs", href: "/certs" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname(); // Current URL path

  return (
    <nav className="sticky top-0 z-50 flex justify-between mb-12 px-2 md:px-4 py-4 bg-background/50 backdrop-blur-sm border-b border-border">
      <Link
        href="/"
        className="font-bold md:text-2xl py-2 text-primary hover:text-primary/80"
      >
        WILLIAMS
      </Link>

      <LightDarkToggle />

      <div className="flex items-center gap-4 uppercase relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.label}
              className="relative cursor-pointer text-[10px] md:text-[16px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>

              {/* Animate underline */}
              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}
