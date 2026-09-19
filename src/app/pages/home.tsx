import { Hero } from "../components/hero";
import { Marquee } from "../components/marquee";
import { About } from "../components/about";
import { Work } from "../components/work";
import { Skills } from "../components/skills";
import { Contact } from "../components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Skills />
      <Contact />
    </>
  );
}
