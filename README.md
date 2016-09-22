# Gulp-Starter (WIP)
A repo to get started with gulp really quickly because I dont like having to setup all the piping all the time.

It is a very simple wrapper around gulp tasks to get rid of all of that bloat. I aimed to include at least all of the common tasks that I use.

## Getting Started
__Install__

`npm install`

### How To Use:
This repo comes pre-packaged with a ton of npm dependencies which can be used by importing the `gulp.classes.js` file into your `gulpfile.js`

---

__Copy Task:__

Copies files from one directory to another

```
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

__Html Task:__

Swaps out script and css links depending on environment && minifies files.

```
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

You must have these code blocks in your html to find and replace css && js links.
Run gulp --production to change it to `app.min.css` && `app.min.js`
```
<!-- build:css -->
<link rel="stylesheet" href="../dist/css/app.css">
<!-- endbuild -->

<!-- build:js -->
<script src="../dist/js/app.js"></script>
<!-- endbuild -->
```

---

__Sass Task:__

Compiles SASS and minifies SASS with --production flag
```
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

Run gulp --production to minify files and exclude sourcemaps.
This will create `.min.css` && `.min.js` file extensions.

#### More to come...
