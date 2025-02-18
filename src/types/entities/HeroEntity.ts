import type { CharacterEntity, HeroClass, EquippedItemLoadout } from '@/types';

export interface HeroEntity extends CharacterEntity {
  equipment: EquippedItemLoadout;
  heroClass: HeroClass;
}
