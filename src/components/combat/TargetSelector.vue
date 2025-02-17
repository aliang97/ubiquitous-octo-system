<script setup lang="ts">
import type { Location, CombatInstance } from '@/types';
import MonsterCard from '@/components/cards/MonsterCard.vue';
import { useCombatManagerStore } from '@/stores/combatManager';
import { useGuildRosterStore } from '@/stores/guildRoster';
import { EnemyType } from '@/utils/enums';
import { generateCombat, generateEnemy } from '@/utils/generators';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const props = defineProps<{
  location: Location;
}>();

const locationId = props.location.id;
const enemyList = props.location.enemyList;

const combatManager = useCombatManagerStore();
const currentMonsterType = computed(
  () => combatManager.combatsByLocationId[locationId]?.m1?.enemyType,
);

const guildRoster = useGuildRosterStore();
const { heroList } = storeToRefs(guildRoster);

function selectTarget(target: EnemyType, isInfinite?: boolean) {
  if (heroList.value[0] === undefined) {
    console.error('Error selecting combat target: you have no selected hero');
    return;
  }
  const newCombat: CombatInstance = generateCombat({
    h1: heroList.value[0],
    m1: generateEnemy({ type: target }),
    locationId: locationId,
    loop: isInfinite,
  });
  combatManager.removeCombatByLocation(locationId, true, () => {
    combatManager.addCombat(newCombat);
  });
}
</script>

<template>
  <div class="window">
    <ul>
      <li v-for="enemyType in enemyList" :key="enemyType">
        <MonsterCard :enemyType="enemyType" :isHighlighted="currentMonsterType === enemyType">
          <button v-on:click="selectTarget(enemyType)">Fight 1</button>
          <button v-on:click="selectTarget(enemyType, true)">Fight infinite</button>
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
