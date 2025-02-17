export enum EquippableItemType {
  Helmet = 'ITEM_HELMET',
  Sword = 'ITEM_SWORD',
}

export enum Rarity {
  Common = 'RARITY_COMMON',
  Magic = 'RARITY_MAGIC',
  Rare = 'RARITY_RARE',
  Unique = 'RARITY_UNIQUE',
}

export enum LocationId {
  Forest = 'LOCATION_FOREST',
  Cave = 'LOCATION_CAVE',
}

export enum EnemyType {
  Slime = 'ENEMY_SLIME',
  Crook = 'ENEMY_CROOK',
  Boss = 'ENEMY_BOSS',
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
