var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass")); // Make sure to use the correct version of sass
var uglify = require("gulp-uglify");
var cleanCSS = require("gulp-clean-css");

// Define your sass task
gulp.task("sass", function () {
  return gulp
    .src("src/**/*.scss")
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest("../assets"));
});

// Task to copy JS files to another folder
gulp.task("copy-js", function () {
  return gulp
    .src("src/**/*.js") // Path to the JS files you want to watch
    .pipe(gulp.dest("../assets")); // Destination folder for the JS files
});

// Task to minify JS files
gulp.task("minify-js", function () {
  return gulp
    .src("src/**/*.js") // Path to the JS files you want to watch
    .pipe(uglify()) // Minify each JS file
    .pipe(gulp.dest("../assets")); // Destination folder for the minified JS files
});

// Task to compile and minify SCSS to CSS
gulp.task("minify-scss", function () {
  return gulp
    .src("src/**/*.scss") // Path to your SCSS files
    .pipe(sass()) // Compile SCSS to CSS
    .pipe(cleanCSS()) // Minify the compiled CSS
    .pipe(gulp.dest("../assets")); // Destination folder for the minified CSS files
});

// Define the watch task
gulp.task("watch:dev", function () {
  gulp.watch("src/**/*.scss", gulp.series("sass")); // Using gulp.series to run 'sass' when .scss files change
  gulp.watch("src/**/*.js", gulp.series("copy-js")); // Watch JS files and copy on changes
});

gulp.task("watch:build", gulp.series("minify-scss", "minify-js"));
