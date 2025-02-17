import type { DelayedAction } from '../combat/DelayedAction';

export interface Instance {
  trueTick: number;
  gameTick: number;
  isPaused: boolean;
  clockId?: number;
  delayedActions: DelayedAction[];
}
