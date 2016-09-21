
/**
 * Dependency Imports
 */
import gulp   from './gulpconfig/gulp.classes.js';
import config from './gulpconfig/gulp.config.json';

// Copy Folders / Files
gulp.Copy('copy', [
  { src: `${config.paths.vendor.fontawesome.fonts}/**/*`, dest: `${config.paths.dist.fonts}` }
]);

// Compile Sass
gulp.Sass('sass', `${config.paths.src.sass}/**/*.scss`, `${config.paths.dist.css}`);

// Complile JS
gulp.Browserify('browserify', `${config.paths.src.js}/scripts.js`, `${config.paths.dist.js}/app.js`, ['babelify','vueify']);

// Lint ES6
gulp.Eslint('eslint', `${config.paths.src.js}/**/*.{js,vue}`, `${config.paths.src.js}/vendor/**`, './.eslintrc');

// Lint Scss
gulp.Scsslint('scsslint', `${config.paths.src.sass}/**/*.scss`, `${config.paths.src.sass}/vendor/**/*.scss`, '.scss-lint.yml');

// Clean Dist Folder
gulp.Clean('clean', [`${config.paths.dist.css}/**/*`, `${config.paths.dist.js}/**/*`, `${config.paths.dist.fonts}/**/*`, `${config.paths.src.js}/vendor`, `${config.paths.src.sass}/vendor`]);

// Default Task
gulp.Default(['copy', 'sass', 'scsslint', 'eslint', 'browserify']);

// Watch Task
gulp.Watch([], [
  { path: `${config.paths.src.js}/**/*.{js,vue}`, tasks: ['eslint','browserify'] },
  { path: `${config.paths.src.sass}/**/*.scss`, tasks: ['scsslint','sass'] }
]);
