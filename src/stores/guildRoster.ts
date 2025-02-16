import type { HeroEntity } from '@/types';
import { GUILDROSTER_LOCALSTORAGE_KEY } from '@/utils';

import { ref } from 'vue';
import { defineStore } from 'pinia';

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

  function removeHero(h: HeroEntity) {
    // Remove Hero from the recruitment roster
    const i = heroList.value.findIndex((el) => el.id === h.id);
    if (i === -1) {
      console.error(
        `Error recruiting hero (id: ${h.id}) which could not be found in the recruitment list`,
      );
      return;
    }
    heroList.value.splice(i, 1);
  }

  return { heroList, addHero, removeHero };
});
