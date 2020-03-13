'use strict';

module.exports = function(app, baseUrl) {
  var clashCardsControllers = require('./cardsController');

  // BaseCards DB
  app.route(baseUrl + '/official-import')
    .post(clashCardsControllers.officialApiImport)

  app.route(baseUrl + '/cards/base')
    .get(clashCardsControllers.listAllBasicCards)

  // EnrichedCards DB
  app.route(baseUrl + '/card')
    .post(clashCardsControllers.createACard)

  app.route(baseUrl + '/card/:cardId')
    .get()
    .put()
    .delete(); // Delete should have logic to return a card to BaseCardsDB

  app.route(baseUrl + '/cards')
    .get(clashCardsControllers.listAllEnrichedCards)
}
