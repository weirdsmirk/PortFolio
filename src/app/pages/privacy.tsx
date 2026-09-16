import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { EASE } from "../constants";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Privacy() {
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
            <span className="eyebrow">Legal</span>
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
            Privacy Policy
          </motion.h1>

          <motion.p variants={fade} className="eyebrow mb-12 mt-4 text-neutral-400">
            Last updated September 2026
          </motion.p>

          <motion.div variants={fade} className="space-y-8 font-sans text-base leading-relaxed text-neutral-700">
            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-950">Information Collected</h2>
              <p>
                This portfolio does not collect personal information directly. No account creation,
                contact forms, or data submission is required to browse the site. If you reach out
                via email or a linked social platform, your information is handled by that respective
                service&apos;s privacy policy.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-950">Cookies &amp; Local Storage</h2>
              <p>
                This site uses browser localStorage solely for session recall — for example,
                remembering a scroll position when returning from a project page or detecting
                whether the intro animation has already played. No tracking cookies, advertising
                scripts, or analytics services are used.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-950">Audio Playback</h2>
              <p>
                The optional music player on the homepage loads and plays an audio file locally.
                Playback is entirely user-initiated and generates no network requests beyond the
                initial file load. No listening data is recorded or transmitted.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-950">External Links</h2>
              <p>
                External links to platforms such as GitHub, LinkedIn, Instagram, and third-party
                tool websites are not operated by Armaan. Each platform has its own privacy policy
                governing the use of your data on those services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-serif text-2xl tracking-tight text-neutral-950">Changes</h2>
              <p>
                This policy may be updated from time to time. Any changes will be reflected on this
                page with a revised date. Continued use of the site after updates constitutes
                acceptance of the revised policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}