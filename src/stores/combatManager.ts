import type { CombatInstance, CombatLocation } from '@/scripts/combat/CombatInstance';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { COMBATMANAGER_LOCALSTORAGE_KEY } from '@/scripts/util';

export const useCombatManagerStore = defineStore('combatManager', () => {
  let c: Partial<Record<CombatLocation, CombatInstance>> = {};
  const localStorageData = localStorage.getItem(COMBATMANAGER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    c = recoveredState.combatList;
  }

  const combatDictionary = ref(c);

  function addCombat(newCombat: CombatInstance) {
    if (combatDictionary.value[newCombat.location]) {
      console.error(
        `Error while adding new combat: Combat already exists at location ${newCombat.location}`,
      );
      return;
    }
    combatDictionary.value[newCombat.location] = newCombat;
    newCombat.startCombat();
  }

  function removeCombatByLocation(location: CombatLocation) {
    const targetCombat = combatDictionary.value[location];
    targetCombat?.endCombat();
    delete combatDictionary.value[location];
  }

  return { combatDictionary, addCombat, removeCombatByLocation };
});
