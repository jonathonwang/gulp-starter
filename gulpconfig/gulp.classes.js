/**
 * NPM Dependencies
 */
import del            from 'del';
import gulp           from 'gulp';
import tsify          from 'tsify';
import vueify         from 'vueify';
import watchify       from 'watchify';
import sass           from 'gulp-sass';
import size           from 'gulp-size';
import gutil          from "gulp-util";
import browserify     from 'browserify';
import shell          from 'gulp-shell';
import watch          from 'gulp-watch';
import rename         from 'gulp-rename';
import concat         from 'gulp-concat';
import gulpfilter     from 'gulp-filter';
import uglify         from 'gulp-uglify';
import notify         from 'gulp-notify';
import tslint         from 'gulp-tslint';
import eslint         from 'gulp-eslint';
import htmlmin        from 'gulp-htmlmin';
import browserSync    from 'browser-sync';
import buffer         from 'vinyl-buffer';
import filesize       from 'gulp-filesize';
import cleancss       from 'gulp-clean-css';
import scsslint       from 'gulp-scss-lint';
import sasslint       from 'gulp-sass-lint';
import sourcemaps     from 'gulp-sourcemaps';
import ts             from 'gulp-typescript';
import combiner       from 'stream-combiner2';
import autoprefixer   from 'gulp-autoprefixer';
import htmlreplace    from 'gulp-html-replace';
import source         from 'vinyl-source-stream';
import moduleimporter from 'sass-module-importer';

/**
 * Gulp Configuration
 */
import config         from './gulp.config.json';

/**
 * Copy Task
 * @param taskName : string
 * @param copyTasks: Array<Object> = { src: string, dest: string }
 */
export const Copy = (taskName, copyTasks) => {
  gulp.task(taskName, () => {
    for(let copyTask of copyTasks){
      gulp.src(copyTask.src)
      .on('error', gutil.log)
      .pipe(gulp.dest(copyTask.dest))
      .pipe(notify({
        title: config.name,
        subtitle: 'Gulp',
        message: `Finished ${taskName}`,
        icon: config.icon,
        sound: false,
        onLast: true
      }));
    }
  });
}

/**
 * HTML Task - Replace JS / CSS Links Dependent on Env
 * Also Minifies HTML for Production
 * @param taskName:  : string
 * @param src        : string
 * @param dest       : string
 * @param cssFilePath: string
 * @param jsFilePath : string
 */
export const Html = (taskName, src, dest, cssFilePath, jsFilePath) => {
  let devOptions = { css: cssFilePath, js: jsFilePath };
  let prodOptions = { css: cssFilePath.split('.css')[0]+'.min.css', js: jsFilePath.split('.js')[0]+'.min.js' };
  gulp.task(taskName, () => {
    gulp.src(src)
    .on('error', gutil.log)
    .pipe(gutil.env.production ? htmlreplace(prodOptions) : htmlreplace(devOptions))
    .pipe(gutil.env.production ? htmlmin({collapseWhitespace: true}) : gutil.noop())
    .pipe(gulp.dest(dest))
    .pipe(notify({
      title: config.name,
      subtitle: 'Gulp',
      message: `Finished ${taskName}`,
      icon: config.icon,
      sound: false,
      onLast: true
    }));
  });
}

/**
 * Sass Task
 * @param taskName      : string
 * @param src           : string
 * @param dest          : string
 * @param outputFileName: string
 */
