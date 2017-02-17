import gulp from "gulp";
import browserify from "browserify";
import babelify from 'babelify';
import source from "vinyl-source-stream";
import buffer from 'vinyl-buffer';
import sass from "gulp-ruby-sass";
import connect from "gulp-connect";
import minify from 'gulp-minify';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 9000
	})
})

gulp.task("default", ["transpile"]);

gulp.task("transpile", () => {
  return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .on("error", function(error){
      console.error( "\nError: ", error.message, "\n");
      this.emit("end");
    })
    .pipe(source("bundle.min.js"))
		.pipe(buffer())
		.pipe(uglify())
    .pipe(gulp.dest("dist"));

});
//
// gulp.task('build', function () {
//     return browserify("src/app.js")
//         .transform("babelify")
//         .bundle()
//         .pipe(source('bundle.js'))
// 				// .pipe(buffer())
// 				// .pipe(uglify())
//
//         .pipe(gulp.dest('./dist'));
// });




		// .pipe(gulpif('*.js', uglify()))

gulp.task("sass", function() {
	return sass('sass/*.scss')
  .pipe(gulp.dest('dist'))

})



// gulp.task("watch", ["transpile"], () => {
//   gulp.watch("src/**/*", ["transpile"]);
//   gulp.watch('sass/**/*', ['sass'])
// });

gulp.task('watch', ['transpile'], function () {
	  gulp.watch("src/**/*", ["transpile"]);
	  gulp.watch('sass/**/*', ['sass'])
});
