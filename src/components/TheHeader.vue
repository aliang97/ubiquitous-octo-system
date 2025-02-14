<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
// TODO: need to compute route parent because this doesn't work if we're at /home/inventory for example
const currentRouteName = computed(() => {
  return route.name;
})
const tabs = [
  {
    name: 'home',
    label: 'Home',
  },
  {
    name: 'loadout',
    label: 'Loadout',
  },
  {
    name: 'crafting',
    label: 'Crafting',
  },
  {
    name: 'combat',
    label: 'Combat',
  },
]
</script>

<template>
  <header class="header">
    <div class="logo">
      <div class="icon"></div>
      Project Name
    </div>
    <nav>
      <div v-for="tab in tabs" :key="tab.name">
        <RouterLink :to="tab" :class="{'is-selected': tab.name === currentRouteName}">{{ tab.label }}</RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding: 16px;
  background-color: var(--color-background-mute);
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  display: flex;
  gap: 16px;
  font-size: 16px;
  align-items: center;
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
  color: rgba(180, 180, 180, 1);
}

a.is-selected {
  color: white
}
</style>
