import { MonsterEntity } from '@/scripts/entities';
import SlimeSpritesheet from '@/assets/characters/enemies/slime/purple-slime-idle.png';
import { SlimeCore, CrookCorpse, BossCorpse } from './items';

export const slime = new MonsterEntity({
  name: 'Slime',
  maximumHitPoints: 10,
  hitDamageMaximum: 2,
  hitDamageMinimum: 1,
  attacksPerSecond: 0.7,
  lootTable: [
    { itemEntity: SlimeCore, quantity: 1, chance: 100 },
    { itemEntity: SlimeCore, quantity: 1, chance: 50 },
  ],
  animations: {
    idle: {
      spriteSrc: SlimeSpritesheet,
      size: { x: 64, y: 64 },
      frames: 2,
      durationMS: 800,
    },
  },
});

export const level1Crook = new MonsterEntity({
  name: 'Level 1 Crook',
  maximumHitPoints: 20,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [{ itemEntity: CrookCorpse, quantity: 1, chance: 100 }],
});

export const level100Boss = new MonsterEntity({
  name: 'Level 100 Mafia Boss',
  maximumHitPoints: 100,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [{ itemEntity: BossCorpse, quantity: 1, chance: 100 }],
});
