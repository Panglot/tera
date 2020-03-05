'use strict';

// Load models
require('./cardsModel');

var mongoose = require('mongoose'),
  Card = mongoose.model('ClashCards');

exports.listAllCards = function(req, res) {
  Card.find({}, function(err, cards) {
    if (err) res.send(err);
    res.json(cards);
  })
};

exports.apiOfficialImport = function(req, res) {
  const cardsImport = req.body.items;
  var cardsInDb,
    newCards = [];

  Card.find({}, function(err, cards) {
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

      Card.insertMany(newCards, function(err, cards) {
        if (err) res.send(err);
        res.json(cards);
      })
    })
}



exports.createACard = function(req, res) {
  var new_card = new Card(req.body);
  new_card.save({}, function(err, card) {
    if (err) res.send(err);
    res.json(card);
  })
};
