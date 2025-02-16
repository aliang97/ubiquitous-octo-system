import type { Entity } from '@/types';
import { Rarity } from '@/utils';

export interface ItemEntity extends Entity {
  rarity?: Rarity;
}
