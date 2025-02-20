import type { ItemEntity, Inventory, ItemWithQuantity, EquippableItemEntity } from '@/types';

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { INVENTORY_LOCALSTORAGE_KEY } from '@/utils';

export const useInventoryStore = defineStore('inventory', () => {
  let i: Inventory = {
    materials: {},
    equipment: [],
    maxEquipmentCount: 20,
  };
  const localStorageData = localStorage.getItem(INVENTORY_LOCALSTORAGE_KEY);
  if (localStorageData) {
    const recoveredState = JSON.parse(localStorageData);
    if (recoveredState.inventory) {
      i = recoveredState.inventory;
    }
  }

  const inventory = ref(i);

  function addMaterial(newMaterial: ItemEntity, quantity?: number) {
    const amountToAdd = quantity === undefined ? 1 : quantity;
    if (amountToAdd >= 1) {
      if (inventory.value.materials[newMaterial.id]) {
        inventory.value.materials[newMaterial.id].quantity += amountToAdd;
      } else {
        inventory.value.materials[newMaterial.id] = {
          item: newMaterial,
          quantity: amountToAdd,
        };
      }
    }
  }

  function addEquipment(newEquipment: EquippableItemEntity) {
    if (!canAddEquipment()) {
      console.error('Error: inventory is full');
      return;
    }
    inventory.value.equipment.push(newEquipment);
  }

  function canAddEquipment() {
    return inventory.value.equipment.length < inventory.value.maxEquipmentCount;
  }

  function hasMaterial(item: ItemEntity, quantity?: number) {
    return inventory.value.materials[item.id]?.quantity >= (quantity ? quantity : 1);
  }

  function hasMaterials(materials: ItemWithQuantity[]) {
    for (const material of materials) {
      if (!hasMaterial(material.item, material.quantity)) {
        return false;
      }
    }

    return true;
  }

  // Assumes already checked that the material exists in the correct quantity
  function removeMaterial(item: ItemEntity, quantity?: number) {
    const newQuantity = inventory.value.materials[item.id].quantity - (quantity ? quantity : 1);
    if (newQuantity <= 0) {
      delete inventory.value.materials[item.id];
    } else {
      inventory.value.materials[item.id].quantity = newQuantity;
    }
  }

  function removeMaterials(materials: ItemWithQuantity[]) {
    // Check if operation is valid (all materials are present)
    if (!hasMaterials(materials)) {
      console.error('Error: lacking materials to remove');
      return;
    }

    // Then remove
    materials.forEach((material) => removeMaterial(material.item, material.quantity));
  }

  function removeEquipmentById(id: string) {
    const targetIndex = inventory.value.equipment.findIndex((el) => el.id === id);
    if (targetIndex === undefined) {
      console.error(`Error: equipment ${id} does not exist`);
      return;
    }

    inventory.value.equipment.splice(targetIndex, 1);
  }

  return {
    inventory,
    addMaterial,
    hasMaterials,
    removeMaterials,
    canAddEquipment,
    addEquipment,
    removeEquipmentById,
  };
});
