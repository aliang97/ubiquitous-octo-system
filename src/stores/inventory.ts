import type { Inventory } from "@/types/Inventory";
import type { ItemEntity } from "@/types/ItemEntity";

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', () => {
  const inventory = ref(<Inventory>{});

  function addItemEntity(newItem: ItemEntity, quantity?: number) {
    const amountToAdd = quantity === undefined ? 1 : quantity;
    if (amountToAdd >= 1) {
      if (inventory.value[newItem.id]) {
        inventory.value[newItem.id].quantity += amountToAdd;
      } else {
        inventory.value[newItem.id] = {
          itemEntity: newItem,
          quantity: amountToAdd,
        }
      }
    }
  }

  function removeItemEntity(oldItem: ItemEntity, quantity?: number) {
    const amountToRemove = quantity === undefined ? 1 : quantity;
    if ((amountToRemove >= 1) && inventory.value[oldItem.id]) {
      const newQuantity = inventory.value[oldItem.id].quantity - amountToRemove
      if (newQuantity <= 0) {
        delete inventory.value[oldItem.id];
      } else {
        inventory.value[oldItem.id].quantity = newQuantity
      }
    }
  }

  function removeItemById(id: string, quantity?: number | 'all') {
    if (inventory.value[id]) {
      let newQuantity = 0;
      if (quantity === undefined) {
        newQuantity = inventory.value[id].quantity - 1;
      } else if (quantity === 'all') {
        newQuantity = 0;
      } else {
        newQuantity = inventory.value[id].quantity - quantity;
      }

      if (newQuantity <= 0) {
        delete inventory.value[id];
      } else {
        inventory.value[id].quantity = newQuantity;
      }

    }
  }
  return {inventory, addItemEntity, removeItemEntity, removeItemById}
})
