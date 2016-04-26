// include gulp
var gulp = require('gulp');

// Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var combineMq = require('gulp-combine-mq');
var notify = require("gulp-notify");
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');

var config = {
  bowerDir: './bower_components',
  srcPath: './resources',
  dstPath: './public'
};

// Installa dipendenze bower
gulp.task('bower', function () {
  return bower().pipe(gulp.dest(config.bowerDir));
});

// Font Awesome
gulp.task('icons', function () {
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') .pipe(gulp.dest(config.dstPath + '/fonts'));
});

// SASS compilazione manuale
gulp.task('sass', function () {
  gulp.src([config.srcPath + '/scss/style.scss', config.bowerDir + '/fontawesome/scss/font-awesome.scss'])
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefix('last 10 versions'))
          .pipe(concat('style.css'))
          .pipe(sourcemaps.write('./maps'))
          .pipe(gulp.dest(config.dstPath + '/css'));
});

// Combine Media Queries
gulp.task('combineMq', function () {
  return gulp.src(config.dstPath + '/css/style.css')
          .pipe(combineMq({
            beautify: false
          }))
          .pipe(minifyCSS())
          //.pipe(concat('style.min.css')) // Decommentare per dare il nome .min al file minificato
          .pipe(gulp.dest(config.dstPath + '/css'));
});

// JS & SASS watch, compilazione automatica
gulp.task('watch', function () {
  gulp.watch(config.srcPath + '/scss/**/*.scss', ['sass']);
  gulp.watch(config.srcPath + '/js/**/*.js', ['scripts']);
});

// Javascript, concatena
gulp.task('scripts', function () {
  gulp.src([
    config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.js',
    config.srcPath + '/js/*.js'
  ])
  .pipe(concat('site.js'))
  .pipe(gulp.dest(config.dstPath + '/js'));
});

// Javascript, minimizza e ottimizza per produzione
gulp.task('combineJs', function () {
  gulp.src(config.dstPath + '/js/site.js')
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(gulp.dest(config.dstPath + '/js'));
});

// Operazioni combinate
gulp.task('default', ['bower', 'icons']);
gulp.task('deploy', ['bower', 'icons', 'sass', 'combineMq', 'scripts', 'combineJs']);
