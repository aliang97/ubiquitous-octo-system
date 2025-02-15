import type { CharacterEntity } from "@/types/CharacterEntity";
import SlimeCorpse from '@/data/items/SlimeCorpse';
import SlimeSpritesheet from '@/assets/characters/enemies/slime/purple-slime-idle.png';

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
  spriteProps: {
    spriteSrc: SlimeSpritesheet,
    size: {x: 64, y: 64},
    frames: 2,
    durationMS: 800,
  },
}


export default data;
