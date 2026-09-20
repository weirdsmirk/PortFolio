import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./reveal";
import { skillGroups } from "../data";
import { EASE } from "../constants";

const CENTER = { x: 420, y: 420 };
const R = 210;
const maxLevel = Math.max(...skillGroups.flatMap((g) => g.items.map((i) => i.level)));

function spokePoint(k: number, n: number, radius: number, center = CENTER) {
  const rad = ((k * 360) / n - 90) * (Math.PI / 180);
  return {
    x: center.x + Math.cos(rad) * radius,
    y: center.y + Math.sin(rad) * radius,
  };
}

function polygonPath(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ") + " Z";
}

function SkillRadar({ items }: { items: { label: string; href: string; level: number }[] }) {
  const n = items.length;
  const rings = [0.25, 0.5, 0.75, 1];

  const tips = items.map((it, k) =>
    spokePoint(k, n, (it.level / maxLevel) * R),
  );
  const outer = Array.from({ length: n }, (_, k) => spokePoint(k, n, R));
  const labelRad = R + 42;

  return (
    <svg
      aria-hidden
      viewBox="0 0 840 840"
      className="mx-auto h-auto w-full max-w-[600px] overflow-visible"
    >
      {rings.map((f) => (
        <circle
          key={f}
          cx={CENTER.x}
          cy={CENTER.y}
          r={R * f}
          fill="none"
          stroke="rgba(10,10,10,0.1)"
          strokeWidth={1}
        />
      ))}

      <path d={polygonPath(outer)} fill="none" stroke="rgba(10,10,10,0.08)" strokeWidth={1} strokeDasharray="3 6" />

      {outer.map((p, k) => (
        <line
          key={k}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={p.x}
          y2={p.y}
          stroke="rgba(10,10,10,0.08)"
          strokeWidth={1}
        />
      ))}

      <motion.path
        d={polygonPath(tips)}
        fill="rgba(10,10,10,0.08)"
        stroke="#0a0a0a"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      {tips.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="#0a0a0a"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 + i * 0.05, duration: 0.35, ease: EASE }}
        />
      ))}

      {items.map((it, i) => {
        const rad = ((i * 360) / n - 90) * (Math.PI / 180);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const x = CENTER.x + cos * labelRad;
        const y = CENTER.y + sin * labelRad + 5;
        const anchor = cos > 0.4 ? "start" : cos < -0.4 ? "end" : "middle";
        return (
          <motion.text
            key={it.label}
            x={x}
            y={y}
            fill="currentColor"
            textAnchor={anchor}
            className="font-serif italic tracking-tight text-neutral-950"
            style={{ fontSize: 26 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.45, ease: EASE }}
          >
            {it.label}
            <tspan className="font-sans not-italic tabular-nums text-neutral-400">
              {"  "}
              {String(it.level).padStart(2, "0")}
            </tspan>
          </motion.text>
        );
      })}
    </svg>
  );
}

export function Skills() {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" tabIndex={-1} className="bg-white scroll-mt-16 md:scroll-mt-20">
      <div className="mx-auto w-full px-6 py-24 md:px-12 md:py-32">
        <div className="border-b border-black/10 pb-12 md:pb-16">
          <Reveal delay={0.1}>
            <h2 className="text-right font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-tight">
              Skills.
            </h2>
          </Reveal>
        </div>

        <div className="mb-12 grid grid-cols-3 border-t border-black/10 md:mb-16">
          {skillGroups.map((g, i) => {
            const isActive = active === i;
            return (
              <button
                key={g.title}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`relative pb-6 pt-5 text-left transition-colors duration-300 md:pb-8 md:pt-6 ${
                  i > 0 ? "border-l border-black/10 pl-4 md:pl-8" : ""
                } ${isActive ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-600"}`}
              >
                <span className="block font-serif italic text-[clamp(1.2rem,2.6vw,2.6rem)] leading-none tracking-tight">
                  {g.title}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="skills-tab-underline"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-neutral-950"
                  />
                )}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-10"
        >
          <SkillRadar items={skillGroups[active].items} />

          <div>
            <p className="eyebrow mb-4">concentration / index 0 — 10</p>
            <ul className="space-y-3">
              {skillGroups[active].items.map((it) => (
                <li key={it.label} className="group flex items-baseline gap-3">
                  <span className="h-2 w-2 shrink-0 self-center rounded-full bg-neutral-950 transition-transform duration-300 group-hover:scale-125" />
                  <span className="font-serif italic text-lg leading-none tracking-tight md:text-xl">
                    {it.label}
                  </span>
                  <span className="mx-1 flex-1 border-b border-black/10" />
                  <span className="font-mono text-sm text-neutral-400 group-hover:text-neutral-950 md:text-base">
                    {String(it.level).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}