'use strict';

module.exports = function (app, baseUrl) {
    var baseUrl = baseUrl + '/clash';
    var routes = require('./cards/cardsRoutes');
    routes(app, baseUrl);
}