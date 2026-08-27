"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";

type CoverWork = { id: string; title: string; author: string; cover: boolean; coverTone: string; coverSrc?: string };
type CoverProps = { work: CoverWork; className: string; sizes: string; priority?: boolean; decorative?: boolean; children: ReactNode };

// Key the image lifecycle by work and source: a failed image must not make the
// next work inherit its fallback. Every cover size uses the same behavior.
export function CoverFrame(props: CoverProps) {
  return <CoverFrameState key={`${props.work.id}:${props.work.coverSrc ?? "/chapter-cover-art.png"}:${props.work.cover}`} {...props} />;
}

function CoverFrameState({ work, className, sizes, priority, decorative, children }: CoverProps) {
  const [imageState, setImageState] = useState<"loading" | "loaded" | "failed">("loading");
  const showImage = work.cover && imageState !== "failed";
  return (
    <span className={`${className} ${showImage ? "cover-image" : `typographic-cover ${work.coverTone}`}`}
      aria-hidden={decorative || undefined} aria-label={decorative ? undefined : `Couverture de ${work.title}, de ${work.author}`}>
      {showImage ? <Image src={work.coverSrc ?? "/chapter-cover-art.png"} alt="" fill sizes={sizes} priority={priority}
        style={{ opacity: imageState === "loaded" ? 1 : 0 }}
        onLoad={() => setImageState("loaded")} onError={() => setImageState("failed")} /> : children}
    </span>
  );
}
