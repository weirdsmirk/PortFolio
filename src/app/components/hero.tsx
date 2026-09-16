import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { EASE } from "../constants";
import { MusicPlayer } from "./music-player";

let heroMounted = false;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const line = {
  hidden: { opacity: 0, y: 36, rotate: 1 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [intro, setIntro] = useState(() => {
    const isReturning = heroMounted;
    heroMounted = true;
    return isReturning;
  });

  useEffect(() => {
    if (intro || reduceMotion) {
      setIntro(true);
      return;
    }
    const onIntro = () => setIntro(true);
    window.addEventListener("hero-intro", onIntro);
    const fallback = window.setTimeout(onIntro, 7000);
    return () => {
      window.removeEventListener("hero-intro", onIntro);
      window.clearTimeout(fallback);
    };
  }, [intro, reduceMotion]);

  return (
    <section
      id="top"
      tabIndex={-1}
      className="relative z-10 mx-auto flex min-h-[100dvh] w-full flex-col justify-center px-6 py-20 md:h-[100dvh] md:min-h-0 md:px-12 md:py-16"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={intro ? "show" : "hidden"}
        className="flex w-full max-w-6xl flex-col items-start text-left"
      >
        <h1 className="font-serif text-[clamp(3.5rem,11.5vw,11.5rem)] leading-[0.95] tracking-[-0.02em]">
          <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              Ideas become
            </motion.span>
          </span>
          <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              experiences when
            </motion.span>
          </span>
          <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              <span className="italic-serif">Armaan</span> creates
            </motion.span>
          </span>
          <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              with precision &amp; <span className="italic-serif">magic.</span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <AnimatePresence>{intro && <MusicPlayer key="music-player" />}</AnimatePresence>
    </section>
  );
}