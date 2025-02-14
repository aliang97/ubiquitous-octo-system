import type { CharacterEntity } from "@/types/CharacterEntity";
import BossCorpse from '@/data/items/BossCorpse';

const data: CharacterEntity = {
  id: 'en-mafia-boss',
  name: 'Level 100 Mafia Boss',
  maximumHitpoints: 100,
  currentHitpoints: 100,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [
    {itemEntity: BossCorpse, quantity: 1, chance: 100},
  ],
  onDeath: (combat) => {
    console.log(combat.character1.name + ' killed Level 100 Mafia Boss');
  }
}


export default data;
