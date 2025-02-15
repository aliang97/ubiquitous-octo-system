import type { CombatLocationId } from "@/types/CombatInstance";
import type { CharacterEntity } from "@/types/CharacterEntity";
import type { LootTable } from '@/types/LootTable';
import { resetCharacterHitpoints, resetCharacterRenderList } from "@/utils/combatUtils";
import { useOngoingCombatStore } from "@/stores/ongoingCombat";
import { useInventoryStore } from "@/stores/inventory";
import { computed } from 'vue';
import { SERVER_TICK_RATE_MS } from "./utils";
import type { RenderInstruction, RenderList } from "@/types/RenderList";

// This will run every tick of combat
export function resolveCombatTick(combatLocation: CombatLocationId) {
  const inventory = useInventoryStore();
  const ongoingCombat = useOngoingCombatStore();
  const combat = computed(() => ongoingCombat.getCombatByLocationId(combatLocation));
  if (!combat.value) { return; }
  const c1 = combat.value.character1;
  const c2 = combat.value.character2;

  // Increment trueTick
  if (combat.value.trueTick !== undefined) { combat.value.trueTick++; }
  else { combat.value.trueTick = 0; }

  if (combat.value.status === 'starting') { combat.value.status = 'ongoing'; }

  // Execute Render instructions in the render list
  // TODO: separate render list for pausable renders?
  // Each entry in the Render List represents an HTML element that will
  //  be visible for some duration (during which it will play an animation
  //  or something).
  if (c1.renderList === undefined) { c1.renderList = []; }
  if (c2.renderList === undefined) { c2.renderList = []; }
  c1.renderList = resolveRenderListTick(c1.renderList);
  c2.renderList = resolveRenderListTick(c2.renderList);

  // STOP if combat is paused
  if (combat.value.paused) { return; }

  // Increment gameTick
  if (combat.value.gameTick !== undefined) { combat.value.gameTick++; }
  else { combat.value.gameTick = 0; }

  // Execute the combat actions for all characters
  if (canAttack(c1, combat.value.gameTick)) {
    doAttack(c1, c2);
  }
  if (canAttack(c2, combat.value.gameTick)) {
    doAttack(c2, c1);
  }

  // Check for combat end state (someone died?)
  if (hasDied(c1)) {
    // Player death logic
  }
  if (hasDied(c2)) {
    // Monster death logic
    if (c2.onDeath) { c2.onDeath(combat.value); }
    appendToRenderList(c2.renderList, 'die');
    // Pause for outro animation

    ongoingCombat.pauseCombat(combatLocation, 500, (combat) => {
      combat.status = 'ending';
      ongoingCombat.pauseCombat(combatLocation, 500, (combat) => {
        ongoingCombat.removeCombatByLocationId(combat.location);
        // Love JS object scoping to access c2 here XDD
        const lootList = rollLoot(c2);
        lootList.forEach(entry => inventory.addItemEntity(entry.itemEntity, entry.quantity));

        // Reset everything & loop if required
        resetCharacterRenderList(c2);
        resetCharacterHitpoints(c2);
        combat.trueTick = 0;
        combat.gameTick = 0;
        if (combat.loop) {
          ongoingCombat.addCombat(combat);
        }
      })
    });

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
  appendToRenderList(target.renderList, 'takeHit', { damage });
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
// Returns a new list because I don't want to deal with iteration while deleting
function resolveRenderListTick(rl?: RenderList) {
  if (rl === undefined) { return; }
  rl.forEach(instruction => {
    if (instruction.duration === 'infinite') { return; }
    instruction.duration -= SERVER_TICK_RATE_MS;
  });
  const newRenderList = rl.filter(el => el.duration === 'infinite' || el.duration > 0);
  return newRenderList;
}

// Appends a render instruction to the queue, and looks up the duration of the render
function appendToRenderList(rl: RenderList | undefined, command: string, params?: object) {
  if (rl === undefined) { return; }
  const animationToDuration: Record<string, number | 'infinite'> = {
    'takeHit': 800,
    'die': 'infinite',
  }
  const d_string = new Date().toISOString();
  const newRenderInstruction: RenderInstruction = {
    command,
    params,
    duration: animationToDuration[command] || 0,
    id: 'ri_' + d_string,
  };
  rl.push(newRenderInstruction);
}
