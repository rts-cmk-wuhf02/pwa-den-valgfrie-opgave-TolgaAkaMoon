const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");

sass.compiler = require('node-sass');

function html(done) {
    gulp.src('./assets/html/templates/*.ejs')
        .pipe(ejs())
        .pipe(rename(function (path) {
            if (path.basename != "index") {
                if (path.basename != "fallback") {
                    if (path.basename != "offline") {
                        path.dirname = path.basename;
                        path.basename = "index";
                    }
                }
            }
            path.extname = ".html";
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
    done()
}

function watchHtml(done) {
    gulp.watch("./assets/html/**/*.ejs", { ignoreInitial: false }, html);
}

function scss(done) {
    gulp.src('./assets/css/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(connect.reload());
    done();
}

function watchScss(done) {
    gulp.watch('./assets/css/**/*.scss', { ignoreInitial: false }, scss);
}

function js(done) {
    gulp.src('./assets/js/*.js')
        .pipe(gulp.dest('./dist/assets/javascript'))
        .pipe(connect.reload());
    done();
}

function watchJs(done) {
    gulp.watch('./assets/js/*.js', { ignoreInitial: false }, js);
}

function manifest(done) {
    gulp.src('./manifest.webmanifest')
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
    done();
}

function watchManifest(done) {
    gulp.watch('./manifest.webmanifest', { ignoreInitial: false }, manifest);
}

function serviceWorker(done) {
    gulp.src('./sw.js')
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
    done();
}

function watchServiceworker(done) {
    gulp.watch('./sw.js', { ignoreInitial: false }, serviceWorker);
}


function images(done) {
    gulp.src("./assets/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/assets/images"))
        .pipe(connect.reload());
    done();
}

function watchImages(done) {
    gulp.watch("./assets/images/*", { ignoreInitial: false }, images);
}

gulp.task('dev', function (done) {
    watchServiceworker();
    watchManifest();
    watchHtml();
    watchScss();
    watchJs();
    watchImages();
    connect.server({
        livereload: true,
        root: "dist"
    })
    done();
});

gulp.task('build', function (done) {
    serviceWorker(done);
    manifest(done);
    html(done);
    scss(done);
    js(done);
    images(done);
    done();
});