import type { MonsterEntity } from '@/types';
import SlimeSpritesheet from '@/assets/characters/enemies/slime/purple-slime-idle.png';
import SlimeDie from '@/assets/characters/enemies/slime/purple-slime-die.png';
import SlimeAttack from '@/assets/characters/enemies/slime/purple-slime-attack.png';
import { SlimeCore, CrookCorpse, BossCorpse, ScrapMetal } from '@/data/items/items';
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
    { itemEntity: ScrapMetal, quantity: 1, chance: 100 },
  ],
  animations: {
    idle: {
      spriteSrc: SlimeSpritesheet,
      size: { x: 64, y: 64 },
      frames: 2,
      durationMS: 800,
    },
    attack: {
      spriteSrc: SlimeAttack,
      size: { x: 64, y: 64 },
      frames: 4,
      durationMS: 200,
    },
    die: {
      spriteSrc: SlimeDie,
      size: { x: 64, y: 64 },
      frames: 4,
      durationMS: 1000,
    },
  },
  defaultAnimation: 'idle',
  particleEffects: [],
  onDeath: (c) => {
    console.log(`${c.h1.name} killed slime`);
  },
};

export const crook: MonsterEntity = {
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
  lootTable: [
    { itemEntity: CrookCorpse, quantity: 1, chance: 100 },
    { itemEntity: ScrapMetal, quantity: 1, chance: 100 },
  ],
  particleEffects: [],
};

export const boss: MonsterEntity = {
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
  lootTable: [
    { itemEntity: BossCorpse, quantity: 1, chance: 100 },
    { itemEntity: ScrapMetal, quantity: 1, chance: 100 },
  ],
  particleEffects: [],
};

export const rock: MonsterEntity = {
  id: generateId(),
  characterStatus: CharacterStatus.Alive,
  characterType: CharacterType.Monster,
  name: 'Small Rock',
  enemyType: EnemyType.Rock,
  actionLockoutDurationMS: 0,
  maximumHitPoints: 100,
  currentHitPoints: 100,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [
    { itemEntity: SlimeCore, quantity: 1, chance: 100 },
    { itemEntity: ScrapMetal, quantity: 1, chance: 100 },
  ],
  particleEffects: [],
};

export const rock2: MonsterEntity = {
  id: generateId(),
  characterStatus: CharacterStatus.Alive,
  characterType: CharacterType.Monster,
  name: 'Bigger Rock',
  enemyType: EnemyType.Rock2,
  actionLockoutDurationMS: 0,
  maximumHitPoints: 100,
  currentHitPoints: 100,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [
    { itemEntity: SlimeCore, quantity: 1, chance: 100 },
    { itemEntity: ScrapMetal, quantity: 1, chance: 100 },
  ],
  particleEffects: [],
};

export const frogzard: MonsterEntity = {
  id: generateId(),
  characterStatus: CharacterStatus.Alive,
  characterType: CharacterType.Monster,
  name: 'Frogzard from AdventureQuest',
  enemyType: EnemyType.Frogzard,
  actionLockoutDurationMS: 0,
  maximumHitPoints: 100,
  currentHitPoints: 100,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [
    { itemEntity: SlimeCore, quantity: 1, chance: 100 },
    { itemEntity: ScrapMetal, quantity: 1, chance: 100 },
  ],
  particleEffects: [],
};

type generateEnemyArgs = {
  type?: string;
};

export const generateEnemy = (args: generateEnemyArgs): MonsterEntity => {
  const monsterByType: Record<string, MonsterEntity> = {
    [EnemyType.Slime]: { ...slime },
    [EnemyType.Crook]: { ...crook },
    [EnemyType.Boss]: { ...boss },
    [EnemyType.Rock]: { ...rock },
    [EnemyType.Rock2]: { ...rock2 },
    [EnemyType.Frogzard]: { ...frogzard },
  };

  if (args.type && monsterByType[args.type]) {
    return monsterByType[args.type];
  }

  return { ...slime };
};
