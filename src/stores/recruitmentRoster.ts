import { ref } from 'vue';
import { defineStore } from 'pinia';
import { generateHero, RECRUITMENTROSTER_LOCALSTORAGE_KEY } from '@/utils';
import { useGuildRosterStore } from './guildRoster';
import type { HeroEntity } from '@/types';

export const useRecruitmentRosterStore = defineStore('recruitmentRoster', () => {
  let recruitmentRoster: HeroEntity[] = [];
  const localStorageData = localStorage.getItem(RECRUITMENTROSTER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    if (recoveredState.heroList) {
      recruitmentRoster = recoveredState.heroList;
    }
  } else {
    generateNewHeros(4, recruitmentRoster);
  }

  const heroList = ref(recruitmentRoster);

  function randomize(quantity: number) {
    // Delete all heros
    heroList.value = [];
    generateNewHeros(quantity, heroList.value);
  }

  function recruitHero(h: HeroEntity) {
    // Remove Hero from the recruitment roster
    const i = heroList.value.findIndex((el) => el.id === h.id);
    if (i === -1) {
      console.error(
        `Error recruiting hero (id: ${h.id}) which could not be found in the recruitment list`,
      );
      return;
    }
    heroList.value.splice(i, 1);

    // Add hero to the guild roster
    const guildRoster = useGuildRosterStore();
    guildRoster.addHero(h);
  }

  function generateNewHeros(quantity: number, list: HeroEntity[]) {
    [...Array(quantity)].forEach(() => {
      list.push(generateHero());
    });
  }

  return { heroList, randomize, recruitHero };
});
