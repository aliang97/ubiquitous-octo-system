import type { HeroEntity } from '@/types';
import { useGuildRosterStore } from '@/stores/guildRoster';
import { RECRUITMENTROSTER_LOCALSTORAGE_KEY } from '@/utils';
import { generateHero } from '@/utils/generators';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { readStateFromLocalStorage } from '@/utils';

export const useRecruitmentRosterStore = defineStore('recruitmentRoster', () => {
  // Check if existing data in localStorage, otherwise generate 4 new recruits
  let _tempData: HeroEntity[] = [];
  const _recoveredData = readStateFromLocalStorage(RECRUITMENTROSTER_LOCALSTORAGE_KEY);
  if (_recoveredData) {
    _tempData = _recoveredData;
  } else {
    generateNewHeros(4, _tempData);
  }

  const _data = ref(_tempData);

  function randomize(quantity: number) {
    // Delete all heros
    _data.value = [];
    generateNewHeros(quantity, _data.value);
  }

  function recruitHero(h: HeroEntity) {
    // Remove Hero from the recruitment roster
    const i = _data.value.findIndex((el) => el.id === h.id);
    if (i === -1) {
      console.error(
        `Error recruiting hero (id: ${h.id}) which could not be found in the recruitment list`,
      );
      return;
    }
    _data.value.splice(i, 1);

    // Add hero to the guild roster
    const guildRoster = useGuildRosterStore();
    guildRoster.addHero(h);
  }

  function generateNewHeros(quantity: number, list: HeroEntity[]) {
    [...Array(quantity)].forEach(() => {
      list.push(generateHero());
    });
  }

  function getAllHeroes() {
    return _data.value;
  }

  return {
    _data,
    randomize,
    recruitHero,
    getAllHeroes,
  };
});
