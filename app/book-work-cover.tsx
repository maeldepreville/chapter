import { CoverFrame } from "./cover-frame";
import type { Work } from "./foundation/contracts";

function titleTier(title: string) {
  if (title.length <= 18) return "cover-title-short";
  if (title.length <= 31) return "cover-title-medium";
  return "cover-title-long";
}

export function BookWorkCover({ work }: { work: Work }) {
  return <CoverFrame work={work} className="book-cover" priority sizes="(max-width: 899px) 160px, 320px">
    <span className="cover-copy" aria-hidden="true">
      <span className="cover-mark">CHAPTER</span>
      <strong className={titleTier(work.title)}>{work.title}</strong>
      <small>{work.author}</small>
    </span>
  </CoverFrame>;
}
