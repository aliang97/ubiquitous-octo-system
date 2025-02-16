import type { CombatInstance } from '@/types';
import { SERVER_TICK_RATE_MS } from '@/utils';
import { combatStep } from './combatStep';

export function startCombat(c: CombatInstance) {
  c.clockId = setInterval(() => combatStep(c), SERVER_TICK_RATE_MS);
  // TODO: pause
  // TODO: trigger intro animation
  // TODO: unpause
}
