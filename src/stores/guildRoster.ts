import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { CharacterEntity } from '@/types/CharacterEntity';
import { removeFromObjectListById } from '@/utils/utils';

import JohnExile from '@/exampleData/characters/johnExile';

export const useGuildRosterStore = defineStore('guildRoster', () => {
  const people = ref(<CharacterEntity[]>[JohnExile]);
  function addPerson(newPerson: CharacterEntity) {
    const index = people.value.findIndex(el => el.id === newPerson.id);
    if (index === -1) {
      people.value.push(newPerson)
    }
  }
  function removePerson(person: CharacterEntity) {
    removeFromObjectListById(person.id, people.value);
  }

  return { people, addPerson, removePerson}
})
