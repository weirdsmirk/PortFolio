import { Link } from "react-router";
import { ArrowUp } from "lucide-react";

const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Colophon", href: "/colophon" },
];

export function Footer() {
  const scrollTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <footer>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-12">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">
              &copy; {new Date().getFullYear()} Armaan — All rights reserved
            </span>
            <span className="text-[13px] text-neutral-500">
              Designed &amp; built end to end.
            </span>
          </div>

          <div className="flex items-center gap-8">
            <span className="hidden h-4 w-px bg-white/20 md:block" />

            <nav className="flex items-center gap-6">
              {legalLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="eyebrow transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <span className="hidden h-4 w-px bg-white/20 md:block" />

            <button
              type="button"
              onClick={scrollTop}
              className="group flex items-center gap-2 eyebrow transition-colors hover:text-white"
            >
              Back to top
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:bg-white group-hover:text-black">
                <ArrowUp
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}