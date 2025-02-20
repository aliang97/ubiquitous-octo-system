import type { CharacterEntity, MonsterEntity, HeroEntity } from '@/types';
import { CharacterType } from '@/utils/enums';
import type { Store } from 'pinia';

export const SERVER_TICK_RATE_MS = 10;
export const GUILDROSTER_LOCALSTORAGE_KEY = 'iri-state-guildRoster';
export const RECRUITMENTROSTER_LOCALSTORAGE_KEY = 'iri-state-recruitmentRoster';
export const COMBATMANAGER_LOCALSTORAGE_KEY = 'iri-state-combatManager';
export const INVENTORY_LOCALSTORAGE_KEY = 'iri-state-inventory';
export const PROCESSING_LOCALSTORAGE_KEY = 'iri-state-processing';

export function arraySum(a: (number | undefined)[]): number {
  return a.reduce((sum, a) => (sum || 0) + (a || 0), 0) || -1;
}

export function msToTicks(durationMS: number) {
  return Math.round(durationMS / SERVER_TICK_RATE_MS);
}

export function isMonster(c: CharacterEntity): c is MonsterEntity {
  return c.characterType === CharacterType.Monster;
}

export function isHero(c: CharacterEntity): c is HeroEntity {
  return c.characterType === CharacterType.Hero;
}

export function saveStateToLocalStorage(store: Store, localStorageKey: string) {
  store.$subscribe((_, state) => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  });
}

export function readStateFromLocalStorage(localStorageKey: string) {
  const localStorageData = localStorage.getItem(localStorageKey);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    return recoveredState._data;
  }
}
