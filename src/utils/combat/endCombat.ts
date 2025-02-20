import { useCombatManagerStore } from '@/stores/combatManager';
import { computed } from 'vue';
import { CombatInstanceStatus, CombatLocationId } from '@/utils/enums';
import { pauseCombat } from '@/utils/combat';
import { doActionAfterDelay } from '@/utils/combat';

export async function endCombat(locationId: CombatLocationId) {
  await playEndingAnimation(locationId);

  const store = useCombatManagerStore();
  const c = computed(() => store.getCombat(locationId));
  if (c.value === undefined) {
    return;
  }

  // Clear clock
  clearInterval(c.value.clockId);
}

export async function playEndingAnimation(location: CombatLocationId) {
  const store = useCombatManagerStore();
  const c = computed(() => store.getCombat(location));
  if (c.value === undefined) {
    return;
  }

  pauseCombat(c.value, 1500);
  c.value.status = CombatInstanceStatus.Ending;

  return new Promise((resolve) => {
    doActionAfterDelay(c, () => resolve(1), 800);
  });
}
