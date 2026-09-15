const workSections = [
  { id: "about", label: "L’œuvre" },
  { id: "journal", label: "Ma lecture" },
  { id: "reviews", label: "Autour de l’œuvre" },
] as const;

export const workSectionIds = workSections.map(({ id }) => id);

export function isWorkSectionLocation(path: string, hash: string, selectedWorkId: string, initialWorkPath: string | null) {
  return workSections.some(({ id }) => hash === `#${id}`)
    && (path === `/oeuvres/${selectedWorkId}` || path === initialWorkPath);
}

export function WorkSectionNav({ activeSection }: { activeSection: string }) {
  return <nav className="section-nav" aria-label="Sections de l’œuvre">
    {workSections.map(({ id, label }) => <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id}>{label}</a>)}
  </nav>;
}
