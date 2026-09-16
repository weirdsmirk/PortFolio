import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "../constants";
import { music } from "../data";

const barHeights = [40, 90, 55, 100, 60, 80, 45];

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(music.src);
    audio.preload = "none";
    audioRef.current = audio;

    const onEnded = () => {
      setPlaying(false);
      audio.currentTime = 0;
    };
    const onPlay = () => {
      setPlaying(true);
      setMessage("Music playing");
    };
    const onPause = () => setPlaying(false);
    const onError = () => {
      setPlaying(false);
      setMessage("Music could not be played");
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
      audio.load();
    };
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
        setMessage("Music playback was blocked by the browser");
      }
    } else {
      audio.pause();
      setMessage("Music paused");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
      className="absolute right-6 bottom-6 z-30 flex flex-col items-end gap-1.5 text-right md:right-12 md:bottom-8"
    >
        <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className={`min-h-11 px-2 py-2 transition-colors duration-300 hover:opacity-60 active:opacity-40 ${
            playing
              ? "text-black"
              : "text-neutral-500"
          }`}
          aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        >
          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em]">
            {playing ? "Pause" : "Play"}
          </span>
        </button>
        <span
          className="flex h-2 items-end gap-[2px] text-neutral-500"
          aria-hidden
        >
          {barHeights.map((h, i) => (
            <span
              key={i}
              className={`wave-bar ${playing ? "wave-bar--active" : ""}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </span>
      </div>
      <span className="italic-serif w-max text-lg leading-none text-black">
        {music.title}
      </span>
      <span className="sr-only" aria-live="polite">
        {message}
      </span>

      <style>{`
        .wave-bar {
          width: 1.5px;
          border-radius: 1px;
          background: currentColor;
          transform-origin: bottom;
        }
        .wave-bar--active { animation: css-wave 0.9s ease-in-out infinite; }
        .wave-bar:nth-child(2n) {
          animation-delay: -0.35s;
          animation-duration: 0.8s;
        }
        .wave-bar:nth-child(3n) {
          animation-delay: -0.55s;
          animation-duration: 1.05s;
        }
        .wave-bar:nth-child(5n) {
          animation-delay: -0.15s;
          animation-duration: 0.7s;
        }
        @keyframes css-wave {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </motion.div>
  );
}
