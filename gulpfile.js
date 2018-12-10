const gulp = require('gulp');
const eslint = require('gulp-eslint');
 
task('default', () => {
    return src(['scripts/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});