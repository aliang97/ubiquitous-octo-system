import { Entity, type EntityArgs } from './Entity';

export type SpriteSheetData = {
  spriteSrc: string;
  size: { x: number; y: number };
  frames: number;
  durationMS: number;
};

export type RenderableEntityArgs = EntityArgs & {
  animations?: Record<string, SpriteSheetData>;
  particles?: string;
};

export class RenderableEntity extends Entity {
  constructor(args: RenderableEntityArgs = {}) {
    super(args);
  }
}
