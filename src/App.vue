<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import {
  RECRUITMENTROSTER_LOCALSTORAGE_KEY,
  GUILDROSTER_LOCALSTORAGE_KEY,
  COMBATMANAGER_LOCALSTORAGE_KEY,
  INVENTORY_LOCALSTORAGE_KEY,
} from '@/utils';
import { useGuildRosterStore } from './stores/guildRoster';
import { useRecruitmentRosterStore } from './stores/recruitmentRoster';
import { useCombatManagerStore } from './stores/combatManager';
import { useInventoryStore } from './stores/inventory';
import type { LocationId } from './utils/enums';
import type { CombatInstance } from './types';
import { storeToRefs } from 'pinia';
import { generateCombat } from './utils/generators';

const guildRoster = useGuildRosterStore();
guildRoster.$subscribe((_, state) => {
  localStorage.setItem(GUILDROSTER_LOCALSTORAGE_KEY, JSON.stringify(state));
});

const recruitmentRoster = useRecruitmentRosterStore();
recruitmentRoster.$subscribe((_, state) => {
  localStorage.setItem(RECRUITMENTROSTER_LOCALSTORAGE_KEY, JSON.stringify(state));
});

const combatManager = useCombatManagerStore();
combatManager.$subscribe((_, state) => {
  localStorage.setItem(COMBATMANAGER_LOCALSTORAGE_KEY, JSON.stringify(state));
});

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
    delete recoveredCombatsByLocationId.value[location as LocationId];
  },
);

const inventory = useInventoryStore();
inventory.$subscribe((_, state) => {
  localStorage.setItem(INVENTORY_LOCALSTORAGE_KEY, JSON.stringify(state));
});
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style scoped></style>
