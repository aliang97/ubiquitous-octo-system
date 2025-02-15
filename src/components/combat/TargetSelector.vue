<script setup lang="ts">
import { LocationEntity, MonsterEntity } from '@/scripts/entities';
import { CombatInstance } from '@/scripts/combat';

import ProfileCard from '@/components/characterEntity/ProfileCard.vue';
import { computed } from 'vue';
import { useCombatManagerStore } from '@/stores/combatManager';
import { useGuildRosterStore } from '@/stores/guildRoster';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  locationProfile: LocationEntity;
}>();

const locationId = props.locationProfile.id;
const enemyList = props.locationProfile.enemyList;

const combatManager = useCombatManagerStore();
const currentMonsterId = computed(() => combatManager.combatDictionary[locationId]?.c2.id);

const guildRoster = useGuildRosterStore();
const { heroList } = storeToRefs(guildRoster);

function selectTarget(target: MonsterEntity, isInfinite?: boolean) {
  if (heroList.value[0] === undefined) {
    return;
  }
  const newCombat = new CombatInstance({
    c1: heroList.value[0],
    c2: target,
    location: locationId,
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
        <ProfileCard :profile="enemy" :isHighlighted="currentMonsterId === enemy.id">
          <button v-on:click="selectTarget(enemy)">Fight 1</button>
          <button v-on:click="selectTarget(enemy, true)">Fight infinite</button>
        </ProfileCard>
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
