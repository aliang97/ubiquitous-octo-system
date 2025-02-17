import type { EquippedItemLoadout, HeroClass, HeroEntity } from '@/types';
import { allClasses } from '@/data/classes';
import TestImage from '@/assets/characters/classes/guy-idle.png';
import { CharacterType, EquippableItemType, generateId } from '@/utils';
import { generateEquippableItem } from './generateEquippableItem';
import { getDerivedCharacterStats } from '../combat';

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
    params.name = `name ${performance.now().toString()}`;
  }

  const h = {
    id: generateId(),
    characterType: CharacterType.Hero,
    actionLockoutDurationMS: 0,
    currentHitPoints: 1,
    animations: {
      idle: {
        spriteSrc: TestImage,
        size: { x: 64, y: 64 },
        frames: 2,
        durationMS: 800,
      },
    },
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
