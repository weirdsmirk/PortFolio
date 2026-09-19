import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { EASE } from "../constants";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Terms() {
  return (
    <section className="">
      <div className="mx-auto w-full px-6 pt-32 pb-24 md:px-12 md:pt-40 md:pb-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto max-w-3xl"
        >
          <motion.div
            variants={fade}
            className="mb-12 flex items-center justify-between border-b border-white/10 pb-6"
          >
            <span className="eyebrow">Legal</span>
            <Link
              to="/"
              className="group flex items-center gap-2 eyebrow transition-colors hover:text-white"
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
            Terms of Use
          </motion.h1>

          <motion.p variants={fade} className="eyebrow mb-12 mt-4 text-neutral-400">
            Last updated September 2026
          </motion.p>

          <motion.div variants={fade} className="space-y-8 font-sans text-base leading-relaxed text-neutral-300">
            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-50">Overview</h2>
              <p>
                This portfolio is operated by Armaan. By accessing or using this site, you agree to be
                bound by these terms. If you do not agree, please discontinue use.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-50">Intellectual Property</h2>
              <p>
                All designs, code, branding, and content displayed on this site are the intellectual
                property of Armaan unless otherwise noted. You may not reproduce, distribute, or
                create derivative works without prior written consent.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-50">External Links</h2>
              <p>
                This site contains links to third-party platforms such as GitHub, LinkedIn, and
                external tool websites. Armaan is not responsible for the content or privacy
                practices of those third-party services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-50">Project Work</h2>
              <p>
                Case studies and project details are shared for informational and portfolio purposes
                only. Specific client or employer details may be abstracted or omitted for
                confidentiality.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-50">Limitation of Liability</h2>
              <p>
                This site is provided on an &quot;as is&quot; basis. Armaan makes no warranties regarding
                accuracy, availability, or fitness for a particular purpose. Use of this site is at
                your own discretion.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}