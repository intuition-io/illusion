/*jslint node: true */
'use strict';

var apiStatus = require('../models/v0/status');

/**
 * GET v0/health
 * @param {Object} interfake API emulator
 * @param {Object} opts command line flags
 */
module.exports = function(interfake, opts) {
  interfake.get('/health')
           .status(200)
           .body(apiStatus);
};
