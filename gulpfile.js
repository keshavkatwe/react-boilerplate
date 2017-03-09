var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var useref = require("gulp-useref");
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var gulpSequence = require('gulp-sequence');
var browserify = require('browserify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var gulpif = require('gulp-if');
var wiredep = require('wiredep').stream;
var cacheBuster = require('gulp-cache-bust');
var stringify = require('stringify');
var babelify   = require('babelify');
var jsx = require('gulp-jsx');


var paths = {
    pages: ['src/*.html'],
    scriptEntry: ['src/scripts/application.jsx'],
    imagesSrc: './src/images/*',
    scss: 'src/styles/**/*.scss'
};

gulp.task("html", function () {
    return gulp.src("./dist/index.html")
        .pipe(cacheBuster())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist"));
});


gulp.task("browserify", function () {
    return browserify({
        'entries': ['./src/scripts/application.jsx'],
        'debug' : true
    })
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.html'] },
            minify: true
        })
        .bundle().on('error', function(err){
            // print the error (can replace with gulp-util)
            console.log(err.message);
            // end this stream
            this.emit('end');
        })
        .pipe(source('bundle.js')) // gives streaming vinyl file object
        .pipe(gulp.dest('./.tmp/scripts/'))
        .pipe(browserSync.stream());
});

gulp.task('img', function () {
    gulp.src(paths.imagesSrc)
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
});


gulp.task('wrap', function () {

    return gulp.src(paths.pages)
        .pipe(useref({
            searchPath: ['src', '.tmp', '.']
        }))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest("./dist"))
});

gulp.task("build", gulpSequence('sass', 'browserify', 'wrap', 'html', 'img'));


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'browserify'], function () {

    browserSync({
        notify: false,
        server: {
            baseDir: ['.tmp', 'src'],
            routes: {
                '/bower_components': 'bower_components',
                '/node_modules': 'node_modules'
            }
        }
    });

    gulp.watch(paths.scss, ['sass']);
    gulp.watch("src/scripts/**/*.jsx", ['browserify']);
    gulp.watch("src/templates/**/*.html", ['browserify']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("bower.json", ['bower']);
});


gulp.task('serve:dist', function () {
    browserSync({
        notify: false,
        server: {
            baseDir: ['dist'],
        }
    });
});

gulp.task('bower', function () {
    gulp.src(paths.pages)
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./src'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', function (err) {
            console.error(err.message);
            browserSync.notify(err.message, 3000); // Display error in the browser
            this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
        }))
        .pipe(gulp.dest(".tmp/styles"))
        .pipe(browserSync.stream());
});


gulp.task('default', ["serve"]);