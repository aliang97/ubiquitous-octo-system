import type { CharacterEntity } from "@/types/CharacterEntity";
import SlimeCorpse from '@/data/items/SlimeCorpse';

const data: CharacterEntity = {
  id: 'en-slime',
  name: 'Slime',
  maximumHitpoints: 10,
  currentHitpoints: 10,
  hitDamageMaximum: 2,
  hitDamageMinimum: 1,
  attacksPerSecond: 1.2,
  lootTable: [
    {itemEntity: SlimeCorpse, quantity: 1, chance: 100},
    {itemEntity: SlimeCorpse, quantity: 1, chance: 50},
  ],
  onDeath: (combat) => {
    console.log(combat.character1.name + ' killed Slime');
  }
}


export default data;
