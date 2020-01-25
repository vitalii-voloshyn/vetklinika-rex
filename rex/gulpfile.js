const { series, src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const inject = require('gulp-inject');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');


function copyFiles(){
    return src('./src/index.html')
            .pipe(dest('dist/'));
}

function img(){
  return src('./src/assets/img/**/*')
         .pipe(dest('dist/assets/img'))
}

function scripts(cb){
    return src(['node_modules/jquery/dist/jquery.min.js',
               'node_modules/bootstrap/dist/js/bootstrap.min.js',
               'node_modules/slick-carousel/slick/slick.min.js',
               'src/scripts/*.js'])
        .pipe(concat('app.js'))
        .pipe(dest('dist/js'))
}

function styles(cb){
    return src('src/assets/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(concat('main.css'))
        .pipe(dest('dist/assets/css'))
}

function html(){
    const sources = src(['./dist/js/*.js', './dist/assets/css/*.css'], {read: false});
   
    return src('./dist/index.html')
            .pipe(inject(sources, {  relative: true }))
            .pipe(dest('./dist'));

}

function watchFiles(){
    watch('./src/index.html', series(copyFiles, html));
    watch('./src/**/*.js', scripts);
    watch('src/**/*.scss', styles);
}

function serve(){
    browserSync.init({
        server: "./dist",
        domain: '0.0.0.0'
    });

    watch('./src/index.html', series(copyFiles, html, (cb)=> { browserSync.reload(); cb()}));
    watch('./src/**/*.js', series(scripts, (cb)=> { browserSync.reload(); cb()}));
    watch('src/**/*.scss', series(styles, (cb)=> {browserSync.reload(); cb()}));
}


const build = series(copyFiles, scripts, styles, html,img);

module.exports = {
    build: build,
    dev: series(build, watchFiles),
    serve: series(build, serve),
}
