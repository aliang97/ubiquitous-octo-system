<script setup lang="ts">
import { ProcessingLocation, type EquippableItemType } from '@/utils/enums';
import ItemTemplateCard from './ItemTemplateCard/ItemTemplateCard.vue';
import { templatesByType } from '@/data/items/itemTemplates';
import { useProcessingManagerStore } from '@/stores/processingManager';
import { computed } from 'vue';
import { addItemToProcessingQueue } from '@/utils/processing';

const props = defineProps<{
  itemType: EquippableItemType;
  location: ProcessingLocation;
}>();

const processingManager = useProcessingManagerStore();
const template = templatesByType[props.itemType];
const instance = computed(() => processingManager.instancesByLocation[props.location]);

async function selectAction(quantity: number) {
  addItemToProcessingQueue(props.location, template, quantity);
}

const isHighlighted = computed(() => {
  if (instance.value === undefined || instance.value.processingQueue?.[0] === undefined) {
    return false;
  }
  return instance.value.processingQueue[0].item.id === template.id;
});
</script>

<template>
  <div class="ActionCard" :class="{ 'is-highlighted': isHighlighted }">
    <div class="content">
      <h2>Create {{ template.name }}</h2>
      <div class="cost">
        <div class="costLabel">Ingredients:</div>
        <div class="costItems">1x scrap metal</div>
      </div>
      <ItemTemplateCard class="ItemCard" :template="template" />
    </div>

    <div class="buttonBox">
      <button v-on:click="() => selectAction(1)">1 time</button>
      <button v-on:click="() => selectAction(10)">10 times</button>
      <button v-on:click="() => selectAction(-1)">infinite</button>
    </div>
  </div>
</template>

<style scoped>
.ActionCard {
  background-color: var(--color-bg-3);
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ActionCard.is-highlighted {
  background-color: var(--color-bg-5);
}

.content {
  font-size: 14px;
  padding: 16px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
}

h2 {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.cost {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.costLabel {
  color: var(--color-text-3);
  font-size: 11px;
}

.costItems {
  text-align: center;
  flex-grow: 1;
}

.ItemCard {
  width: 100%;
}

.buttonBox {
  width: 100%;
  display: flex;
  border-top: 1px solid white;
}

button {
  padding: 8px;
  flex-grow: 1;
  color: white;
  text-align: center;
}

button:not(:first-child) {
  border-left: 1px solid white;
}

button:hover {
  cursor: pointer;
  background-color: white;
  color: black;
}
</style>
