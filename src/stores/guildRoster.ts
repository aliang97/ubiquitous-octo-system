import type { CharacterEntity } from '@/types/CharacterEntity';

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { removeFromObjectListById } from '@/utils/utils';
import { GUILDROSTER_LOCALSTORAGE_KEY } from '@/utils/utils';

export const useGuildRosterStore = defineStore('guildRoster', () => {
  let guildRoster: CharacterEntity[] = [];
  const localStorageData = localStorage.getItem(GUILDROSTER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const oldState = JSON.parse(localStorageData);
    guildRoster = oldState.people;
  }

  const people = ref(guildRoster);

  function addPerson(newPerson: CharacterEntity) {
    const index = people.value.findIndex((el) => el.id === newPerson.id);
    if (index === -1) {
      people.value.push(newPerson);
    }
  }

  function removePerson(person: CharacterEntity) {
    removeFromObjectListById(person.id, people.value);
  }

  return { people, addPerson, removePerson };
});
