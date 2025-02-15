<script setup lang="ts">
import type { CharacterEntity } from '@/types/CharacterEntity';
import type { CombatInstance, CombatLocationId } from '@/types/CombatInstance';
import type { LocationEntity } from '@/types/LocationEntity';

import ProfileCard from '@/components/characterEntity/ProfileCard.vue';
import JohnExile from '@/data/characters/johnExile';
import { computed } from 'vue';
import { useOngoingCombatStore } from '@/stores/ongoingCombat.ts';

const props = defineProps<{
  locationProfile: LocationEntity,
}>()

const locationId = props.locationProfile.id as CombatLocationId;
const ongoingCombat = useOngoingCombatStore();
const currentCombat = computed(() => ongoingCombat.getCombatByLocationId(locationId));
const enemyList = props.locationProfile.enemyList;

function selectTarget(target: CharacterEntity, infinite?: boolean) {
  const newCombatInstance: CombatInstance = {
    character1: JohnExile,
    character2: target,
    location: locationId,
    loop: infinite,
  };
  ongoingCombat.removeCombatByLocationId(locationId);
  ongoingCombat.addCombat(newCombatInstance);
}

function combatContainsCharacter(combat: CombatInstance | undefined, character: CharacterEntity) {
  if (!combat) { return false; }
  if (combat.character1.id === character.id) { return true; }
  if (combat.character2.id === character.id) { return true; }
  return false;
}
</script>

<template>
  <div class="window">
    <ul>
      <li v-for="enemy in enemyList" :key="enemy.id">
        <ProfileCard
          :profile="enemy"
          :isHighlighted="combatContainsCharacter(currentCombat, enemy)"
        >
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
