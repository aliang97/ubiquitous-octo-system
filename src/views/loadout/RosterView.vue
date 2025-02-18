<script setup lang="ts">
import HeroCard from '@/components/cards/HeroCard.vue';
import { useGuildRosterStore } from '@/stores/guildRoster';

const guildRoster = useGuildRosterStore();
</script>

<template>
  <main>
    These are your adventurers:
    <ul>
      <li v-for="hero in guildRoster.heroList" :key="hero.id">
        <HeroCard :heroEntity="hero">
          <button v-on:click="guildRoster.removeHero(hero)">Delete</button>
        </HeroCard>
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.mouse-hoverable {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-bg-2);
}

.mouse-hoverable:hover {
  cursor: pointer;
  border-color: white;
}

.button {
  padding: 2px 12px;
  border-radius: 8px;
  border: 1px solid white;
}

.button:hover {
  background-color: var(--color-bg-3);
}
</style>
