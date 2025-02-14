<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
defineProps<{
  options?: {
    name: string,
    label: string,
  }[],
}>()
const route = useRoute();
const currentRouteName = computed(() => {
  return route.name;
})
</script>

<template>
  <nav>
    <ul>
      <li v-for="option in options" :key="option.name">
        <RouterLink :class="{ 'is-selected': currentRouteName === option.name }" :to="{name: option.name}">
          {{ option.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: var(--color-background-mute);
  width: 260px;
}

li {
  border-top: 1px solid black;
}

li:last-child {
  border-bottom: 1px solid black;
}

a.is-selected {
  background-color: var(--color-background-soft);
}

a {
  width: 100%;
  padding: 16px;
  display: flex;
  color: white;
  text-decoration: none;
}
</style>
