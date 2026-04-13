"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  title: string;
  className?: string;
};

export function ProjectImageCarousel({ images, title, className }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };
    sync();
    api.on("reInit", sync);
    api.on("select", sync);
    return () => {
      api.off("reInit", sync);
      api.off("select", sync);
    };
  }, [api]);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground",
          className
        )}
      >
        No images yet
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn("relative overflow-hidden rounded-xl border border-border/80 shadow-md", className)}
      >
        <div className="relative aspect-[4/3] w-full bg-muted/30">
          <Image
            src={images[0]}
            alt={`${title} — screenshot`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative w-full", className)}
    >
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true, align: "start" }}>
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-muted/20 shadow-md">
          <CarouselContent className="-ml-0">
            {images.map((src, i) => (
              <CarouselItem key={`${src}-${i}`} className="pl-0 basis-full">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={src}
                    alt={`${title} — screenshot ${i + 1} of ${images.length}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 520px, 100vw"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="secondary"
            className="left-3 top-1/2 z-10 -translate-y-1/2 border-border/80 bg-background/90 shadow-sm backdrop-blur-sm hover:bg-background"
          />
          <CarouselNext
            variant="secondary"
            className="right-3 top-1/2 z-10 -translate-y-1/2 border-border/80 bg-background/90 shadow-sm backdrop-blur-sm hover:bg-background"
          />
        </div>
      </Carousel>
      <div
        className="mt-3 flex items-center justify-center gap-2 text-xs tabular-nums text-muted-foreground"
        aria-live="polite"
      >
        <span className="rounded-full border border-border/60 bg-card px-2.5 py-0.5 font-medium text-foreground/90">
          {current} / {count || images.length}
        </span>
        <span className="hidden sm:inline">Use arrow keys or buttons to browse</span>
      </div>
    </motion.div>
  );
}
