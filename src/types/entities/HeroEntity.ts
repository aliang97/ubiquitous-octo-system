import type { CharacterEntity, HeroClass, EquippedItemLoadout } from '@/types';

export interface HeroEntity extends CharacterEntity {
  heroClass: HeroClass;
  equipment: EquippedItemLoadout;
}
