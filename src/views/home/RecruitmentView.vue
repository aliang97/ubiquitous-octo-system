<script setup lang="ts">
import HeroCard from '@/components/cards/HeroCard.vue';
import { useRecruitmentRosterStore } from '@/stores/recruitmentRoster';
import { storeToRefs } from 'pinia';

const recruitmentRosterStore = useRecruitmentRosterStore();
const { heroList } = storeToRefs(recruitmentRosterStore);
</script>

<template>
  <main>
    <div class="top">
      <h1>Recruit some new adventurers to your guild:</h1>
      <button class="refresh" v-on:click="recruitmentRosterStore.randomize(4)">Refresh</button>
    </div>

    <ul>
      <li v-for="hero in heroList" :key="hero.id">
        <HeroCard :heroEntity="hero">
          <button v-on:click="recruitmentRosterStore.recruitHero(hero)">Hire</button>
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

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

h1 {
  color: white;
  font-size: 32px;
}

.refresh {
  padding: 8px 16px;
  display: flex;
  border: 2px solid white;
  border-radius: 8px;
  color: white;
}

.refresh:hover {
  cursor: pointer;
  background-color: white;
  color: black;
}

ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
