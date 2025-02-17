import type { DelayedAction, CombatInstance } from '@/types';

export function cleanupDelayedAction(action: DelayedAction, list: DelayedAction[]) {
  const index = list.findIndex((el) => el.id === action.id);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

export function resolveDelayedActions(c: CombatInstance) {
  // Resolve Queued Actions that are bound to trueTick
  c.delayedActions
    .filter((el) => el.waitUntilTrueTick)
    .forEach((delayedAction) => {
      if (delayedAction.waitUntilTrueTick === c.trueTick) {
        delayedAction.doAction();
        cleanupDelayedAction(delayedAction, c.delayedActions);
      }
    });

  // Resolve Queued Actions that are bound to gameTick
  c.delayedActions
    .filter((el) => el.waitUntilGameTick)
    .forEach((delayedAction) => {
      if (delayedAction.waitUntilGameTick === c.gameTick) {
        delayedAction.doAction();
        cleanupDelayedAction(delayedAction, c.delayedActions);
      }
    });
}
