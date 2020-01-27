/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

function stylus() {
    return gulp.src('src/**/*.styl').pipe(gulp.dest('lib'));
}

function js() {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'));
};

exports.default = gulp.parallel(stylus, js);
