import type { CharacterEntity } from "@/types/CharacterEntity";

export type CombatLocationId = 'forest' | 'cave';

export type CombatInstance = {
  character1: CharacterEntity,
  character2: CharacterEntity,
  location: CombatLocationId,
  clockId?: number,
  tick?: number,
}
