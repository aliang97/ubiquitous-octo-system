import type { Component } from 'vue';
import type { MonsterEntity } from '@/types';
import { LocationId } from '@/utils';

export interface Location {
  id: LocationId;
  name: string;
  backgroundComponent: Component;
  enemyList?: MonsterEntity[];
}
