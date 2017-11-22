"use strict";
/**
 * Gulp tasks.
 *
 * @module
 */

var gulp = require("gulp");
var clean = require("gulp-clean");
var spawn = require("cross-spawn");

gulp.task("mk-docs", () => {
    spawn.sync("jsdoc", [ "-c", "jsdoc.json", "-d", "public" ]);
});

gulp.task("rm-docs", () => {
    gulp.src("public", {read: false}).pipe(clean());
});
