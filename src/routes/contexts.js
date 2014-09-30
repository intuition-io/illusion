/*jslint node: true */
'use strict';

var apiContexts = require('../models/v0/contexts');

/**
 * GET v0/contexts/:id
 * @param {Object} interfake API emulator
 * @param {Object} opts command line flags
 */
module.exports = function(interfake, opts) {
  // TODO POST, then GET + DELETE then GET
  var context = opts.context || opts.id;

  interfake.get('/contexts/' + context)
           .status(200)
           .body(apiContexts.doc(context));
  interfake.get('/contexts/unknown')
           .status(200)
           .body(apiContexts.notFound('unknown'));
};
