import { useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { EASE } from "../constants";

interface ImageLightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  title?: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 36 : dir < 0 ? -36 : 0,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -36 : dir < 0 ? 36 : 0,
    scale: 0.98,
  }),
};

export function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  title,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [direction, setDirection] = useState<number>(0);
  const hasMultiple = images.length > 1;
  const currentImage = images[currentIndex] || "";

  const handlePrev = useCallback(() => {
    if (!hasMultiple) return;
    setDirection(-1);
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, hasMultiple, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (!hasMultiple) return;
    setDirection(1);
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, hasMultiple, images.length, onNavigate]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Auto-close on small screens / mobile resize
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (window.innerWidth < 768) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[100] hidden md:flex items-center justify-center bg-black/94 backdrop-blur-md p-2 sm:p-4 select-none cursor-zoom-out"
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview"
        >
          {/* Top Bar Header */}
          <div className="fixed top-0 inset-x-0 z-[110] flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6 pointer-events-none">
            {/* Title & Counter */}
            <div className="pointer-events-auto flex items-center gap-3 font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {title && (
                <span className="text-white font-medium text-base sm:text-lg tracking-tight">
                  {title}
                </span>
              )}
              {title && hasMultiple && (
                <span className="text-neutral-400 text-sm font-normal">•</span>
              )}
              {hasMultiple && (
                <span className="text-neutral-300 font-normal text-xs sm:text-sm tracking-[0.15em] uppercase">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="pointer-events-auto relative flex items-center gap-2 eyebrow !text-white transition-colors hover:text-neutral-400 cursor-pointer"
              aria-label="Close preview"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Close
            </button>
          </div>

          {/* Previous Arrow Button */}
          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="fixed left-4 sm:left-7 top-1/2 -translate-y-1/2 z-[110] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white active:scale-95 cursor-pointer shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
          )}

          {/* Main Image Container (Enlarged viewport capacity) */}
          <motion.div
            key={currentImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94vh] max-w-[96vw] items-center justify-center cursor-default"
          >
            <ImageWithFallback
              src={currentImage}
              alt={title || "Full screen preview"}
              className="max-h-[91vh] max-w-[94vw] object-contain rounded shadow-2xl drop-shadow-2xl"
            />
          </motion.div>

          {/* Next Arrow Button */}
          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-[110] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white active:scale-95 cursor-pointer shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          )}

          {/* Bottom Keyboard Hint */}
          <div className="fixed bottom-5 inset-x-0 z-[110] pointer-events-none flex justify-center">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-300 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {hasMultiple ? "Use ← / → arrow keys to navigate • ESC to exit" : "ESC or click anywhere to exit"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
