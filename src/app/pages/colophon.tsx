import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { EASE } from "../constants";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const stacks = [
  {
    label: "Typography",
    items: ["Instrument Serif", "Inter"],
  },
  {
    label: "Framework",
    items: ["React 18", "React Router", "Vite"],
  },
  {
    label: "Animation",
    items: ["Framer Motion"],
  },
  {
    label: "Styling",
    items: ["Tailwind CSS"],
  },
  {
    label: "Icons",
    items: ["Lucide"],
  },
  {
    label: "Deployed",
    items: ["Vercel"],
  },
];

export default function Colophon() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full px-6 pt-32 pb-24 md:px-12 md:pt-40 md:pb-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto max-w-3xl"
        >
          <motion.div
            variants={fade}
            className="mb-12 flex items-center justify-between border-b border-black/10 pb-6"
          >
            <span className="eyebrow">About this site</span>
            <Link
              to="/"
              className="group flex items-center gap-2 eyebrow transition-colors hover:text-black"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Back
            </Link>
          </motion.div>

          <motion.h1
            variants={fade}
            className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-none tracking-tight"
          >
            Colophon
          </motion.h1>

          <motion.p
            variants={fade}
            className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-neutral-700"
          >
            A record of the tools, type, and infrastructure behind this portfolio.
            Designed and engineered end to end by Armaan.
          </motion.p>

          <motion.div variants={fade} className="mt-16 space-y-12">
            {stacks.map((s) => (
              <div key={s.label} className="border-t border-black/10 pt-8">
                <p className="eyebrow mb-4">{s.label}</p>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {s.items.map((item, i) => (
                    <span key={item}>
                      <span className="font-serif text-2xl italic tracking-tight text-neutral-950 md:text-3xl">
                        {item}
                      </span>
                      {i < s.items.length - 1 && (
                        <span className="ml-2 text-neutral-300">/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}