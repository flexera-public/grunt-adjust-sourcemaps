/*
 * grunt-adjust-sourcemaps
 * https://github.com/rightscale/grunt-adjust-sourcemaps
 *
 * Copyright (c) 2014 Jakub Hampl
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    adjust_sourcemaps: {
      json_manipulation: {
        options: {
          process: function(data) {
            data.sources = data.sources.map(function(path) {
              path = path.replace(/^(\.\.\/)*(.*)$/, '$2');

              if (path.match(/^\w{40}/) || !path.match(/^app\//)) {
                return path;
              } else {
                return '/abc/' + path;
              }
            });
            return data;
          }
        },
        files: [{
          expand: true,
          src: ['test/fixtures/*.js.map'],
          dest: 'tmp/json_manipulation/',
          flatten: true
        }]
      },
      sourcemap_manipulation: {
        options: {
          process: function(json, smGen) {
            smGen.addMapping({
              generated: {line: 10, column: 10},
              original: {line: 14, column: 14},
              source: 'hello.js'
            });
            return smGen;
          }
        },
        files: [{
          expand: true,
          src: ['test/fixtures/*'],
          dest: 'tmp/sourcemap_manipulation/',
          flatten: true
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'adjust_sourcemaps', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
