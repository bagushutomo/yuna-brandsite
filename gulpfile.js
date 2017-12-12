var resourceDir = '',
scriptsDir = resourceDir + 'assets/js/',
scssDir = resourceDir + 'assets/scss/',
pugDir = resourceDir + 'assets/pug/';

var distDir = 'dist/',
scriptsDistDir = distDir + 'assets/js/';
stylesDistDir = distDir + 'assets/css/';
htmlDistDir = distDir + 'html/';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');

gulp.task('styles', function() {
return gulp.src(scssDir + '**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		// .pipe(rename({suffix: '.prefixed'}))
		.pipe(autoprefixer({
		  browsers: ['last 3 versions', 'ie 9']
		}))
		.pipe(gulp.dest(stylesDistDir))
		// .pipe(rename({suffix: '.min'}))
		.pipe(csso({
		  report: 'gzip'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(stylesDistDir))
});

gulp.task('js', function() {
return gulp.src([scriptsDir + 'plugins.js', scriptsDir + 'site.js'])
			.pipe(sourcemaps.init())
			.pipe(concat('site.js'))
			.pipe(gulp.dest(scriptsDistDir))
			.pipe(uglify())
			// .pipe(rename({suffix: '.min'}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(scriptsDistDir))
			.on('error', gutil.log)
});

gulp.task('pug', function() {
gulp.src([
		pugDir + 'components/**/*.pug',
		pugDir + '**/*.pug',
		'!' + pugDir + 'components/_includes/*.pug',
		'!' + pugDir + 'layout.pug',
		'!' + pugDir + '_includes/*.pug'
	])
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest(htmlDistDir, { ext: '.html' }))
});

gulp.task('watch', function() {
gulp.watch(scssDir + '**/*.scss', ['styles']);
gulp.watch(scriptsDir + '*.js', ['js']);
gulp.watch([pugDir + "**/*.pug", pugDir + "components/modules/*.html"], ['pug']);
});

gulp.task('default', ['pug', 'styles', 'js']);
