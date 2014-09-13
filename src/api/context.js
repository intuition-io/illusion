/*jslint node: true */
'use strict';

var faker = require('faker');

module.exports = {
  doc: function(docID) {
    return {
      context: {
        algorithm: {
              interactive: false, 
              orders: "on", 
              save: true
          }, 
          author: {
              gender: "", 
              location: faker.Address.city(), 
              name: faker.Name.findName(), 
              picture: faker.Image.avatar(), 
              website: faker.Internet.domainName()
          }, 
          cash: faker.random.number(5000, 100000), 
          end: faker.Date.recent(60), 
          id: docID, 
          modules: {
              algorithm: "insights.algorithms.signals.RSIWithMACD", 
              backtest: "insights.sources.backtest.database.RethinkdbBackedByQuandl", 
              live: "insights.sources.live.equities.Stocks"
          }, 
          start: faker.Date.past(200), 
          universe: "stocks:paris:cac40,30"
      }, 
      id: docID
    };
  },

  notFound: function(docID) {
    return {
      data: {error: docID + ' not found in database'},
      id: docID
    };
  }
};
