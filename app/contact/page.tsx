import ContactMe from "@/components/general/contact";
import PageTransition from "@/components/general/page-transition";
import type { Metadata } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williams-onuaguluchi.vercel.app";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Williams Onuaguluchi — email, social links, and contact form.",
  alternates: { canonical: `${site}/contact` },
  openGraph: {
    title: "Contact | Williams Onuaguluchi",
    url: `${site}/contact`,
  },
};

export default function Contact() {
  return (
    <PageTransition>
      <div className="py-16 md:py-24">
        <ContactMe />
      </div>
    </PageTransition>
  );
}
