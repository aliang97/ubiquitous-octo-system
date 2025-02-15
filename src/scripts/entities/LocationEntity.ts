import type { Component } from 'vue';
import type { CombatLocation } from '@/scripts/combat';
import type { MonsterEntity } from '@/scripts/entities';

export type LocationEntityArgs = {
  id: CombatLocation;
  name?: string;
  backgroundComponent: Component;
  enemyList?: MonsterEntity[];
};

export class LocationEntity {
  id: CombatLocation;
  name: string;
  backgroundComponent: Component;
  enemyList?: MonsterEntity[];

  constructor(args: LocationEntityArgs) {
    this.id = args.id;
    this.name = args.name || 'Location Name';
    this.backgroundComponent = args.backgroundComponent;
    this.enemyList = args.enemyList;
  }
}
