import type { Instance, CraftableItemEntity } from '@/types';
import type { ProcessingLocation } from '@/utils/enums';

export interface ProcessingQueueItem {
  item: CraftableItemEntity;
  quantity: number;
}

export interface ProcessingInstance extends Instance {
  location: ProcessingLocation;
  ticksUntilNextAction: number;
  processingQueue: ProcessingQueueItem[];
}
