'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('test', function () {
    return gulp.src('test/*.js', {read: false})
               .pipe(mocha({reporter: 'spec'}));
});

gulp.task('coverage', function (cb) {
  gulp.src(['src/**/*.js', 'bin/illusion.js'])
      .pipe(istanbul()) // Covering files
      .on('finish', function () {
        gulp.src(['test/*.js'])
            .pipe(mocha())
            .pipe(istanbul.writeReports()) // Creating the reports after tests runned
            .on('end', cb);
    });
});

gulp.task('jscs', function () {
    return gulp.src(['bin/*.js', 'src/**/*.js'])
               .pipe(jscs());
});

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src(['bin/*.js', 'src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lint', ['jscs', 'jshint']);

// Watch Files For Changes
gulp.task('default', ['lint', 'test'], function () {
  gulp.watch(['{bin,src}/**/*.js'], ['lint', 'test']);
});
