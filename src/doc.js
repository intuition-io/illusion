/*jslint node: true */
'use strict';

var Table = require('cli-table');

// TODO Filter with resource
module.exports = function(resource) {
  var table = new Table({
    head: ['Method(s)', 'Endpoint', 'Parameters', 'description'],
    colWidths: [15, 30, 30, 50]
  });

  table.push(
    ['GET', '/v0/health', '-', 'Current service status and version'],
    ['GET', '/v0/doc/{all,api,<module>}', '-', 'API and Insights modules docs'],
    ['', 'to be continued ...', '', '']
  );
  if ((resource === undefined) || (resource === 'all')) {
    console.log(table.toString());
  } else {
    console.log('Resource filter is not implemented yet!')
  }
}
