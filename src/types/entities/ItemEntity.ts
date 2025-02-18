import type { Entity } from '@/types';
import { Rarity } from '@/utils/enums';

export interface ItemEntity extends Entity {
  rarity?: Rarity;
  spriteSrc?: string;
}
