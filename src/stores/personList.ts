import { ref } from 'vue';
import { defineStore } from "pinia";
import type { Person } from '@/types/Person';
import { removeFromObjectListById } from '@/utils/utils';

export const usePersonListStore = defineStore('personList', () => {
  const people = ref(<Person[]>[]);
  function addPerson(newPerson: Person) {
    const idx = people.value.findIndex((el) => el.id === newPerson.id);
    if (idx === -1) {
      people.value.push(newPerson);
    }
  }
  function removePerson(person: Person) {
    removeFromObjectListById(person.id, people.value);
  }

  return { people, addPerson, removePerson }
})
