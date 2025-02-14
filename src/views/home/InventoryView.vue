<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';
import { computed } from 'vue';
const inventoryStore = useInventoryStore();
const inventory = computed(() => inventoryStore.inventory);

</script>

<template>
  <main>
    These are your items:
    <ul>
      <li v-for="item in inventory" :key="item.itemEntity.id">
        {{ item.itemEntity.name }} : {{ item.quantity }}
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

ul {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

li {
  border: 1px solid white;
  padding: 16px;
}
</style>
