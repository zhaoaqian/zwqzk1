var gulp = require("gulp");

var minCss = require("gulp-clean-css");

var sass = require("gulp-sass");

var uglify = require("gulp-uglify");

var htmlmin = require("gulp-htmlmin");

var server = require("gulp-webserver");

var data = require("./src/data/data.json");

var sequence = require("gulp-sequence");

var clean = require("gulp-clean");


gulp.task("clean", function() {
    return gulp.src("dist")
        .pipe(clean());
})

gulp.task("mincss", function() {
    return gulp.src("./src/css/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("dist/css"))
})

var options = {
    removeComments: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true
};

gulp.task("htmlmin", function() {
    return gulp.src("./src/index.html")
        .pipe(htmlmin(options))
        .pipe(gulp.dest("dist"))
})

gulp.task("copycss", function() {
    return gulp.src("./src/css/common.css")
        .pipe(gulp.dest("dist/css"))
})

gulp.task("copycss", function() {
    return gulp.src("./src/css/reset.css")
        .pipe(gulp.dest("dist/css"))
})

gulp.task("minJs", function() {
    return gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
})

gulp.task("server", function() {
    gulp.src("src")
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (/\/list/g.test(req.url)) {
                    res.end(JSON.stringify(data))
                }

                next()
            }
        }))
})

gulp.task("watch", function() {
    gulp.watch("./src/index.html", ['htmlmin']);
    gulp.watch("./src/css/index.scss", ["mincss"]);
    gulp.watch("./src/js/*.js", ['minJs']);
})

gulp.task("default", function(callback) {
    sequence("clean", ["mincss", "htmlmin", "minJs", "copycss"], "watch", "server", callback)
})