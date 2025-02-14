import { useOngoingCombatStore } from "@/stores/ongoingCombat";
import type { CharacterEntity } from "@/types/CharacterEntity";
import type { CombatInstance } from "@/types/CombatInstance";

export const resetCharacterEntity = (c: CharacterEntity) => {
  c.currentHitpoints = c.maximumHitpoints;
}

export const resetCombatInstance = (combat: CombatInstance) => {
  const ongoingCombat = useOngoingCombatStore();
  ongoingCombat.removeCombatByLocationId(combat.location);
  ongoingCombat.addCombat(combat);
}
