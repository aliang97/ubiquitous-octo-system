export enum CombatLocationId {
  Forest = 'COMBATLOCATION_FOREST',
  Cave = 'COMBATLOCATION_CAVE',
}

export enum EnemyType {
  Slime = 'ENEMY_SLIME',
  Crook = 'ENEMY_CROOK',
  Boss = 'ENEMY_BOSS',
  Rock = 'ENEMY_ROCK',
  Rock2 = 'ENEMY_ROCK2',
  Frogzard = 'ENEMY_FROGZARD',
}

export enum CombatInstanceStatus {
  Uninitialized = 'CISTATUS_UNINITIALIZED',
  Starting = 'CISTATUS_STARTING',
  Ongoing = 'CISTATUS_ONGOING',
  Ending = 'CISTATUS_ENDING',
  Dehydrated = 'CISTATUS_DEHYDRATED',
}

export enum CharacterType {
  Hero = 'CHARACTER_HERO',
  Monster = 'CHARACTER_MONSTER',
}

export enum CharacterStatus {
  Alive = 'CHARACTERSTATUS_ALIVE',
  Dead = 'CHARACTERSTATUS_DEAD',
}
