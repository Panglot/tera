'use strict';

module.exports = function(app, baseUrl) {
  var clashCardsControllers = require('./cardsController');

  // cards routes
  app.route(baseUrl + '/official-import') // Updates baseCards DB
  .post(clashCardsControllers.apiOfficialImport)
  
  app.route(baseUrl + '/card') // Post a card into the richCards DB
    .post(clashCardsControllers.createACard)

  app.route(baseUrl + '/card/:cardId') // From richCards DB
    .get()
    .put()
    .delete(); // Delete should have logic to return a card to baseCardsDB
  
    app.route(baseUrl + '/cards') // richCards DB
    .get(clashCardsControllers.listAllEnrichedCards)

    app.route(baseUrl + '/cards/base') // baseCards
      .get(clashCardsControllers.listAllBasicCards)

}
