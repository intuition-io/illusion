#!/usr/bin/env node
/*jslint node: true */
'use strict';

/**
 * Intuition API emulation and documentation.
 */
var log = require('gulp-util').log;
var chalk = require('chalk');
var cli = require('../src/cli');
var pkg = require('../package');

if (!cli.validateSemver(pkg.version)) {
  log(chalk.bold.red('Invalid package version: ' + pkg.version));
  log(chalk.bold.red('Check http://semver.io/ and fix package.json'));
  process.exit(1);
}

// Suggest a newer package version if available
cli.checkUpdate(pkg.name, pkg.version);

log(chalk.bold(pkg.name), 'version', chalk.bold(pkg.version));
// Setup parser
var program = cli.setup();
// Process commands
program.parse(process.argv);
