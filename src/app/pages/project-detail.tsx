import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Maximize2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "../data";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ImageLightbox } from "../components/image-lightbox";
import { writeSession } from "../browser";
import { EASE } from "../constants";

export default function ProjectDetail() {
  const { id } = useParams();
  const reduceMotion = useReducedMotion();
  const project = projects.find((p) => p.id === id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const backToHome = () => writeSession("returningFromProject", "true");

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">Not Found</h1>
        <p className="mb-10 text-neutral-500">The project you are looking for does not exist.</p>
        <Link
          to="/"
          onClick={backToHome}
          className="eyebrow group inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-8 text-black transition-all hover:bg-black hover:text-white"
        >
          Return to Work
        </Link>
      </div>
    );
  }

  const isDesign = project.discipline === "Design";
  const engineeringCover = project.cover || project.workCover;
  const lightboxImages = isDesign
    ? project.gallery
    : [
        ...(engineeringCover ? [engineeringCover] : []),
        ...project.gallery.filter((img) => img !== engineeringCover),
      ];

  const handleOpenLightbox = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    setLightboxIndex(index);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: EASE,
        delay: reduceMotion ? 0 : 0.15,
      }}
      className="mx-auto w-full px-6 py-24 md:px-12 md:py-36"
    >
      {/* Top Navigation & Header */}
      <div className="mb-8 md:mb-10">
        <div className="mb-12 flex items-center justify-between border-b border-black/10 pb-6">
          <span className="eyebrow">Case Study</span>
          <Link
            to="/"
            onClick={backToHome}
            className="group flex items-center gap-2 eyebrow transition-colors hover:text-black"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back
          </Link>
        </div>

        <h1 className="italic-serif text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.98] tracking-tight text-neutral-950">
          {project.title}
        </h1>
      </div>

      {/* ========================================================================= */}
      {/* DESIGN PROJECTS: EXACT FILL STYLE IMAGE PLACEMENT, DESCRIPTION BELOW     */}
      {/* ========================================================================= */}
      {isDesign ? (
        <>
          {/* EXACT FILL STYLE IMAGE PLACEMENT (Full bleed filled box grid) */}
          <div className="w-[calc(100%+3rem)] -ml-6 md:w-[calc(100%+6rem)] md:-ml-12 overflow-hidden border-y border-black/10 bg-black/10 mt-0 mb-10 md:mb-12">
            {project.category === "Poster" && (
              <div className="grid grid-cols-2">
                {project.gallery.map((img, i) => {
                  const isLight = i % 2 === 0;

                  return (
                    <div
                      key={i}
                      onClick={() => handleOpenLightbox(i)}
                      className={[
                        "group relative overflow-hidden aspect-[2918/4096] w-full ring-1 ring-inset ring-[#111111]/25 cursor-default md:cursor-zoom-in",
                        isLight ? "bg-[#f5f1ea]" : "bg-[#111111]",
                      ].join(" ")}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${project.title} poster 0${i + 1}`}
                        className={[
                          "h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-[1.02]",
                          isLight ? "contrast-110" : "brightness-[1.06] contrast-125",
                        ].join(" ")}
                        width={1200}
                        height={1700}
                      />
                      <div className="pointer-events-none absolute bottom-3 right-3 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 md:group-hover:opacity-100">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {project.category === "Logo" && (
              <div className="grid grid-cols-2">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => handleOpenLightbox(i)}
                    className="group relative overflow-hidden bg-neutral-950 aspect-square w-full p-8 sm:p-14 flex items-center justify-center cursor-default md:cursor-zoom-in"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} mark 0${i + 1}`}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 md:group-hover:scale-105"
                      width={400}
                      height={400}
                    />
                    <div className="pointer-events-none absolute bottom-3 right-3 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 md:group-hover:opacity-100">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {project.category === "Brand Identity" && (
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => handleOpenLightbox(i)}
                    className="group relative overflow-hidden bg-neutral-950 aspect-[4/3] w-full cursor-default md:cursor-zoom-in"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} asset 0${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-[1.02]"
                      width={1000}
                      height={750}
                    />
                    <div className="pointer-events-none absolute bottom-3 right-3 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 md:group-hover:opacity-100">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Metadata Bar (below the visual) */}
          <div className="mt-2 grid grid-cols-2 gap-6 border-b border-black/10 pb-5 sm:grid-cols-4">
            <div>
              <div className="eyebrow text-neutral-500 mb-1">Role</div>
              <div className="text-sm font-medium text-neutral-900">{project.role}</div>
            </div>
            <div>
              <div className="eyebrow text-neutral-500 mb-1">Timeline</div>
              <div className="text-sm font-medium text-neutral-900">{project.year}</div>
            </div>
            <div>
              <div className="eyebrow text-neutral-500 mb-1">Discipline</div>
              <div className="text-sm font-medium text-neutral-900">{project.discipline}</div>
            </div>
            <div>
              <div className="eyebrow text-neutral-500 mb-1">Deliverables</div>
              <div className="text-sm font-medium text-neutral-900">{project.tools[0]} & More</div>
            </div>
          </div>

          {/* DESCRIPTION BELOW ALL THE IMAGES */}
          <div className="mx-auto max-w-3xl pt-6 pb-12">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-950 leading-snug tracking-tight mb-5">
              {project.description}
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-700 mb-8">
              {project.overview}
            </p>

            <div className="border-t border-black/10 pt-6 mt-8">
              <div className="eyebrow mb-3.5 text-neutral-500 font-mono">CORE CAPABILITIES</div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="eyebrow border border-black/15 px-3 py-1 text-xs text-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ========================================================================= */
        /* ENGINEERING PROJECTS: CASE STUDY & FULL STACK ARCHITECTURE               */
        /* ========================================================================= */
        <>
          {/* Main Hero Showcase */}
          {/* bg-clip-padding keeps the dark backdrop out from under the border so the
              top/bottom hairlines read as a subtle light grey instead of near-black */}
          {/* Frame ratio matches the 16:10 cover art so the screenshot is shown uncropped */}
          <div className="w-[calc(100%+3rem)] -ml-6 md:w-[calc(100%+6rem)] md:-ml-12 overflow-hidden border-y border-black/10 bg-neutral-950 bg-clip-padding aspect-[16/10] mt-0 mb-10 md:mb-12">
            {engineeringCover ? (
              <div
                onClick={() => handleOpenLightbox(0)}
                className="group relative h-full w-full cursor-default md:cursor-zoom-in"
              >
                <ImageWithFallback
                  src={engineeringCover}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-[1.01]"
                  width={1400}
                  height={788}
                />
                <div className="pointer-events-none absolute bottom-4 right-4 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 md:group-hover:opacity-100">
                  <Maximize2 size={14} />
                </div>
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="flex h-full w-full flex-col justify-between bg-neutral-900 p-6 text-white md:p-12"
              >
                <span className="eyebrow text-neutral-400">Project visual</span>
                <span className="font-serif text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-tight">
                  Visual pending.
                </span>
              </div>
            )}
          </div>

          {/* Metadata Bar (below the visual) */}
          <div className="mt-2 grid grid-cols-2 gap-6 border-b border-black/10 pb-5 sm:grid-cols-4">
            <div>
              <div className="eyebrow text-neutral-500 mb-1">Role</div>
              <div className="text-sm font-medium text-neutral-900">{project.role}</div>
            </div>
            <div>
              <div className="eyebrow text-neutral-500 mb-1">Timeline</div>
              <div className="text-sm font-medium text-neutral-900">{project.year}</div>
            </div>
            <div>
              <div className="eyebrow text-neutral-500 mb-1">Discipline</div>
              <div className="text-sm font-medium text-neutral-900">{project.discipline}</div>
            </div>
            <div>
              <div className="eyebrow text-neutral-500 mb-1">Deliverables</div>
              <div className="text-sm font-medium text-neutral-900">{project.tools[0]} & More</div>
            </div>
          </div>

          <div className="mx-auto max-w-3xl pt-6 pb-12">
            <div className="flex items-center justify-between gap-4 mb-5">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow group inline-flex items-center gap-1.5 border-b border-black pb-0.5 text-black transition-opacity hover:opacity-70"
                >
                  View Repository
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                </a>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-950 leading-snug tracking-tight mb-5">
              {project.description}
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-700 mb-8">
              {project.overview}
            </p>

            {/* Key Engineering Features */}
            {project.features && project.features.length > 0 && (
              <div className="border-t border-black/10 pt-6 mt-8">
                <div className="eyebrow mb-4 text-neutral-500 font-mono">KEY SYSTEM HIGHLIGHTS</div>
                <div className="space-y-2.5">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={17} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm sm:text-[15px] text-neutral-800 leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="border-t border-black/10 pt-6 mt-8">
              <div className="eyebrow mb-3.5 text-neutral-500 font-mono">TECHNOLOGY STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="eyebrow border border-black/15 px-3 py-1 text-xs text-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer Navigation */}
      <div className="border-t border-black/10 pt-10 flex justify-between items-center max-w-3xl mx-auto">
        <Link
          to="/"
          onClick={backToHome}
          className="eyebrow group inline-flex items-center gap-2 text-black transition-opacity hover:opacity-70"
        >
          <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all work
        </Link>
        <span className="eyebrow text-neutral-400 font-mono">PORTFOLIO — 2026</span>
      </div>

      {/* Full-screen Image Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxIndex !== null}
        images={lightboxImages}
        currentIndex={lightboxIndex ?? 0}
        title={project.title}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </motion.article>
  );
}
