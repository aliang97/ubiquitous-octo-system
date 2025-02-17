import type { SpriteSheet, RenderList, Entity } from '@/types';

export interface RenderableEntity extends Entity {
  animations?: Record<string, SpriteSheet>;
  defaultAnimation?: string;
  currentAnimation?: string;
  particles?: void; // TODO
  renderList: RenderList;
  pauseAnimations?: boolean;
}
