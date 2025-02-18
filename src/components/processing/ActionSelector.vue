<script setup lang="ts">
import { EquippableItemType } from '@/utils/enums';
import ActionCard from './ActionCard.vue';
</script>

<template>
  <div class="ActionSelector">
    <ul>
      <li v-for="type in EquippableItemType" :key="type">
        <ActionCard :itemType="type" />
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
