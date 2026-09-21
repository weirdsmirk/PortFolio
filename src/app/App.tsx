import { useLayoutEffect, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import { LayoutGroup } from "motion/react";
import { Nav } from "./components/nav";
import { ErrorBoundary } from "./components/error-boundary";
import { PageLoader } from "./components/page-loader";
import { readSession, removeSession, writeSession } from "./browser";
import { scrollToHashTarget, scrollToPositionWithRetry } from "./scroll";
import Home from "./pages/home";
import ProjectDetail from "./pages/project-detail";
import NotFound from "./pages/not-found";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Colophon from "./pages/colophon";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);
  const isRestoring = useRef(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    let frame: number | undefined;
    const onScroll = () => {
      if (isRestoring.current || window.scrollY <= 50 || frame) return;

      frame = window.requestAnimationFrame(() => {
        writeSession("homeScrollPos", String(window.scrollY));
        frame = undefined;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    let timer: number | undefined;
    const scrollTo = (top: number) => window.scrollTo(0, top);

    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathname.current = pathname;
      if (pathname === "/") {
        scrollTo(0);
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
      return;
    }

    if (pathname.startsWith("/project/")) {
      scrollTo(0);
    } else if (pathname === "/") {
      if (hash) {
        const targetId = hash.slice(1);
        // Delay past the mobile-menu collapse (~350ms) and the
        // return-from-project loader (~890ms) so the scroll isn't fired
        // while `body { overflow: hidden }` is still in effect.
        const delay =
          prevPathname.current.startsWith("/project/") ||
          document.body.style.overflow === "hidden"
            ? 450
            : 120;
        timer = window.setTimeout(() => {
          scrollToHashTarget(targetId);
        }, delay);
      } else if (prevPathname.current.startsWith("/project/")) {
        isRestoring.current = true;
        writeSession("returningFromProject", "true");
        const position = Number.parseInt(readSession("homeScrollPos") ?? "", 10);

        if (Number.isFinite(position) && position > 0) {
          scrollToPositionWithRetry(position);
        } else {
          scrollTo(0);
        }

        timer = window.setTimeout(() => {
          if (Number.isFinite(position) && position > 0) {
            if (Math.abs(window.scrollY - position) > 48) scrollTo(position);
          }
          isRestoring.current = false;
          removeSession("returningFromProject");
        }, 1200);
      } else {
        scrollTo(0);
      }
    } else {
      scrollTo(0);
    }

    prevPathname.current = pathname;
    return () => {
      if (timer) window.clearTimeout(timer);
      isRestoring.current = false;
    };
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <LayoutGroup id="portfolio-layout">
      <ErrorBoundary>
        <div className="flex min-h-screen w-full flex-col bg-white text-neutral-950 transition-colors duration-300">
          <PageLoader />
          <ScrollToTop />
          <Nav />
          <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/colophon" element={<Colophon />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </LayoutGroup>
  );
}
