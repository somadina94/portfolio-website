import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import ContactForm from "./contact-form";
import { container, item } from "@/utils/motion-config";
import * as motion from "motion/react-client";

export default function Contact() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col  md:flex-row border-b border-border py-10 gap-10"
      id="contact-me"
    >
      <motion.div variants={item} className="space-y-12 w-full">
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
          or checkout my{" "}
          <Link
            href="/resume.pdf"
            className="text-primary hover:text-primary/80 border-b border-primary"
          >
            resume
          </Link>
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="w-12 h-12">
            <Link
              href="https://www.linkedin.com/in/williams-onuaguluchi-3aa8b02a1"
              className="text-primary hover:text-primary/80"
              target="_blank"
            >
              <LinkedinIcon />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-12 h-12">
            <Link
              href="https://github.com/somadina94"
              className="text-primary hover:text-primary/80"
              target="_blank"
            >
              <GithubIcon />
            </Link>
          </Button>
        </div>
      </motion.div>
      <motion.div variants={item} className="w-full flex flex-row justify-end">
        <ContactForm />
      </motion.div>
    </motion.div>
  );
}
