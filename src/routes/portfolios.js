/*jslint node: true */
'use strict';

var apiMetrics = require('../models/v0/metrics');
var apiDocs = require('../models/v0/docs');

/**
 * Inspect metrics model to extract attributes
 */
function metricKeys() {
  var i = 0;
  var j = 0;
  var resource;
  var keys = [];
  var metricsDoc = apiDocs.metrics();

  for (; i < metricsDoc.resources.length; i++) {
    resource = metricsDoc.resources[i];
    if (typeof resource === 'object') {
      for (; j < resource.metrics.length; j++) {
        keys.push(resource.label + ':' + resource.metrics[j]);
      }
    } else {
      keys.push(resource);
    }
  }

  return keys;
}

/**
 * GET v0/portfolios/:id
 * @param {Object} interfake API emulator
 * @param {Object} opts command line flags
 */
module.exports = function(interfake, opts) {
  // TODO POST method
  // TODO Support 'from', 'to' parameter
  // TODO Support multiple 'keys'
  var j;
  var url;
  var i = 0;
  var metricKeys_ = metricKeys();

  for (; i < metricKeys_.length; i++) {
    for (j = 0; j < opts.datapoints.length; j++) {
      url = [
        '/portfolios/', opts.id,
        '?limit=', opts.datapoints[j], '&key=', metricKeys_[i]
      ].join('');
      interfake.get(url)
               .status(200)
               .body(apiMetrics(opts.id, [metricKeys_[i]], opts.datapoints[j]));
    }
  }

  interfake.get('/portfolios/unknown')
           .status(404)
           .body({
             id: 'unknown',
             data: {error: 'unknown not found in database'}
           });
};
