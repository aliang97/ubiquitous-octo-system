import { type EquippedItemLoadout, type HeroClass, HeroEntity } from '@/scripts/entities';
import { allClasses } from './classes';
import { basicHelmet, basicSword } from './equippableItems';
import TestImage from '@/assets/characters/classes/guy-idle.png';

type GenerateHeroFixedParams = {
  name?: string;
  heroClass?: HeroClass;
  equipment?: EquippedItemLoadout;
};

export const generateHero = (fixedParams?: GenerateHeroFixedParams) => {
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
      helmet: basicHelmet,
      weapon1: basicSword,
    };
  }

  // Determine name
  if (fixedParams?.name) {
    params.name = fixedParams.name;
  } else {
    params.name = new Date().toISOString();
  }

  return new HeroEntity({
    animations: {
      idle: {
        spriteSrc: TestImage,
        size: { x: 64, y: 64 },
        frames: 2,
        durationMS: 800,
      },
    },
    ...params,
  });
};
