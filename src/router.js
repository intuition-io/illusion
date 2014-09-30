/*jslint node: true */
'use strict';

var Interfake = require('interfake');

function Router(options) {
  this.options = options;
  this.log = require('gulp-util').log;
  if (!options.verbose) {
    this.log = function() {};
  }

  this.interfake = new Interfake({
    debug: options.debug,
    path: options.apiVersion
  });
}

Router.prototype = {
  addResource: function(resourceSetup, description) {
    if (description !== undefined) {
      this.log(description);
    }
    resourceSetup(this.interfake, this.options);
    return this;
  },
  done: function() {
    this.log('Router setup completed');
    return this.interfake;
  }
};

module.exports = function(options) {
  var router = new Router(options);
  return router
    .addResource(require('./routes/status'), '+ endpoint /v0/health')
    .addResource(require('./routes/docs'), '+ endpoint /v0/docs/*')
    .addResource(require('./routes/contexts'), '+ endpoint /v0/contexts/:id')
    .addResource(require('./routes/trades'), '+ endpoint /v0/trades/:id')
    .addResource(require('./routes/portfolios'),
                 '+ endpoint /v0/portfolios/:id')
    .addResource(require('./routes/events'), '+ endpoint /v0/events/:id')
    .done();
};
