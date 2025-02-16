import { COMBATMANAGER_LOCALSTORAGE_KEY, LocationId } from '@/utils';
import type { CombatInstance } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { startCombat, endCombat } from '@/utils/combat';

export const useCombatManagerStore = defineStore('combatManager', () => {
  let c: Partial<Record<LocationId, CombatInstance>> = {};
  const localStorageData = localStorage.getItem(COMBATMANAGER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    c = recoveredState.combatsByLocationId;
  }

  const combatsByLocationId = ref(c);

  function addCombat(newCombat: CombatInstance) {
    if (combatsByLocationId.value[newCombat.locationId]) {
      console.error(
        `Error while adding new combat: Combat already exists at location ${newCombat.locationId}`,
      );
      return;
    }

    combatsByLocationId.value[newCombat.locationId] = newCombat;
    startCombat(newCombat);
  }

  function removeCombatByLocation(locationId: LocationId) {
    const targetCombat = combatsByLocationId.value[locationId];
    if (!targetCombat) {
      return;
    }
    endCombat(targetCombat);
    delete combatsByLocationId.value[locationId];
  }

  return { combatsByLocationId, addCombat, removeCombatByLocation };
});
