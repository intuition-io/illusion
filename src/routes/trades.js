/*jslint node: true */
'use strict';

var apiTrades = require('../models/v0/trades');

/**
 * GET v0/trades/:id
 * @param {Object} interfake API emulator
 * @param {Object} opts command line flags
 */
module.exports = function(interfake, opts) {
  interfake.get('/trades/all')
           .status(200)
           .body(apiTrades.report());

  interfake.get('/trades/unknown')
           .status(404)
           .body(apiTrades.notFound('unknown'));

  var fakeReport = apiTrades.report('persistent', opts.tradeState);
  interfake.post('/trades/persistent')
           .query({context: opts.id})
           .status(201)
           .body(apiTrades.postFeedback(opts.id));
  interfake.get('/trades/persistent')
           .status(200)
           .body(fakeReport.workers[0]);
  interfake.delete('/trades/persistent')
           .status(200)
           .body(apiTrades.deleteFeedback('persistent'));

  var tradeFeedback = interfake.post('/trades/' + opts.id)
                               .query({context: opts.id})
                               .status(200)
                               .body(apiTrades.postFeedback(opts.id));
  fakeReport = apiTrades.report(opts.id, opts.tradeState);
  tradeFeedback.extends.get('/trades/all')
                       .status(200)
                       .body(fakeReport);
  tradeFeedback.creates.get('/trades/' + opts.id)
                       .status(200)
                       .body(fakeReport.workers[0]);
  var deleteFeedback = tradeFeedback.creates
                                    .delete('/trades/' + opts.id)
                                    .status(200)
                                    .body(apiTrades.deleteFeedback(opts.id));
  // Reset /trades/{all,opts.id}
  deleteFeedback.creates.get('/trades/all')
                 .status(200)
                 .body(apiTrades.report());
  deleteFeedback.creates.get('/trades/' + opts.id)
                        .status(200)
                        .body({error: opts.id + ' not found'});
};
