import { useState, type ImgHTMLAttributes } from "react";

export function ImageWithFallback(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);

  const {
    src,
    alt = "",
    style,
    className,
    loading = "lazy",
    decoding = "async",
    onError,
    ...rest
  } = props;

  if (didError) {
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-950 text-center ${className ?? ""}`}
        style={style}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        {...rest}
        data-original-url={src}
      >
        <div className="pointer-events-none flex max-w-full flex-col items-center gap-4 px-6 py-10">
          <span className="eyebrow !text-white/40">Image not uploaded</span>
          <span className="italic-serif text-[clamp(1.5rem,5vw,2.75rem)] leading-[1.08] tracking-tight text-white">
            {alt || "Uploading soon."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`select-none ${className || ""}`}
      style={{
        ...style,
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        pointerEvents: "none", // Prevents direct right-click and dragging on the img element
      }}
      loading={loading}
      decoding={decoding}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      {...rest}
      onError={(event) => {
        onError?.(event);
        setDidError(true);
      }}
    />
  );
}