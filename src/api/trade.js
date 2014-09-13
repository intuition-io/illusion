/*jslint node: true */
'use strict';

var moment = require('moment');
var uuid = require('node-uuid');
var faker = require('faker');

var TASKNAME = 'telepathy.backends.finance.trade';

function pendingJob(portfolio) {
  return {
    id: portfolio, 
    report: {
      done: false, 
      elapsed: 60.03192901611328, 
      id: "Pilot", 
      state: "PENDING", 
      status: "PENDING", 
      task: "telepathy.backends.finance.trade", 
      task_id: uuid.v4()
    }
  };
}

function errorJob(portfolio) {
  return {
    id: portfolio, 
    report: {
      done: true, 
      elapsed: 31.24971294403076, 
      failed: true, 
      id: "Pilot", 
      result: faker.Lorem.sentence(), 
      state: "FAILURE", 
      status: "FAILURE", 
      successful: false, 
      task: TASKNAME,
      task_id: uuid.v4(), 
      traceback: faker.Lorem.paragraph()
    }
  };
}

function successJob(portfolio) {
  return {
    id: portfolio, 
    report: {
      done: true, 
      elapsed: 170.38032007217407, 
      failed: false, 
      id: "Pilot", 
      result: {
        algo_volatility: 0.8654841034599652, 
        algorithm_period_return: 0.78819989457053, 
        alpha: 1.375590744167798, 
        benchmark_period_return: -0.0980472764645417, 
        benchmark_volatility: 0.22661920195874466, 
        beta: 0.06383225545862309, 
        excess_return: 0.76209989457053, 
        information: 1.8045140577751067, 
        max_drawdown: 0.36556258963082855, 
        period_label: "2013-07", 
        sharpe: 1.5747205673166411, 
        sortino: 2.553627859601561, 
        trading_days: 143, 
        treasury_period_return: 0.0261
      }, 
      state: "SUCCESS", 
      status: "SUCCESS", 
      successful: true, 
      task: TASKNAME, 
      task_id: uuid.v4()
    }
  };
}

module.exports = {
  postFeedback: function(portfolio) {
    return {
      enqueued: true, 
      id: portfolio, 
      start: moment().format('X'), 
      task_id: uuid.v4()
    };
  },

  report: function(portfolio, state) {
    var data = [];
    if (portfolio) {
      switch(state) {
        case 'pending':
          data.push(pendingJob(portfolio));
          break;
        case 'success':
          data.push(successJob(portfolio));
          break;
        case 'error':
          data.push(errorJob(portfolio));
          break;
        default:
          data.push(pendingJob(portfolio));
      }
    }
    return {workers: data};
  },

  notFound: function(wrongPortfolio) {
    return {
      data: {error: wrongPortfolio + ' not found in database'}
    }
  }
}
