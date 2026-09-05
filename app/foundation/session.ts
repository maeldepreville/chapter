import type { PrototypeSession } from "./contracts";
import { habitualPrototypeSession } from "./dense-fixtures";
import { prototypeSessionSeeds } from "./fixtures";

export const prototypeSessions = { ...prototypeSessionSeeds, habitual: habitualPrototypeSession } as const;

export type PrototypeSessionName = keyof typeof prototypeSessions;

export function clonePrototypeSession(session: PrototypeSession): PrototypeSession {
  return structuredClone(session);
}

export function createPrototypeSession(name: PrototypeSessionName): PrototypeSession {
  return clonePrototypeSession(prototypeSessions[name]);
}

export function resetPrototypeSession(name: PrototypeSessionName, current?: PrototypeSession): PrototypeSession {
  void current;
  return createPrototypeSession(name);
}
