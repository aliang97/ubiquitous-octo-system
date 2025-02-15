import { CombatInstance, CombatLocation } from '@/scripts/combat';
import { HeroEntity, MonsterEntity } from '@/scripts/entities';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { COMBATMANAGER_LOCALSTORAGE_KEY } from '@/scripts/util';
import type { CombatInstanceArgs } from '@/scripts/combat/CombatInstance';

export const useCombatManagerStore = defineStore('combatManager', () => {
  const c: Partial<Record<CombatLocation, CombatInstance>> = {};
  const localStorageData = localStorage.getItem(COMBATMANAGER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    // Need to convert the JSON to actual objects so I can use the attached methods!
    Object.entries(recoveredState.combatDictionary).forEach(([k, v]) => {
      const loc = k as CombatLocation;
      const args = v as CombatInstanceArgs;
      args.c1 = new HeroEntity(args.c1);
      args.c2 = new MonsterEntity(args.c2);
      c[loc] = new CombatInstance(args);
    });
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
