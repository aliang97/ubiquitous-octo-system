<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="header">
    <div class="logo">
      <div class="icon"></div>
      Project Name
    </div>
    <nav>
      <RouterLink :to="{name: 'home'}">Home</RouterLink>
      <RouterLink :to="{name: 'loadout'}">Loadout</RouterLink>
      <RouterLink :to="{name: 'crafting'}">Crafting</RouterLink>
      <RouterLink :to="{name: 'combat'}">Combat</RouterLink>
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
</style>
