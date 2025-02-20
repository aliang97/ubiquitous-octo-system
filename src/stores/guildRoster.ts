import type { HeroEntity } from '@/types';
import { GUILDROSTER_LOCALSTORAGE_KEY, readStateFromLocalStorage } from '@/utils';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGuildRosterStore = defineStore('guildRoster', () => {
  let guildRoster: HeroEntity[] = [];
  const _recoveredData = readStateFromLocalStorage(GUILDROSTER_LOCALSTORAGE_KEY);
  if (_recoveredData) {
    guildRoster = _recoveredData;
  }

  const _data = ref(guildRoster);

  function addHero(newHero: HeroEntity) {
    const index = _data.value.findIndex((el) => el.id === newHero.id);
    if (index === -1) {
      _data.value.push(newHero);
    }
  }

  function removeHero(h: HeroEntity) {
    // Remove Hero from the recruitment roster
    const i = _data.value.findIndex((el) => el.id === h.id);
    if (i === -1) {
      console.error(
        `Error recruiting hero (id: ${h.id}) which could not be found in the recruitment list`,
      );
      return;
    }
    _data.value.splice(i, 1);
  }

  function getAllHeroes() {
    return _data.value;
  }

  return { _data, addHero, removeHero, getAllHeroes };
});
