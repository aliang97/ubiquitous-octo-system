<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import {
  RECRUITMENTROSTER_LOCALSTORAGE_KEY,
  GUILDROSTER_LOCALSTORAGE_KEY,
  COMBATMANAGER_LOCALSTORAGE_KEY,
  INVENTORY_LOCALSTORAGE_KEY,
  PROCESSING_LOCALSTORAGE_KEY,
} from '@/utils';
import { useGuildRosterStore } from './stores/guildRoster';
import { useRecruitmentRosterStore } from './stores/recruitmentRoster';
import { useCombatManagerStore } from './stores/combatManager';
import { useInventoryStore } from './stores/inventory';
import type { CombatLocationId } from './utils/enums';
import type { CombatInstance } from './types';
import { storeToRefs } from 'pinia';
import { generateCombat } from './utils/generators';
import { saveStateToLocalStorage } from '@/utils';
import { useProcessingManagerStore } from './stores/processingManager';

const guildRoster = useGuildRosterStore();
saveStateToLocalStorage(guildRoster, GUILDROSTER_LOCALSTORAGE_KEY);

const recruitmentRoster = useRecruitmentRosterStore();
saveStateToLocalStorage(recruitmentRoster, RECRUITMENTROSTER_LOCALSTORAGE_KEY);

const combatManager = useCombatManagerStore();
saveStateToLocalStorage(combatManager, COMBATMANAGER_LOCALSTORAGE_KEY);

const { recoveredCombatsByLocationId } = storeToRefs(combatManager);
Object.entries(recoveredCombatsByLocationId.value).forEach(
  ([location, combat]: [string, CombatInstance]) => {
    console.log('restarting combat at ' + combat.locationId);
    const restartedCombat = generateCombat({
      h1: combat.h1,
      m1: combat.m1,
      locationId: combat.locationId,
      loop: combat.loop,
    });
    combatManager.addCombat(restartedCombat);
    delete recoveredCombatsByLocationId.value[location as CombatLocationId];
  },
);

const inventory = useInventoryStore();
saveStateToLocalStorage(inventory, INVENTORY_LOCALSTORAGE_KEY);

// const processing = useProcessingManagerStore();
// saveStateToLocalStorage(processing, PROCESSING_LOCALSTORAGE_KEY);
// processing.restartRecoveredInstances();
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style scoped></style>
