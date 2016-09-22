# Gulp-Starter (WIP)
[![Build Status](https://travis-ci.org/jonathonwang/gulp-starter.svg?branch=master)](https://travis-ci.org/jonathonwang/gulp-starter)


A repo to get started with gulp really quickly because I dont like having to setup all the piping all the time.

It is a very simple wrapper around gulp tasks to get rid of all of that bloat. I aimed to include at least all of the common tasks that I use.

## Getting Started
__Install__

Clone this repo, cd into the directory and run `npm install`

I am considering putting this up as an npm module for easier installation, but for now it will remain in the form of a repo.

---

### How To Use:
This repo comes pre-packaged with a ton of npm dependencies which can be used by importing the `gulp.classes.js` file into your `gulpfile.js`

Ex:
```javascript
import gulp from './gulpconfig/gulp.classes.js';
```
You will then have access to all of the gulp tasks by accessing the imported gulp object: `gulp.Whatevertask`

---

### Tasks:
* __[Copy](#copy-task)__
* __[Html](#html-task)__
* __[Sass](#sass-task)__

---

### Copy Task:

Copies files from one directory to another

```javascript
gulp.Copy(
  'copy', // taskName
  [ // files
    {
      src: './node_modules/bootstrap-sass/assets/stylesheets/**/*.scss', // fileSrc
      dest: 'src/sass/vendor/bootstrap' // fileDest
    }
  ]
);
```

Parameters:
* taskName: string
* files: Array of Objects with src and dest attributes
* fileSrc: string
* fileDest: string

---

### Html Task:

Swaps out script and css links depending on environment && minifies files.

```javascript
gulp.Html(
  'html', // taskName
  'src/html/**/*', // htmlSource
  'dist/html', // htmlOutput
  '../css/app.css', // compiledCssPath
  '../js/app.js' // compiledJsPath
);
```

Parameters:
* taskName: string
* htmlSource: string
* htmlOutput: string
* compiledCssPath: string (relative to output html file)
* compiledJsPath: string (relative to output html file)

Note:

You must have these comment code blocks in your html to find and replace css && js links.

```html
<!-- build:css -->
<link rel="stylesheet" href="../dist/css/app.css">
<!-- endbuild -->

<!-- build:js -->
<script src="../dist/js/app.js"></script>
<!-- endbuild -->
```

Run gulp `taskName` --production to change the links to use `app.min.css` for CSS && `app.min.js` for JS

---

### Sass Task:

Compiles SASS and minifies SASS with --production flag
```javascript
gulp.Sass(
  'sass', // taskName
  'src/sass/**/*.scss', // sassPath
  'dist/css/', // cssOutputPath
  'app.css' // cssOutputFileName
);
```

Parameters:
* taskName: string
* sassPath: string
* cssOutputPath: string
* cssOutputFileName: string

Note:

Run gulp `taskName` --production to minify files and exclude sourcemaps.
This will create `.min.css` extension on the output CSS file.

---

#### More to come...

The documentation tends to fall behind what has actually been  implemented. If you want to see what other tasks this comes with, checkout the `gulpconfig/gulp.classes.js` file.
