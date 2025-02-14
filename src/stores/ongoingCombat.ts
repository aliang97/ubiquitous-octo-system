import type { CombatInstance, CombatLocationId } from '@/types/CombatInstance';

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { resolveCombatTick } from '@/utils/resolveCombatTick';
import { SERVER_TICK_RATE_MS } from '@/utils/utils';
import { resetCharacterEntity } from '@/utils/combatUtils';

// A list of all ongoing combat instances
export const useOngoingCombatStore = defineStore('ongoingCombat', () => {
  const ongoingCombat = ref(<CombatInstance[]>[]);

  function addCombat(newCombat: CombatInstance) {
    // Check if combat already exists at this location - don't do anything if there is already combat at this location
    const existingCombatIndex = ongoingCombat.value.findIndex(
      el => el.location === newCombat.location
    );
    if (existingCombatIndex === -1) {
      // Add the new combat instance, and set up the clock to run the combat
      ongoingCombat.value.push(newCombat);
      const clockId = setInterval(() => resolveCombatTick(newCombat.location), SERVER_TICK_RATE_MS);
      newCombat.clockId = clockId;
    } else {
      console.error('Error adding new combat at location with existing combat instance');
    }
  }

  function removeCombatByLocationId(oldCombatLocation: CombatLocationId) {
    const oldCombatEl = ongoingCombat.value.find(
      el => el.location === oldCombatLocation
    )
    const index = ongoingCombat.value.findIndex(
      el => el.location === oldCombatLocation
    );
    if (index > -1) {
      // Remove the clock
      clearInterval(oldCombatEl?.clockId);
      // Reset the characters
      if (oldCombatEl?.character1) { resetCharacterEntity(oldCombatEl?.character1); }
      if (oldCombatEl?.character2) { resetCharacterEntity(oldCombatEl?.character2); }
      // Remove the combat instance from the list
      ongoingCombat.value.splice(index, 1);
    }
  }

  function getCombatByLocationId(queryLocation: CombatLocationId) {
    return ongoingCombat.value.find(
      el => el.location === queryLocation
    );
  }

  return {ongoingCombat, addCombat, removeCombatByLocationId, getCombatByLocationId}
})
