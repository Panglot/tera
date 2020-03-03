'use strict';

module.exports = function(app) {
  var clashCardsControllers = require('./cardsController');

  // cards routes

  app.route('/cards')
    .get(clashCardsControllers.list_all_cards)
  
  app.route('/card')
    .post(clashCardsControllers.create_a_card)
}
