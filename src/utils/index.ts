export { generateId } from './generators/generateId';
export * from './enums';
export { generateEquippableItem } from './generators/generateEquippableItem';
export { generateHero } from './generators/generateHero';
export { generateEnemy, slime, level1Crook, level100Boss } from './generators/generateEnemy';
export { generateCombat } from './generators/generateCombat';

export const SERVER_TICK_RATE_MS = 10;
export const GUILDROSTER_LOCALSTORAGE_KEY = 'iri-state-guildRoster';
export const RECRUITMENTROSTER_LOCALSTORAGE_KEY = 'iri-state-recruitmentRoster';
export const COMBATMANAGER_LOCALSTORAGE_KEY = 'iri-state-combatManager';
