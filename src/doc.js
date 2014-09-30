/*jslint node: true */
/*jscs:disable maximumLineLength*/
'use strict';

var Table = require('cli-table');

// TODO Filter with resource
module.exports = function(resource) {
  var apiVersion = 'v0';
  var table = new Table({
    head: ['Method(s)', 'Endpoint', 'Parameters', 'description'],
    colWidths: [15, 30, 30, 50]
  });

  table.push(
    ['GET', apiVersion + '/health', '-', 'Current service status and version'],
    ['GET', apiVersion + '/doc/{all,api,<module>}', '-', 'API and Insights modules docs'],
    ['', 'to be continued ...', '', '']
  );
  if ((resource === undefined) || (resource === 'all')) {
    console.log(table.toString());
  } else {
    console.log('Resource filter is not implemented yet!');
  }
};
