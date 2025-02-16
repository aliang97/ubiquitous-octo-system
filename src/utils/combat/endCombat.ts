import type { CombatInstance } from '@/types';

export function endCombat(c: CombatInstance) {
  // TODO: Pause
  // TODO: outro
  // TODO: loot
  // TODO: reset character(s)
  clearInterval(c.clockId);
}
