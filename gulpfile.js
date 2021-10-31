const { series, watch } = require('gulp');

var gulp = require('gulp');

var browserify = require('browserify');

var source = require('vinyl-source-stream');

var tsify = require('tsify');

var fs = require('fs');

function clean(cb) {
  fs.rmdirSync('./dist', { recursive: true, force: true });
  cb();
}

function bundle(cb) {
  browserify({
    basedir: '.',
    debug: true,
    entries: ['main.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
  cb();
}

function defaultTask(cb) {
  clean(cb);
  bundle(cb);
  watch("./src/*", series(clean, bundle));
}

exports.default = defaultTask;
