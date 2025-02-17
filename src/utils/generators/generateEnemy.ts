import type { MonsterEntity } from '@/types';
import SlimeSpritesheet from '@/assets/characters/enemies/slime/purple-slime-idle.png';
import SlimeDie from '@/assets/characters/enemies/slime/purple-slime-die.png';
import { SlimeCore, CrookCorpse, BossCorpse } from '@/data/items';
import { CharacterStatus, CharacterType, EnemyType } from '@/utils/enums';
import { generateId } from '@/utils/generators';

export const slime: MonsterEntity = {
  id: generateId(),
  characterStatus: CharacterStatus.Alive,
  characterType: CharacterType.Monster,
  name: 'Slime',
  enemyType: EnemyType.Slime,
  actionLockoutDurationMS: 0,
  maximumHitPoints: 10,
  currentHitPoints: 10,
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
    die: {
      spriteSrc: SlimeDie,
      size: { x: 64, y: 64 },
      frames: 4,
      durationMS: 1000,
    },
  },
  defaultAnimation: 'idle',
  renderList: [],
  onDeath: (c) => {
    console.log(`${c.h1.name} killed slime`);
  },
};

export const level1Crook: MonsterEntity = {
  id: generateId(),
  characterStatus: CharacterStatus.Alive,
  characterType: CharacterType.Monster,
  name: 'Level 1 Crook',
  enemyType: EnemyType.Crook,
  actionLockoutDurationMS: 0,
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
  characterStatus: CharacterStatus.Alive,
  characterType: CharacterType.Monster,
  name: 'Level 100 Mafia Boss',
  enemyType: EnemyType.Boss,
  actionLockoutDurationMS: 0,
  maximumHitPoints: 100,
  currentHitPoints: 100,
  hitDamageMaximum: 100,
  hitDamageMinimum: 100,
  attacksPerSecond: 1,
  lootTable: [{ itemEntity: BossCorpse, quantity: 1, chance: 100 }],
  renderList: [],
};

type generateEnemyArgs = {
  type?: string;
};

export const generateEnemy = (args: generateEnemyArgs): MonsterEntity => {
  if (args.type === EnemyType.Slime) {
    return { ...slime };
  }

  if (args.type === EnemyType.Crook) {
    return { ...level1Crook };
  }

  if (args.type === EnemyType.Boss) {
    return { ...level100Boss };
  }

  return { ...slime };
};
