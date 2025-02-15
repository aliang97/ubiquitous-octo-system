<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import { useGuildRosterStore } from './stores/guildRoster';
import { GUILDROSTER_LOCALSTORAGE_KEY } from './utils/utils';

const guildRoster = useGuildRosterStore();
guildRoster.$subscribe((_, state) => {
  localStorage.setItem(GUILDROSTER_LOCALSTORAGE_KEY, JSON.stringify(state));
});
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style scoped></style>
