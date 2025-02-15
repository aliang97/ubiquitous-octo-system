import type { CharacterEntity } from '@/types/CharacterEntity';
import TestImage from '@/assets/characters/classes/guy-idle.png';

const data: CharacterEntity = {
  id: 'ce-1',
  name: 'John Exile',
  class: 'Deadeye',
  maximumHitpoints: 10,
  currentHitpoints: 10,
  hitDamageMaximum: 4,
  hitDamageMinimum: 2,
  attacksPerSecond: 2,
  spriteProps: {
    spriteSrc: TestImage,
    size: { x: 64, y: 64 },
    frames: 2,
    durationMS: 800,
  },
};

export default data;
