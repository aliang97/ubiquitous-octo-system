import { useOngoingCombatStore } from "@/stores/ongoingCombat";
import type { CharacterEntity } from "@/types/CharacterEntity";
import type { CombatInstance } from "@/types/CombatInstance";

export const resetCharacterEntity = (c: CharacterEntity) => {
  c.currentHitpoints = c.maximumHitpoints;
}

export const resetCombatInstance = (combat: CombatInstance) => {
  const ongoingCombat = useOngoingCombatStore();
  ongoingCombat.removeCombatByLocationId(combat.location);
  // ongoingCombat.addCombat(combat);
}

export const resetCharacterRenderList = (c: CharacterEntity) => {
  c.renderList = [];
}

export const resetCharacterHitpoints = (c: CharacterEntity) => {
  c.currentHitpoints = c.maximumHitpoints;
}

export const pauseCombat = (combat: CombatInstance, durationMS?: number, cb?: (combat: CombatInstance) => void) => {
  combat.paused = true;
  if (durationMS) {
    setTimeout(() => {
      combat.paused = false;
      if (cb) { cb(combat); }
    }, durationMS);
  }
}
