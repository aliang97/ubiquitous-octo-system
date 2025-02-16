import type { CombatInstance } from '@/types';

export function combatStep(c: CombatInstance) {
  c.trueTick++;
  // TODO: Resolve queued actions bound to trueTick
  // TODO: resolve particle effects

  if (c.isPaused) {
    return;
  }

  c.gameTick++;
  // Resolve Queued Actions that are bound to gameTick
  // TODO: Resolve animations
  // TODO: Resolve damage
  // TODO: Resolve combat end state
}
