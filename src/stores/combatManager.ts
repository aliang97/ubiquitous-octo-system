import type { CombatInstance } from '@/types';
import { COMBATMANAGER_LOCALSTORAGE_KEY, readStateFromLocalStorage } from '@/utils';
import { CombatLocationId } from '@/utils/enums';
import { startCombat, endCombat } from '@/utils/combat';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { generateCombatInstance } from '@/utils/generators/generateInstance';
import { generateCombat, generateEnemy } from '@/utils/generators';

type CombatData = Partial<Record<CombatLocationId, CombatInstance>>;

export const useCombatManagerStore = defineStore('combatManager', () => {
  // Initialize internal data structures
  const _data: Ref<CombatData> = ref({});
  // Try to recover data from localStorage
  const _recoveredData = ref(readStateFromLocalStorage(COMBATMANAGER_LOCALSTORAGE_KEY));

  function restartRecoveredInstances() {
    if (_recoveredData.value === undefined) {
      return;
    }
    Object.entries(_recoveredData.value).forEach(([location, instance]) => {
      // If the recovered data includes valid locations
      if (Object.values<string>(CombatLocationId).includes(location)) {
        const newInstance = generateCombatInstance(instance as CombatInstance);
        addCombat(newInstance);
      } else {
        console.warn("Found localStorageData that didn't match the expected data structure");
      }
    });
  }

  function addCombat(newCombat: CombatInstance) {
    if (_data.value[newCombat.locationId]) {
      console.error(`Error: Combat already exists at location ${newCombat.locationId}`);
      return;
    }

    _data.value[newCombat.locationId] = newCombat;
    startCombat(newCombat.locationId);
  }

  async function removeCombat(locationId: CombatLocationId, breakLoop?: boolean) {
    const c = getCombat(locationId);
    if (c === undefined) {
      return;
    }
    const shouldLoop = !breakLoop && c.loop;

    await endCombat(locationId);
    delete _data.value[locationId];

    if (shouldLoop) {
      const newCombat = generateCombat({
        h1: c.h1,
        m1: generateEnemy({ type: c.m1.enemyType }),
        locationId: c.locationId,
        loop: c.loop,
      });

      addCombat(newCombat);
    }
  }

  function getCombat(location: CombatLocationId) {
    return _data.value[location];
  }

  function getAllCombats() {
    return _data.value;
  }

  return {
    _data,
    addCombat,
    removeCombat,
    getCombat,
    getAllCombats,
    restartRecoveredInstances,
  };
});
