import { type SpriteSheetData, type EntityArgs, Entity, type RenderList } from '@/scripts/entities';

export type RenderableEntityArgs = EntityArgs & {
  animations?: Record<string, SpriteSheetData>;
  particles?: string;
};

export class RenderableEntity extends Entity {
  animations?: Record<string, SpriteSheetData>;
  particles?: string;
  renderList: RenderList = [];

  constructor(args: RenderableEntityArgs = {}) {
    super(args);
    this.animations = args.animations;
    this.particles = args.particles;
  }
}
