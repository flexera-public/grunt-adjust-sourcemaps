# grunt-adjust-sourcemaps

[![Build Status](https://travis-ci.org/rightscale/grunt-adjust-sourcemaps.svg?branch=master)](https://travis-ci.org/rightscale/grunt-adjust-sourcemaps)

> Adjusts sourcemaps in arbitrary ways. This can be done by either directly manipulating the JSON representation or using the [Mozilla SourceMaps module](https://github.com/mozilla/source-map). The plugin finds and parses sourcemaps, allows you to do any custom manipulation and then writes the maps to a new location.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-adjust-sourcemaps --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-adjust-sourcemaps');
```

## The "adjust_sourcemaps" task

### Overview
In your project's Gruntfile, add a section named `adjust_sourcemaps` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  adjust_sourcemaps: {
    options: {
      process: function(json, sourceMapGenerator, sourceMapConsumer, sourceMapPackage) {
        // do something
        return json || sourceMapGenerator;
      }
    },
    your_target: {
      files: [{
        expand: true,
        src: 'some/sourcemaps/*.js.map',
        dest: 'some/output-dir'
      }]
    },
  },
});
```

A further note is that `grunt.option('adjust_sourcemaps.' + target_name + '.sources')`
will contain an array of all files mentioned in the processed sourcemaps (this is
useful when trying to copy original files for deployment for easier debugging).

### Options

#### options.process
Type: `Function(jsonRepresenation, [sourceMapGenerator, sourceMapConsumer, sourceMapsPackage])`
Default value: Identity function

Here you can adjust your sourcemaps to your hearts content. The arguments are as follows:

`jsonRepresenation': since sourcemaps are only JSON, this is the RAW json object of the sourcemap.

`sourceMapGenerator`: [sourceMapGenerator](https://github.com/mozilla/source-map#sourcemapgenerator) which has the sourcemap alreasy preloaded.

`sourceMapConsumer`: [sourceMapConsumer](https://github.com/mozilla/source-map#sourcemapconsumer) preloaded with your sourcemap.

`sourceMapsPackage`: https://github.com/mozilla/source-map package loaded for custom manipulations with the source.

The function should return either a JSON object representing the sourcemap or a sourceMapGenerator.


## Contributing

Jakub Hampl (@gampleman) is the maintainer of this repo.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
