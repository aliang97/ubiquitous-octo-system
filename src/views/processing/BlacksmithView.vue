<script setup lang="ts">
import CurrentAction from '@/components/processing/currentAction/CurrentAction.vue';
import ActionSelector from '@/components/processing/ActionSelector.vue';
</script>

<template>
  <main>
    <CurrentAction />
    <ActionSelector />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
