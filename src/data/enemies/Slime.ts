import type { CharacterEntity } from "@/types/CharacterEntity";
import { shallowRef } from "vue";
import SlimeCorpse from '@/data/items/SlimeCorpse';
import SlimeSprite from "@/components/sprites/enemies/SlimeSprite.vue";

const data: CharacterEntity = {
  id: 'en-slime',
  name: 'Slime',
  maximumHitpoints: 10,
  currentHitpoints: 10,
  hitDamageMaximum: 2,
  hitDamageMinimum: 1,
  attacksPerSecond: 0.7,
  lootTable: [
    {itemEntity: SlimeCorpse, quantity: 1, chance: 100},
    {itemEntity: SlimeCorpse, quantity: 1, chance: 50},
  ],
  onDeath: (combat) => {
    console.log(combat.character1.name + ' killed Slime');
  },
  sprite: shallowRef(SlimeSprite),
}


export default data;
