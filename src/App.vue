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
import { saveStateToLocalStorage } from '@/utils';
import { useProcessingManagerStore } from './stores/processingManager';

const guildRoster = useGuildRosterStore();
saveStateToLocalStorage(guildRoster, GUILDROSTER_LOCALSTORAGE_KEY);

const recruitmentRoster = useRecruitmentRosterStore();
saveStateToLocalStorage(recruitmentRoster, RECRUITMENTROSTER_LOCALSTORAGE_KEY);

const combatManager = useCombatManagerStore();
saveStateToLocalStorage(combatManager, COMBATMANAGER_LOCALSTORAGE_KEY);
combatManager.restartRecoveredInstances();

const inventory = useInventoryStore();
saveStateToLocalStorage(inventory, INVENTORY_LOCALSTORAGE_KEY);

const processing = useProcessingManagerStore();
saveStateToLocalStorage(processing, PROCESSING_LOCALSTORAGE_KEY);
processing.restartRecoveredInstances();
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style scoped></style>
