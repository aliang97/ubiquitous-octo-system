import type { DelayedAction, CombatInstance } from '@/types';
import { generateId } from '@/utils/generators';
import { msToTicks } from '@/utils';
import type { Ref } from 'vue';

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

export async function doActionAfterDelay(
  c: Ref<CombatInstance | undefined>,
  action: () => void,
  delayMS: number,
) {
  if (c.value === undefined) {
    console.warn("Couldn't doActionAfterDelay due to invalid CombatInstance");
    return;
  }
  c.value.delayedActions.push({
    id: generateId('da'),
    doAction: action,
    waitUntilTrueTick: c.value.trueTick + msToTicks(delayMS),
  });
}
