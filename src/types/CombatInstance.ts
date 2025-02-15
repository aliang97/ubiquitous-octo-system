import type { CharacterEntity } from "@/types/CharacterEntity";

export type CombatLocationId = 'loc-forest' | 'loc-cave';

export type CombatInstance = {
  character1: CharacterEntity,
  character2: CharacterEntity,
  location: CombatLocationId,
  clockId?: number,
  tick?: number,
}
