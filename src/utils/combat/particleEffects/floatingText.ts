import type { ParticleEffectData } from '@/types';
import FloatingText from '@/components/rendering/particleEffects/FloatingText.vue';
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
