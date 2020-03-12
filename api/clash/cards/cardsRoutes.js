'use strict';

module.exports = function(app, baseUrl) {
  var clashCardsControllers = require('./cardsController');

  app.route(baseUrl + '/official-import') // Updates BaseCards DB
    .post(clashCardsControllers.apiOfficialImport)
  
  app.route(baseUrl + '/card') // Post a card into the EnrichedCards DB
    .post(clashCardsControllers.createACard)

  app.route(baseUrl + '/card/:cardId') // From EnrichedCards DB
    .get()
    .put()
    .delete(); // Delete should have logic to return a card to BaseCardsDB
  
  app.route(baseUrl + '/cards') // EnrichedCards DB
    .get(clashCardsControllers.listAllEnrichedCards)

  app.route(baseUrl + '/cards/base') // BaseCards
    .get(clashCardsControllers.listAllBasicCards)

}
