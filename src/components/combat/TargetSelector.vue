<script setup lang="ts">
import type { CharacterEntity } from '@/types/CharacterEntity';
import type { CombatInstance, CombatLocationId } from '@/types/CombatInstance';

import Slime from '@/data/enemies/Slime';
import Crook from '@/data/enemies/Crook';
import MafiaBoss from '@/data/enemies/MafiaBoss';
import ProfileCard from '@/components/characterEntity/ProfileCard.vue';
import JohnExile from '@/exampleData/characters/johnExile.ts';
import { computed } from 'vue';
import { useOngoingCombatStore } from '@/stores/ongoingCombat.ts';

const props = defineProps<{
  locationId: CombatLocationId,
}>()

const ongoingCombat = useOngoingCombatStore();
const currentCombat = computed(() => ongoingCombat.getCombatByLocationId(props.locationId));

const enemyList = [Slime, Crook, MafiaBoss];
function selectTarget(target: CharacterEntity) {
  const newCombatInstance: CombatInstance = {
    character1: JohnExile,
    character2: target,
    location: props.locationId,
  };
  ongoingCombat.removeCombatByLocationId(props.locationId);
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
          :class="{'is-targeted': combatContainsCharacter(currentCombat, enemy)}"
          :profile="enemy"
          v-on:click="selectTarget(enemy)"
        />
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

.is-targeted {
  background-color: red;
}
</style>
