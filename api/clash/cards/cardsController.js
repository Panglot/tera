'use strict';

var mongoose = require('mongoose'),
  Card = mongoose.model('ClashCards');

exports.list_all_cards = function(req, res) {
  Card.find({}, function(err, cards) {
    if (err) res.send(err);
    res.json(cards);
  })
};

exports.create_a_card = function(req, res) {
  var new_card = new Card(req.body);
  new_card.save({}, function(err, card) {
    if (err) res.send(err);
    res.json(card);
  })
};