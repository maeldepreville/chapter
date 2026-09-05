import type { ReactNode } from "react";
import { chapterNavigation, shellAttributes, type ShellMode } from "./contracts";

export function ChapterShell({ mode, children }: { mode: ShellMode; children: ReactNode }) {
  return <div {...shellAttributes(mode)}>{children}</div>;
}

export function navigationForShell(mode: ShellMode) {
  return chapterNavigation[mode];
}
