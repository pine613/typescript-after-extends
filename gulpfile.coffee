gulp = require 'gulp'
rename = require 'gulp-rename'
header = require 'gulp-header'
uglify = require 'gulp-uglify'
typescript = require 'gulp-tsc'
webpack = require 'gulp-webpack'
plumber = require 'gulp-plumber'
jshint = require 'gulp-jshint'
tslint = require 'gulp-tslint'

pkg = require './package.json'

banner = '''
/*!
 * typescript-after-extends
 * (C) 2014 Pine Mizune / MIT License
 */
'''

gulp.task 'lint', ->
    gulp.src ['index.js', 'lib/**/*.js']
        .pipe jshint()
        .pipe jshint.reporter('jshint-stylish')
    
    gulp.src 'test/**/*.ts'
        .pipe tslint()
        .pipe tslint.report('prose')

gulp.task 'webpack', ->
    gulp.src 'index.js'
        .pipe webpack
            output:
                library: 'TypeScriptAfterExtends'
                libraryTarget: 'umd'
                filename: pkg.name + '.js'
        .pipe header(banner)
        .pipe gulp.dest('dist/')
        
        .pipe uglify()
        .pipe header(banner)
        .pipe rename( suffix: '.min' )
        .pipe gulp.dest('dist/')

gulp.task 'build-tests', ->
    gulp.src 'test/**/*.ts'
        .pipe plumber()
        .pipe typescript
            target: 'ES5'
            module: 'commonjs'
            noImplicitAny: true
        .pipe gulp.dest('test/')

gulp.task 'watch', ->
    gulp.watch 'test/**/*.ts', ['build-tests']
    gulp.watch ['index.js', 'lib/**/*.js'], ['lint']

gulp.task 'default', ['build']
gulp.task 'build', ['webpack', 'lint']