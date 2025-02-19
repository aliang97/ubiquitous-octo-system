<script setup lang="ts">
import CurrentAction from '@/components/processing/currentAction/CurrentAction.vue';
import ActionSelector from '@/components/processing/ActionSelector.vue';
import { ProcessingLocation } from '@/utils/enums';
</script>

<template>
  <main>
    <CurrentAction :location="ProcessingLocation.Blacksmith" />
    <ActionSelector :location="ProcessingLocation.Blacksmith" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
</style>
