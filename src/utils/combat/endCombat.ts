import { useCombatManagerStore } from '@/stores/combatManager';
import { computed } from 'vue';
import { CombatInstanceStatus, LocationId } from '../enums';
import { pauseCombat } from './utils';
import { generateId } from '../generators/generateId';
import { msToTicks } from '../utils';

export function endCombat(locationId: LocationId) {
  const combatManager = useCombatManagerStore();
  const c = computed(() => combatManager.combatsByLocationId[locationId]).value;
  if (c === undefined) {
    return;
  }

  pauseCombat(c, 1500);
  c.status = CombatInstanceStatus.Ending;
  // TODO: loot
  // TODO: reset character(s)
  c.delayedActions.push({
    id: generateId('da'),
    doAction: () => {
      clearInterval(c.clockId);
      delete combatManager.combatsByLocationId[locationId];
    },
    waitUntilTrueTick: c.trueTick + msToTicks(1000),
  });
}
