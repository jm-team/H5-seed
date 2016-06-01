/**
 * Created by iceli on 2015/7/23.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    replace = require('gulp-replace');
var concat = require('gulp-concat');

var package = require("./package.json");
var name = package.name;
var version = package.version;
var dir =  name +'/'+version;

gulp.task('concat', function() {                                //- 创建一个名为 concat 的 task
    gulp.src(['static/css/common.css', 'static/css/main.css'])    //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('style.css'))                            //- 合并后的文件名
        .pipe(replace(/['"](\d+)px['"]|\b(\d+)px\b/g, function(pixel) {
            if ( /'|"/.test(pixel) || '1px' == pixel || '0px' == pixel) {
                return pixel;
            }
            return ( parseInt(pixel) * 1 / 62.1 ) + 'rem';
        }))
        .pipe(gulp.dest('static/css'))                               //- 输出文件本地
        .pipe(minifycss())                                      //- 压缩处理成一行
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/css'))                               //- 输出文件本地
});

gulp.task('watch', function() {
    gulp.watch('static/css/main.css', ['concat']);
    var server = livereload();
    gulp.watch(['static/css/']).on('change', function(file) {
        server.changed(file.path);
    });
});

gulp.task('default', ['concat', 'watch']);
