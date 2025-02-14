<script setup lang="ts">
import type { CharacterEntity } from '@/types/CharacterEntity';

import ProfileCard from '@/components/characterEntity/ProfileCard.vue'
import { useGuildRosterStore } from '@/stores/guildRoster';

const guildRoster = useGuildRosterStore();
function firePerson(person: CharacterEntity) {
  guildRoster.removePerson(person);
}

</script>

<template>
  <main>
    These are your adventurers:
    <ul>
      <li v-for="person in guildRoster.people" :key="person.id">
        <ProfileCard :profile="person" buttonText="fire" v-on:click="firePerson(person)" />
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
  border: 2px solid var(--color-background-soft);
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
  background-color: var(--color-background-mute);
}
</style>
