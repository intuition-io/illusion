/*jslint node: true */
/*jshint camelcase: false */
/*jscs:disable requireCamelCaseOrUpperCaseIdentifiers*/
'use strict';

var moment = require('moment');
var uuid = require('node-uuid');
var faker = require('faker');

function cumulativePerf() {
  return {
    capital_used: 107674.49865585833,
    ending_cash: 117674.49865585833,
    ending_value: -100842,
    period_close: 'Thu, 25 Jul 2013 23:00:00 GMT',
    period_open: 'Mon, 31 Dec 2012 23:00:00 GMT',
    pnl: 6832.498655858333,
    portfolio_value: 16832.498655858333,
    returns: 0.6832498655858333,
    starting_cash: 10000,
    starting_value: 0
  };
}

function cumulativeRiskMetrics() {
  return {
    algo_volatility: 1.1205332904329135,
    algorithm_period_return: 0.6832498655858237,
    alpha: 1.1849056801009268,
    benchmark_period_return: -0.0980472764645417,
    benchmark_volatility: 0.22661920195874466,
    beta: 0.03498026204659222,
    excess_return: 0.6571498655858237,
    information: 1.2287286232412262,
    max_drawdown: 0.41694693028417595,
    period_label: '2013-07',
    sharpe: 1.051239373463075,
    sortino: 1.7073269562838835,
    trading_days: 143,
    treasury_period_return: 0.0261
  };
}

function dailyPerfOrders() {
  return [
    {
      amount: -100,
      commission: 2.5,
      created: 'Wed, 24 Jul 2013 15:25:00 GMT',
      dt: 'Wed, 24 Jul 2013 15:25:00 GMT',
      filled: -100,
      id: '2d842b1675f1469b804ea9093ecb7212',
      limit: null,
      limit_reached: false,
      reason: null,
      sid: 'mc',
      status: 1,
      stop: null,
      stop_reached: false
    },
    {
      amount: -100,
      commission: 2.5,
      created: 'Wed, 24 Jul 2013 15:25:00 GMT',
      dt: 'Wed, 24 Jul 2013 15:25:00 GMT',
      filled: -100,
      id: 'a30b83043075421889870fb33b65b51f',
      limit: null,
      limit_reached: false,
      reason: null,
      sid: 'saf',
      status: 1,
      stop: null,
      stop_reached: false
    }
  ];
}

function dailyPerfPositions() {
  return [
    {
      amount: 23,
      cost_basis: 127.53499976213176,
      last_sale_price: 127.56,
      sid: 'mc'
    },
    {
      amount: 10,
      cost_basis: 37.06499998990851,
      last_sale_price: 38.93,
      sid: 'dg'
    },
    {
      amount: 40,
      cost_basis: 28.23500000988223,
      last_sale_price: 26.08,
      sid: 'alo'
    }
  ];
}

function dailyPerfTransactions() {
  return [
    {
      amount: -100,
      commission: 2.5,
      dt: 'Wed, 24 Jul 2013 15:25:00 GMT',
      order_id: '2d842b1675f1469b804ea9093ecb7212',
      price: 127.53499976213176,
      sid: 'mc'
    },
    {
      amount: -100,
      commission: 2.5,
      dt: 'Wed, 24 Jul 2013 15:25:00 GMT',
      order_id: 'a30b83043075421889870fb33b65b51f',
      price: 41.554999950906314,
      sid: 'saf'
    }
  ];
}

function dailyPerf() {
  return {
    capital_used: 16908.999971303805,
    ending_cash: 117674.49865585825,
    ending_value: -100842,
    orders: dailyPerfOrders(),
    period_close: 'Thu, 25 Jul 2013 20:00:00 GMT',
    period_open: 'Thu, 25 Jul 2013 13:31:00 GMT',
    pnl: -407.0000286962022,
    portfolio_value: 16832.498655858246,
    positions: dailyPerfPositions(),
    returns: -0.023608576800487228,
    starting_cash: 100765.49868455445,
    starting_value: -83526,
    transactions: dailyPerfTransactions(),
  };
}

function portfolioPositions() {
  return {
    aca: {
      amount: 100,
      cost_basis: 6.505000000087702,
      last_sale_price: 7.13,
      sid: 'aca'
    },
    ai: {
      amount: -100,
      cost_basis: 95.63999982514976,
      last_sale_price: 96.33,
      sid: 'ai'
    },
    alu: {
      amount: 100,
      cost_basis: 1.1316666666695512,
      last_sale_price: 1.64,
      sid: 'alu'
    }
  };
}

function portfolio() {
  return {
    _solver: 'SLSQP',
    capital_used: 107674.49865585833,
    cash: faker.random.number(5000, 100000),
    pnl: 6832.498655858333,
    portfolio_value: 16832.498655858333,
    positions: portfolioPositions(),
  };
}

function standardRecorded() {
  return {
    ac: {
      price: 28.18,
      signals: {
        high: 70,
        low: 30,
        rsi: 65.56776556776558
      }
    },
    aca: {
      price: 7.18,
      signals: {
        high: 70,
        low: 30,
        rsi: 74.39999999999998
      }
    },
    ai: {
      price: 95.82,
      signals: {
        high: 70,
        low: 30,
        rsi: 72.4444444444444
      }
    },
    alo: {
      price: 25.74,
      signals: {
        high: 70,
        low: 30,
        rsi: 65.87926509186349
      }
    }
  };
}

function Snapshot(length, capitalBase) {
  this.capital = capitalBase || 10000;
  this._lastDate = moment().add(length, 'days');
  this.startDate = this._lastDate.format();
  this.endDate = moment().format();
}

Snapshot.prototype = {

  nextDate: function(offset) {
    offset = offset || 1;
    this._lastDate = this._lastDate.subtract(offset, 'days');
    return parseInt(this._lastDate.format('X'), 10);
  },

  next: function(days) {
    return {
      capital_base: this.capital,
      cumulative_perf: cumulativePerf(),
      cumulative_risk_metrics: cumulativeRiskMetrics(),
      daily_perf: dailyPerf(),
      date: this.nextDate(days),
      id: uuid.v4(),
      period_end: this.startDate,
      period_start: this.endDate,
      portfolio: portfolio(),
      // TODO Fake below too
      progress: 1,
      recorded: standardRecorded()
    };
  }
};

function walkStructure(data, key, defaultValue) {
  defaultValue = defaultValue || -1;
  var path = key.split(':');
  var i = 0;
  var value;
  for (; i < path.length; i++) {
    if (data.hasOwnProperty(path[i])) {
      value = data[path[i]];
      data = value;
    } else {
      value = defaultValue;
      break;
    }
  }
  return value;
}

module.exports = function(id, keys, length) {
  length = length || 1;
  var snapshot_ = new Snapshot(length);
  var data = [];
  var _rowData;
  var row;
  var j;
  var i = 0;

  for (; i < length; i++) {
    row = snapshot_.next(1);
    _rowData = {};
    if (keys !== undefined) {
      keys.push('date');
      for (j = 0; j < keys.length; j++) {
        _rowData[keys[j]] = walkStructure(row, keys[j]);
      }
    } else {
      _rowData = row;
    }
    data.push(_rowData);
  }
  return {data: data, id: id};
};
