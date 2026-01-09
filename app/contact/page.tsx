import ContactMe from "@/components/general/contact";
import PageTransition from "@/components/general/page-transition";

export const metadata = {
  title: "Contact | Williams Onuaguluchi",
  description: "Contact page of Williams Onuaguluchi's portfolio",
};

export default function Contact() {
  return (
    <PageTransition>
      <div className="px-2 md:px-12">
        <ContactMe />
      </div>
    </PageTransition>
  );
}
