"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

const monthNames = Array.from({ length: 12 }, (_, month) =>
  new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(new Date(2026, month, 1)));
const weekdays = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];
const longDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function dateToISO(date: Date) {
  return `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function isoToDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}

export function formatReadingDate(value: string) {
  const date = isoToDate(value);
  return date ? longDate.format(date) : value;
}

export function calendarDays(year: number, month: number) {
  const mondayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, index) => new Date(year, month, index + 1 - mondayOffset));
}

export function ChapterDatePicker({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  const today = new Date();
  const [month, setMonth] = useState(() => {
    const initial = isoToDate(value) ?? today;
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });
  const [yearDraft, setYearDraft] = useState(String(month.getFullYear()));
  const [focusDate, setFocusDate] = useState(value || dateToISO(today));
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [activeMonth, setActiveMonth] = useState(month.getMonth());
  const monthMenuId = useId();
  const monthControlRef = useRef<HTMLSpanElement>(null);
  const monthTriggerRef = useRef<HTMLButtonElement>(null);
  const monthOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const keyboardMove = useRef(false);
  const selected = isoToDate(value);
  const todayISO = dateToISO(today);

  useEffect(() => {
    if (!keyboardMove.current) return;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusDate}"]`)?.focus();
    keyboardMove.current = false;
  }, [focusDate, month]);

  useEffect(() => {
    if (!monthMenuOpen) return;
    monthOptionRefs.current[activeMonth]?.focus();
    const closeOutside = (event: PointerEvent) => {
      if (!monthControlRef.current?.contains(event.target as Node)) setMonthMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [activeMonth, monthMenuOpen]);

  const showMonth = (year: number, monthIndex: number, preserveFocus = false) => {
    const next = new Date(year, monthIndex, 1);
    if (next.getFullYear() < 100 || next.getFullYear() > 9999) return;
    setMonth(next);
    setYearDraft(String(next.getFullYear()));
    if (!preserveFocus) setFocusDate(dateToISO(next));
  };

  const commitYear = () => {
    const year = Number(yearDraft);
    if (Number.isInteger(year) && year >= 100 && year <= 9999) showMonth(year, month.getMonth());
    else setYearDraft(String(month.getFullYear()));
  };

  const chooseMonth = (monthIndex: number) => {
    showMonth(month.getFullYear(), monthIndex);
    setActiveMonth(monthIndex);
    setMonthMenuOpen(false);
    monthTriggerRef.current?.focus();
  };

  const moveMonthChoice = (event: KeyboardEvent<HTMLButtonElement>, monthIndex: number) => {
    let next: number | null = null;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (monthIndex + 11) % 12;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (monthIndex + 1) % 12;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 11;
    if (event.key === "Escape") {
      event.preventDefault();
      setMonthMenuOpen(false);
      monthTriggerRef.current?.focus();
      return;
    }
    if (next === null) return;
    event.preventDefault();
    setActiveMonth(next);
  };

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    let next: Date | null = null;
    if (event.key === "ArrowLeft") next = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    if (event.key === "ArrowRight") next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    if (event.key === "ArrowUp") next = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    if (event.key === "ArrowDown") next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    if (event.key === "Home") next = new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() + 6) % 7));
    if (event.key === "End") next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - ((date.getDay() + 6) % 7)));
    if (event.key === "PageUp") next = new Date(date.getFullYear(), date.getMonth() - 1, Math.min(date.getDate(), new Date(date.getFullYear(), date.getMonth(), 0).getDate()));
    if (event.key === "PageDown") next = new Date(date.getFullYear(), date.getMonth() + 1, Math.min(date.getDate(), new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate()));
    if (!next || next.getFullYear() < 100 || next.getFullYear() > 9999) return;
    event.preventDefault();
    keyboardMove.current = true;
    setFocusDate(dateToISO(next));
    if (next.getFullYear() !== month.getFullYear() || next.getMonth() !== month.getMonth()) showMonth(next.getFullYear(), next.getMonth(), true);
  };

  const days = calendarDays(month.getFullYear(), month.getMonth());
  const focusVisible = days.some((day) => dateToISO(day) === focusDate);

  return <div className="chapter-date-picker" aria-label={label}>
    <div className="chapter-date-picker-heading">
      <button type="button" className="chapter-date-picker-arrow" aria-label="Mois précédent" disabled={month.getFullYear() === 100 && month.getMonth() === 0} onClick={() => showMonth(month.getFullYear(), month.getMonth() - 1)}>←</button>
      <div className="chapter-date-picker-period">
        <span className="chapter-date-picker-month" ref={monthControlRef} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setMonthMenuOpen(false); }}>
          <button
            ref={monthTriggerRef}
            type="button"
            className="chapter-date-picker-month-trigger"
            aria-label={`Choisir le mois, ${monthNames[month.getMonth()]} sélectionné`}
            aria-haspopup="listbox"
            aria-expanded={monthMenuOpen}
            aria-controls={monthMenuId}
            onClick={() => { setActiveMonth(month.getMonth()); setMonthMenuOpen((open) => !open); }}
            onKeyDown={(event) => {
              if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              event.preventDefault();
              setActiveMonth(event.key === "ArrowUp" ? 11 : month.getMonth());
              setMonthMenuOpen(true);
            }}
          >
            <span>{monthNames[month.getMonth()]}</span><span aria-hidden="true">⌄</span>
          </button>
          {monthMenuOpen && <span className="chapter-date-picker-month-menu" id={monthMenuId} role="listbox" aria-label="Mois de l’année">
            {monthNames.map((name, index) => <button
              ref={(node) => { monthOptionRefs.current[index] = node; }}
              type="button"
              role="option"
              aria-selected={index === month.getMonth()}
              tabIndex={index === activeMonth ? 0 : -1}
              className={index === month.getMonth() ? "selected" : ""}
              key={name}
              onClick={() => chooseMonth(index)}
              onKeyDown={(event) => moveMonthChoice(event, index)}
            >{name}</button>)}
          </span>}
        </span>
        <input aria-label="Année" type="number" inputMode="numeric" min="100" max="9999" value={yearDraft} onChange={(event) => setYearDraft(event.target.value)} onBlur={commitYear} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); commitYear(); event.currentTarget.blur(); } }} />
      </div>
      <button type="button" className="chapter-date-picker-arrow" aria-label="Mois suivant" disabled={month.getFullYear() === 9999 && month.getMonth() === 11} onClick={() => showMonth(month.getFullYear(), month.getMonth() + 1)}>→</button>
    </div>
    <p className="sr-only">Utilisez les flèches pour changer de jour, Page précédente ou suivante pour changer de mois, puis Entrée pour choisir.</p>
    <div className="chapter-date-picker-weekdays" aria-hidden="true">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
    <div className="chapter-date-picker-days" ref={gridRef} role="group" aria-label={`Jours de ${monthNames[month.getMonth()]} ${month.getFullYear()}`}>
      {days.map((day, index) => {
        const iso = dateToISO(day);
        const outsideRange = day.getFullYear() < 100 || day.getFullYear() > 9999;
        return <button type="button" key={iso} data-date={iso} disabled={outsideRange} className={`${day.getMonth() === month.getMonth() ? "" : "outside "}${iso === value ? "selected " : ""}${iso === todayISO ? "today" : ""}`.trim()} aria-label={longDate.format(day)} aria-pressed={iso === value} aria-current={iso === todayISO ? "date" : undefined} tabIndex={!outsideRange && (iso === focusDate || (!focusVisible && index === 0)) ? 0 : -1} onFocus={() => setFocusDate(iso)} onKeyDown={(event) => moveFocus(event, day)} onClick={() => { onChange(iso); setFocusDate(iso); if (day.getMonth() !== month.getMonth()) showMonth(day.getFullYear(), day.getMonth(), true); }}>{day.getDate()}</button>;
      })}
    </div>
    <p className="chapter-date-picker-selection" role="status">{selected ? <>Date choisie <strong>{longDate.format(selected)}</strong></> : "Choisissez un jour dans le calendrier."}</p>
  </div>;
}
