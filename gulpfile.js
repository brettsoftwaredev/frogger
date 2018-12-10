const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('default', ['styles', 'image-min', 'scripts', 'html-copy'], () => {
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('index.html', ['html-copy']);
});

gulp.task('styles', () => {
    gulp.src('src/css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('image-min', () => {
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('scripts', () => {
    gulp.src(['src/js/resources.js', 'src/js/app.js', 'src/js/engine.js', ])
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('html-copy', () => {
    gulp.src('index.html')
    .pipe(gulp.dest('dist'))
})

