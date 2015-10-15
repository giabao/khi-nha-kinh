var gulp = require('gulp');
var electron = require('gulp-electron');
var packageJson = require('../../package.json');
var paths = require('../paths');

gulp.task('electron', function() {
  return gulp.src("")
    .pipe(electron({
      src: [paths.output, 'package.json', 'config.js', 'index.html', 'styles', 'jspm_packages', 'electron-main.js'],
      packageJson: packageJson,
      release: 'electron/dist',
      cache: 'electron/cache',
      version: 'v0.33.8',
      platforms: ['win32-ia32']
    }));
});
