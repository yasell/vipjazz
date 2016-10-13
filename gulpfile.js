"use strict";

var gulp = require("gulp");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");

// server
gulp.task("serve", function() {
    server.init({
        server: ".",
        notify: false,
        open: true,
        ui: false
    });

    gulp.watch("css/**/*.{css}", "media/**/*.{css}", "modules/**/*.{css}", "plugins/**/*.{css}", "template/**/*.{css}");
    gulp.watch("*.html").on("change", server.reload);
});
