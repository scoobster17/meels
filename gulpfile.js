
/**
 * Gulpfile for meels recipe book project
 */

'use strict';

/* ************************************************************************** */

/* GULP CONFIG */

/* Dependencies */

// gulp itself
var gulp = require('gulp');

// utilities
var fs = require('fs');

// css
var sass = require('gulp-sass');

// js
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

// compilation utilities
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserify = require('browserify');

// helpers
var watch = require('gulp-watch');

// server
// var spawn = require('child_process').spawn;

/* ************************************************************************** */

/* Variables */
// var node;
// var filePaths = {
//	serverConfig: 'server/server.js'
// }

/* ************************************************************************** */

/* CSS */

/**
 * Task to compile Sass
 */
gulp.task('sass', function() {
	return gulp.src('./app/src/css/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./app/dist/css'));
});

/* ************************************************************************** */

/* JS */

// to add source maps

/*gulp.task("js", ['eslint'], function () {
  return gulp.src("app/js/** /*.babel.js")
  	.pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/js"));
});*/

gulp.task("js", ['eslint'], function () {
  browserify("app/src/js/app.js")
  	//.pipe(sourcemaps.init())
    //.pipe(babel())
    .transform('babelify', {presets: ["es2015", "react"]})
    .bundle()
    //.pipe(concat("app.js"))
    //.pipe(sourcemaps.write())
    .pipe(fs.createWriteStream("app/dist/js/app.js"));
});

// es2015 linting
gulp.task('eslint', function() {
	return gulp.src(['app/src/js/**/*.babel.js'])
		.pipe(eslint())
		.pipe(eslint.format());
});

/* ************************************************************************** */

/* PROCESSING */

/**
 * Task to watch for changes in files and trigger events
 */
gulp.task('watch', function() {

	// watch for css changes
	watch(['app/src/css/**/*.scss'], function() {
		gulp.start('sass');
	});

	// watch for js changes
	watch(['app/src/js/**/*.js'], function() {
		gulp.start('js');
	});

	// watch for server config changes
	// watch(['server/server.js'], function() {
	//	gulp.start('server');
	// });

	// start app server
	// gulp.start('server');
});