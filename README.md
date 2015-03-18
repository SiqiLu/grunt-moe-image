# grunt-moe-image

> Image min and rename for moe team.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-moe-image --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-moe-image');
```

## The "mimage" task

### Overview
In your project's Gruntfile, add a section named `mimage` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mimage: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

####interlaced
Type: boolean

Default: `true`

Interlace gif for progressive rendering.
####optimizationLevel
Type: number

Default: `5`

Select optimization level between 0 and 7.

The optimization level 0 enables a set of optimization operations that require minimal effort. There will be no changes to image attributes like bit depth or color type, and no recompression of existing IDAT datastreams. The optimization level 1 enables a single IDAT compression trial. The trial chosen is what. OptiPNG thinks it’s probably the most effective. The optimization levels 2 and higher enable multiple IDAT compression trials; the higher the level, the more trials.

Level and trials:

1. 1 trial
2. 8 trials
3. 16 trials
4. 24 trials
5. 48 trials
6. 120 trials
7. 240 trials

####progressive
Type: boolean

Default: `true`

Lossless conversion to progressive.

####removeSource
Type: boolean

Default: `true`

Synchronous unlink.

####svgoPlugins:removeViewBox
Type: boolean

Default: `false`

Don't remove the viewbox atribute from the SVG.

####svgoPlugins:removeUselessStrokeAndFill
Type: boolean

Default: `false`

Don't remove Useless Strokes and Fills.

####svgoPlugins:removeEmptyAttrs
Type: boolean

Default: `false`

Don't remove Empty Attributes from the SVG.
### Usage Examples

```js
mimage: {
      options: {
        interlaced: true,
        optimizationLevel: 5,
        progressive: true,
        removeSource: true,
        svgoPlugins: [{
            removeViewBox: false
          }, 
          {
            removeUselessStrokeAndFill: false
          }, 
          {
            removeEmptyAttrs: false
          } 
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
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2015-02-02 &emsp; v0.1.0 &emsp; Change version number.
* 2015-02-02 &emsp; v0.3.0 &emsp; Change version number.
* 2015-02-02 &emsp; v0.3.1 &emsp; Add "npm publish" command.
* 2015-02-02 &emsp; v0.3.2 &emsp; Remove clean command and add publish command.
* 2015-02-02 &emsp; v0.3.3 &emsp; Change version number.
* 2015-02-02 &emsp; v0.3.4 &emsp; Add default task to registerTask.
