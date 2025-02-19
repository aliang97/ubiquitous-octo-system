<script setup lang="ts">
import { EquippableItemType, ProcessingLocation } from '@/utils/enums';
import ActionCard from './ActionCard.vue';
defineProps<{
  location: ProcessingLocation;
}>();
</script>

<template>
  <div class="ActionSelector">
    <ul>
      <li v-for="type in EquippableItemType" :key="type">
        <ActionCard :itemType="type" :location />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ActionSelector {
  padding: 16px;
}

ul {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
}
</style>
