import type { CombatInstance } from '@/types';
import { SERVER_TICK_RATE_MS } from '@/utils';
import { CombatInstanceStatus } from '@/utils/enums';
import { combatStep } from './combatStep';

export function rehydrateCombat(c: CombatInstance) {
  clearInterval(c.clockId);
  c.clockId = setInterval(() => combatStep(c.locationId), SERVER_TICK_RATE_MS);
  c.status = CombatInstanceStatus.Ongoing;

  // We lose `delayedAction.doAction()` function definition when
  //  rehydrating from localstorage, so just delete the delayedAction
  //  queue for now.
  c.delayedActions = [];
}
