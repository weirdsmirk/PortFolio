const words = [
  { text: "DESIGN" },
  { text: "ENGINEER" },
  { text: "SYSTEMS" },
  { text: "DESIGNER" },
  { text: "INTERFACE" },
];

function Circle() {
  return (
    <span
      className="mx-8 inline-block h-[0.5em] w-[0.5em] select-none rounded-full border-2 border-white md:mx-14"
      aria-hidden
    />
  );
}

export function Marquee() {
  return (
    <div
      aria-hidden
      className="mt-20 overflow-hidden whitespace-nowrap border-y border-white/15 bg-neutral-950 py-10 text-white md:mt-24 md:py-14"
    >
      <div className="marquee-track flex w-max shrink-0 items-center text-[clamp(3.5rem,7vw,6.5rem)] font-bold leading-none tracking-tight">
        {Array.from({ length: 2 }).map((_, copy) => (
          <span
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy !== 0}
          >
            {words.map((w, i) => (
              <span key={w.text} className="flex items-center">
                <span className="font-sans font-bold italic text-white">{w.text}</span>
                {i < words.length - 1 && <Circle />}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}