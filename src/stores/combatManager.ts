import { CombatInstanceStatus, COMBATMANAGER_LOCALSTORAGE_KEY, LocationId } from '@/utils';
import type { CombatInstance } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { startCombat, endCombat } from '@/utils/combat';
import { rehydrateCombat } from '@/utils/combat/rehydrateCombat';

export const useCombatManagerStore = defineStore('combatManager', () => {
  let c: Partial<Record<LocationId, CombatInstance>> = {};
  const localStorageData = localStorage.getItem(COMBATMANAGER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    if (recoveredState.combatsByLocationId) {
      c = recoveredState.combatsByLocationId;
      // Mark these combats as dehydrated so we can rehydrate them later
      Object.values(c).forEach((c) => {
        c.status = CombatInstanceStatus.Dehydrated;
      });
    }
  }

  const combatsByLocationId = ref(c);

  // Rehydrate the recovered combats
  Object.values(combatsByLocationId.value).forEach((c) => {
    if (c.status === CombatInstanceStatus.Dehydrated) {
      rehydrateCombat(c);
    }
  });

  function addCombat(newCombat: CombatInstance) {
    if (combatsByLocationId.value[newCombat.locationId]) {
      console.error(
        `Error while adding new combat: Combat already exists at location ${newCombat.locationId}`,
      );
      return;
    }

    combatsByLocationId.value[newCombat.locationId] = newCombat;
    startCombat(newCombat.locationId);
  }

  function removeCombatByLocation(locationId: LocationId, breakLoop?: boolean, cb?: () => void) {
    const targetCombat = combatsByLocationId.value[locationId];
    if (!targetCombat) {
      if (cb) {
        cb();
      }
      return;
    }
    endCombat(targetCombat.locationId, breakLoop, cb);
  }

  return { combatsByLocationId, addCombat, removeCombatByLocation };
});
