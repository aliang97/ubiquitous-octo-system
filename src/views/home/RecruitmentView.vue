<script setup lang="ts">
import type { CharacterEntity } from '@/types/CharacterEntity'

import ProfileCard from '@/components/characterEntity/ProfileCard.vue'
import JohnExile from "@/exampleData/characters/johnExile.ts"
import Person2 from '@/exampleData/characters/person2.ts'
import { ref } from 'vue'
import { useGuildRosterStore } from '@/stores/guildRoster.ts'
import { removeFromObjectListById } from '@/utils/utils.ts'

// TODO: add a gameplay system cost to generating candidates
// TODO: add meaningful differentiation between candidates
// TODO: randomly generate candidates
const newCandidateList = ref([
  JohnExile,
  Person2,
]);
const guildRoster = useGuildRosterStore();
function hirePerson(character: CharacterEntity) {
  guildRoster.addPerson(character);
  removeFromObjectListById(character.id, newCandidateList.value);
}
</script>

<template>
  <main>
    Recruitment some adventurers to your guild
    <ul>
      <li v-for="character in newCandidateList" :key="character.id">
        <ProfileCard :profile="character" buttonText="Hire" v-on:click="hirePerson(character)" />
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
</style>
