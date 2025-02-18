<script setup lang="ts">
import type { EquippableItemTemplate } from '@/types';
import { AffixType } from '@/utils/enums';
import {
  affixLabelPrettifier,
  affixLabelPrettifierForDamageRanges,
} from '@/utils/items/affixLabelPrettifier';

const props = defineProps<{
  template: EquippableItemTemplate;
}>();

const itemLevelRange = `(${props.template.itemLevel.min}-${props.template.itemLevel.max})`;
const qualityRange = `(${props.template.quality.min}-${props.template.quality.max})`;
const affixLabels: string[] = [];
Object.entries(props.template.implicitAffixes || {}).forEach(([affixType, affix]) => {
  if (affixType === AffixType.HitDamageMinBase) {
    affixLabels.push(
      affixLabelPrettifierForDamageRanges(
        affixType,
        affix,
        props.template.implicitAffixes?.[AffixType.HitDamageMaxBase],
      ),
    );
  } else if (affixType === AffixType.HitDamageMaxBase) {
    // Do nothing
  } else {
    affixLabels.push(affixLabelPrettifier(affixType as AffixType, affix));
  }
});
const requirements: string[] = [];
Object.entries(props.template.requirements).forEach(([stat, amount]) => {
  if (amount > 0) {
    requirements.push(`${amount} ${stat.slice(0, 3)}`);
  }
});
</script>

<template>
  <div class="ItemTemplateCard">
    <div class="imageSpotlight">
      <img :src="template.spriteSrc" />
    </div>
    <div class="highlight">
      <div class="info">
        <div class="itemLevel">Item Level: {{ itemLevelRange }}</div>
        <div class="quality">Quality: {{ qualityRange }}%</div>
        <div v-for="affixLabel in affixLabels" :key="affixLabel" class="implicit">
          {{ affixLabel }}
        </div>
        <div class="requirements">Requires: {{ requirements.join(', ') }}</div>
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

.itemLevel {
  color: var(--color-sub);
}

.quality {
  color: var(--color-sub);
  padding-bottom: 6px;
  border-bottom: 1px solid var(--color-emph-1);
  margin-bottom: 6px;
}

.requirements {
  color: var(--color-sub);
  margin-top: 6px;
  border-top: 1px solid var(--color-emph-1);
  padding-top: 6px;
}
</style>
