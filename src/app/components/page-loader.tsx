import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { projects, type Project } from "../data";
import { EASE } from "../constants";

export const PAGE_READY_EVENT = "case-study-ready";

type Direction = "opening" | "closing";

interface ActiveTransition {
  key: string;
  direction: Direction;
  project: Project | null;
}

function projectImages(project: Project | null): string[] {
  if (!project) return [];
  const raw = [project.cover, project.workCover, ...project.gallery].filter(
    (src): src is string => typeof src === "string" && src.length > 0,
  );
  const normalized = raw.map((src) => {
    try {
      return decodeURI(src);
    } catch {
      return src;
    }
  });
  return Array.from(new Set(normalized));
}

function homeImages(): string[] {
  const all = projects.flatMap((p) => [p.cover, p.workCover]);
  const filtered = all.filter(
    (src): src is string => typeof src === "string" && src.length > 0,
  );
  const normalized = filtered.map((src) => {
    try {
      return decodeURI(src);
    } catch {
      return src;
    }
  });
  return Array.from(new Set(normalized));
}

function findProject(pathname: string): Project | null {
  if (!pathname.startsWith("/project/")) return null;
  const id = pathname.replace("/project/", "").split("/")[0];
  return projects.find((p) => p.id === id) ?? null;
}

function preloadImages(
  sources: string[],
  onProgress: (loaded: number, total: number) => void,
): Promise<void> {
  if (sources.length === 0) {
    onProgress(0, 0);
    return Promise.resolve();
  }
  let settled = 0;
  const total = sources.length;
  onProgress(0, total);
  const tasks = sources.map(
    (src) =>
      new Promise<void>((resolve) => {
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          settled += 1;
          onProgress(settled, total);
          resolve();
        };
        try {
          const img = new Image();
          img.onload = () => {
            const withDecode = img as HTMLImageElement & {
              decode?: () => Promise<void>;
            };
            if (typeof withDecode.decode === "function") {
              try {
                const result = withDecode.decode.call(img);
                if (result && typeof result.then === "function") {
                  result.then(finish, finish);
                  return;
                }
              } catch {
                // fall through
              }
            }
            finish();
          };
          img.onerror = finish;
          img.src = src;
          if (img.complete && img.naturalWidth !== 0) finish();
          else if (img.complete) window.setTimeout(finish, 0);
        } catch {
          finish();
        }
      }),
  );
  return Promise.allSettled(tasks).then(() => undefined);
}

export function PageLoader() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<ActiveTransition | null>(() =>
    pathname.startsWith("/project/")
      ? { key: `init:${pathname}`, direction: "opening", project: findProject(pathname) }
      : null,
  );
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [minElapsed, setMinElapsed] = useState(false);
  const prevPathname = useRef(pathname);
  const runId = useRef(0);
  const isFirstMount = useRef(true);
  const dismiss = useCallback((key: string, donePath: string) => {
    setActive((cur) => (cur && cur.key === key ? null : cur));
    try {
      window.dispatchEvent(
        new CustomEvent(PAGE_READY_EVENT, { detail: { pathname: donePath } }),
      );
    } catch { /* advisory */ }
  }, []);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevPathname.current = pathname;
      return;
    }
    const prev = prevPathname.current;
    if (prev === pathname) return;
    prevPathname.current = pathname;
    const nextIsProject = pathname.startsWith("/project/");
    const prevIsProject = prev.startsWith("/project/");
    if (nextIsProject) {
      setActive({
        key: `open:${pathname}:${Date.now()}`,
        direction: "opening",
        project: findProject(pathname),
      });
    } else if (!nextIsProject && prevIsProject) {
      setActive({
        key: `close:${pathname}:${Date.now()}`,
        direction: "closing",
        project: findProject(prev),
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (!active) return;
    const id = ++runId.current;
    const key = active.key;
    const donePath = pathname;
    const sources =
      active.direction === "opening"
        ? projectImages(active.project)
        : homeImages();
    setLoaded(0);
    setTotal(sources.length);
    setMinElapsed(false);
    const MIN = reduceMotion === true ? 0 : active.direction === "opening" ? 1100 : 750;
    const MAX = active.direction === "opening" ? 4500 : 3000;
    let finished = false;
    let minTimer: number | undefined;
    let maxTimer: number | undefined;
    const finish = () => {
      if (finished || runId.current !== id) return;
      finished = true;
      if (minTimer) window.clearTimeout(minTimer);
      if (maxTimer) window.clearTimeout(maxTimer);
      window.setTimeout(() => {
        if (runId.current !== id) return;
        dismiss(key, donePath);
      }, reduceMotion ? 0 : 140);
    };
    let minDone = MIN === 0;
    let assetsDone = sources.length === 0;
    const maybeFinish = () => {
      if (minDone && assetsDone) finish();
    };
    if (MIN === 0) setMinElapsed(true);
    else {
      minTimer = window.setTimeout(() => {
        if (runId.current !== id) return;
        setMinElapsed(true);
        minDone = true;
        maybeFinish();
      }, MIN);
    }
    maxTimer = window.setTimeout(finish, MAX);
    preloadImages(sources, (done, count) => {
      if (runId.current !== id || finished) return;
      setLoaded(done);
      setTotal(count);
      if (done >= count) {
        assetsDone = true;
        maybeFinish();
      }
    }).then(() => {
      if (runId.current !== id || finished) return;
      assetsDone = true;
      setLoaded(sources.length);
      setTotal(sources.length);
      maybeFinish();
    });
    try {
      const fonts = (
        document as Document & { fonts?: { ready: Promise<unknown> } }
      ).fonts;
      void fonts?.ready.catch(() => undefined);
    } catch { /* ignore */ }
    return () => {
      finished = true;
      if (minTimer) window.clearTimeout(minTimer);
      if (maxTimer) window.clearTimeout(maxTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.key, reduceMotion]);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  const progress = total > 0 ? Math.min(1, loaded / total) : minElapsed ? 1 : 0;
  const percent = Math.round(progress * 100);
  const opening = active?.direction === "opening";

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.key}
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.985,
            transition: { duration: reduceMotion ? 0 : 0.4, ease: EASE },
          }}
          role="status"
          aria-live="polite"
          aria-label={opening ? "Loading case study" : "Returning to work"}
          className="fixed inset-0 z-[99999] flex h-full w-full select-none flex-col items-center justify-center bg-white p-6 text-center text-neutral-950"
        >
          <div className="flex w-full max-w-md flex-col items-center gap-5">
            <p className="font-serif text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.05] tracking-tight">
              Good design takes{" "}
              <span className="italic-serif italic">time.</span>
            </p>
            <div
              className="relative h-[2px] w-full max-w-xs overflow-hidden bg-black/10"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              aria-label="Loading progress"
            >
              <div
                className="h-full w-full origin-left bg-neutral-950"
                style={{
                  transform: `scaleX(${progress})`,
                  transition: reduceMotion ? undefined : "transform 180ms ease-out",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


