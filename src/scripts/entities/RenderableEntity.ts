import { type SpriteSheetData, type EntityArgs, Entity } from '@/scripts/entities';

export type RenderableEntityArgs = EntityArgs & {
  animations?: Record<string, SpriteSheetData>;
  particles?: string;
};

export class RenderableEntity extends Entity {
  animations?: Record<string, SpriteSheetData>;
  particles?: string;

  constructor(args: RenderableEntityArgs = {}) {
    super(args);
    this.animations = args.animations;
    this.particles = args.particles;
  }
}
