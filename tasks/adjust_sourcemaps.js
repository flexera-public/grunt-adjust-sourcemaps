/*
 * grunt-adjust-sourcemaps
 * https://github.com/rightscale/grunt-adjust-sourcemaps
 *
 * Copyright (c) 2014 RightScale
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('adjust_sourcemaps', 'Adjusts sourcemaps in arbitrary ways', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      process: function(input) { return input; },
      skipNonSourcemaps: true
    });

    var sourceMap = require('source-map');
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else if (!options.skipNonSourcemaps || !filepath.match(/\.map$/)) {
          grunt.log.warn('Source file "' + filepath + '" doesn\'t look like a sourcemap, skipping. Run with skipNonSourcemaps: false to process');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var sourceMapConsumer, sourceMapGenerator, data = grunt.file.readJSON(filepath);
        if (options.process.length > 1) {
          sourceMapConsumer = new sourceMap.SourceMapConsumer(data);
          sourceMapGenerator = sourceMap.SourceMapGenerator.fromSourceMap(sourceMapConsumer);
        }

        var result = options.process(data, sourceMapGenerator, sourceMapConsumer, sourceMap);
        if (result instanceof sourceMap.SourceMapGenerator) {
          grunt.file.write(f.dest, result.toString());
        } else {
          grunt.file.write(f.dest, JSON.stringify(result));
        }
      });

    });
  });

};
