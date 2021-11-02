const gulp = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");
const { src, series, parallel, dest, watch } = require("gulp");

const cssPath = "src/css/";
const jsPath = "src/scripts/";
const jsOrder = [
  `${jsPath}CardInfoIcons.js`,
  `${jsPath}LabelList.js`,
  `${jsPath}OpenedCard.js`,
  `${jsPath}Task.js`,
  `${jsPath}TaskList.js`,
  `${jsPath}TodoCard.js`,
  `${jsPath}TodoList.js`,
  `${jsPath}Todos.js`,
  `${jsPath}main.js`,
];

function copyHtml() {
  return src("src/*.html").pipe(gulp.dest("dist"));
}

function copyImages() {
  return src("src/images/*").pipe(gulp.dest("dist/images"));
}

function concatJs() {
  return src(jsOrder)
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/scripts"));
}

function copyCssMap() {
  return src("src/css/style.css.map").pipe(gulp.dest("dist/css"));
}

function copyCss() {
  return src("src/css/style.css").pipe(gulp.dest("dist/css"));
}

function watchTask() {
  watch([cssPath, jsPath], { interval: 1000 }, parallel(copyCss, concatJs));
}

exports.copyCss = copyCss;
exports.copyCssMap = copyCssMap;
exports.concatJs = concatJs;
exports.copyImages = copyImages;
exports.copyHtml = copyHtml;
exports.default = series(
  parallel(copyHtml, copyCss, copyCssMap, concatJs, copyImages),
  watchTask
);
