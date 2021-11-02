var gulp = require(gulp);
var concat = require("gulp-concat");

gulp.task("scripts", function () {
  gulp.src(".//pre-js/*.js").pipe(concat("all.js")).pipe(gulp.dest("./dist/"));
});
