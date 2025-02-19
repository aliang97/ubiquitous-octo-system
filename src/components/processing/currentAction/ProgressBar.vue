<script setup lang="ts">
import { useProcessingManagerStore } from '@/stores/processingManager';
import { ProcessingLocation } from '@/utils/enums';
import { ref, computed, watch } from 'vue';
import { msToTicks } from '@/utils';

const props = defineProps<{
  location: ProcessingLocation;
}>();

const processingManager = useProcessingManagerStore();
const instance = computed(() => processingManager.instancesByLocation[props.location]);
const progressPercent = computed(() => {
  if (instance.value === undefined) {
    return 0;
  }
  const recipeDuration = msToTicks(instance.value.processingQueue[0]?.item.craftingTimeMS) || 1;
  const remainingTicks = instance.value.ticksUntilNextAction;

  return Math.round(((recipeDuration - remainingTicks) / recipeDuration) * 100);
});

const cssWidth = computed(() => `${progressPercent.value}%`);

const mode = ref(true);
const rotationIndex = ref(0);
watch(progressPercent, (newValue) => {
  if (newValue === 0) {
    mode.value = !mode.value;
    rotationIndex.value = (rotationIndex.value + 1) % 6;
  }
});

// Love some janky css animation
const cssClassRotation = [
  ['increasing green', 'background black', 'hidden'],
  ['background green', 'hidden', 'increasing black'],
  ['hidden', 'increasing green', 'background-black'],
  ['increasing black', 'background green', 'hidden'],
  ['background black', 'hidden', 'increasing green'],
  ['hidden', 'increasing black', 'background green'],
];
const cssClass1 = computed(() => cssClassRotation[rotationIndex.value][0]);
const cssClass2 = computed(() => cssClassRotation[rotationIndex.value][1]);
const cssClass3 = computed(() => cssClassRotation[rotationIndex.value][2]);
</script>

<template>
  <div class="ProgressBar black">
    <div class="internal" :class="cssClass1"></div>
    <div class="internal" :class="cssClass2"></div>
    <div class="internal" :class="cssClass3"></div>
  </div>
</template>

<style scoped>
.ProgressBar {
  position: relative;
  width: 100%;
  height: 10px;
  border-top: 1px solid var(--color-sub);
  border-bottom: 1px solid var(--color-sub);
}

.black {
  background-color: var(--color-bg-1);
  background: linear-gradient(to top, var(v-bind(--color-bg-1)), var(--color-bg-4));
}

.green {
  background-color: var(--t-c-green);
  background: linear-gradient(to top, var(--t-c-green), #1cf585);
}

.red {
  background-color: red;
}

.internal {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  visibility: hidden;
}

.increasing {
  z-index: 10;
  visibility: visible;
  transition: all 0.1s ease;
  width: v-bind(cssWidth);
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.background {
  visibility: visible;
  width: 100%;
}

.hidden {
  opacity: 0;
  width: 0;
}
</style>
