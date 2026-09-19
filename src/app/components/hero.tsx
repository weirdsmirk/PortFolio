import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE } from "../constants";

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function Word({ children }: { children: ReactNode }) {
  return (
    <motion.span variants={word} className="inline-block whitespace-pre">
      {children}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      tabIndex={-1}
      className="relative z-10 mx-auto flex min-h-[100dvh] w-full flex-col justify-center px-6 py-20 md:px-12"
    >
      <motion.h1
        variants={wordContainer}
        initial="hidden"
        animate="show"
        className="flex w-full max-w-6xl flex-col items-start text-left font-serif text-[clamp(3.5rem,11.5vw,11.5rem)] leading-[0.95] tracking-[-0.02em]"
      >
        <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
          <Word>Ideas</Word> <Word>become</Word>
        </span>
        <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
          <Word>experiences</Word> <Word>when</Word>
        </span>
        <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
          <Word>
            <span className="italic-serif">Armaan</span>
          </Word>{" "}
          <Word>creates</Word>
        </span>
        <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
          <Word>with</Word> <Word>precision</Word> <Word>&amp;</Word>{" "}
          <Word>
            <span className="italic-serif">magic.</span>
          </Word>
        </span>
      </motion.h1>
    </section>
  );
}