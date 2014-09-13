/*jslint node: true */
'use strict';

var faker = require('faker');

module.exports = {

  available: ['algorithms', 'sources.backtest', 'sources.live'],
  
  module: function(version, module) {
    var modulesNumber = faker.random.number(1, 5);
    var fakeDoc = [];
    for (var i = 0; i < modulesNumber; i++) {
      fakeDoc.push({
        doc: faker.Lorem.sentence(),
        parameters: { param1: faker.Lorem.sentence(), param2: faker.Lorem.sentence() },
        path: faker.Lorem.words(2).join('.')
      });
    }
    return {
     version: version,
     resources: [
       { module: module, docs: fakeDoc }
     ]
    }
  }
};
