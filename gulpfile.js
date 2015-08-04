var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');

gulp.task('default', ['test', 'jshint', 'watch', 'build']);

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('test', function() {
  return gulp.src('test/*test.js')
    .pipe(mocha());
});

gulp.task('jshint', function() {
  return gulp.src(['*.js', 'test/*test.js', 'routes/*routes.js', 'models/*model.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['webpack:dev', 'copy']);

gulp.task('watch', function() {
  gulp.watch(['*.js', 'test/*test.js', 'routes/*routes.js', 'models/*model.js']);
});
