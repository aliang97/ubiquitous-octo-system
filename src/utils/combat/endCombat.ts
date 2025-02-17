import { useCombatManagerStore } from '@/stores/combatManager';
import { computed } from 'vue';
import { msToTicks } from '@/utils';
import { CombatInstanceStatus, LocationId } from '@/utils/enums';
import { pauseCombat } from '@/utils/combat';
import { generateId, generateEnemy, generateCombat } from '@/utils/generators';

export function endCombat(locationId: LocationId, breakLoop?: boolean, cb?: () => void) {
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
      if (!breakLoop && c.loop) {
        const newCombat = generateCombat({
          h1: c.h1,
          m1: generateEnemy({ type: c.m1.enemyType }),
          locationId: c.locationId,
          loop: c.loop,
        });

        combatManager.addCombat(newCombat);
      }
      if (cb) {
        cb();
      }
    },
    waitUntilTrueTick: c.trueTick + msToTicks(800),
  });
}
