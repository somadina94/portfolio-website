import Contact from "@/components/general/contact";
import AboutMe from "@/components/home/about-me";
import Featured from "@/components/home/featured";
import { Hero } from "@/components/home/hero";

export const metadata = {
  title: "Williams Onuaguluchi",
  description: "Williams Onuaguluchi's portfolio home page",
};

export default function Home() {
  return (
    <div className="px-2 md:px-12">
      <Hero />
      <Featured />
      <AboutMe />
      <Contact />
    </div>
  );
}
