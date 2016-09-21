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
gulp.Copy('copy', [
  { src: `${config.paths.vendor.fontawesome.fonts}/**/*`, dest: `${config.paths.dist.fonts}` }
]);
```

Parameters:
* taskName: string
* files: Array of Objects with src and dest attributes

Pretty Self-Explanatory. The more objects you add, the more it will copy.

---

__Html Task:__

Swaps out script and css links depending on environment && minifies files.

```
gulp.Html('html', `${config.paths.src.html}/*`, config.paths.dist.html, '../css/app.css', '../js/app.js');
```

Parameters:
* taskName: string
* htmlSource: string
* htmlOutput: string
* compiledCssPath: string
* compiledJsPath: string

---

__Sass Task:__

Compiles SASS and minifies SASS with --production flag
```
gulp.Sass('sass', `${config.paths.src.sass}/**/*.scss`, `${config.paths.dist.css}/`, 'app.css');
```

Parameters:
* taskName: string
* sassPath: string
* cssOutputPath: string
* cssOutputFileName: string

#### More to come...
