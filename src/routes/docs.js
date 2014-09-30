/*jslint node: true */
'use strict';

var apiDocs = require('../models/v0/docs');

/**
 * GET v0/docs/*
 * @param {Object} interfake API emulator
 * @param {Object} opts command line flags
 */
module.exports = function(interfake, opts) {
  // TODO v0/docs/all
  var i = 0;

  interfake.get('/docs/api').status(500).body({error: 'not implemented'});
  interfake.get('/docs/all').status(500).body({error: 'not implemented'});

  interfake.get('/docs/metrics')
           .status(200)
           .body(apiDocs.metrics());

  for (; i < apiDocs.available.length; i++) {
    interfake.get('/docs/' + apiDocs.available[i])
             .status(200)
             .body(apiDocs.module('0.0.8', apiDocs.available[i]));
  }
};
