// Native modal dialogs own background inertness; these helpers preserve focus
// and scroll state across conditional renders and overlapping surfaces.
const scrollLocks = new WeakMap<Document, { count: number; overflow: string }>();
const modalStacks = new WeakMap<Document, HTMLDialogElement[]>();

export function lockBodyScroll(document: Document) {
  const lock = scrollLocks.get(document) ?? { count: 0, overflow: document.body.style.overflow };
  lock.count += 1;
  scrollLocks.set(document, lock);
  document.body.style.overflow = "hidden";
  let released = false;
  return () => {
    if (released) return;
    released = true;
    lock.count -= 1;
    if (!lock.count) {
      document.body.style.overflow = lock.overflow;
      scrollLocks.delete(document);
    }
  };
}

export function canFocus(element: HTMLElement | null): element is HTMLElement {
  return Boolean(element?.isConnected && !element.closest('[inert], [hidden], [aria-hidden="true"]') &&
    !element.matches(":disabled") && element.getClientRects().length &&
    element.ownerDocument.defaultView?.getComputedStyle(element).visibility !== "hidden");
}

function focusElement(element: HTMLElement, preventScroll = true) {
  if (!element.hasAttribute("tabindex") && element.tabIndex < 0) {
    element.setAttribute("tabindex", "-1");
    element.addEventListener("blur", () => element.removeAttribute("tabindex"), { once: true });
  }
  element.focus({ preventScroll });
}

export function focusModal(dialog: HTMLDialogElement, selector: string) {
  const target = dialog.querySelector<HTMLElement>(selector);
  if (canFocus(target)) focusElement(target, false);
}

export function mountModal(dialog: HTMLDialogElement, returnFocusSelector: string) {
  const document = dialog.ownerDocument;
  const trigger = document.activeElement as HTMLElement | null;
  const unlock = lockBodyScroll(document);
  const stack = modalStacks.get(document) ?? [];
  stack.push(dialog);
  modalStacks.set(document, stack);
  dialog.showModal();
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    const wasTop = stack.at(-1) === dialog;
    stack.splice(stack.indexOf(dialog), 1);
    dialog.close();
    unlock();
    // Wait until React has removed disappearing triggers (photo removal,
    // search navigation, undo feedback) before selecting a useful fallback.
    queueMicrotask(() => {
      if (!wasTop || stack.length) return;
      const fallback = document.querySelector<HTMLElement>(returnFocusSelector);
      const target = canFocus(trigger) ? trigger : canFocus(fallback) ? fallback : document.querySelector<HTMLElement>("main h1, main");
      if (canFocus(target)) focusElement(target);
    });
  };
}

export function containModalTab(dialog: HTMLDialogElement, event: Pick<KeyboardEvent, "key" | "shiftKey" | "preventDefault">) {
  if (event.key !== "Tab") return;
  const candidates = Array.from(dialog.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href], [tabindex], [contenteditable="true"]'))
    .filter((element) => element.tabIndex >= 0 && canFocus(element));
  const first = candidates[0];
  const last = candidates.at(-1);
  const active = dialog.ownerDocument.activeElement;
  if (!first || !last) {
    event.preventDefault();
    focusElement(dialog);
  } else if (!candidates.includes(active as HTMLElement) || (event.shiftKey ? active === first : active === last)) {
    event.preventDefault();
    focusElement(event.shiftKey ? last : first, false);
  }
}
