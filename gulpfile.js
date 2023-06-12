const gulp = require("gulp")
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')
const {src, dest, series} = gulp

//编译 sass
function build(cb) {
  src('./src/style/index.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(cleanCSS())
    .pipe(rename('elmDesign.min.css'))
    .pipe(dest('./lib'))
  cb()
}

// 拷贝字体文件
function fonts(cb) {
  src([
    './src/style/iconfont/*.ttf',
    './src/style/iconfont/*.woff',
    './src/style/iconfont/*.woff2'
  ])
      .pipe(dest('./lib/iconfont'))
  cb()
}

//拷贝国际化文件
function langs(cb) {
  src([
    './src/locale/lang/*.js'
  ])
    .pipe(dest('./lib/lang'))
  cb()
}

function clean(cb) {
  del([
    'elmDesign.min.css',
    './lib/iconfont/',
    './lib/lang/'
  ])
  cb()
}


exports.default = series(clean, build, fonts, langs)
