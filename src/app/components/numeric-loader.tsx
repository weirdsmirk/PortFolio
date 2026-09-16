import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { projects } from "../data";
import { EASE, EASE_IN_OUT } from "../constants";

// Helper to collect images based on route
export function getImagesForRoute(pathname: string): string[] {
  if (pathname.startsWith("/project/")) {
    const id = pathname.replace("/project/", "");
    const project = projects.find((p) => p.id === id);
    if (project) {
      return Array.from(new Set([project.cover, ...project.gallery].filter((src): src is string => Boolean(src))));
    }
  }
  // Default to project covers on home
  return projects.map((p) => p.cover).filter((src): src is string => Boolean(src));
}

interface NumericLoaderProps {
  pathname: string;
}

export function NumericLoader({ pathname }: NumericLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [isInitial, setIsInitial] = useState(() => !pathname.startsWith("/project/"));
  const [pageProgress, setPageProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const isFirstMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (!loading) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [loading]);

  // Layout effect so the loader mounts before the newly navigated page paints
  useLayoutEffect(() => {
    let rafId = 0;
    let timer: number | undefined;

    // Initial app launch: big bottom-left numeric loader counting to 100
    const startInitialLoading = () => {
      setLoading(true);
      setCount(0);

      const DURATION = reduceMotion ? 0 : 850;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / DURATION);
        const nextCount = Math.min(100, Math.floor(progress * 100));
        setCount(nextCount);

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setCount(100);
          timer = window.setTimeout(() => {
            window.dispatchEvent(new CustomEvent("hero-intro"));
            setLoading(false);
          }, 70);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    // Opening a project page: centered text and progress bar
    const startPageLoading = (currentPath: string) => {
      setLoading(true);
      setPageProgress(0);

      const images = getImagesForRoute(currentPath);
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });

      const FIXED_DURATION = reduceMotion ? 0 : 1100;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progressRatio = Math.min(1, elapsed / FIXED_DURATION);
        const currentPercent = Math.min(100, Math.floor(progressRatio * 100));
        setPageProgress(currentPercent);

        if (elapsed < FIXED_DURATION) {
          rafId = requestAnimationFrame(tick);
        } else {
          setPageProgress(100);
          timer = window.setTimeout(() => {
            setLoading(false);
          }, 100);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevPathname.current = pathname;
      if (pathname.startsWith("/project/")) {
        setIsInitial(false);
        startPageLoading(pathname);
      } else {
        setIsInitial(true);
        startInitialLoading();
      }
    } else if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setIsInitial(false);
      startPageLoading(pathname);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (timer) window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, reduceMotion]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key={isInitial ? "initial-loader" : "page-loader"}
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            isInitial
              ? {
                  y: "-100%",
                  transition: {
                    duration: reduceMotion ? 0 : 0.55,
                    ease: EASE_IN_OUT,
                  },
                }
              : {
                  opacity: 0,
                  scale: 0.98,
                  transition: {
                    duration: reduceMotion ? 0 : 0.4,
                    ease: EASE,
                  },
                }
          }
          role="status"
          aria-label={isInitial ? "Loading portfolio" : "Loading project"}
          className="fixed inset-0 z-[99999] select-none bg-white text-neutral-950"
        >
          {isInitial ? (
            /* 1. Initial app start: Big bottom-left numeric loader */
            <div className="flex h-full w-full flex-col justify-end p-8 sm:p-14 md:p-20">
              <div className="font-mono text-[clamp(6rem,20vw,15rem)] font-medium leading-none tracking-tighter tabular-nums text-neutral-950">
                {count < 10 ? `0${count}` : count}
              </div>
            </div>
          ) : (
            /* 2. Opening a project page: Centered fancy text and loading bar */
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <div className="flex flex-col items-center gap-5 w-full max-w-md">
                <p className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] leading-snug tracking-tight text-neutral-950">
                  Good design takes a <span className="italic-serif italic">moment</span>.
                </p>

                {/* Loading bar */}
                <div className="h-[2px] w-full max-w-xs bg-black/10 overflow-hidden relative">
                  <div
                    className="h-full w-full bg-neutral-950 origin-left transition-transform duration-100 ease-out"
                    style={{ transform: `scaleX(${pageProgress / 100})` }}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}