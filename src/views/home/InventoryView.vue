<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';
import { computed } from 'vue';
const inventoryStore = useInventoryStore();
const materials = computed(() => inventoryStore._data.materials);
const equipment = computed(() => inventoryStore._data.equipment);
const deleteAll = () => {
  [...equipment.value].forEach((item) => inventoryStore.removeEquipmentById(item.id));
};
</script>

<template>
  <main>
    These are your materials:
    <ul>
      <li v-for="material in materials" :key="material.item.id">
        {{ material.item.name }} : {{ material.quantity }}
      </li>
    </ul>

    These are your equipments:
    <button v-on:click="() => deleteAll()">Delete all</button>
    <ul>
      <li v-for="item in equipment" :key="item.id">
        {{ item.name }}
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
