import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import ContactForm from "./contact-form";

export default function Contact() {
  return (
    <div className="flex flex-col md:justify-between md:flex-row border-b border-border py-10 px-12 gap-10">
      <div className="space-y-12">
        <h2 className="text-primary">LET&apos;S CONNECT</h2>
        <p className="max-w-lg">
          I&apos;m always looking for new opportunities and collaborations. Feel
          free to reach out to me via email{" "}
          <Link
            href="mailto:contact@example.com"
            className="text-primary hover:text-primary/80 border-b border-primary"
          >
            williamsonuaguluchi94@gmail.com{" "}
          </Link>
          or checkout my resume{" "}
          <Link
            href="/assets/resume.pdf"
            className="text-primary hover:text-primary/80 border-b border-primary"
          >
            RESUME
          </Link>
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="w-12 h-12">
            <Link href={"https://www.linkedin.com/in/williamsonuaguluchi/"}>
              <LinkedinIcon size={6} className="text-primary" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-12 h-12">
            <Link href={"https://github.com/williamsonuaguluchi"}>
              <GithubIcon size={6} className="text-primary" />
            </Link>
          </Button>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
