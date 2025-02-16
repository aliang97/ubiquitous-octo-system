import type { CharacterEntity } from '@/scripts/entities';
import { SERVER_TICK_RATE_MS } from '@/scripts/util';
import { CombatLocation, CombatStatus, QueuedAction, resolveQueuedActions } from '@/scripts/combat';

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

  actionQueue: QueuedAction[] = [];

  constructor(args: CombatInstanceArgs) {
    this.c1 = args.c1;
    this.c2 = args.c2;
    this.location = args.location;
    this.loop = args.loop;

    this.startCombat();
  }

  startCombat() {
    this.clockId = setInterval(() => this.combatInstanceStep(), SERVER_TICK_RATE_MS);
    this.pause(1500);
    // Changing the status triggers the fade-in animation
    this.actionQueue.push(
      new QueuedAction({
        waitUntilTrueTick: 1,
        doAction: () => {
          console.log('what');
          this.status = CombatStatus.Ongoing;
        },
      }),
    );
  }

  endCombat() {
    // TODO: Pause
    // TODO: outro
    // TODO: loot
    // TODO: reset character(s)
    clearInterval(this.clockId);
  }

  combatInstanceStep() {
    this.trueTick++;

    // Resolve Queued Actions that are bound to trueTick
    resolveQueuedActions({
      actionQueue: this.actionQueue,
      trueTick: this.trueTick,
    });
    // TODO: Continue resolving particle effects
    if (this.isPaused) {
      return;
    }

    this.gameTick++;

    // Resolve Queued Actions that are bound to gameTick
    resolveQueuedActions({
      actionQueue: this.actionQueue,
      gameTick: this.gameTick,
    });
    // TODO: Resolve animations
    // TODO: Resolve damage
    // TODO: Resolve combat end state
  }

  pause(durationMS?: number) {
    this.isPaused = true;
    if (durationMS) {
      const durationTicks = durationMS / SERVER_TICK_RATE_MS;
      this.actionQueue.push(
        new QueuedAction({
          waitUntilTrueTick: this.trueTick + durationTicks,
          doAction: () => this.unpause(),
        }),
      );
    }
  }

  unpause() {
    this.isPaused = false;
  }
}
