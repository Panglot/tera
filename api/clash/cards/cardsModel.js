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

