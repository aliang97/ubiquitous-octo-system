<script setup lang="ts">
import type { CharacterEntity } from '@/types/CharacterEntity';
import type { CombatInstance, CombatLocationId } from '@/types/CombatInstance';
import type { LocationEntity } from '@/types/LocationEntity';

import ProfileCard from '@/components/characterEntity/ProfileCard.vue';
import JohnExile from '@/data/characters/johnExile';
import { computed } from 'vue';
import { useOngoingCombatStore } from '@/stores/ongoingCombat.ts';

const props = defineProps<{
  locationProfile: LocationEntity;
}>();

const locationId = props.locationProfile.id as CombatLocationId;
const enemyList = props.locationProfile.enemyList;

const ongoingCombat = useOngoingCombatStore();
const currentCombat = computed(() => ongoingCombat.getCombatByLocationId(locationId));
const currentMonsterId = computed(() => currentCombat.value?.character2.id);

function selectTarget(target: CharacterEntity, isInfinite?: boolean) {
  const newCombatInstance: CombatInstance = {
    character1: JohnExile,
    character2: target,
    location: locationId,
    loop: isInfinite,
  };
  ongoingCombat.removeCombatByLocationId(locationId);
  ongoingCombat.addCombat(newCombatInstance);
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
