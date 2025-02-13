<script setup lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';
defineProps<{
  sidebarOptions?: {
    name: string,
    label: string,
  }[],
}>()
</script>

<template>
  <main>
    <TheSidebar :options="sidebarOptions"/>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-grow: 1;
}
</style>
