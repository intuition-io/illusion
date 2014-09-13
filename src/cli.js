/*jslint node: true */
'use strict';

var program = require('commander');
var semver = require('semver');
var log = require('gulp-util').log;
var updateNotifier = require('update-notifier');
var doc = require('./doc')
var fakeAPI = require('./routes')

function splitCommaStirng(sentence) {
  return sentence.split(',');
}

module.exports = {
  checkUpdate: function(name, version) {
    var uptodate = true;
    var notifier = updateNotifier({
      packageName: name,
      packageVersion: version
    });
    if (notifier.update) {
      // notify using the built-in convenience method
      notifier.notify();
      uptodate = false;
    }
    return uptodate;
  },

  validateSemver: function(version) {
    return semver.valid(version) === null ? false : true;
  },

  setup: function(version) {
    program
      .version(version)

    program
      .command('fakeit')
      .description('Emulate API server')
      .option('-v, --verbose', 'Print out API setup informations')
      .option('-d, --debug', 'Switch on interfake debug mode')
      .option('-i, --id [id]', 'Portfolio [id] resource to fetch', 'Pilot')
      .option('-p, --port [port]', 'Server [port] to listen to', 3333)
      .option('-a, --api-version [version]', 'Telepathy API [version] to fake', 'v0')
      .option('--datapoints [length]', 'Comma separated number of data points returned', splitCommaStirng, [5])
      .option('-t, --trade-state [state]', 'Trading result once posted (success, error, pending)', 'success')
      .option('-c, --context [context]', 'Context used for trading')
      .option('-m, --metric [attribute]', 'Comma separated portfolio metrics to make available', splitCommaStirng, ['portfolio'])
      .action(function(env) {
        log('Emulating Telepathy server on port', env.port);
        fakeAPI(env).listen(env.port);
      })

    program
      .command('doc [resource]')
      .description('Pretty print API documentation for the given resource')
      .action(function(resource) {
        doc(resource);
      })

    return program;
  }
}
