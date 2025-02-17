import { useCombatManagerStore } from '@/stores/combatManager';
import { computed } from 'vue';
import { CharacterStatus, LocationId } from '../enums';
import { resolveDelayedActions } from './delayedActions';
import { takeAction } from './takeAction';
import { handleDeath } from './handleDeath';
import { endCombat } from './endCombat';

export function combatStep(locationId: LocationId) {
  const combatManager = useCombatManagerStore();
  const c = computed(() => combatManager.combatsByLocationId[locationId]).value;
  if (c === undefined) {
    return;
  }

  // Resolve delayedActions
  resolveDelayedActions(c);

  c.trueTick++;
  // TODO: resolve particle effects

  if (c.isPaused) {
    return;
  }

  c.gameTick++;

  // TODO: Resolve animations
  if (c.h1.characterStatus !== CharacterStatus.Dead && c.h1.actionLockoutDurationMS <= 0) {
    takeAction(c.h1, c);
  } else {
    c.h1.actionLockoutDurationMS--;
  }

  if (c.m1.characterStatus !== CharacterStatus.Dead && c.m1.actionLockoutDurationMS <= 0) {
    takeAction(c.m1, c);
  } else {
    c.m1.actionLockoutDurationMS--;
  }

  // Combat finishes if either participant dies
  if (c.m1.currentHitPoints <= 0 && c.m1.characterStatus !== CharacterStatus.Dead) {
    handleDeath(c.m1, c).then(() => {
      endCombat(locationId);
    });
    return;
  }

  if (c.h1.currentHitPoints <= 0 && c.h1.characterStatus !== CharacterStatus.Dead) {
    handleDeath(c.h1, c).then(() => {
      endCombat(locationId);
    });

    return;
  }
}
