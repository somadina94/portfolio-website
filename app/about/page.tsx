import AboutMe from "@/components/home/about-me";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { container, item } from "@/utils/motion-config";

export const metadata = {
  title: "About | Williams Onuaguluchi",
  description: "About page of Williams Onuaguluchi",
};

export default function About() {
  return (
    <div className="px-2 md:px-12 border-b border-border py-12">
      <AboutMe className="md:pb-0 pb-12 px-0 " />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="flex flex-col md:flex-row justify-between gap-4 py-12"
      >
        <motion.div variants={item} className="flex flex-col gap-4">
          <h2 className="uppercase text-primary">Skills</h2>
          <p className="text-muted-foreground">
            Here are some of the, tools, programming languages and frameworks
            I&apos;ve worked on.
          </p>
        </motion.div>
        <motion.div variants={item} className="grid grid-cols-3 gap-4">
          <Button variant="outline">HTML</Button>
          <Button variant="outline">CSS</Button>
          <Button variant="outline">JavaScript</Button>
          <Button variant="outline">React</Button>
          <Button variant="outline">React Native</Button>
          <Button variant="outline">Expo</Button>
          <Button variant="outline">Shadcn UI</Button>
          <Button variant="outline">Vercel</Button>
          <Button variant="outline">Netlify</Button>
          <Button variant="outline">Heroku</Button>
          <Button variant="outline">Render</Button>
          <Button variant="outline">Github Actions</Button>
          <Button variant="outline">Next.js</Button>
          <Button variant="outline">Tailwind CSS</Button>
          <Button variant="outline">TypeScript</Button>
          <Button variant="outline">Node.js</Button>
          <Button variant="outline">Express</Button>
          <Button variant="outline">MongoDB</Button>
          <Button variant="outline">PostgreSQL</Button>
          <Button variant="outline">Supabase</Button>
          <Button variant="outline">Firebase</Button>
          <Button variant="outline">Git</Button>
          <Button variant="outline">Docker</Button>
          <Button variant="outline">AWS</Button>
          <Button variant="outline">Windows</Button>
          <Button variant="outline">MacOS</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
