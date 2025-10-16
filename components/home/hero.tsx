import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import williams from "@/assets/williams.jpg";

export function Hero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-border pb-12">
      <div className="flex flex-col gap-4">
        <h1>
          Hello, I&apos;m
          <br /> Williams Onuaguluchi
        </h1>
        <p className="text-muted-foreground max-w-md">
          An African based software engineer passionate about building
          accessible and user friendly websites and mobile applications.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="#contact-me">Contact</Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://www.linkedin.com/in/somadina-onuaguluchi-3aa8b02a1/"
              className="text-primary hover:text-primary/80"
            >
              <LinkedinIcon />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://github.com/somadina94"
              className="text-primary hover:text-primary/80"
            >
              <GithubIcon />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:items-end w-full md:w-1/2">
        <Image
          src={williams}
          alt="Hero"
          className="rounded-lg"
          width={400}
          height={600}
        />
      </div>
    </div>
  );
}
