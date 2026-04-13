import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/admin-panel";
import PageTransition from "@/components/general/page-transition";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-4xl">
        <div className="pt-12">
          <h1 className="font-serif text-4xl">Admin Upload</h1>
          <p className="mt-3 text-muted-foreground">
            Private content manager for adding projects and certifications.
          </p>
        </div>
        <AdminPanel />
      </section>
    </PageTransition>
  );
}
