var gulp 			= require("gulp");
var sass 			= require("gulp-sass");
var htmlmin 		= require("gulp-htmlmin");
var notify 			= require("gulp-notify");
var concat 			= require("gulp-concat");
var uglify 			= require("gulp-uglify");
var browserSync 	= require("browser-sync").create();
var del 			= require("del");
		


// TASK DELETE CACHE
gulp.task('cache:css', gulp.series( function(){
	return del("./dist/css");

}));

gulp.task('cache:js',gulp.series(function(){
	return del("./dist/js/*.js");

}));

// TASK MOVER PASTAS E/OU ARQUIVOS
gulp.task("move-files", gulp.series(function(){
	return gulp.src("./node_modules/bootstrap-icons/font/**")
		   .pipe(gulp.dest("./dist/webfonts"))
}));

gulp.task("move-assets", gulp.series(function(){
	return gulp.src("./src/assets/*")
		   .pipe(gulp.dest("dist/img/"))
}));

gulp.task("move-js", gulp.series(['cache:js'],function(){
	return gulp.src(["./node_modules/jquery/dist/jquery.min.js",
					"./node_modules/popper.js/dist/umd/popper.js",
					"./node_modules/bootstrap/dist/js/bootstrap.js",
					"./src/js/app.js"])
			//.pipe(concat("main.js"))
			.pipe(gulp.dest("./dist/js"))
}));

/* TASK COMPILE SCSS TO CSS */
gulp.task("sass", gulp.series( ['cache:css'], function(){
	return gulp.src("./src/scss/style.scss")
				.pipe(sass({outPutStyle: 'compressed'}))
				.on('error', notify.onError({title: "erro scss", message: "<%= error.message %>"}))
				.pipe(gulp.dest("./dist/css"))
				.pipe(browserSync.stream());
}));

/* TASK MINIFY  */
gulp.task("html", gulp.series(function() {
	return gulp.src("./src/index.html")
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest("./dist"))
				.pipe(browserSync.stream());
}));

/*
gulp.task("js", gulp.series( ['cache:js'], function() {
	return gulp.src("./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js")
				.pipe(uglify())  //minimiza JS
				.pipe(gulp.dest("./dist/js"))
				.pipe(browserSync.stream());
})); */

/* TASK CONCAT JS
gulp.task("concat-js", gulp.series(function() {
	return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
				.pipe(concat("main.js"))
				.pipe(gulp.dest("./dist/js"))

})); */

// TASK SERVER
gulp.task("server", gulp.series(function() {
	
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
	/* Watch */
	gulp.watch("./src/scss/**/*.scss", gulp.series('sass'));
	//gulp.watch("./src/components/bootstrap/scss/**/*.scss", ['sass']);
	gulp.watch("./src/js/**/*.js", gulp.series('move-js'));
	gulp.watch("./src/index.html", gulp.series('html'));
	
}));

gulp.task("default", gulp.series(["move-js","move-files", "move-assets","sass", "html", "server"]));



