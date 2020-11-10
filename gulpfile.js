const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("html",done=>{
    gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
    done();
})

gulp.task("img",done=>{
    gulp.src("img/*.*")
    .pipe(gulp.dest("dist/img"))
    .pipe(connect.reload());
    done();
});

gulp.task("sass",done=>{
    gulp.src("sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compact'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
    done();
})

gulp.task("uglify",done=>{
    gulp.src("js/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
    done();
})

gulp.task("server",done=>{
    connect.server({
        root:"dist",
        livereload:true
    });
    done();
})

gulp.task("build",gulp.series("html","sass","uglify","img"));

gulp.task("watch",done=>{
    gulp.watch("*.html",gulp.series("html"));
    gulp.watch("sass/*.scss",gulp.series("sass"));
    gulp.watch("js/*.js",gulp.series("uglify"));
    gulp.watch("img/*.*",gulp.series("img"));
    done();
})

gulp.task("default",gulp.series("build","server","watch"));