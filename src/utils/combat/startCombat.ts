import { CombatInstanceStatus, generateId, LocationId, SERVER_TICK_RATE_MS } from '@/utils';
import { combatStep } from './combatStep';
import { useCombatManagerStore } from '@/stores/combatManager';
import { computed } from 'vue';
import { pauseCombat } from './utils';

export function startCombat(locationId: LocationId) {
  const combatManager = useCombatManagerStore();
  const c = computed(() => combatManager.combatsByLocationId[locationId]).value;
  if (c === undefined) {
    return;
  }

  c.clockId = setInterval(() => combatStep(locationId), SERVER_TICK_RATE_MS);

  // Pause combat for intro animation
  pauseCombat(c, 1500);
  c.delayedActions.push({
    id: generateId('da'),
    doAction: () => {
      // Changing this status plays the intro zoom in animation
      c.status = CombatInstanceStatus.Ongoing;
    },
    waitUntilTrueTick: 1,
  });

  // Reset the ActionLockoutDurations for each character
  c.h1.actionLockoutDurationMS = 0;
  c.m1.actionLockoutDurationMS = 0;
}
