import { useCombatManagerStore } from '@/stores/combatManager';
import { computed } from 'vue';
import { LocationId } from '../enums';
import { resolveDelayedActions } from './delayedActions';

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
  // TODO: Resolve damage
  if (c.h1.actionLockoutDurationMS <= 0) {
    // what does this character want to do?
  } else {
    c.h1.actionLockoutDurationMS--;
  }

  if (c.m1.actionLockoutDurationMS <= 0) {
    // what does this character want to do?
  } else {
    c.m1.actionLockoutDurationMS--;
  }

  // TODO: Resolve combat end state
}
