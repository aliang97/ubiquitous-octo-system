import type { EquippedItemLoadout, HeroClass, HeroEntity } from '@/types';
import RogueSprite from '@/assets/characters/classes/rogue.png';
import { allClasses } from '@/data/classes';
import { CharacterStatus, CharacterType, EquippableItemType } from '@/utils/enums';
import { generateId } from '@/utils/generators';
import { getDerivedCharacterStats } from '@/utils/combat';
import { generateEquippableItem } from './generateEquippableItem';

type GenerateHeroFixedParams = {
  name?: string;
  heroClass?: HeroClass;
  equipment?: EquippedItemLoadout;
};

export const generateHero = (fixedParams?: GenerateHeroFixedParams): HeroEntity => {
  const params: GenerateHeroFixedParams = {};

  // Determine class;
  if (fixedParams?.heroClass) {
    params.heroClass = fixedParams.heroClass;
  } else {
    params.heroClass = allClasses[Math.round(Math.random() * 2)];
  }

  // Determine equipment
  if (fixedParams?.equipment) {
    params.equipment = fixedParams.equipment;
  } else {
    params.equipment = {
      helmet: generateEquippableItem({ type: EquippableItemType.Helmet }),
      weapon1: generateEquippableItem({ type: EquippableItemType.Sword }),
    };
  }

  // Determine name
  if (fixedParams?.name) {
    params.name = fixedParams.name;
  } else {
    params.name = `name-${performance.now().toString().slice(-5)}`;
  }

  const h = {
    id: generateId(),
    characterStatus: CharacterStatus.Alive,
    characterType: CharacterType.Hero,
    actionLockoutDurationMS: 0,
    currentHitPoints: 1,
    animations: {
      idle: {
        spriteSrc: RogueSprite,
        size: { x: 64, y: 64 },
        frames: 10,
        durationMS: 800,
      },
      attack: {
        spriteSrc: RogueSprite,
        offset: { x: 0, y: 192 },
        size: { x: 64, y: 64 },
        frames: 10,
        durationMS: 200,
      },
      die: {
        spriteSrc: RogueSprite,
        offset: { x: 0, y: 256 },
        size: { x: 64, y: 64 },
        frames: 10,
        durationMS: 1000,
      },
    },
    defaultAnimation: 'idle',
    renderList: [],
    ...params,
  } as HeroEntity;

  // Calling this will do the initial calculation & cache the results on the Hero object
  getDerivedCharacterStats(h);
  if (h.derivedStats?.maximumHitPoints) {
    h.currentHitPoints = h.derivedStats.maximumHitPoints;
  }
  return h;
};
