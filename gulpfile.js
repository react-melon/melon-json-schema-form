/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

const gulp = require('gulp');
const webpack = require('webpack');
const conf = require('./tools/webpack.prod');
const gutil = require('gulp-util');

gulp.task('stylus', function () {
    return gulp.src('src/**/*.styl').pipe(gulp.dest('lib'));
});

gulp.task('webpack', done => {

    webpack(conf, (err, stats) => {

        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({}));

        done();

    });

});

gulp.task('build', ['webpack', 'stylus']);

gulp.task('default', ['build']);
