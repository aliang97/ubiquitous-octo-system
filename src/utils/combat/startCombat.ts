import { useCombatManagerStore } from '@/stores/combatManager';
import { SERVER_TICK_RATE_MS } from '@/utils';
import { pauseCombat, getDerivedCharacterStats, updateDerivedCharacterStats } from '@/utils/combat';
import { combatStep } from '@/utils/combat/combatStep';
import { CharacterStatus, CombatInstanceStatus, CombatLocationId } from '@/utils/enums';
import { generateId } from '@/utils/generators';
import { computed } from 'vue';

export function startCombat(locationId: CombatLocationId) {
  const store = useCombatManagerStore();
  const c = computed(() => store.getCombat(locationId));
  if (c.value === undefined) {
    return;
  }

  c.value.clockId = setInterval(() => combatStep(locationId), SERVER_TICK_RATE_MS);

  // Pause combat for intro animation
  pauseCombat(c.value, 1500);
  c.value.delayedActions.push({
    id: generateId('da'),
    doAction: () => {
      // Changing this status plays the intro zoom in animation
      if (c.value) {
        c.value.status = CombatInstanceStatus.Ongoing;
      }
    },
    waitUntilTrueTick: 1,
  });

  // Reset the ActionLockoutDurations for each character
  //  also currentAnimation
  c.value.h1.actionLockoutDurationMS = 0;
  c.value.m1.actionLockoutDurationMS = 0;
  c.value.h1.currentAnimation = c.value.h1.defaultAnimation;
  c.value.m1.currentAnimation = c.value.m1.defaultAnimation;
  c.value.h1.pauseAnimations = false;
  c.value.m1.pauseAnimations = false;
  c.value.h1.particleEffects = [];
  c.value.m1.particleEffects = [];
  updateDerivedCharacterStats(c.value.h1);
  updateDerivedCharacterStats(c.value.m1);

  // TEMP:: reset char hp if he died for dev
  if (c.value.h1.characterStatus === CharacterStatus.Dead) {
    const derived = getDerivedCharacterStats(c.value.h1);
    c.value.h1.currentHitPoints = derived.maximumHitPoints;
    c.value.h1.characterStatus = CharacterStatus.Alive;
  }
}
