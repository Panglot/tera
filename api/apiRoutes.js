'use strict';

module.exports = function (app) {
    var baseUrl = '/api';
    var routes = require('./clash/clashRoutes');
    routes(app, baseUrl);
}