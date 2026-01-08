import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import williams from "@/assets/williams.jpeg";
import * as motion from "motion/react-client";
import { container, item } from "@/utils/motion-config";

export function Hero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-border pb-12"
    >
      <motion.div variants={item} className="flex flex-col gap-4 w-full">
        <h1>
          Hello, I&apos;m
          <br /> Williams Onuaguluchi
        </h1>
        <p className="text-muted-foreground max-w-md">
          A Software engineer and digital nomad passionate about building
          accessible and user friendly websites and mobile applications.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="#contact-me">Contact</Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://www.linkedin.com/in/williams-onuaguluchi-3aa8b02a1"
              className="text-primary hover:text-primary/80"
              target="_blank"
            >
              <LinkedinIcon />
            </Link>
          </Button>
          <Button asChild variant="outline">
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
      <motion.div
        variants={item}
        className="flex flex-col md:items-end w-full md:w-1/2"
      >
        <Image
          src={williams}
          alt="Hero"
          className="rounded-lg"
          width={400}
          height={600}
        />
      </motion.div>
    </motion.div>
  );
}
