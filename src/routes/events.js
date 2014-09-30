/*jslint node: true */
'use strict';

var util = require('util');
var apiEvents = require('../models/v0/events');

/**
 * GET v0/events/:id
 * @param {Object} interfake API emulator
 * @param {Object} opts command line flags
 */
module.exports = function(interfake, opts) {
  var i = 0;
  var endpoint;
  for (; i < opts.datapoints.length; i++) {
    endpoint = util.format('/events/%s?limit=%d', opts.id, opts.datapoints[i]);
    interfake.get(endpoint)
             .status(200)
             .body(apiEvents(opts.id, opts.datapoints[i]));
  }
};
