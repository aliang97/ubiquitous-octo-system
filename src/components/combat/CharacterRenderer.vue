<script setup lang="ts">
import AnimatedSprite from '@/components/combat/AnimatedSprite.vue';
import CSSAnimation from '@/components/combat/CSSAnimation.vue';
import { RenderableEntity } from '@/scripts/entities';
import { computed } from 'vue';
const props = defineProps<{
  character: RenderableEntity;
}>();
const DEBUG = false;
const renderList = computed(() => props.character.renderList);
const spriteProps = computed(() => props.character.animations?.['idle']);
const debugPrintRenderList = computed(() =>
  (renderList.value || []).map((el) => el.command).join(', '),
);
const animateDie = computed(
  () => (renderList.value || []).filter((el) => el.command === 'die').length > 0,
);
</script>

<template>
  <div class="CharacterRenderer">
    <div v-if="DEBUG" class="debug">{{ debugPrintRenderList }}</div>

    <div class="character">
      <div :class="animateDie ? 'die' : 'alive'">
        <template v-if="spriteProps">
          <AnimatedSprite v-bind="spriteProps" />
        </template>
        <template v-else>
          <div class="PLACEHOLDER_SPRITE">{{ character.name }}</div>
        </template>
      </div>
    </div>
    <template v-for="instruction in renderList" :key="instruction.id">
      <CSSAnimation
        v-if="instruction.command === 'takeHit'"
        class="target-self"
        animationId="float-up"
        :animationDurationMS="800"
      >
        <div class="takeHit">-{{ (instruction.params as any).damage }}</div>
      </CSSAnimation>
    </template>
  </div>
</template>

<style scoped>
.CharacterRenderer {
  position: absolute;
}

.character {
  overflow: hidden;
}

.debug {
  color: black;
  position: absolute;
  top: -30px;
  left: 0;
  width: 200px;
}

.PLACEHOLDER_SPRITE {
  height: 80px;
  width: 80px;
  background-color: navy;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.alive {
  transition: transform 0.8s ease;
  transform-origin: center center;
  transform: none;
}

.die {
  transition: transform 0.8s ease;
  transform: translateY(100%);
}

.takeHit {
  color: black;
  font-weight: 700;
}

.target-self {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
