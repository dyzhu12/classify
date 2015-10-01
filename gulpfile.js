'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');

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

gulp.task('watch', function() {
	gulp.watch('public/javascripts/src/**/*.js*', ['js', 'lint']);
	gulp.watch('*.js', ['lint']);
	gulp.watch('bin/**/*', ['lint']);
});

gulp.task('default', ['js', 'lint', 'watch']);
