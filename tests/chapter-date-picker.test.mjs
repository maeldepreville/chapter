import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("the shared calendar accepts leap days, starts on Monday and rejects invalid dates", () => {
  const { isoToDate, dateToISO, calendarDays } = createSourceLoader()(source("chapter-date-picker.tsx"));
  assert.equal(dateToISO(isoToDate("2024-02-29")), "2024-02-29");
  assert.equal(isoToDate("2025-02-29"), null);
  assert.equal(isoToDate("2026-13-01"), null);
  assert.equal(calendarDays(2026, 8).length, 42);
  assert.equal(dateToISO(calendarDays(2026, 8)[0]), "2026-08-31");
});

test("the calendar presents a French month and staged day with labelled keyboard navigation", () => {
  const harness = hookHarness();
  const { ChapterDatePicker } = createSourceLoader({ react: harness.react })(source("chapter-date-picker.tsx"));
  const dates = [];
  const render = () => harness.render(ChapterDatePicker, { value: dates.at(-1) ?? "", onChange(value) { dates.push(value); }, label: "Choisir une date de fin" });
  let tree = render();
  const days = nodes(tree, (node) => node.type === "button" && node.props?.["data-date"]);
  assert.equal(days.length, 42);
  assert.equal(nodes(tree, (node) => node.type === "select" && node.props?.["aria-label"] === "Mois").length, 0);
  const monthTrigger = nodes(tree, (node) => node.type === "button" && node.props?.["aria-haspopup"] === "listbox")[0];
  assert.equal(monthTrigger.props["aria-expanded"], false);
  monthTrigger.props.onClick();
  tree = render();
  const monthOptions = nodes(tree, (node) => node.type === "button" && node.props?.role === "option");
  assert.equal(monthOptions.length, 12);
  assert.equal(monthOptions.filter((node) => node.props["aria-selected"]).length, 1);
  monthOptions[2].props.onClick();
  tree = render();
  assert.match(nodes(tree, (node) => node.type === "button" && node.props?.["aria-haspopup"] === "listbox")[0].props["aria-label"], /mars sélectionné/);
  assert.equal(nodes(tree, (node) => node.type === "button" && node.props?.role === "option").length, 0);
  assert.equal(nodes(tree, (node) => node.type === "input" && node.props?.["aria-label"] === "Année").length, 1);
  const day = nodes(tree, (node) => node.type === "button" && node.props?.["data-date"]).find((node) => node.props["data-date"].endsWith("-15") && !node.props.className.includes("outside"));
  day.props.onClick();
  tree = render();
  assert.deepEqual(dates, [day.props["data-date"]]);
  assert.equal(nodes(tree, (node) => node.type === "button" && node.props?.["data-date"] === dates[0])[0].props["aria-pressed"], true);
  assert.match(textOf(tree), /Date choisie/);
  const selectedDay = nodes(tree, (node) => node.type === "button" && node.props?.["data-date"] === dates[0])[0];
  selectedDay.props.onKeyDown({ key: "ArrowRight", preventDefault() {} });
  tree = render();
  assert.equal(nodes(tree, (node) => node.type === "button" && node.props?.["data-date"] === dates[0])[0].props["aria-pressed"], true);
  assert.equal(nodes(tree, (node) => node.type === "button" && node.props?.["data-date"] !== dates[0] && node.props.tabIndex === 0).length, 1);
  const year = nodes(tree, (node) => node.type === "input" && node.props?.["aria-label"] === "Année")[0];
  year.props.onChange({ target: { value: "2005" } });
  nodes(render(), (node) => node.type === "input" && node.props?.["aria-label"] === "Année")[0].props.onBlur();
  tree = render();
  assert.equal(nodes(tree, (node) => node.type === "button" && node.props?.["data-date"]?.startsWith("2005-")).length > 0, true);
  assert.match(readFileSync(source("chapter-date-picker.css"), "utf8"), /\.chapter-date-picker-days button\.selected \{ color: #fffaf5; background: var\(--brick\);/);
});

test("the calendar does not offer days outside its supported year range", () => {
  for (const [value, arrow, invalidYear] of [["0100-01-01", "Mois précédent", "0099-"], ["9999-12-01", "Mois suivant", "10000-"]]) {
    const harness = hookHarness();
    const { ChapterDatePicker } = createSourceLoader({ react: harness.react })(source("chapter-date-picker.tsx"));
    const tree = harness.render(ChapterDatePicker, { value, onChange() {}, label: "Choisir une date" });
    assert.equal(nodes(tree, (node) => node.type === "button" && node.props?.["aria-label"] === arrow)[0].props.disabled, true);
    assert.ok(nodes(tree, (node) => node.type === "button" && node.props?.["data-date"]?.startsWith(invalidYear)).every((node) => node.props.disabled));
  }
});

test("the Lu invitation records a chosen day only after explicit confirmation", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const Home = load(source("page.tsx")).default;
  const { coreWorks } = load(source("foundation/fixtures.ts"));
  const render = () => harness.render(Home, { initialData: { view: "work", works: coreWorks, entries: {}, traces: [] } });
  const button = (label) => nodes(render(), (node) => node.type === "button" && textOf(node) === label)[0];
  button("Ajouter au journal").props.onClick();
  button("Lu").props.onClick();
  button("Choisir").props.onClick();
  let tree = render();
  assert.equal(nodes(tree, (node) => node.type === "input" && node.props.type === "date").length, 0);
  assert.equal(button("Enregistrer la date").props.disabled, true);
  const picker = nodes(tree, (node) => node.type?.name === "ChapterDatePicker")[0];
  picker.props.onChange("2026-08-12");
  assert.equal(button("Enregistrer la date").props.disabled, false);
  button("Enregistrer la date").props.onClick();
  tree = render();
  assert.match(textOf(tree), /12 août 2026/);
  assert.equal(nodes(tree, (node) => node.type?.name === "ChapterDatePicker").length, 0);
});
