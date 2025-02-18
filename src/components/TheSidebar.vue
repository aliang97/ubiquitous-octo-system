<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
defineProps<{
  options?: {
    name: string;
    label: string;
  }[];
}>();
const route = useRoute();
const currentRouteName = computed(() => {
  return route.name;
});
</script>

<template>
  <nav>
    <ul>
      <li v-for="option in options" :key="option.name">
        <RouterLink
          :class="{ 'is-selected': currentRouteName === option.name }"
          :to="{ name: option.name }"
        >
          {{ option.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: var(--color-bg-2);
  color: var(--color-text-2);
  width: 260px;
  font-size: 16px;
}

li {
  border-top: 1px solid black;
}

li:last-child {
  border-bottom: 1px solid black;
}

a {
  width: 100%;
  padding: 16px;
  display: flex;
  color: white;
  text-decoration: none;
}

a:hover {
  color: var(--color-text-1);
  background-color: var(--color-bg-4);
}

a.is-selected {
  color: var(--color-text-1);
  background-color: var(--color-bg-3);
}
</style>
