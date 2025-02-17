<script setup lang="ts">
import type { Location, MonsterEntity, CombatInstance } from '@/types';

import MonsterCard from '../cards/MonsterCard.vue';
import { computed } from 'vue';
import { useCombatManagerStore } from '@/stores/combatManager';
import { useGuildRosterStore } from '@/stores/guildRoster';
import { storeToRefs } from 'pinia';
import { generateCombat } from '@/utils';

const props = defineProps<{
  location: Location;
}>();

const locationId = props.location.id;
const enemyList = props.location.enemyList;

const combatManager = useCombatManagerStore();
const currentMonsterId = computed(() => combatManager.combatsByLocationId[locationId]?.m1?.id);

const guildRoster = useGuildRosterStore();
const { heroList } = storeToRefs(guildRoster);

function selectTarget(target: MonsterEntity, isInfinite?: boolean) {
  if (heroList.value[0] === undefined) {
    console.error('Error selecting combat target: you have no selected hero');
    return;
  }
  const newCombat: CombatInstance = generateCombat({
    h1: heroList.value[0],
    m1: target,
    locationId: locationId,
    loop: isInfinite,
  });
  combatManager.removeCombatByLocation(locationId);
  combatManager.addCombat(newCombat);
}
</script>

<template>
  <div class="window">
    <ul>
      <li v-for="enemy in enemyList" :key="enemy.id">
        <MonsterCard :monsterEntity="enemy" :isHighlighted="currentMonsterId === enemy.id">
          <button v-on:click="selectTarget(enemy)">Fight 1</button>
          <button v-on:click="selectTarget(enemy, true)">Fight infinite</button>
        </MonsterCard>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
