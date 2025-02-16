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
  Uninitialized = 'COMBATINSTANCESTATUS_UNINITIALIZED',
  Starting = 'COMBATINSTANCESTATUS_STARTING',
  Ongoing = 'COMBATINSTANCESTATUS_ONGOING',
  Ending = 'COMBATINSTANCESTATUS_ENDING',
}
