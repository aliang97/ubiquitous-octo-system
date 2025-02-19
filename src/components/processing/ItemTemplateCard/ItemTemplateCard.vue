<script setup lang="ts">
import type { EquippableItemTemplate } from '@/types';
import ItemLevelRange from './ItemLevelRange.vue';
import QualityRange from './QualityRange.vue';
import ItemRequirements from './ItemRequirements.vue';
import ImplicitAffixes from './ImplicitAffixes.vue';

const props = defineProps<{
  template: EquippableItemTemplate;
}>();
</script>

<template>
  <div class="ItemTemplateCard">
    <div class="imageSpotlight">
      <img :src="template.spriteSrc" />
    </div>
    <div class="highlight">
      <div class="info">
        <ItemLevelRange v-bind="props" />
        <QualityRange v-bind="props" />
        <ImplicitAffixes class="affixes" v-bind="props" />
        <ItemRequirements v-bind="props" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ItemTemplateCard {
  position: relative;
  min-height: 64px;
  padding-right: 16px;
}

.highlight {
  border-top: 6px solid var(--color-rarity-common);
  border-right: 6px solid var(--color-bg-2);
  background-color: var(--color-bg-2);
  border-top-left-radius: 32px;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  padding-left: 72px;
}

.imageSpotlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--color-rarity-common);
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.affixes {
  margin: 6px 0;
  padding: 6px 0;
  border-top: 1px solid var(--color-emph-1);
  border-bottom: 1px solid var(--color-emph-1);
}
</style>
