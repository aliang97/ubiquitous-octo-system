export interface DelayedAction {
  doAction: () => void;
  waitUntilGameTick?: number;
  waitUntilTrueTick?: number;
}
