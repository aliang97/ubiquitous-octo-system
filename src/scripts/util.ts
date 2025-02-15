export const SERVER_TICK_RATE_MS = 10;
export const GUILDROSTER_LOCALSTORAGE_KEY = 'iri-state-guildRoster';
export const RECRUITMENTROSTER_LOCALSTORAGE_KEY = 'iri-state-recruitmentRoster';
export const COMBATMANAGER_LOCALSTORAGE_KEY = 'iri-state-combatManager';

export function arraySum(a: (number | undefined)[]): number {
  return a.reduce((sum, a) => (sum || 0) + (a || 0), 0) || -1;
}
