<script setup lang="ts">
import type { RenderQueue } from '@/types/RenderQueue';
defineProps<{
  renderQueue: RenderQueue,
}>()
</script>

<template>
<div class="DeadeyeRenderer">
  <div class="sprite">
    John Exile
  </div>
  <template v-for="instruction in renderQueue" :key="instruction.id">
    <div v-if="instruction.command === 'takeHit'" class="test target-self float-up-200ms">Ouch!</div>
    <div v-if="instruction.command === 'sendHit'" class="test target-enemy float-up-200ms">Boom!</div>
  </template>
</div>
</template>

<style scoped>
.DeadeyeRenderer {
  position: absolute;
}

.sprite {
  width: 40px;
  height: 80px;
  background-color: navy;
}

.test {
  color: black;
}

.target-self {
  position: absolute;
  top: -10px;
  left: 0;
}

.target-enemy {
  position: absolute;
  top: -80px;
  right: -600px;
}

.float-up-200ms {
  animation-duration: 0.8s;
  animation-name: float-up;
}

@keyframes float-up {
  from {
    translate: 0 0;
  }

  to {
    translate: 0 -100%;
  }
}
</style>
