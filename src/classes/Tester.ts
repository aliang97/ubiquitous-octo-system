import { EquippableItemEntity } from './EquippableItemEntity';
import { HeroEntity } from './HeroEntity';
import { MonsterEntity } from './MonsterEntity';
import type { MonsterEntityArgs } from './MonsterEntity';
import SlimeCorpse from '@/data/items/SlimeCorpse';
import SlimeSpritesheet from '@/assets/characters/enemies/slime/purple-slime-idle.png';

const SlimeData: MonsterEntityArgs = {
  name: 'Slime',
  maximumHitPoints: 10,
  hitDamageMaximum: 2,
  hitDamageMinimum: 1,
  attacksPerSecond: 0.7,
  lootTable: [
    { itemEntity: SlimeCorpse, quantity: 1, chance: 100 },
    { itemEntity: SlimeCorpse, quantity: 1, chance: 50 },
  ],
  animations: {
    idle: {
      spriteSrc: SlimeSpritesheet,
      size: { x: 64, y: 64 },
      frames: 2,
      durationMS: 800,
    },
  },
};

const helmet1 = new EquippableItemEntity({
  name: 'bucket',
  rarity: 'common',
  effects: {
    baseHitPoints: 7,
  },
});
const weapon1 = new EquippableItemEntity({
  name: 'knife',
  rarity: 'common',
  effects: {
    attacksPerSecond: 0.9,
    hitDamageMaximum: 2,
    hitDamageMinimum: 4,
  },
});

const he = new HeroEntity({
  name: 'that one guy',
  heroClass: {
    name: 'sword guy',
    baseHitpoints: 12,
  },
  equipment: {
    helmet: helmet1,
    weapon1: weapon1,
  },
});

const slime = new MonsterEntity(SlimeData);

export { he, slime };
