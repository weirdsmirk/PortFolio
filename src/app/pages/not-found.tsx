import { Link } from "react-router";
import { Reveal } from "../components/reveal";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <Reveal delay={0.1}>
        <h1 className="font-serif text-[clamp(4rem,15vw,10rem)] leading-none tracking-tight">
          404
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-500">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-12">
          <Link
            to="/"
            className="eyebrow group inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-white transition-all hover:bg-white hover:text-black"
          >
            Return to Homepage
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
