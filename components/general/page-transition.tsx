"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const variants = {
    initial: { x: 300, opacity: 0 }, // new page starts offscreen right
    animate: { x: 0, opacity: 1 }, // slides in
    exit: { x: -300, opacity: 0 }, // old page slides out left
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // ensures motion div is recreated per page
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "tween", duration: 1.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