export const Sass = (taskName, src, dest, outputFileName) => {
  gulp.task(taskName, () => {
    gulp.src(src)
    .on('error', gutil.log)
    .pipe(sass({ importer: moduleimporter() }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
    .pipe(gutil.env.production ? cleancss() : gutil.noop())
    .pipe(gutil.env.production ? rename(outputFileName.split('.css')[0]+'.min.css') : rename(outputFileName))
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write('./'))
    .pipe(gulp.dest(dest))
    .pipe(size())
    .pipe(notify({
      title: config.name,
      subtitle: 'Gulp',
      message: `Finished ${taskName}`,
      icon: config.icon,
      sound: false,
      onLast: true
    }));
  });
}

/**
 * Browserify Task
 * @param taskName      : string
 * @param src           : Array<string> | string
 * @param dest          : string
 * @param outputFileName: string
 * @param plugins       : Array<string>
 */
export const Browserify = (taskName, src, dest, outputFileName, plugins) => {
  gulp.task(taskName, () => {
    const bundler = browserify({ debug: true, entries: src });
    for(let plugin of plugins){
      bundler.transform(plugin);
    }
    bundler.bundle()
    .on('error', gutil.log)
    .pipe(gutil.env.production ? source(`${dest}/${outputFileName.split('.js')[0]+'.min.js'}`) : source(`${dest}/${outputFileName}`))
    .pipe(buffer())
    .pipe(gutil.env.production ? uglify() : gutil.noop())
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write('./'))
    .pipe(size())
    .pipe(gulp.dest(''))
    .pipe(notify({
      title: config.name,
      subtitle: 'Gulp',
      message: `Finished ${taskName}`,
      icon: config.icon,
      sound: false,
      onLast: true
    }));
  });
}

/**
 * Typescript Linter
 * @param taskName : string
 * @param src      : string
 * @param exclude  : string
 * @param configSrc: string
 */
export const Tslint = (taskName, src, exclude, configSrc) => {
  gulp.task(taskName, () => {
    gulp.src([src, `!${exclude}`])
    .pipe(tslint({ configuration: configSrc }))
    .pipe(tslint.report("verbose"))
    .pipe(notify({
      title: config.name,
      subtitle: 'Gulp',
      message: `Finished ${taskName}`,
      icon: config.icon,
      sound: false,
      onLast: true
    }));
  });
}

/**
 * ES6 Linter
 * @param taskName : string
 * @param src      : string
 * @param exclude  : string
 * @param configSrc: string
 */
export const Eslint = (taskName, src, exclude, configSrc) => {
  gulp.task(taskName, () => {
    return gulp.src([src, '!node_modules/**', `!${exclude}`])
      .pipe(eslint(configSrc))
      .pipe(eslint.format())
      // .pipe(eslint.failAfterError())
      .pipe(notify({
        title: config.name,
        subtitle: 'Gulp',
        message: `Finished ${taskName}`,
        icon: config.icon,
        sound: false,
        onLast: true
      }));
  });
}


/**
 * SCSS Linter
 * @param taskName : string
 * @param src      : string
 * @param exclude  : string
 * @param configSrc: string
 */
export const Scsslint = (taskName, src, exclude, configSrc) => {
  gulp.task(taskName, () => {
    const scssfilter = gulpfilter(exclude);
    gulp.src(src)
    .pipe(scssfilter)
    .pipe(scsslint({ 'config': configSrc, 'maxBuffer': 307200 }))
    .pipe(notify({
      title: config.name,
      subtitle: 'Gulp',
      message: `Finished ${taskName}`,
      icon: config.icon,
      sound: false,
      onLast: true
    }));
  });
}


/**
 * SASS Linter
 * @param taskName : string
 * @param src      : string
 * @param exclude  : string
 * @param configSrc: string
 */
export const Sasslint = (taskName, src, exclude, configSrc) => {
  gulp.task(taskName, () => {
    gulp.src(src)
    .pipe(sasslint({
      files: {ignore: exclude},
      config: configSrc
    }))
    .pipe(sasslint.format());
  });
}

/**
 * Watch Task
 * @param tasksToRun  : Array<string>
 * @param tasksToWatch: Array<Object> = { path: string, tasks: Array<string> }
 */
export const Watch = (tasksToRun, tasksToWatch) => {
  gulp.task('watch', tasksToRun, () => {
    for(let task of tasksToWatch){
      gulp.watch(task.path, task.tasks);
    }
  });
}

/**
 * Clean Task (Cleans Files)
 * @param taskName : string
 * @param paths    : Array<string>
 */
export const Clean = (taskName, paths) => {
  gulp.task(taskName, () => {
    del(paths);
  })
}

/**
 * Default Task
 * @param taskNames: Array<string>
 */
export const Default = (taskNames) => {
  gulp.task('default', taskNames);
}


export default {
  Copy,
  Html,
  Sass,
  Clean,
  Watch,
  Tslint,
  Eslint,
  Default,
  Scsslint,
  Sasslint,
  Browserify
}
