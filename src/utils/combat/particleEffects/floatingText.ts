import type { ParticleEffectData } from '@/types/entities/RenderableEntity';
import FloatingText from '@/components/particleEffects/FloatingText.vue';
import { generateId } from '@/utils/generators';
import { shallowRef } from 'vue';

export function floatingDamageNumber(damageAmount: number, damageType?: string) {
  return floatingTextParticle(`-${damageAmount}`, damageType);
}

export function floatingTextParticle(textContent: string, icon?: string): ParticleEffectData {
  return {
    id: generateId('p'),
    name: 'Floating Text',
    vueComponent: shallowRef(FloatingText),
    params: { textContent, icon },
    durationMS: 1000,
  };
}
