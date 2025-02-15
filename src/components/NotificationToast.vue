<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory'
const inventoryStore = useInventoryStore()

inventoryStore.$subscribe((mutation, state) => {
  console.log('inventory changed!')
  console.log(mutation)
  Object.entries(state.inventory).forEach(([k, v]) => console.log(k + ': ' + v))
})
</script>

<template>
  <div class="NotificationToast">
    <div class="card">Notifaction Toast</div>
  </div>
</template>

<style scoped>
.NotificationToast {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.card {
  background-color: black;
  color: white;
  padding: 16px;
  border-radius: 16px;
}
</style>
