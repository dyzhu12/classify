'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');

gulp.task('lint', function() {
	return gulp.src(['bin/**/*', 'public/javascripts/src/**/*', '*.js'])
			.pipe(eslint())
			.pipe(eslint.format());
});

gulp.task('js', function() {
	return browserify('./public/javascripts/src/app.jsx')
			.transform(reactify)
			.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('js-min', ['js'], function() {
	return gulp.src('public/javascripts/build/app.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('sass', function() {
	return gulp.src('public/stylesheets/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('public/stylesheets/css'));
});

gulp.task('purify', ['js', 'sass'], shell.task(
	'purifycss ' +
	'public/stylesheets/css/base.css ' +
	'public/javascripts/build/app.js views/*.jade ' +
	'--min --info --out public/stylesheets/css/base.css')
);


gulp.task('watch', function() {
	gulp.watch('public/javascripts/src/**/*.js*', ['js', 'lint']);
	gulp.watch('public/stylesheets/sass/**/*.scss', ['sass']);
	gulp.watch('*.js', ['lint']);
	gulp.watch('internal/**/*.js', ['lint']);
	gulp.watch('routes/**/*.js', ['lint']);
	gulp.watch('bin/**/*', ['lint']);
});

gulp.task('default', ['js', 'sass', 'lint', 'watch']);
gulp.task('prod', ['js', 'sass', 'js-min', 'purify']);
