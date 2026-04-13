import { Certification } from "@/types/certification";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import * as motion from "motion/react-client";
import { container, item } from "@/utils/motion-config";
import PageTransition from "@/components/general/page-transition";
import type { Metadata } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williams-onuaguluchi.vercel.app";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Professional certifications and credentials for Williams Onuaguluchi.",
  alternates: { canonical: `${site}/certs` },
  openGraph: {
    title: "Certifications | Williams Onuaguluchi",
    url: `${site}/certs`,
  },
};

export default async function CertsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from<"certifications", Certification>("certifications")
    .select("*")
    .order("date_issued", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <PageTransition>
      <div className="border-b border-border/80 px-0 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Credentials</p>
          <h1 className="font-serif text-3xl tracking-tight md:text-5xl">Certifications</h1>
          <p className="max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            Professional certifications that reflect continuous learning and depth across the stack.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {data?.map((cert) => (
            <motion.article
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              key={cert.id}
              className="border-b border-border/60 pb-16 last:border-0 last:pb-0"
            >
              <h2 className="mb-8 font-serif text-2xl text-primary md:text-3xl">{cert.title}</h2>
              <motion.div
                variants={item}
                className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14"
              >
                <Card className="w-full max-w-[11rem] shrink-0 overflow-hidden border-border/70 shadow-sm">
                  <CardContent className="flex flex-col gap-4 p-4">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={cert.badge_url as string}
                        alt={`${cert.title} badge`}
                        fill
                        className="object-contain"
                        sizes="140px"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex min-w-0 flex-1 flex-col gap-8 lg:flex-row">
                  <Card className="flex-1 overflow-hidden border-border/70 shadow-sm">
                    <CardContent className="p-0">
                      <div className="relative aspect-[5/4] w-full max-h-[380px]">
                        <Image
                          src={cert.image_url as string}
                          alt={`${cert.title} certificate`}
                          fill
                          className="object-contain"
                          sizes="(min-width: 1024px) 400px, 100vw"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="w-full space-y-5 lg:max-w-md lg:flex-1">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-foreground">Issued by</p>
                      <p className="text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-foreground">Date issued</p>
                      <p className="text-muted-foreground">{cert.date_issued}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-foreground">Description</p>
                      <p className="text-muted-foreground leading-relaxed">{cert.description}</p>
                    </div>
                    <div>
                      <Link
                        href={cert.certificate_url}
                        className="inline-flex border-b border-primary text-sm font-medium text-primary transition-colors hover:text-primary/85"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Verification link
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
