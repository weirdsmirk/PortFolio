import { useState } from "react";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Reveal } from "./reveal";
import { motion } from "motion/react";
import { contactLinks, resumeUrl } from "../data";
import { EASE } from "../constants";
import { Footer } from "./footer";
import { SocialModal } from "./social-modal";

const email = contactLinks.find((c) => c.label === "Email");

const rowContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const rowItem = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

function XIcon({ size = 17, className = "" }: { size?: number | string; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const IconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  X: XIcon,
};

const modalSocials = ["Instagram", "X"];

export function Contact() {
  const [notice, setNotice] = useState<(typeof contactLinks)[number] | null>(null);

  return (
    <>
      <section id="contact" tabIndex={-1} className="bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="mx-auto w-full px-6 pt-12 pb-32 md:px-12 md:pt-16 md:pb-40">
        <Reveal delay={0.05} y={40}>
          <h2 className="mt-10 md:mt-12 font-serif text-[clamp(4rem,12vw,11rem)] leading-[1.02] tracking-tight">
              <span className="inline-block">
                Let&apos;s make
              </span>{" "}
              <span className="italic-serif text-neutral-500">something</span>
              <br className="hidden md:block" />
              <a href={email?.href || "mailto:worksarmaan@gmail.com"} aria-label="Send an email to Armaan" className="group inline-block">
                <span className="contact-underline inline-block">
                  worth reading.
                </span>
                <ArrowRight
                  size="0.45em"
                  strokeWidth={1.5}
                  className="inline-block ml-[0.15em] -rotate-45 text-neutral-500 transition-transform duration-300 group-hover:rotate-0"
                />
              </a>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-center md:gap-8">
          <Reveal delay={0.15} y={24}>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-5 border border-black/20 px-6 py-4 font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] leading-none tracking-tight transition-colors hover:border-black hover:bg-black hover:text-white"
            >
              Check out my résumé
              <ArrowUpRight
                size="0.8em"
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </Reveal>

          <motion.ul
            className="flex flex-wrap gap-4"
            variants={rowContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {contactLinks.filter(c => c.href !== "#").map((c) => {
              const external = !c.href.startsWith("mailto:");
              const Icon = IconMap[c.label as keyof typeof IconMap];
              const modal = modalSocials.includes(c.label);
              return (
                <motion.li key={c.label} variants={rowItem}>
                  {modal ? (
                    <button
                      type="button"
                      onClick={() => setNotice(c)}
                      aria-label={c.label}
                      aria-haspopup="dialog"
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-black/15 text-black transition-all hover:bg-black hover:text-white cursor-pointer"
                    >
                      {Icon && <Icon size={20} />}
                    </button>
                  ) : (
                    <a
                      href={c.href}
                      aria-label={c.label}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-black/15 text-black transition-all hover:bg-black hover:text-white"
                    >
                      {Icon && <Icon size={20} />}
                    </a>
                  )}
                </motion.li>
              );
            })}
</motion.ul>
        </div>
      </div>

      <Footer />
      </section>

      <SocialModal
        isOpen={notice !== null}
        label={notice?.label ?? ""}
        onClose={() => setNotice(null)}
      />
    </>
  );
}
