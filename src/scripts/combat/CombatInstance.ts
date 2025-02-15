import type { CharacterEntity } from '@/scripts/entities';
import { SERVER_TICK_RATE_MS } from '@/scripts/util';
import { CombatLocation, CombatStatus } from '@/scripts/combat';

export type CombatInstanceArgs = {
  c1: CharacterEntity;
  c2: CharacterEntity;
  location: CombatLocation;
  loop?: boolean;
};

export class CombatInstance {
  c1: CharacterEntity;
  c2: CharacterEntity;
  location: CombatLocation;
  loop?: boolean;
  gameTick: number = 0;
  trueTick: number = 0;
  isPaused: boolean = false;
  status: CombatStatus = CombatStatus.Starting;
  clockId: number = 0;

  constructor(args: CombatInstanceArgs) {
    this.c1 = args.c1;
    this.c2 = args.c2;
    this.location = args.location;
    this.loop = args.loop;

    this.startCombat();
  }

  startCombat() {
    // Pause
    // intro
    this.clockId = setInterval(this.combatInstanceStep, SERVER_TICK_RATE_MS);
  }

  endCombat() {
    // Pause
    // outro
    // loot
    // reset character(s)
    clearInterval(this.clockId);
  }

  combatInstanceStep() {
    this.trueTick++;

    // Continue resolving particle effects
    if (this.isPaused) {
      return;
    }

    this.gameTick++;
    // Resolve animations
    // Resolve damage
    // Resolve combat end state
  }

  pause(durationMS?: number) {
    this.isPaused = true;
    if (durationMS) {
      setTimeout(() => {
        this.isPaused = false;
      }, durationMS);
    }
  }

  unpause() {
    this.isPaused = false;
  }
}
