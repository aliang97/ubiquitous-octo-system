import type { CombatLocationId } from "@/types/CombatInstance";
import type { CharacterEntity } from "@/types/CharacterEntity";
import type { LootTable } from '@/types/LootTable';
import { resetCombatInstance } from "@/utils/combatUtils";
import { useOngoingCombatStore } from "@/stores/ongoingCombat";
import { useInventoryStore } from "@/stores/inventory";
import { computed } from 'vue';
import { SERVER_TICK_RATE_MS } from "./utils";
import type { RenderInstruction, RenderQueue } from "@/types/RenderQueue";

// This will run every tick of combat
export function resolveCombatTick(combatLocation: CombatLocationId) {
  const inventory = useInventoryStore();
  const ongoingCombat = useOngoingCombatStore();
  const combat = computed(() => ongoingCombat.getCombatByLocationId(combatLocation));

  // Increment the tick
  if (!combat.value) { return; }
  if (combat.value.tick !== undefined) { combat.value.tick++; }
  else { combat.value.tick = 0; }

  combat.value.c1RenderQueue = resolveRenderQueueTick(combat.value.c1RenderQueue);
  combat.value.c2RenderQueue = resolveRenderQueueTick(combat.value.c2RenderQueue);

  // Execute the combat actions for all characters
  const c1 = combat.value.character1;
  const c2 = combat.value.character2;

  if (canAttack(c1, combat.value.tick)) {
    appendToRenderQueue(combat.value.c1RenderQueue, 'sendHit');
    appendToRenderQueue(combat.value.c2RenderQueue, 'takeHit');
    doAttack(c1, c2);
  }
  if (canAttack(c2, combat.value.tick)) {
    appendToRenderQueue(combat.value.c1RenderQueue, 'takeHit');
    appendToRenderQueue(combat.value.c2RenderQueue, 'sendHit');
    doAttack(c2, c1);
  }

  // Check for combat end state (someone died?)
  if (hasDied(c1)) {
    // Player death logic
  }
  if (hasDied(c2)) {
    // Monster death logic
    if (c2.onDeath) { c2.onDeath(combat.value); }
    resetCombatInstance(combat.value);
    const lootList = rollLoot(c2);
    lootList.forEach(entry => inventory.addItemEntity(entry.itemEntity, entry.quantity))
  }
}

export function getAttackIntervalMS(c: CharacterEntity): number | undefined {
  if (c.attacksPerSecond === undefined) { return undefined; }
  const ticksPerSecond = 1000 / SERVER_TICK_RATE_MS;
  return Math.round(ticksPerSecond / c.attacksPerSecond);
}

// Check character's attack speed to determine if they can attack this server tick
function canAttack(c: CharacterEntity, t: number): boolean {
  if (t <= 0) { return false; }
  const attackIntervalMS = getAttackIntervalMS(c);
  if (attackIntervalMS === undefined) { return false; }

  return t % attackIntervalMS === 0;
}

// Calculate the hit damage
// Round to the nearest integer
function rollDamage(c: CharacterEntity) {
  if (c.hitDamageMaximum === undefined || c.hitDamageMinimum === undefined) {
    return 0;
  }
  const max = c.hitDamageMaximum;
  const min = c.hitDamageMinimum;
  const range = max - min;
  return min + Math.round(Math.random() * range);
}

// Execute the attack
function doAttack(source: CharacterEntity, target: CharacterEntity) {
  const damage = rollDamage(source);
  target.currentHitpoints = Math.max(0, target.currentHitpoints - damage);
}

function hasDied(c: CharacterEntity): boolean {
  if (c.currentHitpoints <= 0) { return true; }
  return false;
}

function rollLoot(c: CharacterEntity) {
  if (c.lootTable === undefined) { return []; }
  const rollResult = Math.round(Math.random() * 100);
  const lootList = <LootTable>[];
  c.lootTable.forEach(entry => {
    if (entry.chance > rollResult) { lootList.push(entry) }
  });
  return lootList;
}

// Reduces the duration of each queued item by 1 tick, and
//  deletes any items that are timed out (0 duration remaining)
function resolveRenderQueueTick(rq: RenderQueue) {
  rq.forEach(instruction => instruction.duration -= SERVER_TICK_RATE_MS);
  const newRenderQueue = rq.filter(el => el.duration > 0);
  return newRenderQueue;
}

// Appends a render instruction to the queue, and looks up the duration of the render
function appendToRenderQueue(rq: RenderQueue, command: string) {
  const d_string = new Date().toISOString();
  const newRenderInstruction: RenderInstruction = {
    command,
    duration: 800,
    id: 'ri_' + d_string,
  };
  rq.push(newRenderInstruction);
}
