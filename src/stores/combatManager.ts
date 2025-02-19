import type { CombatInstance } from '@/types';
import { COMBATMANAGER_LOCALSTORAGE_KEY } from '@/utils';
import { CombatLocationId } from '@/utils/enums';
import { startCombat, endCombat } from '@/utils/combat';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCombatManagerStore = defineStore('combatManager', () => {
  const combats: Partial<Record<CombatLocationId, CombatInstance>> = {};
  let recoveredCombats: Partial<Record<CombatLocationId, CombatInstance>> = {};
  const localStorageData = localStorage.getItem(COMBATMANAGER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    if (recoveredState.combatsByLocationId) {
      recoveredCombats = recoveredState.combatsByLocationId;
    }
  }

  const combatsByLocationId = ref(combats);
  const recoveredCombatsByLocationId = ref(recoveredCombats);

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

  function removeCombatByLocation(
    locationId: CombatLocationId,
    breakLoop?: boolean,
    cb?: () => void,
  ) {
    const targetCombat = combatsByLocationId.value[locationId];
    if (!targetCombat) {
      if (cb) {
        cb();
      }
      return;
    }
    endCombat(targetCombat.locationId, breakLoop, cb);
  }

  return { combatsByLocationId, recoveredCombatsByLocationId, addCombat, removeCombatByLocation };
});
