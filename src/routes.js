/*jslint node: true */
'use strict';

/**
 * Routes, defined as development goes along.
 */

var Interfake = require('interfake');
var log = require('gulp-util').log;
var apiStatus = require('./api/status');
var apiContext = require('./api/context');
var metrics = require('./api/metrics');
var trade = require('./api/trade');
var apidoc = require('./api/doc');
var util = require('util');

module.exports = function(program) {
  if (!program.verbose) {
    log = function(){};
  }

  var interfake = new Interfake({
    debug: program.debug,
    path: program.apiVersion
  });

  var context = program.context || program.id;
  var i, j, k;

  // GET v0/health
  log('Setup new Health endpoint', program.apiVersion + '/health');
  interfake.get('/health').status(200).body(apiStatus);

  // GET v0/contexts/:id
  // TODO POST, then GET + DELETE then GET
  log('Setup new Context endpoint', program.apiVersion + '/contexts/' + program.id);
  interfake.get('/contexts/' + context).status(200).body(apiContext.doc(context));
  log('Register invalid doc with id', 'unknown');
  interfake.get('/contexts/unknown').status(200).body(apiContext.notFound('unknown'));

  // GET v0/docs/*
  // TODO v0/docs/all
  log('Setup new Doc endpoint', program.apiVersion + '/docs/api');
  interfake.get('/docs/api').status(200).body({error: 'not implemented'});
  interfake.get('/docs/<source>').status(200).body({error: 'not implemented'});
  interfake.get('/docs/all').status(200).body({error: 'not implemented'});
  for (i = 0; i < apidoc.available.length; i++) {
    log('Setup new Doc endpoint', program.apiVersion + '/docs/' + apidoc.available[i]);
    interfake.get('/docs/' + apidoc.available[i])
             .status(200)
             .body(apidoc.module('0.0.8', apidoc.available[i]));
  }

  // GET | POST v0/trades/*
  // TODO DELETE after post
  log('Setup new Trade endpoint', program.apiVersion + '/trades/' + program.id);
  interfake.get('/trades/all').status(200).body(trade.report());
  log('Setup new Trade endpoint always available', program.apiVersion + '/trades/Gekko');
  var fakeReport = trade.report('Gekko', program.tradeState);
  var tradeFeedback = interfake.get('/trades/Gekko')
                               .status(200)
                               .body(fakeReport.workers[0]);
  log('Extend Trades endpoint with new trading session');
  fakeReport = trade.report(program.id, program.tradeState);
  tradeFeedback.extends.get('/trades/all')
                       .status(200)
                       .body(fakeReport);
  tradeFeedback.creates.get('/trades/' + program.id)
                       .status(200)
                       .body(fakeReport.workers[0]);

  // GET v0/portfolios/*
  // TODO POST method
  // TODO Support 'last', 'from', 'to' parameter
  // TODO Support multiple 'keys'
  log('Setup new Portfolio endpoint', program.apiVersion + '/portfolios/' + program.id);
  log('Unable new datapoints length', program.datapoints);
  for (k = 0; k < program.metric.length; k++) {
    for (j = 0; j < program.datapoints.length; j++) {
      interfake.get(util.format('/portfolios/%s?limit=%d&key=%s', program.id, program.datapoints[j], program.metric[k]))
               .status(200)
               .body(metrics(program.id, [program.metric[k]], program.datapoints[j]));
    }

    interfake.get(util.format('/portfolios/%s?key=%s&last=true', program.id, program.metric[k]))
             .status(200)
             .body(metrics(program.id, [program.metric[k]], 1));
  }

  log('Register invalid portfolio with id', 'unknown');
  interfake.get('/portfolios/unknown')
           .status(404)
           .body({
             id: 'unknown',
             data: {error: 'unknown not found in database'}
           });

  return interfake;
}
