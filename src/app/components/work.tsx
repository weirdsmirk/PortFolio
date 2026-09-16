import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Reveal } from "./reveal";
import { projects, type Project } from "../data";
import { readSession, writeSession } from "../browser";
import { EASE } from "../constants";

const gridContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

function WorkCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative aspect-square w-full overflow-hidden border-t border-[#2a2a2a] first:border-t-0 sm:border-t-0 sm:border-b sm:border-b-[#2a2a2a] sm:first:border-b-[#2a2a2a]"
    >
      <Link
        to={project.caseStudy}
        onClick={() => {
          writeSession("homeScrollPos", String(window.scrollY));
          writeSession("returningFromProject", "true");
        }}
        aria-label={`View project ${project.title}`}
        className="group relative flex h-full w-full bg-[#171717] p-6 text-white transition-colors duration-300 hover:bg-[#0f0f0f] sm:p-8"
      >
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex w-fit items-center text-[11px] uppercase tracking-[0.2em] text-neutral-400 transition-colors duration-300 group-hover:text-[var(--selection-foreground)]">
              View project
            </span>

            <span className="text-neutral-500 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="eyebrow text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              {project.category}
            </span>
            <h3 className="font-serif text-3xl leading-none tracking-tight text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 sm:text-4xl lg:text-[40px]">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Work() {
  const isReturning = readSession("returningFromProject") === "true";

  return (
    <section id="work" tabIndex={-1} className="w-full py-24 md:py-32 scroll-mt-16 md:scroll-mt-20">
      {/* Header Row */}
      <div className="mx-auto w-full px-6 md:px-12 mb-12">
        <Reveal as="div" delay={0.1}>
          <h2 className="text-right font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-tight">
            Work.
          </h2>
        </Reveal>
      </div>

      {/* 6 Filled Box Cards Grid (Edge-to-edge perfect squares) */}
      <div className="w-full overflow-hidden border-y border-[#2a2a2a]">
        <motion.div
          variants={gridContainerVariants}
          initial={isReturning ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:[&>*:nth-child(odd)]:border-r sm:[&>*:nth-child(odd)]:border-r-[#2a2a2a] lg:[&>*:nth-child(3n+1)]:border-r lg:[&>*:nth-child(3n+2)]:border-r lg:[&>*:nth-child(3n+3)]:border-r-0"
        >
          {projects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
