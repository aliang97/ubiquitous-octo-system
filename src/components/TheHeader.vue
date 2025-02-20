<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import {
  COMBATMANAGER_LOCALSTORAGE_KEY,
  GUILDROSTER_LOCALSTORAGE_KEY,
  RECRUITMENTROSTER_LOCALSTORAGE_KEY,
  INVENTORY_LOCALSTORAGE_KEY,
} from '@/utils';
import { useInventoryStore } from '@/stores/inventory';
import { ScrapMetal, SlimeCore } from '@/data/items/items';

const route = useRoute();
const router = useRouter();

// TODO: need to compute route parent because this doesn't work if we're at /home/inventory for example
const currentRouteName = computed(() => {
  return route.name;
});
const tabs = router.options.routes.map((el) => ({
  pathName: el.children?.[0]?.name || 'undef',
  label: (el.props as Record<string, string>)?.tabLabel || el.children?.[0]?.name || 'undef',
}));

const clearLocalstorage = () => {
  localStorage.removeItem(COMBATMANAGER_LOCALSTORAGE_KEY);
  localStorage.removeItem(GUILDROSTER_LOCALSTORAGE_KEY);
  localStorage.removeItem(RECRUITMENTROSTER_LOCALSTORAGE_KEY);
  localStorage.removeItem(INVENTORY_LOCALSTORAGE_KEY);
};

const inventoryStore = useInventoryStore();

const addMaterials = () => {
  inventoryStore.addMaterial(SlimeCore, 999);
  inventoryStore.addMaterial(ScrapMetal, 999);
};
</script>

<template>
  <header class="header">
    <div class="logo">
      <div class="icon"></div>
      Project Name
    </div>
    <nav>
      <div v-for="tab in tabs" :key="tab.pathName">
        <RouterLink
          :to="{ name: tab.pathName }"
          :class="{ 'is-selected': tab.pathName === currentRouteName }"
          >{{ tab.label }}</RouterLink
        >
      </div>
    </nav>
    <button :style="{ color: 'white' }" v-on:click="() => addMaterials()">Add Materials</button>
    <button :style="{ color: 'white' }" v-on:click="() => clearLocalstorage()">
      Clear Localstorage
    </button>
  </header>
</template>

<style scoped>
.header {
  padding: 16px;
  background-color: var(--color-bg-2);
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
}

.logo {
  display: flex;
  gap: 16px;
  align-items: center;
  color: var(--color-text-1);
}

.icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: palegreen;
}

nav {
  flex-grow: 1;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: start;
}

a {
  text-decoration: none;
  color: var(--color-text-3);
}

a.is-selected {
  color: var(--color-text-1);
}

a:hover {
  cursor: pointer;
  color: var(--color-text-2);
}
</style>
