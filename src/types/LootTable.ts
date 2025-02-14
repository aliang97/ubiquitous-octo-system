import type { ItemEntity } from "@/types/ItemEntity"

export type LootTableEntry = {
  itemEntity: ItemEntity,
  quantity: number,
  chance: number
}

export type LootTable = LootTableEntry[];
