import type { CharacterEntity } from "@/types/CharacterEntity";
import CrookCorpse from '@/data/items/CrookCorpse';

const data: CharacterEntity = {
  id: 'en-crook',
  name: 'Level 1 Crook',
  maximumHitpoints: 20,
  currentHitpoints: 20,
  hitDamageMaximum: 0,
  hitDamageMinimum: 0,
  attacksPerSecond: 0,
  lootTable: [
    {itemEntity: CrookCorpse, quantity: 1, chance: 100},
  ],
  onDeath: (combat) => {
    console.log(combat.character1.name + ' killed Level 1 Crook');
  }
}


export default data;
