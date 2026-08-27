export const emptyEntry = { readingStatus: null, readingDate: "", note: "", review: "", rating: 0 };
export const retainedTrace = { id: "retained-note", workId: "cartographies", kind: "Note privée", action: "note", date: "20 août 2026", text: "Une pensée personnelle à conserver même sans métadonnées." };
export const socialHandlers = {
  onOpenWork() {}, onAddToRead() {}, onOpenProfile() {}, onOpenList() {}, onToggleFollow() {}, onOpenHonors() {}, onEditPhoto() {}, onRemovePhoto() {}, onBack() {}, onBackToJournal() {},
};
export const profileProps = { ...socialHandlers, owner: "self", following: false, photo: null, equippedTitle: "Esprit nomade", showcase: [] };
