import type { CombatInstance, RenderableEntity } from '@/types';
import { generateId } from '../generators/generateId';
import { msToTicks } from '../utils';

export type doAnimationArgs = {
  combat: CombatInstance;
  r: RenderableEntity;
  animationName: string;
  freezeAtEnd?: boolean;
};

// export function doAnimation(r: RenderableEntity, animationName: string, combat: CombatInstance) {
export function doAnimation(args: doAnimationArgs) {
  const { combat, r, animationName, freezeAtEnd } = args;
  const animation = r.animations?.[animationName];
  if (animation === undefined) {
    console.warn(
      `Warn in doAnimation: could not find animation ${animationName} in entity ${r.name}`,
    );
    return;
  }

  r.currentAnimation = animationName;

  if (freezeAtEnd) {
    const oneFrameDurationMS = animation.durationMS / animation.frames;
    combat.delayedActions.push({
      id: generateId('da'),
      doAction: () => {
        r.pauseAnimations = true;
      },
      waitUntilGameTick:
        combat.gameTick + msToTicks(animation.durationMS - Math.round(oneFrameDurationMS / 2)),
    });
  } else {
    combat.delayedActions.push({
      id: generateId('da'),
      doAction: () => {
        // Don't overwrite 'die' animation
        if (r.currentAnimation === 'die') {
          return;
        }
        r.currentAnimation = r.defaultAnimation;
      },
      waitUntilGameTick: combat.gameTick + msToTicks(animation.durationMS),
    });
  }
}
