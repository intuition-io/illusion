/*jslint node: true */
'use strict';

var faker = require('faker');
var metrics = require('./metrics');

module.exports = {

  available: ['algorithms', 'sources.backtest', 'sources.live'],

  module: function(version, module) {
    var i = 0;
    var modulesNumber = faker.random.number(1, 5);
    var fakeDoc = [];
    for (; i < modulesNumber; i++) {
      fakeDoc.push({
        doc: faker.Lorem.sentence(),
        // NOTE Could be more random
        parameters: {
          param1: faker.Lorem.sentence(),
          param2: faker.Lorem.sentence()
        },
        path: faker.Lorem.words(2).join('.')
      });
    }
    return {
      version: version,
      resources: [
        {module: module, docs: fakeDoc}
      ]
    };
  },

  metrics: function() {
    var metricsDoc = metrics('').data[0];
    var resources = Object.keys(metricsDoc).map(function(attribute) {
      if (typeof metricsDoc[attribute] === 'object') {
        attribute = {
          label: attribute,
          metrics: Object.keys(metricsDoc[attribute])
        };
      }
      return attribute;
    });
    return {
      version: '0.0.8',
      resources: resources
    };
  }

};
