<script setup lang="ts">
import { ref } from 'vue'
import { usePersonListStore } from '@/stores/personList.ts'
import ProfileCard from '@/components/person/ProfileCard.vue'
import JohnExile from "@/exampleData/characters/johnExile.ts"
import Person2 from '@/exampleData/characters/person2.ts'
import { removeFromObjectListById } from '@/utils/utils.ts'
const newCandidateList = ref([
  JohnExile,
  Person2,
]);
const personList = usePersonListStore();
function hirePerson(character) {
  personList.addPerson(character);
  removeFromObjectListById(character.id, newCandidateList.value);
}
</script>

<template>
  <main>
    Recruitment some adventurers to your guild
    TODO: randomly generate characters?
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
