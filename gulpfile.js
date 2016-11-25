var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');

var config = {
	nodeModulesDir: './node_modules',
	publicDir: './public',
};

gulp.task('fonts', function(callback) {
	pump([
			gulp.src([
				config.nodeModulesDir + '/bootstrap-sass/assets/fonts/**/*',
			]),
			gulp.dest(config.publicDir + '/fonts')
		], callback);
});

gulp.task('js', function(callback) {
	pump([
		gulp.src([
			config.nodeModulesDir + '/jquery/dist/jquery.min.js',
			config.nodeModulesDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
			config.nodeModulesDir + '/holderjs/holder.min.js',
		]),
		gulp.dest(config.publicDir + '/js')
	], callback);
});

gulp.task('css', function(callback) {
	pump([
		gulp.src('css/app.scss'),
		sourcemaps.init(),
		sass({
			outputStyle: 'compressed',
			includePaths: [config.nodeModulesDir + '/bootstrap-sass/assets/stylesheets'],
		}),
		sourcemaps.write(),
		gulp.dest(config.publicDir + '/css')
	], callback);
});

gulp.task('default', ['css', 'js', 'fonts']);
