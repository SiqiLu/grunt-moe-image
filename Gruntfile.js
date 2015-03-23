/*!
 * moe UI Gruntfile
 * http://ui.moe.click
 * Copyright 2013-2015 Siqi Lu
 * Licensed under MIT
 */

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    clean: {
      tmp: 'tmp'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      grunt: {
        src: ['Gruntfile.js', 'grunt/**/*.js']
      },
      core: {
        src: ['tasks/**/*.js', '!src/**/*.min.js']
      },
      test: {
        src: ['tests/**/*.js', '!tests/**/*.min.js']
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      },
      core: {
        src: '<%= jshint.core.src %>'
      },
      test: {
        src: '<%= jshint.test.src %>'
      }
    },

    exec: {
      options: {
        stdout: true,
        stderr: true
      },
      npmUpdate: {
        command: 'npm update'
      },
      npmInstall: {
        command: 'npm install'
      },
      npmPublish: {
        command: 'npm publish'
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    },

    mimage: {
      options: {
        interlaced: true,
        optimizationLevel: 5,
        progressive: true,
        removeSource: true,
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
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'test/fixtures/',
          src: '**/*.{gif,GIF,jpg,JPG,png,PNG}',
          dest: 'tmp/'
        }]
      }
    }
  });

  // This command registers the default task which will install bower packages into wwwroot/lib
  grunt.registerTask('default', ['js', 'build']);

  grunt.registerTask('js', ['jshint', 'jscs']);
  grunt.registerTask('build', ['clean', 'mimage']);
  grunt.registerTask('release', ['exec:npmUpdate', 'default', 'bump', 'exec:npmPublish']);
  grunt.registerTask('release-minor', ['exec:npmUpdate', 'default', 'bump:minor', 'exec:npmPublish']);
  grunt.registerTask('release-major', ['exec:npmUpdate', 'default', 'bump:major', 'exec:npmPublish']);

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });
  require('time-grunt')(grunt);
};
