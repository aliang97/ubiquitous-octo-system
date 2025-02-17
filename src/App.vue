<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import {
  RECRUITMENTROSTER_LOCALSTORAGE_KEY,
  GUILDROSTER_LOCALSTORAGE_KEY,
  COMBATMANAGER_LOCALSTORAGE_KEY,
} from '@/utils';
import { useGuildRosterStore } from './stores/guildRoster';
import { useRecruitmentRosterStore } from './stores/recruitmentRoster';
import { useCombatManagerStore } from './stores/combatManager';

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
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style scoped></style>
