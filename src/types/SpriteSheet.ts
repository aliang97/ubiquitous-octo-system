export type SpriteSheet = {
  spriteSrc: string;
  offset?: { x: number; y: number };
  size: { x: number; y: number };
  frames: number;
  durationMS: number;
};
