
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass_input = 'assets/css/sass/**/*.scss';
var sass_output = 'assets/css';

gulp.task('sass', function () {
   gulp   //add gulp without return to keep session going
    // Find all `.scss` files from the `sass/` folder
    .src(sass_input)
    // Run Sass on those files || pipe adds everything together
    .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //error log to keep session going when scss contains error
    .pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(sass_output));
});

gulp.task('scripts', function() {
  return gulp.src('assets/js/lib/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task("watch", ['sass', 'scripts'], function() {
    gulp.watch(sass_input, ['sass']);
    gulp.watch('assets/js/lib/*.js', ['scripts']);
});

gulp.task("default", ['sass', 'scripts'], function() {

});

