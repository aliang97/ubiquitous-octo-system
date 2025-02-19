<script setup lang="ts">
import { ProcessingLocation } from '@/utils/enums';
import ProgressBar from './ProgressBar.vue';
import BackgroundRenderer from '@/components/BackgroundRenderer.vue';
import BlacksmithBackground from '@/assets/locations/blacksmith.jpg';
import CraftingOutput from './CraftingOutput.vue';
import AnimatedSprite from './AnimatedSprite.vue';
import { useProcessingManagerStore } from '@/stores/processingManager';
import { computed } from 'vue';

const props = defineProps<{
  location: ProcessingLocation;
}>();

const processingManager = useProcessingManagerStore();
const instance = computed(() => processingManager.instancesByLocation[props.location]);
const amountLoops = computed(() => instance.value?.amountLoops);
const currentLoop = computed(() => instance.value?.currentLoop);
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
        <div class="description">Crafting ({{ currentLoop }} of {{ amountLoops }}) ...</div>
        <CraftingOutput class="CraftingOutput" :location />
      </div>
      <div class="right">
        <AnimatedSprite />
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

.description {
  padding: 4px 0;
  color: var(--t-c-black-2);
}

.CraftingOutput {
  max-width: 280px;
}
</style>
