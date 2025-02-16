export function resolveQueuedActions(args: {
  actionQueue: QueuedAction[];
  trueTick?: number;
  gameTick?: number;
}) {
  // Resolve Queued Actions that are bound to trueTick
  if (args.trueTick) {
    args.actionQueue
      .filter((el) => el.waitUntilTrueTick)
      .forEach((queuedAction) => {
        if (queuedAction.waitUntilTrueTick === args.trueTick) {
          queuedAction.doAction();
          deleteActionFromQueue(queuedAction, args.actionQueue);
        }
      });
  }

  // Resolve Queued Actions that are bound to gameTick
  if (args.gameTick) {
    args.actionQueue
      .filter((el) => el.waitUntilGameTick)
      .forEach((queuedAction) => {
        if (queuedAction.waitUntilGameTick === args.gameTick) {
          queuedAction.doAction();
          deleteActionFromQueue(queuedAction, args.actionQueue);
        }
      });
  }
}

export function deleteActionFromQueue(action: QueuedAction, list: QueuedAction[]) {
  const index = list.findIndex((el) => el.id === action.id);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

export type QueuedActionArgs = {
  waitUntilTrueTick?: number;
  waitUntilGameTick?: number;
  doAction: () => void;
};

export class QueuedAction {
  static unique: number = 0;

  static getId() {
    return `qa-${QueuedAction.unique++}`;
  }

  id: string;
  doAction: () => void = () => {};
  waitUntilTrueTick?: number;
  waitUntilGameTick?: number;

  constructor(args: QueuedActionArgs) {
    this.id = QueuedAction.getId();
    this.doAction = args.doAction;
    this.waitUntilGameTick = args.waitUntilGameTick;
    this.waitUntilTrueTick = args.waitUntilTrueTick;
  }
}
