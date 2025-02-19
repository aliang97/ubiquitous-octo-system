export enum EquippableItemType {
  Helmet = 'ITEM_HELMET',
  Sword = 'ITEM_SWORD',
  Body = 'ITEM_BODY',
  Gloves = 'ITEM_GLOVES',
  Boots = 'ITEM_BOOTS',
  Bow = 'ITEM_BOW',
  Daggers = 'ITEM_DAGGERS',
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

export enum AffixType {
  ArmorBase = 'AFFIX_ARMORBASE',
  AttacksPerSecondBase = 'AFFIX_ATTACKSPERSECONDBASE',
  HitDamageBase = 'AFFIX_HITDAMAGEBASE',
}

export enum StatType {
  ArmorBase = 'STAT_ARMORBASE',
  ArmorIncr = 'STAT_ARMORINCR',
  AttacksPerSecondBase = 'STAT_ATTACKSPERSECONDBASE',
  HitDamageMaxBase = 'STAT_HITDAMAGEMAXBASE',
  HitDamageMinBase = 'STAT_HITDAMAGEMINBASE',
  // HitPointsBase = 'STAT_HITPOINTSBASE',
  // HitPointsIncr = 'STAT_HITPOINTSINCR',
  // AttacksPerSecondIncr = 'STAT_ATTACKSPERSECONDINCR',
  // HitDamageIncr = 'STAT_HITDAMAGEINCR',
}

export enum StatScope {
  Local = 'STATSCOPE_LOCAL',
  Global = 'STATSCOPE_GLOBAL',
}
