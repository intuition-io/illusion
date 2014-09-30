/*jslint node: true */
'use strict';

var moment = require('moment');
var uuid = require('node-uuid');
var faker = require('faker');

module.exports = function(portfolio, nEvents) {
  var j;
  var i = 0;
  var nSubEvents = faker.random.number(1, 5);
  var events = [];
  var subEvents = [];
  for (; i < nEvents; i++) {
    subEvents = [];
    for (j = 0; j < nSubEvents; j++) {
      subEvents.push({
        msg: faker.Lorem.sentence(),
        title: faker.Lorem.words(2).join(' '),
        rsi: (faker.random.number(10, 1000) / 10)
      });
    }
    events.push({
      date: moment().add(i + 1, 'days'),
      id: uuid.v4(),
      events: subEvents
    });
  }
  return {id: portfolio, data: events};
};
