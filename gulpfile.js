'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  myth = require('gulp-myth'),
  rigger = require('gulp-rigger'),
  svgInject = require('gulp-svg-inject'),
  newer = require('gulp-newer'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  imagemin = require('gulp-imagemin'),
  notify = require('gulp-notify'),
  del = require('del');

gulp.task('clean', function (cb) {
    del('dist/');
    cb();
});

gulp.task('scss', function () {
  return gulp.src(['src/scss/main.scss', 'src/scss/other/*.css'])
    .pipe(sass())
    .on('error', notify.onError(function (err) {
      return {
        title: 'SCSS',
        message: err.message
      }
    }))
    .pipe(myth())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function () {
  return gulp.src('src/html/index.html')
    .pipe(rigger())
    .on('error', notify.onError(function (err) {
      return {
        title: 'Html',
        message: err.message
      }
    }))
    .pipe(svgInject())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
  return gulp.src(['src/js/scripts.js', 'src/js/other/*.js'])
    .pipe(rigger())
    .on('error', notify.onError(function (err) {
      return {
        title: 'JS',
        message: err.message
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function () {
  return gulp.src('src/img/upload/**', {since: gulp.lastRun('img')})
    .pipe(imagemin())
    .pipe(newer('dist/img'))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**', {since: gulp.lastRun('fonts')})
    .pipe(newer('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build', gulp.series(
  'clean', 'html', 'js', 'scss', 'img', 'fonts')
);

gulp.task('watch', function (cb) {
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/html/**/*.*', gulp.series('html'));
  gulp.watch('src/js/**/*.*', gulp.series('js'));
  gulp.watch('src/img/upload/**/*.*', gulp.series('img'));
  gulp.watch('src/img/*.*', gulp.series('html')); // svg
  gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
  cb();
});

gulp.task('dev', gulp.series('build', 'watch'));
