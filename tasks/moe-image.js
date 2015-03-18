'use strict';
var fs = require('fs');
var os = require('os');
var path = require('path');
var async = require('async');
var chalk = require('chalk');
var prettyBytes = require('pretty-bytes');
var Imagemin = require('imagemin');
var rename = require('./imageRename.js');

module.exports = function (grunt) {
  grunt.registerMultiTask('mimage', 'Minify and version PNG, JPEG, GIF and SVG images', function () {
    var done = this.async();
    var files = this.files;
    var totalSaved = 0;
    var options = this.options({
      interlaced: true,
      optimizationLevel: 5,
      progressive: true,
      removeSource: false,
      svgoPlugins: [{
          removeViewBox: false
        }, // don't remove the viewbox atribute from the SVG
        {
          removeUselessStrokeAndFill: false
        }, // don't remove Useless Strokes and Fills
        {
          removeEmptyAttrs: false
        } // don't remove Empty Attributes from the SVG
      ]
    });

    async.forEachLimit(files, os.cpus().length, function (file, next) {
        var msg;
        var imagemin = new Imagemin()
          .src(file.src[0])
          .dest(path.dirname(file.dest))
          .use(Imagemin.jpegtran(options))
          .use(Imagemin.gifsicle(options))
          .use(Imagemin.optipng(options))
          .use(Imagemin.svgo({
            plugins: options.svgoPlugins || []
          })
          .use(rename())
        );

        fs.stat(file.src[0], function (err, stats) {
          if (err) {
            grunt.warn(err + ' in file ' + file.src[0]);
            return next();
          }

          imagemin.run(function (err, data) {
            if (err) {
              grunt.warn(err + ' in file ' + file.src[0]);
              return next();
            }

            var origSize = stats.size;
            var diffSize = origSize - data[0].contents.length;

            totalSaved += diffSize;

            if (diffSize < 10) {
              msg = 'already optimized';
            } else {
              msg = [
                'saved ' + prettyBytes(diffSize) + ' -', (diffSize / origSize * 100).toFixed() + '%'
              ].join(' ');
            }

            grunt.log.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(' (' + msg + ')'));

            if (options.removeSource) {
              fs.unlinkSync(file.src[0]);
            }
            process.nextTick(next);
          });
        });
      },
      function (err) {
        if (err) {
          grunt.warn(err);
        }

        var msg = [
          '>> Minified ' + files.length,
          files.length === 1 ? 'image' : 'images',
          chalk.gray('(saved ' + prettyBytes(totalSaved) + ')')
        ].join(' ');

        grunt.log.writeln(msg);
        done();
      });
  });
};