export interface DelayedAction {
  id: string;
  doAction: () => void;
  waitUntilGameTick?: number;
  waitUntilTrueTick?: number;
}
