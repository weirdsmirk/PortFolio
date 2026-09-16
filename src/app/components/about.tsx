import { motion } from "motion/react";
import { Reveal, StaggerGroup, itemVariants } from "./reveal";
const facts = [
  { k: "Study", v: "B.Tech, Computer Science — Bennett University" },
  { k: "Focus", v: "Cybersecurity" },
  { k: "Year", v: "Second Year" },
  { k: "Interests", v: "Freelance Design, Freelance Developer, Entrepreneurship" },
];

export function About() {
  return (
    <section id="about" tabIndex={-1} className="bg-white scroll-mt-16 md:scroll-mt-20">
      <div className="mx-auto w-full px-6 py-24 md:px-12 md:py-32">
        {/* Top row: marker + note left, big display right */}
        <div className="border-b border-black/10 pb-12 md:pb-16">
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
            <div className="space-y-5 text-[18px] leading-relaxed text-neutral-700 md:text-[20px]">
              <p>
                I&apos;m a second-year Computer Science student at Bennett
                University, specialising in cybersecurity. Code shapes
                what&apos;s possible; design decides what&apos;s worth doing at
                all. Neither discipline is secondary to the other.
              </p>
              <p>
                I&apos;m interested in entrepreneurship, and I&apos;m building toward
                launching products of my own while working as a freelance
                designer and freelance developer. I&apos;d rather make fewer things
                and make them clearly.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-4 md:col-start-9">
            <StaggerGroup
              as="div"
              className="divide-y divide-black/10 border-y border-black/10"
            >
              {facts.map((f) => (
                <motion.div key={f.k} variants={itemVariants} className="py-5">
                  <div className="eyebrow mb-2">{f.k}</div>
                  <div className="text-[15px] leading-snug text-neutral-800">
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
