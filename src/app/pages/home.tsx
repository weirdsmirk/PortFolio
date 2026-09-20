import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Work } from "../components/work";
import { Skills } from "../components/skills";
import { Contact } from "../components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Contact />
    </>
  );
}
