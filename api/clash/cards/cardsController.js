'use strict';

// Load models
require('./cardsModel');

var mongoose = require('mongoose'),
  BasicCards = mongoose.model('ClashBasicCards'),
  EnrichedCards = mongoose.model('ClashEnrichedCards'),
  SpawnBuildingCards = mongoose.model('SpawnBuilding'),
  DamageSpellCards = mongoose.model('DamageSpell');

exports.listAllBasicCards = function(req, res) {
  BasicCards.find({}, function(err, cards) {
    if (err) res.send(err);
    res.json(cards);
  })
};

exports.listAllEnrichedCards = function(req, res) {
  EnrichedCards.find({}, function(err, cards) {
    if (err) res.send(err);
    res.json(cards);
  })
};

exports.apiOfficialImport = function(req, res) {
  const cardsImport = req.body.items;
  var cardsInDb,
    newCards = [];

  BasicCards.find({}, function(err, cards) {
    if (err) res.send(err);
    cardsInDb = cards;
  })
    .then(() => {
      cardsImport.forEach(card => {
        card.gameId = card.id;
        delete card.id;
        if (!cardsInDb.some(dbCard => dbCard.gameId === card.gameId)) {
          newCards.push(card);
        }
      });

      BasicCards.insertMany(newCards, function(err, cards) {
        if (err) res.send(err);
        res.json(cards);
      })
    })
}



exports.createACard = function(req, res) {
  // var new_card = new SpawnBuildingCards(req.body);
  var new_card = new DamageSpellCards(req.body);
  new_card.save({}, function(err, card) {
    if (err) res.send(err);
    res.json(card);
  })
};
