import type { CharacterEntity } from "@/types/CharacterEntity";
import type { RenderQueue } from "@/types/RenderQueue";

export type CombatLocationId = 'loc-forest' | 'loc-cave';

export type CombatInstance = {
  character1: CharacterEntity,
  c1RenderQueue: RenderQueue,
  character2: CharacterEntity,
  c2RenderQueue: RenderQueue,
  location: CombatLocationId,
  clockId?: number,
  tick?: number,
}
