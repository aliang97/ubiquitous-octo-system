import type { SpriteSheet, Entity } from '@/types';
import type { Component } from 'vue';

export type ParticleEffectData = {
  id: string;
  name: string;
  vueComponent: Component;
  params: Record<string, string | number | undefined>;
  durationMS: number;
};

export interface RenderableEntity extends Entity {
  animations?: Record<string, SpriteSheet>;
  defaultAnimation?: string;
  currentAnimation?: string;
  particleEffects: ParticleEffectData[];
  pauseAnimations?: boolean;
}
