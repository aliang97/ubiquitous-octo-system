import type { SpriteSheet, RenderList, Entity } from '@/types';

export interface RenderableEntity extends Entity {
  animations?: Record<string, SpriteSheet>;
  particles?: void; // TODO
  renderList: RenderList;
}
