import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { contactLinks } from "../data";
import { EASE } from "../constants";

const email = contactLinks.find((c) => c.label === "Email");

interface SocialModalProps {
  isOpen: boolean;
  label: string;
  onClose: () => void;
}

export function SocialModal({ isOpen, label, onClose }: SocialModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={`${label}-backdrop`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} notice`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md border border-black/10 bg-white px-8 py-10 md:px-10"
          >
            <h3 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Not really my space.{" "}
              <span className="italic-serif text-neutral-500">Focusing on the work instead.</span>
            </h3>

            <p className="mt-6 text-[15px] leading-relaxed text-neutral-600">
              I&apos;ve stepped back from the feed to pour everything into what I build. Email is
              the surest way to reach me — I read and reply to everything.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-3 rounded-full border border-black/15 px-6 py-3 font-sans text-sm tracking-tight transition-all duration-300 hover:border-black hover:bg-black hover:text-white active:scale-95 cursor-pointer"
              >
                Fair enough
              </button>
              <a
                href={email?.href || "mailto:worksarmaan@gmail.com"}
                onClick={onClose}
                className="group inline-flex items-center gap-2 text-sm tracking-tight text-neutral-500 transition-colors hover:text-black"
              >
                worksarmaan@gmail.com
                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}