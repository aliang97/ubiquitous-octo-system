import { type HeroClass } from '@/scripts/entities';

const Deadeye: HeroClass = {
  name: 'Deadeye',
  baseHitPoints: 10,
};

const Slayer: HeroClass = {
  name: 'Slayer',
  baseHitPoints: 11,
};

const Assassin: HeroClass = {
  name: 'Assassin',
  baseHitPoints: 9,
};

const allClasses = [Assassin, Deadeye, Slayer];

export { allClasses, Assassin, Deadeye, Slayer };
