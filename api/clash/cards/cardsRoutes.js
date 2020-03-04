'use strict';

module.exports = function(app, baseUrl) {
  var clashCardsControllers = require('./cardsController');

  // cards routes
  
  app.route(baseUrl + '/cards')
    .get(clashCardsControllers.listAllCards)
  
  app.route(baseUrl + '/card')
    .post(clashCardsControllers.createACard)

  app.route(baseUrl + '/official-import')
    .post(clashCardsControllers.apiOfficialImport)
}
