import { CharacterType, SERVER_TICK_RATE_MS } from '.';
import type { HeroEntity, MonsterEntity, CharacterEntity } from '@/types';

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
