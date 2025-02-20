import type { HeroEntity, MonsterEntity, LootTable, CombatInstance } from '@/types';
import { isHero, isMonster, msToTicks } from '@/utils';
import { CharacterStatus } from '@/utils/enums';
import { generateId } from '@/utils/generators';
import { doAnimation } from './doAnimation';
import { useInventoryStore } from '@/stores/inventory';

export function handleDeath(c: HeroEntity | MonsterEntity, combat: CombatInstance): Promise<void> {
  const inventoryStore = useInventoryStore();

  c.characterStatus = CharacterStatus.Dead;

  if (isHero(c)) {
  }

  if (isMonster(c)) {
    if (c.onDeath) {
      c.onDeath(combat);
    }

    if (c.lootTable) {
      const lootList = rollLoot(c);
      lootList.forEach((entry) => {
        inventoryStore.addMaterial(entry.itemEntity, entry.quantity);
      });
    }
  }

  // Pause combat to play death animation
  return new Promise((resolve) => {
    doAnimation({ r: c, animationName: 'die', combat, freezeAtEnd: true });
    const deathAnimationDurationMS = c.animations?.['die'].durationMS || 500;

    combat.delayedActions.push({
      id: generateId('da'),
      doAction: () => {
        resolve();
      },
      waitUntilTrueTick: combat.trueTick + msToTicks(deathAnimationDurationMS),
    });
  });
}

function rollLoot(c: MonsterEntity) {
  if (c.lootTable === undefined) {
    return [];
  }
  const rollResult = Math.round(Math.random() * 100);
  const lootList = <LootTable>[];
  c.lootTable.forEach((entry) => {
    if (entry.chance > rollResult) {
      lootList.push(entry);
    }
  });
  return lootList;
}
