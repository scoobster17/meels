
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
var request = require('request');
var shell = require('gulp-shell');
var open = require('gulp-open');

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
var expect = require('gulp-expect-file');
var confirm = require('gulp-confirm');

// server
var spawn = require('child_process').spawn;

/* ************************************************************************** */

/* Variables */
var node;
var filePaths = {
	serverConfig: 'server/server.js',
    recipesDataSeed: 'data/recipes-seed.json',
    categoriesDataSeed: 'data/categories-seed.json',
    restApiDataUrl: 'https://console.firebase.google.com/project/meels-f1766/database/data',
    recipesDataUrl: 'https://meels-f1766.firebaseio.com/recipes.json',
    categoriesDataUrl: 'https://meels-f1766.firebaseio.com/categories.json'
}

/* ************************************************************************** */

/* DATABASE */

/**
 * Task to backup the REST API data to a seed file
 */
gulp.task('backup-data', function() {
    return request(filePaths.recipesDataUrl)
        .pipe(fs.createWriteStream(filePaths.recipesDataSeed));
});

/**
 * Task to import recipes data to the REST API should anything be lost
 */
gulp.task('import-recipes-data', function() {
    var data = fs.readFileSync(filePaths.recipesDataSeed, "utf-8");
    return gulp.src(filePaths.recipesDataSeed, {read: false})
        .pipe(expect(filePaths.recipesDataSeed))
        .pipe(confirm({
            question: 'Are you sure you want to import this data? All existing data will be lost! (y/n)',
            input: '_key:y'
        }))
        .pipe(shell([
            "curl -X PUT -d '" + data + "' " + filePaths.recipesDataUrl
        ]));
});

/**
 * Task to import categories data to the REST API should anything be lost
 */
gulp.task('import-categories-data', function() {
    var data = fs.readFileSync(filePaths.categoriesDataSeed, "utf-8");
    return gulp.src(filePaths.categoriesDataSeed, {read: false})
        .pipe(expect(filePaths.categoriesDataSeed))
        .pipe(confirm({
            question: 'Are you sure you want to import this data? All existing data will be lost! (y/n)',
            input: '_key:y'
        }))
        .pipe(shell([
            "curl -X PUT -d '" + data + "' " + filePaths.categoriesDataUrl
        ]));
});

/*
    Task to show REST API data in browser (Firebase)
 */
gulp.task('show-data', function() {
    gulp.src(__filename)
        .pipe(open({uri: filePaths.restApiDataUrl}));
});

/* ************************************************************************** */

/* SERVER */

gulp.task('start-server', function() {
    gulp.start('kill-server');
    node = spawn('node', [filePaths.serverConfig], {stdio: 'inherit'});
    node.on('close', function(code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('kill-server', function() {
    if (node) node.kill();
});

gulp.task('kill-server-process', shell.task([
    'killall node'
]));

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

gulp.task("js", ['eslint'], function () {
  browserify("app/src/js/app.js")
    .transform('babelify', {presets: ["es2015", "react"]})
    .bundle()
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
    watch([filePaths.serverConfig], function() {
        gulp.start('start-server');
    });

    // start app server
	gulp.start('start-server');
});