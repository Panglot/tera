'use strict';
var mongoose = require('mongoose');
var merge = require('lodash/merge');
var Schema = mongoose.Schema;

var BaseCardObject = {
  name: {
    type: String,
    required: 'Every card should have a name'
  },
  gameId: {
    type: Number,
    required: 'Every card should have gameId'
  },
  maxLevel: {
    type: Number
  },
  iconUrls: {
    type: Object
  }
}

var baseCardOptions = { collection: 'BaseCards' };
var BaseCardSchema = new Schema(BaseCardObject, baseCardOptions);
var BaseCard = mongoose.model('ClashBasicCards', BaseCardSchema);


var enrichedCardsOptions = { discriminatorKey: 'cardType', collection: 'EnrichedCards' };
var EnrichedCardSchema = new Schema(BaseCardObject, enrichedCardsOptions);
var EnrichedCard = mongoose.model('ClashEnrichedCards', EnrichedCardSchema);

var SpawnBuildingObject = merge(BaseCardObject, { 
  spawnTimer: Number
});
var SpawnBuilding = EnrichedCard.discriminator('SpawnBuilding', new Schema(SpawnBuildingObject, enrichedCardsOptions));

var DamageSpellObject = merge(BaseCardObject, { 
  radius: Number,
  damage: Number
});
var DamageSpell = EnrichedCard.discriminator('DamageSpell', new Schema(DamageSpellObject, enrichedCardsOptions));










var BaseEnrhichedCard = merge(BaseCardObject, {
  rarity: String,
  cost: Number
});

var TroopObject = merge(BaseEnrhichedCard, {
  health: Number,
  shield: Number,
  movementSpeed: Number,
  attack: {
    flatDamage: Number,
    attackSpeed: Number,
    damagePerSecond: Number,
    targets: Target // Target enum, air, ground
  },
  range: {
    value: Number,
    type: { type: String } // try if I can skip the double type; make range types enum
  },
  count: Number,
  tags: [Types], // Make tags enum
  effect: [Effects] // Make effects enum

});

var BuildingObject = merge(BaseEnrhichedCard, {
  health: Number,
  lifetime: Number,
  lifeTick: Number,
  attack: {
    flatDamage: Number,
    attackSpeed: Number,
    damagePerSecond: Number,
    targets: Target // Target enum, air, ground
  },
  range: {
    value: Number,
    type: { type: String } // range types enum
  },
  tags: [Types], // Types enum
  effect: [Effects] // Effects enum
});


var SpellObject = merge(BaseEnrhichedCard, {
  damage: {
    flatDamage: Number,
    crownTowerDamage: Number
  },
  radius: {
    range: Number,
    width: Number,
  },
  tags: [Types],
  effect: [Effects] // Effects enum
});

var Effects = {
  BOMB: {
    description: { type: String, default: "Drops bomb on death. The bomb explodes after a short while." },
    damage: Number
  },
  ENTRANCE: {
    description: { type: String, default: "Deals damage on entrance." },
    damage: Number
  },
  EXPLOSIVE_ENTRANCE: {
    description: { type: String, default: "Deals damage and knocks back on entrance." },
    damage: Number
  },
  SPAWNER: {
    description: { type: String, default: "Spawns units" },
    troop: TroopObject,
    spawnSpeed: SpawnSpeed, // Spawn speed
    spawnCount: Number,
    maximumSpawned: Number
  },
  SHIELDED: {
    description: { type: String, default: "This unit has a shield. The shield must be destroyed first to damage the unit's health. The damage from one instance does not transfer from the shield to the health."}
  },
  CHARGE: {
    description: { type: String, default: "After a short walk this unit will charge. While charged it gains movement speed and its next attack will deal double its damage."},
    damage: Number
  },
  CHARGE_AOE: {
    description: { type: String, default: "After a short walk this unit will charge. While charged it gains movement speed and its next attack will deal double its damage in 360 radius."},
    damage: Number
  },
  DASH: {
    description: { type: String, default: "If not in melee range, but in charge range, after a short preparation the unit will become invulnerable to damage and dash towards the targeted enemy dealing double damage."},
    damage: Number
  },
  HEAL: {
    description: { type: String, default: "Healing effect in an AOE."},
  }
}