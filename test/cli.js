var should = require('should');
var pkg = require('../package');
var cli = require('../src/cli');

describe('Check cli program sanity', function() {

  describe('Check version syntax (semver.org)', function() {
    it('Should return true', function() {
      cli.validateSemver(pkg.version).should.be.ok;
    })
  })

  describe('Check latest version', function() {
    it('Should return true', function() {
      cli.checkUpdate(pkg.name, pkg.version);
    })
  })

})

describe('Check cli arguments parser', function() {

  describe('Check global options', function() {
    it('Should have flag --version', function() {
      var i;
      program = cli.setup();
      versionOpt = program.options[0];
      versionOpt.flags.should.be.exactly('-V, --version');
      versionOpt.bool.should.be.true;
    })
  })

  describe('Check "fakeit" command', function() {
    it('Should be comprehensive', function() {
      var cmd = cli.setup().commands[0];
      cmd._name.should.be.equal('fakeit');
      cmd._description.should.be.not.equal('');
    })
    it('Should have correct options with default values', function() {
      // NOTE More detailed tests wit cmd.options ?
      var cmd = cli.setup().commands[0];
      cmd._args.should.be.empty;
      cmd.id.should.be.equal('Pilot');
      cmd.port.should.be.equal(3333);
      cmd.apiVersion.should.be.equal('v0');
      cmd.tradeState.should.be.equal('success');
      cmd.should.have.property('metric');
      cmd.should.have.property('datapoints');
    })
  })

  describe('Check "doc" command', function() {
    it('Should be setup', function() {
      var cmd = cli.setup().commands[1];
      cmd._name.should.be.equal('doc');
      cmd._description.should.be.not.exactly('');
    })
    it('Should have an optional resource argument', function() {
      var optionalArg = cli.setup().commands[1]._args[0];
      optionalArg.name.should.be.equal('resource');
      optionalArg.required.should.not.be.true;
    })
  })

})
