var gulp = require('gulp'),
  clean = require('gulp-clean'),
  del = require('del')
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat')

gulp.task('clean',function(){
  return del([
    './dist/?(components|pages)/**/*.scss',
    './dist/?(components|pages|utils)/**/*.js',
    './dist/?(components|pages)/**/*.json',
    './dist/?(components|pages|templates)/**/*.wxml',
    './dist/?(components|pages)/**/*.wxss',
    './dist/app.js',
    './dist/app.json',
    './dist/app.scss',
    './dist/app.wxss',
  ])
})
gulp.task('copy',['clean'],function(){
  return gulp.src(['./src/?(assets|components|pages|templates|utils)/**/*','./src/app.js','./src/app.json','./src/app.scss'])
  .pipe(gulp.dest('./dist'))
})
gulp.task('initStyle',['copy'],function(){
  return gulp.src('./dist/**/*.scss',{ base : 'dist'})
    .pipe(sass())
    .pipe(rename(function(path){
      path.extname = '.wxss'
    }))
    .pipe(gulp.dest('./dist'))
})
gulp.task('init',['initStyle'],function(){
  del([
    './dist/**/*.scss'
  ])
  gulp.src('./dist/assets',{read : false})
    .pipe(clean())
})
gulp.task('dev',['init'],function(){
  return gulp.watch('./src/**/*',['init'])
})
gulp.task('uat',function(){
  return gulp.src(['src/config/env-uat.js','src/config/api.js'])
    .pipe(concat('apiUrl.js'))
    .pipe(gulp.dest('src/utils'))
})
gulp.task('devUat',['init','uat'],function(){
  return gulp.watch('./src/**/*',['init','uat'])
})

