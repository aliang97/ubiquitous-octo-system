import { HeroEntity } from '@/scripts/entities';
import { RECRUITMENTROSTER_LOCALSTORAGE_KEY } from '@/scripts/util';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { generateHero } from '@/data/heros';
import { useGuildRosterStore } from './guildRoster';

export const useRecruitmentRosterStore = defineStore('recruitmentRoster', () => {
  let recruitmentRoster: HeroEntity[] = [];
  const localStorageData = localStorage.getItem(RECRUITMENTROSTER_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    recruitmentRoster = recoveredState.heroList;
  } else {
    // Generate the first set of heros
    [...Array(4)].forEach(() => {
      recruitmentRoster.push(generateHero({}));
    });
  }

  const heroList = ref(recruitmentRoster);

  function randomize(quantity: number) {
    // Delete all heros
    heroList.value = [];
    // Generate [quantity] new heros
    [...Array(quantity)].forEach(() => {
      heroList.value.push(generateHero({}));
    });
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

  return { heroList, randomize, recruitHero };
});
