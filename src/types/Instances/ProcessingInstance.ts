import type { Instance, CraftableItemEntity } from '@/types';
import type { ProcessingLocation } from '@/utils/enums';

export interface ProcessingInstance extends Instance {
  location: ProcessingLocation;
  ticksUntilNextAction: number;
  outputItem: Omit<CraftableItemEntity, 'id'>;
}
