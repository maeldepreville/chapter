"use client";

import { useEffect, useId, useRef, useState } from "react";

export const librarySortOptions = [
  { value: "activity", label: "Activité récente" },
  { value: "title", label: "Titre" },
  { value: "author", label: "Auteur" },
] as const;

export type LibrarySort = typeof librarySortOptions[number]["value"];

export function LibrarySortControl({ value, onChange }: { value: LibrarySort; onChange: (value: LibrarySort) => void }) {
  const id = useId();
  const selectedIndex = librarySortOptions.findIndex((option) => option.value === value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef({ text: "", time: 0 });

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const showOptions = () => {
    setActiveIndex(selectedIndex);
    searchRef.current = { text: "", time: 0 };
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(librarySortOptions[index].value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="library-sort" ref={rootRef} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <span className="library-sort-label" id={`${id}-label`}>Trier par</span>
      <div className="library-sort-control">
        <button
          className="library-sort-trigger"
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-options`}
          aria-labelledby={`${id}-label ${id}-value`}
          aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
          onClick={() => open ? setOpen(false) : showOptions()}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              if (open) { event.preventDefault(); event.stopPropagation(); setOpen(false); }
              return;
            }
            if (event.key === "Tab") {
              if (open) { onChange(librarySortOptions[activeIndex].value); setOpen(false); }
              return;
            }
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              if (open) choose(activeIndex); else showOptions();
              return;
            }
            if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              if (!open) showOptions();
              if (event.key === "Home") setActiveIndex(0);
              else if (event.key === "End") setActiveIndex(librarySortOptions.length - 1);
              else if (open) setActiveIndex((index) => Math.max(0, Math.min(librarySortOptions.length - 1, index + (event.key === "ArrowDown" ? 1 : -1))));
              return;
            }
            if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
              event.preventDefault();
              const now = Date.now();
              const previous = now - searchRef.current.time < 700 ? searchRef.current.text : "";
              const query = `${previous}${event.key}`.toLocaleLowerCase("fr");
              searchRef.current = { text: query, time: now };
              const repeated = [...query].every((letter) => letter === query[0]);
              const prefix = repeated ? query[0] : query;
              const start = open ? activeIndex : selectedIndex;
              const index = Array.from({ length: librarySortOptions.length }, (_, offset) => (start + offset + (repeated ? 1 : 0)) % librarySortOptions.length)
                .find((candidate) => librarySortOptions[candidate].label.toLocaleLowerCase("fr").startsWith(prefix));
              if (!open) setOpen(true);
              if (index !== undefined) setActiveIndex(index);
              else if (!open) setActiveIndex(selectedIndex);
            }
          }}
        >
          <span id={`${id}-value`}>{librarySortOptions[selectedIndex].label}</span>
          <svg className="library-sort-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <ul className="library-sort-options" id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`} hidden={!open}>
          {librarySortOptions.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={value === option.value}
              className={activeIndex === index ? "is-active" : undefined}
              onPointerMove={() => setActiveIndex(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>{option.label}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
