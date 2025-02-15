<script setup lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';
// import NotificationToast from '@/components/NotificationToast.vue'
defineProps<{
  sidebarOptions?: {
    name: string;
    label: string;
  }[];
}>();
</script>

<template>
  <main>
    <TheSidebar :options="sidebarOptions" />
    <RouterView />
    <!-- <NotificationToast /> -->
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-grow: 1;
}
</style>
