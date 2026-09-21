import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";

import { EASE } from "../constants";
import { scrollToHashTarget, scrollToTopSmooth } from "../scroll";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isNavigating = useRef(false);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();

  // --- hide/show on scroll with debounce ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    const diff = latest - prev;

    if (isNavigating.current) {
      lastScrollY.current = latest;
      return;
    }

    if (latest <= 80) {
      if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
      setHidden(false);
    } else if (diff > 20) {
      // scrolling down — hide after a short cooldown to avoid flicker
      if (!hideTimer.current) {
        hideTimer.current = setTimeout(() => {
          setHidden(true);
          hideTimer.current = null;
        }, 100);
      }
    } else if (diff < -12) {
      // scrolling up — show immediately
      if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
      setHidden(false);
    }

    lastScrollY.current = latest;
  });

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, []);

  // --- close mobile menu on route change ---
  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname, location.hash]);

  // --- lock body scroll when mobile menu is open ---
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleNavClick = useCallback(
    (href: string, e: React.MouseEvent) => {
      setOpen(false);
      document.body.style.overflow = "";

      // Ensure navbar stays visible during programmatic navigation
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      setHidden(false);
      isNavigating.current = true;
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(() => {
        isNavigating.current = false;
        lastScrollY.current = window.scrollY;
      }, 800);

      if (href === "/" || href === "") {
        e.preventDefault();
        if (location.pathname !== "/") {
          // Back to home top — let the router change location so the back
          // button, ScrollToTop and the route-close effect stay in sync.
          navigate("/");
        }
        scrollToTopSmooth();
        return;
      }

      if (href.startsWith("/#")) {
        e.preventDefault();
        const targetId = href.slice(2);
        if (location.pathname !== "/") {
          // Cross-page section link (e.g. from a case study): navigate home
          // first; ScrollToTop performs the actual scroll once home mounts.
          navigate(href);
          return;
        }
        // Same-page anchor: ScrollToTop doesn't re-run on hash changes
        // triggered via pushState, so scroll directly. scrollToHashTarget
        // waits for the mobile menu's scroll-lock to release before
        // scrolling, which fixes section links on phones.
        scrollToHashTarget(targetId);
        navigate(href);
      }
    },
    [location.pathname, navigate],
  );

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{
        y: hidden && !open ? -80 : 0,
        opacity: 1,
      }}
      transition={{
        duration: hidden && !open ? 0.25 : 0.45,
        ease: EASE,
      }}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white"
    >
      <nav aria-label="Main navigation" className="relative mx-auto flex w-full items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            onClick={(e) => handleNavClick("/", e)}
            className="eyebrow text-[10px] transition-opacity hover:opacity-70"
          >
            PORTFOLIO — 2026
          </Link>
        </div>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={(e) => handleNavClick(l.href, e)}
                className="eyebrow group relative text-[10px] transition-colors hover:text-black"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="flex items-center justify-center"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            id="mobile-navigation"
            className="overflow-hidden border-t border-black/10 md:hidden"
          >
            <motion.ul
              className="flex flex-col px-6 py-4"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: {
                    delayChildren: 0.1,
                    staggerChildren: 0.07,
                  },
                },
              }}
            >
              {links.map((l) => (
                  <motion.li
                    key={l.href}
                    variants={{
                      hidden: { opacity: 0, x: -14 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Link
                      to={l.href}
                      onClick={(e) => handleNavClick(l.href, e)}
                      className="flex items-center justify-between border-b border-black/5 py-4 font-serif text-[28px] leading-none tracking-tight"
                    >
                      {l.label}
                      <span className="eyebrow">→</span>
                    </Link>
                  </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
