import { HeroEntity } from '@/scripts/entities';
import { GUILDROSTER_LOCALSTORAGE_KEY } from '@/scripts/util';

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { removeFromObjectListById } from '@/utils/utils';

export const useGuildRosterStore = defineStore('guildRoster', () => {
  let guildRoster: HeroEntity[] = [];
  const localStorageData = localStorage.getItem(GUILDROSTER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    guildRoster = recoveredState.heroList;
  }

  const heroList = ref(guildRoster);

  function addHero(newHero: HeroEntity) {
    const index = heroList.value.findIndex((el) => el.id === newHero.id);
    if (index === -1) {
      heroList.value.push(newHero);
    }
  }

  function removeHero(hero: HeroEntity) {
    removeFromObjectListById(hero.id, heroList.value);
  }

  return { heroList, addHero, removeHero };
});
