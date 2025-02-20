<script setup lang="ts">
import { ProcessingLocation } from '@/utils/enums';
import ProgressBar from './ProgressBar.vue';
import BackgroundRenderer from '@/components/rendering/BackgroundRenderer.vue';
import BlacksmithBackground from '@/assets/locations/blacksmith.jpg';
import CraftingQueue from './CraftingQueue.vue';
import BlacksmithRenderer from './BlacksmithRenderer.vue';

defineProps<{
  location: ProcessingLocation;
}>();
</script>

<template>
  <div class="CurrentAction">
    <BackgroundRenderer
      class="BackgroundRenderer"
      :imageSrc="BlacksmithBackground"
      backgroundPosition="center center"
    />
    <div class="top">
      <div class="left">
        <h1>Blacksmith</h1>
        <CraftingQueue :location />
      </div>
      <div class="right">
        <BlacksmithRenderer />
      </div>
    </div>
  </div>
  <ProgressBar :location />
</template>

<style scoped>
.CurrentAction {
  position: relative;
  width: 100%;
  height: 200px;
}

.BackgroundRenderer .background {
  background-position: top center;
}

.top {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.left {
  padding: 16px;
  flex-grow: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.right {
  flex-grow: 1;
  max-width: 200px;
  margin-right: 64px;
}

h1 {
  color: var(--t-c-black-1);
  font-size: 32px;
  font-weight: 600;
  line-height: 1;
  border-bottom: 3px solid var(--t-c-black-1);
}

.CraftingOutput {
  max-width: 280px;
}
</style>
