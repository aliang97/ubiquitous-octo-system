import type { MonsterEntity } from '@/types';
import { EnemyType } from '@/utils';
import SlimeSpritesheet from '@/assets/characters/enemies/slime/purple-slime-idle.png';
import { SlimeCore, CrookCorpse, BossCorpse } from '@/data/items';
import { generateId } from '@/utils';

export const slime: MonsterEntity = {
  id: generateId(),
  name: 'Slime',
  enemyType: EnemyType.Slime,
  maximumHitPoints: 10,
  currentHitPoints: 20,
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
  renderList: [],
};

export const level1Crook: MonsterEntity = {
  id: generateId(),
  name: 'Level 1 Crook',
  enemyType: EnemyType.Crook,
  maximumHitPoints: 20,
  currentHitPoints: 20,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [{ itemEntity: CrookCorpse, quantity: 1, chance: 100 }],
  renderList: [],
};

export const level100Boss: MonsterEntity = {
  id: generateId(),
  name: 'Level 100 Mafia Boss',
  enemyType: EnemyType.Crook,
  maximumHitPoints: 100,
  currentHitPoints: 100,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [{ itemEntity: BossCorpse, quantity: 1, chance: 100 }],
  renderList: [],
};

type generateEnemyArgs = {
  type?: string;
};

export const generateEnemy = (args: generateEnemyArgs): MonsterEntity => {
  if (args.type === EnemyType.Slime) {
    return slime;
  }

  if (args.type === EnemyType.Crook) {
    return level1Crook;
  }

  if (args.type === EnemyType.Boss) {
    return level100Boss;
  }

  return slime;
};
