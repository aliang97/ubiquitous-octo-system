import { useCombatManagerStore } from '@/stores/combatManager';
import { CharacterStatus, LocationId } from '@/utils/enums';
import { resolveDelayedActions } from '@/utils/combat/delayedActions';
import { endCombat } from '@/utils/combat/endCombat';
import { handleDeath } from '@/utils/combat/handleDeath';
import { takeAction } from '@/utils/combat/takeAction';
import { computed } from 'vue';
import { SERVER_TICK_RATE_MS } from '..';

export function combatStep(locationId: LocationId) {
  const combatManager = useCombatManagerStore();
  const c = computed(() => combatManager.combatsByLocationId[locationId]).value;
  if (c === undefined) {
    return;
  }

  // Resolve delayedActions
  resolveDelayedActions(c);

  c.trueTick++;
  // TODO: resolve particle effects
  c.h1.particleEffects = c.h1.particleEffects.filter((el) => el.durationMS > 0);
  c.h1.particleEffects.forEach((el) => (el.durationMS -= SERVER_TICK_RATE_MS));
  c.m1.particleEffects = c.m1.particleEffects.filter((el) => el.durationMS > 0);
  c.m1.particleEffects.forEach((el) => (el.durationMS -= SERVER_TICK_RATE_MS));

  if (c.isPaused) {
    return;
  }

  c.gameTick++;

  if (c.h1.characterStatus !== CharacterStatus.Dead && c.h1.actionLockoutDurationMS <= 0) {
    takeAction(c.h1, c);
  } else {
    c.h1.actionLockoutDurationMS--;
  }

  if (c.m1.characterStatus !== CharacterStatus.Dead && c.m1.actionLockoutDurationMS <= 0) {
    takeAction(c.m1, c);
  } else {
    c.m1.actionLockoutDurationMS--;
  }

  // Combat finishes if either participant dies
  if (c.m1.currentHitPoints <= 0 && c.m1.characterStatus !== CharacterStatus.Dead) {
    handleDeath(c.m1, c).then(() => {
      endCombat(locationId);
    });
    return;
  }

  if (c.h1.currentHitPoints <= 0 && c.h1.characterStatus !== CharacterStatus.Dead) {
    handleDeath(c.h1, c).then(() => {
      endCombat(locationId);
    });

    return;
  }

  if (
    c.m1.characterStatus === CharacterStatus.Dead ||
    c.h1.characterStatus === CharacterStatus.Dead
  ) {
    endCombat(locationId);
  }
}
