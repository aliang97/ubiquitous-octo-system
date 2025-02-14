import type { CharacterEntity } from "@/types/CharacterEntity"
import { shallowRef } from 'vue';
import DeadeyeSprite from "@/components/sprites/characters/DeadeyeSprite.vue";
import HitAnimation from "@/components/sprites/TheHitAnimation.vue";

const data: CharacterEntity = {
  id: '0',
  name: 'John Exile',
  class: 'Deadeye',
  maximumHitpoints: 10,
  currentHitpoints: 10,
  hitDamageMaximum: 9,
  hitDamageMinimum: 4,
  attacksPerSecond: 1,
  sprite: shallowRef(DeadeyeSprite),
  hitAnimation: shallowRef(HitAnimation),
}

export default data;
