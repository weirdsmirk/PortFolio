import { motion } from "motion/react";
import { Reveal, StaggerGroup, itemVariants } from "./reveal";
const facts = [
  { k: "Study", v: "B.Tech, Computer Science — Bennett University" },
  { k: "Focus", v: "Cybersecurity" },
  { k: "Year", v: "Second Year" },
  { k: "Interests", v: "Building Things, Design, Cybersecurity" },
];

export function About() {
  return (
    <section id="about" tabIndex={-1} className="scroll-mt-16 md:scroll-mt-20">
      <div className="mx-auto w-full px-6 py-24 md:px-12 md:py-32">
        {/* Top row: marker + note left, big display right */}
        <div className="border-b border-white/10 pb-12 md:pb-16">
          <Reveal delay={0.1}>
            <h2 className="text-right font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-tight">
              About.
            </h2>
          </Reveal>
        </div>

        {/* Large statement */}
        <Reveal
          as="span"
          className="mt-10 block font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-tight md:mt-14"
          y={40}
        >
          <span>
            Hi, I am <span className="italic-serif">Armaan Verma.</span>
          </span>
        </Reveal>

        {/* Supporting copy + facts */}
        <div className="mt-8 grid gap-12 md:mt-10 md:grid-cols-12 md:gap-14">
          <Reveal className="max-w-none md:col-span-7">
            <div className="space-y-5 text-[18px] leading-relaxed text-neutral-300 md:text-[20px]">
              <p>
                I&apos;m a second-year Computer Science student at Bennett
                University, specialising in cybersecurity. I work across
                software development and graphic/UI design, and I enjoy being
                able to build something as well as think about how it looks and
                feels.
              </p>
              <p>
                Outside of college, I work on my own projects and take on
                freelance design and development work. I&apos;m still learning
                and experimenting with different things, but I like making
                things that are useful, simple, and well thought out.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-4 md:col-start-9">
            <StaggerGroup
              as="div"
              className="divide-y divide-white/10 border-y border-white/10"
            >
              {facts.map((f) => (
                <motion.div key={f.k} variants={itemVariants} className="py-5">
                  <div className="eyebrow mb-2">{f.k}</div>
                  <div className="text-[15px] leading-snug text-neutral-200">
                    {f.v}
                  </div>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
